function VRAApi(vraAuthentication) {
    this.vraAuthentication = vraAuthentication
}

VRAApi.prototype = {

    constructor: VRAApi,

    // iaas

    getCloudAccounts: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", "iaas/api/cloud-accounts")
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getCloudAccounts] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"]
    },

    getProjects: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/iaas/api/projects')
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getProjects] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"]
    },

    getProjectById: function(projectId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/iaas/api/projects/' + projectId)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getProjects] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getProjectByName: function(projectName) {
        var encoded = encodeURIComponent("name eq '" + projectName + "'")
        var response = this.vraAuthentication.authenticatedRequest("GET", "/iaas/api/projects?$filter=" + encoded)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getProjectByName] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"][0]
    },

    // deployments

    getDeployments: function() {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/deployment/api/deployments')
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getDeployments] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"]
    },

    getDeploymentById: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/deployment/api/deployments/' + deploymentId)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getDeploymentById] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getDeploymentResources: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/resources')
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getDeploymentResources] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"]
    },

    getDeploymentRequests: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/requests')
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getDeploymentRequests] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"] 
    },

    getDeploymentRequestByName: function(deploymentId, requestName) {
        var encoded = encodeURIComponent("name eq '" + requestName + "'")
        var response = this.vraAuthentication.authenticatedRequest(
            "GET", '/deployment/api/deployments/'+ deploymentId + '/requests?$filter=' + encoded)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getDeploymentRequestsByName] ' + response.contentAsString
        }
        var content = JSON.parse( response.contentAsString )["content"]
        return content.filter(function(request) {
            return request.name === requestName;
        })

    },

    deleteDeployment: function(deploymentId) {
        var response = this.vraAuthentication.authenticatedRequest("DELETE", '/deployment/api/deployments/'+ deploymentId)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [deleteDeployment] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )
    },

    // catalog
    getItem: function(searchValue) {
        encoded = encodeURIComponent(searchValue)
        var response = this.vraAuthentication.authenticatedRequest("GET", '/catalog/api/items?search=' + encoded)
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getItem] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"][0]
    },

    getItemVersion: function(itemId) {
        var response = this.vraAuthentication.authenticatedRequest("GET", '/catalog/api/items/' + itemId + '/versions')
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [getItemVersion] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )["content"][0]
    },

    postItemRequest: function(itemId, body) {
        var response = this.vraAuthentication.authenticatedRequest(
            "POST", "/catalog/api/items/" + itemId + "/request", JSON.stringify(body))
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw response.statusCode + ': [postItemRequest] ' + response.contentAsString
        }
        return JSON.parse( response.contentAsString )[0]
    }

}

return VRAApi