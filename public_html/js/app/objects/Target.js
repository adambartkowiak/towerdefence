/**
 * Created by adambartkowiak on 16.04.2015.
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
 * @param {app.objects.Enemy} enemy
 * 
 */
app.objects.Target = function Target(x, y, enemy) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property _range
     * @type Number
     */
    this._enemy = enemy;

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Target, support.geom.Point2d);

/**
 * @methodName getEnemy
 * @return {app.objects.Target} enemy
 */
app.objects.Target.prototype.getEnemy = function getEnemy() {
    return this._enemy;
};