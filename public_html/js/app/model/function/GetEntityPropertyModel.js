/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEntityPropertyModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} entity
 * @param {app.model.function.AbstractValue} property | PropertyEnum
 */
app.model.function.GetEntityPropertyModel = function GetEntityPropertyModel(id, entity, property) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_ENTITY_PROPERTY, [entity, property]);

    this._functionAttributeNames = ["entity", "property"];
};

Utils.inherits(app.model.function.GetEntityPropertyModel, app.model.function.AbstractFunctionModel);

