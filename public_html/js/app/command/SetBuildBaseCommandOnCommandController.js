/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class SetBuildBaseCommandOnCommandController
 * @param {app.controller.CommandController} commandController
 * @constructor
 */
app.command.SetBuildBaseCommandOnCommandController = function SetBuildBaseCommandOnCommandController(commandController) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @property {app.controller.CommandController} commandController
     * @private
     */
    this._commandController = commandController;

};

Utils.inherits(app.command.SetBuildBaseCommandOnCommandController, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.SetBuildBaseCommandOnCommandController.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    console.log("app.command.SetBuildBaseCommandOnCommandController.prototype.execute");
    
    this._commandController.setAction(app.enum.FunctionEnum.BUILD_BASE);
    
};