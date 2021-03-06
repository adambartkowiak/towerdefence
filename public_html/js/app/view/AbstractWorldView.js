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
     * @property {app.model.ObjectiveListModel} objectiveListModel
     * @private
     */
    this._objectiveListModel = worldModel.getObjectiveListModel();

    /**
     *
     */
    this._timeDeltaMemory = [];
    this._logicTimeDeltaMemory = [];
    this._rendererTimeDeltaMemory = [];

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

    this._frameProgress = 0;

    this._entitiesOnScreen = 0;

    this._entityOnMapArray = [];

};

Utils.inherits(app.view.AbstractWorldView, support.view.AbstractView);


/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
app.view.AbstractWorldView.prototype.draw = function draw(canvas) {

    var parent = this.getParentViewGroup();

    while (parent.getParentViewGroup() !== null) {
        parent = parent.getParentViewGroup();
    }

    if (parent !== null) {
        this._frameProgress = parent._delta / parent._physicStepInMilis;
    }

    // console.log(parent._delta);
    // console.log(parent._physicStepInMilis);

    var canvasContext = canvas.getContext("2d");
    // canvasContext.font = "12px Arial";
    canvasContext.font = "12px silkscreennormal";

    // canvasContext.imageSmoothingEnabled = false;
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

    this._drawFpsMeter(canvasContext);

    this._objectiveWindow(canvasContext);

    if (this._worldModel._showVictoryPopup){
        this._showVictoryPopup(canvasContext);
    }

    canvasContext.font = "12px silkscreennormal";

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

    //MAP
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    var currentRenderTime = new Date().getTime();

    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {
            for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

                tileGraphic = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {

                    tileGraphicsData = mapModel.getMapGraphicModel().getRootTileArray()[maxTileGraphicIndexY * (tileIndexX + tileGraphic[layer].x) + (tileIndexY + tileGraphic[layer].y)][layer];

                    drawX = (tileIndexX + tileGraphic[layer].x) * tileGraphicWidth;
                    drawY = (tileIndexY + tileGraphic[layer].y) * tileGraphicHeight;

                    if (tileGraphicsData.src !== null && tileGraphicsData.renderTime < currentRenderTime) {

                        tileGraphicsData.renderTime = currentRenderTime;
                        tileImage = graphicsBuffor.get(tileGraphicsData.src);

                        if (tileImage !== null) {
                            canvasContext.drawImage(tileImage, drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY());

                            // if (tileGraphic[layer].x !== 0 || tileGraphic[layer].y !== 0) {
                            //     canvasContext.fillStyle = 'rgba(255,255,0,0.5)';
                            //     drawX = tileIndexX * tileGraphicWidth;
                            //     drawY = tileIndexY * tileGraphicHeight;
                            //     canvasContext.fillRect(drawX - cameraModel.getViewPortX(), drawY - cameraModel.getViewPortY(), 40, 40);
                            // }

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
                    //canvasContext.fillText(maxTileGraphicIndexY * tileIndexX + tileIndexY, drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 20);
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
        maxLayer = 2;


    this._entitiesOnScreen = 0;

    canvasContext.strokeStyle = '#000000';
    canvasContext.lineWidth = 1;

    //RENDEROWANIE ENTITY NA PODSTAWIE TILESOW MAPY
    var starIndexX = parseInt(Math.max(0, cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = parseInt(Math.max(0, cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(Math.min(cameraModel.getViewPortX() / tileGraphicWidth + this.getWidth() / tileGraphicWidth + 2, maxTileGraphicIndexX));
    var endIndexY = parseInt(Math.min(cameraModel.getViewPortY() / tileGraphicHeight + this.getHeight() / tileGraphicHeight + 2, maxTileGraphicIndexY));

    var rowArray = [];

    for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {

        rowArray = [];

        for (tileIndexX = starIndexX; tileIndexX < endIndexX; tileIndexX++) {

            tileGraphic = this._entityOnMapArray[maxTileGraphicIndexY * tileIndexX + tileIndexY];

            if (tileGraphic) {
                rowArray.extend(tileGraphic);
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
        this._entitiesOnScreen += rowArray.length;

        for (var i = 0; i < rowArray.length; i++) {
            entity = rowArray[i];

            var fogOfWarValueForEntity = mapModel.getMapGraphicModel()._fogOfWarTileArray[maxTileGraphicIndexY * Math.floor(entity.getX() / 40) + Math.floor(entity.getY() / 40)];

            if (fogOfWarValueForEntity && fogOfWarValueForEntity.v === 1 && entity.getTeam() > 1) {
                continue;
            }

            var interpolatedEntityX = entity.getX() * this._frameProgress + entity.getLastPosition().getX() * (1 - this._frameProgress);
            var interpolatedEntityY = entity.getY() * this._frameProgress + entity.getLastPosition().getY() * (1 - this._frameProgress);

            var drawEntityX = interpolatedEntityX - cameraModel.getViewPortX();
            var drawEntityY = interpolatedEntityY - cameraModel.getViewPortY();

            drawEntityX = Math.round(drawEntityX);
            drawEntityY = Math.round(drawEntityY);

            //SELECTED
            if (entity.getSelected() && entity.getTeam() === 1) {
                canvasContext.beginPath();
                canvasContext.setLineDash([4]);
                canvasContext.strokeStyle = '#00FF00';
                canvasContext.arc((drawEntityX), drawEntityY, entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
                canvasContext.setLineDash([0]);
            }
            else if (entity.getSelected()) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#FFFF90';
                canvasContext.arc(drawEntityX, drawEntityY, entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }


            //COLLISION_RADIUS
            if (FEATURE_TOGGLE.COLLISION_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 0, 0, 1.0)";
                canvasContext.arc(drawEntityX, drawEntityY, entity.getCollisionRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //VIEW_RADIUS
            if (FEATURE_TOGGLE.VIEW_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 255, 255, 0.3)";
                canvasContext.arc(drawEntityX, drawEntityY, entity.getCollisionRadius() + entity.getViewRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //SELECT_TARGET_RADIUS
            if (FEATURE_TOGGLE.SELECT_TARGET_RADIUS) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 255, 255, 0.3)";
                canvasContext.arc(drawEntityX, drawEntityY, entity.getCollisionRadius() + entity.getSelectTargetRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //ATTACK_RANGE
            if (FEATURE_TOGGLE.ATTACK_RANGE) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = "rgba(255, 0, 255, 0.3)";
                canvasContext.arc(drawEntityX, drawEntityY, entity.getCollisionRadius() + entity.getAttackRange(), 0, 2 * Math.PI, true);
                canvasContext.stroke();
            }

            //IMAGE
            if (FEATURE_TOGGLE.DRAW_ENTITY) {

                var graphicUrl = graphicsBuffor.get(entity.getGraphicUrl());

                if (entity.getRotateGraphicOnMove()) {
                    this._image.drawRotateImage(canvasContext, graphicUrl, drawEntityX - entity.getGraphicOffset().getX(), drawEntityY - entity.getGraphicOffset().getY(), entity.getAngle());
                } else {

                    var flipHorizontal = false;
                    if (entity.getAngle() > -90 && entity.getAngle() < 90) {
                        flipHorizontal = true;
                    }

                    if (flipHorizontal) {
                        this._image.drawRotateImage(canvasContext, graphicUrl, drawEntityX + entity.getGraphicOffset().getX(), drawEntityY - entity.getGraphicOffset().getY(), 0, flipHorizontal);
                    } else {
                        this._image.drawRotateImage(canvasContext, graphicUrl, drawEntityX - entity.getGraphicOffset().getX(), drawEntityY - entity.getGraphicOffset().getY(), 0, flipHorizontal);
                    }
                }

            }

            if (FEATURE_TOGGLE.MARK_SELECTED_TARGET) {
                if (entity.getTargetEntity() !== null) {

                    canvasContext.beginPath();

                    var moveToX = entity.getX(),
                        moveToY = entity.getY();

                    canvasContext.moveTo(drawEntityX, drawEntityY);

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
                canvasContext.fillRect(drawEntityX - entity.getCurrentHp() / 20 - 2, drawEntityY + entity.getRadius() - 4 - 9, 30, 11);

                canvasContext.fillStyle = '#FFFFFF';
                canvasContext.fillText("ID: " + entity.getId(), drawEntityX - entity.getCurrentHp() / 20, drawEntityY + entity.getRadius() - 4);
            }

            //HEALTH BAR
            if (FEATURE_TOGGLE.HEALTH_BAR && entity.getHp() > 1) {
                hp = entity.getHp();
                currentHp = entity.getCurrentHp();

                canvasContext.fillStyle = '#474747';
                canvasContext.fillRect(drawEntityX - hp / 20 + currentHp / 10, drawEntityY + entity.getRadius(), (hp - currentHp) / 10, 3);

                canvasContext.fillStyle = '#00FF00';
                canvasContext.fillRect(drawEntityX - hp / 20, drawEntityY + entity.getRadius(), currentHp / 10, 3);

                ////drawRect
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#000000';
                canvasContext.rect(drawEntityX - hp / 20, drawEntityY + entity.getRadius(), hp / 10, 3);

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

                    canvasContext.moveTo(drawEntityX, drawEntityY);

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
                canvasContext.arc(drawEntityX, drawEntityY, entity.getRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();

                //object base
                canvasContext.moveTo(drawEntityX - entity.getRadius(), drawEntityY);
                canvasContext.lineTo(drawEntityX + entity.getRadius(), drawEntityY);

                // canvasContext.fillStyle = '#FFFFFF';
                // canvasContext.fillRect(moveToX - 2 - cameraModel.getViewPortX(), moveToY - 2 - cameraModel.getViewPortY(), 4, 4);
                canvasContext.stroke();
            }

            //MOVE DESTINATION
            if (false) {
                canvasContext.beginPath();
                canvasContext.strokeStyle = '#00bfff';
                canvasContext.arc(drawEntityX, drawEntityY, entity.getMoveCollisionDetectionRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();

                canvasContext.beginPath();
                canvasContext.strokeStyle = '#FF0000';
                canvasContext.arc(drawEntityX, drawEntityY, entity.getCollisionRadius(), 0, 2 * Math.PI, true);
                canvasContext.stroke();

                var moveToX = entity.getX(),
                    moveToY = entity.getY(),
                    moveVectorX = entity.getLastPosition().getX(),
                    moveVectorY = entity.getLastPosition().getY();

                canvasContext.moveTo(drawEntityX, drawEntityY);
                canvasContext.lineTo(moveVectorX - cameraModel.getViewPortX(), moveVectorY - cameraModel.getViewPortY());

                canvasContext.fillStyle = '#FFFFFF';
                canvasContext.fillRect(drawEntityX - 2, drawEntityY - 2, 4, 4);
                canvasContext.stroke();
            }

            //SLEEPING
            if (false) {
                if (entity.isSleeping()) {
                    canvasContext.beginPath();
                    canvasContext.strokeStyle = '#666666';
                    canvasContext.arc(drawEntityX, drawEntityY, entity.getRadius() - 2, 0, 2 * Math.PI, true);
                    canvasContext.stroke();
                }
                else {
                    canvasContext.beginPath();
                    canvasContext.strokeStyle = '#FFFFFF';
                    canvasContext.arc(drawEntityX, drawEntityY, entity.getRadius() - 2, 0, 2 * Math.PI, true);
                    canvasContext.stroke();
                }
            }

        }

    }

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
 * @method _drawFpsMeter
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 */
app.view.AbstractWorldView.prototype._drawFpsMeter = function _drawFpsMeter(canvasContext) {

    var averageLogicDelta = 0,
        averageRendererDelta = 0,
        averageDelta = 0,
        averageFps = 0,
        logicDeltaCount = 0,
        MEMORY_SIZE = 200,
        fpsMeterHeight = 100;

    //Update Timer
    rendererTimer.updateDelta();

    canvasContext.fillStyle = '#FFFFFF';

    //Calculate Delta
    this._timeDeltaMemory.splice(0, 0, timer.getDelta());
    this._timeDeltaMemory = this._timeDeltaMemory.splice(0, MEMORY_SIZE);

    this._logicTimeDeltaMemory.splice(0, 0, logicTimer.getDelta());
    this._logicTimeDeltaMemory = this._logicTimeDeltaMemory.splice(0, MEMORY_SIZE);

    this._rendererTimeDeltaMemory.splice(0, 0, rendererTimer.getDelta());
    this._rendererTimeDeltaMemory = this._rendererTimeDeltaMemory.splice(0, MEMORY_SIZE);

    //average delta
    for (var deltaItem = 0; deltaItem < this._timeDeltaMemory.length; deltaItem++) {
        averageFps = averageDelta += this._timeDeltaMemory[deltaItem];
        averageRendererDelta += this._rendererTimeDeltaMemory[deltaItem];

        if (this._logicTimeDeltaMemory[deltaItem] > 0) {
            averageLogicDelta += this._logicTimeDeltaMemory[deltaItem];
            logicDeltaCount++;
        }
    }

    //Draw Fps Meter
    canvasContext.fillStyle = 'rgba(0,0,0,0.7)';
    canvasContext.fillRect(0, 0, MEMORY_SIZE, 100);

    canvasContext.beginPath();
    for (var deltaItem = 0; deltaItem < this._timeDeltaMemory.length; deltaItem++) {

        canvasContext.strokeStyle = 'rgba(192,192,192,0.5)';
        canvasContext.moveTo(deltaItem, fpsMeterHeight);
        canvasContext.lineTo(deltaItem, fpsMeterHeight - (this._timeDeltaMemory[deltaItem]));


    }
    canvasContext.stroke();

    canvasContext.beginPath();
    for (var deltaItem = 0; deltaItem < this._timeDeltaMemory.length; deltaItem++) {

        canvasContext.strokeStyle = '#76FF03';
        canvasContext.moveTo(deltaItem, fpsMeterHeight);
        canvasContext.lineTo(deltaItem, fpsMeterHeight - (this._rendererTimeDeltaMemory[deltaItem]));


    }
    canvasContext.stroke();

    canvasContext.beginPath();
    for (var deltaItem = 0; deltaItem < this._timeDeltaMemory.length; deltaItem++) {

        canvasContext.strokeStyle = '#2979FF';
        canvasContext.moveTo(deltaItem, fpsMeterHeight - (this._rendererTimeDeltaMemory[deltaItem]));
        canvasContext.lineTo(deltaItem, fpsMeterHeight - (this._rendererTimeDeltaMemory[deltaItem] + this._logicTimeDeltaMemory[deltaItem]));
    }
    canvasContext.stroke();

    // //FPSMeter 20ms
    // canvasContext.strokeStyle = 'rgba(255,255,255,0.8)';
    // canvasContext.moveTo(0, fpsMeterHeight - 20);
    // canvasContext.lineTo(MEMORY_SIZE, fpsMeterHeight - 20);
    //
    // //FPSMeter 40ms
    // canvasContext.strokeStyle = 'rgba(255,255,255,0.8)';
    // canvasContext.moveTo(0, fpsMeterHeight - 40);
    // canvasContext.lineTo(MEMORY_SIZE, fpsMeterHeight - 40);
    //
    // //FPSMeter 60ms
    // canvasContext.strokeStyle = 'rgba(255,255,255,0.8)';
    // canvasContext.moveTo(0, fpsMeterHeight - 60);
    // canvasContext.lineTo(MEMORY_SIZE, fpsMeterHeight - 60);
    //
    // //FPSMeter 80ms
    // canvasContext.strokeStyle = 'rgba(255,255,255,0.8)';
    // canvasContext.moveTo(0, fpsMeterHeight - 80);
    // canvasContext.lineTo(MEMORY_SIZE, fpsMeterHeight - 80);
    //
    // canvasContext.stroke();


    //Statistic Data
    canvasContext.fillStyle = 'rgba(0,0,0,0.4)';
    canvasContext.fillRect(0, 105, 180, 180);

    canvasContext.fillStyle = '#FFFFFF';
    canvasContext.fillText("FPS: " + Math.round(1000 / timer.getDelta()), 5, 120);
    canvasContext.fillText("LOOP DELTA: " + Math.round(timer.getDelta()), 5, 135);
    canvasContext.fillText("LOGIC DELTA: " + Math.round(logicTimer.getDelta()), 5, 150);
    canvasContext.fillText("RENDERER DELTA: " + Math.round(rendererTimer.getDelta()), 5, 165);

    averageFps = Math.round(1000 / (averageFps / this._timeDeltaMemory.length));
    averageDelta = Math.round(averageDelta / this._timeDeltaMemory.length);
    averageLogicDelta = Math.round(averageLogicDelta / logicDeltaCount);
    averageRendererDelta = Math.round(averageRendererDelta / this._timeDeltaMemory.length);

    canvasContext.fillText("AVG FPS: " + averageFps, 5, 190);
    canvasContext.fillText("AVG DELTA: " + averageDelta, 5, 205);
    canvasContext.fillText("AVG DELTA LOGIC: " + averageLogicDelta, 5, 220);
    canvasContext.fillText("AVG DELTA RENDERER: " + averageRendererDelta, 5, 235);


    canvasContext.fillText("ENTITY COUNT: " + this._worldModel.getEntityListModel().length(), 5, 260);
    canvasContext.fillText("ENTITY ON SCREEN: " + this._entitiesOnScreen, 5, 275);
};


/**
 * @method _objectiveWindow
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 */
app.view.AbstractWorldView.prototype._objectiveWindow = function _objectiveWindow(canvasContext) {

    var objective,
        index,
        textX = 5,
        textY = 320,
        textYStep = 20,
        objectiveCount = this._objectiveListModel.length();


    for (index = 0; index < objectiveCount; index++){

        canvasContext.fillStyle = '#FFFFFF';
        objective = this._objectiveListModel.getElement(index);

        canvasContext.fillText(objective.getMessage(), textX + 15, textY);

        canvasContext.beginPath();
        canvasContext.strokeStyle = '#FFFFFF';
        canvasContext.rect(textX, textY + 2, 11, -11);

        canvasContext.lineWidth = 1;
        canvasContext.stroke();

        if (objective.getFinished()){
            if (objective.getResult()){
                canvasContext.fillStyle = '#00FF00';
                canvasContext.fillText("o", textX+1, textY);
            } else {
                canvasContext.fillStyle = '#FF0000';
                canvasContext.fillText("X", textX+1, textY);
            }
        }

        textY += textYStep;
    }

};
/**
 * @method _showVictoryPopup
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 */
app.view.AbstractWorldView.prototype._showVictoryPopup = function _showVictoryPopup(canvasContext) {

    var textX = 300,
        textY = 320;

        canvasContext.font = "120px silkscreennormal";
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.fillText("VICTORY!", textX, textY);


};

/**
 * @method _initEnitityOnMapArray
 * @private
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.MapModel} mapModel
 */
app.view.AbstractWorldView.prototype._initEnitityOnMapArray = function _initEnitityOnMapArray(entityListModel, mapModel) {

    var tileIndex,
        tileGraphicWidth = mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(mapModel.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(mapModel.getMapGraphicModel().getMapHeight() / tileGraphicHeight),
        tileIndexMax = maxTileGraphicIndexX * maxTileGraphicIndexY;

    for (tileIndex = 0; tileIndex < tileIndexMax; tileIndex++) {
        this._entityOnMapArray[tileIndex] = [];
    }

}
;

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

        calculatedPossiotionX = entity.getX();
        calculatedPossiotionY = entity.getY();

        targetTileX = Math.floor(calculatedPossiotionX / tileGraphicWidth);
        targetTileY = Math.floor(calculatedPossiotionY / tileGraphicHeight);

        //tileX
        if (targetTileX < 0 || targetTileX > maxTileGraphicIndexX) {
            targetTileX = Math.max(targetTileX, 0);
            targetTileX = Math.min(targetTileX, maxTileGraphicIndexX - 1);
        }

        //tile Y
        if (targetTileY < 0 || targetTileY > maxTileGraphicIndexY) {
            targetTileY = Math.max(targetTileY, 0);
            targetTileY = Math.min(targetTileY, maxTileGraphicIndexY - 1);
        }

        //Dokladanie entity do tabeli
        this._entityOnMapArray[maxTileGraphicIndexY * targetTileX + targetTileY].push(entity);
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