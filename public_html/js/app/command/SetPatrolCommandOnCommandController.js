/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class SetPatrolCommandOnCommandController
 * @param {app.controller.CommandController} commandController
 * @constructor
 */
app.command.SetPatrolCommandOnCommandController = function SetPatrolCommandOnCommandController(commandController) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @property {app.controller.CommandController} commandController
     * @private
     */
    this._commandController = commandController;

};

Utils.inherits(app.command.SetPatrolCommandOnCommandController, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.SetPatrolCommandOnCommandController.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    console.log("app.command.SetPatrolCommandOnCommandController.prototype.execute");
    
    this._commandController.setAction(app.enum.FunctionEnum.PATROL);
    
};