// constructor
function SqlCursor(databaseName, sqlProvider) {
    this.databaseName = databaseName
    this.sqlProvider = sqlProvider
}

// populate object
SqlCursor.prototype = {

    constructor: SqlCursor,

    escapeValue: function(value) {
        if (value === null || value === undefined) {
            return 'NULL';
        }
        switch (typeof value) {
            case 'boolean':
                return value ? '1' : '0';
            case 'number':
                return value.toString();
            case 'string':
                // Escape special characters that could be used for SQL injection
                return "'" + value.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s) {
                    switch(s) {
                        case "\0": return "\\0";
                        case "\n": return "\\n";
                        case "\r": return "\\r";
                        case "\b": return "\\b";
                        case "\t": return "\\t";
                        case "\x1a": return "\\Z";
                        case "'": return "\\'";
                        case '"': return '\\"';
                        case "\\": return "\\\\";
                        default: return s;
                    }
                }) + "'";
            default:
                return "'" + value.toString().replace(/'/g, "''") + "'";
        }
    },

    prepareQuery: function(query, params) {
        if (!params || !Array.isArray(params) || params.length === 0) {
            return query;
        }
        
        var self = this;
        var index = 0;
        var preparedQuery = query.replace(/\?/g, function() {
            if (index >= params.length) {
                throw new Error("Not enough parameters provided for query");
            }
            return self.escapeValue(params[index++]);
        });
        
        // Check if we used all parameters
        if (index < params.length) {
            System.debug("Warning: " + (params.length - index) + " parameters were not used in the query");
        }
        
        return preparedQuery;
    },
    
    selectQuery: function(query, params) {
        var result = null
        if (params && Array.isArray(params) && params.length > 0) {
            var processedQuery = this.prepareQuery(query, params)
            System.log( processedQuery )
            result = this.sqlProvider.selectQuery(processedQuery, this.databaseName)
        } else {
            result = this.sqlProvider.selectQuery(query, this.databaseName)
        }
        if (result === '[]' || result == null || result == undefined) {
            return []
        }
        return JSON.parse(result)
    },
    
    executeQuery: function(query, params) {
        if (params && Array.isArray(params) && params.length > 0) {
            var processedQuery = this.prepareQuery(query, params)
            return this.sqlProvider.executeQuery(processedQuery, this.databaseName)
        }
        return this.sqlProvider.executeQuery(query, this.databaseName)
    }

}

// return constructor
return SqlCursor
