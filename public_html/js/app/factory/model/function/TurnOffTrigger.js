/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class TurnOffTrigger
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.TurnOffTrigger = function TurnOffTrigger(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.TurnOffTrigger, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.TurnOffTrigger.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.TURN_OFF_TRIGGER;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.TurnOffTrigger.prototype.create = function create() {

    var triggerId = new app.model.function.AttributeModel(Utils.guid(), "TRIGGER ID");

    return new app.model.function.TurnOffTriggerModel(Utils.guid(), triggerId);

};