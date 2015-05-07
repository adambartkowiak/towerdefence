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
support.geom.SimpleVector2d = function SimpleVector2d(x, y) {
    support.geom.Point2d.call(this, x, y);
};

/**
 * @inheritance
 */
Utils.inherits(support.geom.SimpleVector2d, support.geom.Point2d);

/**
 * Zwraca dlugosc wektora
 * 
 * @methodName getVectorLength
 * @return {Number} length
 */
support.geom.SimpleVector2d.prototype.getVectorLength = function getVectorLength() {
    return Math.sqrt(Math.pow(this.getX(), 2) + Math.pow(this.getY(), 2));
};

/**
 * Zwraca znormalizowany wektor
 * 
 * @methodName getNormalizedVector
 * @returns {undefined}
 */
support.geom.SimpleVector2d.prototype.getNormalizedVector = function getNormalizedVector() {
    var length = this.getVectorLength(),
        x1 = this.getX()/length,
        y1 = this.getY()/length;
    
    return new support.geom.SimpleVector2d(x1, y1);
};