/**
 * Created by adambartkowiak on 4.7.2015.
 */
'use strict';

var support = support || {};
support.geom = support.geom || {};

var Utils = Utils || {};

/**
 * @namespace support.geom
 * @class Rect
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
support.geom.Rect = function Rect(x, y, width, height) {

    /**
     * @property {Number} x
     * @private
     */
    this._x = x;

    /**
     * @property {Number} y
     * @private
     */
    this._y = y;

    /**
     * @property {Number} width
     * @private
     */
    this._width = width;

    /**
     * @property {Number} height
     * @private
     */
    this._height = height;

};

Utils.inherits(support.geom.Rect, Object);

/**
 * @method getX
 * @return {Number} x
 */
support.geom.Rect.prototype.getX = function getX() {
    return this._x;
};

/**
 * @method getY
 * @return {Number} y
 */
support.geom.Rect.prototype.getY = function getY() {
    return this._y;
};

/**
 * @method getWidth
 * @return {Number} width
 */
support.geom.Rect.prototype.getWidth = function getWidth() {
    return this._width;
};

/**
 * @method getHeight
 * @return {Number} y
 */
support.geom.Rect.prototype.getHeight = function getHeight() {
    return this._height;
};

/**
 * @method setX
 * @param {Number} x
 */
support.geom.Rect.prototype.setX = function setX(x) {
    this._x = x;
};

/**
 * @method setY
 * @param {Number} y
 */
support.geom.Rect.prototype.setY = function setY(y) {
    this._y = y;
};

/**
 * @method setWidth
 * @param {Number} width
 */
support.geom.Rect.prototype.setWidth = function setWidth(width) {
    this._width = width;
};

/**
 * @method setHeight
 * @param {Number} height
 */
support.geom.Rect.prototype.setHeight = function setHeight(height) {
    this._height = height;
};

/**
 * @method isPointInside
 * @param {support.geom.Point2d} pointToCheck
 * @return {Boolean} inside
 */
support.geom.Rect.prototype.isPointInside = function isPointInside(pointToCheck) {

    var result = false;
    var p = pointToCheck;

    if (this._x < p.getX() && this._y < p.getY() && this._x + this._width > p.getX() && this._y + this._height > p.getY()) {
        result = true;
    }

    return result;
};