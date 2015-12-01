'use strict';

var Utils = Utils || {};

/**
 * @class Utils
 * @method inherits
 * @param {Object} constructor
 * @param {Object} baseConstructor
 */
Utils.inherits = function inherits(constructor, baseConstructor) {
    constructor.prototype = Object.create(baseConstructor.prototype);
    constructor.prototype.constructor = constructor;
};

/**
 * @class Utils
 * @method namespace
 * @param {String} nsString
 * @return {Object} namespace
 */
Utils.namespace = function namespace(nsString) {
    var i,
        nsArray = nsString.split("."),
        namespace = window;

    for (i = 0; i < nsArray.length; i++) {
        namespace = namespace[nsArray[i]] = namespace[nsArray[i]] || {};
    }

    return namespace;
};


//Array Equalse
// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}