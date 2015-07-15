/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

/**
 * @namespace app.objects
 * @memberOf app
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {app.objects.Target} target
 * @param {Number} speed
 * @param {Number} damage
 * @param {String} graphicUrl
 */
app.objects.Bullet = function Bullet(x, y, target, speed, damage, graphicUrl) {

    support.geom.Point2d.call(this, x, y);

    this._target = target;
    this._speed = speed;
    this._damage = damage;
    this._angle;
    this._graphicUrl = graphicUrl;
    this._moveVector = new support.geom.SimpleVector2d(0,0);
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Bullet, support.geom.Point2d);

/**
 * @return {app.objects.Target} target
 */
app.objects.Bullet.prototype.getTarget = function getTarget() {
    return this._target;
};

/**
 * Ta funkcja to geter angle
 * @return {Number} angle
 */
app.objects.Bullet.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @param {Number} angle
 */
app.objects.Bullet.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @return {Number} speed
 */
app.objects.Bullet.prototype.getSpeed = function getSpeed() {
    return this._speed;
};

/**
 * @param {Number} speed
 */
app.objects.Bullet.prototype.setSpeed = function setSpeed(speed) {
    this._speed = speed;
};

/**
 * @return {Number} damage
 */
app.objects.Bullet.prototype.getDamage = function getDamage() {
    return this._damage;
};

/**
 * @param {Number} damage
 */
app.objects.Bullet.prototype.setDamage = function setDamage(damage) {
    this._damage = damage;
};

/**
 * @return {String} graphicUrl
 */
app.objects.Bullet.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @param {String} graphicUrl
 */
app.objects.Bullet.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};