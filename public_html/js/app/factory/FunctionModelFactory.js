/**
 * Created by adambartkowiak on 11/07/16.
 */

'use strict';
var ns = Utils.namespace("app.factory");

var Utils = Utils || {};

/**
 * @namespace app.factory
 * @class FunctionModelFactory
 * @memberOf app.factory
 * @constructor
 */
app.factory.FunctionModelFactory = function FunctionModelFactory() {

    /**
     * @property {Array} _abstractFunctionModelFactoryArray
     * @private
     */
    this._abstractFunctionModelFactoryArray = [];

};

Utils.inherits(app.factory.FunctionModelFactory, Object);


/**
 * @method register
 * @param {app.factory.model.function.AbstractFunctionModelFactory} abstractFunctionModelFactory
 */
app.factory.FunctionModelFactory.prototype.register = function register(abstractFunctionModelFactory) {

    this._abstractFunctionModelFactoryArray.push(abstractFunctionModelFactory);

};

/**
 * @method createFunction
 * @param {number} functionEnumValue
 * @return {app.model.function.AbstractFunction} createdFunction
 */
app.factory.FunctionModelFactory.prototype.createFunction = function createFunction(functionEnumValue) {
    var result = null,
        i,
        mainFactory = this._abstractFunctionModelFactoryArray,
        registeredFactory = null;

    for (i = 0; i < mainFactory.length; i++) {

        registeredFactory = mainFactory[i];

        if (registeredFactory.getPurpose() === functionEnumValue) {
            result = registeredFactory.create();
        }

    }

    result.setFunctionModelFactory(this);
    return result;
};