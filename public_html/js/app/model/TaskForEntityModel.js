/**
 * Created by adambartkowiak on 02/08/15.
 */

/*
Klasa opisuje Task (zadanie) dla wybranego entity.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TaskForEntityModel
 * @constructor
 * @param {app.model.EntityModel} entityModel
 * @param {app.model.TaskModel} taskModel
 *
 */
app.model.TaskForEntityModel = function TaskForEntityModel(entityModel, taskModel) {

    /**
     * @property {app.model.EntityModel} _entityModel
     * @private
     */
    this._entityModel = entityModel;

    /**
     * @property {app.model.TaskModel} _taskModel
     * @private
     */
    this._taskModel = taskModel;

};

Utils.inherits(app.model.TaskForEntityModel, Object);

/**
 * @method setEntityModel
 * @param {app.model.EntityModel} value
 */
app.model.TaskForEntityModel.prototype.setEntityModel = function setEntityModel(value) {
    this._entityModel = value;
};

/**
 * @method getEntityModel
 * @return {app.model.EntityModel} entityModel
 */
app.model.TaskForEntityModel.prototype.getEntityModel = function getEntityModel() {
    return this._entityModel;
};

/**
 * @method setTaskModel
 * @param {app.model.TaskModel} value
 */
app.model.TaskForEntityModel.prototype.setTaskModel = function setTaskModel(value) {
    this._taskModel = value;
};

/**
 * @method getTaskModel
 * @return {app.model.TaskModel} taskModel
 */
app.model.TaskForEntityModel.prototype.getTaskModel = function getTaskModel() {
    return this._taskModel;
};