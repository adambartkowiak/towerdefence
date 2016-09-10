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
     * @property _mouseDragHandler
     */
    this._mouseDragHandler = function (e) {
        that.mouseDrag(e);
    };

    /**
     * @property {Array} _mouseEventHandlerArray
     * @private
     */
    this._mouseEventHandlerArray = [];
    if (mouseEventHandler !== undefined){
        this._mouseEventHandlerArray.push(mouseEventHandler);
    }

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

    window.addEventListener("mouseleave", function (e) {
        that.mouseLeave(e);
        return false;
    }, false);

    window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    }, false);
};

/**
 * @method addMouseEventHandler
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.Mouse.prototype.addMouseEventHandler = function addMouseEventHandler(mouseEventHandler) {

    this._mouseEventHandlerArray.push(mouseEventHandler);

};

/**
 * @method mouseDown
 * @param {Event} e
 */
support.Mouse.prototype.mouseDown = function mouseDown(e) {

    var i;

    //wywolanie funkcji na wszystkich podpietych handlerach
    for (i = 0; i < this._mouseEventHandlerArray.length; i++) {
        this._mouseEventHandlerArray[i].onMouseDown(e);
    }

    window.addEventListener("mousemove", this._mouseDragHandler, false);
};

/**
 * @method mouseMove
 * @param {Event} e
 */
support.Mouse.prototype.mouseMove = function mouseMove(e) {

    var i;

    //wywolanie funkcji na wszystkich podpietych handlerach
    for (i = 0; i < this._mouseEventHandlerArray.length; i++) {
        this._mouseEventHandlerArray[i].onMouseMove(e);
    }
};

/**
 * @method mouseDrag
 * @param {Event} e
 */
support.Mouse.prototype.mouseDrag = function mouseDrag(e) {

    var i;

    //wywolanie funkcji na wszystkich podpietych handlerach
    for (i = 0; i < this._mouseEventHandlerArray.length; i++) {
        this._mouseEventHandlerArray[i].onMouseDrag(e);
    }
};

/**
 * @method mouseUp
 * @param {Event} e
 */
support.Mouse.prototype.mouseUp = function mouseUp(e) {

    var i;

    //wywolanie funkcji na wszystkich podpietych handlerach
    for (i = 0; i < this._mouseEventHandlerArray.length; i++) {
        this._mouseEventHandlerArray[i].onMouseUp(e);
    }

    window.removeEventListener("mousemove", this._mouseDragHandler, false);
};

/**
 * @method mouseLeave
 * @param {Event} e
 */
support.Mouse.prototype.mouseLeave = function mouseLeave(e) {

    var i;

    //wywolanie funkcji na wszystkich podpietych handlerach
    for (i = 0; i < this._mouseEventHandlerArray.length; i++) {
        this._mouseEventHandlerArray[i].onMouseLeave(e);
    }
};

/**
 * @method setMouseEventHandler
 * @param {support.AbstractMouseEventHandler} abstractMouseEventHandler
 */
support.Mouse.prototype.setMouseEventHandler = function setMouseEventHandler(abstractMouseEventHandler) {
    console.log("Method support.Mouse.prototype.setMouseEventHandler is Depreceted");
};

