/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEventEntityModel
 * @constructor
 * @param {string} id
 * @param {app.listener.GlobelEventListener} globelEventListener
 */
app.model.function.GetEventEntityModel = function GetEventEntityModel(id, globelEventListener) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_EVENT_ENTITY, []);

    this._globelEventListener = globelEventListener;

};

Utils.inherits(app.model.function.GetEventEntityModel, app.model.function.AbstractFunctionModel);
//
// /**
//  * @method getValue
//  */
// app.model.function.GetEventEntityModel.prototype.getValue = function getValue() {
//     return this._globelEventListener.getCurrentEventEntity();
// };

