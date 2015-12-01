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
     * @property {number} _graphicOffsetX
     * @private
     */
    this._graphicOffsetX = 0;

    /**
     * @property {number} _graphicOffsetY
     * @private
     */
    this._graphicOffsetY = 0;

    /**
     * @property {number} _graphicWidth
     * @private
     */
    this._graphicWidth = 0;

    /**
     * @property {number} _graphicHeight
     * @private
     */
    this._graphicHeight = 0;

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
     * @property {number} _graphicPatternWidth
     * @private
     */
    this._graphicPatternWidth = 0;

    /**
     * @property {number} _graphicPatternHeight
     * @private
     */
    this._graphicPatternHeight = 0;

    /**
     * @property {string} _graphicPatternArray
     * @private
     */
    this._graphicPatternArray = null;

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
 * @method setGraphicOffsetX
 * @public
 * @param {number} graphicOffsetX
 */
editor.model.MapTileModel.prototype.setGraphicOffsetX = function setGraphicOffsetX(graphicOffsetX){
    this._graphicOffsetX = graphicOffsetX;
};

/**
 * @method getGraphicOffsetX
 * @public
 * @return {number} _graphicOffsetX
 */
editor.model.MapTileModel.prototype.getGraphicOffsetX = function getGraphicOffsetX(){
    return this._graphicOffsetX;
};

/**
 * @method setGraphicOffsetY
 * @public
 * @param {number} graphicOffsetY
 */
editor.model.MapTileModel.prototype.setGraphicOffsetY = function setGraphicOffsetY(graphicOffsetY){
    this._graphicOffsetY = graphicOffsetY;
};

/**
 * @method getGraphicOffsetY
 * @public
 * @return {number} _graphicOffsetY
 */
editor.model.MapTileModel.prototype.getGraphicOffsetY = function getGraphicOffsetY(){
    return this._graphicOffsetY;
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

//@TODO:
//mapTileModel.setGraphicWidth(assetsElement[index].dataset["graphicwidth"]);
//mapTileModel.setGraphicHeight(assetsElement[index].dataset["graphicheight"]);
//mapTileModel.setGraphicPatternX(assetsElement[index].dataset["graphicpatternx"]);
//mapTileModel.setGraphicPatternY(assetsElement[index].dataset["graphicpatterny"]);
//mapTileModel.setGraphicPatternWidth(assetsElement[index].dataset["graphicpatternwidth"]);
//mapTileModel.setGraphicPatternHeight(assetsElement[index].dataset["graphicpatternheight"]);