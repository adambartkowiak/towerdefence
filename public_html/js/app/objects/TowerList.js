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
 * @methodName deleteTower
 * @param {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.deleteTower = function deleteTower(tower) {
    var towerIndex = this._towerList.indexOf(tower);
    if (towerIndex >= 0) {
        this._towerList.splice(towerIndex, 1);
    }
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
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTower = function getTower(index) {
    return this._towerList[index];
};

/**
 * @methodName getTowerByGuid
 * @param {String} guid
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTowerByGuid = function getTowerByGuid(guid) {
    for (var i=0; i<this._towerList.length; i++){
        if (this._towerList[i].getGuid() === guid){
            return this._towerList[i];
        }
    }
    return null;
};

/**
 * @methodName getTowerByPosition
 * @param {Number} x
 * @param {Number} y
 * @return {app.objects.Tower} tower
 */
app.objects.TowerList.prototype.getTowerByPosition = function getTowerByPosition(x, y) {
    
    var length = this._towerList.length;
    var tower = null;
    
    for (var towerIndex=0; towerIndex<length; towerIndex++){
        tower = this._towerList[towerIndex];
        if (tower.getX() === x && tower.getY() === y){
            return tower; 
        }
    }
    
    return null;
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.TowerList.prototype.length = function length() {
    return this._towerList.length;
};

/**
 * @methodName saveTowerListToJsonText
 * @return {String} result
 */
app.objects.TowerList.prototype.saveTowerListToJsonText = function saveTowerListToJsonText() {
    return JSON.stringify(this._towerList);
};

/**
 * @methodName loadTowerListFromJson
 * @param {String} json
 */
app.objects.TowerList.prototype.loadTowerListFromJson = function loadTowerListFromJson(json) {
    var myJson = json;
    var jsonTower;
    
    this.clear();
    
    for(var i=0; i<myJson.length; i++){
        jsonTower = myJson[i];
        var newTower = new app.objects.Tower(jsonTower._x, jsonTower._y, jsonTower._range, jsonTower._rate, jsonTower._name, jsonTower._graphicUrl);
        newTower.setAngle(jsonTower._angle);
        newTower.setCooldown(jsonTower._cooldown);
        newTower.setGuid(jsonTower._guid);
        this.addTower(newTower);
    }
};

/**
 * @methodName loadTowerListFromJsonText
 * @param {String} jsonText
 */
app.objects.TowerList.prototype.loadTowerListFromJsonText = function loadTowerListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadTowerListFromJson(myJson);
};