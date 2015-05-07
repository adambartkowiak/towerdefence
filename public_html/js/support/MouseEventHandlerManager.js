/**
 * Created by adambartkowiak on 19/12/13.
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
 * @param {support.Mouse} mouse
 */
support.MouseEventHandlerManager = function MouseEventHandlerManager(mouse) {

    /**
     *
     * @type {Mouse}
     * @private
     */
    this._mouse = mouse;

    /**
     *
     * @type {Array}
     * @private
     */
    this._eventHandlerArray = [];

    /**
     *
     * @type {number}
     * @private
     */
    this._eventHandlerArrayIndex = 0;
};

/**
 * @inheritance
 */
Utils.inherits(support.MouseEventHandlerManager, Object);

/**
* @methodName setActive
* @param {support.AbstractMouseEventHandler} mouseEventHandler
*/
support.MouseEventHandlerManager.prototype.addMouseEventHandler = function addMouseEventHandler(mouseEventHandler) {
    this._eventHandlerArray.push(mouseEventHandler);
    mouseEventHandler.setMouseEventHandlerManager(this);
};

/**
 * @methodName setActive
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.MouseEventHandlerManager.prototype.setActive = function setActive(mouseEventHandler) {
    this._mouse.setMouseEventHandler(mouseEventHandler);
    //TODO: Index ma byc ustawiony na podstawie indeksu ustawianego eventhandlera.
    //TODO: Teraz sie nic nie ustawia tutaj
};

/**
 * @methodName setActiveNext
 */
support.MouseEventHandlerManager.prototype.setActiveNext = function setActiveNext() {
    var mouseEventHandler;

    this._eventHandlerArrayIndex += 1;
    mouseEventHandler = this._eventHandlerArray[this._eventHandlerArrayIndex];
    this.setActive(mouseEventHandler);
};

