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
support.geom.shape = support.geom.shape || {};

/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace support.geom.shape
 */
support.geom.shape.FreeShape = function FreeShape() {

    /**
     * @property _shapePoints
     * @type Array
     */
    this._shapePoints = [];

};

/**
 * @inheritance
 */
Utils.inherits(support.geom.shape.FreeShape, Object);


/**
 * @methodName addPoint
 * @param {support.geom.Point2d} newPoint
 */
support.geom.shape.FreeShape.prototype.addPoint = function addPoint(newPoint) {
    this._shapePoints.push(newPoint);
};

/**
 * @methodName clear
 */
support.geom.shape.FreeShape.prototype.clear = function clear() {
    this._shapePoints.length = 0;
};

/**
 * @methodName getShapePoints
 * @return {Array} _x
 */
support.geom.shape.FreeShape.prototype.getShapePoints = function getShapePoints() {
    return this._shapePoints;
};