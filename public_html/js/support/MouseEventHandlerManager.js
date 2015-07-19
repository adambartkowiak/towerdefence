/**
 * Created by adambartkowiak on 19/12/13.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class MouseEventHandlerManager
 * @constructor
 * @param {support.Mouse} mouse
 */
support.MouseEventHandlerManager = function MouseEventHandlerManager(mouse) {

    /**
     * @property {support.Mouse} _mouse
     * @private
     */
    this._mouse = mouse;

    /**
     * @property {Array} _eventHandlerArray
     * @private
     */
    this._eventHandlerArray = [];

    /**
     * @property {Number} _eventHandlerArrayIndex
     * @private
     */
    this._eventHandlerArrayIndex = 0;
};

Utils.inherits(support.MouseEventHandlerManager, Object);

/**
 * @method setActive
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.MouseEventHandlerManager.prototype.addMouseEventHandler = function addMouseEventHandler(mouseEventHandler) {
    this._eventHandlerArray.push(mouseEventHandler);
    mouseEventHandler.setMouseEventHandlerManager(this);
};

/**
 * @method setActive
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.MouseEventHandlerManager.prototype.setActive = function setActive(mouseEventHandler) {
    this._mouse.setMouseEventHandler(mouseEventHandler);
    //TODO: Index ma byc ustawiony na podstawie indeksu ustawianego eventhandlera.
    //TODO: Teraz sie nic nie ustawia tutaj
};

/**
 * @method setActiveNext
 */
support.MouseEventHandlerManager.prototype.setActiveNext = function setActiveNext() {
    var mouseEventHandler;

    this._eventHandlerArrayIndex += 1;
    mouseEventHandler = this._eventHandlerArray[this._eventHandlerArrayIndex];
    this.setActive(mouseEventHandler);
};

