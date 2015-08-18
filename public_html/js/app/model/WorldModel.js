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
     * @property {app.model.EntityListModel} _entityModelList
     * @private
     */
    this._entityModelList = new app.model.EntityListModel();

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

    /**
     * @property {app.model.Map} _map
     * @private
     */
    //this._map = new app.model.Map();


    this._entityModelIndex = 0;



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
 * @method getMap
 * @return {app.model.Map}
 */
app.model.WorldModel.prototype.getMap = function getMap() {
    return this._map;
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
 * @method setMap
 * @param {app.model.Map} map
 */
app.model.WorldModel.prototype.setMap = function setMap(map) {
    this._map = map;
};

/**
 * @method save
 * @returns {String} String form stringify app.model.WorldModel
 */
app.model.WorldModel.prototype.save = function save(){
    this._entityModelIndex = app.model.EntityModelIndex.ENTITY_MODEL_INDEX;
    return JSON.stringify(this);
};

/*

 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,

 */

/**
 * @method laodFromJSON
 * @param {String} unMinifyJSON
 */
app.model.WorldModel.prototype.laodFromJSON = function laodFromJSON(worldModelJSON){

    this._entityModelList.loadFromJSON(worldModelJSON._entityModelList);
    this._entityModelIndex = worldModelJSON._entityModelIndex;
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX = worldModelJSON._entityModelIndex;
};

/**
 * @method loadFromMinifyJSON
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
        2: app.model.EntityModelIndex.ENTITY_MODEL_INDEX
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.WorldModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var entityListModel = new app.model.EntityListModel();

    var result = {
        _entityModelList: entityListModel.unMinifyJSON(minifyJSON["1"]),
        _entityModelIndex: minifyJSON["2"]
    };

    return result;
};