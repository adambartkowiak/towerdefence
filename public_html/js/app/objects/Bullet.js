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
 * @param {String} graphicUrl
 * 
 */
app.objects.Bullet = function Bullet(x, y, target, speed, damage, graphicUrl) {

    support.geom.Point2d.call(this, x, y);
    
    /**
     * @property {app.objects.Target} _target
     */
    this._target = target;

    /**
     * @property {Number} _speed
     */
    this._speed = speed;

    /**
     * @property {Number} _damage 
     */
    this._damage = damage;
    
    /**
     * @property {Number} _angle
     */
    this._angle;
    
    /**
     * @property {String} _graphicUrl
     */
    this._graphicUrl = graphicUrl;
    
    /**
     * @property {support.geom.SimpleVector2d} _moveVector
     */
    this._moveVector = new support.geom.SimpleVector2d(0,0);

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

/**
 * @methodName getDamage
 * @return {Number} damage
 */
app.objects.Bullet.prototype.getDamage = function getDamage() {
    return this._damage;
};

/**
 * @methodName setDamage
 * @param {Number} damage
 */
app.objects.Bullet.prototype.setDamage = function setDamage(damage) {
    this._damage = damage;
};

/**
 * @methodName getGraphicUrl
 * @return {String} graphicUrl
 */
app.objects.Bullet.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @methodName setGraphicUrl
 * @param {String} graphicUrl
 */
app.objects.Bullet.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};