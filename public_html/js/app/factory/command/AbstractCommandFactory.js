/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.command");

var Utils = Utils || {};

/**
 * @namespace app.factory.command
 * @class AbstractCommandFactory
 * @constructor
 * @param {app.factory.CommandFactory} commandFactory
 */
app.factory.command.AbstractCommandFactory = function AbstractCommandFactory(commandFactory) {

    /**
     * @property {app.factory.CommandFactory} _commandFactory
     * @private
     */
    this._commandFactory = commandFactory;

    /**
     * @property {app.model.function.AbstractValueModel} _fitWith
     * @private
     */
    this._fitWith = null;
};

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.command.AbstractCommandFactory.prototype.getPurpose = function getPurpose() {
    return -1;
};

/**
 * @method create
 * @property {app.model.function.AbstractValueModel} abstractValueModel
 * @return {app.command.ConditionEqual}
 */
app.factory.command.AbstractCommandFactory.prototype.create = function create(abstractValueModel) {
    return null;
};