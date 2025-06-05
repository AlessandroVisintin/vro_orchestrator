function IpAddressRangeParser(ipAddressParser, ipAddressRangeConstructor) {
    this.ipAddressParser = ipAddressParser
    this.ipAddressRangeConstructor = ipAddressRangeConstructor
}

IpAddressRangeParser.prototype = {

    constructor: IpAddressRangeParser,

    parse: function(rawIpRange) {
        if (!rawIpRange || typeof rawIpRange !== 'string' || rawIpRange.trim() === '') {
            throw '[IpAddressRangeParser] Value must be a non-empty string'
        }

        var range = rawIpRange.split("-")
        if (range.length !== 2) { throw '[IpAddressRangeParser] ' + rawIpRange + ' has wrong IP range format' }

        var ipAddressStart = this.ipAddressParser.parse(range[0])
        var ipAddressEnd = this.ipAddressParser.parse(range[1])

        if ( ipAddressStart.getIp() >= ipAddressEnd.getIp() ) {
            throw '[IpAddressRangeParser] ' + ipAddressStart.toString() + ' must be smaller than ' + ipAddressEnd.toString()
        }

        return new this.ipAddressRangeConstructor(ipAddressStart, ipAddressEnd)
    }

}

return IpAddressRangeParser
