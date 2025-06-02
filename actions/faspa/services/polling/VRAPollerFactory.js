function VRAPollerFactory(vraApi) {
    this.vraApi = vraApi
}

VRAPollerFactory.prototype = {

    constructor: VRAPollerFactory,

    getDeploymentCreateRequestPoller: function (deploymentId) {
        var vraApi = this.vraApi
        return function(status) {
            var content = vraApi.getDeploymentRequestByName(deploymentId, "Create")
            if (!content || content.length <= 0) {
                return {
                    "status": status.FAILED,
                    "message": "'Create' request not found for deployment" + deploymentId
                }
            }
            if (content.length > 1) {
                return {
                    "status": status.FAILED,
                    "message": "Multiple 'Create' request for deployment" + deploymentId
                }
            }
            switch (content[0].status) {
                case "INPROGRESS":
                    return { "status": status.IN_PROGRESS }
                case "SUCCESSFUL":
                    return { "status": status.SUCCESSFUL }
                default :
                    return {
                        "status": status.FAILED,
                        "message": "Failed with status " + content[0].status + ": " + content[0].details
                    }
            }            

        }

    }

}

return VRAPollerFactory