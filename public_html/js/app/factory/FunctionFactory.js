/**
 * Created by adambartkowiak on 11/07/16.
 */

'use strict';
var ns = Utils.namespace("app.factory");

var Utils = Utils || {};

/**
 * @namespace app.factory
 * @class FunctionFactory
 * @constructor
 * @param {app.listener.GlobalEventListener} globelEventListener
 */
app.factory.FunctionFactory = function FunctionFactory(globelEventListener) {

    /**
     * @property {app.listener.GlobalEventListener} _globelEventListener
     * @private
     */
    this._globelEventListener = globelEventListener;

};

Utils.inherits(app.factory.FunctionFactory, Object);

/**
 * @method createFunction
 * @param {number} functionEnumValue
 * @return {app.model.function.AbstractFunction} createdFunction
 */
app.factory.FunctionFactory.prototype.createFunction = function createFunction(functionEnumValue) {
    var result = null;

    switch (functionEnumValue) {
        case app.enum.FunctionEnum.EQUALS:
        {
            result = new app.model.function.ConditionEqual(Utils.guid(), new app.model.function.Attribute(Utils.guid(), 0), new app.model.function.Attribute(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.GET_EVENT_ENTITY:
        {
            result = new app.model.function.GetEventEntity(Utils.guid(), this._globelEventListener);
            break;
        }
        case app.enum.FunctionEnum.GET_ENTITY_PROPERTY:
        {
            result = new app.model.function.GetEntityProperty(Utils.guid(), this.createFunction(app.enum.FunctionEnum.GET_EVENT_ENTITY), new app.model.function.Attribute(Utils.guid(), 0));
            break;
        }
        case app.enum.FunctionEnum.GET_UNIT_COUNT:
        {
            result = new app.model.function.GetUnitCount(Utils.guid(), new app.model.function.Attribute(Utils.guid(), 0));
            break;
        }
    }

    return result;
};