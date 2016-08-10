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
 * @class TriggerListModel
 * @constructor
 */
app.model.TriggerListModel = function TriggerListModel() {

    app.model.ListModel.call(this);

    /**
     * @property {app.listener.EntityListListener} entityListListener
     * @private
     */
    this._entityListListener = null;

};

Utils.inherits(app.model.TriggerListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {Number} id
 * @return {Object} object
 */
app.model.TriggerListModel.prototype.getElementById = function getElementById(id) {

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
app.model.TriggerListModel.prototype.removeElementById = function removeElementById(id) {

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
app.model.TriggerListModel.prototype.createMe = function createMe() {
    return new app.model.TriggerListModel();
};

/**
 * @method createListElement
 * @returns {app.model.EntityModel}
 */
app.model.TriggerListModel.prototype.createListElement = function createListElement() {
    return new app.model.TriggerModel("", "", new app.model.GameEventListModel(), new app.model.FunctionListModel(), new app.model.FunctionListModel(), true);
};