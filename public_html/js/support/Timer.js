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
     * @property {Number} _time
     */
    this._time = 0;

    /**
     * @property {Number} _lastTime
     */
    this._lastTime = 0;
    
    /**
     * @property {Number} _delta
     */
    this._delta = 0;
    
    /**
     * @property {Boolean} isRunning
     */
    this._isRunning = true;
    
    /**
     * @property {Number} multip
     */
    this._multiplier = 1.0;
    
    /**
     * @property {Interval} interval
     */
    this._interval = null;
    
    
    
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
    
    if (this._isRunning && this._lastTime !== 0){
        this._delta = this._time - this._lastTime;
        this._delta *= this._multiplier;
    } else {
        this._delta = 0;
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

/**
 * @methodName start
 */
support.Timer.prototype.start = function start() {
    this._isRunning = true;
};

/**
 * @methodName stop
 */
support.Timer.prototype.stop = function stop() {
    this._isRunning = false;
};

/**
 * @methodName changeMultiplier
 * @param {Number} newValue
 */
support.Timer.prototype.changeMultiplier = function changeMultiplier(newValue) {
    
    var that = this;
    var step = (newValue - that._multiplier)/20;
    
    if (that._interval !== null){
        clearInterval(that._interval);
    }
    
    that._interval = setInterval(function(){
        
        that._multiplier += (newValue - that._multiplier)/4;
        
        //console.log(that._multiplier);
        
        if (Math.abs(newValue - that._multiplier) <= Math.abs(step)){
            that._multiplier = newValue;
            clearInterval(that._interval);
            that._interval = null;
        }
}, 50);
    
};

