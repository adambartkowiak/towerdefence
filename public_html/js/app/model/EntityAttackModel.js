/**
 * Created by adambartkowiak on 18/08/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityAttackModel
 * @constructor
 * @memberof app.model
 */
app.model.EntityAttackModel = function EntityAttackModel() {

    /**
     * Id stanu Entity - identyfikator - nie jest to GUID
     * @property {string} _id
     * @private
     */
    this._id = "default";

    /**
     * Minimalny zasieg ataku
     * @property {Number} _minRange
     * @private
     */
    this._minRange = 0;

    /**
     * Maksymalny zasieg ataku
     * @property {Number} _maxRange
     * @private
     */
    this._maxRange = 0;

    /**
     * Obrazenia ataku
     * @property {Number} _damage
     * @private
     */
    this._damage = 0;

    /**
     * Czestotliwosc ataku
     * @property {Number} _rate
     * @private
     */
    this._rate = 0;

    /**
     * Tworzyć pocisk
     * @property {boolean} _createBullet
     * @private
     */
    this._createBullet = false;

    /**
     * Offset tworzenia pocisku wzgledem srodka atakujacego entity
     * @property {support.geom.Point2d} _bulletOffset
     * @private
     */
    this._bulletOffset = new support.geom.Point2d(0, 0);

    /**
     * EntotyPocisku dla atakow zasiegowych
     * @property {app.model.EntityModel} _bulletEntity
     * @private
     */
    this._bulletEntity = new app.model.EntityModel();

};

Utils.inherits(app.model.EntityAttackModel, Object);

/**
 * @method setId
 * @param {Number} id
 */
app.model.EntityAttackModel.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getId
 * @return {Number} id
 */
app.model.EntityAttackModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setMinRange
 * @param {Number} value
 */
app.model.EntityAttackModel.prototype.setMinRange = function setMinRange(value) {
    this._minRange = value;
};

/**
 * @method getMinRange
 * @return {Number} minRange
 */
app.model.EntityAttackModel.prototype.getMinRange = function getMinRange() {
    return this._minRange;
};

/**
 * @method setMaxRange
 * @param {Number} value
 */
app.model.EntityAttackModel.prototype.setMaxRange = function setMaxRange(value) {
    this._maxRange = value;
};

/**
 * @method getMaxRange
 * @return {Number} minRange
 */
app.model.EntityAttackModel.prototype.getMaxRange = function getMaxRange() {
    return this._maxRange;
};

/**
 * @method setDamage
 * @param {Number} value
 */
app.model.EntityAttackModel.prototype.setDamage = function setDamage(value) {
    this._damage = value;
};

/**
 * @method getDamage
 * @return {Number} damage
 */
app.model.EntityAttackModel.prototype.getDamage = function getDamage() {
    return this._damage;
};

/**
 * @method setRate
 * @param {Number} value
 */
app.model.EntityAttackModel.prototype.setRate = function setRate(value) {
    this._rate = value;
};

/**
 * @method getRate
 * @return {Number} rate
 */
app.model.EntityAttackModel.prototype.getRate = function getRate() {
    return this._rate;
};

/**
 * @method setBulletEntityModel
 * @param {app.model.EntityModel} value
 */
app.model.EntityAttackModel.prototype.setBulletEntityModel = function setBulletEntityModel(value) {
    this._bulletEntity = value;
};

/**
 * @method getBulletEntityModel
 * @return {app.model.EntityModel} _bulletEntity
 */
app.model.EntityAttackModel.prototype.getBulletEntityModel = function getBulletEntityModel() {
    return this._bulletEntity;
};

/**
 * @method getBulletOffset
 * @return {support.geom.Point2d} bulletOffset
 */
app.model.EntityAttackModel.prototype.getBulletOffset = function getBulletOffset() {
    return this._bulletOffset;
};

/**
 * @method setBulletOffsetX
 * @param {Number} x
 */
app.model.EntityAttackModel.prototype.setBulletOffsetX = function setBulletOffsetX(x) {
    this._bulletOffset.setX(x);
};

/**
 * @method setBulletOffsetY
 * @param {Number} y
 */
app.model.EntityAttackModel.prototype.setBulletOffsetY = function setBulletOffsetY(y) {
    this._bulletOffset.setY(y);
};

/**
 * @method setCreateBullet
 * @param {boolean} value
 */
app.model.EntityAttackModel.prototype.setCreateBullet = function setCreateBullet(value) {
    this._createBullet = value;
};
/**
 * @method getCreateBullet
 * @return {boolean} _createBullet
 */
app.model.EntityAttackModel.prototype.getCreateBullet = function getCreateBullet() {
    return this._createBullet;
};





/**
 * @method clone
 * @return {app.model.EntityAttackModel} clone
 */
app.model.EntityAttackModel.prototype.clone = function clone() {

    var clone = new app.model.EntityAttackModel();

    clone._id = this._id;
    clone._minRange = this._minRange;
    clone._maxRange = this._maxRange;
    clone._damage = this._damage;
    clone._rate = this._rate;
    clone._bulletOffset = new support.geom.Point2d(this._bulletOffset.getX(), this._bulletOffset.getY());
    clone._bulletEntity = this._bulletEntity.clone();
    clone._createBullet = this._createBullet;

    return clone;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.EntityAttackModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    if (JSON._id !== undefined) {
        this._id = JSON._id;
    }

    if (JSON._minRange !== undefined) {
        this._minRange = JSON._minRange;
    }

    if (JSON._maxRange !== undefined) {
        this._maxRange = JSON._maxRange;
    }

    if (JSON._damage !== undefined) {
        this._damage = JSON._damage;
    }

    if (JSON._rate !== undefined) {
        this._rate = JSON._rate;
    }

    if (JSON._bulletOffset !== undefined && JSON._bulletOffset._x !== undefined && JSON._bulletOffset._y !== undefined) {
        this._bulletOffset = new support.geom.Point2d(JSON._bulletOffset._x, JSON._bulletOffset._y);
    }

    if (JSON._bulletEntity !== undefined) {
        this._bulletEntity.loadFromJSON(JSON._bulletEntity);
    }

    if (JSON._createBullet !== undefined) {
        this._createBullet = JSON._createBullet;
    }

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.EntityAttackModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var result = {
        1: this._id,
        2: this._minRange,
        3: this._maxRange,
        4: this._damage,
        5: this._rate,
        6: this._createBullet,
        7: this._bulletOffset.getMinifyJSON(),
        8: this._bulletEntity.getMinifyJSON(),

    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.EntityAttackModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var point2d = new support.geom.Point2d(0, 0);
    var bulletEntity = new app.model.EntityModel();

    var result = {
        _id: minifyJSON["1"],
        _minRange: minifyJSON["2"],
        _maxRange: minifyJSON["3"],
        _damage: minifyJSON["4"],
        _rate: minifyJSON["5"],
        _createBullet: minifyJSON["6"],
        _bulletOffset: point2d.unMinifyJSON(minifyJSON["7"]),
        _bulletEntity: bulletEntity.unMinifyJSON(minifyJSON["8"])
    };
    return result;
};








