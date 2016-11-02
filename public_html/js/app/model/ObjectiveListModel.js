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
 * @class ObjectiveListModel
 * @constructor
 */
app.model.ObjectiveListModel = function ObjectiveListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.ObjectiveListModel, app.model.ListModel);


/**
 * @method getElementById
 * @param {Number} id
 * @return {Object} object
 */
app.model.ObjectiveListModel.prototype.getElementById = function getElementById(id) {

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
app.model.ObjectiveListModel.prototype.removeElementById = function removeElementById(id) {

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
 * @method getElementById
 * @param {String} name
 * @return {Object} object
 */
app.model.ObjectiveListModel.prototype.getElementByName = function getElementByName(name) {

    var index,
        length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getName() === name) {
            return this._elements[index];
        }
    }

    return null;
};

/**
 * @method createMe
 * @return {app.model.ObjectiveListModel} createMe
 */
app.model.ObjectiveListModel.prototype.createMe = function createMe() {
    return new app.model.ObjectiveListModel();
};

/**
 * @method createListElement
 * @returns {app.model.ObjectiveModel}
 */
app.model.ObjectiveListModel.prototype.createListElement = function createListElement() {
    return new app.model.ObjectiveModel(null, null, null, null);
};