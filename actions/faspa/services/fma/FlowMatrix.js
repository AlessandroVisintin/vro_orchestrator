function FlowMatrix(zoneTableRow) {
    for (var key in zoneTableRow) {
        if (zoneTableRow.hasOwnProperty(key)) {
            this[key] = zoneTableRow[key];
        }
    }
}

FlowMatrix.prototype = {

    constructor: FlowMatrix,

    getSecDomain: function() {
        return this.secdomain.split(",").map(function(e) {
            return e.replace(/^\s+|\s+$/g, '')
        })
    },

    getUserDelete: function() { return this.userdelete },
    getApproval: function() { return this.approval },
    getProject: function() { return this.project },
    getDescription: function() { return this.description },
    getBubbleHe: function() { return this.bubble_he },
    getVersion: function() { return this.version },
    getIssuerSd: function() { return this.issuersd },
    getApprovalSession: function() { return this.approval_session },
    getTimestampCreate: function() { return this.timestamp_create },
    getDeleteTimestamp: function() { return this.delete_timestamp },
    getFiltered: function() { return this.filtered },
    getUserCreate: function() { return this.usercreate },
    getName: function() { return this.name },
    getTrustedSd: function() { return this.trustedsd },
    getId: function() { return this.id },
    getDeploymentId: function() { return this.deployment_id },
    getApprovalGroup: function() { return this.approval_group },
    getStatus: function() { return this.status },
    getDirection: function() { return this.direction }

}

return FlowMatrix
