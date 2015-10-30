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

/**
 * @class Utils
 * @method namespace
 * @param {Array} nsArray
 * @return {Object} namespace
 */
Utils.namespace = function namespace(nsArray){
    var i,
        currentNs = undefined;

    for (i=0; i<nsArray.length; i++){

        if (i == 0){
            currentNs = window[nsArray[0]] = window[nsArray[0]] || {};
        } else {
            currentNs = currentNs[nsArray[i]] = currentNs[nsArray[i]] || {};
        }

    }

    return currentNs;
};