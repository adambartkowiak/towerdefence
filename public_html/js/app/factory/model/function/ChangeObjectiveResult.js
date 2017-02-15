/**
 * Created by adambartkowiak on 23/01/17.
 */

'use strict';
var ns = Utils.namespace("app.factory.model.function");

var Utils = Utils || {};

/**
 * @namespace app.factory.model.function
 * @class ChangeObjectiveResult
 * @memberOf app.factory.model.function
 * @constructor
 * @param {app.factory.FunctionModelFactory} functionModelFactory
 */
app.factory.model.function.ChangeObjectiveResult = function ChangeObjectiveResult(functionModelFactory) {
    app.factory.model.function.AbstractFunctionModelFactory.call(this, functionModelFactory);
};

Utils.inherits(app.factory.model.function.ChangeObjectiveResult, app.factory.model.function.AbstractFunctionModelFactory);

/**
 * @method getPurpose
 * @return {number | app.enum.FunctionEnum}
 */
app.factory.model.function.ChangeObjectiveResult.prototype.getPurpose = function getPurpose() {
    return app.enum.FunctionEnum.CHANGE_OBJECTIVE_RESULT;
};

/**
 * @method create
 * @return {app.model.function.AbstractValueModel}
 */
app.factory.model.function.ChangeObjectiveResult.prototype.create = function create() {

    var objectiveId = new app.model.function.AttributeModel(Utils.guid(), "objective Id"),
        objectiveResult = new app.model.function.AttributeModel(Utils.guid(), "objective Result");

    return new app.model.function.ChangeObjectiveResultModel(Utils.guid(), objectiveId, objectiveResult);

};