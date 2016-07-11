/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetUnitCount
 * @constructor
 * @param {string} id
 * @param {number} team
 */
app.model.function.GetUnitCount = function GetUnitCount(id, team) {

    app.model.function.AbstractFunction.call(this, id, app.enum.FunctionEnum.GET_UNIT_COUNT, [team]);

    this._team = team;

};

Utils.inherits(app.model.function.GetUnitCount, app.model.function.AbstractFunction);

/**
 * @method setCallerAttributes
 * @param {Array} callerAttributes
 */
app.model.function.GetUnitCount.prototype.setCallerAttributes = function setCallerAttributes(callerAttributes) {

    app.model.function.AbstractFunction.prototype.setCallerAttributes.call(this, callerAttributes);

};

/**
 * @method getValue
 */
app.model.function.GetUnitCount.prototype.getValue = function getValue(){

    return worldModel.getEntityListModel().getEntityCountByTeam(this._team.getValue());

};

