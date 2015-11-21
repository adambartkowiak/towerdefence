/**
 * Created by adambartkowiak on 20.04.15.
 */
'use strict';

var app = app || {};
app.mouseHandler = app.mouseHandler || {};

var Utils = Utils || {};

/**
 * @namespace app.mouseHandler
 * @class MouseEventHandler
 * @constructor
 * @param {string} DOMelementId
 */
app.mouseHandler.MouseEventHandler = function MouseEventHandler(DOMelementId) {

    support.AbstractMouseEventHandler.call(this);

    /**
     * @property {string} _DOMelementId
     * @private
     */
    this._DOMelementId = DOMelementId;

    /**
     * @property {boolean} _isShiftPressed
     * @private
     */
    this._mouseEventListenerArray = [];

};

Utils.inherits(app.mouseHandler.MouseEventHandler, support.AbstractMouseEventHandler);

/**
 * @method addMouseEventListener
 * @param {Object} object
 */

app.mouseHandler.MouseEventHandler.prototype.addMouseEventListener = function addMouseEventListener(object) {
    this._mouseEventListenerArray.push(object);
};

/**
 * @method onMouseDown
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {
    
    support.AbstractMouseEventHandler.prototype.onMouseDown.call(this, e);
    
    if (e.target.id !== this._DOMelementId) {
        return;
    }

    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_DOWN);

    if (this._mouseEventListenerArray.length > 0){
        this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    }

};

/**
 * @method onMouseUp
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {

    support.AbstractMouseEventHandler.prototype.onMouseUp.call(this, e);
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_UP);

    if (this._mouseEventListenerArray.length > 0){
        this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    }
    
    this.clearTargetView();

};

/**
 * @method onMouseMove
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {

    support.AbstractMouseEventHandler.prototype.onMouseMove.call(this, e);

    if (e.target.id !== this._DOMelementId) {
        return;
    }

    console.log("app.mouseHandler.MouseEventHandler.prototype.onMouseMove");
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_MOVE);

    if (this._mouseEventListenerArray.length > 0){
        this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    }

};

/**
 * @method onMouseDrag
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {

    support.AbstractMouseEventHandler.prototype.onMouseDrag.call(this, e);

    if (e.target.id !== this._DOMelementId) {
        return;
    }
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_DRAG);

    if (this._mouseEventListenerArray.length > 0){
        this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    }

};


/**
 * @method onMouseLeave
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseLeave = function onMouseLeave(e) {
    
    support.AbstractMouseEventHandler.prototype.onMouseLeave.call(this, e);

    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_LEAVE);

    if (this._mouseEventListenerArray.length > 0){
        this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    }
    
    this.clearTargetView();
};