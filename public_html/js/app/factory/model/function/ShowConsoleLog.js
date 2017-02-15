/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class ShowConsoleLog
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.ShowConsoleLog = function ShowConsoleLog(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.ShowConsoleLog, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.ShowConsoleLog.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.SHOW_CONSOLE_LOG;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.ShowConsoleLog.prototype.create = function create() {

    var message = new app.model.function.AttributeModel(Utils.guid(), "CONSOLE LOG MESSAGE");

    return new app.model.function.ShowConsoleLogModel(Utils.guid(), message);

};