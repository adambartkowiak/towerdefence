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
        //view.setText(i);

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
    for (i = 0; i < currentElementsPath.length; i++) {
        elements = elements[currentElementsPath[i]];
    }

    //create menu step
    for (i = 0; i < 12; i++) {
        view = this._buttonViews[i];

        if (elements[i] !== undefined) {

            if (elements[i].text !== null){
                view.setText(elements[i].text);
            } else {
                view.setText("");
            }

            if (elements[i].icon) {
                view._image = new Image();
                view._image.src = elements[i].icon;
            } else {
                view._image = null;
            }

            var commandMouseEventListener = null;
            var command = null;
            var elementAction = elements[i].action;
            var elementActionType = null;
            var taskEntityModel = null;


            if (!!elementAction) {
                //action type is 2 argument
                elementActionType = elementAction[2];
            }


            if (elements[i].elements) {
                command = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, this._actionMenuModel._currentPathArray.concat([i, "elements"]));
            } else if (elementActionType === app.enum.FunctionEnum.ACTION_MENU_BACK) {
                var newPathArray = this._actionMenuModel._currentPathArray.slice();
                newPathArray.splice(-2, 2);
                command = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, newPathArray);
            } else if (elementActionType === app.enum.FunctionEnum.SET_MOVE_ACTION) {
                command = new app.command.SetMoveCommandOnCommandController(this._commandController);
            } else if (elementActionType === app.enum.FunctionEnum.SET_MOVE_ATTACK_ACTION) {
                command = new app.command.SetMoveAttackCommandOnCommandController(this._commandController);
            } else if (elementActionType === app.enum.FunctionEnum.SET_PATROL_ACTION) {
                command = new app.command.SetPatrolCommandOnCommandController(this._commandController);
            } else if (elementActionType === app.enum.FunctionEnum.SET_GO_GATHER_ACTION) {
                command = new app.command.SetGatherCommandOnCommandController(this._commandController);
            } else if (elementActionType === app.enum.FunctionEnum.CANCEL) {
                command = new app.command.CancelCommand(this._entityListModel);
            } else if (elementActionType === app.enum.FunctionEnum.HOLD) {
                command = new app.command.HoldCommand(this._entityListModel);
            } else if (elementActionType === app.enum.FunctionEnum.SET_BUILD_BUILDING) {
                taskEntityModel = new app.model.EntityModel();
                taskEntityModel.loadFromJSON(JSON.parse(elementAction[3]));
                command = new app.command.SetBuildBuildingCommandOnCommandController(this._commandController, taskEntityModel);
            } else if (elementActionType === app.enum.FunctionEnum.TRAIN_UNIT) {
                taskEntityModel = new app.model.EntityModel();
                taskEntityModel.loadFromJSON(JSON.parse(elementAction[3]));
                command = new app.command.TrainEntityCommand(this._entityListModel, taskEntityModel);
            }

            if (command !== null) {
                commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(command);
            }
            view.setMouseEventListener(commandMouseEventListener);

        } else {
            view.setText("");
            view.setImage(null);
            view.setMouseEventListener(null);
        }

    }


};