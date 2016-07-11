/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class TriggerModuleController
 * @constructor
 * @param {app.model.WorldModel} worldModel
 */
editor.controller.TriggerModuleController = function TriggerModuleController(worldModel) {

    /**
     *
     * @property {editor.view.TriggerModuleView} _view
     * @private
     */
    this._view = null;

    /**
     * @property {app.model.WorldModel} _ worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {String} _editingTriggerid
     * @private
     */
    this._editingTriggerid = null;

};

Utils.inherits(editor.controller.TriggerModuleController, Object);

/**
 * @method setView
 * @public
 * @param {editor.view.TriggerModuleView} view
 */
editor.controller.TriggerModuleController.prototype.setView = function setView(view) {

    this._view = view;

};

/**
 * @method setEditingTriggerId
 * @public
 * @param {String} editingTriggerId
 */
editor.controller.TriggerModuleController.prototype.setEditingTriggerId = function setEditingTriggerId(editingTriggerId) {

    this._editingTriggerid = editingTriggerId;

};

/**
 * @method getEditingTriggerId
 * @public
 * @return {String} editingTriggerId
 */
editor.controller.TriggerModuleController.prototype.getEditingTriggerId = function getEditingTriggerId() {

    return this._editingTriggerid;

};

/**
 * @method addTrigger
 * @public
 */
editor.controller.TriggerModuleController.prototype.addTrigger = function addTrigger() {

    var triggerListModel = this._worldModel.getTriggerListModel(),
        count = triggerListModel.length(),
        newTriggerId = Utils.guid();

    triggerListModel.addElement(
        new app.model.TriggerModel(
            newTriggerId,
            "TRIGGER: " + count,
            new app.model.GameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum.NONE)),
            new app.model.ValueListModel().addElement(new app.model.function.ConditionEqual(
                Utils.guid(),
                new app.model.function.Attribute(Utils.guid(), 0),
                new app.model.function.Attribute(Utils.guid(), 0))),
            [new app.command.ShowConsoleLogCommand(Utils.guid(), new app.model.function.Attribute(Utils.guid(), "VICTORY")),
                new app.command.TurnOffTriggerCommand(Utils.guid(), this._triggerListModel, new app.model.function.Attribute(Utils.guid(), newTriggerId))]));

    this._view.show();

};

/**
 * @method removeTriggerById
 * @public
 * @param {String}
 */
editor.controller.TriggerModuleController.prototype.removeTriggerById = function removeTriggerById(triggerId) {

    var triggerListModel = this._worldModel.getTriggerListModel();

    triggerListModel.removeElementById(triggerId);
    this.setEditingTriggerId(null);
    this._view.show();

};

/**
 * @method showAddGameEventView
 * @public
 */
editor.controller.TriggerModuleController.prototype.showAddGameEventView = function showAddGameEventView() {

    var triggerModel = this._worldModel.getTriggerListModel().getElementById(this._editingTriggerid);
    var addGameEventController = new editor.controller.AddGameEventController(triggerModel);
    var selectGameEventView = new editor.view.SelectGameEventView(addGameEventController);

    addGameEventController.setView(selectGameEventView);
    selectGameEventView.show();

};

/**
 * @method showEditGameEventView
 * @public
 * @param {string} gameEventId
 */
editor.controller.TriggerModuleController.prototype.showEditGameEventView = function showEditGameEventView(gameEventId) {

    var that = this;

    var triggerModel = this._worldModel.getTriggerListModel().getElementById(this._editingTriggerid);
    var editGameEventController = new editor.controller.EditGameEventController(triggerModel, gameEventId, that._view);
    var selectGameEventView = new editor.view.SelectGameEventView(editGameEventController);

    editGameEventController.setView(selectGameEventView);
    selectGameEventView.show();

};

/**
 * @method addCondition
 * @public
 */
editor.controller.TriggerModuleController.prototype.addCondition = function addCondition() {

    var triggerModel = this._worldModel.getTriggerListModel().getElementById(this._editingTriggerid);

    triggerModel.getConditionListModel().addElement(
        new app.model.function.ConditionEqual(
            Utils.guid(),
            new app.model.function.Attribute(Utils.guid(), 0),
            new app.model.function.Attribute(Utils.guid(), 0)
        )
    );

};

/**
 * @method showEditAttributeView
 * @public
 */
editor.controller.TriggerModuleController.prototype.showEditAttributeView = function showEditAttributeView(attributeId) {

    console.log("showEditAttributeView: " + attributeId);

    var editingTriggerModel = this._worldModel.getTriggerListModel().getElementById(this._editingTriggerid);
    var editAttributeController = new editor.controller.EditAttributeController(worldModel, editingTriggerModel, attributeId);
    var selectAtributeView = new editor.view.SelectAttributeView(editAttributeController);

    // editGameEventController.setView(selectGameEventView);
    selectAtributeView.show();

};

/**
 * @method showEditConditionView
 * @public
 */
editor.controller.TriggerModuleController.prototype.showEditConditionView = function showEditConditionView(attributeId) {

    console.log("showEditConditionView: " + attributeId);

    // var editingAttributeModel = this._worldModel.getTriggerListModel().getElementById(this._editingTriggerid);
    // var editAttributeController = new editor.controller.EditAttributeController(editingAttributeModel);
    // var selectAtributeView = new editor.view.SelectAttributeView(editAttributeController);
    //
    // // editGameEventController.setView(selectGameEventView);
    // selectAtributeView.show();

};



