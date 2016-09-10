/**
 * Created by adambartkowiak on 28/01/16.
 */

'use strict';

var app = app || {};
app.view = app.view || {};

var timer = timer || null;

var FOG_RESOLUTION_MULTIPLIER = 1;

/**
 * @namespace app.view
 * @class AbstractWorldView
 * @constructor
 * @param {app.model.WorldModel} worldModel
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
app.view.AbstractWorldView = function AbstractWorldView(worldModel, x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, x, y, width, height);

    /**
     * @property {support.graphics.Image} _image
     * @private
     */
    this._image = new support.graphics.Image();

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {app.model.MapModel} mapModel
     * @private
     */
    this._mapModel = worldModel.getMapModel();

    /**
     * @property {app.model.CameraModel} cameraModel
     * @private
     */
    this._cameraModel = worldModel.getCameraModel();

    /**
     *
     */
    this._timeDeltaMemory = [];

    /**
     *
     */
    this._count = 0;

    /**
     *
     * @type {number}
     * @private
     */
    this._FOWBuffoer = [];

};

Utils.inherits(app.view.AbstractWorldView, support.view.AbstractView);


/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
app.view.AbstractWorldView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    this._updateEnitityOnMapArray(this._worldModel.getEntityListModel(), this._worldModel.getMapModel());

    if (FEATURE_TOGGLE.FOG_OF_WAR) {
        this._prepareFogOfWar(this._worldModel.getEntityListModel(), this._worldModel.getMapModel());
    }

    this._drawMap(canvasContext, this._worldModel.getMapModel(), this._worldModel.getCameraModel());
    this._drawEntities(canvasContext, this._worldModel.getMapModel(), this._worldModel.getCameraModel());

    if (FEATURE_TOGGLE.FOG_OF_WAR) {
        this._drawFogOfWar(canvasContext, this._worldModel.getMapModel(), this._worldModel.getCameraModel());
    }

    this._count++;
};


/**
 * @method _drawMap
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 * @public
 */
app.view.AbstractWorldView.prototype._drawMap = function _drawMap(canvasContext, mapModel, cameraModel) {

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapHeight() / tileGraphicHeight),

        tileCollisionWidth = mapModel.getMapCollisionModel().getTileWidth(),
        tileCollisionHeight = mapModel.getMapCollisionModel().getTileHeight(),
        maxTileCollisionIndexX = Math.ceil(mapModel.getMapWidth() / tileCollisionWidth),
        maxTileCollisionIndexY = Math.ceil(mapModel.getMapHeight() / tileCollisionHeight),

        drawX,
        drawY,
        tileGraphic,

        tileCollisionId,
        titleGraphicArray = mapModel.getMapGraphicModel().getTileArray(),

        tileGraphicsData,
        tileImage,
        layer = 0,
        maxLayer = 2;

    //MAP IMAGES
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    var currentRenderTime = new Date().getTime();

    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
            for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

                tileGraphic = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];
                //tileGraphic = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {

                    tileGraphicsData = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * (tileIndexX + tileGraphic[layer].x) + (tileIndexY + tileGraphic[layer].y)][layer];

                    drawX = (tileIndexX + tileGraphic[layer].x) * tileGraphicWidth;
                    drawY = (tileIndexY + tileGraphic[layer].y) * tileGraphicHeight;

                    if (tileGraphicsData.src !== null && tileGraphicsData.renderTime < currentRenderTime) {

                        tileGraphicsData.renderTime = currentRenderTime;
                        tileImage = graphicsBuffor.get(tileGraphicsData.src);

                        if (tileImage !== null) {
                            canvasContext.drawImage(tileImage, drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY());

                            if (tileGraphic[layer].x !== 0 || tileGraphic[layer].y !== 0) {
                                canvasContext.fillStyle = 'rgba(255,255,0,0.5)';
                                drawX = tileIndexX * tileGraphicWidth;
                                drawY = tileIndexY * tileGraphicHeight;
                                canvasContext.fillRect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), 40, 40);
                            }

                        }

                        // if (layer === 1) {
                        //     canvasContext.fillStyle = 'rgba(255,255,255,1)';
                        //     var stringLength = tileGraphicsData.src.length;
                        //     var pathLength = "assets/graphics/images/".length;
                        //     var formatLength = 4;
                        //     canvasContext.fillText(tileGraphicsData.src.substring(pathLength, stringLength - formatLength), drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 15);
                        //
                        //     canvasContext.fillText(maxTileGraphicIndexY * tileIndexX + tileIndexY, drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 30);
                        // }

                    }

                }

            }
        }
    }


    //COLLISION MESH
    if (false) {
        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(50,50,50,0.4)';
        canvasContext.fillStyle = 'rgba(255,0,0,0.4)';

        for (layer = 0; layer < maxLayer; layer++) {
            for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
                for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

                    drawX = tileIndexX * tileGraphicWidth;
                    drawY = tileIndexY * tileGraphicHeight;
                    tileGraphic = mapModel.getMapCollisionModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                    if (tileGraphic && tileGraphic[layer] !== undefined) {

                        for (var collIndex = 0; collIndex < 16; collIndex++) {

                            //Renderowanie bitowej maski kolizji
                            if ((tileGraphic[layer] >> collIndex) & 1 === 1) {
                                canvasContext.fillRect(drawX - cameraModel.getViewPortX() + Math.floor(collIndex % 4) * 10, drawY - cameraModel.getViewPortY() + Math.floor(collIndex / 4) * 10, 10, 10);
                            }
                        }

                        if (layer === 0) {
                            for (var i = 0; i < 16; i++) {
                                canvasContext.rect(drawX - cameraModel.getViewPortX() + Math.floor(i % 4) * 10, drawY - cameraModel.getViewPortY() + Math.floor(i / 4) * 10, 10, 10);
                            }
                        }

                    }
                }
            }
        }

        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }

    //GRAPHIC MESH
    if (false) {

        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,255,0.1)';
        canvasContext.fillStyle = 'rgba(255,255,255,0.5)';

        for (layer = 0; layer < maxLayer; layer++) {
            for (tileIndexY = startIndexY + 1; tileIndexY < endIndexY - 1; tileIndexY++) {
                for (tileIndexX = starIndexX + 1; tileIndexX < endIndexX - 1; tileIndexX++) {

                    drawX = tileIndexX * tileGraphicWidth;
                    drawY = tileIndexY * tileGraphicHeight;

                    tileGraphic = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                    canvasContext.rect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileGraphicWidth, tileGraphicHeight);
                    canvasContext.fillText(maxTileGraphicIndexY * tileIndexX + tileIndexY, drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 20);
                }
            }
        }

        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }

};

/**
 * @method _drawEntities
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.AbstractWorldView.prototype._drawEntities = function _drawEntities(canvasContext, mapModel, cameraModel) {
    var i,
        max,
        entity,
        hp,
        currentHp;

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapHeight() / tileGraphicHeight),

        tileCollisionWidth = mapModel.getMapCollisionModel().getTileWidth(),
        tileCollisionHeight = mapModel.getMapCollisionModel().getTileHeight(),
        maxTileCollisionIndexX = Math.ceil(mapModel.getMapWidth() / tileCollisionWidth),
        maxTileCollisionIndexY = Math.ceil(mapModel.getMapHeight() / tileCollisionHeight),

        drawX,
        drawY,
        tileGraphic,

        tileCollisionId,
        titleGraphicArray = mapModel.getMapGraphicModel().getTileArray(),

        tileGraphicsData,
        tileImage,
        layer = 0,
        maxLayer = 2,

        curentOnScreen = 0;


    canvasContext.strokeStyle = '#000000';
    canvasContext.lineWidth = 1;

    //RENDEROWANIE INTITY NA PODSTAWIE TILESOW MAPY
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    var rowArray = [];

    for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {

        rowArray = [];

        for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

            tileGraphic = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

            if (tileGraphic && tileGraphic[100]) {

                // rowArray = rowArray.concat(tileGraphic[100]);
                rowArray.extend(tileGraphic[100]);

            }
        }

        rowArray.sort(
            function (a, b) {

                if (a.getY() > b.getY()) {
                    return 1;
                }

                else if (a.getY() < b.getY()) {
                    return -1;
                }

                else if (a.getY() === b.getY()) {
                    if (a.getId() > b.getId()) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            }
        );


        //counting current on screen entities
        curentOnScreen += rowArray.length;

        for (var i = 0; i < rowArray.length; i++) {
            entity = rowArray[i];

            var fogOfWarValueForEntity = mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * Math.floor(entity.getX() / 40) + Math.floor(entity.getY() / 40)];

            if (fogOfWarValueForEntity && fogOfWarValueForEntity.v === 1 && entity.getTeam() > 1) {
                continue;
            }

            //SELECTED
            if (entity.getSelected() && entity.getTeam() === 1) {
                canvasContext.beginPath();
                canvasContext.setLineDash([4]);
                canvasContext.strokeStyle = '#00FF00';
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
                canvasContext.setLineDash([0]);
            }
            else if (entity.getSelected()) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#FFFF90';
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }


            //COLLISION_RADIUS
            if (FEATURE_TOGGLE.COLLISION_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 0, 0, 1.0)";
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //VIEW_RADIUS
            if (FEATURE_TOGGLE.VIEW_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 255, 255, 0.3)";
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius() + entity.getViewRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //SELECT_TARGET_RADIUS
            if (FEATURE_TOGGLE.SELECT_TARGET_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 255, 255, 0.3)";
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius() + entity.getSelectTargetRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //ATTACK_RANGE
            if (FEATURE_TOGGLE.ATTACK_RANGE) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 0, 255, 0.3)";
                canvasContext.arc((entity.getX() - cameraModel.getViewPortX()), entity.getY() - cameraModel.getViewPortY(), entity.getCollisionRadius() + entity.getAttackRange(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //IMAGE
            if (FEATURE_TOGGLE.DRAW_ENTITY) {
                if (entity.getRotateGraphicOnMove()) {
                    this._image.drawRotateImage(canvasContext, graphicsBuffor.get(entity.getGraphicUrl()), entity.getX() - entity.getGraphicOffset().getX() - cameraModel.getViewPortX(), entity.getY() - entity.getGraphicOffset().getY() - cameraModel.getViewPortY(), entity.getAngle());
                } else {

                    var flipHorizontal = true;

                    if (entity.getAngle() > -90 && entity.getAngle() < 90) {
                        flipHorizontal = false;
                    }

                    if (flipHorizontal) {
                        this._image.drawRotateImage(canvasContext, graphicsBuffor.get(entity.getGraphicUrl()), entity.getX() + entity.getGraphicOffset().getX() - cameraModel.getViewPortX(), entity.getY() - entity.getGraphicOffset().getY() - cameraModel.getViewPortY(), 0, flipHorizontal);
                    } else {
                        this._image.drawRotateImage(canvasContext, graphicsBuffor.get(entity.getGraphicUrl()), entity.getX() - entity.getGraphicOffset().getX() - cameraModel.getViewPortX(), entity.getY() - entity.getGraphicOffset().getY() - cameraModel.getViewPortY(), 0, flipHorizontal);
                    }

                }
            }

            if (FEATURE_TOGGLE.MARK_SELECTED_TARGET) {
                if (entity.getTargetEntity() !== null) {

                    canvasContext.beginPath();

                    var moveToX = entity.getX(),
                        moveToY = entity.getY();

                    canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());

                    canvasContext.strokeStyle = "rgba(255, 0, 0, 0.3)";
                    // canvasContext.fillStyle = '#00FF00';
                    canvasContext.lineWidth = 1;

                    moveToX = entity.getTargetEntity().getX();
                    moveToY = entity.getTargetEntity().getY();

                    canvasContext.lineTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());

                    canvasContext.stroke();
                }
            }


            //DRAW ID
            if (FEATURE_TOGGLE.DRAW_ENTITY_ID) {

                canvasContext.fillStyle = "rgba(0, 0, 0, 0.5)";
                canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - entity.getCurrentHp() / 20 - 2, entity.getY() - cameraModel.getViewPortY() + entity.getRadius() - 4 - 9, 30, 11);

                canvasContext.fillStyle = '#FFFFFF';
                canvasContext.fillText("ID: " + entity.getId(), entity.getX() - cameraModel.getViewPortX() - entity.getCurrentHp() / 20, entity.getY() - cameraModel.getViewPortY() + entity.getRadius() - 4);
            }

            //HEALTH BAR
            if (FEATURE_TOGGLE.HEALTH_BAR && entity.getHp() > 1) {
                hp = entity.getHp();
                currentHp = entity.getCurrentHp();

                canvasContext.fillStyle = '#474747';
                canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 20 + currentHp / 10, entity.getY() - cameraModel.getViewPortY() + entity.getRadius(), (hp - currentHp) / 10, 3);

                canvasContext.fillStyle = '#00FF00';
                canvasContext.fillRect(entity.getX() - cameraModel.getViewPortX() - hp / 20, entity.getY() - cameraModel.getViewPortY() + entity.getRadius(), currentHp / 10, 3);

                ////drawRect
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#000000';
                canvasContext.rect(entity.getX() - cameraModel.getViewPortX() - hp / 20, entity.getY() - cameraModel.getViewPortY() + entity.getRadius(), hp / 10, 3);

                canvasContext.lineWidth = 1;
                canvasContext.stroke();
            }

            //PATH
            if (true && entity.getSelected()) {

                var moveList = entity.getMoveList();

                if (moveList != null) {

                    canvasContext.beginPath();

                    var moveToX = entity.getX(),
                        moveToY = entity.getY();

                    canvasContext.moveTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());

                    canvasContext.setLineDash([10]);
                    canvasContext.strokeStyle = "rgba(0, 255, 0, 0.5)";

                    for (var j = 0; j < moveList.length(); j++) {

                        moveToX = moveList.getElement(j).getX();
                        moveToY = moveList.getElement(j).getY();

                        if (moveList.getElement(j).getEntityId() === 0 && moveToX !== -1 && moveToX !== -1) {
                            canvasContext.lineTo(moveToX - cameraModel.getViewPortX(), moveToY - cameraModel.getViewPortY());
                        }

                    }

                    canvasContext.lineWidth = 1;
                    canvasContext.stroke();

                    canvasContext.setLineDash([0]);

                }

            }

            //DEBUG LINES - object
            if (false) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#FF0000';
                canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();

                //object base
                canvasContext.moveTo(entity.getX() - entity.getRadius() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY());
                canvasContext.lineTo(entity.getX() + entity.getRadius() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY());

                // canvasContext.fillStyle = '#FFFFFF';
                // canvasContext.fillRect(moveToX - 2 - cameraModel.getViewPortX(), moveToY - 2 - cameraModel.getViewPortY(), 4, 4);
                canvasContext.stroke();
            }

            //MOVE DESTINATION
            if (false) {
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

            //SLEEPING
            if (false) {
                if (entity.isSleeping()) {
                    canvasContext.beginPath();
                    canvasContext.strokeStyle = '#666666';
                    canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius() - 2, 0, 2 * Math.PI, true);
                    canvasContext.stroke();
                }
                else {
                    canvasContext.beginPath();
                    canvasContext.strokeStyle = '#FFFFFF';
                    canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius() - 2, 0, 2 * Math.PI, true);
                    canvasContext.stroke();
                }
            }

        }


    }

    canvasContext.fillStyle = '#FFFFFF';
    if (timer) {
        canvasContext.fillText("FPS: " + Math.round(1000 / timer.getDelta()), 5, 120);
        canvasContext.fillText("DELTA: " + Math.round(timer.getDelta()), 5, 140);
        this._timeDeltaMemory.splice(0, 0, timer.getDelta());
        this._timeDeltaMemory = this._timeDeltaMemory.splice(0, 100);
    }
    canvasContext.fillText("ENTITY COUNT: " + entityListModel.length(), 5, 160);
    canvasContext.fillText("ENTITY ON SCREEN: " + curentOnScreen, 5, 180);


    canvasContext.fillStyle = '#333333';
    canvasContext.fillRect(0, 0, 100, 100);

    canvasContext.strokeStyle = '#FF0000';


    var avarageDelat = 0;
    var avarageFps = 0;
    canvasContext.beginPath();

    for (var deltaItem = 0; deltaItem < this._timeDeltaMemory.length; deltaItem++) {
        canvasContext.moveTo(deltaItem, 100);
        canvasContext.lineTo(deltaItem, 100 - (this._timeDeltaMemory[deltaItem]) / 2);

        avarageFps = avarageDelat += this._timeDeltaMemory[deltaItem];

    }
    canvasContext.stroke();

    avarageDelat = Math.round(avarageDelat / this._timeDeltaMemory.length);
    avarageFps = Math.round(1000 / (avarageFps / this._timeDeltaMemory.length));

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("avarageDelta: " + avarageDelat, 5, 220);

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("avarageFps: " + avarageFps, 5, 240);


    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("totalElementsToCheck: " + totalElementsToCheck, 5, 280);

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("uniqueElementsToCheck: " + uniqueElementsToCheck, 5, 300);

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("totalArrayExtends: " + totalArrayExtends, 5, 320);



};

/**
 * @method _drawFogOfWar
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.AbstractWorldView.prototype._drawFogOfWar = function _drawFogOfWar(canvasContext, mapModel, cameraModel) {

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth() / FOG_RESOLUTION_MULTIPLIER,
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight() / FOG_RESOLUTION_MULTIPLIER,
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapHeight() / tileGraphicHeight),

        drawX,
        drawY,
        addFOWEffect;

    //MAP IMAGES
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
        for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

            addFOWEffect = mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY];

            drawX = tileIndexX * tileGraphicWidth;
            drawY = tileIndexY * tileGraphicHeight;

            if (addFOWEffect.v > 0) {
                canvasContext.fillStyle = 'rgba(0,0,0,' + 0.4 * addFOWEffect.v + ')';
                canvasContext.fillRect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), tileGraphicWidth, tileGraphicHeight);

            }
        }
    }
};

/**
 * @method _initEnitityOnMapArray
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.MapModel} mapModel
 */
app.view.AbstractWorldView.prototype._initEnitityOnMapArray = function _initEnitityOnMapArray(entityListModel, mapModel) {

    var layer = 100,
        tileIndexX,
        tileIndexY,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight);

    //Init tablicy
    for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
        for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {

            if (mapModel.getMapGraphicModel()._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
                mapModel.getMapGraphicModel()._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
            }

            mapModel.getMapGraphicModel()._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer] = [];

        }
    }
};

/**
 * @method _updateEnitityOnMapArray
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.MapModel} mapModel
 */
app.view.AbstractWorldView.prototype._updateEnitityOnMapArray = function _updateEnitityOnMapArray(entityListModel, mapModel) {

    var layer = 100,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight),
        max,
        entity,
        targetTileX,
        targetTileY,
        calculatedPossiotionX,
        calculatedPossiotionY;

    this._initEnitityOnMapArray(entityListModel, mapModel);

    max = entityListModel.length();


    for (var i = 0; i < max; i++) {
        entity = entityListModel.getElement(i);
        //PUSH
        calculatedPossiotionX = entity.getX();
        calculatedPossiotionY = entity.getY();

        targetTileX = Math.floor(calculatedPossiotionX / tileGraphicWidth);
        targetTileY = Math.floor(calculatedPossiotionY / tileGraphicHeight);

        //tile X Y
        targetTileX = Math.max(targetTileX, 0);
        targetTileY = Math.max(targetTileY, 0);

        //tile X Y
        targetTileX = Math.min(targetTileX, maxTileGraphicIndexX - 1);
        targetTileY = Math.min(targetTileY, maxTileGraphicIndexY - 1);


        //Dokladanie entity do tabeli
        mapModel.getMapGraphicModel()._rootTileArray[maxTileGraphicIndexY * targetTileX + targetTileY][layer].push(entity);
    }

};

/**
 * @method _initFogOfWarTileArray
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.MapModel} mapModel
 */
app.view.AbstractWorldView.prototype._initFogOfWarTileArray = function _initFogOfWarTileArray(entityListModel, mapModel) {

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth() / FOG_RESOLUTION_MULTIPLIER,
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight() / FOG_RESOLUTION_MULTIPLIER,
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight);

    //Init tablicy
    for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
        for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
            mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = {
                "v": 1,
                "r": 0
            };
        }
    }
};

/**
 * @method _prepareFogOfWar
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.MapModel} mapModel
 */
app.view.AbstractWorldView.prototype._prepareFogOfWar = function _prepareFogOfWar(entityListModel, mapModel) {

    var tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth() / FOG_RESOLUTION_MULTIPLIER,
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight() / FOG_RESOLUTION_MULTIPLIER,
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight),
        max,
        entity,
        targetTileX,
        targetTileY,
        c1 = new support.geom.Circle(0, 0, 0),
        c2 = new support.geom.Circle(0, 0, 0);

    this._initFogOfWarTileArray(entityListModel, mapModel);

    max = entityListModel.length();

    for (var i = 0; i < max; i++) {
        entity = entityListModel.getElement(i);

        if (entity.getTeam() !== 1) {
            continue;
        }

        targetTileX = Math.floor(entity.getX() / tileGraphicWidth);
        targetTileY = Math.floor(entity.getY() / tileGraphicHeight);

        var entityViewRange = Math.floor(entity.getViewRadius() / tileGraphicWidth);
        var minViewRange = Math.floor(-entityViewRange);
        var maxViewRange = Math.floor(entityViewRange);

        //EntityViewRange
        // c1.setX(targetTileX);
        // c1.setY(targetTileY);
        // c1.setRadius(entityViewRange);

        c1.setX(entity.getX());
        c1.setY(entity.getY());
        c1.setRadius(entity.getViewRadius());

        c2.setRadius(1);

        for (var j = minViewRange; j <= maxViewRange; j++) {
            for (var k = minViewRange; k <= maxViewRange; k++) {

                var currentTargetTileX = targetTileX + j;
                var currentTargetTileY = targetTileY + k;

                //If Rect is in range show it (now fog of war)
                //CircleCircle collision form optimalization perpouse
                // c2.setX(currentTargetTileX);
                // c2.setY(currentTargetTileY);

                c2.setX(currentTargetTileX * 40);
                c2.setY(currentTargetTileY * 40);

                var collision = support.geom.collision.Collision.CircleCircleFastWithDistanceSquer(c1, c2);

                if (collision.result) {
                    // console.log(collision.result);
                    this._prepareFogOfWarSetResult(mapModel, currentTargetTileX, currentTargetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY, collision);
                }

            }
        }

        // var FOWArrayForViewRange = this._getFOWArrayForViewRange(entityViewRange);
        //
        // this._putToFOWGlobalArray(FOWArrayForViewRange, mapModel, minViewRange, maxViewRange, targetTileX, targetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY);

    }

};

app.view.AbstractWorldView.prototype._prepareFogOfWarSetResult = function _prepareFogOfWarSetResult(mapModel, currentTargetTileX, currentTargetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY, collision) {
    //tile X Y
    currentTargetTileX = Math.max(currentTargetTileX, 0);
    currentTargetTileY = Math.max(currentTargetTileY, 0);

    //tile X Y
    currentTargetTileX = Math.min(currentTargetTileX, maxTileGraphicIndexX - 1);
    currentTargetTileY = Math.min(currentTargetTileY, maxTileGraphicIndexY - 1);

    // var fogOfWarCurrentValue = mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * currentTargetTileX + currentTargetTileY].v;
    //var proportion = Math.sqrt(collision.sd) / Math.sqrt(collision.radiusPow);
    // var proportion = collision.sd / collision.radiusPow; //bardziej ostre zakonczenie ale duzo bardziej wydaje
    // var start = 0.8;
    // var end = 1;
    // var fowValue = 0;

    var fowValue = 0;

    // if (proportion < start) {
    //     fowValue = 0;
    // } else {
    //     fowValue = (proportion - start) * (1 / (1 - start));
    // }


    // console.log(fowValue);

    //Dokladanie entity do tabeli
    mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * currentTargetTileX + currentTargetTileY].v = fowValue;
};

app.view.AbstractWorldView.prototype._getFOWArrayForViewRange = function _getFOWArrayForViewRange(viewRange) {

    var viewRangeString = viewRange.toString();

    if (this._FOWBuffoer[viewRangeString] === undefined) {
        this._FOWBuffoer[viewRangeString] = this._createFOWArrayForRange(viewRange);
    }

    return this._FOWBuffoer[viewRangeString];

};


app.view.AbstractWorldView.prototype._putToFOWGlobalArray = function _putToFOWGlobalArray(FOWArrayForViewRange, mapModel, minViewRange, maxViewRange, targetTileX, targetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY) {

    for (var j = minViewRange; j <= maxViewRange; j++) {
        for (var k = minViewRange; k <= maxViewRange; k++) {

            var currentTargetTileX = targetTileX + j;
            var currentTargetTileY = targetTileY + k;
            var tileValueToSet = FOWArrayForViewRange[8 * (k + maxViewRange) + j + maxViewRange];

            this._prepareFogOfWarSetResultNew(tileValueToSet, mapModel, currentTargetTileX, currentTargetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY);
        }
    }

};

app.view.AbstractWorldView.prototype._createFOWArrayForRange = function _createFOWArrayForRange(viewRange) {

    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

};

app.view.AbstractWorldView.prototype._prepareFogOfWarSetResultNew = function _prepareFogOfWarSetResultNew(tileValueToSet, mapModel, currentTargetTileX, currentTargetTileY, maxTileGraphicIndexX, maxTileGraphicIndexY) {
    //tile X Y
    currentTargetTileX = Math.max(currentTargetTileX, 0);
    currentTargetTileY = Math.max(currentTargetTileY, 0);

    //tile X Y
    currentTargetTileX = Math.min(currentTargetTileX, maxTileGraphicIndexX - 1);
    currentTargetTileY = Math.min(currentTargetTileY, maxTileGraphicIndexY - 1);

    var fogOfWarCurrentValue = mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * currentTargetTileX + currentTargetTileY].v;

    //Dokladanie entity do tabeli
    mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * currentTargetTileX + currentTargetTileY].v = Math.min(fogOfWarCurrentValue, tileValueToSet);
};