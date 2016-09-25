/**
 * Created by adambartkowiak on 30/09/15.
 */

'use strict';

var support = support || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class RootView
 * @constructor
 * @param {HTMLCanvasElement} canvas
 * @param {app.mouseHandler.MouseEventHandler} mouseEventHandler
 */
support.view.RootView = function RootView(canvas, mouseEventHandler) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractViewGroup.call(this, 0, 0, canvas.width, canvas.height);

    /**
     * @property {HTMLCanvasElement} _canvas
     * @private
     */
    this._canvas = canvas;

    /**
     * @property {CanvasRenderingContext2D} _canvasContext
     * @private
     */
    this._canvasContext = canvas.getContext("2d");

    /**
     * @property {app.mouseHandler.MouseEventHandler} _mouseEventHandler
     * @private
     */
    this._mouseEventHandler = mouseEventHandler;
    
    //dodanie do listenera ROOT VIEW.
    //do root view powinien byc dodany widok mapy, widokminimapy, statusu i menu..
    this._mouseEventHandler.addMouseEventListener(this);

    this._delta = 0;

    this._physicStepInMilis = 1000/30;
};

Utils.inherits(support.view.RootView, support.view.AbstractViewGroup);

/**
 * @method draw
 * @public
 */
support.view.RootView.prototype.draw = function draw(delta, physicStepInMilis){

    this._delta = delta;
    this._physicStepInMilis = physicStepInMilis;

    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
    
    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("THIS IS ROOT VIEW", 20, 20);
    
    support.view.AbstractViewGroup.prototype.draw.call(this, this._canvas);
    
};