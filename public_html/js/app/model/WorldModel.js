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
     * Głowny listener gry nasluchujacy na wszystkie eventy gry
     * @property {app.listener.GlobalEventListener} _globalEventListener
     * @private
     */
    this._globalEventListener = new app.listener.GlobalEventListener();

    /**
     * Głowna fabryka do tworzenia modelów funkcji
     * @property {app.factory.FunctionModelFactory} _functionModelFactory
     * @private
     */
    this._functionModelFactory = new app.factory.FunctionModelFactory();

    /**
     * Słownik/Baza obiektów, które mogą znajdować się w świecie gry
     * @property {app.model.EntityDictionary} _entityDictionary
     * @private
     */
    this._entityDictionary = new app.model.EntityListModel();

    /**
     * Wszystkie obiekty znajdujace sie w swiecie gry
     * @property {app.model.EntityListModel} _entityModelList
     * @private
     */
    this._entityModelList = new app.model.EntityListModel();

    /**
     * Wszystkie druzyny znajdujace sie w swiecie gry
     * @property {app.model.TeamListModel} _teamListModel
     * @private
     */
    this._teamListModel = new app.model.TeamListModel();

    /**
     * Wszystkie zmienne systemu stworzone przez usera
     * @property {app.model.VariableListModel} _variableListModel
     * @private
     */
    this._variableListModel = new app.model.VariableListModel();

    /**
     * Zadania do wykonania
     * @property {app.model.ObjectiveListModel} objectiveListModel
     * @private
     */
    this._objectiveListModel = new app.model.ObjectiveListModel();

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
     * Lista triggerów (elementów łapiących/ragujących) na eventy rzucane przez system gry.
     * @property {app.model.TriggerListModel} _triggerModelList
     * @private
     */
    this._triggerListModel = new app.model.TriggerListModel(this._globalEventListener, this._functionModelFactory);

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

    /**
     * @property {boolean} _showVictoryPopup
     * @private
     */
    this._showVictoryPopup = false;


    //INIT:
    this._entityModelList.setEntityListListener(this._globalEventListener);
    this._teamListModel.setTeamListModelListener(this._globalEventListener);

    this._globalEventListener.setTriggerListModel(this._triggerListModel);
    this._globalEventListener.setEntityListModel(this._entityModelList);
    this._globalEventListener.setTeamListModel(this._teamListModel);
    this._globalEventListener.setObjectiveListModel(this._objectiveListModel);
    this._globalEventListener.setVariableListModel(this._variableListModel);

    this._functionModelFactory.register(new app.factory.model.function.AllObjectivesCompleted(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.Attribute(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.ChangeObjectiveResult(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.Equal(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.EqualOrGreater(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.GetEntityProperty(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.GetEventEntity(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.GetResourcesValue(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.GetUnitCount(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.GetVariableValue(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.IncrementVariableValue(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.Move(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.ShowConsoleLog(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.ShowVictoryPopup(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.TurnOffTrigger(this._functionModelFactory));
    this._functionModelFactory.register(new app.factory.model.function.TurnOnTrigger(this._functionModelFactory));
};

Utils.inherits(app.model.WorldModel, Object);

/**
 * @method getEntityDictionary
 * @return {app.model.EntityListModel}
 */
app.model.WorldModel.prototype.getEntityDictionary = function getEntityDictionary() {
    return this._entityDictionary;
};

/**
 * @method getEntityListModel
 * @return {app.model.EntityListModel}
 */
app.model.WorldModel.prototype.getEntityListModel = function getEntityListModel() {
    return this._entityModelList;
};

/**
 * @method getTeamListModel
 * @return {app.model.TeamListModel}
 */
app.model.WorldModel.prototype.getTeamListModel = function getTeamListModel() {
    return this._teamListModel;
};

/**
 * @method getObjectiveListModel
 * @return {app.model.ObjectiveListModel}
 */
app.model.WorldModel.prototype.getObjectiveListModel = function getObjectiveListModel() {
    return this._objectiveListModel;
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
 * @method setEntityDictionary
 * @param {app.model.EntityListModel} entityDictionary
 */
app.model.WorldModel.prototype.setEntityDictionary = function setEntityDictionary(entityDictionary) {
    this._entityDictionary = entityDictionary;
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

    this._entityDictionary.loadFromJSON(worldModelJSON._entityDictionary);
    this._entityModelList.loadFromJSON(worldModelJSON._entityModelList);
    this._entityModelIndex = worldModelJSON._entityModelIndex;
    app.model.EntityModelIndex.ENTITY_MODEL_INDEX = worldModelJSON._entityModelIndex;

    this._teamListModel.loadFromJSON(worldModelJSON._teamListModel);
    this._triggerListModel.loadFromJSON(worldModelJSON._triggerListModel);
    this._variableListModel.loadFromJSON(worldModelJSON._variableListModel);
    this._objectiveListModel.loadFromJSON(worldModelJSON._objectiveListModel);


};

/**
 * @method loadFromMinifyJSON
 * @param {Object} minifyJSON
 */
app.model.WorldModel.prototype.loadFromMinifyJSON = function loadFromMinifyJSON(worldModelMinifyJSON) {

    var worldModelJSON = this.unMinifyJSON(worldModelMinifyJSON);
    this.loadFromJSON(worldModelJSON);


    this._showVictoryPopup = false;

    this._teamListModel.clear();
    this._teamListModel.addElement(new app.model.TeamModel("NEUTRALNI", "#9E9E9E"));
    this._teamListModel.addElement(new app.model.TeamModel("DRUZYNA ADAMA", "#1E88E5"));

    this._variableListModel.clear();
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.WorldModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._entityDictionary.getMinifyJSON(),
        2: this._entityModelList.getMinifyJSON(),
        3: app.model.EntityModelIndex.ENTITY_MODEL_INDEX,
        4: this._cameraModel.getMinifyJSON(),
        5: this._mapModel.getMinifyJSON(),
        6: this._teamListModel.getMinifyJSON(),
        7: this._triggerListModel.getMinifyJSON(),
        8: this._variableListModel.getMinifyJSON(),
        9: this._objectiveListModel.getMinifyJSON()
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.WorldModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var entityDictionary = new app.model.EntityListModel(),
        entityListModel = new app.model.EntityListModel(),
        cameraModel = new app.model.CameraModel(0, 0, 0, 0),
        mapModel = new app.model.MapModel(200, 200, FEATURE_TOGGLE.COLISION_SQUARE_SIZE, FEATURE_TOGGLE.COLISION_SQUARE_SIZE),
        teamListModel = new app.model.TeamListModel(),
        triggerListModel = new app.model.TriggerListModel(this._globalEventListener, this._functionModelFactory),
        variableListModel = new app.model.VariableListModel(),
        objectiveListModel = new app.model.ObjectiveListModel();

    var result = {
        _entityDictionary: entityDictionary.unMinifyJSON(minifyJSON["1"]),
        _entityModelList: entityListModel.unMinifyJSON(minifyJSON["2"]),
        _entityModelIndex: minifyJSON["3"],
        _cameraModel: cameraModel.unMinifyJSON(minifyJSON["4"]),
        _mapModel: mapModel.unMinifyJSON(minifyJSON["5"]),
        _teamListModel: teamListModel.unMinifyJSON(minifyJSON["6"]),
        _triggerListModel: triggerListModel.unMinifyJSON(minifyJSON["7"]),
        _variableListModel: variableListModel.unMinifyJSON(minifyJSON["8"]),
        _objectiveListModel: objectiveListModel.unMinifyJSON(minifyJSON["9"])
    };

    return result;
};