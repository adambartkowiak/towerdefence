/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.objects
 * @param {HTMLCanvasElement} canvas
 * @param {app.map.HudModel} hudModel
 */
app.objects.HudView = function HudView(canvas, hudModel) {
    
    /**
     * @type {Canvas}
     */
    this.canvas = canvas;

    /**
     *
     * @type {CanvasRenderingContext2D}
     */
    this.canvasContext = canvas.getContext("2d");

    /**
     *
     * @type {app.objects.HudModel} mapModel
     */
    this._hudModel = hudModel;
    
    /**
     * @type {Image}
     */
    this._towerMenuCircle = new Image();
    this._towerMenuCircle.src = "assets/images/menuCircle.png";
    
    /**
     * @type {Image}
     */
    this._towerMenuUpButton = new Image();
    this._towerMenuUpButton.src = "assets/images/menuUpButton.png";
    
    /**
     * @type {Image}
     */
    this._towerMenuCancelButton = new Image();
    this._towerMenuCancelButton.src = "assets/images/menuCancelButton.png";
    
    /**
     * @type {support.graphics.Image}
     */
    this._image = new support.graphics.Image();
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.HudView, Object);

/**
 * @methodName draw
 * @public
 */
app.objects.HudView.prototype.draw = function draw(){
    
    this.canvasContext.fillText("SCORE: " + this._hudModel.getScore(), 710, 10);
    this.canvasContext.fillText("CASH: " + this._hudModel.getCash(), 710, 30);
    this.canvasContext.fillText(this._hudModel.getTowerGuidForCurrentMenu(), 710, 50);
    
    this._drawTowerMenu(this._hudModel.getTowerXMenu(), this._hudModel.getTowerYMenu());
};

/**
 * @methodName _drawTowerMenu
 * @private
 * @param {Number} towerXMenu
 * @param {Number} towerYMenu
 */
app.objects.HudView.prototype._drawTowerMenu = function _drawTowerMenu(towerXMenu, towerYMenu){
        
    var currentImage = null;
    var imageX = 0;
    var imageY = 0;
    var imageWidth = 0;
    var imageHeight = 0;
    var imageDestX = 0;
    var imageDestY = 0;
    var imageDestHeight = 0;
    var imageDestWidth = 0;
    
    if (this._hudModel.getTowerGuidForCurrentMenu() !== -1){
        
        this._hudModel.setMenuCircle(towerXMenu, towerYMenu, this._towerMenuCircle.width/2);
        this._image.drawRotateImage(this.canvasContext, this._towerMenuCircle, towerXMenu, towerYMenu, 0);
        
        
        //OK BUTTON
        currentImage = this._towerMenuUpButton;
        
        imageX = 0;
        imageY = 0;
        imageWidth = currentImage.width;
        imageHeight = currentImage.height/2;
        imageDestX = towerXMenu-(currentImage.width/2);
        imageDestY = towerYMenu-(currentImage.height/2)-45;
        imageDestWidth = imageWidth;
        imageDestHeight = imageHeight;
        
        this._hudModel.setMenuOkButtonRect(imageDestX, imageDestY, imageDestWidth, imageDestHeight);
        this.canvasContext.drawImage(currentImage, imageX, imageY, imageWidth, imageHeight, imageDestX, imageDestY, imageDestWidth, imageDestHeight);
        
        
        //DELETE BUTTON
        currentImage = this._towerMenuCancelButton;
        
        imageX = 0;
        imageY = 0;
        imageWidth = currentImage.width;
        imageHeight = currentImage.height/2;
        imageDestX = towerXMenu-(currentImage.width/2);
        imageDestY = towerYMenu-(currentImage.height/2)+95;
        imageDestWidth = imageWidth;
        imageDestHeight = imageHeight;
        
        this._hudModel.setMenuCancelButtonRect(imageDestX, imageDestY, imageDestWidth, imageDestHeight);
        this.canvasContext.drawImage(currentImage, imageX, imageY, imageWidth, imageHeight, imageDestX, imageDestY, imageDestWidth, imageDestHeight);
    }
};