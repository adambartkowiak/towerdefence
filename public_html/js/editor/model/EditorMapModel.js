/**
 * Created by adambartkowiak on 09/01/16.
 */

'use strict';
Utils.namespace("editor.model");

/**
 * @namespace editor.model
 * @class EditorMapModel
 * @constructor
 * @param {app.model.MapModel} mapModel
 */
editor.model.EditorMapModel = function EditorMapModel(mapModel) {

    /**
     * @property {app.model.MapModel}
     * @private
     */
    this._mapModel = mapModel;

    /**
     * @property {Array} _elements
     * @private
     */
    this._editorMapTileArray = [];

};

Utils.inherits(editor.model.EditorMapModel, Object);

/*
 GETTERS AND SETTERS
 */

/**
 * @method getMapModel
 * @return {app.model.MapModel}
 */
editor.model.EditorMapModel.prototype.getMapModel = function getMapModel() {
    return this._mapModel;
};

/**
 * @method setMapModel
 * @param {Number} mapModel
 */
editor.model.EditorMapModel.prototype.setMapModel = function setMapModel(mapModel) {
    this._mapModel = mapModel;
};

/**
 * @method getEditorMapTileArray
 * @return {Array}
 */
editor.model.EditorMapModel.prototype.getEditorMapTileArray = function getEditorMapTileArray() {
    return this._editorMapTileArray;
};

/**
 * @method setEditorMapTileArray
 * @param {Array} mapModel
 */
editor.model.EditorMapModel.prototype.setEditorMapTileArray = function setEditorMapTileArray(editorMapTileArray) {
    this._editorMapTileArray = editorMapTileArray;
};