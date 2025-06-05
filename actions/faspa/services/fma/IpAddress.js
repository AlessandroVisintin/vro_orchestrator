function IpAddress(ipAddress) {
    this.ipAddress = ipAddress
}

IpAddress.prototype = {

    constructor: IpAddress,

    isSameType: function(otherObj) {
        return otherObj.constructor.name !== this.constructor.name
    },

    getIp: function() {
        return this.ipAddress
    },

    toString: function() {
        return [
            (this.ipAddress >>> 24) & 0xFF,
            (this.ipAddress >>> 16) & 0xFF,
            (this.ipAddress >>> 8) & 0xFF,
            this.ipAddress & 0xFF
        ].join(".")
    }

}

return IpAddress