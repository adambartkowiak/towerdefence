/**
 * Created by adambartkowiak on 12.12.2013.
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
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.Mouse = function Mouse(mouseEventHandler) {

    var that = this;

    /**
     * @property _mouseDownEventReferenc
     * @type Number
     */
    this._mouseDragHandler = function (e) {
        that.mouseDrag(e);
    };

    /**
     * @property _mouseEventHandler
     * @type support.AbstractMouseEventHandler
     */
    this._mouseEventHandler = mouseEventHandler;

};

/**
 * @inheritance
 */
Utils.inherits(support.Mouse, Object);

/**
 * @methodName initMouse
 */
support.Mouse.prototype.initMouse = function initMouse() {
    var that = this;

    window.addEventListener("mousedown", function (e) {
        that.mouseDown(e);
    }, false);

    window.addEventListener("mousemove", function (e) {
        that.mouseMove(e);
    }, false);

    window.addEventListener("mouseup", function (e) {
        that.mouseUp(e);
    }, false);

};

/**
 * @methodName mouseDown
 * @param {Event} e
 */
support.Mouse.prototype.mouseDown = function mouseDown(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseDown(e);
    }

    window.addEventListener("mousemove", this._mouseDragHandler, false);
};

/**
 * @methodName mouseMove
 * @param {Event} e
 */
support.Mouse.prototype.mouseMove = function mouseMove(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseMove(e);
    }
};

/**
 * @methodName mouseDrag
 * @param {Event} e
 */
support.Mouse.prototype.mouseDrag = function mouseDrag(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseDrag(e);
    }
};

/**
 * @methodName mouseUp
 * @param {Event} e
 */
support.Mouse.prototype.mouseUp = function mouseUp(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseUp(e);
    }

    window.removeEventListener("mousemove", this._mouseDragHandler, false);
};

/**
 * @methodName setMouseEventHandler
 * @param {support.AbstractMouseEventHandler} abstractMouseEventHandler
 */
support.Mouse.prototype.setMouseEventHandler = function setMouseEventHandler(abstractMouseEventHandler) {
    this._mouseEventHandler = abstractMouseEventHandler;
};

