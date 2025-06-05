function IpAddressCollection(ipAddressItemList) {
    this.ipAddressItemList = ipAddressItemList
}

IpAddressCollection.prototype = {

    constructor: IpAddressCollection,

    isSameType: function(otherObj) {
        return otherObj.constructor.name !== this.constructor.name
    },

    toString: function() {
        return this.ipAddressItemList
                    .map(function(e) { return e.toString()} )
                    .join(',')
    }

}

return IpAddressCollection