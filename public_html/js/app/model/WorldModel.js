/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class WorldModel
 * @constructor
 */
app.model.WorldModel = function WorldModel() {

    /**
     * Wszystkie obiekty znajdujace sie w swiecie gry
     * @property {app.model.EntityListModel} _entityModelList
     * @private
     */
    this._entityModelList = new app.model.EntityListModel();

    /**
     * Informacje na temat mapy.
     * @property {app.model.MapModel} _mapModel
     * @private
     */
    this._mapModel = new app.model.MapModel(4800, 1200, 400, 400);

    /**
     * Informacje na temat minimapy
     * @property {app.model.gui.MiniMapModel} _miniMapModel
     * @private
     */
    this._miniMapModel = new app.model.gui.MiniMapModel(100, 200, 200, 200, this);

    /**
     * Informacje na temat kamery
     * @property {app.model.CameraModel} _cameraModel
     * @private
     */
    this._cameraModel = new app.model.CameraModel(0, 0, 400, 400);

    /**
     * Licznik stworzonych obiektow w swiecie gry - potrzebny aby kazdy kolejny obiekt mial unikatowa nazwe
     * @property {number} _entityModelIndex
     * @private
     */
    this._entityModelIndex = 0;

    /**
     * @property {app.model.ListModel} _waypointCollisionListModel
     * @private
     */
    this._waypointCollisionListModel = new app.model.ListModel();

    /**
     * @property {app.model.ListModel} _selectedEntityModelList
     * @private
     */
    this._selectedEntityModelList = new app.model.ListModel();

    /**
     * @property {support.geom.Rect} _selectRect
     * @private
     */
    this._selectRect = null;

};

Utils.inherits(app.model.WorldModel, Object);

/**
 * @method getEntityListModel
 * @return {app.model.EntityListModel}
 */
app.model.WorldModel.prototype.getEntityListModel = function getEntityListModel() {
    return this._entityModelList;
};

/**
 * @method getWaypointCollisionListModel
 * @return {app.model.ListModel}
 */
app.model.WorldModel.prototype.getWaypointCollisionListModel = function getWaypointCollisionListModel() {
    return this._waypointCollisionListModel;
};

/**
 * @method getSelectedEntityListModel
 * @return {app.model.ListModel}
 */
app.model.WorldModel.prototype.getSelectedEntityListModel = function getSelectedEntityListModel() {
    return this._selectedEntityModelList;
};

/**
 * @method getSelectRect
 * @return {support.geom.Rect}
 */
app.model.WorldModel.prototype.getSelectRect = function getSelectRect() {
    return this._selectRect;
};

/**
 * @method getMapModel
 * @return {app.model.MapModel}
 */
app.model.WorldModel.prototype.getMapModel = function getMapModel() {
    return this._mapModel;
};

/**
 * @method getMiniMapModel
 * @return {app.model.gui.MiniMapModel}
 */
app.model.WorldModel.prototype.getMiniMapModel = function getMiniMapModel() {
    return this._miniMapModel;
};

/**
 * @method getCameraModel
 * @return {app.model.CameraModel}
 */
app.model.WorldModel.prototype.getCameraModel = function getCameraModel() {
    return this._cameraModel;
};


/**
 * @method setEntityListModel
 * @param {app.model.EntityListModel} entityListModel
 */
app.model.WorldModel.prototype.setEntityListModel = function setEntityListModel(entityListModel) {
    this._entityModelList = entityListModel;
};

/**
 * @method setSelectRect
 * @param {support.geom.Rect} selectRect
 */
app.model.WorldModel.prototype.setSelectRect = function setSelectRect(selectRect) {
    this._selectRect = selectRect;
};

/**
 * @method setSelectedEntityListModel
 * @param {app.model.ListModel} selectedEntityListModel
 */
app.model.WorldModel.prototype.setSelectedEntityListModel = function setSelectedEntityListModel(selectedEntityListModel) {
    this._selectedEntityModelList = entityListModel;
};

/**
 * @method setMapModel
 * @param {app.model.MapModel} mapModel
 */
app.model.WorldModel.prototype.setMapModel = function setMapModel(mapModel) {
    this._mapModel = mapModel;
};

/**
 * @method setMiniMapModel
 * @param {app.model.gui.MiniMapModel} miniMapModel
 */
app.model.WorldModel.prototype.setMiniMapModel = function setMiniMapModel(miniMapModel) {
    this._miniMapModel = miniMapModel;
};

/**
 * @method setCameraModel
 * @param {app.model.CameraModel} cameraModel
 */
app.model.WorldModel.prototype.setCameraModel = function setCameraModel(cameraModel) {
    this._cameraModel = cameraModel;
};

/**
 * @method save
 * @returns {String} String form stringify app.model.WorldModel
 */
app.model.WorldModel.prototype.save = function save() {
    this._entityModelIndex = app.model.EntityModelIndex.ENTITY_MODEL_INDEX;
    return JSON.stringify(this);
};

/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

/**
 * @method laodFromJSON
 * @param {Object} unMinifyJSON
 */
app.model.WorldModel.prototype.laodFromJSON = function laodFromJSON(worldModelJSON) {

    this._entityModelList.loadFromJSON(worldModelJSON._entityModelList);
    this._entityModelIndex = worldModelJSON._entityModelIndex;
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX = worldModelJSON._entityModelIndex;
    this._cameraModel.loadFromJSON(worldModelJSON._cameraModel);
};

/**
 * @method loadFromMinifyJSON
 * @param {Object} minifyJSON
 */
app.model.WorldModel.prototype.loadFromMinifyJSON = function loadFromMinifyJSON(worldModelMinifyJSON) {

    var worldModelJSON = this.unMinifyJSON(worldModelMinifyJSON);
    this.laodFromJSON(worldModelJSON);
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.WorldModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._entityModelList.getMinifyJSON(),
        2: app.model.EntityModelIndex.ENTITY_MODEL_INDEX,
        3: this._cameraModel.getMinifyJSON()
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.WorldModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var entityListModel = new app.model.EntityListModel(),
        cameraModel = new app.model.CameraModel(0,0,0,0);

    var result = {
        _entityModelList: entityListModel.unMinifyJSON(minifyJSON["1"]),
        _entityModelIndex: minifyJSON["2"],
        _cameraModel: cameraModel.unMinifyJSON(minifyJSON["3"])
    };

    return result;
};