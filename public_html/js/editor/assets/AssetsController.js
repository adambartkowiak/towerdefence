/**
 * Created by adambartkowiak on 27/10/15.
 */

'use strict';

var editor = editor || {};
editor.assets = editor.assets || {};

var Utils = Utils || {};

/**
 * @namespace editor.assets
 * @class AssetsController
 * @constructor
 */
editor.assets.AssetsController = function AssetsController() {

    /**
     * @property {string} selectedAssetUrl
     * @private
     */
    this._selectedAssetUrl = null;

    editor.assets.AssetsController.prototype.init.call(this);

};

Utils.inherits(editor.assets.AssetsController, Object);

/**
 * @method init
 * @public
 */
editor.assets.AssetsController.prototype.init = function init(){

    var assetsElement = document.getElementsByClassName("assetElement");
    var assetsElementLength = assetsElement.length;
    var index;

    for (index = 0; index < assetsElementLength; index++){

        assetsElement[index].addEventListener("click", function(){
            console.log(this.getAttribute("assetName"));
        });

    }

};


/**
 * @method setSelectedAssetUrl
 * @public
 * @param {string} url
 */
editor.assets.AssetsController.prototype.setSelectedAssetUrl = function setSelectedAssetPath(url){
    this._selectedAssetUrl = url;
};

/**
 * @method getSelectedAssetUrl
 * @public
 * @return {string} url
 */
editor.assets.AssetsController.prototype.getSelectedAssetUrl = function getSelectedAssetUrl(){
    return this._selectedAssetUrl;
};