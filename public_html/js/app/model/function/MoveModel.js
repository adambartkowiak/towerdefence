/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class MoveModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} entityId
 * @param {app.model.function.AbstractValueModel} destinationX
 * @param {app.model.function.AbstractValueModel} destinationY
 * @param {app.model.function.AbstractValueModel} targetEntityId
 */
app.model.function.MoveModel = function MoveModel(id, entityId, destinationX, destinationY, targetEntityId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.MOVE, [entityId, destinationX, destinationY, targetEntityId]);

    this._functionAttributeNames = ["entityId", "destinationX", "destinationY", "targetEntityId"];
};

Utils.inherits(app.model.function.MoveModel, app.model.function.AbstractFunctionModel);

