/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

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
     * Wszystkie druzyny znajdujace sie w swiecie gry
     * @property {app.model.TeamModel[]} _teamArray
     * @private
     */
    this._teamModelArray = [new app.model.TeamModel("NEUTRALNI", "#9E9E9E"), new app.model.TeamModel("DRUZYNA ADAMA", "#1E88E5")];

    /**
     * Informacje na temat mapy.
     * @property {app.model.MapModel} _mapModel
     * @private
     */
    this._mapModel = new app.model.MapModel(2000, 2000, FEATURE_TOGGLE.COLISION_SQUARE_SIZE, FEATURE_TOGGLE.COLISION_SQUARE_SIZE);

    var maxTileGraphicIndexX = 2000 / FEATURE_TOGGLE.COLISION_SQUARE_SIZE;
    var maxTileGraphicIndexY = 2000 / FEATURE_TOGGLE.COLISION_SQUARE_SIZE;

    for (var x = 0; x < maxTileGraphicIndexX; x++) {
        for (var y = 0; y < maxTileGraphicIndexY; y++) {
            this._mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * x + y] = [];
            this._mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * x + y][0] = "assets/editor/graphic/gcc01.png";
        }
    }

    /**
     * Informacje na temat minimapy
     * @property {app.model.gui.MiniMapModel} _miniMapModel
     * @private
     */
    this._miniMapModel = new app.model.gui.MiniMapModel(this);

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
     * Głowny listener gry nasluchujacy na wszystkie eventy gry
     * @property {app.listener.GlobalEventListener} _globalEventListener
     * @private
     */
    this._globalEventListener = new app.listener.GlobalEventListener();

    /**
     * Lista triggerów (elementów łapiących/ragujących) na eventy rzucane przez system gry.
     * @property {app.model.TriggerListModel} _triggerModelList
     * @private
     */
    this._triggerListModel = new app.model.TriggerListModel();

    this._triggerListModel.addElement(
        new app.model.TriggerModel(
            Utils.guid(),
            "UNIT_CREATE",
            new app.model.GameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum.UNIT_CREATE)),
            new app.model.FunctionListModel().addElement(new app.model.function.ConditionEqualModel(
                Utils.guid(),
                new app.model.function.AttributeModel(Utils.guid(), 0),
                new app.model.function.AttributeModel(Utils.guid(), 0))).addElement(
                new app.model.function.ConditionEqualModel(
                    Utils.guid(),
                    new app.model.function.AttributeModel(Utils.guid(), "assets/graphics/images/unit2_team2.png"),
                    new app.model.function.GetEntityPropertyModel(Utils.guid(), new app.model.function.GetEventEntityModel(Utils.guid(), this._globalEventListener), new app.model.function.AttributeModel(Utils.guid(), app.enum.EntityPropertyEnum.GRAPHIC_URL)))).addElement(
                new app.model.function.ConditionEqualModel(
                    Utils.guid(),
                    new app.model.function.GetUnitCountModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 1)/*team*/),
                    new app.model.function.AttributeModel(Utils.guid(), 0))),
            new app.model.FunctionListModel().addElement(new app.model.function.ShowConsoleLogModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "ADD ENTITY EVENT"))),
            true));

    this._triggerListModel.addElement(
        new app.model.TriggerModel(
            Utils.guid(),
            "UNIT_DIE",
            new app.model.GameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum.UNIT_DIE)),
            new app.model.FunctionListModel().addElement(new app.model.function.ConditionEqualModel(
                Utils.guid(),
                new app.model.function.AttributeModel(Utils.guid(), "assets/graphics/images/unit2_team2.png"),
                new app.model.function.GetEntityPropertyModel(Utils.guid(), new app.model.function.GetEventEntityModel(Utils.guid(), this._globalEventListener), new app.model.function.AttributeModel(Utils.guid(), app.enum.EntityPropertyEnum.GRAPHIC_URL)))),
            new app.model.FunctionListModel().addElement(new app.model.function.ShowConsoleLogModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "REMOVE ENTITY EVENT"))),
            true));

    var vitoryTriggerId = Utils.guid();
    this._triggerListModel.addElement(
        new app.model.TriggerModel(
            vitoryTriggerId,
            "VICTORY_TRIGGER",
            new app.model.GameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum.TIME_DELTA)),
            new app.model.FunctionListModel().addElement(new app.model.function.ConditionEqualModel(
                Utils.guid(),
                new app.model.function.GetUnitCountModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 2)/*team*/),
                new app.model.function.AttributeModel(Utils.guid(), 0))),
            new app.model.FunctionListModel().addElement(new app.model.function.ShowConsoleLogModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "VICTORY"))).addElement(new app.model.function.TurnOffTriggerModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), vitoryTriggerId))),
            true));


    var defeatTriggerId = Utils.guid();
    this._triggerListModel.addElement(
        new app.model.TriggerModel(
            defeatTriggerId,
            "DEFEAT_TRIGGER",
            new app.model.GameEventListModel().addElement(new app.model.GameEventModel(Utils.guid(), app.enum.GameEventEnum.TIME_DELTA)),
            new app.model.FunctionListModel().addElement(new app.model.function.ConditionEqualModel(
                Utils.guid(),
                new app.model.function.GetUnitCountModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 1)/*team*/),
                new app.model.function.AttributeModel(Utils.guid(), 0))),
            new app.model.FunctionListModel().addElement(new app.model.function.ShowConsoleLogModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), "DEFEAT"))).addElement(new app.model.function.TurnOffTriggerModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), defeatTriggerId))),
            true));


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
     * @property {app.model.ActionMenuModel} _actionMenu
     * @private
     */
    this._actionMenu = new app.model.ActionMenuModel();

    /**
     * @property {number} _logicLoopNumber
     * @private
     */
    this._logicLoopNumber = 0;

    //INIT:
    this._entityModelList.setEntityListListener(this._globalEventListener);
    this._globalEventListener.setTriggerListModel(this._triggerListModel);
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
 * @method getTeamModelArray
 * @return {app.model.TeamModel[]}
 */
app.model.WorldModel.prototype.getTeamModelArray = function getTeamModelArray() {
    return this._teamModelArray;
};

/**
 * @method getTriggerListModel
 * @return {app.model.TriggerListModel}
 */
app.model.WorldModel.prototype.getTriggerListModel = function getTriggerListModel() {
    return this._triggerListModel;
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
 * @method getGlobalEventListener
 * @return {app.listener.GlobalEventListener} globalEventListener
 */
app.model.WorldModel.prototype.getGlobalEventListener = function getGlobalEventListener() {
    return this._globalEventListener;
};

/**
 * @method setGlobalEventListener
 * @param {app.listener.GlobalEventListener} globalEventListener
 */
app.model.WorldModel.prototype.setGlobalEventListener = function setGlobalEventListener(globalEventListener) {
    this._globalEventListener = globalEventListener;
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
 * @method getActionMenu
 * @return {app.model.ActionMenuModel}
 */
app.model.WorldModel.prototype.getActionMenu = function getActionMenu() {
    return this._actionMenu;
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
 * @method loadFromJSON
 * @param {Object} unMinifyJSON
 */
app.model.WorldModel.prototype.loadFromJSON = function loadFromJSON(worldModelJSON) {

    //this._mapModel._collisionTreeModel = [];
    this._cameraModel.loadFromJSON(worldModelJSON._cameraModel);
    this._mapModel.loadFromJSON(worldModelJSON._mapModel);

    this._entityModelList.loadFromJSON(worldModelJSON._entityModelList);
    this._entityModelIndex = worldModelJSON._entityModelIndex;
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX = worldModelJSON._entityModelIndex;

    // this._triggerListModel.loadFromJSON(worldModelJSON._triggerListModel);

};

/**
 * @method loadFromMinifyJSON
 * @param {Object} minifyJSON
 */
app.model.WorldModel.prototype.loadFromMinifyJSON = function loadFromMinifyJSON(worldModelMinifyJSON) {

    var worldModelJSON = this.unMinifyJSON(worldModelMinifyJSON);
    this.loadFromJSON(worldModelJSON);
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.WorldModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._entityModelList.getMinifyJSON(),
        2: app.model.EntityModelIndex.ENTITY_MODEL_INDEX,
        3: this._cameraModel.getMinifyJSON(),
        4: this._mapModel.getMinifyJSON(),
        5: this._triggerListModel.getMinifyJSON()
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
        cameraModel = new app.model.CameraModel(0, 0, 0, 0),
        mapModel = new app.model.MapModel(200, 200, FEATURE_TOGGLE.COLISION_SQUARE_SIZE, FEATURE_TOGGLE.COLISION_SQUARE_SIZE),
        triggerListModel = new app.model.TriggerListModel();

    var result = {
        _entityModelList: entityListModel.unMinifyJSON(minifyJSON["1"]),
        _entityModelIndex: minifyJSON["2"],
        _cameraModel: cameraModel.unMinifyJSON(minifyJSON["3"]),
        _mapModel: mapModel.unMinifyJSON(minifyJSON["4"]),
        //_triggerListModel: triggerListModel.unMinifyJSON(minifyJSON["5"]),
    };

    return result;
};