/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class GetResourcesValueCommand
 * @constructor
 * @param {app.command.AttributeCommand} teamName
 * @param {app.command.AttributeCommand} resourceName
 * @param {app.model.TeamListModel} teamListModel
 */
app.command.GetResourcesValueCommand = function GetResourcesValueCommand(teamName, resourceName, teamListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} teamName
     * @private
     */
    this._teamName = teamName;

    /**
     * @property {app.command.AttributeCommand} resourceName
     * @private
     */
    this._resourceName = resourceName;

    /**
     * @property {app.model.TeamListModel} teamListModel
     * @private
     */
    this._teamListModel = teamListModel;

};

Utils.inherits(app.command.GetResourcesValueCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.GetResourcesValueCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("GetResourcesValueCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);


    var teamName = this._teamName.execute(null),
        resourceName = this._resourceName.execute(null),
        teamModel = this._teamListModel.getTeamByName(teamName);

    // console.log(teamModel.getResourcesArray()[resourceName]);

    return teamModel.getResourcesArray()[resourceName];

};