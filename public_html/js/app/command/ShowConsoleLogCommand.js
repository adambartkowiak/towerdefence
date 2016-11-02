/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ShowConsoleLogCommand
 * @constructor
 * @param {app.command.AttributeCommand} message
 */
app.command.ShowConsoleLogCommand = function ShowConsoleLogCommand(message) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} message
     * @private
     */
    this._message = message;

};

Utils.inherits(app.command.ShowConsoleLogCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ShowConsoleLogCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ShowConsoleLogCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    console.log(this._message.execute(null));

};