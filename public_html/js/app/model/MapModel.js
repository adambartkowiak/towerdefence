/**
 * Created by adambartkowiak on 19/08/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class MapModel
 * @constructor
 * @param {Number} mapWidth
 * @param {Number} mapHeight
 * @param {Number} tileWidth
 * @param {Number} tileHeight
 *
 */
app.model.MapModel = function MapModel(mapWidth, mapHeight, tileWidth, tileHeight) {

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

};

Utils.inherits(app.model.MapModel, Object);


/**
 * @method setMapWidth
 * @param {Number} value
 */
app.model.MapModel.prototype.setMapWidth = function setMapWidth(value) {
    this._mapWidth = value;
};

/**
 * @method setMapHeight
 * @param {Number} value
 */
app.model.MapModel.prototype.setMapHeight = function setMapHeight(value) {
    this._mapHeight = value;
};

/**
 * @method setTileWidth
 * @param {Number} value
 */
app.model.MapModel.prototype.setTileWidth = function setTileWidth(value) {
    this._tileWidth = value;
};

/**
 * @method setTileHeight
 * @param {Number} value
 */
app.model.MapModel.prototype.setTileHeight = function setTileHeight(value) {
    this._tileHeight = value;
};

/**
 * @method getMapWidth
 * @return {Number}
 */
app.model.MapModel.prototype.getMapWidth = function getMapWidth() {
    return this._mapWidth;
};

/**
 * @method getMapHeight
 * @return {Number}
 */
app.model.MapModel.prototype.getMapHeight = function getMapHeight() {
    return this._mapHeight;
};

/**
 * @method getTileWidth
 * @return {Number}
 */
app.model.MapModel.prototype.getTileWidth = function getTileWidth() {
    return this._tileWidth;
};

/**
 * @method getTileHeight
 * @return {Number}
 */
app.model.MapModel.prototype.getTileHeight = function getTileHeight() {
    return this._tileHeight;
};

/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

///**
// * @method loadFromJSON
// * @property {Object} unMinifyJSON
// */
//app.model.MapModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
//    this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
//    this._actionType = JSON._actionType;
//    this._entityId = JSON._entityId;
//};
//
///**
// * @method getMinifyJSON
// * @returns {Object} minifyJSON
// */
//app.model.MapModel.prototype.getMinifyJSON = function getMinifyJSON() {
//    var result = {
//        1: this._circle.getMinifyJSON(),
//        2: this._actionType,
//        3: this._entityId
//    }
//
//    return result;
//};
//
///**
// * @method unMinifyJSON
// * @property {Object} minifyJSON
// * @return {Object} unMinifyJSON
// */
//app.model.MapModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {
//
//    var circle = new support.geom.Circle(0, 0, 0);
//
//    var result = {
//        _circle: circle.unMinifyJSON(minifyJSON["1"]),
//        _actionType: minifyJSON["2"],
//        _entityId: minifyJSON["3"]
//    };
//
//    return result;
//};