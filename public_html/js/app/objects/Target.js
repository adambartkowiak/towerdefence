/**
 * Created by adambartkowiak on 16.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class Target
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {String} enemyGuid
 *
 */
app.objects.Target = function Target(x, y, enemyGuid) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property {Number} _range
     * @private
     */
    this._enemyGuid = enemyGuid;

};

Utils.inherits(app.objects.Target, support.geom.Point2d);

/**
 * @method getEnemy
 * @return {app.objects.Target} enemy
 */
app.objects.Target.prototype.getEnemyGuid = function getEnemyGuid() {
    return this._enemyGuid;
};