/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ShowConsoleLogModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} consolelog
 */
app.model.function.ShowConsoleLogModel = function ShowConsoleLogModel(id, consolelog) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.SHOW_CONSOLE_LOG, [consolelog]);

    this._functionAttributeNames = ["message"];
};

Utils.inherits(app.model.function.ShowConsoleLogModel, app.model.function.AbstractFunctionModel);

