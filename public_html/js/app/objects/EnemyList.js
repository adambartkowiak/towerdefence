/**
 * Created by adambartkowiak on 11.04.2013.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class EnemyList
 * @constructor
 */
app.objects.EnemyList = function EnemyList() {

    /**
     * @property _enemyList
     * @type Array
     */
    this._enemyList = [];

};

Utils.inherits(app.objects.EnemyList, Object);

/**
 * @method addEnemy
 * @param {app.objects.Bullet} newEnemy
 */
app.objects.EnemyList.prototype.addEnemy = function addEnemy(newEnemy) {
    this._enemyList.push(newEnemy);
};

/**
 * @method clear
 */
app.objects.EnemyList.prototype.clear = function clear() {
    this._enemyList.length = 0;
};

/**
 * @method getEnemyList
 * @return {app.objects.EnemyList}
 */
app.objects.EnemyList.prototype.getEnemyList = function getEnemyList() {
    return this._enemyList;
};

/**
 * @method getEnemy
 * @param {Number} index
 * @return {app.objects.Enemy} enemy
 */
app.objects.EnemyList.prototype.getEnemy = function getEnemy(index) {
    return this._enemyList[index];
};

/**
 * @method getEnemyByGuid
 * @param {String} guid
 * @return {app.objects.Enemy} enemy
 */
app.objects.EnemyList.prototype.getEnemyByGuid = function getEnemyByGuid(guid) {
    for (var i=0; i<this._enemyList.length; i++){
        if (this._enemyList[i].getGuid() === guid){
            return this._enemyList[i];
        }
    }
    return null;
};

/**
 * @method length
 * @return {Number} length
 */
app.objects.EnemyList.prototype.length = function length() {
    return this._enemyList.length;
};

/**
 * @method remove
 * @param {Number} index
 */
app.objects.EnemyList.prototype.remove = function remove(index) {
    this._enemyList.splice(index, 1);
};

/**
 * @method stringify
 * @return {String} result
 */
app.objects.EnemyList.prototype.saveEnemyListToJsonText = function saveEnemyListToJsonText() {
    return JSON.stringify(this._enemyList);
};

/**
 * @method loadEnemyListFromJson
 * @param {String} json
 */
app.objects.EnemyList.prototype.loadEnemyListFromJson = function loadEnemyListFromJson(json) {
    var myJson = json;
    var jsonEnemy;
    
    this.clear();
    
    for(var i=0; i<myJson.length; i++){
        jsonEnemy = myJson[i];
        var newMoveVector = new support.geom.SimpleVector2d(jsonEnemy._moveVector._x, jsonEnemy._moveVector._y);
        var newEnemy = new app.objects.Enemy(jsonEnemy._x, jsonEnemy._y, jsonEnemy._hp, jsonEnemy._speed, jsonEnemy._graphicUrl);
        newEnemy.setAngle(jsonEnemy._angle);
        newEnemy.setMoveVector(newMoveVector);
        newEnemy.setCurrentHp(jsonEnemy._currentHp);
        newEnemy.setGuid(jsonEnemy._guid);
        this.addEnemy(newEnemy);
    }
};

/**
 * @method loadEnemyListFromJsonText
 * @param {String} jsonText
 */
app.objects.EnemyList.prototype.loadEnemyListFromJsonText = function loadEnemyListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadEnemyListFromJson(myJson);
};