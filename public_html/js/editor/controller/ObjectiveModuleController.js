/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class ObjectiveModuleController
 * @constructor
 * @param {app.model.WorldModel} worldModel
 */
editor.controller.ObjectiveModuleController = function ObjectiveModuleController(worldModel) {

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     *
     * @property {editor.view.ObjectiveModuleView} _view
     * @private
     */
    this._view = null;

    /**
     * @property {String} _editingObjectiveId
     * @private
     */
    this._editingObjectiveId = null;

};

Utils.inherits(editor.controller.ObjectiveModuleController, Object);

/**
 * @method setView
 * @public
 * @param {editor.view.ObjectiveModuleView} view
 */
editor.controller.ObjectiveModuleController.prototype.setView = function setView(view) {

    this._view = view;

};

/**
 * @method setEditingObjectiveId
 * @public
 * @param {String} editingObjectiveId
 */
editor.controller.ObjectiveModuleController.prototype.setEditingObjectiveId = function setEditingObjectiveId(editingObjectiveId) {

    this._editingObjectiveid = editingObjectiveId;

};

/**
 * @method getEditingObjectiveId
 * @public
 * @return {String} editingObjectiveId
 */
editor.controller.ObjectiveModuleController.prototype.getEditingObjectiveId = function getEditingObjectiveId() {

    return this._editingObjectiveid;

};

/**
 * @method addObjective
 * @public
 */
editor.controller.ObjectiveModuleController.prototype.addObjective = function addObjective() {

    var objectiveListModel = this._worldModel.getObjectiveListModel(),
        newObjectiveModel = new app.model.ObjectiveModel("new Objective", "Example Message", false, false);

    newObjectiveModel.setName(newObjectiveModel.getName() + " " + newObjectiveModel.getId());

    objectiveListModel.addElement(newObjectiveModel);

    // this._view.show();

};

/**
 * @method removeObjectiveById
 * @public
 * @param {String}
 */
editor.controller.ObjectiveModuleController.prototype.removeObjectiveById = function removeObjectiveById(objectiveId) {

    var objectiveListModel = this._worldModel.getObjectiveListModel();

    objectiveListModel.removeElementById(objectiveId);
    this.setEditingObjectiveId(null);
    // this._view.show();

};

/**
 * @method saveObjective
 * @public
 * @param {String} objectiveId
 * @param {String} objectiveName
 * @param {String} objectiveDescription
 */
editor.controller.ObjectiveModuleController.prototype.saveObjective = function saveObjective(objectiveId, objectiveName, objectiveDescription) {

    var objectiveListModel = this._worldModel.getObjectiveListModel(),
        objectiveModel = objectiveListModel.getElementById(objectiveId);

    objectiveModel.setName(objectiveName);
    objectiveModel.setMessage(objectiveDescription);

};