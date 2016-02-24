/**
 * Created by adambartkowiak on 19/08/15.
 */

'use strict';
Utils.namespace("app.model");

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
     * @property {app.model.map.MapGraphicLayerModel} _mapGraphicModel
     * @private
     */
    this._mapGraphicLayerModel = new app.model.map.MapGraphicLayerModel(mapWidth, mapHeight, tileWidth, tileHeight);

    /**
     * @property {app.model.map.MapCollisionLayerModel} _mapCollisionModel
     * @private
     */
    this._mapCollisionLayerModel = new app.model.map.MapCollisionLayerModel(mapWidth, mapHeight, tileWidth, tileHeight);
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
 * @method getMapGraphicModel
 * return {app.model.map.MapGraphicModel} mapGraphicModel
 */
app.model.MapModel.prototype.getMapGraphicModel = function getMapGraphicModel() {
    return this._mapGraphicLayerModel;
};

/**
 * @method getMapCollisionModel
 * return {app.model.map.MapCollisionModel} mapCollisionModel
 */
app.model.MapModel.prototype.getMapCollisionModel = function getMapCollisionModel() {
    return this._mapCollisionLayerModel;
};

/**
 * @method setMapGraphicModel
 * return {app.model.map.MapGraphicModel} mapGraphicModel
 */
app.model.MapModel.prototype.setMapGraphicModel = function setMapGraphicModel(mapGraphicModel) {
    this._mapGraphicLayerModel = mapGraphicModel;
};

/**
 * @method setMapCollisionModel
 * return {app.model.map.MapCollisionModel} mapCollisionModel
 */
app.model.MapModel.prototype.setMapCollisionModel = function setMapCollisionModel(mapCollisionModel) {
    this._mapCollisionLayerModel = mapCollisionModel;
};

/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

/**
 * @method loadFromJSON
 * @param {Object} unMinifyJSON
 */
app.model.MapModel.prototype.loadFromJSON = function loadFromJSON(unMinifyJSON) {

    this._mapWidth = unMinifyJSON._mapWidth;
    this._mapHeight = unMinifyJSON._mapHeight;
    this._mapGraphicLayerModel.loadFromJSON(unMinifyJSON._mapGraphicLayerModel);
    //this._mapCollisionLayerModel.loadFromJSON(unMinifyJSON._mapCollisionLayerModel);
};

/**
 * @method loadFromMinifyJSON
 * @param {Object} minifyJSON
 */
app.model.MapModel.prototype.loadFromMinifyJSON = function loadFromMinifyJSON(minifyJSON) {

    var unMinifyJSON = this.unMinifyJSON(minifyJSON);
    this.loadFromJSON(unMinifyJSON);
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.MapModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._mapWidth,
        2: this._mapHeight,
        3: this._mapGraphicLayerModel.getMinifyJSON(),
        4: this._mapCollisionLayerModel.getMinifyJSON()
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.MapModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var mapGraphicLayerModel = new app.model.map.MapGraphicLayerModel(2000,2000,40,40),
        mapCollisionLayerModel = new app.model.map.MapCollisionLayerModel(2000,2000,40,40);

    var result = {
        _mapWidth: minifyJSON["1"],
        _mapHeight: minifyJSON["2"],
        _mapGraphicLayerModel: mapGraphicLayerModel.unMinifyJSON(minifyJSON["3"])
        //_mapCollisionLayerModel: mapCollisionLayerModel.unMinifyJSON(minifyJSON["4"])
    };

    return result;
};