/**
 * Created by adambartkowiak on 29/11/15.
 */

'use strict';
Utils.namespace("editor.model");

/**
 * @namespace editor.model
 * @class MapTileListModel
 * @constructor
 */
editor.model.MapTileListModel = function MapTileListModel() {

    /**
     * @property {Array} _elements
     * @private
     */
    this._elements = [];

};

Utils.inherits(editor.model.MapTileListModel, Object);


/**
 * @method addElement
 * @param {Object} object
 */
editor.model.MapTileListModel.prototype.addElement = function addElement(object) {
    this._elements.push(object);
};

/**
 * @method getElement
 * @param {Number} index
 * @return {Object} object
 */
editor.model.MapTileListModel.prototype.getElement = function getElement(index) {
    return this._elements[index];
};

/**
 * @method length
 * @return {number} length
 */
editor.model.MapTileListModel.prototype.length = function length() {
    return this._elements.length;
};

/**
 * @method getElementByGraphicPatternArray
 * @param {string} graphicPatternArray
 * @return {editor.model.MapTileModel} mapTileModel
 */
editor.model.MapTileListModel.prototype.getElementByGraphicPatternArray = function getElementByGraphicPatternArray(graphicPatternArray) {
    var index;
    var length = this._elements.length;

    for (index = 0; index < length; index++) {
        if (this._elements[index].getGraphicPatternArray() !== null && this._elements[index].getGraphicPatternArray()[0][0].equals(graphicPatternArray)) {
            return this._elements[index];
        }
    }

    return null;
};


