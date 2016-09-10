/**
 * Created by adambartkowiak on 17/10/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class ButtonView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
support.view.ButtonView = function ButtonView(x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, x, y, width, height);

    /**
     * @property {boolean} _active
     * @private
     */
    this._active = false;
    
    /**
     * @property {string} _text
     * @private
     */
    this._text = "";

    /**
     * @property {Image} _image
     * @private
     */
    this._image = null;

};

Utils.inherits(support.view.ButtonView, support.view.AbstractView);

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
support.view.ButtonView.prototype.draw = function draw(canvas){

    support.view.AbstractView.prototype.draw.call(this, canvas);

    var canvasContext = canvas.getContext("2d");

    if (this._image){
        canvasContext.drawImage(this._image, this.getRelativeX(), this.getRelativeY(), this.getWidth(), this.getHeight());
    }

    canvasContext.textAlign="center";

    if (this._active){
        //Rysowanie backgrounda widoku
        //canvasContext.globalAlpha = 0.2;
        canvasContext.fillStyle = this.getBackgroundColor();
        canvasContext.fillRect(this.getRelativeX(), this.getRelativeY(), this.getWidth(), this.getHeight());

        //canvasContext.globalAlpha = 1;
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.fillText(this._text, this.getRelativeX() + this.getWidth()/2, this.getRelativeY() + this.getHeight()-4);
    } else {
        //Rysowanie backgrounda widoku
        //canvasContext.globalAlpha = 0.2;
        canvasContext.fillStyle = this.getBackgroundColor();
        canvasContext.fillRect(this.getRelativeX(), this.getRelativeY(), this.getWidth(), this.getHeight());

        //canvasContext.globalAlpha = 1;
        canvasContext.fillStyle = '#FFFFFF';
        canvasContext.fillText(this._text, this.getRelativeX() + this.getWidth()/2, this.getRelativeY() + this.getHeight()-4);
    }


    canvasContext.textAlign="start";
    
};

/**
 * @method setText
 * @param {number} text
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
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.ButtonView.prototype.onMouseEvent = function onMouseEvent(mouseEvent){

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN){
        this._backgroundColor = "rgba(255, 255, 255, 0.3)";
       // console.log("support.MouseEventType.MOUSE_DOWN");
    }
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_ENTER){
        this._backgroundColor = "rgba(255, 255, 255, 0.1)";
       // console.log("support.MouseEventType.MOUSE_ENTER");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG){
       // console.log("support.MouseEventType.MOUSE_DRAG");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_MOVE){
//        if (mouseEvent.getEventTargetView() === null){
//            this._backgroundColor = "#00FF00";
//        }
//        console.log("support.MouseEventType.MOUSE_MOVE");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP){
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
        // console.log("support.MouseEventType.MOUSE_UP");
    }
    
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_LEAVE){
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
       // console.log("support.MouseEventType.MOUSE_LEAVE");
    }
    
    return result;
};

