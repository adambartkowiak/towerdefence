/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class SetMoveCommandOnCommandController
 * @param {app.controller.CommandController} commandController
 * @constructor
 */
app.command.SetMoveCommandOnCommandController = function SetMoveCommandOnCommandController(commandController) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @property {app.controller.CommandController} commandController
     * @private
     */
    this._commandController = commandController;

};

Utils.inherits(app.command.SetMoveCommandOnCommandController, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.SetMoveCommandOnCommandController.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    console.log("app.command.SetMoveCommandOnCommandController.prototype.execute");
    
    this._commandController.setAction(app.enum.TaskEnum.MOVE);
    
};