/**
 * Created by adambartkowiak on 31/07/15.
 */

/*
Klasa służy do zdefiniowania taska.

W okreslonym miejsce/regionie:
 - na podstawie X, Y, Radius

lub:
 - na podstawie ID entity (id obiektu)


Jeżeli jest podany i X, Y, Radius, oraz EntityId - to "najczęściej w innych modulach programu" pozycja jest ustalana na podstawie entityId jezeli istnieje na mapie.


Zrealizuj task:
 - taskEnum
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TaskModel
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} entityId
 * @param {app.enum.FunctionEnum} taskEnum
 * @param {app.model.EntityModel} taskEntityModel Some Tasks needs it like Build, Train, etc.
 *
 */
app.model.TaskModel = function TaskModel(x, y, radius, entityId, taskEnum, taskEntityModel) {

    /**
     * Punkt celu
     * @property {support.geom.Circle} _circle
     * @private
     */
    this._circle = new support.geom.Circle(x, y, radius);

    /**
     * @property {Number} _entityId
     * @private
     */
    this._entityId = entityId;

    /**
     * @property {app.enum.FunctionEnum} _taskEnum
     * @private
     */
    this._taskEnum = taskEnum;

    /**
     * @property {app.model.EntityModel} _taskEntityModel
     * @private
     */
    this._taskEntityModel = taskEntityModel;

};

Utils.inherits(app.model.TaskModel, Object);


/**
 * @method setX
 * @param {Number} value
 */
app.model.TaskModel.prototype.setX = function setX(value) {
    this._circle.setX(value);
};

/**
 * @method setY
 * @param {Number} value
 */
app.model.TaskModel.prototype.setY = function setY(value) {
    this._circle.setY(value);
};

/**
 * @method setRadius
 * @param {Number} value
 */
app.model.TaskModel.prototype.setRadius = function setRadius(value) {
    this._circle.setRadius(value);
};

/**
 * @method setTaskEnum
 * @param {app.enum.TaskEnum} value
 */
app.model.TaskModel.prototype.setTaskEnum = function setTaskEnum(value) {
    this._taskEnum = value;
};

/**
 * @method setEntityId
 * @param {Number} value
 */
app.model.TaskModel.prototype.setEntityId = function setEntityId(value) {
    this._entityId = value;
};


/**
 * @method getX
 * @return {Number} x
 */
app.model.TaskModel.prototype.getX = function getX() {
    return this._circle.getX();
};

/**
 * @method getY
 * @return {Number} y
 */
app.model.TaskModel.prototype.getY = function getY() {
    return this._circle.getY();
};

/**
 * @method getRadius
 * @return {Number} radius
 */
app.model.TaskModel.prototype.getRadius = function getRadius() {
    return this._circle.getRadius();
};

/**
 * @method getTaskEnum
 * @return {app.enum.TaskEnum} taskEnum
 */
app.model.TaskModel.prototype.getTaskEnum = function getTaskEnum() {
    return this._taskEnum;
};

/**
 * @method getEntityId
 * @return {Number} entityId
 */
app.model.TaskModel.prototype.getEntityId = function getEntityId() {
    return this._entityId;
};


/**
 * @method setTaskEntityModel
 * @param {app.model.EntityModel} value
 */
app.model.TaskModel.prototype.setTaskEntityModel = function setTaskEntityModel(value) {
    this._taskEntityModel = value;
};

/**
 * @method getTaskEntityModel
 * @return {Number} entityId
 */
app.model.TaskModel.prototype.getTaskEntityModel = function getTaskEntityModel() {
    return this._taskEntityModel;
};



/**
 * @method clone
 * @return {app.model.TargetModel} clone
 */
app.model.TaskModel.prototype.clone = function clone() {
    return new app.model.TaskModel(this.getX(), this.getY(), this.getRadius(), this.getEntityId(), this.getTaskEnum(), this.getTaskEntityModel());
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.TaskModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    var entityModel = new app.model.EntityModel();
    var taskEntityModel = undefined;
    if (JSON._taskEntityModel !== undefined){
        taskEntityModel = entityModel.loadFromJSON(JSON._taskEntityModel)
    }

    this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
    this._taskEnum = JSON._taskEnum;
    this._entityId = JSON._entityId;
    this._taskEntityModel = taskEntityModel;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.TaskModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var taskModelEntityMinifiedJSON = null;

    if (this._taskEntityModel !== undefined){
        taskModelEntityMinifiedJSON = this._taskEntityModel.getMinifyJSON()
    } else {
        taskModelEntityMinifiedJSON = undefined;
    }

    var result = {
        1:this._circle.getMinifyJSON(),
        2:this._taskEnum,
        3:this._entityId,
        4:taskModelEntityMinifiedJSON
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.TaskModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var circle = new support.geom.Circle(0,0,0);
    var taskEntityModel = new app.model.EntityModel();
    var taskModelEntityUnMinifiedJSON = undefined;

    if (minifyJSON["4"] !== undefined){
        taskModelEntityUnMinifiedJSON = taskEntityModel.unMinifyJSON(minifyJSON["4"])
    }

    var result = {
        _circle: circle.unMinifyJSON(minifyJSON["1"]),
        _taskEnum: minifyJSON["2"],
        _entityId: minifyJSON["3"],
        _taskEntityModel: taskModelEntityUnMinifiedJSON
    };

    return result;
};