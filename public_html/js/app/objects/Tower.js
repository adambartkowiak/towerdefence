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
 * @param {Number} type
 * 
 */
app.objects.Tower = function Tower(x, y, range, rate, type) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property _range
     * @type Number
     */
    this._range = range;

    /**
     * @property _rate
     * @type Number
     */
    this._rate = rate;

    /**
     * @property _type
     * @type Number
     */
    this._type = type;
    
    /**
     * @property _cooldown
     * @type Number
     */
    this._cooldown = 0;
    
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Tower, support.geom.Point2d);

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