/**
 * Created by adambartkowiak on 17/10/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class LabelView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
support.view.LabelView = function LabelView(x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, x, y, width, height);

    /**
     * @property {string} _text
     * @private
     */
    this._text = "";

    /**
     * @property {string[]} _textReference
     * @private
     */
    this._textReference = null;

};

Utils.inherits(support.view.LabelView, support.view.AbstractView);

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
support.view.LabelView.prototype.draw = function draw(canvas){

    support.view.AbstractView.prototype.draw.call(this, canvas);

    var canvasContext = canvas.getContext("2d");

    if (this._backgroundColor !== null){
        canvasContext.fillStyle = this.getBackgroundColor();
        canvasContext.fillRect(this.getRelativeX(), this.getRelativeY(), this.getWidth(), this.getHeight());
    }

    canvasContext.textAlign="center";

    canvasContext.fillStyle = '#FFFFFF';
    if (!!this._textReference && this._textReference[0] !== undefined){
        canvasContext.fillText(this._textReference[0], this.getRelativeX() + this.getWidth()/2, this.getRelativeY() + this.getHeight()/2-4);
    } else {
        canvasContext.fillText(this._text, this.getRelativeX() + this.getWidth()/2, this.getRelativeY() + this.getHeight()/2-4);
    }

    canvasContext.textAlign="start";
    
};

/**
 * @method setText
 * @param {string} text
 */
support.view.AbstractView.prototype.setText = function setText(text) {
    this._text = text;
};

/**
 * @method getText
 * @reutn (string) text
 */
support.view.AbstractView.prototype.getText = function getText() {
    return this._text;
};

/**
 * @method setTextReference
 * @param {string[]} textReference
 */
support.view.AbstractView.prototype.setTextReference = function setTextReference(textReference) {
    this._textReference = textReference;
};

/**
 * @method getTextReference
 * @reutn (string[]) textReference
 */
support.view.AbstractView.prototype.getTextReference = function getTextReference() {
    return this._textReference;
};

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.LabelView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN){
        this._backgroundColor = "rgba(255, 255, 255, 0.3)";
//        console.log("support.MouseEventType.MOUSE_DOWN");
    }
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_ENTER){
        this._backgroundColor = "rgba(255, 255, 255, 0.1)";
//        console.log("support.MouseEventType.MOUSE_ENTER");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG){
        
//        console.log("support.MouseEventType.MOUSE_DRAG");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_MOVE){
//        if (mouseEvent.getEventTargetView() === null){
//            this._backgroundColor = "#00FF00";
//        }
//        console.log("support.MouseEventType.MOUSE_MOVE");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP){
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
        //console.log("support.MouseEventType.MOUSE_UP");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_LEAVE){
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
//        console.log("support.MouseEventType.MOUSE_LEAVE");
    }
    
    return result;
};