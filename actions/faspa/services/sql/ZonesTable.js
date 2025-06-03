// constructor
function ZonesTable(tableName, cursor) {
    this.cursor = cursor
    this.tableName = tableName
}

// populate object
ZonesTable.prototype = {
    constructor: ZonesTable,

    all: function() {
        var query = "SELECT * FROM " + this.tableName
        return this.cursor.selectQuery(query)
    },
 
    byId: function(id) {
        var query = "SELECT * FROM " + this.tableName + " WHERE id = ?"
        return this.cursor.selectQuery(query, [id])
    },

    byName: function(name) {
        var query = "SELECT * FROM " + this.tableName + " WHERE name = ?"
        return this.cursor.selectQuery(query, [name])
    }
    
}

// return object prototype
return ZonesTable
