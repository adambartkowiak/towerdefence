/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ConditionEqualOrGreaterModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} leftValue
 * @param {app.model.function.AbstractValue} rightValue
 */
app.model.function.ConditionEqualOrGreaterModel = function ConditionEqualOrGreaterModel(id, leftValue, rightValue) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.EQUALS_OR_GREATER, [leftValue, rightValue]);

};

Utils.inherits(app.model.function.ConditionEqualOrGreaterModel, app.model.function.AbstractFunctionModel);
//
// /**
//  * @method getValue
//  */
// app.model.function.ConditionEqualOrGreaterModel.prototype.getValue = function getValue() {
//
//     var leftParam = this._functionAttributes[0].getValue(),
//         rightParam = this._functionAttributes[1].getValue();
//
//     if (leftParam >= rightParam) {
//         return true;
//     }
//     return false;
// };