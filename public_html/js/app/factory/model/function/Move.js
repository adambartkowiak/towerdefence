/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class Move
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.Move = function Move(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.Move, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.Move.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.MOVE;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.Move.prototype.create = function create() {

    var entityId = new app.model.function.AttributeModel(Utils.guid(), "entityId"),
        destinationX = new app.model.function.AttributeModel(Utils.guid(), 50),
        destinationY = new app.model.function.AttributeModel(Utils.guid(), 50),
        targetEntityId = new app.model.function.AttributeModel(Utils.guid(), "targetEntityId");

    return new app.model.function.MoveModel(Utils.guid(), entityId, destinationX, destinationY, targetEntityId);

};