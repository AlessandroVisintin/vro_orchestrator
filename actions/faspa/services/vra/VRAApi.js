function VRAApi(vraAuthentication) {
    this.vraAuthentication = vraAuthentication
}

VRAApi.prototype = {

    constructor: VRAApi,

    _checkStatus: function(response, prefixErrorMessage) {
        if (response.statusCode < 200 || response.statusCode > 299) {
            prefixErrorMessage = prefixErrorMessage ? prefixErrorMessage + " " : ""
            throw String(response.statusCode + ": " + prefixErrorMessage + response.contentAsString)
        }
    },

    // iaas

    getCloudAccounts: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", "iaas/api/cloud-accounts")
        this._checkStatus(response, "[getCloudAccounts]")
        return JSON.parse( response.contentAsString )["content"]
    },

    getProjects: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/iaas/api/projects')
        this._checkStatus(response, "[getProjects]")
        return JSON.parse( response.contentAsString )["content"]
    },

    getProjectById: function(projectId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/iaas/api/projects/' + projectId)
        this._checkStatus(response, "[getProjectById]")
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getProjectByName: function(projectName) {
        var encoded = encodeURIComponent("name eq '" + projectName + "'")
        var response = this.vraAuthentication.authenticatedRequest("GET", "/iaas/api/projects?$filter=" + encoded)
        this._checkStatus(response, "[getProjectByName]")
        return JSON.parse( response.contentAsString )["content"][0]
    },

    // deployments

    getDeployments: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/deployment/api/deployments')
        this._checkStatus(response, "[getDeployments]")
        return JSON.parse( response.contentAsString )["content"]
    },

    getDeploymentById: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/deployment/api/deployments/' + deploymentId)
        this._checkStatus(response, "[getDeploymentById]")
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getDeploymentResources: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/resources')
        this._checkStatus(response, "[getDeploymentResources]")
        return JSON.parse( response.contentAsString )["content"]
    },

    getDeploymentRequests: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/requests')
        this._checkStatus(response, "[getDeploymentRequests]")
        return JSON.parse( response.contentAsString )["content"] 
    },

    getDeploymentRequestByName: function(deploymentId, requestName) {
        var encoded = encodeURIComponent("name eq '" + requestName + "'")
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/requests?$filter=' + encoded)
        this._checkStatus(response, "[getDeploymentRequestsByName]")
        var content = JSON.parse( response.contentAsString )["content"]
        return content.filter(function(request) { return request.name === requestName })
    },

    deleteDeployment: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest("DELETE", '/deployment/api/deployments/'+ deploymentId)
        this._checkStatus(response, "[deleteDeployment]")
        return JSON.parse( response.contentAsString )
    },

    // catalog
    getItem: function(searchValue) {
        encoded = encodeURIComponent(searchValue)
        var response = this.vraAuthentication.authenticatedRequest("GET", '/catalog/api/items?search=' + encoded)
        this._checkStatus(response, "[getItem]")
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getItemVersion: function(itemId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/catalog/api/items/' + itemId + '/versions')
        this._checkStatus(response, "[getItemVersion]")
        return JSON.parse( response.contentAsString )["content"][0]
    },

    postItemRequest: function(itemId, body) {
        var response = this.vraAuthentication.authenticatedRequest(
            "POST", "/catalog/api/items/" + itemId + "/request", JSON.stringify(body))
        this._checkStatus(response, "[postItemRequest]")
        return JSON.parse( response.contentAsString )[0]
    }

}

return VRAApi