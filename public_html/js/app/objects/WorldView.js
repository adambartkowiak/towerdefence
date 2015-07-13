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
 * @param {app.objects.WorldModel} worldModel
 */
app.objects.WorldView = function WorldView(canvas, worldModel) {

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
     * @type {app.objects.MapModel} mapModel
     */
    this._worldModel = worldModel;
    
    /**
     * @type {Image}
     */
    this._backgroundImage = new Image();
    
    /**
     * @type {Image}
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
     * @type {Image}
     */
    this._towerHolderImage = new Image();
    this._towerHolderImage.src = "assets/images/holder0.png";
    
    /**
     * @type {Image}
     */
    this._towerImage = [];
    this._towerImage["assets/images/tower0.png"] =  new Image();
    this._towerImage["assets/images/tower0.png"].src = "assets/images/tower0.png";
    
    this._towerImage["assets/images/tower1.png"] =  new Image();
    this._towerImage["assets/images/tower1.png"].src = "assets/images/tower1.png";
    
    this._towerImage["assets/images/tower2.png"] =  new Image();
    this._towerImage["assets/images/tower2.png"].src = "assets/images/tower2.png";
    
    
    /**
     * @type {Image}
     */
    this._bulletImage = []; 
    this._bulletImage["assets/images/bullet0.png"] = new Image();
    this._bulletImage["assets/images/bullet0.png"].src = "assets/images/bullet0.png";
    
    this._bulletImage["assets/images/bullet1.png"] = new Image();
    this._bulletImage["assets/images/bullet1.png"].src = "assets/images/bullet1.png";
    
    this._bulletImage["assets/images/bullet2.png"] = new Image();
    this._bulletImage["assets/images/bullet2.png"].src = "assets/images/bullet2.png";
    
    /**
     * @type {support.graphics.Image}
     */
    this._image = new support.graphics.Image();
    
    this._angle = 0;
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.WorldView, Object);

/**
 * @methodName draw
 * @@param {Number} logicFrames 
 * @public
 */
app.objects.WorldView.prototype.draw = function draw(logicFrames){
    var enemies = this._worldModel.getEnemyList(),
        towers = this._worldModel.getTowerList(),
        bullets = this._worldModel.getBulletList(),
        checkpoints = this._worldModel.getCheckpointList(),
        map = this._worldModel.getMap();

        this._backgroundImage.src = map.getGraphicUrl();
        this.canvasContext.clearRect ( 0 , 0 , this.canvas.width, this.canvas.height );
        
        this.canvasContext.fillStyle = '#999999';
        this._drawMap(map);
        
        this.canvasContext.fillStyle = '#FF0000';
        this._drawCheckpoints(checkpoints)
        
        this.canvasContext.fillStyle = '#000000';
        this._drawEnemies(enemies);
        this._drawTowers(towers);
        this._drawBullets(bullets);
        
        this.canvasContext.fillText(logicFrames, 10, 10);
        
        this.canvasContext.fillText("towers: " + towers.length(), 500, 10);
        this.canvasContext.fillText("enemies: " + enemies.length(), 500, 30);
        this.canvasContext.fillText("bullets: " + bullets.length(), 500, 50);
        this.canvasContext.fillText("checkpoints: " + checkpoints.length(), 500, 70);
};

/**
 * @methodName _drawEnemies
 * @private
 * @param {app.objects.EnemyList} enemyList
 */
app.objects.WorldView.prototype._drawEnemies = function _drawEnemies(enemyList){
    var i,
        max,
        enemy,
        hp,
        currentHp;
    
    max = enemyList.length();
    
    this.canvasContext.beginPath();
    for (i=0; i<max; i++){
        
        enemy = enemyList.getEnemy(i);
        hp = enemy.getHp();
        currentHp = enemy.getCurrentHp();
        
        //hp bar
        //fillRect
        this.canvasContext.fillStyle = '#00FF00';
        this.canvasContext.fillRect(enemy.getX()-hp/6,enemy.getY()-20,currentHp/3,4);
        
        //drawRect
        this.canvasContext.fillStyle = '#000000';
        this.canvasContext.rect(enemy.getX()-hp/6,enemy.getY()-20,hp/3,4);
        
        //enemy
        this.canvasContext.scale(this._worldModel.SIZEPROPORTION,this._worldModel.SIZEPROPORTION);
        
        this._image.drawRotateImage(this.canvasContext, this._enemyImage[enemy.getGraphicUrl()], enemy.getX()/this._worldModel.SIZEPROPORTION, enemy.getY()/this._worldModel.SIZEPROPORTION, enemy.getAngle());
        
        this.canvasContext.scale(1/this._worldModel.SIZEPROPORTION,1/this._worldModel.SIZEPROPORTION);
    }
    
    this.canvasContext.lineWidth = 1;
    this.canvasContext.stroke();
    
};

/**
 * @methodName _drawTowers
 * @private
 * @param {app.objects.TowerList} towerList
 */
app.objects.WorldView.prototype._drawTowers = function _drawTowers(towerList){
    var i,
        max,
        tower;
    
    this._angle+=1;
    
    max = towerList.length();
    for (i=0; i<max; i++){
        tower = towerList.getTower(i);
        
        this.canvasContext.scale(this._worldModel.SIZEPROPORTION,this._worldModel.SIZEPROPORTION);
        
        this._image.drawRotateImage(this.canvasContext, this._towerHolderImage, tower.getX()/this._worldModel.SIZEPROPORTION, tower.getY()/this._worldModel.SIZEPROPORTION, 0);
        this._image.drawRotateImage(this.canvasContext, this._towerImage[tower.getGraphicUrl()], tower.getX()/this._worldModel.SIZEPROPORTION, tower.getY()/this._worldModel.SIZEPROPORTION, tower.getAngle());
        
        this.canvasContext.scale(1/this._worldModel.SIZEPROPORTION,1/this._worldModel.SIZEPROPORTION);
    }
};

/**
 * @methodName _drawBullets
 * @private
 * @param {app.objects.BulletList} bulletList
 */
app.objects.WorldView.prototype._drawBullets = function _drawBullets(bulletList){
    var i,
        max,
        bullet;
    
    max = bulletList.length();
    for (i=0; i<max; i++){
        bullet = bulletList.getBullet(i);

        //bullet
        this.canvasContext.scale(this._worldModel.SIZEPROPORTION,this._worldModel.SIZEPROPORTION);
        
        this._image.drawRotateImage(this.canvasContext, this._bulletImage[bullet.getGraphicUrl()], bullet.getX()/this._worldModel.SIZEPROPORTION, bullet.getY()/this._worldModel.SIZEPROPORTION, bullet.getAngle());
        
        this.canvasContext.scale(1/this._worldModel.SIZEPROPORTION,1/this._worldModel.SIZEPROPORTION);
    }
};

/**
 * @methodName _drawCheckpoints
 * @private
 * @param {app.objects.CheckpointList} checkpointList
 */
app.objects.WorldView.prototype._drawCheckpoints = function _drawCheckpoints(checkpointList){
    var i,
        max,
        checkpoint;
    
    max = checkpointList.length();
    for (i=0; i<max; i++){
        checkpoint = checkpointList.getCheckpoint(i);
        //this.canvasContext.fillText("CHECKPOINT", checkpoint.getX(), checkpoint.getY());
    }
};

/**
 * @methodName _drawMap
 * @private
 * @param {app.objects.Map} map
 */
app.objects.WorldView.prototype._drawMap = function _drawMap(map){
    var x, y, maxX = map.getWidth(), maxY = map.getHeight();
    var mapField;
    
    
    this.canvasContext.drawImage(this._backgroundImage, 0, 0, 700, 500);
    
    this.canvasContext.beginPath();
    this.canvasContext.textAlign="center";
    this.canvasContext.textBaseline="middle"; 
    
    for (x = 0; x<maxX; x++){
        for (y = 0; y<maxY; y++){
            
            mapField = map.getField(x, y);
            
            this.canvasContext.rect(x*map.getFieldWidth(),y*map.getFieldHeight(),map.getFieldWidth(),map.getFieldHeight());
            
            if(mapField.getAllowBuild()){
                this.canvasContext.fillStyle = '#99FF99';
                this.canvasContext.fillText("Y", x*map.getFieldWidth()+map.getFieldWidth()*0.5, y*map.getFieldHeight()+map.getFieldHeight()*0.5);
            } else {
                this.canvasContext.fillStyle = '#FF9999';
                this.canvasContext.fillText("N", x*map.getFieldWidth()+map.getFieldWidth()*0.5, y*map.getFieldHeight()+map.getFieldHeight()*0.5);
            }
            
            if (mapField === map.getSelectedField()){
                this.canvasContext.fillStyle = '#FFFFFF';
                this.canvasContext.fillText("SELECT", x*map.getFieldWidth()+map.getFieldWidth()*0.5, y*map.getFieldHeight()+map.getFieldHeight()*0.5);
            }
            
        }
    }
    this.canvasContext.lineWidth = 0.5;
    this.canvasContext.stroke();
    
};
