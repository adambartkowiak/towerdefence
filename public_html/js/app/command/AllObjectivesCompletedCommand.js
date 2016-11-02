/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class AllObjectivesCompletedCommand
 * @constructor
 * @param {app.model.ObjectiveListModel} objectiveListModel
 */
app.command.AllObjectivesCompletedCommand = function AllObjectivesCompletedCommand(objectiveListModel) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.model.ObjectiveListModel} objectiveListModel
     * @private
     */
    this._objectiveListModel = objectiveListModel;

};

Utils.inherits(app.command.AllObjectivesCompletedCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.AllObjectivesCompletedCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("AllObjectivesCompletedCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    var result = true,
        index,
        length = this._objectiveListModel.length(),
        objectiveModel;

    for (index = 0; index < length; index ++){
        objectiveModel = this._objectiveListModel.getElement(index);

        if (objectiveModel.getFinished() && objectiveModel.getResult()){
            // result still true
        } else {
            result = false;
            break;
        }
    }

    return result;

};