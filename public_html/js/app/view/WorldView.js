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
 * @param {HTMLCanvasElement} canvas
 * @param {app.model.WorldModel} worldModel
 * @param {app.mouseHandler.MouseEventHandler} mouseEventHandler
 */
app.view.WorldView = function WorldView(canvas, worldModel, mouseEventHandler) {

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
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {app.mouseHandler.MouseEventHandler} _mouseEventHandler
     * @private
     */
    this._mouseEventHandler = mouseEventHandler;


    this._grassTile = new Image();
    this._grassTile.src = "assets/map/grassTile.png";

    /**
     * @property {Array} _enemyImage
     */
    this._entityImage = [];
    this._entityImage["assets/images/enemy0.png"] = new Image();
    this._entityImage["assets/images/enemy0.png"].src = "assets/images/enemy0.png";

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

    /**
     * @property {support.view.MinimapView} _minimapView
     * @private
     */
    this._minimapView = new support.view.MinimapView();
    this._minimapView.setX(this._worldModel.getMiniMapModel().getMiniMapPositionX());
    this._minimapView.setY(this._worldModel.getMiniMapModel().getMiniMapPositionY());
    this._minimapView.setWidth(this._worldModel.getMiniMapModel().getMiniMapWidth());
    this._minimapView.setHeight(this._worldModel.getMiniMapModel().getMiniMapHeight());
    this._minimapView.setMapWidth(this._worldModel.getMapModel().getMapWidth());
    this._minimapView.setMapHeight(this._worldModel.getMapModel().getMapHeight());

    this._minimapView.setViewPort(this._worldModel.getCameraModel());
    this._minimapView.setElements(this._worldModel.getEntityListModel().getElements());

    /**
     * @property {app.view.gui.StatusMenuView} _statusMenuView
     * @private
     */
    this._statusMenuView = new app.view.gui.StatusMenuView(canvas, worldModel);

    //Widoki maja zawierac wszystkie zmienne do wyrenderowania oraz do eventow myszki
    //a w modelu minimapy znajduja sie dane, potrzebne do initu widoku
    this._mouseEventHandler.addMouseEventListener(this._minimapView);
    //this._mouseEventHandler.addMouseEventListener(this._statusMenuView);

};

Utils.inherits(app.view.WorldView, Object);

/**
 * @method draw
 * @@param {Number} logicFrames
 * @public
 */
app.view.WorldView.prototype.draw = function draw() {


    //this._canvasContext.scale(1,0.5);
    //this._canvasContext.rotate(45*Math.PI/180);

    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._drawMap(this._worldModel.getMapModel(), this._worldModel.getCameraModel());
    this._drawEntities(this._worldModel.getEntityListModel(), this._worldModel.getCameraModel());
    this._drawSelectedArea(this._worldModel.getCameraModel());


    //Renderowanie minimapy
    //this._worldModel.getMiniMapModel().setMiniMapPositionX(0);
    //this._worldModel.getMiniMapModel().setMiniMapPositionY(this._canvas.height - this._worldModel.getMiniMapModel().getMiniMapHeight());
    this._minimapView.draw(this._canvas);

    //this._statusMenuView.draw();
    //this._drawActionMenu(this._worldModel.getSelectedEntityListModel());


    //this._canvasContext.setTransform(1, 0, 0, 1, 0, 0);
};

/**
 * @method _drawMap
 * @private
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawMap = function _drawMap(mapModel, cameraModel) {

    var tileIndexX,
        tileIndexY,
        tileWidth = mapModel.getTileWidth(),
        tileHeight = mapModel.getTileHeight(),
        maxTileIndexX = Math.ceil(mapModel.getMapWidth() / tileWidth),
        maxTileIndexY = Math.ceil(mapModel.getMapHeight() / tileHeight),
        drawX,
        drawY;

    this._canvasContext.beginPath();
    this._canvasContext.strokeStyle = '#FFFFFF';

    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {

            drawX = tileIndexX * tileWidth;
            drawY = tileIndexY * tileHeight;

            this._canvasContext.drawImage(this._grassTile, drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileWidth, tileHeight);

            //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
            //this._image.drawRotateImage(this._canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

            this._canvasContext.rect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileWidth, tileHeight);
        }
    }

    this._canvasContext.lineWidth = 1;
    this._canvasContext.stroke();
};

/**
 * @method _drawEntities
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawEntities = function _drawEntities(entityListModel, cameraModel) {
    var i,
        max,
        entity,
        hp,
        currentHp;

    this._canvasContext.strokeStyle = '#000000';
    this._canvasContext.lineWidth = 1;

    max = entityListModel.length();
    for (i = 0; i < max; i++) {
        entity = entityListModel.getElement(i);

        //IMAGE
        this._image.drawRotateImage(this._canvasContext, this._entityImage[entity.getGraphicUrl()], entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getAngle());

        //SELECTED
        if (entity._selected) {
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#00FF00';
            this._canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();
        }

        //HEALTH BAR
        if (this._drawHealthBar && entity.getHp() > 1) {
            hp = entity.getHp();
            currentHp = entity.getCurrentHp();

            this._canvasContext.fillStyle = '#474747';
            this._canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 10 + currentHp / 5, entity.getY() - cameraModel.getViewPortY() - 20, (hp - currentHp) / 5, 3);

            this._canvasContext.fillStyle = '#00FF00';
            this._canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 10, entity.getY() - cameraModel.getViewPortY() - 20, currentHp / 5, 3);

            ////drawRect
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#000000';
            this._canvasContext.rect(entity.getX() - cameraModel.getViewPortX() - hp / 10, entity.getY() - cameraModel.getViewPortY() - 20, hp / 5, 3);

            this._canvasContext.lineWidth = 1;
            this._canvasContext.stroke();
        }

        //PATH
        if (this._drawPath && entity.getSelected()) {

            var moveList = entity.getMoveList();

            if (moveList != null) {

                this._canvasContext.beginPath();

                var moveToX = entity.getX(),
                    moveToY = entity.getY();

                this._canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());

                this._canvasContext.strokeStyle = '#00FF00';
                this._canvasContext.fillStyle = '#00FF00';

                for (var j = 0; j < moveList.length(); j++) {

                    moveToX = moveList.getElement(j).getX();
                    moveToY = moveList.getElement(j).getY();

                    if (moveList.getElement(j).getEntityId() === 0 && moveToX !== -1 && moveToX !== -1) {
                        this._canvasContext.lineTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());
                    }

                }

                this._canvasContext.strokeStyle = '#00FF00';
                this._canvasContext.lineWidth = 1;
                this._canvasContext.stroke();

            }

        }

        //DEBUG LINES
        if (this._debug) {
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#333333';
            this._canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#00bfff';
            this._canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getMoveCollisionDetectionRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#FF0000';
            this._canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            var moveToX = entity.getX(),
                moveToY = entity.getY(),
                moveVectorX = entity.getLastPosition().getX(),
                moveVectorY = entity.getLastPosition().getY();

            this._canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());
            this._canvasContext.lineTo(moveVectorX - cameraModel.getViewPortX(), moveVectorY - cameraModel.getViewPortY());

            this._canvasContext.fillStyle = '#FFFFFF';
            this._canvasContext.fillRect(moveToX - 2 - cameraModel.getViewPortX(), moveToY - 2 - cameraModel.getViewPortY(), 4, 4);
            this._canvasContext.stroke();
        }

    }

    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("ENTITY COUNT: " + max, 0, 20);

};

/**
 * @method _drawSelectedArea
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawSelectedArea = function _drawSelectedArea(cameraModel) {
    var selectRect = this._worldModel.getSelectRect();
    if (selectRect !== null) {
        this._canvasContext.fillStyle = '#00FF00';
        this._canvasContext.globalAlpha = 0.2;
        this._canvasContext.fillRect(selectRect.getX() - cameraModel.getViewPortX(), selectRect.getY() - cameraModel.getViewPortY(), selectRect.getWidth(), selectRect.getHeight());
        this._canvasContext.globalAlpha = 1;

        this._canvasContext.beginPath();
        this._canvasContext.strokeStyle = '#00FF00';
        this._canvasContext.rect(selectRect.getX() - 1 - cameraModel.getViewPortX(), selectRect.getY() - 1 - cameraModel.getViewPortY(), selectRect.getWidth() + 2, selectRect.getHeight() + 2);
        this._canvasContext.lineWidth = 1;
        this._canvasContext.stroke();
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
        startActionMenuX = this._canvas.width - actionMenuSize,
        startActionMenuY = this._canvas.height - actionMenuSize,
        element = selectedEntityModelList.getElement(0),
        action = element === undefined ? undefined : element._availableActions,
        actionLength = action === undefined ? 0 : action.length;

    //Rysowanie backgrounda miniMapy
    this._canvasContext.fillStyle = '#222222';
    this._canvasContext.fillRect(startActionMenuX, startActionMenuY, actionMenuSize, actionMenuSize);

    this._canvasContext.beginPath();
    this._canvasContext.strokeStyle = '#FFFFFF';

    this._canvasContext.fillStyle = '#FFFFFF';

    for (tileIndexX = 0; tileIndexX < maxTileIndexX; tileIndexX++) {
        for (tileIndexY = 0; tileIndexY < maxTileIndexY; tileIndexY++) {
            index = tileIndexY+tileIndexX*maxTileIndexY;

            if (actionLength>index){
                this._canvasContext.fillText(action[index], startActionMenuX+tileIndexX*tileWidth+tileWidth/2, startActionMenuY+tileIndexY*tileHeight+tileHeight/2);
            }

            this._canvasContext.rect(startActionMenuX+tileIndexX*tileWidth, startActionMenuY+tileIndexY*tileHeight, tileWidth, tileHeight);
        }
    }

    this._canvasContext.lineWidth = 1;
    this._canvasContext.stroke();

};
