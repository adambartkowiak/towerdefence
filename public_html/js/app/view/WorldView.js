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
 */
app.view.WorldView = function WorldView(canvas, worldModel) {

    /**
     * @property {HTMLCanvasElement} _canvas
     * @private
     */
    this._canvas = canvas;

    /**
     * @property {CanvasRenderingContext2D} _canvasContext
     */
    this._canvasContext = canvas.getContext("2d");

    /**
     * @property {app.objects.WorldModel} _worldModel
     */
    this._worldModel = worldModel;

    /**
     * @property {Image} _backgroundImage
     */
    this._backgroundImage = new Image();
    this._backgroundImage.src = "assets/images/map1.png";


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

    this._entityImage["assets/images/comandCenter0.png"] = new Image();
    this._entityImage["assets/images/comandCenter0.png"].src = "assets/images/comandCenter0.png";

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
     * @property {Boolean} _drawPath
     * @private
     */
    this._drawHud = true;

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


    this._drawMiniMap(this._worldModel.getMapModel(), this._worldModel.getEntityListModel(), this._worldModel.getCameraModel());
    this._drawEntitysStatusMenu();
    this._drawActionMenu(this._worldModel.getSelectedEntityListModel());


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
 * @method _drawMiniMap
 * @private
 * @param {app.model.MapModel} mapModel
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawMiniMap = function _drawMiniMap(mapModel, entityListModel, cameraModel) {

    var miniMapWidth = this._worldModel.getMiniMapModel().getMiniMapWidth(),
        miniMapHeight = this._worldModel.getMiniMapModel().getMiniMapHeight(),
        miniMapScaleWidth = this._worldModel.getMiniMapModel().getMiniMapScaleWidth(),
        miniMapScaleHeight = this._worldModel.getMiniMapModel().getMiniMapScaleHeight(),
        mapXOnMiniMap = this._worldModel.getMiniMapModel().getMapStartXOnMiniMap(),
        mapYOnMiniMap = this._worldModel.getMiniMapModel().getMapStartYOnMiniMap(),
        mapWidthOnMiniMap = this._worldModel.getMiniMapModel().getMapWidthOnMiniMap(),
        mapHeightOnMiniMap = this._worldModel.getMiniMapModel().getMapHeightOnMiniMap(),
        viewPortWidthOnMiniMap = cameraModel.getViewPortWidth() * miniMapScaleWidth,
        viewPortHeightOnMiniMap = cameraModel.getViewPortHeight() * miniMapScaleHeight,
        entity,
        entityIndex,
        entityIndexMax = entityListModel.length(),
        entitySizeOnMiniMap;

    //Rysowanie backgrounda miniMapy
    this._canvasContext.fillStyle = '#222222';
    this._canvasContext.fillRect(0, this._canvas.height - miniMapHeight, miniMapWidth, miniMapHeight);

    //Rysowanie mapy na minimapie
    this._canvasContext.fillStyle = '#444444';
    this._canvasContext.fillRect(mapXOnMiniMap, this._canvas.height - miniMapHeight + mapYOnMiniMap, Math.round(mapWidthOnMiniMap), Math.round(mapHeightOnMiniMap));

    //Rysowanie obiektow na minimapie
    for (entityIndex = 0; entityIndex < entityIndexMax; entityIndex++) {
        entity = entityListModel.getElement(entityIndex);

        var posXonMiniMap = Math.round(mapXOnMiniMap + entity.getX() * miniMapScaleWidth);
        var posYonMiniMap = Math.round(mapYOnMiniMap + entity.getY() * miniMapScaleHeight);

        entitySizeOnMiniMap = Math.ceil(entity.getRadius() * miniMapScaleWidth);

        if (entity.getTeam() === 1) {
            this._canvasContext.fillStyle = '#0000FF';
            this._canvasContext.fillRect(0 + posXonMiniMap - entitySizeOnMiniMap / 2, this._canvas.height - miniMapHeight + posYonMiniMap - entitySizeOnMiniMap / 2, entitySizeOnMiniMap, entitySizeOnMiniMap);
        } else if (entity.getTeam() === 2) {
            this._canvasContext.fillStyle = '#FF0000';
            this._canvasContext.fillRect(0 + posXonMiniMap - entitySizeOnMiniMap / 2, this._canvas.height - miniMapHeight + posYonMiniMap - entitySizeOnMiniMap / 2, entitySizeOnMiniMap, entitySizeOnMiniMap);
        }

    }

    //viewPort na minimapie
    this._canvasContext.beginPath();
    this._canvasContext.strokeStyle = '#FFFFFF';
    this._canvasContext.rect(mapXOnMiniMap + cameraModel.getViewPortX() * miniMapScaleWidth, this._canvas.height - miniMapHeight + mapYOnMiniMap + cameraModel.getViewPortY() * miniMapScaleHeight, viewPortWidthOnMiniMap, viewPortHeightOnMiniMap);
    this._canvasContext.lineWidth = 1;
    this._canvasContext.stroke();

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

    //for (var i=0; i<selectedEntityModelList.getElement(0)._availableActions.length; i++){
    //
    //
    //
    //}

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

/**
 * @method _drawActionMenu
 * @private
 * @param {app.model.ListModel} selectedEntityModelList
 */
app.view.WorldView.prototype._drawEntitysStatusMenu = function _drawEntitysStatusMenu(selectedEntityModelList) {

    var minimapWidth = this._worldModel.getMiniMapModel().getMiniMapWidth();
    var actionMenuWidth = 150;
    var outsideSpace = 10;
    var hudHeight = 75;
    var hudTop = this._canvas.height - hudHeight;

    this._canvasContext.fillStyle = '#222222';
    this._canvasContext.fillRect(minimapWidth + outsideSpace, hudTop, canvas.width - minimapWidth - actionMenuWidth - outsideSpace*2, hudHeight);

    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("EntityModelIndex: " + app.model.EntityModelIndex.ENTITY_MODEL_INDEX, minimapWidth + outsideSpace + 10, hudTop + 20);


    //Zaznaczanie
    var selectedElementLength = this._worldModel.getSelectedEntityListModel().length();
    if (selectedElementLength === 1) {

        var selectedElement = this._worldModel.getSelectedEntityListModel().getElement(0);
        //HP
        this._canvasContext.fillText("HP: " + selectedElement.getCurrentHp() + "/" + selectedElement.getHp(), minimapWidth + outsideSpace + 10, hudTop + 40);

        var buildList = selectedElement.getBuildList();
        if (buildList !== null) {
            var buildListIndex;
            var buildListLength = buildList.length();
            var buildListElement = null;

            for (buildListIndex = 0; buildListIndex < buildListLength; buildListIndex++) {
                buildListElement = buildList.getElement(buildListIndex);
                this._canvasContext.fillText("BUILDING: " + buildListElement.getCurrentBuildTime() + "/" + buildListElement.getBuildTime(), minimapWidth + outsideSpace + 200, hudTop + 20 + 20 * buildListIndex);
            }
        }


    } else if (selectedElementLength > 1) {

        this._canvasContext.fillText("SELECTED COUNT: " + selectedElementLength, minimapWidth + outsideSpace + 10, hudTop + 40);

    }

};
