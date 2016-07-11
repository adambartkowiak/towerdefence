/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ConditionEqualOrGreater
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} leftValue
 * @param {app.model.function.AbstractValue} rightValue
 */
app.model.function.ConditionEqualOrGreater = function ConditionEqualOrGreater(id, leftValue, rightValue) {

    app.model.function.AbstractFunction.call(this, id, app.enum.FunctionEnum.EQUALS, [leftValue, rightValue]);

};

Utils.inherits(app.model.function.ConditionEqualOrGreater, app.model.function.AbstractFunction);

/**
 * @method getLeftValue
 * @return {app.model.function.AbstractValue} leftValue
 */
app.model.function.ConditionEqualOrGreater.prototype.getLeftValue = function getLeftValue() {
    return this._leftValue;
};

/**
 * @method setLeftValue
 * @param {app.model.function.AbstractValue} leftValue
 */
app.model.function.ConditionEqualOrGreater.prototype.setLeftValue = function setLeftValue(leftValue) {
    this._leftValue = leftValue;
};

/**
 * @method getRightValue
 * @return {app.model.function.AbstractValue} rightValue
 */
app.model.function.ConditionEqualOrGreater.prototype.getRightValue = function getRightValue() {
    return this._rightValue;
};

/**
 * @method setRightValue
 * @param {app.model.function.AbstractValue} rightValue
 */
app.model.function.ConditionEqualOrGreater.prototype.setRightValue = function setRightValue(rightValue) {
    this._rightValue = rightValue;
};

/**
 * @method getValue
 */
app.model.function.ConditionEqualOrGreater.prototype.getValue = function getValue(){

    if (this._functionAttributes[0].getValue() >= this._functionAttributes[1].getValue()){
        return true;
    }
    return false;
};