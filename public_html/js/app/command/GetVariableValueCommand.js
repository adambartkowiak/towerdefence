/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class GetVariableValueCommand
 * @constructor
 * @param {app.command.AttributeCommand} variableId
 * @param {app.model.VariableListModel} variableListModel
 */
app.command.GetVariableValueCommand = function GetVariableValueCommand(variableId, variableListModel) {

    support.command.AbstractCommand.call(this);

    this._variableId = variableId;

    this._variableListModel = variableListModel;

};

Utils.inherits(app.command.GetVariableValueCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.GetVariableValueCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("GetVariableValueCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);


    var variableId = this._variableId.execute(null),
        variableModel = this._variableListModel.getVariableById(variableId);

    if (variableModel === undefined){
        return undefined;
    } else {
        return variableModel.getValue();
    }

};