/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.view = app.view || {};

var Utils = Utils || {};

/**
 * @namespace app.view
 * @class WorldView
 * @constructor
 * @param {app.model.WorldModel} worldModel
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
app.view.WorldView = function WorldView(worldModel, x, y, width, height) {
    
    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, x, y, width, height);
    
    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    this._grassTile = new Image();
    this._grassTile.src = "assets/map/grassTile.png";

    /**
     * @property {Array} _enemyImage
     */
    this._entityImage = [];
    this._entityImage["assets/images/enemy0.png"] = new Image();
    this._entityImage["assets/images/enemy0.png"].src = "assets/images/enemy0.png";

    this._entityImage["assets/images/enemy1.png"] = new Image();
    this._entityImage["assets/images/enemy1.png"].src = "assets/images/enemy1.png";

    this._entityImage["assets/images/enemy2.png"] = new Image();
    this._entityImage["assets/images/enemy2.png"].src = "assets/images/enemy2.png";

    this._entityImage["assets/images/enemy3.png"] = new Image();
    this._entityImage["assets/images/enemy3.png"].src = "assets/images/enemy3.png";

    this._entityImage["assets/images/tower0.png"] = new Image();
    this._entityImage["assets/images/tower0.png"].src = "assets/images/tower0.png";

    this._entityImage["assets/images/bullet0.png"] = new Image();
    this._entityImage["assets/images/bullet0.png"].src = "assets/images/bullet0.png";

    this._entityImage["assets/images/bullet2.png"] = new Image();
    this._entityImage["assets/images/bullet2.png"].src = "assets/images/bullet2.png";

    this._entityImage["assets/images/bullet3.png"] = new Image();
    this._entityImage["assets/images/bullet3.png"].src = "assets/images/bullet3.png";

    this._entityImage["assets/images/bullet4.png"] = new Image();
    this._entityImage["assets/images/bullet4.png"].src = "assets/images/bullet4.png";

    this._entityImage["assets/images/base1.png"] = new Image();
    this._entityImage["assets/images/base1.png"].src = "assets/images/base1.png";

    this._entityImage["assets/images/base2.png"] = new Image();
    this._entityImage["assets/images/base2.png"].src = "assets/images/base2.png";

    this._entityImage["assets/images/base3.png"] = new Image();
    this._entityImage["assets/images/base3.png"].src = "assets/images/base3.png";

    this._entityImage["assets/images/base4.png"] = new Image();
    this._entityImage["assets/images/base4.png"].src = "assets/images/base4.png";

    /**
     * @property {support.graphics.Image} _image
     */
    this._image = new support.graphics.Image();

    /**
     * @property {Boolean} _debug
     * @private
     */
    this._debug = false;

    /**
     * @property {Boolean} _drawHealthBar
     * @private
     */
    this._drawHealthBar = true;

    /**
     * @property {Boolean} _drawPath
     * @private
     */
    this._drawPath = true;

};

Utils.inherits(app.view.WorldView, support.view.AbstractView);

/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @param {boolean} gameIsLoaded
 * @public
 */
app.view.WorldView.prototype.draw = function draw(canvas, gameIsLoaded) {

    
    var canvasContext = canvas.getContext("2d");

    //canvasContext.scale(1,0.5);
    //canvasContext.rotate(45*Math.PI/180);

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

//    if (gameIsLoaded !== true){
//        canvasContext.fillStyle = '#FFFFFF';
//        if (gameIsLoaded === false){
//            canvasContext.fillText("MAP IS LOADING FROM THE SERVER", 20, canvas.height/2);
//        } else {
//            canvasContext.fillText("MAP LOADING ERROR: " + gameIsLoaded, 20, canvas.height/2);
//        }
//    } else {
        this._drawMap(canvasContext, this._worldModel.getMapModel(), this._worldModel.getCameraModel());
        this._drawEntities(canvasContext, this._worldModel.getEntityListModel(), this._worldModel.getCameraModel());
        this._drawSelectedArea(canvasContext, this._worldModel.getCameraModel());


        //Renderowanie minimapy
        //this._worldModel.getMiniMapModel().setMiniMapPositionX(0);
        //this._worldModel.getMiniMapModel().setMiniMapPositionY(canvas.height - this._worldModel.getMiniMapModel().getMiniMapHeight());
//        this._minimapView.draw(canvas);

        //this._statusMenuView.draw();
        //this._drawActionMenu(this._worldModel.getSelectedEntityListModel());
//    }


    //canvasContext.setTransform(1, 0, 0, 1, 0, 0);
};

/**
 * @method _drawMap
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawMap = function _drawMap(canvasContext, mapModel, cameraModel) {

    var tileIndexX,
        tileIndexY,
        tileWidth = mapModel.getTileWidth(),
        tileHeight = mapModel.getTileHeight(),
        maxTileIndexX = Math.ceil(mapModel.getMapWidth() / tileWidth),
        maxTileIndexY = Math.ceil(mapModel.getMapHeight() / tileHeight),
        drawX,
        drawY;

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#FFFFFF';

    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {

            drawX = tileIndexX * tileWidth;
            drawY = tileIndexY * tileHeight;

            canvasContext.drawImage(this._grassTile, drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileWidth, tileHeight);

            //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
            //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

            canvasContext.rect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileWidth, tileHeight);
        }
    }

    canvasContext.lineWidth = 1;
    canvasContext.stroke();
};

/**
 * @method _drawEntities
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawEntities = function _drawEntities(canvasContext, entityListModel, cameraModel) {
    var i,
        max,
        entity,
        hp,
        currentHp;

    canvasContext.strokeStyle = '#000000';
    canvasContext.lineWidth = 1;

    max = entityListModel.length();
    for (i = 0; i < max; i++) {
        entity = entityListModel.getElement(i);

        //IMAGE
        this._image.drawRotateImage(canvasContext, this._entityImage[entity.getGraphicUrl()], entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getAngle());

        //SELECTED
        if (entity._selected) {
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#00FF00';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();
        }

        //HEALTH BAR
        if (this._drawHealthBar && entity.getHp() > 1) {
            hp = entity.getHp();
            currentHp = entity.getCurrentHp();

            canvasContext.fillStyle = '#474747';
            canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 10 + currentHp / 5, entity.getY() - cameraModel.getViewPortY() - 20, (hp - currentHp) / 5, 3);

            canvasContext.fillStyle = '#00FF00';
            canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 10, entity.getY() - cameraModel.getViewPortY() - 20, currentHp / 5, 3);

            ////drawRect
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#000000';
            canvasContext.rect(entity.getX() - cameraModel.getViewPortX() - hp / 10, entity.getY() - cameraModel.getViewPortY() - 20, hp / 5, 3);

            canvasContext.lineWidth = 1;
            canvasContext.stroke();
        }

        //PATH
        if (this._drawPath && entity.getSelected()) {

            var moveList = entity.getMoveList();

            if (moveList != null) {

                canvasContext.beginPath();

                var moveToX = entity.getX(),
                    moveToY = entity.getY();

                canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());

                canvasContext.strokeStyle = '#00FF00';
                canvasContext.fillStyle = '#00FF00';

                for (var j = 0; j < moveList.length(); j++) {

                    moveToX = moveList.getElement(j).getX();
                    moveToY = moveList.getElement(j).getY();

                    if (moveList.getElement(j).getEntityId() === 0 && moveToX !== -1 && moveToX !== -1) {
                        canvasContext.lineTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());
                    }

                }

                canvasContext.strokeStyle = '#00FF00';
                canvasContext.lineWidth = 1;
                canvasContext.stroke();

            }

        }

        //DEBUG LINES
        if (this._debug) {
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#333333';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();

            canvasContext.beginPath();
            canvasContext.strokeStyle = '#00bfff';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getMoveCollisionDetectionRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();

            canvasContext.beginPath();
            canvasContext.strokeStyle = '#FF0000';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();

            var moveToX = entity.getX(),
                moveToY = entity.getY(),
                moveVectorX = entity.getLastPosition().getX(),
                moveVectorY = entity.getLastPosition().getY();

            canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());
            canvasContext.lineTo(moveVectorX - cameraModel.getViewPortX(), moveVectorY - cameraModel.getViewPortY());

            canvasContext.fillStyle = '#FFFFFF';
            canvasContext.fillRect(moveToX - 2 - cameraModel.getViewPortX(), moveToY - 2 - cameraModel.getViewPortY(), 4, 4);
            canvasContext.stroke();
        }

    }

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("ENTITY COUNT: " + max, 0, 20);

};

/**
 * @method _drawSelectedArea
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawSelectedArea = function _drawSelectedArea(canvasContext, cameraModel) {
    var selectRect = this._worldModel.getSelectRect();
    if (selectRect !== null) {
        canvasContext.fillStyle = '#00FF00';
        canvasContext.globalAlpha = 0.2;
        canvasContext.fillRect(selectRect.getX() - cameraModel.getViewPortX(), selectRect.getY() - cameraModel.getViewPortY(), selectRect.getWidth(), selectRect.getHeight());
        canvasContext.globalAlpha = 1;

        canvasContext.beginPath();
        canvasContext.strokeStyle = '#00FF00';
        canvasContext.rect(selectRect.getX() - 1 - cameraModel.getViewPortX(), selectRect.getY() - 1 - cameraModel.getViewPortY(), selectRect.getWidth() + 2, selectRect.getHeight() + 2);
        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }
};

/**
 * @method _drawActionMenu
 * @private
 * @param {app.model.ListModel} selectedEntityModelList
 */
app.view.WorldView.prototype._drawActionMenu = function _drawActionMenu(selectedEntityModelList) {

    if (selectedEntityModelList.length === 0){
        return;
    }

    var actionMenuSize = 150,
        index,
        tileIndexX,
        tileIndexY,
        maxTileIndexX = 4,
        maxTileIndexY = 4,
        tileWidth = 150/maxTileIndexX,
        tileHeight = 150/maxTileIndexY,
        startActionMenuX = canvas.width - actionMenuSize,
        startActionMenuY = canvas.height - actionMenuSize,
        element = selectedEntityModelList.getElement(0),
        action = element === undefined ? undefined : element._availableActions,
        actionLength = action === undefined ? 0 : action.length;

    //Rysowanie backgrounda miniMapy
    canvasContext.fillStyle = '#222222';
    canvasContext.fillRect(startActionMenuX, startActionMenuY, actionMenuSize, actionMenuSize);

    canvasContext.beginPath();
    canvasContext.strokeStyle = '#FFFFFF';

    canvasContext.fillStyle = '#FFFFFF';

    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {
            index = tileIndexY+tileIndexX*maxTileIndexY;

            if (actionLength>index){
                canvasContext.fillText(action[index], startActionMenuX+tileIndexX*tileWidth+tileWidth/2, startActionMenuY+tileIndexY*tileHeight+tileHeight/2);
            }

            canvasContext.rect(startActionMenuX+tileIndexX*tileWidth, startActionMenuY+tileIndexY*tileHeight, tileWidth, tileHeight);
        }
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
app.view.WorldView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){
    return support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
};