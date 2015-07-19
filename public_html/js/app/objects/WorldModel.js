/**
 * Created by adambartkowiak on 11.04.15.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class WorldModel
 * @constructor
 */
app.objects.WorldModel = function WorldModel() {

    /**
     * @property {Number} BASICSIZE
     */
    this.BASICSIZE = 50;
    
    /**
     * @property {Number} BASICSIZE
     */
    this.SIZEPROPORTION = 1;
    
    
    /**
     * @property {app.objects.BulletList} _bulletList
     */
    this._bulletList = new app.objects.BulletList();
    
    /**
     * @property {app.objects.TowerList} _towerList
     */
    this._towerList = new app.objects.TowerList();
    
    /**
     * @property {app.objects.EnemyList} _enemyList
     */
    this._enemyList = new app.objects.EnemyList();
    
    /**
     * @property {app.objects.CheckpointList} _checkpointList
     */
    this._checkpointList = new app.objects.CheckpointList();
    
    /**
     * 
     * @property {app.objects.Map} _map
     */
    this._map = new app.objects.Map();
};

Utils.inherits(app.objects.WorldModel, Object);

/**
 * @method getBulletList
 * @public
 * @return {app.objects.BulletList}
 */
app.objects.WorldModel.prototype.getBulletList = function getBulletList(){
    return this._bulletList;
};

/**
 * @method getTowerList
 * @public
 * @return {app.objects.TowerList}
 */
app.objects.WorldModel.prototype.getTowerList = function getTowerList(){
    return this._towerList;
};

/**
 * @method getEnemyList
 * @public
 * @return {app.objects.EnemyList}
 */
app.objects.WorldModel.prototype.getEnemyList = function getEnemyList(){
    return this._enemyList;
};

/**
 * @method getCheckpointList
 * @public
 * @return {app.objects.CheckpointList}
 */
app.objects.WorldModel.prototype.getCheckpointList = function getCheckpointList(){
    return this._checkpointList;
};

/**
 * @method getMap
 * @public
 * @return {app.objects.Map}
 */
app.objects.WorldModel.prototype.getMap = function getMap(){
    return this._map;
};

/**
 * @method setTowerList
 * @param {app.objects.TowerList} towerList
 * @public
 */
app.objects.WorldModel.prototype.setTowerList = function setTowerList(towerList){
    this._towerList = towerList;
};

/**
 * @method setEnemyList
 * @param {app.objects.EnemyList} enemyList
 * @public
 */
app.objects.WorldModel.prototype.setEnemyList = function setEnemyList(enemyList){
    this._enemyList = enemyList;
};

/**
 * @method setBulletList
 * @param {app.objects.BulletList} bulletList
 * @public
 */
app.objects.WorldModel.prototype.setBulletList = function setBulletList(bulletList){
    this._bulletList = bulletList;
};

/**
 * @method setCheckpointList
 * @param {app.objects.CheckpointList} checkpointList
 * @public
 */
app.objects.WorldModel.prototype.setCheckpointList = function setCheckpointList(checkpointList){
    this._checkpointList = checkpointList;
};

/**
 * @method setMap
 * @param {app.objects.Map} map
 * @public
 */
app.objects.WorldModel.prototype.setMap = function setMap(map){
    this._map = map;
};



/**
 * @method onMapLoadingEnd
 * @public
 */
app.objects.WorldModel.prototype.onMapLoadingEnd = function onMapLoadingEnd(){
    this.SIZEPROPORTION = this._map.getFieldWidth() / this.BASICSIZE;
};