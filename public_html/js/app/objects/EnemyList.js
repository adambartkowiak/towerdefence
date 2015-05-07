/**
 * Created by adambartkowiak on 11.04.2013.
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
 */
app.objects.EnemyList = function EnemyList() {

    /**
     * @property _enemyList
     * @type Array
     */
    this._enemyList = [];

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.EnemyList, Object);

/**
 * @methodName addEnemy
 * @param {app.objects.Bullet} newEnemy
 */
app.objects.EnemyList.prototype.addEnemy = function addEnemy(newEnemy) {
    this._enemyList.push(newEnemy);
};

/**
 * @methodName clear
 */
app.objects.EnemyList.prototype.clear = function clear() {
    this._enemyList.length = 0;
};

/**
 * @methodName getEnemyList
 * @return {app.objects.EnemyList}
 */
app.objects.EnemyList.prototype.getEnemyList = function getEnemyList() {
    return this._enemyList;
};

/**
 * @methodName getEnemy
 * @param {Number} index
 * @return {app.objects.Enemy} enemy
 */
app.objects.EnemyList.prototype.getEnemy = function getEnemy(index) {
    return this._enemyList[index];
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.EnemyList.prototype.length = function length() {
    return this._enemyList.length;
};

/**
 * @methodName remove
 * @param {Number} index
 */
app.objects.EnemyList.prototype.remove = function remove(index) {
    this._enemyList.splice(index, 1);
};