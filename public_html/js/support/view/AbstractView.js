/**
 * Created by adambartkowiak on 07/09/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class AbstractView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
support.view.AbstractView = function AbstractView(x, y, width, height) {

    /**
     * @property {support.view.AbstractViewGroup} parentView
     * @private
     */
    this._parentViewGroup = null;

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
     * @property {number} width
     * @private
     */
    this._width = width;

    /**
     * @property {number} height
     * @private
     */
    this._height = height;

    /**
     * @property {string} backgroundColor
     * @private
     */
    this._backgroundColor = '#222222';

    /**
     * @property {support.AbstractMouseEventListener} mouseEventListener
     * @private
     */
    this._mouseEventListener = null;
};

Utils.inherits(support.view.AbstractView, Object);

/**
 * @method getParentViewGroup
 * @return {support.view.AbstractViewGroup} parentViewGroup
 */
support.view.AbstractView.prototype.getParentViewGroup = function getParentViewGroup() {
    return this._parentViewGroup;
};

/**
 * @method getX
 * @return {number} x
 */
support.view.AbstractView.prototype.getX = function getX() {
    return this._x;
};

/**
 * @method getY
 * @return {number} y
 */
support.view.AbstractView.prototype.getY = function getY() {
    return this._y;
};

/**
 * @method getWidth
 * @return {number} width
 */
support.view.AbstractView.prototype.getWidth = function getWidth() {
    return this._width;
};

/**
 * @method getHeight
 * @return {number} height
 */
support.view.AbstractView.prototype.getHeight = function getHeight() {
    return this._height;
};

/**
 * @method getBackgroundColor
 * @return {string} backgroundColor
 */
support.view.AbstractView.prototype.getBackgroundColor = function getBackgroundColor() {
    return this._backgroundColor;
};

/**
 * @method getEventListener
 * @return {support.AbstractMouseEventListener} _mouseEventListener
 */
support.view.AbstractView.prototype.getMouseEventListener = function getMouseEventListener() {
    return this._mouseEventListener;
};

/**
 * @method setParentViewGroup
 * @param {support.view.AbstractViewGroup} abstractViewGroup
 */
support.view.AbstractView.prototype.setParentViewGroup = function setParentViewGroup(abstractViewGroup) {
    this._parentViewGroup = abstractViewGroup;
};

/**
 * @method setX
 * @param {number} x
 */
support.view.AbstractView.prototype.setX = function setX(x) {
    this._x = x;
};

/**
 * @method setY
 * @param {number} y
 */
support.view.AbstractView.prototype.setY = function setY(y) {
    this._y = y;
};

/**
 * @method setWidth
 * @param {number} width
 */
support.view.AbstractView.prototype.setWidth = function setWidth(width) {
    this._width = width;
};

/**
 * @method setHeight
 * @param {number} height
 */
support.view.AbstractView.prototype.setHeight = function setHeight(height) {
    this._height = height;
};

/**
 * @method setBackgroundColor
 * @param {number} backgroundColor
 */
support.view.AbstractView.prototype.setBackgroundColor = function setBackgroundColor(backgroundColor) {
    this._backgroundColor = backgroundColor;
};

/**
 * @method setMouseEventListener
 * @param {support.AbstractMouseEventListener} mouseEventListener
 */
support.view.AbstractView.prototype.setMouseEventListener = function setMouseEventListener(mouseEventListener) {
    this._mouseEventListener = mouseEventListener;
};

/**
 * Metoda sluzaca do rozpropagowania eventu do widokow dzieci lub do siebie.
 * Kiedy nie ma wybranego targetu dla Eventu to onMouseEvent sa wywolywane dla kazdego elementu, ktory znajduje sie pod muszka.
 * Kiedy jest wybrany target event jest dostarczany do Targetu nawet kiedy nie jest juz pod myszka
 *
 * @method dispatchMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - widok uzywa eventu, false - widok nie uzywa eventu
 */
support.view.AbstractView.prototype.dispatchMouseEvent = function dispatchMouseEvent(mouseEvent){
    
    var newMouseEvent = null;
    
    //w ostatnim evencie nie bylo tego widoku - to znaczy ze myszka wjechala na ten widok
    if (mouseEvent.getEventTargetView() === null && mouseEvent.getEventViewLastPath().indexOf(this) === -1){
        newMouseEvent = new support.MouseEvent(mouseEvent.getMouseEventHandler(), mouseEvent.getX(), mouseEvent.getY(), mouseEvent.getButtonCode(), support.MouseEventType.MOUSE_ENTER);
        newMouseEvent.setLocalX( mouseEvent.getLocalX() );
        newMouseEvent.setLocalY( mouseEvent.getLocalY() );
        
        this.onMouseEvent(newMouseEvent);
    }
    
    return this.onMouseEvent(mouseEvent);
};

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.AbstractView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){
//    console.log("-----" + this.constructor.name + "-----");
//    console.log(mouseEvent);
    
    var result = false;
    
    mouseEvent.setCurrentlyVisitedView(this);
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN){
        result = true;
    } 
    
    if (this._mouseEventListener !== null){
        this._mouseEventListener.onMouseEvent(mouseEvent);   
    }
    
    return result;
    
};