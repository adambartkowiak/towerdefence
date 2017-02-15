/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AllObjectivesCompletedModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 */
app.model.function.AllObjectivesCompletedModel = function AllObjectivesCompletedModel(id) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.ALL_OBJECTIVES_COMPLETED, []);

};

Utils.inherits(app.model.function.AllObjectivesCompletedModel, app.model.function.AbstractFunctionModel);