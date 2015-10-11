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
};

/**
 * @method onMouseUp
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {
    
    this._eventTargetView = null;
    this._eventTargetViewPath = [];
    
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseUp in " + this.constructor.name +
            "is abstract and should be override");
    }
};

/**
 * @method onMouseLeave
 * @param {Event} e
 */
support.AbstractMouseEventHandler.prototype.onMouseLeave = function onMouseLeave(e) {
    
    this._eventTargetView = null;
    this._eventTargetViewPath = [];
    
    if (this.constructor.name === "AbstractMouseEventHandler"){
        throw new Error("Method: onMouseLeave in " + this.constructor.name +
            "is abstract and should be override");
    }
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