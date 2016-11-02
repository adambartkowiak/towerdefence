/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ConditionEqualModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} leftValue
 * @param {app.model.function.AbstractValue} rightValue
 */
app.model.function.ConditionEqualModel = function ConditionEqualModel(id, leftValue, rightValue) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.EQUALS, [leftValue, rightValue]);

};

Utils.inherits(app.model.function.ConditionEqualModel, app.model.function.AbstractFunctionModel);