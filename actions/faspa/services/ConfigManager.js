function ConfigManager(rootPath) {
    this.rootPath = rootPath ? rootPath : ""
}

ConfigManager.prototype = {
    constructor: ConfigManager,

    getAllElements: function(configPath) {
        var fullPath = configPath ? this.rootPath + '/' + configPath : this.rootPath
        var category = Server.getConfigurationElementCategoryWithPath(fullPath)
        if (!category) {
            throw new Error("Configuration category not found: " + fullPath)
        }
        return category.configurationElements || []
    },

    getElement: function(configPath, elementName) {
        if (!elementName) {
            throw new Error("Element name cannot be empty")
        }
        var elements = this.getAllElements(configPath)
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].name === elementName) {
                return elements[i]
            }
        }
        throw new Error("Configuration element not found: " + elementName)
    },

    getAttribute: function(attributePath) {
        if (!attributePath) {
            throw new Error("Attribute name cannot be empty")
        }
        var parts = attributePath.split("/")
        var attributeName =  parts.pop()
        var elementName = parts.pop()
        var configPath = parts.join('/')
        var element = this.getElement(configPath, elementName)
        var attribute = element.getAttributeWithKey(attributeName)
        if (!attribute) {
            throw new Error("Attribute not found: " + attributeName + " in " + attributePath)
        }
        return attribute.value
    },

    setAttribute: function(attributePath, attributeValue) {
        if (!attributePath) {
            throw new Error("Attribute name cannot be empty")
        }
        var parts = attributePath.split("/")
        var attributeName =  parts.pop()
        var elementName = parts.pop()
        var configPath = parts.join('/')
        var element = this.getElement(configPath, elementName)
        element.setAttributeWithKey(attributeName, attributeValue)
    }
}

return ConfigManager
