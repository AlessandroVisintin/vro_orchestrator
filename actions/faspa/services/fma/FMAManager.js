function FMAManager(vraApi, pollingManager, vraPollerFactory) {
    this.vraApi = vraApi
    this.pollingManager = pollingManager
    this.vraPollerFactory = vraPollerFactory
}

FMAManager.prototype = {

    constructor: FMAManager,

    deployAsync: function(projectName, deploymentName, flowMatrix) {
        var item = this.vraApi.getItem("FASPA create FMA")
        var version = this.vraApi.getItemVersion(item.id)
        var project = this.vraApi.getProjectByName(projectName)
        var body = {
            "deploymentName": deploymentName,
            "projectId": project.id,
            "inputs":{
                "fma": JSON.stringify(flowMatrix),
                "nb": flowMatrix.length
            },
            "version": version.id
        }
        return this.vraApi.postItemRequest(item.id, body)
    },

    deploy: function(projectName, deploymentName, flowMatrix) {
        request = this.deployAsync(projectName, deploymentName, flowMatrix)
        this.pollingManager.poll(
            this.vraPollerFactory.getDeploymentCreateRequestPoller(request.deploymentId)
        )
    },

    deleteAsync: function(deploymentId) {
        return this.vraApi.deleteDeployment(deploymentId)
    }

}

return FMAManager