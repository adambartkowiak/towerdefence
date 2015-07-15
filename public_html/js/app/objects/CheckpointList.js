/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

/**
 * @namespace app.objects
 * @memberOf app
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @param {Number} x
 * 
 */
app.objects.CheckpointList = function CheckpointList(x) {

    /**
     * @property _damage
     * @type app.objects.Checkpoint
     */
    this._checkpointList = [];

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.CheckpointList, Object);

/**
 * @methodName addCheckpoint
 * @param {app.objects.Checkpoint} newCheckpoint
 */
app.objects.CheckpointList.prototype.addCheckpoint = function addCheckpoint(newCheckpoint) {
    this._checkpointList.push(newCheckpoint);
};

/**
 * @methodName getCheckpoint
 * @param {Number} index
 * @return {app.objects.Checkpoint} bulet
 */
app.objects.CheckpointList.prototype.getCheckpoint = function getCheckpoint(index) {
    return this._checkpointList[index];
};

/**
 * @methodName getCheckpointList
 * @param {Number} index
 * @return {Array} bulet
 */
app.objects.CheckpointList.prototype.getCheckpointList = function getCheckpointList() {
    return this._checkpointList;
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.CheckpointList.prototype.length = function length() {
    return this._checkpointList.length;
};

/**
 * @methodName clear
 */
app.objects.CheckpointList.prototype.clear = function clear() {
    this._checkpointList.length = 0;
};


/**
 * @methodName stringify
 * @return {String} result
 */
app.objects.CheckpointList.prototype.saveCheckpointListToJsonText = function saveCheckpointListToJsonText() {
    return JSON.stringify(this._checkpointList);
};

/**
 * @methodName loadCheckpointListFromJson
 * @param {String} json
 */
app.objects.CheckpointList.prototype.loadCheckpointListFromJson = function loadCheckpointListFromJson(json) {
    var myJson = json;
    var jsonCheckpoint;
    
    this.clear();
    
    for(var i=0; i<myJson.length; i++){
        jsonCheckpoint = myJson[i];
        var newCheckpoint = new app.objects.Checkpoint(jsonCheckpoint._x, jsonCheckpoint._y, jsonCheckpoint._moveVector._x, jsonCheckpoint._moveVector._y);
        this.addCheckpoint(newCheckpoint);
    }
};

/**
 * @methodName loadEnemyListFromJsonText
 * @param {String} jsonText
 */
app.objects.CheckpointList.prototype.loadCheckpointListFromJsonText = function loadCheckpointListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadCheckpointListFromJson(myJson);
};