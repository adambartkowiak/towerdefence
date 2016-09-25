/**
 * Created by adambartkowiak on 23.04.2015.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class Timer
 * @constructor
 */
support.Timer = function Timer() {

    /**
     * @property {Number} _time
     * @private
     */
    this._time = 0;

    /**
     * @property {Number} _lastTime
     * @private
     */
    this._lastTime = 0;

    /**
     * @property {Number} _delta
     * @private
     */
    this._delta = 0;

    /**
     * @property {Boolean} isRunning
     * @private
     */
    this._isRunning = true;

    /**
     * @property {Number} multip
     * @private
     */
    this._multiplier = 1.0;

    /**
     * @property {Interval} interval
     * @private
     */
    this._interval = null;

    /**
     * @property {TimerListener} timerListener
     * @private
     */
    this._timerListener = null;

};

Utils.inherits(support.Timer, Object);

/**
 * @method setTimerListener
 * @param {TimerListener} timerListener
 */
support.Timer.prototype.setTimerListener = function setTimerListener(timerListener) {
    this._timerListener = timerListener;
};

/**
 * @method updateDelta
 */
support.Timer.prototype.updateDelta = function updateDelta() {
    this._time = new Date();

    if (this._isRunning && this._lastTime !== 0) {
        this._delta = this._time - this._lastTime;
        this._delta *= this._multiplier;
    } else {
        this._delta = 0;
    }

    if (this._timerListener !== null) {
        this._timerListener.onTimeDelta(this._delta);
    }

    this._lastTime = this._time;

};

/**
 * @method getDelta
 * @return {Number} delta
 */
support.Timer.prototype.getDelta = function getDelta() {
    return this._delta;
};

/**
 * @method start
 */
support.Timer.prototype.start = function start() {
    this._isRunning = true;
};

/**
 * @method stop
 */
support.Timer.prototype.stop = function stop() {
    this._isRunning = false;
};

/**
 * @method changeMultiplier
 * @param {Number} newValue
 */
support.Timer.prototype.changeMultiplier = function changeMultiplier(newValue) {

    var that = this;
    var step = (newValue - that._multiplier) / 20;

    if (that._interval !== null) {
        clearInterval(that._interval);
    }

    that._interval = setInterval(function () {

        that._multiplier += (newValue - that._multiplier) / 4;

        //console.log(that._multiplier);

        if (Math.abs(newValue - that._multiplier) <= Math.abs(step)) {
            that._multiplier = newValue;
            clearInterval(that._interval);
            that._interval = null;
        }
    }, 50);

};

/**
 * @method getLastTime
 * @return {Number} _latTime
 */
support.Timer.prototype.getLastTime = function getLastTime() {
    return this._lastTime;
};