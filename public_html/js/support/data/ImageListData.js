/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';
var Utils = Utils || {};

Utils.namespace("support.data");

/**
 * @namespace support.data
 * @class ImageDataList
 * @constructor
 */
support.data.ImageDataList = function AbstractCommand() {

    /**
     * @property {support.data.ImageDataList} imageArray
     * @private
     */
    this._imageArray = [];

};

Utils.inherits(support.data.ImageDataList, Object);

/**
 * @method load
 * @param {string} src
 */
support.data.ImageDataList.prototype.load = function load(src) {
    this._imageArray[src] = new Image();
    this._imageArray[src].src = src;
};

/**
 * @method get
 */
support.data.ImageDataList.prototype.get = function get(src) {
    return this._imageArray[src];
};