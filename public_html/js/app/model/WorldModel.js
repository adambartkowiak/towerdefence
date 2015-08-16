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


app.model.WorldModel.prototype.save = function save(){
    this._entityModelIndex = app.model.EntityModelIndex.ENTITY_MODEL_INDEX;
    return JSON.stringify(this);
};


app.model.WorldModel.prototype.laodFromString = function laodFromString(worldModelStringJSON){

    /*
    Parsowanie Stringa do JSONa
     */
    var worldModelJSON = JSON.parse(worldModelStringJSON);


    /*
    Wczytywanie modulow
     */
    this._entityModelList.loadFromJSON(worldModelJSON._entityModelList);
    this._entityModelIndex = worldModelJSON._entityModelIndex;
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX = worldModelJSON._entityModelIndex;

};