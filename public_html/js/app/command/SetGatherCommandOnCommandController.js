/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class SetGatherCommandOnCommandController
 * @param {app.controller.CommandController} commandController
 * @constructor
 */
app.command.SetGatherCommandOnCommandController = function SetGatherCommandOnCommandController(commandController) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @property {app.controller.CommandController} commandController
     * @private
     */
    this._commandController = commandController;

};

Utils.inherits(app.command.SetGatherCommandOnCommandController, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.SetGatherCommandOnCommandController.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    console.log("app.command.SetGatherCommandOnCommandController.prototype.execute");
    
    this._commandController.setAction(app.enum.TaskEnum.GATHER);
    
};