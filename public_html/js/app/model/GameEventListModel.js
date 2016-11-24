/**
 * Created by adambartkowiak on 31/07/15.
 */

/*

 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class GameEventListModel
 * @memberOf app.model
 * @constructor
 */
app.model.GameEventListModel = function GameEventListModel() {

    app.model.ListModel.call(this);

    /**
     * @property {app.listener.EntityListListener} entityListListener
     * @private
     */
    this._entityListListener = null;

};

Utils.inherits(app.model.GameEventListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {Number} id
 * @return {Object} object
 */
app.model.GameEventListModel.prototype.getElementById = function getElementById(id) {

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
 * @param {Number} id
 */
app.model.GameEventListModel.prototype.removeElementById = function removeElementById(id) {

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
 * @return {app.model.TaskListModel} createMe
 */
app.model.GameEventListModel.prototype.createMe = function createMe() {
    return new app.model.GameEventListModel();
};

/**
 * @method createListElement
 * @returns {app.model.EntityModel}
 */
app.model.GameEventListModel.prototype.createListElement = function createListElement() {
    return new app.model.GameEventModel("", app.enum.GameEventEnum.NONE);
};