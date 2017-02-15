/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class AllObjectivesCompleted
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.AllObjectivesCompleted = function AllObjectivesCompleted(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.AllObjectivesCompleted, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.AllObjectivesCompleted.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.ALL_OBJECTIVES_COMPLETED;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.AllObjectivesCompleted.prototype.create = function create() {

    return new app.model.function.AllObjectivesCompletedModel(Utils.guid());

};