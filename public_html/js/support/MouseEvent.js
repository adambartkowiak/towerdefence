/**
 * Created by adambartkowiak on 30/09/15.
 */

'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class MouseEvent
 * @constructor
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 * @param {number} x
 * @param {number} y
 * @param {MouseEventType} mouseEventType
 */
support.MouseEvent = function MouseEvent(mouseEventHandler, x, y, mouseEventType) {

    /**
     * @property {support.AbstractMouseEventHandler} x
     * @private
     */
    this._mouseEventHandler = mouseEventHandler;

    /**
     * @property {number} x
     * @private
     */
    this._x = x;

    /**
     * @property {number} y
     * @private
     */
    this._y = y;
    
    /**
     * @property {number} localX
     * @private
     */
    this._localX = x;

    /**
     * @property {number} localY
     * @private
     */
    this._localY = y;
    
    /**
     * @property {support.MouseEventType} mouseEventType
     * @private
     */
    this._mouseEventType = mouseEventType;
    
    /**
     * @property {support.view.AbstractView} eventTargetView
     * @private
     */
    this._eventTargetView = null;
    
    /**
     * Sciezka do TargetView
     * 
     * @property {Array} eventTargetViewPath
     * @private
     */
    this._eventTargetViewPath = [];
    
};

Utils.inherits(support.MouseEvent, Object);

/**
 * @method getX
 * @public
 * @return x
 */
support.MouseEvent.prototype.getMouseEventHandler = function getMouseEventHandler(){
    return this._mouseEventHandler;
};

/**
 * @method getX
 * @public
 * @return x
 */
support.MouseEvent.prototype.getX = function getX(){
    return this._x;
};

/**
 * @method getY
 * @public
 * @return y
 */
support.MouseEvent.prototype.getY = function getY(){
    return this._y;
};

/**
 * @method getLocalX
 * @public
 * @return localX
 */
support.MouseEvent.prototype.getLocalX = function getLocalX(){
    return this._localX;
};

/**
 * @method getLocalY
 * @public
 * @return localY
 */
support.MouseEvent.prototype.getLocalY = function getLocalY(){
    return this._localY;
};

/**
 * @method getMouseEventType
 * @public
 * @return {support.MouseEventType} mouseEventType
 */
support.MouseEvent.prototype.getMouseEventType = function getMouseEventType(){
    return this._mouseEventType;
};

/**
 * @method getEventTargetView
 * @public
 * @return {support.view.AbstractView} eventTargetView
 */
support.MouseEvent.prototype.getEventTargetView = function getEventTargetView(){
    return this.getMouseEventHandler().getEventTargetView();
};

/**
 * @method getEventTargetViewPath
 * @public
 * @return {Array} eventTargetViewPath
 */
support.MouseEvent.prototype.getEventTargetViewPath = function getEventTargetViewPath(){
    return this.getMouseEventHandler().getEventTargetViewPath();
};

/**
 * @method setLocalX
 * @public
 * @param {number} localX
 */
support.MouseEvent.prototype.setLocalX = function setLocalX(localX){
    this._localX = localX;
};

/**
 * @method setLocalY
 * @public
 * @param {number} localY
 */
support.MouseEvent.prototype.setLocalY = function setLocalY(localY){
    this._localY = localY;
};

/**
 * @method setMouseEventType
 * @public
 * @param {support.MouseEventType} mouseEventType
 */
support.MouseEvent.prototype.setMouseEventType = function setMouseEventType(mouseEventType){
    this._mouseEventType = mouseEventType;
};

/**
 * @method setEventTargetView
 * @public
 * @param {support.view.AbstractView} eventTargetView
 */
support.MouseEvent.prototype.setEventTargetView = function setEventTargetView(eventTargetView){
    return this.getMouseEventHandler().setEventTargetView(eventTargetView);
};
