/**
 * Created by adambartkowiak on 28/01/16.
 */

'use strict';

var app = app || {};
app.view = app.view || {};

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

    this._drawMap(canvasContext, this._worldModel.getMapModel(), this._worldModel.getCameraModel());
    this._drawEntities(canvasContext, this._worldModel.getEntityListModel(), this._worldModel.getCameraModel());

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
    //Optymalizacja PETLI TUTAJ POWINNA BYC !!!
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

                        if (layer === 1) {
                            canvasContext.fillStyle = 'rgba(255,255,255,1)';
                            var stringLength = tileGraphicsData.src.length;
                            var pathLength = "assets/graphics/images/".length;
                            var formatLength = 4;
                            canvasContext.fillText(tileGraphicsData.src.substring(pathLength, stringLength - formatLength), drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 15);

                            canvasContext.fillText(maxTileGraphicIndexY * tileIndexX + tileIndexY, drawX - cameraModel.getViewPortX() + 5, drawY - cameraModel.getViewPortY() + 30);
                        }

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
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.AbstractWorldView.prototype._drawEntities = function _drawEntities(canvasContext, entityListModel, cameraModel) {
    var i,
        max,
        entity,
        hp,
        currentHp;


    /*
     sorotowanie obiektów do narysowania przed narysowaniem aby uzyskac efekt glebii
     */
    entityListModel.getElements().sort(
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


    //-------------------

    canvasContext.strokeStyle = '#000000';
    canvasContext.lineWidth = 1;


    /*
     renderowanie juz posortowanych obiektów
     */

    max = entityListModel.length();
    for (i = 0; i < max; i++) {
        entity = entityListModel.getElement(i);

        //IMAGE
        this._image.drawRotateImage(canvasContext, graphicsBuffor.get(entity.getGraphicUrl()), entity.getX() - entity.getGraphicOffset().getX() - cameraModel.getViewPortX(), entity.getY() - entity.getGraphicOffset().getY() - cameraModel.getViewPortY(), entity.getAngle());

        //SELECTED
        if (entity._selected && entity.getTeam() === 1) {
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#00FF00';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();
        }
        else if (entity._selected) {
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#FFFF90';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();
        }

        //HEALTH BAR
        if (true && entity.getHp() > 1) {
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
        if (true && entity.getSelected()) {

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
        if (false) {
            canvasContext.beginPath();
            canvasContext.strokeStyle = '#FF0000';
            canvasContext.arc(entity.getX() - cameraModel.getViewPortX(), entity.getY() - cameraModel.getViewPortY(), entity.getRadius(), 0, 2 * Math.PI, true);
            canvasContext.stroke();
        }

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

    }

    canvasContext.fillStyle = '#FFFFFF';
    //canvasContext.fillText("FPS: " + Math.round(1000/timer.getDelta()), 5, 20);
    canvasContext.fillText("ENTITY COUNT: " + max, 5, 40);

};
