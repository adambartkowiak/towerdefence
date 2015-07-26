/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class Enemy
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} hp
 * @param {Number} speed
 * @param {String} graphicUrl
 *
 */
app.objects.Enemy = function Enemy(x, y, hp, speed, graphicUrl) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property {support.geom.Point2d} _lastPosition
     * @private
     */
    this._lastPosition = new support.geom.Point2d(x, y);

    /**
     * @property {Number} _hp
     * @private
     */
    this._hp = hp;

    /**
     * @property {Number} _currentHp
     * @private
     */
    this._currentHp = this._hp;

    /**
     * @property {Number} _speed
     * @private
     */
    this._speed = speed;

    /**
     * @property {String} _graphicUrl
     * @private
     */
    this._graphicUrl = graphicUrl;

    /**
     * @property {support.geom.SimpleVector2d} _moveVector
     * @private
     */
    this._moveVector = new support.geom.SimpleVector2d(0, 0);

    /**
     * @property {Number} _angle
     * @private
     */
    this._angle = 0;

    /**
     * @property {String} _guid
     * @private
     */
    this._guid = Math.random();
};

Utils.inherits(app.objects.Enemy, support.geom.Point2d);

/**
 * @method setX
 * @param {Number} value
 */
app.objects.Enemy.prototype.setX = function setX(value) {

    this._lastPosition.setX(this._x);

    //set base param
    this._x = value;
};

/**
 * @method setY
 * @param {Number} value
 */
app.objects.Enemy.prototype.setY = function setY(value) {

    this._lastPosition.setY(this._y);

    //set base param
    this._y = value;
};
/**
 * @method getHp
 * @return {Number} hp
 */
app.objects.Enemy.prototype.getHp = function getHp() {
    return this._hp;
};

/**
 * @method setHp
 * @param {Number} hp
 */
app.objects.Enemy.prototype.setHp = function setHp(hp) {
    this._hp = hp;
};

/**
 * @method getCurrentHp
 * @return {Number} currentHp
 */
app.objects.Enemy.prototype.getCurrentHp = function getCurrentHp() {
    return this._currentHp;
};

/**
 * @method setCurrentHp
 * @param {Number} currentHp
 */
app.objects.Enemy.prototype.setCurrentHp = function setCurrentHp(currentHp) {
    this._currentHp = currentHp;
};

/**
 * @method getMoveVector
 * @return {support.geom.SimpleVector2d} moveVector
 */
app.objects.Enemy.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};

/**
 * @method getAngle
 * @return {Number} angle
 */
app.objects.Enemy.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @method setAngle
 * @param {Number} angle
 */
app.objects.Enemy.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @method getSpeed
 * @return {Number} speed
 */
app.objects.Enemy.prototype.getSpeed = function getSpeed() {
    return this._speed;
};

/**
 * @method setSpeed
 * @param {Number} speed
 */
app.objects.Enemy.prototype.setSpeed = function setSpeed(speed) {
    this._speed = speed;
};

/**
 * @method getGuid
 * @return {String} guid
 */
app.objects.Enemy.prototype.getGuid = function getGuid() {
    return this._guid;
};

/**
 * @method setGuid
 * @param {Number} guid
 */
app.objects.Enemy.prototype.setGuid = function setGuid(guid) {
    this._guid = guid;
};

/**
 * @method getMoveVector
 * @return {support.geom.SimpleVector2d} guid
 */
app.objects.Enemy.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};

/**
 * @method setMoveVector
 * @param {support.geom.SimpleVector2d} moveVector
 */
app.objects.Enemy.prototype.setMoveVector = function setMoveVector(moveVector) {
    this._moveVector = moveVector;
};

/**
 * @method getGraphicUrl
 * @return {String} graphicUrl
 */
app.objects.Enemy.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @method setGraphicUrl
 * @param {String} graphicUrl
 */
app.objects.Enemy.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @method getLastPosition
 * @return {support.geom.Point2d} lastPosition
 */
app.objects.Enemy.prototype.getLastPosition = function getLastPosition() {
    return this._lastPosition;
};