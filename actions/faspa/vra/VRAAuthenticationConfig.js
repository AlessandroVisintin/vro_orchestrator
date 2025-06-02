function VRAAuthenticationConfig(configManager) {
    this.configManager = configManager
    this.refreshTokenPath = "VRA/refreshToken"
    this.bearerTokenPath = "VRA/bearerToken"
    // check existence
    this.configManager.getAttribute(this.refreshTokenPath)
    this.configManager.getAttribute(this.bearerTokenPath)
}

VRAAuthenticationConfig.prototype = {

    constructor: VRAAuthenticationConfig,

    getRefreshToken: function() {
        return this.configManager.getAttribute(this.refreshTokenPath)
    },

    getBearerToken: function() {
        return this.configManager.getAttribute(this.bearerTokenPath)
    },

    setRefreshToken: function(refreshTokenValue) {
        return this.configManager.setAttribute(this.refreshTokenPath, refreshTokenValue)
    },

    setBearerToken: function(bearerTokenValue) {
        return this.configManager.setAttribute(this.bearerTokenPath, bearerTokenValue)
    }

}

return VRAAuthenticationConfig
