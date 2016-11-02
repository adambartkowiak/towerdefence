/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class VariableModel
 * @constructor
 * @param {String} id
 * @param {String} value
 */
app.model.VariableModel = function VariableModel(id, value) {

    /**
     * @property {String} _id
     * @private
     */
    this._id = id;

    /**
     * @property {*} _value
     * @private
     */
    this._value = value;

};

Utils.inherits(app.model.VariableModel, Object);

/**
 * @method getId
 * @return {String} id
 */
app.model.VariableModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {String} name
 */
app.model.VariableModel.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getValue
 * @return {*} value
 */
app.model.VariableModel.prototype.getValue = function getValue() {
    return this._value;
};

/**
 * @method setValue
 * @param {*} value
 */
app.model.VariableModel.prototype.setValue = function setValue(value) {
    this._value = value;
};

/**
 * @method clone
 * @return {app.model.VariableModel} clone
 */
app.model.VariableModel.prototype.clone = function clone() {

    var result =  new app.model.VariableModel(this.getId(), this.getValue());
    return result;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.VariableModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._value = JSON._value;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.VariableModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1:this._id,
        2:this._value
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.VariableModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _id: minifyJSON["1"],
        _value: minifyJSON["2"]
    };

    return result;
};
