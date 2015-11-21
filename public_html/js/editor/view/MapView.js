/**
 * Created by adambartkowiak on 28/10/15.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class MapView
 * @constructor
 * @param {app.model.MapModel} mapModel
 * @param {editor.assets.AssetListModel} assetListModel
 * @param {number} width
 * @param {number} height
 */
editor.view.MapView = function MapView(mapModel, cameraModel, assetListModel, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, 0, 0, width, height);

    /**
     * @property {app.model.MapModel} mapModel
     * @private
     */
    this._mapModel = mapModel;

    /**
     * @property {app.model.CameraModel} cameraModel
     * @private
     */
    this._cameraModel = cameraModel;

    /**
     * @property {editor.assets.AssetListModel} selectedAssetUrl
     * @private
     */
    this._assetListModel = assetListModel;

    this._previewX = 0;
    this._previewY = 0;

    //init getGraphicTilesArray
    var tileCount = (mapModel.getMapGraphicModel().getMapWidth()/mapModel.getMapGraphicModel().getTileWidth()) * (mapModel.getMapGraphicModel().getMapHeight()/mapModel.getMapGraphicModel().getTileHeight());
    for (var i = 0; i< tileCount; i++){
        this._mapModel.getMapGraphicModel().getTileArray().push([["grass", "grass", "grass", "grass"]]);

    }

    //init getCollisionTileArray
    var tileCount = (mapModel.getMapCollisionModel().getMapWidth()/mapModel.getMapCollisionModel().getTileWidth()) * (mapModel.getMapCollisionModel().getMapHeight()/mapModel.getMapCollisionModel().getTileHeight());
    for (var i = 0; i< tileCount; i++){
        this._mapModel.getMapCollisionModel().getTileArray().push([{allowGroundUnits: "true"}]);
    }

    //init logicTIlesArray
    //var tileCount = (mapModel.getMapWidth()/mapModel.getTileWidth()) * (mapModel.getMapHeight()/mapModel.getTileHeight());
    //for (var i = 0; i< tileCount; i++){
    //    this._mapModel.getLogicTilesArray().push([{gid: "assets/editor/gcc02.png", x:0, y:0}]);
    //}

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
        tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(this._mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(this._mapModel.getMapHeight() / tileGraphicHeight),

        tileCollisionWidth = this._mapModel.getMapCollisionModel().getTileWidth(),
        tileCollisionHeight = this._mapModel.getMapCollisionModel().getTileHeight(),
        maxTileCollisionIndexX = Math.ceil(this._mapModel.getMapWidth() / tileCollisionWidth),
        maxTileCollisionIndexY = Math.ceil(this._mapModel.getMapHeight() / tileCollisionHeight),

        drawX,
        drawY,
        tileGraphicId,
        tileGraphicX,
        tileGraphicY,

        tileCollisionId,

        tileGraphicsData,
        tileImage,
        layer,
        maxLayer = 2;

    //MAP IMAGES
    for (layer = 0; layer < maxLayer; layer++){
        for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
            for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {

                drawX = tileIndexX * tileGraphicWidth;
                drawY = tileIndexY * tileGraphicHeight;
                tileGraphicId = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphicId[layer]) {
                    tileGraphicX = 0;
                    tileGraphicY = 0;
                    tileGraphicsData = tileGraphicId[layer];

                    tileImage = null;

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "grass", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gcc02.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "c", "c", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gcc01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "c", "grass", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gbc01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "grass", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gbl01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "c", "grass", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gbl02.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "grass", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gbr01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "c", "c", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gbr02.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "grass", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gcl01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "c", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gcr01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "c", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gtc01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "grass", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gtl01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "c", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gtl02.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "c", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gtr01.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "c", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gtr02.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "grass", "c"]) ){
                        tileImage = this._tileImage["assets/editor/gcc1.png"];
                    }

                    if ( this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "c", "grass"]) ){
                        tileImage = this._tileImage["assets/editor/gcc2.png"];
                    }




                    if (tileImage) {

                        if (drawX - this._cameraModel.getViewPortX() > -20 && drawY - this._cameraModel.getViewPortY() > -20 &&
                            drawX - this._cameraModel.getViewPortX() < this.getWidth() && drawY - this._cameraModel.getViewPortY() < this.getHeight()){
                            canvasContext.drawImage(tileImage, drawX - this._cameraModel.getViewPortX(), drawY - this._cameraModel.getViewPortY());
                        }

                    }

                    //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
                    //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

                    canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
                }
            }
        }
    }


    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(0,255,0,0.1)';

    //COLLISION MESH
    //for (layer = 0; layer < maxLayer; layer++){
    //    for (tileIndexX = 0; tileIndexX < maxTileCollisionIndexX; tileIndexX++) {
    //        for (tileIndexY = 0; tileIndexY < maxTileCollisionIndexY; tileIndexY++) {
    //
    //            drawX = tileIndexX * tileCollisionWidth;
    //            drawY = tileIndexY * tileCollisionHeight;
    //            tileCollisionId = mapModel.getMapCollisionModel().getTileArray()[maxTileCollisionIndexY * tileIndexX + tileIndexY];
    //
    //            if (tileCollisionId[layer]) {
    //                canvasContext.rect(drawX, drawY, tileCollisionWidth, tileCollisionHeight);
    //            }
    //        }
    //    }
    //}

    canvasContext.lineWidth = 1;
    canvasContext.stroke();





    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,255,0.2)';

    //GRAPHIC MESH
    //for (layer = 0; layer < maxLayer; layer++){
    //    for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
    //        for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
    //
    //            drawX = tileIndexX * tileGraphicWidth;
    //            drawY = tileIndexY * tileGraphicHeight;
    //            tileGraphicId = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];
    //
    //            if (tileGraphicId[layer]) {
    //                canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
    //            }
    //        }
    //    }
    //}

    canvasContext.lineWidth = 1;
    canvasContext.stroke();



    if (this._assetListModel.getSelectedAssetUrl()){

        drawX = this._previewX - this._previewX%tileGraphicWidth;
        drawY = this._previewY - this._previewY%tileGraphicHeight;

        tileGraphicX = this._assetListModel.getSelectedAssetDrawX();
        tileGraphicY = this._assetListModel.getSelectedAssetDrawY();

        tileImage = this._tileImage[this._assetListModel.getSelectedAssetUrl()];

        canvasContext.globalAlpha = 0.6;
        canvasContext.drawImage(tileImage, drawX - tileGraphicX, drawY - tileGraphicY);
        canvasContext.globalAlpha = 1;

        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,0,0.8)';
        canvasContext.rect(drawX - tileGraphicX, drawY - tileGraphicY, 40, 40);
        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }

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


editor.view.MapView.prototype.checkGraphicTileData = function checkGraphicTileData(table1, table2){

    if (table1[0] === table2[0] && table1[1] === table2[1] && table1[2] === table2[2] && table1[3] === table2[3]){
        return true;
    }
    return false;
};