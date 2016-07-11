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
 * @param {String} consoleLog
 */
app.command.ShowConsoleLogCommand = function ShowConsoleLogCommand(consoleLog) {

    support.command.AbstractCommand.call(this);

    this._consoleLog = consoleLog;

};

Utils.inherits(app.command.ShowConsoleLogCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ShowConsoleLogCommand.prototype.execute = function execute(mouseEvent) {

    console.log("ShowConsoleLogCommand");

    support.command.AbstractCommand.prototype.execute.call(this);

    console.log(this._consoleLog.getValue());

};