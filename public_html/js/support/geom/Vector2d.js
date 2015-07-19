/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';

var support = support || {};
support.geom = support.geom || {};

var Utils = Utils || {};

/**
 * @namespace support.geom
 * @class Vector2d
 * @constructor
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 */
support.geom.Vector2d = function Vector2d(x1, y1, x2, y2) {

    /**
     * @property {support.geom.Point2d} _startPoint
     * @private
     */
    this._startPoint = new support.geom.Point2d(x1, y1);

    /**
     * @property {support.geom.Point2d} _endPoint
     * @private
     */
    this._endPoint = new support.geom.Point2d(x2, y2);

};

Utils.inherits(support.geom.Vector2d, Object);

/**
 * @method getStartPoint
 * @return {support.geom.Point2d} startSpoint
 */
support.geom.Vector2d.prototype.getStartPoint = function getStartPoint() {
    return this._startPoint;
};

/**
 * @method getEndPoint
 * @return {support.geom.Point2d} endPoint
 */
support.geom.Vector2d.prototype.getEndPoint = function getEndPoint() {
    return this._endPoint;
};

/**
 * Zwraca dlugosc wektora
 *
 * @method getVectorLength
 * @return {Number} length
 */
support.geom.Vector2d.prototype.getVectorLength = function getVectorLength() {
    var v1 = this._startPoint,
        v2 = this._endPoint;

    return Math.sqrt(Math.pow(v2.getX() - v1.getX(), 2) + Math.pow(v2.getY() - v1.getY(), 2));
};

/**
 * Zwraca znormalizowany wektor
 *
 * @method getNormalizedVector
 * @return {support.geom.Point2d} normalizedVector
 */
support.geom.Vector2d.prototype.getNormalizedVector = function getNormalizedVector() {
    var v1 = this._startPoint,
        v2 = this._endPoint,
        length = this.getVectorLength(),
        x1 = (v2.getX() - v1.getX()) / length,
        y1 = (v2.getY() - v1.getY()) / length;

    return new support.geom.Point2d(x1, y1);
};
