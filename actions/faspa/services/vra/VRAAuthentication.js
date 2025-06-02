function VRAAuthentication(vraAuthenticationConfig, vraVaultConfig) {
    this.vraAuthenticationConfig = vraAuthenticationConfig
    this.vraVaultConfig = vraVaultConfig
    this.restHost = RESTHostManager.createTransientHostFrom(
                        RESTHostManager.createHost("DynamicRequest")
                    )
    this.restHost.url = this.vraVaultConfig.getHost()
}

VRAAuthentication.prototype = {

    constructor: VRAAuthentication,

    authenticatedRequest: function(method, template, body) {
        var bearerToken = this.authenticate()
        var request = null
        if (body) {
            request = this.restHost.createRequest(method, template, body)
        } else {
            request = this.restHost.createRequest(method, template)
        }
        request.setHeader("Content-Type", "application/json")
        request.setHeader("Authorization", "Bearer " + bearerToken)
        return request.execute()
    },

    authenticate: function() {

        var bearerToken = this.vraAuthenticationConfig.getBearerToken()
        if (this.validateBearerToken(bearerToken)) {
            return bearerToken
        }

        var refreshToken = this.vraAuthenticationConfig.getRefreshToken()
        bearerToken = this.getBearerToken(refreshToken)
        if (bearerToken) {
            this.vraAuthenticationConfig.setBearerToken(bearerToken)
            return bearerToken
        }

        var refreshToken = this.getRefreshToken()
        var bearerToken = this.getBearerToken(refreshToken)
        this.vraAuthenticationConfig.setRefreshToken(refreshToken)
        this.vraAuthenticationConfig.setBearerToken(bearerToken)
        return bearerToken
    },

    validateBearerToken: function(bearerToken) {
        var request = this.restHost.createRequest("GET", "/iaas/api/projects?$top=1")
        request.setHeader("Content-Type", "application/json")
        request.setHeader("Authorization", "Bearer " + bearerToken)
        var response = request.execute()
        if (response.statusCode >= 200 && response.statusCode < 300) {
            return true
        }
        return false
    },

    getBearerToken: function(refreshToken) {
        var body = JSON.stringify( {"refreshToken": refreshToken} )
        var request = this.restHost.createRequest("POST", "/iaas/api/login", body)
        request.setHeader("Content-Type", "application/json")
        var response = request.execute()
        if (response.statusCode < 200 || response.statusCode > 299) {
            return null
        }
        var content = JSON.parse( response.contentAsString )
        return content['token']
    },

    getRefreshToken: function() {
        var username = this.vraVaultConfig.getUsername()
        var password = this.vraVaultConfig.getPassword()
        var body = JSON.stringify( {"username": username, "password": password} )
        var request = this.restHost.createRequest("POST", "/csp/gateway/am/api/login?access_token", body)
        request.setHeader("Content-Type", "application/json")
        var response = request.execute()
        if (response.statusCode < 200 || response.statusCode > 299) {
            throw 'Failed to retrieve refresh token: ' + response.statusCode + " - " + response.contentAsString
        }
        var content = JSON.parse( response.contentAsString )
        return content['refresh_token']
    }

}

return VRAAuthentication
