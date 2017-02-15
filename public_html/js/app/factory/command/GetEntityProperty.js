/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.command");

var Utils = Utils || {};

/**
 * @namespace app.factory.command
 * @class GetEntityProperty
 * @constructor
 * @param {app.factory.CommandFactory} commandFactory
 */
app.factory.command.GetEntityProperty = function GetEntityProperty(commandFactory) {
    app.factory.command.AbstractCommandFactory.call(this, commandFactory);
};

Utils.inherits(app.factory.command.GetEntityProperty, app.factory.command.AbstractCommandFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.command.GetEntityProperty.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.EQUAL_OR_GREATER;
};

/**
 * @method create
 * @property {app.model.function.AbstractValueModel} abstractValueModel
 * @return {support.command.AbstractCommand}
 */
app.factory.command.GetEntityProperty.prototype.create = function create(abstractValueModel) {

    var entity = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[0]),
        property = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[1]);

    return app.command.GetEntityPropertyCommand(entity, property);
};