/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class TurnOffTriggerCommand
 * @constructor
 * @param {app.model.TriggerListModel} triggerListModel
 * @param {app.model.function.AbstractValue} triggerId
 */
app.command.TurnOffTriggerCommand = function TurnOffTriggerCommand(triggerList, triggerId) {

    support.command.AbstractCommand.call(this);

    this._triggerList = triggerList;

    this._triggerId = triggerId;

};

Utils.inherits(app.command.TurnOffTriggerCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TurnOffTriggerCommand.prototype.execute = function execute(mouseEvent) {

    console.log("TurnOffTriggerCommand: " + this._triggerId.getValue());

    support.command.AbstractCommand.prototype.execute.call(this);

    var trigger = this._triggerList.getElementById(this._triggerId.getValue());

    if (!!trigger){
        trigger.setActive(false);
    }
    

};