/**
 * Created by adambartkowiak on 28/10/15.
 */

'use strict';

Utils.namespace(["editor", "view"]);

/**
 * @namespace editor.view
 * @class MapView
 * @constructor
 * @param {app.model.MapModel} mapModel
 * @param {editor.assets.AssetListModel} assetListModel
 * @param {number} width
 * @param {number} height
 */
editor.view.MapView = function MapView(mapModel, assetListModel, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, 0, 0, width, height);

    /**
     * @property {app.model.mapModel} mapModel
     * @private
     */
    this._mapModel = mapModel;

    /**
     * @property {editor.assets.AssetListModel} selectedAssetUrl
     * @private
     */
    this._assetListModel = assetListModel;

    this._previewX = 0;
    this._previewY = 0;

    //init mapModel
    var tileCount = (mapModel.getMapWidth()/mapModel.getTileWidth()) * (mapModel.getMapHeight()/mapModel.getTileHeight());
    for (var i = 0; i< tileCount; i++){
        this._mapModel.getGraphicTilesArray().push([{gid: "assets/editor/gcc02.png", x:0, y:0}]);
    }


    //loading Tiles
    this._tileImage = [];
    var assetsElement = document.getElementsByClassName("assetElement");
    var assetsElementLength = assetsElement.length;
    var index;
    var assetName;
    for (index = 0; index < assetsElementLength; index++){

        assetName = assetsElement[index].dataset["assetname"];

        this._tileImage[assetName] = new Image();
        this._tileImage[assetName].src = assetName;

    }

};

Utils.inherits(editor.view.MapView, support.view.AbstractView);

/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
editor.view.MapView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    var tileIndexX,
        tileIndexY,
        tileWidth = this._mapModel.getTileWidth(),
        tileHeight = this._mapModel.getTileHeight(),
        maxTileIndexX = Math.ceil(this._mapModel.getMapWidth() / tileWidth),
        maxTileIndexY = Math.ceil(this._mapModel.getMapHeight() / tileHeight),
        drawX,
        drawY,
        tileGraphicId,
        tileGraphicX,
        tileGraphicY,
        tileImage,
        layer,
        maxLayer = 2;

    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,255,0.3)';

    for (layer = 0; layer < maxLayer; layer++){
        for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
            for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {

                drawX = tileIndexX * tileWidth;
                drawY = tileIndexY * tileHeight;
                tileGraphicId = mapModel.getGraphicTilesArray()[maxTileIndexY * tileIndexX + tileIndexY];

                if (tileGraphicId[layer]) {
                    tileGraphicX = tileGraphicId[layer].x;
                    tileGraphicY = tileGraphicId[layer].y;
                    tileImage = this._tileImage[tileGraphicId[layer].gid];

                    if (tileImage) {
                        canvasContext.drawImage(tileImage, drawX - tileGraphicX, drawY - tileGraphicY);
                    }

                    //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
                    //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

                    //canvasContext.rect(drawX, drawY, tileWidth, tileHeight);
                }
            }
        }
    }

    if (this._assetListModel.getSelectedAssetUrl()){

        drawX = this._previewX - this._previewX%tileWidth;
        drawY = this._previewY - this._previewY%tileHeight;

        tileGraphicX = this._assetListModel.getSelectedAssetDrawX();
        tileGraphicY = this._assetListModel.getSelectedAssetDrawY();

        tileImage = this._tileImage[this._assetListModel.getSelectedAssetUrl()];

        canvasContext.globalAlpha = 0.5;
        canvasContext.drawImage(tileImage, drawX - tileGraphicX, drawY - tileGraphicY);
        canvasContext.globalAlpha = 1;
    }

    canvasContext.lineWidth = 1;
    canvasContext.stroke();
};


/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
editor.view.MapView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);

    if (this._assetListModel.getSelectedAssetUrl()){

        this._previewX = mouseEvent.getLocalX();
        this._previewY = mouseEvent.getLocalY();

    }

    return result;

};