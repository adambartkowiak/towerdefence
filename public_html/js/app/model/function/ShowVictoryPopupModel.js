/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ShowVictoryPopupModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 */
app.model.function.ShowVictoryPopupModel = function ShowVictoryPopupModel(id) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.SHOW_VICTORY_POPUP, []);

};

Utils.inherits(app.model.function.ShowVictoryPopupModel, app.model.function.AbstractFunctionModel);