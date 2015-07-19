/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';

var support = support || {};
support.geom = support.geom || {};
support.geom.shape = support.geom.shape || {};

var Utils = Utils || {};

/**
 * @namespace support.geom.shape
 * @class FreeShape
 * @constructor
 */
support.geom.shape.FreeShape = function FreeShape() {

    /**
     * @property {Array} _shapePoints
     * @private
     */
    this._shapePoints = [];

};

Utils.inherits(support.geom.shape.FreeShape, Object);


/**
 * @method addPoint
 * @param {support.geom.Point2d} newPoint
 */
support.geom.shape.FreeShape.prototype.addPoint = function addPoint(newPoint) {
    this._shapePoints.push(newPoint);
};

/**
 * @method clear
 */
support.geom.shape.FreeShape.prototype.clear = function clear() {
    this._shapePoints.length = 0;
};

/**
 * @method getShapePoints
 * @return {Array} shapePoints
 */
support.geom.shape.FreeShape.prototype.getShapePoints = function getShapePoints() {
    return this._shapePoints;
};