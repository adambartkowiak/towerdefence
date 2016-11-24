/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class TurnOnTriggerCommand
 * @constructor
 * @param {app.command.AttributeCommand} entityIdToTurnOn
 * @param {app.model.TriggerListModel} triggerListModel
 */
app.command.TurnOnTriggerCommand = function TurnOnTriggerCommand(entityIdToTurnOn, triggerListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} entityIdToTurnOn
     * @private
     */
    this._entityIdToTurnOn = entityIdToTurnOn;

    /**
     * @property {app.model.TriggerListModel} triggerListModel
     * @private
     */
    this._triggerListModel = triggerListModel;

};

Utils.inherits(app.command.TurnOnTriggerCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TurnOnTriggerCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("TurnOnTriggerCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    var trigger = this._triggerListModel.getElementById(this._entityIdToTurnOn.execute(null));

    if (!!trigger) {
        trigger.setActive(true);
    }

};