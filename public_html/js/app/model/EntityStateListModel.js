/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityStateListModel
 * @constructor
 */
app.model.EntityStateListModel = function EntityStateListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.EntityStateListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {String} id
 * @return {Object} object
 */
app.model.EntityStateListModel.prototype.getElementById = function getElementById(id) {

    var index;
    var length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            return this._elements[index];
        }
    }

    return null;
};

/**
 * @method removeElementById
 * @param {String} id
 */
app.model.EntityStateListModel.prototype.removeElementById = function removeElementById(id) {

    var index;
    var length = this.length();
    var foundIndex = -1;

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            foundIndex = index;
            break;
        }
    }

    if (foundIndex >= 0) {
        this.removeElementByIndex(foundIndex);
    }

};

/**
 * @method createMe
 * @return {app.model.EntityStateListModel}
 */
app.model.EntityStateListModel.prototype.createMe = function createMe() {
    return new app.model.EntityStateListModel();
};

/**
 * @method createListElement
 * @returns {app.model.EntityModel}
 */
app.model.EntityStateListModel.prototype.createListElement = function createListElement() {
    return new app.model.EntityStateModel();
};