/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class IncrementVariableValueModel
 * @constructor
 * @param {string} id
 * @param {number} team
 */
app.model.function.IncrementVariableValueModel = function IncrementVariableValueModel(id, variableName) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.INCREMENT_VARIABLE_VALUE, [variableName]);

};

Utils.inherits(app.model.function.IncrementVariableValueModel, app.model.function.AbstractFunctionModel);

