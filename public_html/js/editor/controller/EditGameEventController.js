/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class EditGameEventController
 * @constructor
 * @param {app.model.TriggerModel} triggerModel
 * @param {editor.view.TriggerModelView} triggerModuleView
 */
editor.controller.EditGameEventController = function EditGameEventController(triggerModel, gameEventId, triggerModuleView) {

    /**
     *
     * @property {editor.view.TriggerModuleView} _view
     * @private
     */
    this._view = null;

    /**
     *
     * @property {string} _gameEventId
     * @private
     */
    this._gameEventId = gameEventId;

    /**
     * @property {app.model.TriggerModel} _triggerModel
     * @private
     */
    this._triggerModel = triggerModel;

    /**
     * @property {editor.view.TriggerModelView} _triggerModuleView
     * @private
     */
    this._triggerModuleView = triggerModuleView;

};

Utils.inherits(editor.controller.EditGameEventController, Object);

/**
 * @method setView
 * @public
 * @param {editor.view.SelectGameEventView} view
 */
editor.controller.EditGameEventController.prototype.setView = function setView(view) {

    this._view = view;

};

/**
 * @method onAccept
 * @public
 */
editor.controller.EditGameEventController.prototype.onAccept = function onAccept(gameEventName) {

    var gameEventModel = this._triggerModel.getGameEventListModel().getElementById(this._gameEventId);
    gameEventModel.setGameEventEnum(app.enum.GameEventEnum[gameEventName]);

    this._triggerModuleView.reloadTree();
};

