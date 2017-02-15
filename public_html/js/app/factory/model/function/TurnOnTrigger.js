/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class TurnOnTrigger
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.TurnOnTrigger = function TurnOnTrigger(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.TurnOnTrigger, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.TurnOnTrigger.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.TURN_ON_TRIGGER;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.TurnOnTrigger.prototype.create = function create() {

    var triggerId = new app.model.function.AttributeModel(Utils.guid(), "TRIGGER ID");

    return new app.model.function.TurnOnTriggerModel(Utils.guid(), triggerId);

};