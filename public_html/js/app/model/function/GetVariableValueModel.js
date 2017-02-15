/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetVariableValueModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} variableId
 */
app.model.function.GetVariableValueModel = function GetVariableValueModel(id, variableId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_VARIABLE_VALUE, [variableId]);

    this._functionAttributeNames = ["variableId"];
};

Utils.inherits(app.model.function.GetVariableValueModel, app.model.function.AbstractFunctionModel);

