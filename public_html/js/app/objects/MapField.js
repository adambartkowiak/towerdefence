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

/**
 * @inheritance
 */
Utils.inherits(app.objects.MapField, Object);

/**
 * @methodName getAllowBuild
 * @return {Boolean}
 */
app.objects.MapField.prototype.getAllowBuild = function getAllowBuild(){
    return this._allowBuild;
};

/**
 * @methodName getEmpty
 * @return {Boolean}
 */
app.objects.MapField.prototype.getEmpty = function getEmpty(){
    return this._empty;
};

/**
 * @methodName setEmpty
 * @return {Boolean}
 */
app.objects.MapField.prototype.setEmpty = function setEmpty(empty){
    this._empty = empty;
};
