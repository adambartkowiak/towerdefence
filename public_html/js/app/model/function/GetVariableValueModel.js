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
 * @param {string} varibaleId
 */
app.model.function.GetVariableValueModel = function GetVariableValueModel(id, varibaleId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_VARIABLE_VALUE, [varibaleId]);

    this._functionAttributeNames = ["variableId"];
};

Utils.inherits(app.model.function.GetVariableValueModel, app.model.function.AbstractFunctionModel);

