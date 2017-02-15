/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetUnitCountModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} teamName
 */
app.model.function.GetUnitCountModel = function GetUnitCountModel(id, teamName) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_UNIT_COUNT, [teamName]);

    this._functionAttributeNames = ["teamName"];
};

Utils.inherits(app.model.function.GetUnitCountModel, app.model.function.AbstractFunctionModel);

