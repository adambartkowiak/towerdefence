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
 * @param {support.Timer} timer
 * @param {app.model.EntityListModel} entityList
 */
app.mouseHandler.MouseEventHandler = function MouseEventHandler(timer, entityList, worldModel) {

    support.AbstractMouseEventHandler.call(this);

    /**
     * @property {support.Timer} _timer
     * @private
     */
    this._timer = timer;

    /**
     * @property {app.model.EntityListModel} _entityListModel
     * @private
     */
    this._entityListModel = entityList;

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {boolean} _isShiftPressed
     * @private
     */
    this._isShiftPressed = false;


    this._rightClickOffsetX = 0;
    this._rightClickOffsetY = 0;

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
    
    if (e.target.id !== "map") {
        return;
    }

    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_DOWN);
    this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);

//    var listLength = this._entityListModel.length();
//    var elementIndex;
//    var element;
//
//    if (e.shiftKey) {
//        this._isShiftPressed = true;
//    } else {
//        this._isShiftPressed = false;
//    }
//
//    /*
//    kasowanie z mapy
//     */
//    if (e.altKey) {
//
//        for (elementIndex = listLength - 1; elementIndex >= 0; elementIndex--) {
//            element = this._entityListModel.getElement(elementIndex);
//
//            if (element.getSelected()) {
//                this._entityListModel.removeElement(elementIndex);
//            }
//
//        }
//
//    }


};

/**
 * @method onMouseUp
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {

    support.AbstractMouseEventHandler.prototype.onMouseUp.call(this, e);
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_UP);
    this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    
    this.clearTargetView();

};

/**
 * @method onMouseMove
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {
    
    support.AbstractMouseEventHandler.prototype.onMouseMove.call(this, e);

    if (e.target.id !== "map") {
        return;
    }
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_MOVE);
    this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);

};

/**
 * @method onMouseDrag
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {

    support.AbstractMouseEventHandler.prototype.onMouseDrag.call(this, e);

    if (e.target.id !== "map") {
        return;
    }
    
    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_DRAG);
    this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);

};


/**
 * @method onMouseLeave
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseLeave = function onMouseLeave(e) {
    
    support.AbstractMouseEventHandler.prototype.onMouseLeave.call(this, e);

    var mouseEvent = new support.MouseEvent(this, e.offsetX, e.offsetY, e.button, support.MouseEventType.MOUSE_LEAVE);
    this._mouseEventListenerArray[0].dispatchMouseEvent(mouseEvent);
    
    this.clearTargetView();
};