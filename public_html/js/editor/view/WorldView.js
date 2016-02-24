/**
 * Created by adambartkowiak on 28/10/15.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class WorldView
 * @constructor
 * @param {app.model.WorldModel} worldModel
 * @param {editor.model.EditorMapModel} editorMapModel
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
editor.view.WorldView = function WorldView(worldModel, editorMapModel, x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    app.view.AbstractWorldView.call(this, worldModel, x, y, width, height);

    /**
     * @property {editor.model.EditorMapModel} _editorMapModel
     * @private
     */
    this._editorMapModel = editorMapModel;

    /**
     * @property {number} _mouseCursorX
     * @private
     */
    this._mouseCursorX = 0;

    /**
     * @property {number} _mouseCursorY
     * @private
     */
    this._mouseCursorY = 0;


};

Utils.inherits(editor.view.WorldView, app.view.AbstractWorldView);

/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
editor.view.WorldView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");
    var cameraModel = this._worldModel.getCameraModel();
    var tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth();
    var tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight();
    var maxTileGraphicIndexX = Math.ceil(this._mapModel.getMapWidth() / tileGraphicWidth);
    var maxTileGraphicIndexY = Math.ceil(this._mapModel.getMapHeight() / tileGraphicHeight);
    var tileIndexX;
    var tileIndexY;
    var layer = 0;
    var drawX;
    var drawY;
    var tileGraphic;
    var maxLayer = 2;
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    app.view.AbstractWorldView.prototype.draw.call(this, canvas);


    if (false) {

        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,255,0.1)';
        canvasContext.fillStyle = 'rgba(255,255,255,0.5)';

        for (layer = 0; layer < maxLayer; layer++) {
            for (tileIndexY = startIndexY + 1; tileIndexY < endIndexY - 1; tileIndexY++) {
                for (tileIndexX = starIndexX + 1; tileIndexX < endIndexX - 1; tileIndexX++) {

                    drawX = tileIndexX * tileGraphicWidth;
                    drawY = tileIndexY * tileGraphicHeight;

                    tileGraphic = this._editorMapModel.getEditorMapTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                    if (true && tileGraphic && tileGraphic[layer] && layer === 1) {

                        canvasContext.fillStyle = 'rgba(255,255,255,0.3)';
                        var assetTypeString = "highground_cobblestones";
                        //var assetTypeString = "";
                        //var assetTypeString = "water";

                        //if (tileGraphic[layer]["data"][0] === assetTypeString){
                        //    canvasContext.fillRect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), 20, 20);
                        //}
                        //if (tileGraphic[layer]["data"][1] === assetTypeString){
                        //    canvasContext.fillRect(drawX - cameraModel.getViewPortX() + 20, drawY - cameraModel.getViewPortY(), 20, 20);
                        //}
                        //if (tileGraphic[layer]["data"][2] === assetTypeString){
                        //    canvasContext.fillRect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY() + 20, 20, 20);
                        //}
                        //if (tileGraphic[layer]["data"][3] === assetTypeString){
                        //    canvasContext.fillRect(drawX - cameraModel.getViewPortX() + 20, drawY - cameraModel.getViewPortY() + 20, 20, 20);
                        //}

                        canvasContext.fillStyle = 'rgba(0,255,0,1)';
                        canvasContext.fillText(tileGraphic[layer]["data"][0].substring(0, 3), drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 15);
                        canvasContext.fillText(tileGraphic[layer]["data"][1].substring(0, 3), drawX - cameraModel.getViewPortX() + 25, drawY - cameraModel.getViewPortY() + 15);
                        canvasContext.fillText(tileGraphic[layer]["data"][2].substring(0, 3), drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 35);
                        canvasContext.fillText(tileGraphic[layer]["data"][3].substring(0, 3), drawX - cameraModel.getViewPortX() + 25, drawY - cameraModel.getViewPortY() + 35);

                    }

                    //canvasContext.rect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileGraphicWidth, tileGraphicHeight);

                }
            }
        }

        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }


    this._drawSelectedGraphicTile(canvasContext);

};

/**
 * @method _drawSelectedGraphicTile
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.CameraModel} cameraModel
 */
editor.view.WorldView.prototype._drawSelectedGraphicTile = function _drawSelectedGraphicTile(canvasContext) {

    var tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        drawX,
        drawY;

    //Draw Editor Rect
    drawX = this._mouseCursorX - ((this._mouseCursorX + this._cameraModel.getViewPortX() % tileGraphicWidth) % tileGraphicWidth);
    drawY = this._mouseCursorY - ((this._mouseCursorY + this._cameraModel.getViewPortY() % tileGraphicHeight) % tileGraphicHeight);


    if (true){
        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,0,0.8)';
        canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    } else {
        var a = 2;
        var centerX = drawX;
        var centerY = drawY;
        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,0,0.8)';
        canvasContext.moveTo(centerX-40*a, centerY); //left
        canvasContext.lineTo(centerX, centerY-40*a/2); //top
        canvasContext.lineTo(centerX+40*a, centerY); //right
        canvasContext.lineTo(centerX, centerY+40*a/2); //bottom
        canvasContext.lineTo(centerX-40*a, centerY); //left
        //canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
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
editor.view.WorldView.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);

    this._mouseCursorX = mouseEvent.getLocalX();
    this._mouseCursorY = mouseEvent.getLocalY();

    return result;

};

editor.view.WorldView.prototype.getImageData = function getImageData(miniMapBackgroundImage, width, height) {

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    var canvasContext = canvas.getContext("2d");
    if (miniMapBackgroundImage !== null) {
        canvasContext.drawImage(miniMapBackgroundImage, 0, 0);
    }

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(this._mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(this._mapModel.getMapHeight() / tileGraphicHeight),
        miniMapProportionX = width / this._mapModel.getMapWidth(),
        miniMapProportionY = height / this._mapModel.getMapHeight(),
        miniMapTileGraphicWidth = tileGraphicWidth * width / this._mapModel.getMapWidth(),
        miniMapTileGraphicHeight = tileGraphicHeight * height / this._mapModel.getMapHeight(),
        image,

        drawX,
        drawY,
        tileGraphicId,
        tileGraphic,

        tileGraphicsData,
        titleGraphicArray = mapModel.getMapGraphicModel().getTileArray(),
        tileImage,
        layer,
        maxLayer = 3;


    //MAP IMAGES
    //Optymalizacja PETLI TUTAJ POWINNA BYC !!!
    var starIndexX = parseInt(Math.max(0, this._cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, this._cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(this._cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(this._cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    if (miniMapBackgroundImage === null) {

        console.log("miniMapBackgroundImage === null");

        starIndexX = 0;
        startIndexY = 0;
        endIndexX = maxTileGraphicIndexX;
        endIndexY = maxTileGraphicIndexY;


        console.log(starIndexX + " " + startIndexY + " " + endIndexX + " " + endIndexY);
    }

    //MAP IMAGES
    var currentRenderTime = new Date().getTime();
    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
            for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

                tileGraphic = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {

                    tileGraphicsData = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * (tileIndexX + tileGraphic[layer].x) + (tileIndexY + tileGraphic[layer].y)][layer];

                    drawX = (tileIndexX + tileGraphic[layer].x) * miniMapTileGraphicWidth;
                    drawY = (tileIndexY + tileGraphic[layer].y) * miniMapTileGraphicHeight;

                    if (tileGraphicsData.src !== null && tileGraphicsData.mmRenderTime < currentRenderTime) {

                        tileGraphicsData.mmRenderTime = currentRenderTime;
                        tileImage = graphicsBuffor.get(tileGraphicsData.src);

                        if (tileImage !== null) {
                            canvasContext.drawImage(tileImage, drawX, drawY, tileImage.width * miniMapProportionX, tileImage.height * miniMapProportionY);

                        }

                    }

                }

            }
        }
    }

    var img = new Image(width, height);
    img.src = canvas.toDataURL();
    return img;

};