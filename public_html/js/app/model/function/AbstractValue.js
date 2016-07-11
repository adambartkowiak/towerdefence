/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AbstractValue
 * @constructor
 * @param {string} id
 * @param {*} value
 */
app.model.function.AbstractValue = function AbstractValue(id, value) {

    this._id = id;

    this._value = value;

    this._parent = null;

};

Utils.inherits(app.model.function.AbstractValue, Object);

/**
 * @method getId
 * @return {string} id
 */
app.model.function.AbstractValue.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {string} id
 */
app.model.function.AbstractValue.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getValue
 * @return {*} value
 */
app.model.function.AbstractValue.prototype.getValue = function getValue() {
    return this._value;
};

/**
 * @method setValue
 * @param {*} value
 */
app.model.function.AbstractValue.prototype.setValue = function setValue(value) {
    this._value = value;
};

/**
 * @method getParent
 * @return {*} value
 */
app.model.function.AbstractValue.prototype.getParent = function getParent() {
    return this._parent;
};

/**
 * @method setParent
 * @param {*} value
 */
app.model.function.AbstractValue.prototype.setParent = function setParent(parent) {
    this._parent = parent;
};

/**
 * @method getElementById
 * @param {string} id
 * @return {app.model.function.AbstractValue} abstractValue
 */
app.model.function.AbstractValue.prototype.getElementById = function getElementById(id) {
    var result = null;

    if (this._id === id) {
        result = this;
    } else if (this._value instanceof app.model.function.AbstractValue) {
        result = this._value.getElementById(id);
    }

    return result;
};