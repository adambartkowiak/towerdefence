/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class Checkpoint
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} moveX
 * @param {Number} moveY
 *
 */
app.objects.Checkpoint = function Checkpoint(x, y, moveX, moveY) {

    support.geom.Point2d.call(this, x, y);

    /**
     * @property {support.geom.SimpleVector2d} _moveVector
     * @private
     */
    this._moveVector = new support.geom.SimpleVector2d(moveX, moveY);
};

Utils.inherits(app.objects.Checkpoint, support.geom.Point2d);

/**
 * @method getMoveVector
 * @return {support.geom.SimpleVector2d} moveVector
 */
app.objects.Checkpoint.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};