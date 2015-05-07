/**
 * Created by adambartkowiak on 18.04.2015.
 */

'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.objects
 * @param {Number} width
 * @param {Number} height
 * @param {Number} fieldWidth
 * @param {Number} fieldHeight
 * 
 */
app.objects.Map = function Map(width, height, fieldWidth, fieldHeight) {

    /**
     * @property _width
     * @type Number
     */
    this._width = width;
    
    /**
     * @property _height
     * @type Number
     */
    this._height = height;
    
    /**
     * @property _height
     * @type Number
     */
    this._fieldWidth = fieldWidth;
    
    /**
     * @property _height
     * @type Number
     */
    this._fieldHeight = fieldHeight;
    
    /**
     * @property _height
     * @type Array
     */
    this._fields = [];
    
    /**
     * @property _selectedField
     * @type app.objects.MapField
     */
    this._selectedField;
    
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.Map, Object);



/**
 * @methodName init
 */
app.objects.Map.prototype.init = function init() {
    var x, y, maxX = this._width, maxY = this._height;
    var field;
    
    for (x = 0; x<maxX; x++){
        for (y = 0; y<maxY; y++){
            field = new app.objects.MapField(true);
            this._fields.push(field);
        }
    }
    
    this._selectedField = this.getFieldByPixels(60, 60);
};

/**
 * @methodName getWidth
 * @return {Number}
 */
app.objects.Map.prototype.getWidth = function getWidth() {
    return this._width;
};

/**
 * @methodName getHeight
 * @return {Number}
 */
app.objects.Map.prototype.getHeight = function getHeight() {
    return this._height;
};

/**
 * @methodName getFieldWidth
 * @return {Number}
 */
app.objects.Map.prototype.getFieldWidth = function getFieldWidth() {
    return this._fieldWidth;
};

/**
 * @methodName getFieldHeight
 * @return {Number}
 */
app.objects.Map.prototype.getFieldHeight = function getFieldHeight() {
    return this._fieldHeight;
};

/**
 * @methodName getField
 * @param {Number} x
 * @param {Number} y
 * @return {app.objects.MapField}
 */
app.objects.Map.prototype.getField = function getField(x, y) {
    return this._fields[ x+y*this._width ];
};

/**
 * @methodName getFieldByPixels
 * @param {Number} xPx
 * @param {Number} yPx
 * @return {app.objects.MapField}
 */
app.objects.Map.prototype.getFieldByPixels = function getFieldByPixels(xPx, yPx) {
    
    var fieldX = Math.floor(xPx/this._fieldWidth);
    var fieldY = Math.floor(yPx/this._fieldHeight);
    
    return this._fields[ fieldX + fieldY*this._width ];
};

/**
 * @methodName getSelectedField
 * @return {app.objects.MapField}
 */
app.objects.Map.prototype.getSelectedField = function getSelectedField() {
    return this._selectedField;
};

/**
 * @methodName setSelectedField
 * @param {app.objects.MapField} mapField
 */
app.objects.Map.prototype.setSelectedField = function setSelectedField(mapField) {
    this._selectedField = mapField;
};