/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetVariableValueModel
 * @constructor
 * @param {string} id
 * @param {number} team
 */
app.model.function.GetVariableValueModel = function GetVariableValueModel(id, variableName) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_VARIABLE_VALUE, [variableName]);

};

Utils.inherits(app.model.function.GetVariableValueModel, app.model.function.AbstractFunctionModel);

