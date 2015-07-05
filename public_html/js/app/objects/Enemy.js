/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.objects
 * @param {Number} x
 * @param {Number} y
 * @param {Number} hp
 * @param {Number} speed
 * @param {Number} type
 * 
 */
app.objects.Enemy = function Enemy(x, y, hp, speed, type) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property _hp
     * @type Number
     */
    this._hp = hp;
    
    /**
     * @property _currentHp
     * @type Number
     */
    this._currentHp = this._hp;

    /**
     * @property _speed
     * @type Number
     */
    this._speed = speed;
    
    /**
     * @property _type
     * @type Number
     */
    this._type = type;
    
    /**
     * @property _type
     * @type support.geom.SimpleVector2d
     */
    this._moveVector = new support.geom.SimpleVector2d(0,0);
    
    /**
     * @property _angle
     * @type Number
     */
    this._angle = 0;
    
    /**
     * @property _guid
     * @type String
     */
    this._guid = Math.random();
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Enemy, support.geom.Point2d);

/**
 * @methodName getHp
 * @return {Number} hp
 */
app.objects.Enemy.prototype.getHp = function getHp() {
    return this._hp;
};

/**
 * @methodName setHp
 * @param {Number} hp
 */
app.objects.Enemy.prototype.setHp = function setHp(hp) {
    this._hp = hp;
};

/**
 * @methodName getCurrentHp
 * @return {Number} currentHp
 */
app.objects.Enemy.prototype.getCurrentHp = function getCurrentHp() {
    return this._currentHp;
};

/**
 * @methodName setCurrentHp
 * @param {Number} currentHp
 */
app.objects.Enemy.prototype.setCurrentHp = function setCurrentHp(currentHp) {
    this._currentHp = currentHp;
};

/**
 * @methodName getMoveVector
 * @return {support.geom.SimpleVector2d} moveVector
 */
app.objects.Enemy.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};

/**
 * @methodName getAngle
 * @return {Number} angle
 */
app.objects.Enemy.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @methodName setAngle
 * @param {Number} angle
 */
app.objects.Enemy.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @methodName getSpeed
 * @return {Number} speed
 */
app.objects.Enemy.prototype.getSpeed = function getSpeed() {
    return this._speed;
};

/**
 * @methodName setSpeed
 * @param {Number} speed
 */
app.objects.Enemy.prototype.setSpeed = function setSpeed(speed) {
    this._speed = speed;
};

/**
 * @methodName getGuid
 * @return {String} guid
 */
app.objects.Enemy.prototype.getGuid = function getGuid() {
    return this._guid;
};

/**
 * @methodName setGuid
 * @param {Number} guid
 */
app.objects.Enemy.prototype.setGuid = function setGuid(guid) {
    this._guid = guid;
};

/**
 * @methodName getMoveVector
 * @return {support.geom.SimpleVector2d} guid
 */
app.objects.Enemy.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};

/**
 * @methodName setMoveVector
 * @param {support.geom.SimpleVector2d} moveVector
 */
app.objects.Enemy.prototype.setMoveVector = function setMoveVector(moveVector) {
    this._moveVector = moveVector;
};

/**
 * @methodName getType
 * @return {Number} type
 */
app.objects.Enemy.prototype.getType = function getType() {
    return this._type;
};

/**
 * @methodName setMoveVector
 * @param {Number} type
 */
app.objects.Enemy.prototype.setType = function setType(type) {
    this._type = type;
};