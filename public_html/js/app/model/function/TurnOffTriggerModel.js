/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class TurnOffTriggerModel
 * @constructor
 * @param {string} id
 * @param {string} triggerId
 */
app.model.function.TurnOffTriggerModel = function TurnOffTriggerModel(id, triggerId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.TURN_OFF_TRIGGER, [triggerId]);

};

Utils.inherits(app.model.function.TurnOffTriggerModel, app.model.function.AbstractFunctionModel);