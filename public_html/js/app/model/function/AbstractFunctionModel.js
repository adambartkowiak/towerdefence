/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AbstractFunctionModel
 * @constructor
 * @param {String} id
 * @param {number} functionEnumValue
 * @param {Array} functionAttributes Array of app.model.function.AbstractValueModel
 */
app.model.function.AbstractFunctionModel = function AbstractFunctionModel(id, functionEnumValue, functionAttributes) {

    app.model.function.AbstractValueModel.call(this, id, undefined);

    /**
     * @property {number} _functionEnumValue
     * @private
     */
    this._functionEnumValue = functionEnumValue;

    /**
     * @property {app.model.function.AbstractFunctionModel} _functionAttributes
     * @private
     */
    this._functionAttributes = functionAttributes;

    //set paretn on elements
    this._functionAttributes.forEach(this._setParent, this);

};

Utils.inherits(app.model.function.AbstractFunctionModel, app.model.function.AbstractValueModel);

/**
 * @method getFunctionEnumValue
 * @return {number} functionEnumValue
 */
app.model.function.AbstractFunctionModel.prototype.getFunctionEnumValue = function getFunctionEnumValue() {
    return this._functionEnumValue;
};

/**
 * @method setFunctionEnumValue
 * @param {number} functionEnumValue
 */
app.model.function.AbstractFunctionModel.prototype.setFunctionEnumValue = function setFunctionEnumValue(functionEnumValue) {
    this._functionEnumValue = functionEnumValue;
};

/**
 * @method getFunctionAttributes
 * @return {Array} functionAttributes
 */
app.model.function.AbstractFunctionModel.prototype.getFunctionAttributes = function getFunctionAttributes() {
    return this._functionAttributes;
};

/**
 * @method setFunctionAttributes
 * @param {Array} functionAttributes Array of app.model.function.AbstractAttribute
 */
app.model.function.AbstractFunctionModel.prototype.setFunctionAttributes = function setFunctionAttributes(functionAttributes) {
    this._functionAttributes = functionAttributes;
};

/**
 * @method getElementById
 * @param {string} id
 * @return {app.model.function.AbstractValueModel} abstractValue
 */
app.model.function.AbstractFunctionModel.prototype.getElementById = function getElementById(id) {
    var result = null,
        i,
        max = this._functionAttributes.length,
        attribute;

    if (this._id === id) {
        result = this;
    } else {

        for (i = 0; i < max; i++) {

            attribute = this._functionAttributes[i];

            if (attribute instanceof app.model.function.AbstractValueModel) {
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
 * @param {app.model.function.AbstractValueModel} element
 * @return {number} index
 */
app.model.function.AbstractFunctionModel.prototype.getElementIndex = function getElementIndex(element) {
    var result = null,
        i,
        max = this._functionAttributes.length,
        attribute;


    for (i = 0; i < max; i++) {

        attribute = this._functionAttributes[i];

        if (attribute instanceof app.model.function.AbstractValueModel) {
            if (attribute.getId() === element.getId()) {
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
app.model.function.AbstractFunctionModel.prototype.removeElementByIndex = function removeElementByIndex(index) {
    this._functionAttributes.splice(index, 1);
};

/**
 * @method insertElement
 * @public
 * @param {number} index
 * @param {app.model.function.AbstractValue} element
 */
app.model.function.AbstractFunctionModel.prototype.insertElement = function insertElement(index, element) {
    this._functionAttributes.splice(index, 0, element);
    element.setParent(this);
};

/**
 * @method _setParent
 * @private
 * @param {app.model.function.AbstractValue} element
 */
app.model.function.AbstractFunctionModel.prototype._setParent = function _setParent(element, index, array) {

    element.setParent(this);
};


/**
 * @method clone
 * @return {app.model.function.AbstractFunctionModel} clone
 */
app.model.function.AbstractFunctionModel.prototype.clone = function clone() {
    return new app.model.function.AbstractValue(this.getId(), this.getValue());
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.function.AbstractFunctionModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._functionEnumValue = JSON._functionEnumValue;

    //load from JSON attributes

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.function.AbstractFunctionModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var functionAttributesMinifyJson = [],
        i,
        attribute;

    for(i=0; i<this._functionAttributes.length; i++){
        attribute = this._functionAttributes[i].getMinifyJSON();
        functionAttributesMinifyJson.push(attribute);
    }

    var result = {
        1: this._id,
        2: this._functionEnumValue,
        3: functionAttributesMinifyJson
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.function.AbstractFunctionModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _id: minifyJSON["1"],
        _functionEnumValue: minifyJSON["2"],

    };

    return result;
};
