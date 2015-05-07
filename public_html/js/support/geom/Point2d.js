/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';
/**
 * @namespace
 * @type {support|*|{}}
 */
var support = support || {};
support.geom = support.geom || {};

/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace support.geom
 * @param {Number} x
 * @param {Number} y
 */
support.geom.Point2d = function Point2d(x, y) {

    /**
     * @property _x
     * @type Number
     */
    this._x = x;

    /**
     * @property _y
     * @type Number
     */
    this._y = y;

};

/**
 * @inheritance
 */
Utils.inherits(support.geom.Point2d, Object);

/**
 * @methodName getX
 * @return {Number} _x
 */
support.geom.Point2d.prototype.getX = function getX() {
    return this._x;
};

/**
 * @methodName getY
 * @return {Number} _x
 */
support.geom.Point2d.prototype.getY = function getY() {
    return this._y;
};

/**
 * @methodName setX
 * @param {Number} value
 */
support.geom.Point2d.prototype.setX = function setX(value) {
    this._x = value;
};

/**
 * @methodName setY
 * @param {Number} value
 */
support.geom.Point2d.prototype.setY = function setY(value) {
    this._y = value;
};