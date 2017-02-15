/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class IncrementVariableValueModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} variableId
 */
app.model.function.IncrementVariableValueModel = function IncrementVariableValueModel(id, variableId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.INCREMENT_VARIABLE_VALUE, [variableId]);

    this._functionAttributeNames = ["variableId"];
};

Utils.inherits(app.model.function.IncrementVariableValueModel, app.model.function.AbstractFunctionModel);

