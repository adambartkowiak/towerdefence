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
 * @param {app.command.AttributeCommand} entityIdToTurnOff
 * @param {app.model.TriggerListModel} triggerListModel
 */
app.command.TurnOffTriggerCommand = function TurnOffTriggerCommand(entityIdToTurnOff, triggerListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} entityIdToTurnOff
     * @private
     */
    this._entityIdToTurnOff = entityIdToTurnOff;

    /**
     * @property {app.model.TriggerListModel} triggerListModel
     * @private
     */
    this._triggerListModel = triggerListModel;

};

Utils.inherits(app.command.TurnOffTriggerCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TurnOffTriggerCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("TurnOffTriggerCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    var trigger = this._triggerListModel.getElementById(this._entityIdToTurnOff.execute(null));

    if (!!trigger) {
        trigger.setActive(false);
    }

};