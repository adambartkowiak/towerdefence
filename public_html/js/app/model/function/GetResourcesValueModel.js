/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetResourcesValueModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} teamName
 * @param {app.model.function.AbstractValueModel} resourceName
 */
app.model.function.GetResourcesValueModel = function GetResourcesValueModel(id, teamName, resourceName) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_RESOURCES_VALUE, [teamName, resourceName]);

    this._functionAttributeNames = ["teamName", "resourceName"];
};

Utils.inherits(app.model.function.GetResourcesValueModel, app.model.function.AbstractFunctionModel);