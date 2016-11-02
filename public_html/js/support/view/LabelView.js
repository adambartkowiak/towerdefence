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
     * @property {number} _textOffsetX
     * @private
     */
    this._textOffsetX = 0;

    /**
     * @property {number} _textOffsetY
     * @private
     */
    this._textOffsetY = 0;

    /**
     * @property {Image} _labelIcon
     * @private
     */
    this._labelIcon = null;



    this._labelIconWidth = 0;
    this._labelIconHeight = 0;


};

Utils.inherits(support.view.LabelView, support.view.AbstractView);

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
support.view.LabelView.prototype.draw = function draw(canvas) {

    support.view.AbstractView.prototype.draw.call(this, canvas);

    var canvasContext = canvas.getContext("2d");

    if (this._backgroundColor !== null) {
        canvasContext.fillStyle = this.getBackgroundColor();
        canvasContext.fillRect(this.getRelativeX(), this.getRelativeY(), this.getWidth(), this.getHeight());
    }

    canvasContext.textAlign = "center";

    canvasContext.fillStyle = '#FFFFFF';

    canvasContext.fillText(this._text, this.getRelativeX() + this.getWidth() / 2 + this.getTextOffsetX(), this.getRelativeY() + this.getHeight() / 2 - 4 + this.getTextOffsetY());

    if (this.getLabelIcon() !== null) {
        canvasContext.drawImage(this.getLabelIcon(), this.getRelativeX() + 22, this.getRelativeY() + 15 - this._labelIconHeight/2);
    }

    canvasContext.textAlign = "start";

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
 * @return (string) text
 */
support.view.AbstractView.prototype.getText = function getText() {
    return this._text;
};

/**
 * @method setTextOffsetX
 * @param {number} offset
 */
support.view.AbstractView.prototype.setTextOffsetX = function setTextOffsetX(offset) {
    this._textOffsetX = offset;
};

/**
 * @method getTextOffsetX
 * @return (number) textOffsetX
 */
support.view.AbstractView.prototype.getTextOffsetX = function getTextOffsetX() {
    return this._textOffsetX;
};

/**
 * @method setTextOffsetY
 * @param {number} offset
 */
support.view.AbstractView.prototype.setTextOffsetY = function setTextOffsetY(offset) {
    this._textOffsetY = offset;
};

/**
 * @method getTextOffsetY
 * @return (number) textOffsetY
 */
support.view.AbstractView.prototype.getTextOffsetY = function getTextOffsetY() {
    return this._textOffsetY;
};

/**
 * @method setLabelIcon
 * @param {Image} labelIcon
 */
support.view.AbstractView.prototype.setLabelIcon = function setLabelIcon(labelIcon) {

    var that = this;
    this._labelIcon = labelIcon;

    this._labelIcon.onload = function () {
        that._labelIconWidth = this.width;
        that._labelIconHeight = this.height;
    };
};

/**
 * @method getLabelIcon
 * @return (Image) labelIcon
 */
support.view.AbstractView.prototype.getLabelIcon = function getLabelIcon() {
    return this._labelIcon;
};

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
support.view.LabelView.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN) {
        this._backgroundColor = "rgba(255, 255, 255, 0.3)";
//        console.log("support.MouseEventType.MOUSE_DOWN");
    }
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_ENTER) {
        this._backgroundColor = "rgba(255, 255, 255, 0.1)";
//        console.log("support.MouseEventType.MOUSE_ENTER");
    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG) {

//        console.log("support.MouseEventType.MOUSE_DRAG");
    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_MOVE) {
//        if (mouseEvent.getEventTargetView() === null){
//            this._backgroundColor = "#00FF00";
//        }
//        console.log("support.MouseEventType.MOUSE_MOVE");
    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP) {
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
        //console.log("support.MouseEventType.MOUSE_UP");
    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_LEAVE) {
        this._backgroundColor = "rgba(255, 255, 255, 0.0)";
//        console.log("support.MouseEventType.MOUSE_LEAVE");
    }

    return result;
};