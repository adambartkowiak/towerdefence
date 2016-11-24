/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class GetUnitCountCommand
 * @constructor
 * @param {String} team
 * @param {app.model.TriggerListModel} triggerListModel
 */
app.command.GetUnitCountCommand = function GetUnitCountCommand(team, triggerList) {

    support.command.AbstractCommand.call(this);

    this._team = team;

    this._triggerList = triggerList;

};

Utils.inherits(app.command.GetUnitCountCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.GetUnitCountCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    var team = this._team.execute(null);

    return worldModel.getEntityListModel().getEntityCountByTeam(team);

};