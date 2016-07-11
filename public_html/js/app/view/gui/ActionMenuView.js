/**
 * Created by adambartkowiak on 18/10/15.
 */

'use strict';

var app = app || {};
app.view = app.view || {};
app.view.gui = app.view.gui || {};

var Utils = Utils || {};

/**
 * @namespace app.view.gui
 * @class ActionMenuView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {app.controller.CommandController} commandController
 * @param {app.model.ActionMenuModel} actionMenuModel
 * @param {app.model.EntityListModel} entityListModel
 */
app.view.gui.ActionMenuView = function ActionMenuView(x, y, width, height, commandController, actionMenuModel, entityListModel) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbsoluteLayoutView.call(this, x, y, width, height);

    /**
     * Tablica zawierajaca buttony menu {support.view.ButtonView}
     *
     * @property {Array} buttonViews
     * @private
     */
    this._buttonViews = [];

    this._actionMenuModel = actionMenuModel;

    this._commandController = commandController;

    this._entityListModel = entityListModel;

    for (var i = 0; i < 12; i++) {
        var view = new support.view.ButtonView(5 + 65 * (i % 4), 5 + 65 * (parseInt(i / 4)), 60, 60);
        view.setBackgroundColor("rgba(255, 255, 255, 0.0)");
        view.setText(i);

        view._image = null;

        this._buttonViews.push(view);
        this.addView(view);
    }

    this.updateMenu();

};

Utils.inherits(app.view.gui.ActionMenuView, support.view.AbsoluteLayoutView);

/**
 * @method updateMenu
 * @param {Array} actionMenuStep
 * @public
 */
app.view.gui.ActionMenuView.prototype.updateMenu = function updateMenu() {

    var view, i;

    var currentElementsPath = this._actionMenuModel._currentPathArray;
    var elements = null;

    //go to node
    elements = this._actionMenuModel.getElements();
    for (i = 0; i<currentElementsPath.length; i++){
        elements = elements[currentElementsPath[i]];
    }

    //create menu step
    for (i = 0; i < 12; i++) {
        view = this._buttonViews[i];

        if (elements[i] !== undefined) {
            view.setText(elements[i].text);

            if (elements[i].icon){
                view._image = new Image();
                view._image.src = elements[i].icon;
            } else {
                view._image = null;
            }

            var commandMouseEventListener = null;
            var command = null;

            if (elements[i].elements) {
                command = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, this._actionMenuModel._currentPathArray.concat([i, "elements"]));
            } else if (elements[i].action === "back") {
                var newPathArray = this._actionMenuModel._currentPathArray.slice();
                newPathArray.splice(-2, 2);
                command = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, newPathArray);
            } else if (elements[i].action === "SetMoveAction") {
                command = new app.command.SetMoveCommandOnCommandController(this._commandController);
            }  else if (elements[i].action === "SetPatrolAction") {
                command = new app.command.SetPatrolCommandOnCommandController(this._commandController);
            }  else if (elements[i].action === "SetGatherAction") {
                command = new app.command.SetGatherCommandOnCommandController(this._commandController);
            } else if (elements[i].action === "CancelAction") {
                command = new app.command.CancelCommand(this._entityListModel);
            } else if (elements[i].action === "HoldAction") {
                command = new app.command.HoldCommand(this._entityListModel);
            } else if (elements[i].action === "SetBuildBaseAction") {
                command = new app.command.SetBuildBaseCommandOnCommandController(this._commandController);
            } else if (elements[i].action === "TrainWorkerAction") {
                command = new app.command.TrainWorkerCommand(this._entityListModel);
            } else if (elements[i].action === "TrainWarriorAction") {
                command = new app.command.TrainWarriorCommand(this._entityListModel);
            }

            if (command !== null){
                commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(command);
            }
            view.setMouseEventListener(commandMouseEventListener);

        } else {
            view.setText(i);
        }

    }


};