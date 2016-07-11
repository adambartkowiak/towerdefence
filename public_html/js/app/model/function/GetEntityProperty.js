/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEntityProperty
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} entity
 * @param {app.model.function.AbstractValue} property | PropertyEnum
 */
app.model.function.GetEntityProperty = function GetEntityProperty(id, entity, property) {

    app.model.function.AbstractFunction.call(this, id, app.enum.FunctionEnum.GET_ENTITY_PROPERTY, [entity, property]);

    this._entity = entity;

    this._property = property;

};

Utils.inherits(app.model.function.GetEntityProperty, app.model.function.AbstractFunction);

/**
 * @method getValue
 */
app.model.function.GetEntityProperty.prototype.getValue = function getValue(){

    var propertyValue = this._property.getValue();

    if (propertyValue === app.enum.EntityPropertyEnum.GRAPHIC_URL){
        return this._entity.getValue().getGraphicUrl();
    }
    else if (propertyValue === app.enum.EntityPropertyEnum.HP){
        return this._entity.getValue().getCurrentHp();
    }
    else if (propertyValue === app.enum.EntityPropertyEnum.ID){
        return this._entity.getValue().getId();
    }
    else if (propertyValue === app.enum.EntityPropertyEnum.TEAM){
        return this._entity.getValue().getTeam();
    }

    return null;
};

