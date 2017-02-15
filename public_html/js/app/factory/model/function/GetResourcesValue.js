/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class GetResourcesValue
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.GetResourcesValue = function GetResourcesValue(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.GetResourcesValue, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.GetResourcesValue.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.GET_RESOURCES_VALUE;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.GetResourcesValue.prototype.create = function create() {

    var teamId = new app.model.function.AttributeModel(Utils.guid(), "TEAM_ID"),
        resourceName = new app.model.function.AttributeModel(Utils.guid(), "RESOURCES_NAME");

    return new app.model.function.GetResourcesValueModel(Utils.guid(), teamId, resourceName);

};