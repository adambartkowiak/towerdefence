/**
 * Created by adambartkowiak on 23.04.2015.
 */
'use strict';

/**
 * @namespace
 * @type {support|*|{}}
 */
var support = support || {};

/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace support
 */
support.Timer = function Timer() {

    /**
     * @property _delta
     * @type Number
     */
    this._time = 0;

    /**
     * @property {Number} delta
     */
    this._lastTime = 0;
    
    /**
     * @property {Number} delta
     */
    this._delta = 0;
    
};

/**
 * @inheritance
 */
Utils.inherits(support.Timer, Object);

/**
 * @methodName calcDelta
 */
support.Timer.prototype.updateDelta = function updateDelta() {
    this._time = new Date();
    
    if (this._lastTime !== 0){
        this._delta = this._time - this._lastTime;
    }
    
    this._lastTime = this._time;
    
};

/**
 * @methodName calcDelta
 * @return {Number} delta
 */
support.Timer.prototype.getDelta = function getDelta() {
    return this._delta;
};