/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.command");

var Utils = Utils || {};

/**
 * @namespace app.factory.command
 * @class ChangeObjectiveResult
 * @constructor
 * @param {app.factory.CommandFactory} commandFactory
 * @param {app.model.ObjectiveListModel} objectiveListModel
 */
app.factory.command.ChangeObjectiveResult = function ChangeObjectiveResult(commandFactory, objectiveListModel) {
    app.factory.command.AbstractCommandFactory.call(this, commandFactory);

    /**
     * @property {app.model.ObjectiveListModel} _objectiveListModel
     * @private
     */
    this._objectiveListModel = objectiveListModel;
};

Utils.inherits(app.factory.command.ChangeObjectiveResult, app.factory.command.AbstractCommandFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.command.ChangeObjectiveResult.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.EQUAL_OR_GREATER;
};

/**
 * @method create
 * @property {app.model.function.AbstractValueModel} abstractValueModel
 * @return {support.command.AbstractCommand}
 */
app.factory.command.ChangeObjectiveResult.prototype.create = function create(abstractValueModel) {

    var objectiveId = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[0]),
        objectiveResult = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[1]);

    return app.command.ChangeObjectiveResultCommand(objectiveId, objectiveResult, this._objectiveListModel);
};