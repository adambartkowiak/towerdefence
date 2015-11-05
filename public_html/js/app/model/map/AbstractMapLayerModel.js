/**
 * Created by adambartkowiak on 1/11/15.
 */

'use strict';
var ns = Utils.namespace("app.model.map"); 

/**
 * @namespace app.model.map
 * @class AbstractMapLayerModel
 * @constructor
 * @param {Number} mapWidth
 * @param {Number} mapHeight
 * @param {Number} tileWidth
 * @param {Number} tileHeight
 *
 */
ns.AbstractMapLayerModel = function AbstractMapLayerModel(mapWidth, mapHeight, tileWidth, tileHeight) {

    /**
     * @property {number} _mapWidth
     * @private
     */
    this._mapWidth = mapWidth;

    /**
     * @property {number} _mapHeight
     * @private
     */
    this._mapHeight = mapHeight;

    /**
     * @property {number} _tileWidth
     * @private
     */
    this._tileWidth = tileWidth;

    /**
     * @property {number} _tileHeight
     * @private
     */
    this._tileHeight = tileHeight;

    /**
     * @property {Array} _tileArray
     * @private
     */
    this._tileArray = [];
};

Utils.inherits(ns.AbstractMapLayerModel, Object);

/**
 * @method getMapWidth
 * @return {Number}
 */
ns.AbstractMapLayerModel.prototype.getMapWidth = function getMapWidth() {
    return this._mapWidth;
};

/**
 * @method setMapWidth
 * @param {Number} value
 */
ns.AbstractMapLayerModel.prototype.setMapWidth = function setMapWidth(value) {
    this._mapWidth = value;
};

/**
 * @method getMapHeight
 * @return {Number}
 */
ns.AbstractMapLayerModel.prototype.getMapHeight = function getMapHeight() {
    return this._mapHeight;
};

/**
 * @method setMapHeight
 * @param {Number} value
 */
ns.AbstractMapLayerModel.prototype.setMapHeight = function setMapHeight(value) {
    this._mapHeight = value;
};

/**
 * @method getTileWidth
 * @return {Number}
 */
ns.AbstractMapLayerModel.prototype.getTileWidth = function getTileWidth() {
    return this._tileWidth;
};

/**
 * @method setTileWidth
 * @param {Number} value
 */
ns.AbstractMapLayerModel.prototype.setTileWidth = function setTileWidth(value) {
    this._tileWidth = value;
};

/**
 * @method getTileHeight
 * @return {Number}
 */
ns.AbstractMapLayerModel.prototype.getTileHeight = function getTileHeight() {
    return this._tileHeight;
};

/**
 * @method setTileHeight
 * @param {Number} value
 */
ns.AbstractMapLayerModel.prototype.setTileHeight = function setTileHeight(value) {
    this._tileHeight = value;
};

/**
 * @method getTileArray
 * @return {Array}
 */
ns.AbstractMapLayerModel.prototype.getTileArray = function getTileArray() {
    return this._tileArray;
};

/**
 * @method setTileArray
 * @param {Array} tileArray
 */
ns.AbstractMapLayerModel.prototype.setTileArray = function setTileArray(tileArray) {
    this._tileArray = tileArray;
};

/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

/**
 * @method loadFromJSON
 * @param {Object} unMinifyJSON
 */
ns.AbstractMapLayerModel.prototype.loadFromJSON = function loadFromJSON(unMinifyJSON) {

    this._mapWidth = unMinifyJSON._mapWidth;
    this._mapHeight = unMinifyJSON._mapHeight;
    this._tileWidth = unMinifyJSON._tileWidth;
    this._tileHeight = unMinifyJSON._tileHeight;
    this._tileArray = unMinifyJSON._tileArray;
};

/**
 * @method loadFromMinifyJSON
 * @param {Object} minifyJSON
 */
ns.AbstractMapLayerModel.prototype.loadFromMinifyJSON = function loadFromMinifyJSON(minifyJSON) {

    var unMinifyJSON = this.unMinifyJSON(minifyJSON);
    this.loadFromJSON(unMinifyJSON);
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
ns.AbstractMapLayerModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._mapWidth,
        2: this._mapHeight,
        3: this._tileWidth,
        4: this._tileHeight,
        5: this._tileArray
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
ns.AbstractMapLayerModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _mapWidth: minifyJSON["1"],
        _mapHeight: minifyJSON["2"],
        _tileWidth: minifyJSON["3"],
        _tileHeight: minifyJSON["4"],
        _tileArray: minifyJSON["5"],
    };

    return result;
};

