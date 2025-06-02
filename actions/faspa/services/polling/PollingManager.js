var StatusEnum = {
    IN_PROGRESS: "IN_PROGRESS",
    SUCCESSFUL: "SUCCESSFUL", 
    FAILED: "FAILED",
}

function PollingManager(maxRetries, maxWait, sleepTime, decreasingFactor) {
    this.maxRetries = maxRetries || 50
    this.maxWait = (maxWait || 30) * 1000
    this.sleepTime = (sleepTime || 15) * 1000
    this.decreasingFactor = Math.max(decreasingFactor || 1, 1)
}

PollingManager.prototype = {

    constructor: PollingManager,

    poll: function(pollingFunction) {
        var attempts = this.maxRetries
        var sleepTime = this.sleepTime
        while (attempts > 0) {
            System.log("Polling... " + attempts + " " + sleepTime)
            var result = pollingFunction(StatusEnum)
            if (result.status !== StatusEnum.IN_PROGRESS) {
                if (result.status === StatusEnum.SUCCESSFUL) {
                    return result
                }
                throw 'PollingManager: ' + result.status + ' - ' + (result.message || 'No details')
            }
            System.sleep(sleepTime)
            attempts--
            sleepTime = Math.min(sleepTime * this.decreasingFactor, this.maxWait);
        }
        throw 'PollingManager: Operation timed out'
    }

}

return PollingManager