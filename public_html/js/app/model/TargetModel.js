/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TargetModel
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 * @param {Number} entityId
 * @param {app.model.ActionTypeModel} actionType
 *
 */
app.model.TargetModel = function TargetModel(x, y, radius, entityId, actionType) {

    /**
     * Punkt celu
     * @property {support.geom.Circle} _circle
     * @private
     */
    this._circle = new support.geom.Circle(x, y, radius);


    /**
     * @property {app.model.ActionTypeModel} _actionType
     * @private
     */
    this._actionType = actionType;

    /**
     * @property {Number} _entityId
     * @private
     */
    this._entityId = entityId;

};

Utils.inherits(app.model.TargetModel, Object);


/**
 * @method setX
 * @param {Number} value
 */
app.model.TargetModel.prototype.setX = function setX(value) {
    this._circle.setX(value);
};

/**
 * @method setY
 * @param {Number} value
 */
app.model.TargetModel.prototype.setY = function setY(value) {
    this._circle.setY(value);
};

/**
 * @method setRadius
 * @param {Number} value
 */
app.model.TargetModel.prototype.setRadius = function setRadius(value) {
    this._circle.setRadius(value);
};

/**
 * @method setActionType
 * @param {app.model.ActionTypeModel} value
 */
app.model.TargetModel.prototype.setActionType = function setActionType(value) {
    this._actionType = value;
};

/**
 * @method setEntityId
 * @param {Number} value
 */
app.model.TargetModel.prototype.setEntityId = function setEntityId(value) {
    this._entityId = value;
};


/**
 * @method getX
 * @return {Number} x
 */
app.model.TargetModel.prototype.getX = function getX() {
    return this._circle.getX();
};

/**
 * @method getY
 * @return {Number} y
 */
app.model.TargetModel.prototype.getY = function getY() {
    return this._circle.getY();
};

/**
 * @method getRadius
 * @return {Number} radius
 */
app.model.TargetModel.prototype.getRadius = function getRadius() {
    return this._circle.getRadius();
};

/**
 * @method getActionType
 * @return {app.model.ActionTypeModel} actionType
 */
app.model.TargetModel.prototype.getActionType = function getActionType() {
    return this._actionType
};

/**
 * @method getEntityId
 * @return {Number} entityId
 */
app.model.TargetModel.prototype.getEntityId = function getEntityId() {
    return this._entityId;
};


/**
 * @method clone
 * @return {app.model.TargetModel} clone
 */
app.model.TargetModel.prototype.clone = function clone() {
    return new app.model.TargetModel(this.getX(), this.getY(), this.getRadius(), this.getEntityId(), this.getActionType());
};