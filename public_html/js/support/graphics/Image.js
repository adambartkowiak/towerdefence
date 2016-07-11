/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';

var support = support || {};
support.graphics = support.graphics || {};

var Utils = Utils || {};

/**
 * @constructor
 * @namespace graphics.Image
 */
support.graphics.Image = function Image() {

    this.TO_RADIANS = Math.PI / 180;
};

Utils.inherits(support.graphics.Image, Object);

/**
 * @method drawRotateImage
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {Image} image
 * @param {Number} x
 * @param {Number} y
 * @param {Number} angle
 */
support.graphics.Image.prototype.drawRotateImage = function drawRotateImage(canvasContext, image, x, y, angle) {

    // save the current co-ordinate system
    // before we screw with it
    canvasContext.save();

    // move to the middle of where we want to draw our image
    canvasContext.translate(x, y);

    // rotate around that point, converting our
    // angle from degrees to radians
    if (angle !== 0){
        canvasContext.rotate(angle * this.TO_RADIANS);
    }

    // draw it up and to the left by half the width
    // and height of the image
    canvasContext.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    canvasContext.restore();
};