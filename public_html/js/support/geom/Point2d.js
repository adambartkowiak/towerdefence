/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';

var support = support || {};
support.geom = support.geom || {};

var Utils = Utils || {};

/**
 * @namespace support.geom
 * @class Point2d
 * @constructor
 * @param {Number} x
 * @param {Number} y
 */
support.geom.Point2d = function Point2d(x, y) {

    /**
     * @property {Number} _x
     * @private
     */
    this._x = x;

    /**
     * @property {Number} _y
     * @private
     */
    this._y = y;

};

Utils.inherits(support.geom.Point2d, Object);

/**
 * @method getX
 * @return {Number} _x
 */
support.geom.Point2d.prototype.getX = function getX() {
    return this._x;
};

/**
 * @method getY
 * @return {Number} _x
 */
support.geom.Point2d.prototype.getY = function getY() {
    return this._y;
};

/**
 * @method setX
 * @param {Number} value
 */
support.geom.Point2d.prototype.setX = function setX(value) {
    this._x = value;
};

/**
 * @method setY
 * @param {Number} value
 */
support.geom.Point2d.prototype.setY = function setY(value) {
    this._y = value;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
support.geom.Point2d.prototype.getMinifyJSON = function getMinifyJSON(){

    var result = {
        1:this._x,
        2:this._y
    };
    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
support.geom.Point2d.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _x: minifyJSON["1"],
        _y: minifyJSON["2"]
    };

    return result;
};