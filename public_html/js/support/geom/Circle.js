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
 * @param {Number} radius
 */
support.geom.Circle = function Circle(x, y, radius) {

    /**
     * @property {Number} x
     */
    this._x = x;

    /**
     * @@property {Number} y 
     */
    this._y = y;

    /**
     * @property {Number} radius
     */
    this._radius = radius;

};

/**
 * @inheritance
 */
Utils.inherits(support.geom.Circle, Object);

/**
 * @methodName getX
 * @return {Number} _x
 */
support.geom.Circle.prototype.getX = function getX() {
    return this._x;
};

/**
 * @methodName getY
 * @return {Number} _x
 */
support.geom.Circle.prototype.getY = function getY() {
    return this._y;
};

/**
 * @methodName getRadius
 * @return {Number} radius
 */
support.geom.Circle.prototype.getRadius = function getRadius() {
    return this._radius;
};

/**
 * @methodName setX
 * @param {Number} value
 */
support.geom.Circle.prototype.setX = function setX(value) {
    this._x = value;
};

/**
 * @methodName setY
 * @param {Number} value
 */
support.geom.Circle.prototype.setY = function setY(value) {
    this._y = value;
};

/**
 * @methodName setRadius
 * @param {Number} radius
 */
support.geom.Circle.prototype.setRadius = function setRadius(radius) {
    this._radius = radius;
};

/**
 * @methodName isPontInside
 * @param {support.geom.Point2d} pointToCheck
 * @return {Boolean} description
 */
support.geom.Circle.prototype.isPointInside = function isPointInside(pointToCheck) {
    
    var result = false;
    var dX = this.getX() - pointToCheck.getX();
    var dY = this.getY() - pointToCheck.getY();
    var vectorMenu = new support.geom.SimpleVector2d(dX, dY);
        
    if (vectorMenu.getVectorLength() < this.getRadius()){
        result = true;
    }
    
    return result;
};