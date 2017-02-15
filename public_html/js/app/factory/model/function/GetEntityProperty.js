/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class GetEntityProperty
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.GetEntityProperty = function GetEntityProperty(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.GetEntityProperty, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.GetEntityProperty.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.GET_ENTITY_PROPERTY;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.GetEntityProperty.prototype.create = function create() {

    var entity = this._functionModelFactory.create(app.enum.FunctionEnum.GET_EVENT_ENTITY),
        entityProperty = new app.model.function.AttributeModel(Utils.guid(), app.enum.EntityPropertyEnum.ID);

    return new app.model.function.GetEntityPropertyModel(Utils.guid(), entity, entityProperty);

};