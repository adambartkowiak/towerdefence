/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class Mouse
 * @constructor
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.Mouse = function Mouse(mouseEventHandler) {

    var that = this;

    /**
     * @property _mouseDownEventReferenc
     */
    this._mouseDragHandler = function (e) {
        that.mouseDrag(e);
    };

    /**
     * @property {support.AbstractMouseEventHandler} _mouseEventHandler
     * @private
     */
    this._mouseEventHandler = mouseEventHandler;

};

Utils.inherits(support.Mouse, Object);

/**
 * @method initMouse
 */
support.Mouse.prototype.initMouse = function initMouse() {
    var that = this;

    window.addEventListener("mousedown", function (e) {
        that.mouseDown(e);
        return false;
    }, false);

    window.addEventListener("mousemove", function (e) {
        that.mouseMove(e);
        return false;
    }, false);

    window.addEventListener("mouseup", function (e) {
        that.mouseUp(e);
        return false;
    }, false);

    window.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        //alert('success!');
        return false;
    }, false);
};

/**
 * @method mouseDown
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
 * @method mouseMove
 * @param {Event} e
 */
support.Mouse.prototype.mouseMove = function mouseMove(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseMove(e);
    }
};

/**
 * @method mouseDrag
 * @param {Event} e
 */
support.Mouse.prototype.mouseDrag = function mouseDrag(e) {

    //wywolywanie eventu handlera
    if (Boolean(this._mouseEventHandler) === true) {
        this._mouseEventHandler.onMouseDrag(e);
    }
};

/**
 * @method mouseUp
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
 * @method setMouseEventHandler
 * @param {support.AbstractMouseEventHandler} abstractMouseEventHandler
 */
support.Mouse.prototype.setMouseEventHandler = function setMouseEventHandler(abstractMouseEventHandler) {
    this._mouseEventHandler = abstractMouseEventHandler;
};

