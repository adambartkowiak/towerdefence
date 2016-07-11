/**
 * Created by adambartkowiak on 28/08/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class CameraModel
 * @constructor
 * @param {Number} positionX
 * @param {Number} positionY
 * @param {Number} viewPortWidth
 * @param {Number} viewPortHeight
 *
 */
app.model.CameraModel = function CameraModel(positionX, positionY, viewPortWidth, viewPortHeight) {

    /**
     * @property {number} _positionX
     * @private
     */
    this._positionX = positionX;

    /**
     * @property {number} _positionY
     * @private
     */
    this._positionY = positionY;

    /**
     * @property {number} _viewPortWidth
     * @private
     */
    this._viewPortWidth = viewPortWidth;

    /**
     * @property {number} _viewPortHeight
     * @private
     */
    this._viewPortHeight = viewPortHeight;

    /**
     * @property {number} _scale
     * @private
     */
    this._scale = 1;

};

Utils.inherits(app.model.CameraModel, Object);


/**
 * @method setPositionX
 * @param {Number} value
 */
app.model.CameraModel.prototype.setPositionX = function setPositionX(value) {
    this._positionX = value;
};

/**
 * @method setPositionY
 * @param {Number} value
 */
app.model.CameraModel.prototype.setPositionY = function setPositionY(value) {
    this._positionY = value;
};

/**
 * @method setViewPortWidth
 * @param {Number} value
 */
app.model.CameraModel.prototype.setViewPortWidth = function setViewPortWidth(value) {
    this._viewPortWidth = value;
};

/**
 * @method setViewPortHeight
 * @param {Number} value
 */
app.model.CameraModel.prototype.setViewPortHeight = function setViewPortHeight(value) {
    this._viewPortHeight = value;
};

/**
 * @method setScale
 * @param {Number} value
 */
app.model.CameraModel.prototype.setScale = function setScale(value) {
    this._scale = value;
};



/**
 * @method getPositionX
 * @return {Number}
 */
app.model.CameraModel.prototype.getPositionX = function getPositionX() {
    return this._positionX;
};

/**
 * @method getPositionY
 * @return {Number}
 */
app.model.CameraModel.prototype.getPositionY = function getPositionY() {
    return this._positionY;
};

/**
 * @method getViewPortWidth
 * @return {Number}
 */
app.model.CameraModel.prototype.getViewPortWidth = function getViewPortWidth() {
    return this._viewPortWidth;
};

/**
 * @method getViewPortHeight
 * @return {Number}
 */
app.model.CameraModel.prototype.getViewPortHeight = function getViewPortHeight() {
    return this._viewPortHeight;
};

/**
 * @method getViewPortX
 * @return {Number}
 */
app.model.CameraModel.prototype.getViewPortX = function getViewPortX() {
    return this._positionX - this._viewPortWidth * 0.5;
};

/**
 * @method getViewPortY
 * @return {Number}
 */
app.model.CameraModel.prototype.getViewPortY = function getViewPortY() {
    return this._positionY - this._viewPortHeight * 0.5;
};

/**
 * @method getScale
 * @return {Number} value
 */
app.model.CameraModel.prototype.getScale = function getScale() {
    return this._scale;
};





/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.CameraModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    this._positionX = JSON._positionX;
    this._positionY = JSON._positionY;
    this._viewPortWidth = JSON._viewPortWidth;
    this._viewPortHeight = JSON._viewPortHeight;
    this._scale = JSON._scale;

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.CameraModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._positionX,
        2: this._positionY,
        3: this._viewPortWidth,
        4: this._viewPortHeight,
        5: this._scale
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.CameraModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _positionX: minifyJSON["1"],
        _positionY: minifyJSON["2"],
        _viewPortWidth: minifyJSON["3"],
        _viewPortHeight: minifyJSON["4"],
        _scale: minifyJSON["5"]
    };

    return result;
};