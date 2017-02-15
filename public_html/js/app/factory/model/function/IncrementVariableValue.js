/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class IncrementVariableValue
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.IncrementVariableValue = function IncrementVariableValue(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.IncrementVariableValue, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.IncrementVariableValue.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.INCREMENT_VARIABLE_VALUE;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.IncrementVariableValue.prototype.create = function create() {

    var variableId = new app.model.function.AttributeModel(Utils.guid(), "VARIABLE_ID");

    return new app.model.function.IncrementVariableValueModel(Utils.guid(), variableId);

};