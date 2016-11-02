/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ShowVictoryPopupCommand
 * @constructor
 */
app.command.ShowVictoryPopupCommand = function ShowVictoryPopupCommand() {

    support.command.AbstractCommand.call(this);

};

Utils.inherits(app.command.ShowVictoryPopupCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ShowVictoryPopupCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ShowVictoryPopupCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    //REFACTOR!!!
    //@TODO
    worldModel._showVictoryPopup = true;

};