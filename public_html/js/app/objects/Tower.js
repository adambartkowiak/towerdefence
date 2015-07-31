/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class Tower
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} range
 * @param {Number} rate
 * @param {app.objects.Bullet} bullet
 * @param {String} graphicUrl
 *
 */
app.objects.Tower = function Tower(x, y, range, rate, bullet, graphicUrl) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property {Number} _range
     * @private
     */
    this._range = range;

    /**
     * @property {Number} _rate
     * @private
     */
    this._rate = rate;

    /**
     * @property {app.objects.Bullet} _bullet
     * @private
     */
    this._bullet = bullet;

    /**
     * @property {String} _graphicUrl
     * @private
     */
    this._graphicUrl = graphicUrl;

    /**
     * @property {Number} _cooldown
     * @private
     */
    this._cooldown = 0;

    /**
     * @property {Number} _angle
     * @private
     */
    this._angle = 0;

    /**
     * @property {Number} _guid
     * @private
     */
    this._guid = Math.random();

};

Utils.inherits(app.objects.Tower, support.geom.Point2d);

/**
 * @method getRange
 * @return {Number} range
 */
app.objects.Tower.prototype.getRange = function getRange() {
    return this._range;
};

/**
 * @method setRange
 * @param {Number} range
 */
app.objects.Tower.prototype.setRange = function setRange(range) {
    this._range = range;
};

/**
 * @method getRate
 * @return {Number} rate
 */
app.objects.Tower.prototype.getRate = function getRate() {
    return this._rate;
};

/**
 * @method setRate
 * @param {Number} rate
 */
app.objects.Tower.prototype.setRate = function setRate(rate) {
    this._rate = rate;
};

/**
 * @method getBullet
 * @return {app.objects.Bullet} bullet
 */
app.objects.Tower.prototype.getBullet = function getBullet() {
    return this._bullet;
};

/**
 * @method setBullet
 * @param {app.objects.Bullet} bullet
 */
app.objects.Tower.prototype.setBullet = function setBullet(bullet) {
    this._bullet = bullet;
};

/**
 * @method getGraphicUrl
 * @return {String} graphicUrl
 */
app.objects.Tower.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @method setGraphicUrl
 * @param {String} graphicUrl
 */
app.objects.Tower.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @method getCooldown
 * @return {Number} cooldown
 */
app.objects.Tower.prototype.getCooldown = function getCooldown() {
    return this._cooldown;
};

/**
 * @method setCooldown
 * @param {Number} cooldown
 */
app.objects.Tower.prototype.setCooldown = function setCooldown(cooldown) {
    this._cooldown = cooldown;
};

/**
 * @method getAngle
 * @return {Number} angle
 */
app.objects.Tower.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @method setAngle
 * @param {Number} angle
 */
app.objects.Tower.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @method getGuid
 * @return {Number} guid
 */
app.objects.Tower.prototype.getGuid = function getGuid() {
    return this._guid;
};

/**
 * @method setGuid
 * @param {Number} guid
 */
app.objects.Tower.prototype.setGuid = function setGuid(guid) {
    this._guid = guid;
};