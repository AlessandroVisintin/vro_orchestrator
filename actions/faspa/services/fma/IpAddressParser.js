function IpAddressParser(ipAddressConstructor) {
    this.ipAddressConstructor = ipAddressConstructor
}

IpAddressParser.prototype = {

    constructor: IpAddressParser,

    parse: function(rawIpAddress) {
        if (!rawIpAddress || typeof rawIpAddress !== 'string' || rawIpAddress.trim() === '') {
            throw '[IpAddress] Value must be a non-empty string'
        }
        var parts = rawIpAddress.trim().split('.');
        if (parts.length !== 4) { throw '[IpAddress] ' + rawIpAddress + ' has invalid IPv4 format' }

        parsed = parts.map(function(e) {
            if ( !/^\d+$/.test(e) ) { throw '[IPAddress] ' + rawIpAddress + ' has invalid character' }
            if (e.length > 1 && e.charAt(0) === '0') { throw '[IPAddress] ' + rawIpAddress + ' has leading zeros' }
            var num = parseInt(e, 10)
            if (isNaN(num) || num < 0 || num > 255) { throw '[IPAddress] ' + rawIpAddress + ' has invalid number' }
            return num
        })

        ipAddress = (parsed[0] << 24 | parsed[1] << 16 | parsed[2] << 8 | parsed[3]) >>> 0
        return new this.ipAddressConstructor(ipAddress)
    }

}

return IpAddressParser