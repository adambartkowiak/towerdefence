/**
 * Created by adambartkowiak on 18.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class MapField
 * @constructor
 * @param {Boolean} allowBuild
 * 
 */
app.objects.MapField = function MapField(allowBuild) {

    /**
     * @property build
     * @type {Boolean}
     */
    this._allowBuild = allowBuild;
    
    /**
     * @property build
     * @type {Boolean}
     */
    this._empty = true;
    
};

Utils.inherits(app.objects.MapField, Object);

/**
 * @method getAllowBuild
 * @return {Boolean}
 */
app.objects.MapField.prototype.getAllowBuild = function getAllowBuild(){
    return this._allowBuild;
};

/**
 * @method getEmpty
 * @return {Boolean}
 */
app.objects.MapField.prototype.getEmpty = function getEmpty(){
    return this._empty;
};

/**
 * @method setEmpty
 * @return {Boolean} empty
 */
app.objects.MapField.prototype.setEmpty = function setEmpty(empty){
    this._empty = empty;
};
