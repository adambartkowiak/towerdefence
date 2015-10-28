/**
 * Created by adambartkowiak on 14/10/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class AbsoluteLayoutView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
support.view.AbsoluteLayoutView = function AbsoluteLayoutView(x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractViewGroup.call(this, x, y, width, height);

};

Utils.inherits(support.view.AbsoluteLayoutView, support.view.AbstractViewGroup);

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
support.view.AbsoluteLayoutView.prototype.draw = function draw(canvas){

    var canvasContext = canvas.getContext("2d");
    
    //Rysowanie backgrounda widoku
    canvasContext.fillStyle = this.getBackgroundColor();
    canvasContext.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());

    support.view.AbstractViewGroup.prototype.draw.call(this, canvas);
};