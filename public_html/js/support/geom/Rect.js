/**
 * Created by adambartkowiak on 4.7.2015.
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
 * @param {Number} width
 * @param {Number} height
 */
support.geom.Rect = function Rect(x, y, width, height) {

    /**
     * @property {Number} x
     */
    this._x = x;

    /**
     * @@property {Number} y 
     */
    this._y = y;

    /**
     * @property {Number} width
     */
    this._width = width;

    /**
     * @property {Number} height
     */
    this._height = height;

};

/**
 * @inheritance
 */
Utils.inherits(support.geom.Rect, Object);

/**
 * @methodName getX
 * @return {Number} x
 */
support.geom.Rect.prototype.getX = function getX() {
    return this._x;
};

/**
 * @methodName getY
 * @return {Number} y
 */
support.geom.Rect.prototype.getY = function getY() {
    return this._y;
};

/**
 * @methodName getWidth
 * @return {Number} width
 */
support.geom.Rect.prototype.getWidth = function getWidth() {
    return this._width;
};

/**
 * @methodName getHeight
 * @return {Number} y
 */
support.geom.Rect.prototype.getHeight = function getHeight() {
    return this._height;
};

/**
 * @methodName setX
 * @param {Number} x
 */
support.geom.Rect.prototype.setX = function setX(x) {
    this._x = x;
};

/**
 * @methodName setY
 * @param {Number} y
 */
support.geom.Rect.prototype.setY = function setY(y) {
    this._y = y;
};

/**
 * @methodName setWidth
 * @param {Number} width
 */
support.geom.Rect.prototype.setWidth = function setWidth(width) {
    this._width = width;
};

/**
 * @methodName setHeight
 * @param {Number} height
 */
support.geom.Rect.prototype.setHeight = function setHeight(height) {
    this._height = height;
};

/**
 * @methodName isPontInside
 * @param {support.geom.Point2d} pointToCheck
 * @return {Boolean} description
 */
support.geom.Rect.prototype.isPointInside = function isPointInside(pointToCheck) {
    
    var result = false;
    var p = pointToCheck;
    
    if (this._x < p.getX() && this._y < p.getY() && this._x + this._width > p.getX() && this._y + this._height > p.getY()){
        result = true;
    }
    
    return result;
};