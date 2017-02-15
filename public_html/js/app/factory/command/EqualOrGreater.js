/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.command");

var Utils = Utils || {};

/**
 * @namespace app.factory.command
 * @class EqualOrGreater
 * @constructor
 * @param {app.factory.CommandFactory} commandFactory
 */
app.factory.command.EqualOrGreater = function EqualOrGreater(commandFactory) {
    app.factory.command.AbstractCommandFactory.call(this, commandFactory);
};

Utils.inherits(app.factory.command.EqualOrGreater, app.factory.command.AbstractCommandFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.command.EqualOrGreater.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.EQUAL_OR_GREATER;
};

/**
 * @method create
 * @property {app.model.function.AbstractValueModel} abstractValueModel
 * @return {support.command.AbstractCommand}
 */
app.factory.command.EqualOrGreater.prototype.create = function create(abstractValueModel) {

    var leftValue = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[0]),
        rightValue = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[1]);

    return app.command.ConditionEqualOrGreaterCommand(leftValue, rightValue);
};