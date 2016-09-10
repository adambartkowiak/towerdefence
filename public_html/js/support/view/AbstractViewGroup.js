/**
 * Created by adambartkowiak on 30/09/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class AbstractViewGroup
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
support.view.AbstractViewGroup = function AbstractViewGroup(x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, x, y, width, height);

    this._views = [];

};

Utils.inherits(support.view.AbstractViewGroup, support.view.AbstractView);

/**
 * @method addView
 * @public
 * @param {support.view.AbstractView} abstractView
 */
support.view.AbstractViewGroup.prototype.addView = function addView(abstractView){
    abstractView.setParentViewGroup(this);
    this._views.push(abstractView);
};

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
support.view.AbstractViewGroup.prototype.draw = function draw(canvas){

    support.view.AbstractView.prototype.draw.call(this, canvas);

    var index,
        length = this._views.length,
        view;

    for (index = 0; index < length; index++){
        view = this._views[index];
        view.draw(canvas);
    }
};

/**
 * Metoda sluzaca do rozpropagowania eventu do widokow dzieci lub do siebie.
 * Kiedy nie ma wybranego targetu dla Eventu to onMouseEvent sa wywolywane dla kazdego elementu, ktory znajduje sie pod myszka.
 * Kiedy jest wybrany target event jest dostarczany do Targetu nawet kiedy nie jest juz pod myszka
 *
 * @method dispatchMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - widok uzywa eventu, false - widok nie uzywa eventu
 */
support.view.AbstractViewGroup.prototype.dispatchMouseEvent = function dispatchMouseEvent(mouseEvent){

    var index,
        length = this._views.length,
        view,
        dispatchResult = false,
        mousePoint = new support.geom.Point2d(mouseEvent.getLocalX(), mouseEvent.getLocalY()),
        viewRect = new support.geom.Rect(0,0,0,0),
        localX = mouseEvent.getLocalX(),
        localY = mouseEvent.getLocalY();

    this.onInterceptMouseEvent(mouseEvent);
        
    for (index = length-1; index >= 0; index--){
        view = this._views[index];

        viewRect.setX(view.getX());
        viewRect.setY(view.getY());
        viewRect.setWidth(view.getWidth());
        viewRect.setHeight(view.getHeight());
        
        //eventPath
        if(support.geom.collision.Collision.Point2dRect(mousePoint, viewRect)){
            mouseEvent.addEventViewPath(view);
        }
        
        //targetView
        if (mouseEvent.getEventTargetView() !== null){
            if(mouseEvent.getEventTargetViewPath().indexOf(view) !== -1){
                mouseEvent.setLocalX(localX - view.getX());
                mouseEvent.setLocalY(localY - view.getY());

                view.dispatchMouseEvent(mouseEvent);
            }
        }
        //no targte view check
        else if ( support.geom.collision.Collision.Point2dRect(mousePoint, viewRect)){
            mouseEvent.setLocalX(localX - view.getX());
            mouseEvent.setLocalY(localY - view.getY());
            dispatchResult = view.dispatchMouseEvent(mouseEvent);
            
            if (dispatchResult === true){
                mouseEvent.setEventTargetView(view); //dostaje move ale nie dostaje UP'a
                
            }
        }
        
    }
    
    if(this.getParentViewGroup() === null){
        mouseEvent.getMouseEventHandler().endEventPath(mouseEvent);
    }
    
    return this.onMouseEvent(mouseEvent);
    
};

/**
 * Metoda sluzaca do podgladania eventu kiedy jest on rozpropagowywany.
 * Metoda moze zatrzymac rozpropagowywanie kiedy event ma swoj target.
 *
 * @method onInterceptMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.AbstractViewGroup.prototype.onInterceptMouseEvent = function onInterceptMouseEvent(mouseEvent){
    
    //console.log("support.view.AbstractViewGroup.prototype.onInterceptMouseEvent");
    //Interesuje mnie ten event ? Jak tak to true - wtedy wywola sie metoda onTouch tego widoku
    
};

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.AbstractViewGroup.prototype.onMouseEvent = function onMouseEvent(mouseEvent){
    
    support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
    
    return false;
};