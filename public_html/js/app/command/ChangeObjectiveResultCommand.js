/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ChangeObjectiveResultCommand
 * @constructor
 * @param {app.command.AttributeCommand} objectiveId
 * @param {app.command.AttributeCommand} objectiveResult
 * @param {app.model.ObjectiveListModel} objectiveListModel
 */
app.command.ChangeObjectiveResultCommand = function ChangeObjectiveResultCommand(objectiveId, objectiveResult, objectiveListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} objectiveId
     * @private
     */
    this._objectiveId = objectiveId;

    /**
     * @property {app.command.AttributeCommand} objectiveResult
     * @private
     */
    this._objectiveResult = objectiveResult;

    /**
     * @property {app.model.ObjectiveListModel} objectiveListModel
     * @private
     */
    this._objectiveListModel = objectiveListModel;

};

Utils.inherits(app.command.ChangeObjectiveResultCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ChangeObjectiveResultCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ChangeObjectiveResultCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);


    var objectiveId = this._objectiveId.execute(null),
        objectiveResult = this._objectiveResult.execute(null),
        objectiveModel = this._objectiveListModel.getElementById(objectiveId);

    objectiveModel.setFinished(true);
    objectiveModel.setResult(objectiveResult);

};