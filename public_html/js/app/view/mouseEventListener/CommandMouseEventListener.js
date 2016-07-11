/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.view = app.view || {};
    app.view.mouseEventListener = app.view.mouseEventListener || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class CommandMouseEventListener
 * @param {support.command.AbstractCommand} command
 * @constructor
 */
app.view.mouseEventListener.CommandMouseEventListener = function CommandMouseEventListener(command) {
    
    support.AbstractMouseEventListener.call(this);
    
    /**
     * @property {support.command.AbstractCommand} command
     * @private
     */
    this._command = command;

};

Utils.inherits(app.view.mouseEventListener.CommandMouseEventListener, support.AbstractMouseEventListener);


/**
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 */
app.view.mouseEventListener.CommandMouseEventListener.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {

    var result = false;

    if( mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP && mouseEvent.isMousePointerInsideTargetView()){
        this._command.execute(mouseEvent);
    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN){
        result = true;
    }

    return result;
};

