/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class TurnOnTriggerModel
 * @constructor
 * @param {string} id
 * @param {string} triggerId
 */
app.model.function.TurnOnTriggerModel = function TurnOnTriggerModel(id, triggerId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.TURN_ON_TRIGGER, [triggerId]);

    this._functionAttributeNames = ["triggerId"];
};

Utils.inherits(app.model.function.TurnOnTriggerModel, app.model.function.AbstractFunctionModel);