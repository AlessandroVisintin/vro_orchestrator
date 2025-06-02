// constructor
function VaultApi(endpoint, namespace, roleId, secretId) {
    this.endpoint = endpoint
    this.namespace = namespace
    this.login(roleId, secretId)
}

// populate object
VaultApi.prototype = {

    constructor : VaultApi,

    login : function(roleId, secretId) {
        this.restHost = RESTHostManager.createHost("DynamicRequest")
        this.host = RESTHostManager.createTransientHostFrom(this.restHost)
        this.host.url = this.endpoint

        var body = {"role_id": roleId, "secret_id": secretId}
        var request = this.host.createRequest("POST", encodeURI("/v1/auth/approle/login"), JSON.stringify(body))
        request.setHeader("Content-Type", "application/json")
        request.setHeader("X-Vault-Namespace", this.namespace)

        var response = request.execute()
        if (response.statusCode < 200 || response.statusCode > 299)
            throw new Error("Vault login failed: " + response.contentAsString)
        
        var content = JSON.parse(response.contentAsString)
        this.authToken = content.auth.client_token
    },

    retrieve : function(path) {
        var uri = '/v1' + path
        var request = this.host.createRequest("GET", encodeURI(uri))
        request.setHeader("Content-Type", "application/json")
        request.setHeader("X-Vault-Namespace", this.namespace)
        request.setHeader("X-Vault-Token", this.authToken)
        
        var response = request.execute()
        if (response.statusCode < 200 || response.statusCode > 299)
            throw new Error("Vault retrieve failed for " + uri + ": " + response.contentAsString)
        
        var content = JSON.parse(response.contentAsString)
        return content.data.data
    }

}

// return object prototype
return VaultApi
