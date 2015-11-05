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

