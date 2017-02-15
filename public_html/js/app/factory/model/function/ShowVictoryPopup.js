/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class ShowVictoryPopup
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.ShowVictoryPopup = function ShowVictoryPopup(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.ShowVictoryPopup, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.ShowVictoryPopup.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.SHOW_VICTORY_POPUP;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.ShowVictoryPopup.prototype.create = function create() {

    return new app.model.function.ShowVictoryPopupModel(Utils.guid());

};