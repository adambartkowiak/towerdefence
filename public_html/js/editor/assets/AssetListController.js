/**
 * Created by adambartkowiak on 27/10/15.
 */

'use strict';

var editor = editor || {};
editor.assets = editor.assets || {};

var Utils = Utils || {};

/**
 * @namespace editor.assets
 * @class AssetListController
 * @constructor
 * @param {editor.assets.AssetListModel} assetListModel
 */
editor.assets.AssetListController = function AssetListController(assetListModel) {

    /**
     * @property {editor.assets.AssetListModel} selectedAssetUrl
     * @private
     */
    this._assetListModel = assetListModel;

    this._init();

};

Utils.inherits(editor.assets.AssetListController, Object);

/**
 * @method init
 * @public
 */
editor.assets.AssetListController.prototype._init = function _init(){

    var assetsElement = document.getElementsByClassName("assetElement");
    var assetsElementLength = assetsElement.length;
    var index;
    var that = this;
    for (index = 0; index < assetsElementLength; index++){

        assetsElement[index].addEventListener("click", function(){
            console.log(this.dataset["assetname"]);
            that._assetListModel.setSelectedAssetUrl(this.dataset["assetname"]);
            that._assetListModel.setSelectedAssetLayer(this.dataset["layer"]);
            that._assetListModel.setSelectedAssetDrawX(this.dataset["drawx"]);
            that._assetListModel.setSelectedAssetDrawY(this.dataset["drawy"]);
        });

    }

};