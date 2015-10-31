/**
 * Created by adambartkowiak on 30/10/15.
 */

'use strict';

Utils.namespace(["editor", "assets"]);

/**
 * @namespace editor.assets
 * @class AssetListModel
 * @constructor
 */
editor.assets.AssetListModel = function AssetListModel() {

    /**
     * @property {string} selectedAssetUrl
     * @private
     */
    this._selectedAssetUrl = null;

    /**
     * @property {number} selectedAssetLayer
     * @private
     */
    this._selectedAssetLayer = 0;

    /**
     * @property {number} selectedAssetDrawX
     * @private
     */
    this._selectedAssetDrawX = 0;

    /**
     * @property {number} selectedAssetDrawY
     * @private
     */
    this._selectedAssetDrawY = 0;

};

Utils.inherits(editor.assets.AssetListModel, Object);

/**
 * @method setSelectedAssetUrl
 * @public
 * @param {string} url
 */
editor.assets.AssetListModel.prototype.setSelectedAssetUrl = function setSelectedAssetPath(url){
    this._selectedAssetUrl = url;
};

/**
 * @method getSelectedAssetUrl
 * @public
 * @return {string} selectedAssetUrl
 */
editor.assets.AssetListModel.prototype.getSelectedAssetUrl = function getSelectedAssetUrl(){
    return this._selectedAssetUrl;
};

/**
 * @method setSelectedAssetLayer
 * @public
 * @param {number} layer
 */
editor.assets.AssetListModel.prototype.setSelectedAssetLayer = function setSelectedAssetLayer(layer){
    this._selectedAssetLayer = layer;
};

/**
 * @method getSelectedAssetLayer
 * @public
 * @return {number} selectedAssetLayer
 */
editor.assets.AssetListModel.prototype.getSelectedAssetLayer = function getSelectedAssetLayer(){
    return this._selectedAssetLayer;
};

/**
 * @method setSelectedAssetDrawX
 * @public
 * @param {number} x
 */
editor.assets.AssetListModel.prototype.setSelectedAssetDrawX = function setSelectedAssetDrawX(x){
    this._selectedAssetDrawX = x;
};

/**
 * @method getSelectedAssetDrawX
 * @public
 * @return {number} selectedAssetDrawX
 */
editor.assets.AssetListModel.prototype.getSelectedAssetDrawX = function getSelectedAssetDrawX(){
    return this._selectedAssetDrawX;
};

/**
 * @method setSelectedAssetDrawY
 * @public
 * @param {number} y
 */
editor.assets.AssetListModel.prototype.setSelectedAssetDrawY = function setSelectedAssetDrawY(y){
    this._selectedAssetDrawY = y;
};

/**
 * @method getSelectedAssetDrawY
 * @public
 * @return {number} selectedAssetDrawY
 */
editor.assets.AssetListModel.prototype.getSelectedAssetDrawY = function getSelectedAssetDrawY(){
    return this._selectedAssetDrawY;
};