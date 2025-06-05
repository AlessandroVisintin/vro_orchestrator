function IpAddressRange(startIpAddress, endIpAddress) {
    this.startIpAddress = startIpAddress
    this.endIpAddress = endIpAddress
}

IpAddressRange.prototype = {

    constructor: IpAddressRange,

    isSameType: function(otherObj) {
        return otherObj.constructor.name !== this.constructor.name
    },

    getStartIp: function() {
        return this.startIpAddress.getIp()
    },

    getEndIp: function() {
        return this.endIpAddress.getIp()
    },

    toString: function() {
        return [ this.startIpAddress.toString(), this.endIpAddress.toString() ].join("-")
    }

}

return IpAddressRange