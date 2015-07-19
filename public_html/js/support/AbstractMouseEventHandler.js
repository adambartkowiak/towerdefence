/**
 * Created by adambartkowiak on 14.12.2013.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class AbstractMouseEventHandler
 * @constructor
 */
support.AbstractMouseEventHandler = function AbstractMouseEventHandler() {
    throw new Error("Constructor in " + this.constructor.name +
        "is abstract and should be override");

    /**
     * @type {support.MouseEventHandlerManager} _mouseEventHandlerManager
     * @private
     */
    this._mouseEventHandlerManager = null;
};

Utils.inherits(support.AbstractMouseEventHandler, Object);

/**
 * @method onMouseDown
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {
    throw new Error("Method: onMouseDown in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @method onMouseMove
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {
    throw new Error("Method: onMouseMove in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @method onMouseDrag
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {
    throw new Error("Method: onMouseDrag in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @method onMouseUp
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {
    throw new Error("Method: onMouseUp in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @method getMouseEventHandlerManager
 * @return {support.MouseEventHandlerManager} mouseEventHandlerManager
 */
support.AbstractMouseEventHandler.prototype.getMouseEventHandlerManager = function getMouseEventHandlerManager() {
    return this._mouseEventHandlerManager;
};

/**
 * @method setMouseEventHandlerManager
 * @param {support.MouseEventHandlerManager} mouseEventHandlerManager
 */
support.AbstractMouseEventHandler.prototype.setMouseEventHandlerManager = function setMouseEventHandlerManager(mouseEventHandlerManager) {
    this._mouseEventHandlerManager = mouseEventHandlerManager;
};