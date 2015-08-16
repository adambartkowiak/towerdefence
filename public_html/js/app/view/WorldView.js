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

    /**
     * @property {Boolean} _drawMiniMap
     * @private
     */
    this._drawMiniMap = true;

};

Utils.inherits(app.view.WorldView, Object);

/**
 * @method draw
 * @@param {Number} logicFrames
 * @public
 */
app.view.WorldView.prototype.draw = function draw() {

    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._canvasContext.fillStyle = '#999999';
    this._canvasContext.drawImage(this._backgroundImage, 0, 0, 700, 500);


    this._drawEntities(this._worldModel.getEntityListModel());

};


/**
 * @method _drawEntities
 * @private
 * @param {app.model.ListModel} entityListModel
 */
app.view.WorldView.prototype._drawEntities = function _drawEntities(entityListModel) {
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
        this._image.drawRotateImage(this._canvasContext, this._entityImage[entity.getGraphicUrl()], entity.getX(), entity.getY(), entity.getAngle());

        //SELECTED
        if (entity._selected) {
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#00FF00';
            this._canvasContext.arc(entity.getX(), entity.getY(), entity.getRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();
        }

        //HEALTH BAR
        if (this._drawHealthBar && entity.getHp() > 1) {
            hp = entity.getHp();
            currentHp = entity.getCurrentHp();

            this._canvasContext.fillStyle = '#474747';
            this._canvasContext.fillRect(entity.getX() - hp / 10 + currentHp / 5, entity.getY() - 20, (hp - currentHp) / 5, 3);

            this._canvasContext.fillStyle = '#00FF00';
            this._canvasContext.fillRect(entity.getX() - hp / 10, entity.getY() - 20, currentHp / 5, 3);

            ////drawRect
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#000000';
            this._canvasContext.rect(entity.getX() - hp / 10, entity.getY() - 20, hp / 5, 3);

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

                this._canvasContext.moveTo(moveToX, moveToY);

                this._canvasContext.strokeStyle = '#00FF00';
                this._canvasContext.fillStyle = '#00FF00';

                for (var j = 0; j < moveList.length(); j++) {

                    moveToX = moveList.getElement(j).getX();
                    moveToY = moveList.getElement(j).getY();

                    if (moveList.getElement(j).getEntityId() === 0 && moveToX !== -1 && moveToX !== -1) {
                        this._canvasContext.lineTo(moveToX, moveToY);
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
            this._canvasContext.arc(entity.getX(), entity.getY(), entity.getRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#00bfff';
            this._canvasContext.arc(entity.getX(), entity.getY(), entity.getMoveCollisionDetectionRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#FF0000';
            this._canvasContext.arc(entity.getX(), entity.getY(), entity.getCollisionRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.stroke();

            var moveToX = entity.getX(),
                moveToY = entity.getY(),
                moveVectorX = entity.getLastPosition().getX(),
                moveVectorY = entity.getLastPosition().getY();

            this._canvasContext.moveTo(moveToX, moveToY);
            this._canvasContext.lineTo(moveVectorX, moveVectorY);

            this._canvasContext.fillStyle = '#FFFFFF';
            this._canvasContext.fillRect(moveToX - 2, moveToY - 2, 4, 4);
            this._canvasContext.stroke();

            //this._canvasContext.fillStyle = '#aaaaaa';
            //this._canvasContext.fillRect(entity.getX(), entity.getY() - 40, 30, 15);
            //
            //this._canvasContext.fillStyle = '#FF0000';
            //this._canvasContext.fillText("ID: " + entity.getId(), entity.getX(), entity.getY() - 30);
        }

    }

    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("ENTITY COUNT: " + max, 0, 20);


    //RYSOWANIE ZAZNACZONEGO MIEJSCA

    var selectRect = this._worldModel.getSelectRect();
    if (selectRect !== null) {
        this._canvasContext.fillStyle = '#00FF00';
        this._canvasContext.globalAlpha = 0.5;
        this._canvasContext.fillRect(selectRect.getX(), selectRect.getY(), selectRect.getWidth(), selectRect.getHeight());
        this._canvasContext.globalAlpha = 1;
    }


    var miniMapSize = 150;


    //RYSOWANIE HUDA
    if (this._drawHud) {


        var hudHeight = 50;
        var hudTop = this._canvas.height - hudHeight;

        this._canvasContext.fillStyle = '#444444';
        this._canvasContext.fillRect(0, hudTop, this._canvas.width, hudHeight);

        this._canvasContext.fillStyle = '#FFFFFF';
        this._canvasContext.fillText("EntityStats:", miniMapSize + 10, hudTop + 10);

        this._canvasContext.fillStyle = '#FFFFFF';
        this._canvasContext.fillText("EntityModelIndex: " + app.model.EntityModelIndex.ENTITY_MODEL_INDEX, miniMapSize + 160, hudTop + 10);


        //Zaznaczanie
        var selectedElementLength = this._worldModel.getSelectedEntityListModel().length();
        if (selectedElementLength === 1) {

            var selectedElement = this._worldModel.getSelectedEntityListModel().getElement(0);
            //HP
            this._canvasContext.fillText("HP: " + selectedElement.getCurrentHp() + "/" + selectedElement.getHp(), miniMapSize + 10, hudTop + 40);

            var buildList = selectedElement.getBuildList();
            if (buildList !== null) {
                var buildListIndex;
                var buildListLength = buildList.length();
                var buildListElement = null;

                for (buildListIndex = 0; buildListIndex < buildListLength; buildListIndex++) {
                    buildListElement = buildList.getElement(buildListIndex);
                    this._canvasContext.fillText("BUILDING: " + buildListElement.getCurrentBuildTime() + "/" + buildListElement.getBuildTime(), miniMapSize + 10, hudTop + 25 + 20 * buildListIndex);
                }
            }


        } else if (selectedElementLength > 1) {

            this._canvasContext.fillText("SELECTED COUNT: " + selectedElementLength, miniMapSize + 10, hudTop + 40);

        }

    }

    //MAP
    if (this._drawMiniMap) {

        this._canvasContext.fillStyle = '#000000';
        this._canvasContext.fillRect(0, this._canvas.height - miniMapSize, miniMapSize, miniMapSize);

        var longerEdge = Math.max(this._canvas.width, this._canvas.height);

        var widthProportion = this._canvas.width / longerEdge;
        var heightProportion = this._canvas.height / longerEdge;

        var mapX = miniMapSize / 2 - miniMapSize/2 * widthProportion;
        var mapY = miniMapSize / 2 - miniMapSize/2 * heightProportion;
        var mapWidth = miniMapSize * widthProportion;
        var mapHeight = miniMapSize * heightProportion;

        this._canvasContext.fillStyle = '#222222';
        this._canvasContext.fillRect(mapX, this._canvas.height - miniMapSize + mapY, mapWidth, mapHeight);

        var entitySize = 0;

        for (i = 0; i < max; i++) {
            entity = entityListModel.getElement(i);

            var miniMapX = mapX + entity.getX() / longerEdge * miniMapSize;
            var miniMapY = mapY + entity.getY() / longerEdge * miniMapSize;

            miniMapX = Math.round(miniMapX);
            miniMapY = Math.round(miniMapY);

            entitySize = entity.getRadius() / longerEdge * miniMapSize;


            if (entity.getTeam() === 1) {
                this._canvasContext.fillStyle = '#0000FF';
                this._canvasContext.fillRect(0 + miniMapX - entitySize / 2, this._canvas.height - miniMapSize + miniMapY - entitySize / 2, entitySize, entitySize);
            } else if (entity.getTeam() === 2) {
                this._canvasContext.fillStyle = '#FF0000';
                this._canvasContext.fillRect(0 + miniMapX - entitySize / 2, this._canvas.height - miniMapSize + miniMapY - entitySize / 2, entitySize, entitySize);
            } else {
                this._canvasContext.fillStyle = '#FFFF00';
                this._canvasContext.fillRect(0 + miniMapX - entitySize / 2, this._canvas.height - miniMapSize + miniMapY - entitySize / 2, entitySize, entitySize);
            }

        }
    }


};


/**
 * @method _drawMap
 * @private
 * @param {app.objects.Map} map
 */
app.view.WorldView.prototype._drawMap = function _drawMap(map) {
    var x, y, maxX = map.getWidth(), maxY = map.getHeight();
    var mapField;


    this._canvasContext.drawImage(this._backgroundImage, 0, 0, 700, 500);

    this._canvasContext.beginPath();
    this._canvasContext.textAlign = "center";
    this._canvasContext.textBaseline = "middle";

    //for (x = 0; x < maxX; x++) {
    //    for (y = 0; y < maxY; y++) {
    //
    //        mapField = map.getField(x, y);
    //
    //        this._canvasContext.rect(x * map.getFieldWidth(), y * map.getFieldHeight(), map.getFieldWidth(), map.getFieldHeight());
    //
    //        if (mapField.getAllowBuild()) {
    //            this._canvasContext.fillStyle = '#99FF99';
    //            this._canvasContext.fillText("Y", x * map.getFieldWidth() + map.getFieldWidth() * 0.5, y * map.getFieldHeight() + map.getFieldHeight() * 0.5);
    //        } else {
    //            this._canvasContext.fillStyle = '#FF9999';
    //            this._canvasContext.fillText("N", x * map.getFieldWidth() + map.getFieldWidth() * 0.5, y * map.getFieldHeight() + map.getFieldHeight() * 0.5);
    //        }
    //
    //        if (mapField === map.getSelectedField()) {
    //            this._canvasContext.fillStyle = '#FFFFFF';
    //            this._canvasContext.fillText("SELECT", x * map.getFieldWidth() + map.getFieldWidth() * 0.5, y * map.getFieldHeight() + map.getFieldHeight() * 0.5);
    //        }
    //
    //    }
    //}

    this._canvasContext.lineWidth = 0.5;
    this._canvasContext.stroke();

};
