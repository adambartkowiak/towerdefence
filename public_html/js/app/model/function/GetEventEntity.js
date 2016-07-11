/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEventEntity
 * @constructor
 * @param {string} id
 * @param {app.listener.GlobelEventListener} globelEventListener
 */
app.model.function.GetEventEntity = function GetEventEntity(id, globelEventListener) {

    app.model.function.AbstractFunction.call(this, id, app.enum.FunctionEnum.GET_EVENT_ENTITY, []);

    this._globelEventListener = globelEventListener;

};

Utils.inherits(app.model.function.GetEventEntity, app.model.function.AbstractFunction);

/**
 * @method setCallerAttributes
 * @param {Array} callerAttributes
 */
app.model.function.GetEventEntity.prototype.setCallerAttributes = function setCallerAttributes(callerAttributes) {

    app.model.function.AbstractFunction.prototype.setCallerAttributes.call(this, callerAttributes);

};

/**
 * @method getValue
 */
app.model.function.GetEventEntity.prototype.getValue = function getValue(){
    return this._globelEventListener.getCurrentEventEntity();
};

