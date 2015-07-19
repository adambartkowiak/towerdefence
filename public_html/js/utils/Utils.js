'use strict';

var Utils = Utils || {};

/**
 * @class Utils
 * @method inherits
 * @param {Object} constructor
 * @param {Object} baseConstructor
 */
Utils.inherits = function inherits(constructor, baseConstructor){
    constructor.prototype = Object.create(baseConstructor.prototype);
    constructor.prototype.constructor = constructor;
};
