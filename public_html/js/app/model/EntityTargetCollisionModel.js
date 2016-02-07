/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityTargetCollisionModel
 * @constructor
 * @param {app.model.EntityModel} entityModel
 * @param {app.model.TargetModel} targetModel
 *
 */
app.model.EntityTargetCollisionModel = function EntityTargetCollisionModel(entityModel, targetModel) {

    /**
     * @property {app.model.EntityModel} _entityModel
     * @private
     */
    this._entityModel = entityModel;

    /**
     * @property {app.model.TargetModel} _targetModel
     * @private
     */
    this._targetModel = targetModel;

};

Utils.inherits(app.model.EntityTargetCollisionModel, Object);

/**
 * @method setEntityModel
 * @param {app.model.EntityModel} value
 */
app.model.EntityTargetCollisionModel.prototype.setEntityModel = function setEntityModel(value) {
    this._entityModel = value;
};

/**
 * @method setTargetModel
 * @param {app.model.EntityModel} value
 */
app.model.EntityTargetCollisionModel.prototype.setTargetModel = function setTargetModel(value) {
    this._targetModel = value;
};


/**
 * @method getEntityModel
 * @return {Number} entityModel
 */
app.model.EntityTargetCollisionModel.prototype.getEntityModel = function getEntityModel() {
    return this._entityModel;
};

/**
 * @method getTargetModel
 * @return {Number} entityModel
 */
app.model.EntityTargetCollisionModel.prototype.getTargetModel = function getTargetModel() {
    return this._targetModel;
};