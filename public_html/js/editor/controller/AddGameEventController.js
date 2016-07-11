/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class AddGameEventController
 * @constructor
 * @param {app.model.TriggerModel} triggerModel
 */
editor.controller.AddGameEventController = function AddGameEventController(triggerModel) {

    /**
     *
     * @property {editor.view.TriggerModuleView} _view
     * @private
     */
    this._view = null;

    /**
     * @property {app.model.TriggerModel} _triggerModel
     * @private
     */
    this._triggerModel = triggerModel;

};

Utils.inherits(editor.controller.AddGameEventController, Object);

/**
 * @method setView
 * @public
 * @param {editor.view.SelectGameEventView} view
 */
editor.controller.AddGameEventController.prototype.setView = function setView(view) {

    this._view = view;

};

/**
 * @method onAccept
 * @public
 */
editor.controller.AddGameEventController.prototype.onAccept = function onAccept(gameEventName) {

    this._triggerModel.getGameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum[gameEventName]));

};

