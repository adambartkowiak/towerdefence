/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';


var support = support || {};
support.geom = support.geom || {};

var Utils = Utils || {};

/**
 * @namespace support.geom
 * @class SimpleVector2d
 * @constructor
 * @param {Number} x
 * @param {Number} y
 */
support.geom.SimpleVector2d = function SimpleVector2d(x, y) {
    support.geom.Point2d.call(this, x, y);
};

Utils.inherits(support.geom.SimpleVector2d, support.geom.Point2d);

/**
 * Zwraca dlugosc wektora
 *
 * @method getVectorLength
 * @return {Number} length
 */
support.geom.SimpleVector2d.prototype.getVectorLength = function getVectorLength() {
    return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
};

/**
 * Zwraca znormalizowany wektor
 *
 * @method getNormalizedVector
 * @return {support.geom.SimpleVector2d}
 */
support.geom.SimpleVector2d.prototype.getNormalizedVector = function getNormalizedVector() {
    var length = this.getVectorLength(),
        x1 = this.getX() / length,
        y1 = this.getY() / length;

    return new support.geom.SimpleVector2d(x1, y1);
};