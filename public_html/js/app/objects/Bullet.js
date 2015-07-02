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
 * @param {app.objects.Target} target
 * @param {Number} speed
 * @param {Number} damage
 * 
 */
app.objects.Bullet = function Bullet(x, y, target, speed, damage) {

    support.geom.Point2d.call(this, x, y);
    
    /**
     * @property _target
     * @type Number
     */
    this._target = target;

    /**
     * @property _speed
     * @type Number
     */
    this._speed = speed;

    /**
     * @property _damage
     * @type Number
     */
    this._damage = damage;
    
    /**
     * @property _angle
     * @type Number
     */
    this._angle;

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Bullet, support.geom.Point2d);

/**
 * @methodName getTarget
 * @return {app.objects.Target} target
 */
app.objects.Bullet.prototype.getTarget = function getTarget() {
    return this._target;
};

/**
 * @methodName getAngle
 * @return {Number} angle
 */
app.objects.Bullet.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @methodName setAngle
 * @param {Number} angle
 */
app.objects.Bullet.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @methodName getSpeed
 * @return {Number} speed
 */
app.objects.Bullet.prototype.getSpeed = function getSpeed() {
    return this._speed;
};

/**
 * @methodName setSpeed
 * @param {Number} speed
 */
app.objects.Bullet.prototype.setSpeed = function setSpeed(speed) {
    this._speed = speed;
};