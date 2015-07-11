/**
 * Created by adambartkowiak on 11.04.15.
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
 * @
 * @namespace app.objects
 */
app.objects.WorldModel = function WorldModel() {

    /**
     * @property _bulletList
     * @type {app.objects.BulletList}
     */
    this._bulletList = new app.objects.BulletList();
    
    /**
     * @property _towerList
     * @type {app.objects.TowerList}
     */
    this._towerList = new app.objects.TowerList();
    
    /**
     * @property _enemyList
     * @type {app.objects.EnemyList}
     */
    this._enemyList = new app.objects.EnemyList();
    
    /**
     * @property _checkpointList
     * @type {app.objects.CheckpointList}
     */
    this._checkpointList = new app.objects.CheckpointList();
    
    /**
     * 
     * @property _map
     * @type {app.objects.Map}
     */
    this._map = new app.objects.Map();
    
    /**
     * 
     * @property _objectScale
     * @type {Number}
     */
    this._objectScale = 1;
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.WorldModel, Object);

/**
 * @methodName getBulletList
 * @public
 * @return {app.objects.BulletList}
 */
app.objects.WorldModel.prototype.getBulletList = function getBulletList(){
    return this._bulletList;
};

/**
 * @methodName getTowerList
 * @public
 * @return {app.objects.TowerList}
 */
app.objects.WorldModel.prototype.getTowerList = function getTowerList(){
    return this._towerList;
};

/**
 * @methodName getEnemyList
 * @public
 * @return {app.objects.EnemyList}
 */
app.objects.WorldModel.prototype.getEnemyList = function getEnemyList(){
    return this._enemyList;
};

/**
 * @methodName getCheckpointList
 * @public
 * @return {app.objects.CheckpointList}
 */
app.objects.WorldModel.prototype.getCheckpointList = function getCheckpointList(){
    return this._checkpointList;
};

/**
 * @methodName getMap
 * @public
 * @return {app.objects.Map}
 */
app.objects.WorldModel.prototype.getMap = function getMap(){
    return this._map;
};

/**
 * @methodName getObjectScale
 * @public
 * @return {Number}
 */
app.objects.WorldModel.prototype.getObjectScale = function getObjectScale(){
    return this._objectScale;
};

/**
 * @methodName setTowerList
 * @param {app.objects.TowerList} towerList
 * @public
 */
app.objects.WorldModel.prototype.setTowerList = function setTowerList(towerList){
    this._towerList = towerList;
};

/**
 * @methodName setEnemyList
 * @param {app.objects.EnemyList} enemyList
 * @public
 */
app.objects.WorldModel.prototype.setEnemyList = function setEnemyList(enemyList){
    this._enemyList = enemyList;
};

/**
 * @methodName setBulletList
 * @param {app.objects.BulletList} bulletList
 * @public
 */
app.objects.WorldModel.prototype.setBulletList = function setBulletList(bulletList){
    this._bulletList = bulletList;
};

/**
 * @methodName setCheckpointList
 * @param {app.objects.CheckpointList} checkpointList
 * @public
 */
app.objects.WorldModel.prototype.setCheckpointList = function setCheckpointList(checkpointList){
    this._checkpointList = checkpointList;
};

/**
 * @methodName setMap
 * @param {app.objects.Map} map
 * @public
 */
app.objects.WorldModel.prototype.setMap = function setMap(map){
    this._map = map;
};

/**
 * @methodName setObjectScale
 * @public
 * @param {Number} objectScale
 */
app.objects.WorldModel.prototype.setObjectScale = function setObjectScale(objectScale){
    this._objectScale = objectScale;
};