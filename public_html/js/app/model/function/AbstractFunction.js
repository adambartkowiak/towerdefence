/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AbstractFunction
 * @constructor
 * @param {String} id
 * @param {number} functionEnumValue
 * @param {Array} functionAttributes Array of app.model.function.AbstractAttributeModel
 */
app.model.function.AbstractFunction = function AbstractFunction(id, functionEnumValue, functionAttributes) {

    app.model.function.AbstractValue.call(this, id, undefined);

    /**
     * @property {number} _functionEnumValue
     * @private
     */
    this._functionEnumValue = functionEnumValue;

    /**
     * @property {app.model.function.AbstractFunction} _functionAttributes
     * @private
     */
    this._functionAttributes = functionAttributes;

    //set paretn on elements
    this._functionAttributes.forEach(this._setParent, this);

};

Utils.inherits(app.model.function.AbstractFunction, app.model.function.AbstractValue);

/**
 * @method getFunctionEnumValue
 * @return {number} functionEnumValue
 */
app.model.function.AbstractFunction.prototype.getFunctionEnumValue = function getFunctionEnumValue() {
    return this._functionEnumValue;
};

/**
 * @method setFunctionEnumValue
 * @param {number} functionEnumValue
 */
app.model.function.AbstractFunction.prototype.setFunctionEnumValue = function setFunctionEnumValue(functionEnumValue) {
    this._functionEnumValue = functionEnumValue;
};

/**
 * @method getFunctionAttributes
 * @return {Array} functionAttributes
 */
app.model.function.AbstractFunction.prototype.getFunctionAttributes = function getFunctionAttributes() {
    return this._functionAttributes;
};

/**
 * @method setFunctionAttributes
 * @param {Array} functionAttributes Array of app.model.function.AbstractAttribute
 */
app.model.function.AbstractFunction.prototype.setFunctionAttributes = function setFunctionAttributes(functionAttributes) {
    this._functionAttributes = functionAttributes;
};

/**
 * @method getElementById
 * @param {string} id
 * @return {app.model.function.AbstractValue} abstractValue
 */
app.model.function.AbstractFunction.prototype.getElementById = function getElementById(id) {
    var result = null,
        i,
        max = this._functionAttributes.length,
        attribute;

    if (this._id === id) {
        result = this;
    } else {

        for (i = 0; i < max; i++) {

            attribute = this._functionAttributes[i];

            if (attribute instanceof app.model.function.AbstractValue) {
                result = attribute.getElementById(id);
                if (result !== null) {
                    break;
                }
            }

        }

    }

    return result;
};

/**
 * @method getElementIndex
 * @param {app.model.function.AbstractValue} element
 * @return {number} index
 */
app.model.function.AbstractFunction.prototype.getElementIndex = function getElementIndex(element) {
    var result = null,
        i,
        max = this._functionAttributes.length,
        attribute;


    for (i = 0; i < max; i++) {

        attribute = this._functionAttributes[i];

        if (attribute instanceof app.model.function.AbstractValue) {
            if (attribute.getId() === element.getId()){
                result = i;
                break;
            }
        }

    }

    return result;
};

/**
 * @method removeElementByIndex
 * @public
 * @param {number} index
 */
app.model.function.AbstractFunction.prototype.removeElementByIndex = function removeElementByIndex(index) {
    this._functionAttributes.splice(index, 1);
};

/**
 * @method insertElement
 * @public
 * @param {number} index
 * @param {app.model.function.AbstractValue} element
 */
app.model.function.AbstractFunction.prototype.insertElement = function insertElement(index, element) {
    this._functionAttributes.splice(index, 0, element);
    element.setParent(this);
};

/**
 * @method _setParent
 * @private
 * @param {app.model.function.AbstractValue} element
 */
app.model.function.AbstractFunction.prototype._setParent = function _setParent(element, index, array) {

    element.setParent(this);
};