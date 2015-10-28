/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class AbstractMouseEventListener
 * @constructor
 */
support.AbstractMouseEventListener = function AbstractMouseEventListener() {
    
    if (this.constructor.name === "AbstractMouseEventListener"){
        throw new Error("Constructor in " + this.constructor.name +
            "is abstract and should be override");
    }

};

Utils.inherits(support.AbstractMouseEventListener, Object);

/**
 * @method onMouseEvent
 * @param {support.MouseEvent} mouseEvent
 */
support.AbstractMouseEventListener.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {
    if (this.constructor.name === "AbstractMouseEventListener"){
        throw new Error("Method: onMouseEvent in " + this.constructor.name +
            "is abstract and should be override");
    }
};