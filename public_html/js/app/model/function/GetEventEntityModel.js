/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEventEntityModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.listener.GlobelEventListener} globelEventListener
 */
app.model.function.GetEventEntityModel = function GetEventEntityModel(id) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_EVENT_ENTITY, []);

};

Utils.inherits(app.model.function.GetEventEntityModel, app.model.function.AbstractFunctionModel);

