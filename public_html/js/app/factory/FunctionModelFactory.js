/**
 * Created by adambartkowiak on 11/07/16.
 */

'use strict';
var ns = Utils.namespace("app.factory");

var Utils = Utils || {};

/**
 * @namespace app.factory
 * @class FunctionModelFactory
 * @constructor
 * @param {app.listener.GlobalEventListener} globelEventListener
 */
app.factory.FunctionModelFactory = function FunctionModelFactory(globelEventListener) {

    /**
     * @property {app.listener.GlobalEventListener} _globelEventListener
     * @private
     */
    this._globelEventListener = globelEventListener;

};

Utils.inherits(app.factory.FunctionModelFactory, Object);

/**
 * @method createFunction
 * @param {number} functionEnumValue
 * @return {app.model.function.AbstractFunction} createdFunction
 */
app.factory.FunctionModelFactory.prototype.createFunction = function createFunction(functionEnumValue) {
    var result = null;

    switch (functionEnumValue) {
        case app.enum.FunctionEnum.EQUALS:
        {
            result = new app.model.function.ConditionEqualModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 0), new app.model.function.AttributeModel(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.EQUALS_OR_GREATER:
        {
            result = new app.model.function.ConditionEqualOrGreaterModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 0), new app.model.function.AttributeModel(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.GET_EVENT_ENTITY:
        {
            result = new app.model.function.GetEventEntityModel(Utils.guid(), this._globelEventListener);
            break;
        }
        case app.enum.FunctionEnum.GET_ENTITY_PROPERTY:
        {
            result = new app.model.function.GetEntityPropertyModel(Utils.guid(), this.createFunction(app.enum.FunctionEnum.GET_EVENT_ENTITY), new app.model.function.AttributeModel(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.GET_UNIT_COUNT:
        {
            result = new app.model.function.GetUnitCountModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.SHOW_CONSOLE_LOG:
        {
            result = new app.model.function.ShowConsoleLogModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "ENTER CONSOLE LOG TO SHOW"));
            break;
        }
        case app.enum.FunctionEnum.TURN_OFF_TRIGGER:
        {
            result = new app.model.function.TurnOffTriggerModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "SELECT TRIGGER ID"));
            break;
        }
    }

    return result;
};