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
    
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Constructor in " + this.constructor.name +
            "is abstract and should be override");
    }

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
     * Sciezka aktualnego eventu
     * 
     * @property {Array} eventViewPath
     * @private
     */
    this._eventViewPath = [];
    
    /**
     * Sciezka poprzedniego eventu
     * 
     * @property {Array} eventViewLastPath
     * @private
     */
    this._eventViewLastPath = [];
};

Utils.inherits(support.AbstractMouseEventHandler, Object);

/**
 * @method onMouseDown
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseDown in " + this.constructor.name +
            "is abstract and should be override");
    }
    
    this.clearEventViewPath();
};

/**
 * @method onMouseMove
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseMove in " + this.constructor.name +
            "is abstract and should be override");
    }
    
    this.clearEventViewPath();
};

/**
 * @method onMouseDrag
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseDrag in " + this.constructor.name +
            "is abstract and should be override");
    }
    
    this.clearEventViewPath();
};

/**
 * @method onMouseUp
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseUp in " + this.constructor.name +
            "is abstract and should be override");
    }
    
    this.clearEventViewPath();
};

/**
 * @method onMouseLeave
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseLeave = function onMouseLeave(e) {
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseLeave in " + this.constructor.name +
            "is abstract and should be override");
    }
    
    this.clearEventViewPath();
};

/**
 * @method getEventTargetView
 * @public
 * @return {support.view.AbstractView} eventTargetView
 */
support.AbstractMouseEventHandler.prototype.getEventTargetView = function getEventTargetView(){
    return this._eventTargetView;
};

/**
 * @method getEventTargetViewPath
 * @public
 * @return {Array} eventTargetViewPath
 */
support.AbstractMouseEventHandler.prototype.getEventTargetViewPath = function getEventTargetViewPath(){
    return this._eventTargetViewPath;
};

/**
 * @method getEventViewPath
 * @public
 * @return {Array} eventViewPath
 */
support.AbstractMouseEventHandler.prototype.getEventViewPath = function getEventViewPath(){
    return this._eventViewPath;
};

/**
 * @method getEventViewLastPath
 * @public
 * @return {Array} eventViewLastPath
 */
support.AbstractMouseEventHandler.prototype.getEventViewLastPath = function getEventViewLastPath(){
    return this._eventViewLastPath;
};

/**
 * @method addEventViewPath
 * @public
 * @param {support.view.AbstracyView} abstractView
 */
support.AbstractMouseEventHandler.prototype.addEventViewPath = function addEventViewPath(abstractView){
    this._eventViewPath.push(abstractView);
};

/**
 * @method setEventTargetView
 * @public
 * @param {support.view.AbstractView} eventTargetView
 */
support.AbstractMouseEventHandler.prototype.setEventTargetView = function setEventTargetView(eventTargetView){
    
    var view = eventTargetView;
    
    //set target view
    this._eventTargetView = eventTargetView;
    
    
    //create path to target view
    this._eventTargetViewPath = [];
    
    while (view !== null){
    
        this._eventTargetViewPath.unshift(view);
        
        //view became parent view
        view = view.getParentViewGroup();
    }
    
};

/**
 * @method clearTargetView
 * @public
 */
support.AbstractMouseEventHandler.prototype.clearTargetView = function clearTargetView(){
    this._eventTargetView = null;
    this._eventTargetViewPath = [];
};

/**
 * @method clearEventViewPath
 * @public
 */
support.AbstractMouseEventHandler.prototype.clearEventViewPath = function clearEventViewPath(){
    this._eventViewPath = [];
};

/**
 * @method endEventPath
 * @public
 * @param {support.MouseEvent} mouseEvent
 */
support.AbstractMouseEventHandler.prototype.endEventPath = function endEventPath(mouseEvent){
    
//    console.log(this._eventViewLastPath);
//    console.log(this._eventViewPath);
    
    var index = 0,
        view = null,
        newMouseEvent = null;
    
    for (index = 0; index < this._eventViewLastPath.length; index++) {
        view = this._eventViewLastPath[index];
        
        if (this._eventViewPath.indexOf(view) === -1) {
            
            newMouseEvent = new support.MouseEvent(mouseEvent.getMouseEventHandler(), -1, -1, false, support.MouseEventType.MOUSE_LEAVE);
            
            view.onMouseEvent(newMouseEvent);
        }
    }
    
    this._eventViewLastPath = this._eventViewPath.slice();
    
};