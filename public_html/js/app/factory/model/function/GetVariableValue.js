/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class GetVariableValue
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.GetVariableValue = function GetVariableValue(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.GetVariableValue, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.GetVariableValue.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.GET_VARIABLE_VALUE;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.GetVariableValue.prototype.create = function create() {

    var variableId = new app.model.function.AttributeModel(Utils.guid(), "VARIABLE_ID");

    return new app.model.function.GetVariableValueModel(Utils.guid(), variableId);

};