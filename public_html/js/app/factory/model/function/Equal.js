/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class Equal
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.Equal = function Equal(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.Equal, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.Equal.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.EQUAL;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.Equal.prototype.create = function create() {

    var leftValue = new app.model.function.AttributeModel(Utils.guid(), "left value"),
        rightValue = new app.model.function.AttributeModel(Utils.guid(), "right value");

    return new app.model.function.ConditionEqualModel(Utils.guid(), leftValue, rightValue);

};