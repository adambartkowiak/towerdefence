/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ShowConsoleLogModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} message
 */
app.model.function.ShowConsoleLogModel = function ShowConsoleLogModel(id, message) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.SHOW_CONSOLE_LOG, [message]);

    this._functionAttributeNames = ["message"];
};

Utils.inherits(app.model.function.ShowConsoleLogModel, app.model.function.AbstractFunctionModel);

