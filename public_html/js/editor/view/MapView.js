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
 * @param {number} width
 * @param {number} height
 */
editor.view.MapView = function MapView(mapModel, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, 0, 0, width, height);

    this._mapModel = mapModel;


    //init mapModel
    var tileCount = (mapModel.getMapWidth()/mapModel.getTileWidth()) * (mapModel.getMapHeight()/mapModel.getTileHeight());
    for (var i = 0; i< tileCount; i++){
        this._mapModel.getGraphicTilesArray().push({gid: "assets/editor/gbc01.png"});
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
        graphic;

    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,255,0.3)';

    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {

            drawX = tileIndexX * tileWidth;
            drawY = tileIndexY * tileHeight;
            tileGraphicId = mapModel.getGraphicTilesArray()[maxTileIndexY * tileIndexX + tileIndexY];

            canvasContext.drawImage(this._tileImage[tileGraphicId.gid], drawX, drawY);

            //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
            //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

            //canvasContext.rect(drawX, drawY, tileWidth, tileHeight);
        }
    }


    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {

            drawX = tileIndexX * tileWidth;
            drawY = tileIndexY * tileHeight;
            tileGraphicId = mapModel.getGraphicTilesArray()[maxTileIndexY * tileIndexX + tileIndexY];


            if (tileGraphicId.gid === "assets/editor/wbl04.png"){
                canvasContext.drawImage(this._tileImage[tileGraphicId.gid], drawX, drawY);
            }


            //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
            //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

            canvasContext.rect(drawX, drawY, tileWidth, tileHeight);
        }
    }

    canvasContext.lineWidth = 1;
    canvasContext.stroke();
};


///**
// * Metoda sluzaca do obslugi Eventu.
// *
// * @method onMouseEvent
// * @public
// * @param {support.MouseEvent} mouseEvent
// * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
// */
//editor.view.MapView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){
//
//    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
//
//    return result;
//
//};