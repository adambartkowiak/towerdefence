/**
 * Created by adambartkowiak on 11.04.2013.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class TowerList
 * @constructor
 */
app.objects.TowerList = function TowerList() {

    /**
     * @property {Array} _towerList
     * @private
     */
    this._towerList = [];

};

Utils.inherits(app.objects.TowerList, Object);


/**
 * @method addTower
 * @param {app.objects.Tower} newTower
 */
app.objects.TowerList.prototype.addTower = function addTower(newTower) {
    this._towerList.push(newTower);
};

/**
 * @method deleteTower
 * @param {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.deleteTower = function deleteTower(tower) {
    var towerIndex = this._towerList.indexOf(tower);
    if (towerIndex >= 0) {
        this._towerList.splice(towerIndex, 1);
    }
};

/**
 * @method clear
 */
app.objects.TowerList.prototype.clear = function clear() {
    this._towerList.length = 0;
};

/**
 * @method getTowerList
 * @return {Array}
 */
app.objects.TowerList.prototype.getTowerList = function getTowerList() {
    return this._towerList;
};

/**
 * @method getTower
 * @param {Number} index
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTower = function getTower(index) {
    return this._towerList[index];
};

/**
 * @method getTowerByGuid
 * @param {String} guid
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTowerByGuid = function getTowerByGuid(guid) {
    for (var i = 0; i < this._towerList.length; i++) {
        if (this._towerList[i].getGuid() === guid) {
            return this._towerList[i];
        }
    }
    return null;
};

/**
 * @method getTowerByPosition
 * @param {Number} x
 * @param {Number} y
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTowerByPosition = function getTowerByPosition(x, y) {

    var length = this._towerList.length;
    var tower = null;

    for (var towerIndex = 0; towerIndex < length; towerIndex++) {
        tower = this._towerList[towerIndex];
        if (tower.getX() === x && tower.getY() === y) {
            return tower;
        }
    }

    return null;
};

/**
 * @method length
 * @return {Number} length
 */
app.objects.TowerList.prototype.length = function length() {
    return this._towerList.length;
};

/**
 * @method saveTowerListToJsonText
 * @return {String} result
 */
app.objects.TowerList.prototype.saveTowerListToJsonText = function saveTowerListToJsonText() {
    return JSON.stringify(this._towerList);
};

/**
 * @method loadTowerListFromJson
 * @param {String} json
 */
app.objects.TowerList.prototype.loadTowerListFromJson = function loadTowerListFromJson(json) {
    var myJson = json;
    var jsonTower;

    this.clear();

    for (var i = 0; i < myJson.length; i++) {
        jsonTower = myJson[i];
        var newBullet = new app.objects.Bullet(0, 0, null, jsonTower._bullet._speed, jsonTower._bullet._damage, jsonTower._bullet._graphicUrl);
        var newTower = new app.objects.Tower(jsonTower._x, jsonTower._y, jsonTower._range, jsonTower._rate, newBullet, jsonTower._graphicUrl);
        newTower.setAngle(jsonTower._angle);
        newTower.setCooldown(jsonTower._cooldown);
        newTower.setGuid(jsonTower._guid);
        this.addTower(newTower);
    }
};

/**
 * @method loadTowerListFromJsonText
 * @param {String} jsonText
 */
app.objects.TowerList.prototype.loadTowerListFromJsonText = function loadTowerListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadTowerListFromJson(myJson);
};