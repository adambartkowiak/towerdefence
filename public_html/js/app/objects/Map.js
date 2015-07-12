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
 * @param {String} graphicUrl
 */
app.objects.Map = function Map(width, height, fieldWidth, fieldHeight, graphicUrl) {
    
    /**
     * @property {Number} _width
     */
    this._width = width;
    
    /**
     * @property {Number} _height
     */
    this._height = height;
    
    /**
     * @property {Number} _fieldWidth
     */
    this._fieldWidth = fieldWidth;
        
    /**
     * @property {String} _mapUrl
     */
    this._graphicUrl = graphicUrl;
    
    /**
     * @property {Number} _height
     */
    this._fieldHeight = fieldHeight;
    
    /**
     * @property {Array} _height
     */
    this._fields = [];
    
    /**
     * @property {app.objects.MapField} _selectedField
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
            field.setEmpty(true);
            this._fields.push(field);
        }
    }
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

/**
 * @methodName getGraphicUrl
 * @return {String} mapUrl
 */
app.objects.Map.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @methodName setGraphicUrl
 * @param {String} graphicUrl
 */
app.objects.Map.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @methodName clear
 */
app.objects.Map.prototype.clear = function clear() {
    this._fields.length = 0;
};

/**
 * @methodName saveMapModelToJsonText
 * @return {String} result
 */
app.objects.Map.prototype.saveMapModelToJsonText = function saveMapModelToJsonText() {
    return JSON.stringify(this);
};

/**
 * @methodName loadMapModelFromJson
 * @param {String} json
 */
app.objects.Map.prototype.loadMapModelFromJson = function loadMapModelFromJson(json) {
    var myJson = json;
    var jsonField = null;
    var newField;
    
    this.clear();
    
    this._width = myJson._width;
    this._height = myJson._height;
    this._fieldWidth = myJson._fieldWidth;
    this._fieldHeight = myJson._fieldHeight;
    this._selectedField = null;
    this._graphicUrl = myJson._graphicUrl;
    
    for (var i=0; i<myJson._fields.length; i++){
        
        jsonField = myJson._fields[i];
        
        newField = new app.objects.MapField(jsonField._allowBuild);
        newField.setEmpty(jsonField._empty);
        
        this._fields.push(newField);
    }
    
    worldModel.onMapLoadingEnd();
};

/**
 * @methodName loadMapModelFromJsonText
 * @param {String} jsonText
 */
app.objects.Map.prototype.loadMapModelFromJsonText = function loadMapModelFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadMapModelFromJson(myJson);
};