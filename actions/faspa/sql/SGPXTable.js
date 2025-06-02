// constructor
function SGPXTable(tableName, cursor) {
    this.cursor = cursor
    this.tableName = tableName
}

// populate object
SGPXTable.prototype = {
    
    constructor: SGPXTable,

    all: function() {
        var query = "SELECT * FROM " + this.tableName
        return this.cursor.selectQuery(query)
    }
 
}

// return object prototype
return SGPXTable
