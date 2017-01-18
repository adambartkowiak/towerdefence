/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ResourceModel
 * @constructor
 * @param {String} name
 * @param {Number} value
 * @param {Number} maxValue
 */
app.model.ResourceModel = function ResourceModel(name, value, maxValue) {

    /**
     * @property {String} _name
     * @private
     */
    this._name = name;

    /**
     * @property {Number} _value
     * @private
     */
    this._value = value;

    /**
     * @property {Number} _maxValue
     * @private
     */
    this._maxValue = maxValue;

};

Utils.inherits(app.model.ResourceModel, Object);

/**
 * @method getName
 * @return {String} name
 */
app.model.ResourceModel.prototype.getName = function getName() {
    return this._name;
};

/**
 * @method setName
 * @param {String} name
 */
app.model.ResourceModel.prototype.setName = function setName(name) {
    this._name = name;
};

/**
 * @method getValue
 * @return {Number} value
 */
app.model.ResourceModel.prototype.getValue = function getValue() {
    return this._value;
};

/**
 * @method setValue
 * @param {Number} value
 */
app.model.ResourceModel.prototype.setValue = function setValue(value) {
    this._value = value;
};

/**
 * @method getMaxValue
 * @return {Number} maxValue
 */
app.model.ResourceModel.prototype.getMaxValue = function getMaxValue() {
    return this._maxValue;
};

/**
 * @method setMaxValue
 * @param {Number} maxValue
 */
app.model.ResourceModel.prototype.setMaxValue = function setMaxValue(maxValue) {
    this._maxValue = maxValue;
};

/**
 * @method clone
 * @return {app.model.ResourceModel} clone
 */
app.model.ResourceModel.prototype.clone = function clone() {

    var result = new app.model.ResourceModel(this.getName(), this.getValue(), this.getMaxValue());

    return result;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.ResourceModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._name = JSON._name;
    this._value = JSON._value;
    this._maxValue = JSON._maxValue;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.ResourceModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._name,
        2: this._value,
        3: this._maxValue
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.ResourceModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _name: minifyJSON["1"],
        _value: minifyJSON["2"],
        _maxValue: minifyJSON["3"]
    };

    return result;
};
