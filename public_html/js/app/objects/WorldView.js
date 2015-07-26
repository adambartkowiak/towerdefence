/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class WorldView
 * @constructor
 * @param {HTMLCanvasElement} canvas
 * @param {app.objects.WorldModel} worldModel
 */
app.objects.WorldView = function WorldView(canvas, worldModel) {

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

    /**
     * @property {Array} _enemyImage
     */
    this._enemyImage = [];
    this._enemyImage["assets/images/enemy0.png"] = new Image();
    this._enemyImage["assets/images/enemy0.png"].src = "assets/images/enemy0.png";

    this._enemyImage["assets/images/enemy1.png"] = new Image();
    this._enemyImage["assets/images/enemy1.png"].src = "assets/images/enemy1.png";

    this._enemyImage["assets/images/enemy2.png"] = new Image();
    this._enemyImage["assets/images/enemy2.png"].src = "assets/images/enemy2.png";

    this._enemyImage["assets/images/enemy3.png"] = new Image();
    this._enemyImage["assets/images/enemy3.png"].src = "assets/images/enemy3.png";

    /**
     * @property {Image} _towerHolderImage
     */
    this._towerHolderImage = new Image();
    this._towerHolderImage.src = "assets/images/holder0.png";

    /**
     * @property {Array} _towerImage
     */
    this._towerImage = [];
    this._towerImage["assets/images/tower0.png"] = new Image();
    this._towerImage["assets/images/tower0.png"].src = "assets/images/tower0.png";

    this._towerImage["assets/images/tower1.png"] = new Image();
    this._towerImage["assets/images/tower1.png"].src = "assets/images/tower1.png";

    this._towerImage["assets/images/tower2.png"] = new Image();
    this._towerImage["assets/images/tower2.png"].src = "assets/images/tower2.png";


    /**
     * @property {Array} _bulletImage
     */
    this._bulletImage = [];
    this._bulletImage["assets/images/bullet0.png"] = new Image();
    this._bulletImage["assets/images/bullet0.png"].src = "assets/images/bullet0.png";

    this._bulletImage["assets/images/bullet1.png"] = new Image();
    this._bulletImage["assets/images/bullet1.png"].src = "assets/images/bullet1.png";

    this._bulletImage["assets/images/bullet2.png"] = new Image();
    this._bulletImage["assets/images/bullet2.png"].src = "assets/images/bullet2.png";

    /**
     * @property {support.graphics.Image} _image
     */
    this._image = new support.graphics.Image();

    /**
     * @property {Boolean} _debug
     * @private
     */
    this._debug = false;

};

Utils.inherits(app.objects.WorldView, Object);

/**
 * @method draw
 * @@param {Number} logicFrames
 * @public
 */
app.objects.WorldView.prototype.draw = function draw(logicFrames) {
    var enemies = this._worldModel.getEnemyList(),
        towers = this._worldModel.getTowerList(),
        bullets = this._worldModel.getBulletList(),
        checkpoints = this._worldModel.getCheckpointList(),
        map = this._worldModel.getMap();

    this._backgroundImage.src = map.getGraphicUrl();
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this._canvasContext.fillStyle = '#999999';
    this._drawMap(map);

    this._canvasContext.fillStyle = '#FF0000';
    this._drawCheckpoints(checkpoints);

    this._canvasContext.fillStyle = '#000000';
    this._drawEnemies(enemies);
    this._drawTowers(towers);
    this._drawBullets(bullets);

    this._canvasContext.fillText(logicFrames, 10, 10);

    this._canvasContext.fillText("towers: " + towers.length(), 500, 10);
    this._canvasContext.fillText("enemies: " + enemies.length(), 500, 30);
    this._canvasContext.fillText("bullets: " + bullets.length(), 500, 50);
    this._canvasContext.fillText("checkpoints: " + checkpoints.length(), 500, 70);
};

/**
 * @method _drawEnemies
 * @private
 * @param {app.objects.EnemyList} enemyList
 */
app.objects.WorldView.prototype._drawEnemies = function _drawEnemies(enemyList) {
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

}
;

/**
 * @method _drawTowers
 * @private
 * @param {app.objects.TowerList} towerList
 */
app.objects.WorldView.prototype._drawTowers = function _drawTowers(towerList) {
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
app.objects.WorldView.prototype._drawBullets = function _drawBullets(bulletList) {
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
app.objects.WorldView.prototype._drawCheckpoints = function _drawCheckpoints(checkpointList) {
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
app.objects.WorldView.prototype._drawMap = function _drawMap(map) {
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
