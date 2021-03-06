/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class TurnOffTriggerModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} triggerId
 */
app.model.function.TurnOffTriggerModel = function TurnOffTriggerModel(id, triggerId) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.TURN_OFF_TRIGGER, [triggerId]);

    this._functionAttributeNames = ["triggerId"];
};

Utils.inherits(app.model.function.TurnOffTriggerModel, app.model.function.AbstractFunctionModel);