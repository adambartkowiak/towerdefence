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