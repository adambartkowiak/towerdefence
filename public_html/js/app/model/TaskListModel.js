/**
 * Created by adambartkowiak on 01/08/15.
 */
/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TaskListModel
 * @constructor
 */
app.model.TaskListModel = function TaskListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.TaskListModel, app.model.ListModel);


/**
 * @method getElementById
 * @param {Number} id
 * @return {Object} object
 */
app.model.TaskListModel.prototype.getElementById = function getElementById(id) {

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
app.model.TaskListModel.prototype.removeElementById = function removeElementById(id) {

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
app.model.TaskListModel.prototype.createMe = function createMe() {
    return new app.model.TaskListModel();
};

/**
 * @method createListElement
 * @returns {app.model.TaskModel}
 */
app.model.TaskListModel.prototype.createListElement = function createListElement() {
    return new app.model.TaskModel(0,0,0,0,app.enum.FunctionEnum.MOVE);
};