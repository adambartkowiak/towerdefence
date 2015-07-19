/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class HudView
 * @constructor
 * @param {HTMLCanvasElement} canvas
 * @param {app.map.HudModel} hudModel
 */
app.objects.HudView = function HudView(canvas, hudModel) {

    /**
     * @property {HTMLCanvasElement} _canvas
     * @private
     */
    this._canvas = canvas;

    /**
     * @property {CanvasRenderingContext2D} _canvasContext
     * @private
     */
    this._canvasContext = canvas.getContext("2d");

    /**
     * @property {app.objects.HudModel} _hudModel
     * @private
     */
    this._hudModel = hudModel;


    /**
     * @property {Image} _menuGraphicBackgroundImage
     * @private
     */
    this._menuGraphicBackgroundImage = new Image();
    this._menuGraphicBackgroundImage.src = this._hudModel.getMenuGraphicUrl();

    /**
     * @property {Image} _towerMenuCircle
     * @private
     */
    this._towerMenuCircle = new Image();
    this._towerMenuCircle.src = "assets/images/menuCircle.png";

    /**
     * @property {Image} _towerMenuUpButton
     * @private
     */
    this._towerMenuUpButton = new Image();
    this._towerMenuUpButton.src = "assets/images/menuUpButton.png";

    /**
     * @property {Image} _towerMenuCancelButton
     * @private
     */
    this._towerMenuCancelButton = new Image();
    this._towerMenuCancelButton.src = "assets/images/menuCancelButton.png";

    /**
     * @property {support.graphics.Image} _image
     * @private
     */
    this._image = new support.graphics.Image();
};

Utils.inherits(app.objects.HudView, Object);

/**
 * @method draw
 * @public
 */
app.objects.HudView.prototype.draw = function draw() {

    this._canvasContext.drawImage(this._menuGraphicBackgroundImage, 700, 0, 200, 500);

    this._canvasContext.fillText("SCORE: " + this._hudModel.getScore(), 710, 10);
    this._canvasContext.fillText("CASH: " + this._hudModel.getCash(), 710, 30);
    this._canvasContext.fillText(this._hudModel.getTowerGuidForCurrentMenu(), 710, 50);

    this._drawTowerMenu(this._hudModel.getTowerXMenu(), this._hudModel.getTowerYMenu());
};

/**
 * @method _drawTowerMenu
 * @private
 * @param {Number} towerXMenu
 * @param {Number} towerYMenu
 */
app.objects.HudView.prototype._drawTowerMenu = function _drawTowerMenu(towerXMenu, towerYMenu) {

    var currentImage = null;
    var imageX = 0;
    var imageY = 0;
    var imageWidth = 0;
    var imageHeight = 0;
    var imageDestX = 0;
    var imageDestY = 0;
    var imageDestHeight = 0;
    var imageDestWidth = 0;

    if (this._hudModel.getTowerGuidForCurrentMenu() !== -1) {

        this._hudModel.setMenuCircle(towerXMenu, towerYMenu, this._towerMenuCircle.width / 2);
        this._image.drawRotateImage(this._canvasContext, this._towerMenuCircle, towerXMenu, towerYMenu, 0);


        //OK BUTTON
        currentImage = this._towerMenuUpButton;

        imageX = 0;
        imageY = 0;
        imageWidth = currentImage.width;
        imageHeight = currentImage.height / 2;
        imageDestX = towerXMenu - (currentImage.width / 2);
        imageDestY = towerYMenu - (currentImage.height / 2) - 45;
        imageDestWidth = imageWidth;
        imageDestHeight = imageHeight;

        this._hudModel.setMenuOkButtonRect(imageDestX, imageDestY, imageDestWidth, imageDestHeight);
        this._canvasContext.drawImage(currentImage, imageX, imageY, imageWidth, imageHeight, imageDestX, imageDestY, imageDestWidth, imageDestHeight);


        //DELETE BUTTON
        currentImage = this._towerMenuCancelButton;

        imageX = 0;
        imageY = 0;
        imageWidth = currentImage.width;
        imageHeight = currentImage.height / 2;
        imageDestX = towerXMenu - (currentImage.width / 2);
        imageDestY = towerYMenu - (currentImage.height / 2) + 95;
        imageDestWidth = imageWidth;
        imageDestHeight = imageHeight;

        this._hudModel.setMenuCancelButtonRect(imageDestX, imageDestY, imageDestWidth, imageDestHeight);
        this._canvasContext.drawImage(currentImage, imageX, imageY, imageWidth, imageHeight, imageDestX, imageDestY, imageDestWidth, imageDestHeight);
    }
};