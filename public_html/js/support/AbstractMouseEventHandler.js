/**
 * Created by adambartkowiak on 14.12.2013.
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
support.AbstractMouseEventHandler = function AbstractMouseEventHandler() {
    throw new Error("Constructor in " + this.constructor.name +
        "is abstract and should be override");

    /**
     *
     * @type {support.MouseEventHandlerManager}
     * @private
     */
    this._mouseEventHandlerManager = null;
};

/**
 * @inheritance
 */
Utils.inherits(support.AbstractMouseEventHandler, Object);

/**
 * @methodName onMouseDown
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {
    throw new Error("Method: onMouseDown in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @methodName onMouseMove
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {
    throw new Error("Method: onMouseMove in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @methodName onMouseDrag
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {
    throw new Error("Method: onMouseDrag in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @methodName onMouseUp
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {
    throw new Error("Method: onMouseUp in " + this.constructor.name +
        "is abstract and should be override");
};

/**
 * @methodName getMouseEventHandlerManager
 * @public
 * @return {support.MouseEventHandlerManager} mouseEventHandlerManager
 */
support.AbstractMouseEventHandler.prototype.getMouseEventHandlerManager = function getMouseEventHandlerManager() {
    return this._mouseEventHandlerManager;
};

/**
 * @methodName setMouseEventHandlerManager
 * @param {support.MouseEventHandlerManager} mouseEventHandlerManager
 * @public
 */
support.AbstractMouseEventHandler.prototype.setMouseEventHandlerManager = function setMouseEventHandlerManager(mouseEventHandlerManager) {
    this._mouseEventHandlerManager = mouseEventHandlerManager;
};