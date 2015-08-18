/**
 * Created by adambartkowiak on 4.7.2015.
 */
'use strict';

var support = support || {};
support.geom = support.geom || {};

var Utils = Utils || {};

/**
 * @namespace support.geom
 * @class Circle
 * @constructor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
support.geom.Circle = function Circle(x, y, radius) {

    /**
     * @property {Number} x
     * @private
     */
    this._x = x;

    /**
     * @@property {Number} y
     * @private
     */
    this._y = y;

    /**
     * @property {Number} radius
     * @private
     */
    this._radius = radius;

};

Utils.inherits(support.geom.Circle, Object);

/**
 * @method getX
 * @return {Number} x
 */
support.geom.Circle.prototype.getX = function getX() {
    return this._x;
};

/**
 * @method getY
 * @return {Number} y
 */
support.geom.Circle.prototype.getY = function getY() {
    return this._y;
};

/**
 * @method getRadius
 * @return {Number} radius
 */
support.geom.Circle.prototype.getRadius = function getRadius() {
    return this._radius;
};

/**
 * @method setX
 * @param {Number} value
 */
support.geom.Circle.prototype.setX = function setX(value) {
    this._x = value;
};

/**
 * @method setY
 * @param {Number} value
 */
support.geom.Circle.prototype.setY = function setY(value) {
    this._y = value;
};

/**
 * @method setRadius
 * @param {Number} radius
 */
support.geom.Circle.prototype.setRadius = function setRadius(radius) {
    this._radius = radius;
};

/**
 * @method isPointInside
 * @param {support.geom.Point2d} pointToCheck
 * @return {Boolean} inside
 */
support.geom.Circle.prototype.isPointInside = function isPointInside(pointToCheck) {

    var result = false;
    var dX = this.getX() - pointToCheck.getX();
    var dY = this.getY() - pointToCheck.getY();
    var vectorMenu = new support.geom.SimpleVector2d(dX, dY);

    if (vectorMenu.getVectorLength() < this.getRadius()) {
        result = true;
    }

    return result;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
support.geom.Circle.prototype.getMinifyJSON = function getMinifyJSON(){

    var result = {
        1:this._x,
        2:this._y,
        3:this._radius
    }
    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
support.geom.Circle.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _x: minifyJSON["1"],
        _y: minifyJSON["2"],
        _radius: minifyJSON["3"]
    };

    return result;
};