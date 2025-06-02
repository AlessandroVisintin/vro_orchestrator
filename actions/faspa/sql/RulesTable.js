// constructor
function RulesTable(tableName, cursor) {
    this.cursor = cursor
    this.tableName = tableName
}

// populate object
RulesTable.prototype = {
    
    constructor: RulesTable,

    all: function() {
        var query = "SELECT * FROM " + this.tableName
        return this.cursor.selectQuery(query)
    }
 
}

// return object prototype
return RulesTable
