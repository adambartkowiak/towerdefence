/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class VariableListModel
 * @constructor
 */
app.model.VariableListModel = function VariableListModel() {

    app.model.ListModel.call(this);

    // /**
    //  * @property {app.listener.VariableListModelListener} _teamListModelListener
    //  * @private
    //  */
    // this._teamListModelListener = null;

};

Utils.inherits(app.model.VariableListModel, app.model.ListModel);


/**
 * @method onAddElement
 * @param {Object} object
 */
app.model.VariableListModel.prototype.onAddElement = function onAddElement(object) {

    // object.setVariableListModelListener(this._teamListModelListener);
    //
    // if (!!this._entityListListener) {
    //     this._teamListModelListener.onTeamCreate(object);
    // }
};

/**
 * @method onRemoveElement
 * @param {Object} object
 */
app.model.VariableListModel.prototype.onRemoveElement = function onRemoveElement(object) {
    // if (!!this._entityListListener) {
    //     this._teamListModelListener.onTeamRemove(object);
    // }
};

/**
 * @method getVariableById
 * @param {Number} id
 * @return {Object} object
 */
app.model.VariableListModel.prototype.getVariableById = function getVariableById(id) {

    var index,
        length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            return this._elements[index];
        }
    }

    return undefined;
};

/**
 * @method createMe
 * @return {app.model.VariableListModel}
 */
app.model.VariableListModel.prototype.createMe = function createMe() {
    return new app.model.VariableListModel();
};

/**
 * @method createListElement
 * @returns {app.model.VariableModel}
 */
app.model.VariableListModel.prototype.createListElement = function createListElement() {
    return new app.model.VariableModel();
};

// /**
//  * @method setEntityListListener
//  * @param {app.listener.VariableListModelListener} teamListModelListener
//  */
// app.model.VariableListModel.prototype.setVariableListModelListener = function setVariableListModelListener(teamListModelListener) {
//     this._teamListModelListener = teamListModelListener;
// };
