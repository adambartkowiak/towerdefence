/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class IncrementVariableValueCommand
 * @constructor
 * @param {app.command.AttributeCommand} variableId
 * @param {app.model.VariableListModel} variableListModel
 */
app.command.IncrementVariableValueCommand = function IncrementVariableValueCommand(variableId, variableListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} variableId
     * @private
     */
    this._variableId = variableId;

    /**
     * @property {app.model.VariableListModel} variableListModel
     * @private
     */
    this._variableListModel = variableListModel;

};

Utils.inherits(app.command.IncrementVariableValueCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.IncrementVariableValueCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("IncrementVariableValueCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);


    var variableId = this._variableId.execute(null),
        variableModel = this._variableListModel.getVariableById(variableId);

    if (variableModel === undefined) {
        variableModel = new app.model.VariableModel(variableId, 0);
        this._variableListModel.addElement(variableModel);
    }

    variableModel.setValue(variableModel.getValue() + 1);


};