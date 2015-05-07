'use strict';

//define class namespace
var Utils = Utils || {};

//using namespaces
//!empty

/**
 *
 * @param {Object} constructor
 * @param {Object} baseConstructor
 */
Utils.inherits = function inherits(constructor, baseConstructor){
    constructor.prototype = Object.create(baseConstructor.prototype);
    constructor.prototype.constructor = constructor;
};
