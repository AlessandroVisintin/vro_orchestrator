function VRAPollerFactory(vraApi) {
    this.vraApi = vraApi
}

VRAPollerFactory.prototype = {

    constructor: VRAPollerFactory,

    _check_status: function(request, status) {
        switch (request.status) {
            case "PENDING":
            case "INITIALIZATION":
            case "CHECKING_APPROVAL":
            case "INPROGRESS":
                return { "status": status.IN_PROGRESS }
            case "SUCCESSFUL":
                return { "status": status.SUCCESSFUL }
            default :
                return {
                    "status": status.FAILED,
                    "message": "Failed with status " + request.status + ": " + request.details
                }
        }
    },

    getDeploymentCreateRequestPoller: function(deploymentId) {
        var vraApi = this.vraApi
        var _check_status = this._check_status
        return function(status) {
            var content = vraApi.getDeploymentRequestByName(deploymentId, "Create")
            if (!content || content.length <= 0) {
                return {
                    "status": status.FAILED,
                    "message": "'Create' request not found for deployment " + deploymentId
                }
            }
            if (content.length > 1) {
                return {
                    "status": status.FAILED,
                    "message": "Multiple 'Create' request for deployment " + deploymentId
                }
            }
            return _check_status(content[0], status)
        }
    },

    getDeploymentDeleteRequestPoller: function(deploymentId) {
        var vraApi = this.vraApi
        var _check_status = this._check_status
        return function(status) {
            try {
                var content = vraApi.getDeploymentRequestByName(deploymentId, "Delete")
                if (!content || content.length <= 0) {
                    return {
                        "status": status.FAILED,
                        "message": "'Delete' request not found for deployment" + deploymentId
                    }
                }
                if (content.length > 1) {
                    return {
                        "status": status.FAILED,
                        "message": "Multiple 'Delete' request for deployment" + deploymentId
                    }
                }
                return _check_status(content[0], status)
            }
            catch (ex) {
                if (ex.indexOf("404") === 0) {
                    return { "status": status.SUCCESSFUL }
                }
                return {
                    "status": status.FAILED,
                    "message": ex
                }
            }
        }
    }

}

return VRAPollerFactory