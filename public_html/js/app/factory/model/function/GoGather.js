/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class GoGather
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.GoGather = function GoGather(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.GoGather, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.GoGather.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.GO_GATHER;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.GoGather.prototype.create = function create() {

    var entityId = new app.model.function.AttributeModel(Utils.guid(), "entityId"),
        destinationX = new app.model.function.AttributeModel(Utils.guid(), 50),
        destinationY = new app.model.function.AttributeModel(Utils.guid(), 50),
        targetEntityId = new app.model.function.AttributeModel(Utils.guid(), "targetEntityId");

    return new app.model.function.GoGatherModel(Utils.guid(), entityId, destinationX, destinationY, targetEntityId);

};