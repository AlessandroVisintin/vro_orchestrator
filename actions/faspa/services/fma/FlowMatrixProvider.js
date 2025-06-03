function FlowMatrixProvider(zonesTable, flowMatrixConstructor) {
    this.zonesTable = zonesTable
    this.flowMatrixConstructor = flowMatrixConstructor
}

FlowMatrixProvider.prototype = {

    constructor: FlowMatrixProvider,

    byZoneName: function(zoneName) {
        results = this.zonesTable.byName(zoneName)
        if (!results) throw "FlowMatrix with zone name " + zoneName + " not found"
        if (results.length > 1) throw "Multiple FlowMatrix with zone name " + zoneName
        return ( new this.flowMatrixConstructor(results[0]) )
    }

}

return FlowMatrixProvider