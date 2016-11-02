/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class ChangeObjectiveResultModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValueModel} objectiveId
 * @param {app.model.function.AbstractValueModel} objectiveResult
 */
app.model.function.ChangeObjectiveResultModel = function ChangeObjectiveResultModel(id, objectiveId, objectiveResult) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.CHANGE_OBJECTIVE_RESULT, [objectiveId, objectiveResult]);

};

Utils.inherits(app.model.function.ChangeObjectiveResultModel, app.model.function.AbstractFunctionModel);

