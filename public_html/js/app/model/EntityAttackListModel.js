/**
 * Created by adambartkowiak on 18/08/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityAttackListModel
 * @constructor
 */
app.model.EntityAttackListModel = function EntityAttackListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.EntityAttackListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {String} id
 * @return {Object} object
 */
app.model.EntityAttackListModel.prototype.getElementById = function getElementById(id) {

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
app.model.EntityAttackListModel.prototype.removeElementById = function removeElementById(id) {

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
 * @return {app.model.EntityAttackListModel}
 */
app.model.EntityAttackListModel.prototype.createMe = function createMe() {
    return new app.model.EntityAttackListModel();
};

/**
 * @method createListElement
 * @returns {app.model.EntityAttackModel}
 */
app.model.EntityAttackListModel.prototype.createListElement = function createListElement() {
    return new app.model.EntityAttackModel();
};