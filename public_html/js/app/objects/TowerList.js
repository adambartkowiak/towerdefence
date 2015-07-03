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
app.objects.TowerList = function TowerList() {

    /**
     * @property _towerList
     * @type Array
     */
    this._towerList = [];

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.TowerList, Object);


/**
 * @methodName addTower
 * @param {app.objects.Tower} newTower
 */
app.objects.TowerList.prototype.addTower = function addTower(newTower) {
    this._towerList.push(newTower);
};

/**
 * @methodName clear
 */
app.objects.TowerList.prototype.clear = function clear() {
    this._towerList.length = 0;
};

/**
 * @methodName getTowerList
 * @return {Table}
 */
app.objects.TowerList.prototype.getTowerList = function getTowerList() {
    return this._towerList;
};

/**
 * @methodName getTower
 * @param {Number} index
 * @return {app.objects.Tower} bulet
 */
app.objects.TowerList.prototype.getTower = function getTower(index) {
    return this._towerList[index];
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.TowerList.prototype.length = function length() {
    return this._towerList.length;
};