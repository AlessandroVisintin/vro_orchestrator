// constructor
function ServiceRegistry() {
    if (ServiceRegistry.instance) {
        return ServiceRegistry.instance;
    }
    ServiceRegistry.instance = this;
    this.serviceDefinitions = {};
    this.singletons = {};
    this.resolving = {}; // to avoid circular dependencies
}

// define object prototype
ServiceRegistry.prototype = {

    constructor : ServiceRegistry,

    register : function(Constructor, singleton, initialization) {
        var serviceName = Constructor.prototype.constructor.name
        this.serviceDefinitions[serviceName] = {
            Constructor: Constructor,
            singleton: singleton === undefined ? true : singleton,
            initialization: initialization || null
        }
        this._defineServiceProperty(serviceName)
        return this;
    },

    _defineServiceProperty: function(serviceName) {
        var self = this;
        Object.defineProperty(
            this,
            serviceName,
            {
                get: function() { return self.resolve(serviceName) },
                enumerable: true,
                configurable: true
            }
        );
    },

    resolve : function(name) {
        var definition = this.serviceDefinitions[name]
        if (!definition)
            throw new Error("Service not registered: " + name)
        if (definition.singleton && this.singletons[name])
            return this.singletons[name];
        if (this.resolving[name])
            throw new Error("Circular dependency detected with " + name)
        var initParams = []
        if (definition.initialization) {
            this.resolving[name] = true;
            initParams = definition.initialization(this) || []
            initParams = Array.isArray(initParams) ? initParams : [initParams]
            this.resolving[name] = false
        }
        var instance = Object.create(definition.Constructor.prototype)
        definition.Constructor.apply(instance, initParams)
        if (definition.singleton)
            this.singletons[name] = instance
        return instance
    }

}

// return prototype
return ServiceRegistry
