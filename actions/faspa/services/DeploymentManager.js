function DeploymentManager(vraApi) {
    this.vraApi = vraApi
    this.maxWait = 45 * 60 * 1000
    this.maxInterval = 15 * 1000
    this.initInterval = 5000
    this.backoff = 1.5
}

DeploymentManager.prototype = {

    constructor: DeploymentManager,

    _wait: function(deploymentId) {
        var startTime = new Date().getTime()
        var curInterval = this.initInterval
        while (true) {
            var response = this.vraApi.getDeploymentRequestStatus(deploymentId)
            switch (response.status) {
                case 'SUCCESSFUL' : return
                case 'FAILED' : throw deploymentId + " failed"
                case 'ABORTED' : throw deploymentId + " aborted"
                default: break
            }
            if( (new Date().getTime() - startTime) > this.maxWait) {
                throw depolymentId + ' timed out'
            }
            var sleepTime = Math.min(curInterval, this.maxInterval)            
            System.sleep(sleepTime);
            curInterval *= this.backoff
        }
    },

    deployFlowMatrix: function(projectName, deploymentName, flowMatrix) {
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
    }

}

return DeploymentManager
