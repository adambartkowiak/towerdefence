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
 * @param {number} buttonCode
 * @param {MouseEventType} mouseEventType
 */
support.MouseEvent = function MouseEvent(mouseEventHandler, x, y, buttonCode, mouseEventType) {

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
    this._buttonCode = buttonCode;
    
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
    
    /**
     * @property {support.view.AbstractView} currentlyVisitedView
     * @private
     */
    this._currentlyVisitedView = null;
    
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
 * @method getButtonCode
 * @public
 * @return buttonCode
 */
support.MouseEvent.prototype.getButtonCode = function getButtonCode(){
    return this._buttonCode;
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
 * @method getEventViewPath
 * @public
 * @return {Array} eventTargetViewPath
 */
support.MouseEvent.prototype.getEventViewPath = function getEventViewPath(){
    return this.getMouseEventHandler().getEventViewPath();
};

/**
 * @method getEventViewLastPath
 * @public
 * @return {Array} eventTargetViewPath
 */
support.MouseEvent.prototype.getEventViewLastPath = function getEventViewLastPath(){
    return this.getMouseEventHandler().getEventViewLastPath();
};

/**
 * @method getCurrentlyVisitedView
 * @public
 * @return {support.AbstractMouseEventListener} currentMouseEventListener
 */
support.MouseEvent.prototype.getCurrentlyVisitedView = function getCurrentlyVisitedView(){
    return this._currentlyVisitedView;
};

/**
 * @method addEventViewPath
 * @public
 * @param {support.view.AbstractView} abstractView
 */
support.MouseEvent.prototype.addEventViewPath = function addEventViewPath(abstractView){
    return this.getMouseEventHandler().addEventViewPath(abstractView);
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

/**
 * @method setCurrentlyVisitedView
 * @public
 * @param {support.view.AbstractView} abstractView
 */
support.MouseEvent.prototype.setCurrentlyVisitedView = function setCurrentlyVisitedView(abstractView){
    this._currentlyVisitedView = abstractView;
};

/**
 * @method isMousePointerInsideTargetView
 * @public
 */
support.MouseEvent.prototype.isMousePointerInsideTargetView = function isMousePointerInsideTargetView(){
    
    var targetView = this.getEventTargetView(),
        mousePoint = null,
        targetViewRect = null,
        result = false;
    
        if (targetView !== null){
            mousePoint = new support.geom.Point2d(this.getLocalX(), this.getLocalY());
            targetViewRect = new support.geom.Rect(0, 0, targetView.getWidth(), targetView.getHeight());

            if(support.geom.collision.Collision.Point2dRect(mousePoint, targetViewRect)){
                result = true;
            }
        }
    
    return result;
};
