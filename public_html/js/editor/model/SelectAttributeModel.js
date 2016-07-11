/**
 * Created by adambartkowiak on 8/7/16.
 */

'use strict';
Utils.namespace("editor.model");

/**
 * @namespace editor.model
 * @class SelectAttributeModel
 * @constructor
 */
editor.model.SelectAttributeModel = function SelectAttributeModel(attributeEnumValue, value) {

    /**
     * @param {editor.enum.AttributeEnum} attributeEnumValue
     * @private
     */
    this._attributeEnumValue = attributeEnumValue;

    /**
     * @param {*} value
     * @private
     */
    this._value = value;

};

Utils.inherits(editor.model.SelectAttributeModel, Object);

/**
 * @method getAttributeEnumValue
 * @public
 * @return {*} attributeEnumValue
 */
editor.model.SelectAttributeModel.prototype.getAttributeEnumValue = function getAttributeEnumValue(){
    return this._attributeEnumValue;
};

/**
 * @method getValue
 * @public
 * @return {*} value
 */
editor.model.SelectAttributeModel.prototype.getValue = function getValue(){
    return this._value;
};