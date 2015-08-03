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

    this._entityImage["assets/images/tower0.png"] = new Image();
    this._entityImage["assets/images/tower0.png"].src = "assets/images/tower0.png";

    this._entityImage["assets/images/bullet0.png"] = new Image();
    this._entityImage["assets/images/bullet0.png"].src = "assets/images/bullet0.png";

    this._entityImage["assets/images/comandCenter0.png"] = new Image();
    this._entityImage["assets/images/comandCenter0.png"].src = "assets/images/comandCenter0.png";

    /**
     * @property {support.graphics.Image} _image
     */
    this._image = new support.graphics.Image();

    /**
     * @property {Boolean} _debug
     * @private
     */
    this._debug = false;

    this._drawHealthBar = false;
    this._drawPath = false;

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
        if (entity._selected){
            this._canvasContext.beginPath();
            this._canvasContext.strokeStyle = '#32CD32';
            this._canvasContext.arc(entity.getX(), entity.getY(), entity.getRadius(), 0, 2 * Math.PI, true);
            this._canvasContext.lineWidth = 3;
            this._canvasContext.stroke();
        }

        //HEALTH BAR
        if (this._drawHealthBar){
            hp = entity.getHp();
            currentHp = entity.getCurrentHp();

            this._canvasContext.fillStyle = '#474747';
            this._canvasContext.fillRect(entity.getX() - hp / 6 + currentHp / 3, entity.getY() - 20, (hp - currentHp) / 3, 4);

            this._canvasContext.fillStyle = '#00FF00';
            this._canvasContext.fillRect(entity.getX() - hp / 6, entity.getY() - 20, currentHp / 3, 4);

            ////drawRect
            this._canvasContext.fillStyle = '#000000';
            this._canvasContext.rect(entity.getX() - hp / 6, entity.getY() - 20, hp / 3, 4);

            this._canvasContext.stroke();
        }

        //PATH
        if (this._drawPath){

            var moveList = entity.getMoveList();

            if (moveList!=null){

                this._canvasContext.beginPath();

                var moveToX = entity.getX(),
                    moveToY = entity.getY();

                    this._canvasContext.moveTo(moveToX, moveToY);

                    this._canvasContext.strokeStyle = '#00FF00';
                    this._canvasContext.fillStyle = '#00FF00';

                for (var j=0; j<moveList.length(); j++){

                    moveToX = moveList.getElement(j).getX();
                    moveToY = moveList.getElement(j).getY();

                    if (moveList.getElement(j).getEntityId() === 0 && moveToX !== -1 && moveToX !== -1){
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

            var moveToX = entity.getX(),
                moveToY = entity.getY(),
                moveVectorX = entity.getLastPosition().getX(),
                moveVectorY = entity.getLastPosition().getY();

            this._canvasContext.moveTo(moveToX, moveToY);
            this._canvasContext.lineTo(moveVectorX, moveVectorY);

            this._canvasContext.fillStyle = '#FFFFFF';
            this._canvasContext.fillRect(moveToX - 2, moveToY - 2, 4, 4);

            this._canvasContext.stroke();
        }

    }

    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("ENTITY COUNT: " + max, 0, 20);

};


/**
 * @method _drawEnemies
 * @private
 * @param {app.objects.EnemyList} enemyList
 */
app.view.WorldView.prototype._drawEnemies = function _drawEnemies(enemyList) {
    var i,
        max,
        enemy,
        hp,
        currentHp;

    max = enemyList.length();

    //graficzne rysowanie przeciwnikow
    if (!this._debug) {
        for (i = 0; i < max; i++) {

            enemy = enemyList.getEnemy(i);

            this._canvasContext.scale(this._worldModel.SIZEPROPORTION, this._worldModel.SIZEPROPORTION);
            this._image.drawRotateImage(this._canvasContext, this._enemyImage[enemy.getGraphicUrl()], enemy.getX() / this._worldModel.SIZEPROPORTION, enemy.getY() / this._worldModel.SIZEPROPORTION, enemy.getAngle());
            this._canvasContext.scale(1 / this._worldModel.SIZEPROPORTION, 1 / this._worldModel.SIZEPROPORTION);
        }
    }


    this._canvasContext.beginPath();
    for (i = 0; i < max; i++) {

        enemy = enemyList.getEnemy(i);
        hp = enemy.getHp();
        currentHp = enemy.getCurrentHp();

        if (!this._debug) {
            //hp bar
            //fillRect
            this._canvasContext.fillStyle = '#474747';
            this._canvasContext.fillRect(enemy.getX() - hp / 6 + currentHp / 3, enemy.getY() - 20, (hp - currentHp) / 3, 4);

            this._canvasContext.fillStyle = '#00FF00';
            this._canvasContext.fillRect(enemy.getX() - hp / 6, enemy.getY() - 20, currentHp / 3, 4);

            ////drawRect
            this._canvasContext.fillStyle = '#000000';
            this._canvasContext.rect(enemy.getX() - hp / 6, enemy.getY() - 20, hp / 3, 4);
        } else {
            //layout debugerski
            var moveToX = enemy.getX() / this._worldModel.SIZEPROPORTION,
                moveToY = enemy.getY() / this._worldModel.SIZEPROPORTION,
                moveVectorX = enemy.getMoveVector().getX() / this._worldModel.SIZEPROPORTION,
                moveVectorY = enemy.getMoveVector().getY() / this._worldModel.SIZEPROPORTION;

            this._canvasContext.moveTo(moveToX, moveToY);
            this._canvasContext.lineTo(moveToX - moveVectorX, moveToY - moveVectorY);

            this._canvasContext.fillStyle = '#FF0000';
            this._canvasContext.fillRect(moveToX, moveToY, 2, 2);
        }
    }


    this._canvasContext.strokeStyle = '#000000';
    this._canvasContext.lineWidth = 1;
    this._canvasContext.stroke();

};

/**
 * @method _drawTowers
 * @private
 * @param {app.objects.TowerList} towerList
 */
app.view.WorldView.prototype._drawTowers = function _drawTowers(towerList) {
    var i,
        max,
        tower;

    max = towerList.length();
    for (i = 0; i < max; i++) {
        tower = towerList.getTower(i);

        this._canvasContext.scale(this._worldModel.SIZEPROPORTION, this._worldModel.SIZEPROPORTION);

        this._image.drawRotateImage(this._canvasContext, this._towerHolderImage, tower.getX() / this._worldModel.SIZEPROPORTION, tower.getY() / this._worldModel.SIZEPROPORTION, 0);
        this._image.drawRotateImage(this._canvasContext, this._towerImage[tower.getGraphicUrl()], tower.getX() / this._worldModel.SIZEPROPORTION, tower.getY() / this._worldModel.SIZEPROPORTION, tower.getAngle());

        this._canvasContext.scale(1 / this._worldModel.SIZEPROPORTION, 1 / this._worldModel.SIZEPROPORTION);
    }
};

/**
 * @method _drawBullets
 * @private
 * @param {app.objects.BulletList} bulletList
 */
app.view.WorldView.prototype._drawBullets = function _drawBullets(bulletList) {
    var i,
        max,
        bullet;

    max = bulletList.length();
    for (i = 0; i < max; i++) {
        bullet = bulletList.getBullet(i);

        if (!this._debug) {
            //bullet
            this._canvasContext.scale(this._worldModel.SIZEPROPORTION, this._worldModel.SIZEPROPORTION);

            this._image.drawRotateImage(this._canvasContext, this._bulletImage[bullet.getGraphicUrl()], bullet.getX() / this._worldModel.SIZEPROPORTION, bullet.getY() / this._worldModel.SIZEPROPORTION, bullet.getAngle());

            this._canvasContext.scale(1 / this._worldModel.SIZEPROPORTION, 1 / this._worldModel.SIZEPROPORTION);
        } else {
            var moveToX = bullet.getX() / this._worldModel.SIZEPROPORTION,
                moveToY = bullet.getY() / this._worldModel.SIZEPROPORTION,
                moveVectorX = bullet.getLastPosition().getX() / this._worldModel.SIZEPROPORTION,
                moveVectorY = bullet.getLastPosition().getY() / this._worldModel.SIZEPROPORTION;

            this._canvasContext.moveTo(moveToX, moveToY);
            this._canvasContext.lineTo(moveVectorX, moveVectorY);

            this._canvasContext.fillStyle = '#FFFFFF';
            this._canvasContext.fillRect(moveToX, moveToY, 5, 5);
        }
    }

    if (this._debug) {
        this._canvasContext.strokeStyle = '#0000FF';
        this._canvasContext.lineWidth = 1;
        this._canvasContext.stroke();
    }
};

/**
 * @method _drawCheckpoints
 * @private
 * @param {app.objects.CheckpointList} checkpointList
 */
app.view.WorldView.prototype._drawCheckpoints = function _drawCheckpoints(checkpointList) {
    var i,
        max,
        checkpoint;

    max = checkpointList.length();
    for (i = 0; i < max; i++) {
        checkpoint = checkpointList.getCheckpoint(i);
        //this._canvasContext.fillText("CHECKPOINT", checkpoint.getX(), checkpoint.getY());
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
