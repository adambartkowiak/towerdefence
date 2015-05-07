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
 * @param {Number} moveX
 * @param {Number} moveY
 * 
 */
app.objects.Checkpoint = function Checkpoint(x, y, moveX, moveY) {

    support.geom.Point2d.call(this, x, y);
    
    /**
     * @property _moveVector
     * @type support.geom.SimpleVector2d
     */
    this._moveVector = new support.geom.SimpleVector2d(moveX,moveY);
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Checkpoint, support.geom.Point2d);

/**
 * @methodName getMoveVector
 * @return {support.geom.SimpleVector2d} moveVector
 */
app.objects.Checkpoint.prototype.getMoveVector = function getMoveVector() {
    return this._moveVector;
};