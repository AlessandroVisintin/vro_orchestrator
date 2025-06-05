function IpAddressCollectionParser(
    ipAddressParser,
    ipAddressRangeParser,
    ipAddressCollectionConstructor
) {
    this.ipAddressParser = ipAddressParser
    this.ipAddressRangeParser = ipAddressRangeParser
    this.ipAddressCollectionConstructor = ipAddressCollectionConstructor
}

IpAddressCollectionParser.prototype = {

    constructor: IpAddressCollectionParser,

    parse: function(rawIpAddressList) {
        if (!rawIpAddressList || typeof rawIpAddressList !== 'string' || rawIpAddressList.trim() === '') {
            throw '[IpAddressCollectionParser] Value must be a non-empty string'
        }
        var parts = rawIpAddressList
            .trim()
            .split(',')
            .map(function(e) {
                var errors = []
                try { return this.ipAddressRangeParser.parse(e) }
                catch (ex) { errors.push(ex) }
                try { return this.ipAddressParser.parse(e) }
                catch (ex) { errors.push(ex) }
                throw '[IpAddressCollectionParser] Cannot parse ' + e + ':' + errors.join(', ')
            }.bind(this))

        return new this.ipAddressCollectionConstructor(parts)
    }

}

return IpAddressCollectionParser