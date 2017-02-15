/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class AbstractFunctionModelFactory
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.AbstractFunctionModelFactory = function AbstractFunctionModelFactory(functionModelFactory) {

    /**
     * @property {app.factory.FunctionModelFactory} _functionModelFactory
     * @private
     */
    this._functionModelFactory = functionModelFactory;
};

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.AbstractFunctionModelFactory.prototype.getPurpose = function getPurpose() {
    throw new Error("Method: execute in " + this.constructor.name + "is abstract and should be override");
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.AbstractFunctionModelFactory.prototype.create = function create() {
    throw new Error("Method: execute in " + this.constructor.name + "is abstract and should be override");
};