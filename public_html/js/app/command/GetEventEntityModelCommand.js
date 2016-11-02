/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class GetEventEntityModelCommand
 * @constructor
 * @param {app.listener.GlobelEventListener} globelEventListener
 */
app.command.GetEventEntityModelCommand = function GetEventEntityModelCommand(globelEventListener) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.listener.GlobelEventListener} globelEventListener
     * @private
     */
    this._globelEventListener = globelEventListener;

};

Utils.inherits(app.command.GetEventEntityModelCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.GetEventEntityModelCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("GetEventEntityModelCommand: execute");
    // console.log(this._globelEventListener.getCurrentEventEntity());;
    // console.log(new Date().getTime());

    support.command.AbstractCommand.prototype.execute.call(this);


    if (!!this._globelEventListener) {
        return this._globelEventListener.getCurrentEventEntity();
    } else {
        return null;
    }

};