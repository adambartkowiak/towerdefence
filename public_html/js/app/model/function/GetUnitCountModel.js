/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetUnitCountModel
 * @constructor
 * @param {string} id
 * @param {number} team
 */
app.model.function.GetUnitCountModel = function GetUnitCountModel(id, team) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_UNIT_COUNT, [team]);

    this._functionAttributeNames = ["team"];
};

Utils.inherits(app.model.function.GetUnitCountModel, app.model.function.AbstractFunctionModel);
//
// /**
//  * @method getValue
//  */
// app.model.function.GetUnitCountModel.prototype.getValue = function getValue() {
//
//     var team = this._functionAttributes[0].getValue();
//
//     return worldModel.getEntityListModel().getEntityCountByTeam(team);
//
// };

