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
     */
    this._range = range;

    /**
     * @property {Number} _rate
     */
    this._rate = rate;
    
    /**
     * @property {app.objects.Bullet} _bullet
     */
    this._bullet = bullet;

    /**
     * @property {String} _graphicUrl
     */
    this._graphicUrl = graphicUrl;
    
    /**
     * @property {Number} _cooldown
     */
    this._cooldown = 0;
    
    /**
     * @property {Number} _angle
     */
    this._angle = 0;
    
    /**
     * @property {Number} _guid
     */
    this._guid = Math.random();
    
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Tower, support.geom.Point2d);

/**
 * @methodName getRange
 * @return {Number} range
 */
app.objects.Tower.prototype.getRange = function getRange() {
    return this._range;
};

/**
 * @methodName setRange
 * @param {Number} range
 */
app.objects.Tower.prototype.setRange = function setRange(range) {
    this._range = range;
};

/**
 * @methodName getRate
 * @return {Number} rate
 */
app.objects.Tower.prototype.getRate = function getRate() {
    return this._rate;
};

/**
 * @methodName setRate
 * @param {Number} rate
 */
app.objects.Tower.prototype.setRate = function setRate(rate) {
    this._rate = rate;
};

/**
 * @methodName getBullet
 * @return {app.objects.Bullet} bullet
 */
app.objects.Tower.prototype.getBullet = function getBullet() {
    return this._bullet;
};

/**
 * @methodName setBullet
 * @param {app.objects.Bullet} bullet
 */
app.objects.Tower.prototype.setBullet = function setBullet(bullet) {
    this._bullet = bullet;
};

/**
 * @methodName getGraphicUrl
 * @return {String} graphicUrl
 */
app.objects.Tower.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @methodName setGraphicUrl
 * @param {String} graphicUrl
 */
app.objects.Tower.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @methodName getCooldown
 * @return {app.objects.Target} target
 */
app.objects.Tower.prototype.getCooldown = function getCooldown() {
    return this._cooldown;
};

/**
 * @methodName setCooldown
 * @param {Number} cooldown
 */
app.objects.Tower.prototype.setCooldown = function setCooldown(cooldown) {
    this._cooldown = cooldown;
};

/**
 * @methodName getAngle
 * @return {Number} angle
 */
app.objects.Tower.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @methodName setAngle
 * @param {Number} angle
 */
app.objects.Tower.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @methodName getGuid
 * @return {Number} guid
 */
app.objects.Tower.prototype.getGuid = function getGuid() {
    return this._guid;
};

/**
 * @methodName setGuid
 * @param {Number} guid
 */
app.objects.Tower.prototype.setGuid = function setGuid(guid) {
    this._guid = guid;
};