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
 * @param {Number} entityId
 * @param {app.model.ActionTypeModel} actionType
 *
 */
app.model.TargetModel = function TargetModel(x, y, entityId, actionType) {

    /**
     * Punkt celu
     * @property {support.geom.Point2d} _position
     * @private
     */
    this._position = new support.geom.Point2d(x, y);

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
    this._position.setX(value);
};

/**
 * @method setY
 * @param {Number} value
 */
app.model.TargetModel.prototype.setY = function setY(value) {
    this._position.setY(value);
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
    return this._position.getX();
};

/**
 * @method getY
 * @return {Number} y
 */
app.model.TargetModel.prototype.getY = function getY() {
    return this._position.getY();
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
    return new app.model.TargetModel(this.getX(), this.getY(), this.getEntityId(), this.getActionType());
};