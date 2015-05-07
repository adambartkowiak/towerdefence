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
 * @methodName getBullet
 * @param {Number} index
 * @return {app.objects.Checkpoint} bulet
 */
app.objects.CheckpointList.prototype.getCheckpoint = function getCheckpoint(index) {
    return this._checkpointList[index];
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.CheckpointList.prototype.length = function length() {
    return this._checkpointList.length;
};