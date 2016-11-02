/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AbstractValueModel
 * @constructor
 * @param {string} id
 * @param {*} value
 */
app.model.function.AbstractValueModel = function AbstractValueModel(id, value) {

    this._id = id;

    /**
     * @property {number} _functionEnumValue
     * @private
     */
    this._functionEnumValue = app.enum.FunctionEnum.VALUE;

    this._value = value;

    this._parent = null;

};

Utils.inherits(app.model.function.AbstractValueModel, Object);

/**
 * @method getId
 * @return {string} id
 */
app.model.function.AbstractValueModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {string} id
 */
app.model.function.AbstractValueModel.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getFunctionEnumValue
 * @return {number} functionEnumValue
 */
app.model.function.AbstractValueModel.prototype.getFunctionEnumValue = function getFunctionEnumValue() {
    return this._functionEnumValue;
};

/**
 * @method setFunctionEnumValue
 * @param {number} functionEnumValue
 */
app.model.function.AbstractValueModel.prototype.setFunctionEnumValue = function setFunctionEnumValue(functionEnumValue) {
    this._functionEnumValue = functionEnumValue;
};

/**
 * @method getValue
 * @return {*} value
 */
app.model.function.AbstractValueModel.prototype.getValue = function getValue() {
    return this._value;
};

/**
 * @method setValue
 * @param {*} value
 */
app.model.function.AbstractValueModel.prototype.setValue = function setValue(value) {
    this._value = value;
};

/**
 * @method getParent
 * @return {*} value
 */
app.model.function.AbstractValueModel.prototype.getParent = function getParent() {
    return this._parent;
};

/**
 * @method setParent
 * @param {*} value
 */
app.model.function.AbstractValueModel.prototype.setParent = function setParent(parent) {
    this._parent = parent;
};

/**
 * @method getElementById
 * @param {string} id
 * @return {app.model.function.AbstractValueModel} AbstractValueModel
 */
app.model.function.AbstractValueModel.prototype.getElementById = function getElementById(id) {
    var result = null;

    if (this._id === id) {
        result = this;
    } else if (this._value instanceof app.model.function.AbstractValueModel) {
        result = this._value.getElementById(id);
    }

    return result;
};


/**
 * @method clone
 * @return {app.model.function.AbstractValueModel} clone
 */
app.model.function.AbstractValueModel.prototype.clone = function clone() {
    return new app.model.function.AbstractValueModel(this.getId(), this.getValue());
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.function.AbstractValueModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._functionEnumValue = JSON._functionEnumValue;
    this._value = JSON._value;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.function.AbstractValueModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._id,
        2: this._functionEnumValue,
        3: this._value
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.function.AbstractValueModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _id: minifyJSON["1"],
        _functionEnumValue: minifyJSON["2"],
        _value: minifyJSON["3"]
    };

    return result;
};
