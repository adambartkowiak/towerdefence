/**
 * Created by adambartkowiak on 29.05.2015.
 */
'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class Loader
 * @constructor
 * @param {support.AbstractMouseEventHandler} mouseEventHandler
 */
support.Loader = function Loader() {
};

Utils.inherits(support.Loader, Object);

/**
 * @method loadJson
 * @param {callback} callback
 * @param {String} path
 */
support.Loader.prototype.loadJson = function loadJson(callback, path) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === 200) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);

    return "response";
};