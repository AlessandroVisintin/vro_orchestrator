function VRAVaultConfig(vaultApi, vaultPath) {
    this.vaultApi = vaultApi
    this.vaultPath = vaultPath
    this.cache = null
}

VRAVaultConfig.prototype = {

    constructor: VRAVaultConfig,

    getHost: function() {
        if (!this.cache) {
            this.cache = this.vaultApi.retrieve(this.vaultPath)
        }
        return this.cache.host
    },

    getUsername: function() {
        if (!this.cache) {
            this.cache = this.vaultApi.retrieve(this.vaultPath)
        }
        return this.cache.username
    },

    getPassword: function() {
        if (!this.cache) {
            this.cache = this.vaultApi.retrieve(this.vaultPath)
        }
        return this.cache.password
    }

}

return VRAVaultConfig
