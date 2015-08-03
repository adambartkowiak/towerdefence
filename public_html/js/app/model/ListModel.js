/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ListModel
 * @constructor
 */
app.model.ListModel = function ListModel() {

    /**
     * @property {Array} _elements
     * @private
     */
    this._elements = [];

};

Utils.inherits(app.model.ListModel, Object);


/**
 * @method addElement
 * @param {Object} object
 */
app.model.ListModel.prototype.addElement = function addElement(object) {
    this._elements.push(object);
};

/**
 * @method getElement
 * @param {Number} index
 * @return {Object} object
 */
app.model.ListModel.prototype.getElement = function getElement(index) {
    return this._elements[index];
};

/**
 * @method removeElement
 * @param {Number} index
 */
app.model.ListModel.prototype.removeElement = function removeElement(index) {
    this._elements.splice(index, 1);
};

/**
 * @method getElements
 * @return {Array} _elements
 */
app.model.ListModel.prototype.getElements = function getElements() {
    return this._elements;
};

/**
 * @method clear
 */
app.model.ListModel.prototype.clear = function clear() {
    this._elements.length = 0;
};

/**
 * @method length
 * @return {Number} length
 */
app.model.ListModel.prototype.length = function length() {
    return this._elements.length;
};


/**
 * @method clone
 * @return {app.model.ListModel} clone
 */
app.model.ListModel.prototype.clone = function clone() {

    var index;
    var length = this.length();
    var clone = new app.model.ListModel();

    for (index = 0; index < length; index++) {
        clone._elements[index] = this._elements[index].clone();
    }

    return clone;
};