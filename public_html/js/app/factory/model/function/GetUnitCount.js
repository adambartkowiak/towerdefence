/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class GetUnitCount
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.GetUnitCount = function GetUnitCount(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.GetUnitCount, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.GetUnitCount.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.GET_UNIT_COUNT;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.GetUnitCount.prototype.create = function create() {

    var teamId = new app.model.function.AttributeModel(Utils.guid(), "TEAM_ID");

    return new app.model.function.GetUnitCountModel(Utils.guid(), teamId);

};