/**
 * Created by adambartkowiak on 29/11/15.
 */

'use strict';
Utils.namespace("editor.model");

/**
 * @namespace editor.model
 * @class MapTileModel
 * @constructor
 *
 */
editor.model.MapTileModel = function MapTileModel() {

    /**
     * @property {string} _graphicSource
     * @private
     */
    this._graphicSource = null;

    /**
     * @property {number} _graphicPatternX
     * @private
     */
    this._graphicPatternX = 0;

    /**
     * @property {number} _graphicPatternY
     * @private
     */
    this._graphicPatternY = 0;

    /**
     * @property {number} _graphicWidthInTile
     * @private
     */
    this._graphicWidthInTile = 0;

    /**
     * @property {number} _graphicHeightInTile
     * @private
     */
    this._graphicHeightInTile = 0;


    /**
     * @property {string} _graphicPatternArray
     * @private
     */
    this._graphicPatternArray = null;

    /**
     * @property {string} _collisionArray
     * @private
     */
    this._collisionArray = null;

};

Utils.inherits(editor.model.MapTileModel, Object);

/**
 * @method setGraphicSource
 * @public
 * @param {string} graphicSource
 */
editor.model.MapTileModel.prototype.setGraphicSource = function setGraphicSource(graphicSource){
    this._graphicSource = graphicSource;
};

/**
 * @method getGraphicSource
 * @public
 * @return {string} graphicSource
 */
editor.model.MapTileModel.prototype.getGraphicSource = function getGraphicSource(){
    return this._graphicSource;
};

/**
 * @method setGraphicPatternY
 * @public
 * @param {number} graphicPatternY
 */
editor.model.MapTileModel.prototype.setGraphicPatternY = function setGraphicPatternY(graphicPatternY){
    this._graphicPatternY = graphicPatternY;
};

/**
 * @method getGraphicPatternY
 * @public
 * @return {number} _graphicPatternY
 */
editor.model.MapTileModel.prototype.getGraphicPatternY = function getGraphicPatternY(){
    return this._graphicPatternY;
};

/**
 * @method setGraphicPatternX
 * @public
 * @param {number} graphicPatternX
 */
editor.model.MapTileModel.prototype.setGraphicPatternX = function setGraphicPatternX(graphicPatternX){
    this._graphicPatternX = graphicPatternX;
};

/**
 * @method getGraphicPatternX
 * @public
 * @return {number} _graphicPatternX
 */
editor.model.MapTileModel.prototype.getGraphicPatternX = function getGraphicPatternX(){
    return this._graphicPatternX;
};

/**
 * @method setGraphicWidthInTile
 * @public
 * @param {number} _graphicWidthInTile
 */
editor.model.MapTileModel.prototype.setGraphicWidthInTile = function setGraphicWidthInTile(graphicWidthInTile){
    this._graphicWidthInTile = graphicWidthInTile;
};

/**
 * @method getGraphicWidthInTile
 * @public
 * @return {number} graphicWidthInTile
 */
editor.model.MapTileModel.prototype.getGraphicWidthInTile = function getGraphicWidthInTile(){
    return this._graphicWidthInTile;
};

/**
 * @method setGraphicHeightInTile
 * @public
 * @param {number} _graphicHeightInTile
 */
editor.model.MapTileModel.prototype.setGraphicHeightInTile = function setGraphicHeightInTile(graphicHeightInTile){
    this._graphicHeightInTile = graphicHeightInTile;
};

/**
 * @method getGraphicHeightInTile
 * @public
 * @return {number} graphicHeightInTile
 */
editor.model.MapTileModel.prototype.getGraphicHeightInTile = function getGraphicHeightInTile(){
    return this._graphicHeightInTile;
};

/**
 * @method setGraphicPatternArray
 * @public
 * @param {string} graphicPatternArray
 */
editor.model.MapTileModel.prototype.setGraphicPatternArray = function setGraphicPatternArray(graphicPatternArray){
    this._graphicPatternArray = graphicPatternArray;
};

/**
 * @method getGraphicPatternArray
 * @public
 * @return {string} graphicPatternArray
 */
editor.model.MapTileModel.prototype.getGraphicPatternArray = function getGraphicPatternArray(){
    return this._graphicPatternArray;
};

/**
 * @method setCollisionArray
 * @public
 * @param {string} collisionArray
 */
editor.model.MapTileModel.prototype.setCollisionArray = function setCollisionArray(collisionArray){
    this._collisionArray = collisionArray;
};

/**
 * @method getCollisionArray
 * @public
 * @return {string} collisionArray
 */
editor.model.MapTileModel.prototype.getCollisionArray = function getCollisionArray(){
    return this._collisionArray;
};

//@TODO:
//mapTileModel.setGraphicWidth(assetsElement[index].dataset["graphicwidth"]);
//mapTileModel.setGraphicHeight(assetsElement[index].dataset["graphicheight"]);4
//mapTileModel.setGraphicPatternWidth(assetsElement[index].dataset["graphicpatternwidth"]);
//mapTileModel.setGraphicPatternHeight(assetsElement[index].dataset["graphicpatternheight"]);