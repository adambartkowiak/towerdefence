/**
 * Created by adambartkowiak on 12.12.2013.
 */
'use strict';
/**
 * @namespace
 * @type {support|*|{}}
 */
var support = support || {};
support.graphics = support.graphics || {};

/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace graphics.Image
 */
support.graphics.Image = function Image() {

    this.TO_RADIANS = Math.PI/180; 
};

/**
 * @inheritance
 */
Utils.inherits(support.graphics.Image, Object);

/**
 * @methodName drawRotateImage
 * @param {HTMLCanvasContext("2d")} context
 * @param {Image} image
 * @param {Number} x
 * @param {Number} y
 * @param {Number} angle
 */
support.graphics.Image.prototype.drawRotateImage = function drawRotateImage(context, image, x, y, angle) {
    
	// save the current co-ordinate system 
	// before we screw with it
	context.save(); 
 
	// move to the middle of where we want to draw our image
	context.translate(x, y);
 
	// rotate around that point, converting our 
	// angle from degrees to radians 
	context.rotate(angle * this.TO_RADIANS);
 
	// draw it up and to the left by half the width
	// and height of the image 
	context.drawImage(image, -(image.width/2), -(image.height/2));
 
	// and restore the co-ords to how they were when we began
	context.restore(); 
};