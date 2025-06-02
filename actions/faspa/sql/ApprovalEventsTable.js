// constructor
function ApprovalEventsTable(tableName, cursor) {
    this.cursor = cursor
    this.tableName = tableName
}

// populate object
ApprovalEventsTable.prototype = {
    
    constructor: ApprovalEventsTable,

    all: function() {
        var query = "SELECT * FROM " + this.tableName
        return this.cursor.selectQuery(query)
    }
 
}

// return object prototype
return ApprovalEventsTable
