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
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
editor.view.WorldView = function WorldView(worldModel, x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    app.view.AbstractWorldView.call(this, worldModel, x, y, width, height);

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

    app.view.AbstractWorldView.prototype.draw.call(this, canvas);

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

    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,0,0.8)';
    canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
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
    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
            for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

                drawX = tileIndexX * miniMapTileGraphicWidth;
                drawY = tileIndexY * miniMapTileGraphicHeight;
                tileGraphic = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                //if (tileGraphic[layer]) {
                //    tileGraphicsData = tileGraphic[layer];
                //    tileImage = this._tileImage[tileGraphicsData];
                //
                //    if (tileImage !== null) {
                //
                //        image = this._tileImage[tileImage.getGraphicSource()];
                //
                //        canvasContext.drawImage(image, drawX + tileImage.getGraphicOffsetX() * miniMapProportionX, drawY + tileImage.getGraphicOffsetY() * miniMapProportionY, image.width * miniMapProportionX, image.height * miniMapProportionY);
                //    }
                //}

                if (tileGraphic && tileGraphic[layer]) {
                    tileGraphicsData = tileGraphic[layer];
                    tileImage = graphicsBuffor.get(tileGraphicsData);

                    if (tileImage !== null) {
                        canvasContext.drawImage(tileImage, drawX, drawY, tileImage.width * miniMapProportionX, tileImage.height * miniMapProportionY);
                    }

                }
            }
        }
    }


    var img = new Image(width, height);
    img.src = canvas.toDataURL();
    return img;

};