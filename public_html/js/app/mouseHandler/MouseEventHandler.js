/**
 * Created by adambartkowiak on 20.04.15.
 */
'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.mouseHandler = app.mouseHandler || {};

/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.meh
 * @param {app.objects.WorldModel} worldModel
 */
app.mouseHandler.MouseEventHandler = function MouseEventHandler(worldModel) {

    /**
     *
     * @type {app.objects.Map}
     * @private
     */
    this._worldModel = worldModel;
};

/**
 * @inheritance
 */
Utils.inherits(app.mouseHandler.MouseEventHandler, support.AbstractMouseEventHandler);

/**
 * @methodName onMouseUp
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {

    var mapModel = this._worldModel.getMap();
    var mapField = mapModel.getFieldByPixels(e.offsetX, e.offsetY);
    var towerList = this._worldModel.getTowerList();
    var fieldWidth = mapModel.getFieldWidth();
    var fieldHeight = mapModel.getFieldHeight();
    var towerX = Math.floor(e.offsetX/fieldWidth)*fieldWidth + fieldWidth*0.5;
    var towerY = Math.floor(e.offsetY/fieldHeight)*fieldHeight + fieldHeight*0.5;
    
    mapModel.setSelectedField(mapField);

    if (mapField.getEmpty() === true){
        towerList.addTower(new app.objects.Tower(towerX, towerY, 0, 0, 0));
        mapField.setEmpty(false);
    }
};

/**
 * @methodName onMouseDown
 * @param {type} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDown = function onMouseDown(e){
    
};

/**
 * @methodName onMouseMove
 * @param {type} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseMove = function onMouseMove(e){
    
};

/**
 * @methodName onMouseDrag
 * @param {type} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e){
    
};