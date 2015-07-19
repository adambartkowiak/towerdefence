/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class CheckpointList
 * @constructor
 * 
 */
app.objects.CheckpointList = function CheckpointList() {

    /**
     * @property _damage
     * @type app.objects.Checkpoint
     */
    this._checkpointList = [];

};

Utils.inherits(app.objects.CheckpointList, Object);

/**
 * @method addCheckpoint
 * @param {app.objects.Checkpoint} newCheckpoint
 */
app.objects.CheckpointList.prototype.addCheckpoint = function addCheckpoint(newCheckpoint) {
    this._checkpointList.push(newCheckpoint);
};

/**
 * @method getCheckpoint
 * @param {Number} index
 * @return {app.objects.Checkpoint} bulet
 */
app.objects.CheckpointList.prototype.getCheckpoint = function getCheckpoint(index) {
    return this._checkpointList[index];
};

/**
 * @method getCheckpointList
 * @return {Array} checkpointList
 */
app.objects.CheckpointList.prototype.getCheckpointList = function getCheckpointList() {
    return this._checkpointList;
};

/**
 * @method length
 * @return {Number} length
 */
app.objects.CheckpointList.prototype.length = function length() {
    return this._checkpointList.length;
};

/**
 * @method clear
 */
app.objects.CheckpointList.prototype.clear = function clear() {
    this._checkpointList.length = 0;
};


/**
 * @method stringify
 * @return {String} result
 */
app.objects.CheckpointList.prototype.saveCheckpointListToJsonText = function saveCheckpointListToJsonText() {
    return JSON.stringify(this._checkpointList);
};

/**
 * @method loadCheckpointListFromJson
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
 * @method loadEnemyListFromJsonText
 * @param {String} jsonText
 */
app.objects.CheckpointList.prototype.loadCheckpointListFromJsonText = function loadCheckpointListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadCheckpointListFromJson(myJson);
};