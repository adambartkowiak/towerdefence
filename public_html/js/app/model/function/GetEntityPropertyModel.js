/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEntityPropertyModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} entity
 * @param {app.model.function.AbstractValueModel} property | PropertyEnum
 */
app.model.function.GetEntityPropertyModel = function GetEntityPropertyModel(id, entity, property) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_ENTITY_PROPERTY, [entity, property]);

    this._functionAttributeNames = ["entity", "property"];
};

Utils.inherits(app.model.function.GetEntityPropertyModel, app.model.function.AbstractFunctionModel);

