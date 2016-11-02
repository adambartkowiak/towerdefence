/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TeamListModel
 * @constructor
 */
app.model.TeamListModel = function TeamListModel() {

    app.model.ListModel.call(this);

    /**
     * @property {app.listener.TeamListModelListener} _teamListModelListener
     * @private
     */
    this._teamListModelListener = null;

};

Utils.inherits(app.model.TeamListModel, app.model.ListModel);


/**
 * @method onAddElement
 * @param {Object} object
 */
app.model.TeamListModel.prototype.onAddElement = function onAddElement(object) {

    object.setTeamListModelListener(this._teamListModelListener);

    if (!!this._entityListListener) {
        this._teamListModelListener.onTeamCreate(object);
    }
};

/**
 * @method onRemoveElement
 * @param {Object} object
 */
app.model.TeamListModel.prototype.onRemoveElement = function onRemoveElement(object) {
    if (!!this._entityListListener) {
        this._teamListModelListener.onTeamRemove(object);
    }
};

/**
 * @method getTeamByName
 * @param {Number} id
 * @return {Object} object
 */
app.model.TeamListModel.prototype.getTeamByName = function getTeamByName(name) {

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
 * @return {app.model.TeamListModel}
 */
app.model.TeamListModel.prototype.createMe = function createMe() {
    return new app.model.TeamListModel();
};

/**
 * @method createListElement
 * @returns {app.model.TeamModel}
 */
app.model.TeamListModel.prototype.createListElement = function createListElement() {
    return new app.model.TeamModel();
};

/**
 * @method setEntityListListener
 * @param {app.listener.TeamListModelListener} teamListModelListener
 */
app.model.TeamListModel.prototype.setTeamListModelListener = function setTeamListModelListener(teamListModelListener) {
    this._teamListModelListener = teamListModelListener;
};
