/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("factory.command");

var Utils = Utils || {};

/**
 * @namespace factory.command
 * @class Move
 * @constructor
 * @param {app.factory.CommandFactory} commandFactory
 */
app.factory.command.Move = function Move(commandFactory) {
    app.factory.command.AbstractCommandFactory.call(this, commandFactory);
};

Utils.inherits(app.factory.command.Move, app.factory.command.AbstractCommandFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.command.Move.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.MOVE;
};

/**
 * @method create
 * @property {app.model.function.AbstractValueModel} abstractValueModel
 * @return {support.command.AbstractCommand}
 */
app.factory.command.Move.prototype.create = function create() {

    var entityId = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[0]),
        destinationX = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[1]),
        destinationY = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[2]),
        targetEntityId = this._commandFactory.createCommand(abstractValueModel.getFunctionAttributes()[3]);

    return app.command.MoveCommand(entityId, destinationX, destinationY, targetEntityId)
};