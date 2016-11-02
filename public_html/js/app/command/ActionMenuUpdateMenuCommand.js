/**
 * Created by adambartkowiak on 16/03/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ActionMenuUpdateMenuCommand
 * @constructor
 * @param {app.view.gui.ActionMenuView} view
 * @param {app.model.ActionMenuModel} actionMenuModel
 * @param {Array} pathArray
 */
app.command.ActionMenuUpdateMenuCommand = function ActionMenuUpdateMenuCommand(view, actionMenuModel, pathArray) {

    support.command.AbstractCommand.call(this);

    this._view = view;

    this._actionMenuModel = actionMenuModel;

    this._pathArray = pathArray;

};

Utils.inherits(app.command.ActionMenuUpdateMenuCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ActionMenuUpdateMenuCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ActionMenuGoInsideCommand");

    support.command.AbstractCommand.prototype.execute.call(this);

    //Change Menu Look
    this._actionMenuModel._currentPathArray = this._pathArray ;
    this._view.updateMenu();
};