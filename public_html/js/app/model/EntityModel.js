/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityModel
 * @constructor
 * @memberof app.model
 */
app.model.EntityModel = function EntityModel() {

    /**
     * Identyfikator modelu jednostki
     * @property {String} _modelName
     * @private
     */
    this._modelName = undefined;

    /**
     * Identyfikator jednostki
     * @property {Number} _id
     * @private
     */
    this._id = app.model.EntityModelIndex.getEntityModelIndex();

    /**
     * Drozyna do kotrej nalezy jednostka 0 neutralna
     * @property {Number} _team
     * @private
     */
    this._team = 0;

    /**
     * @property {support.geom.Circle}
     * @private
     */
    this._circle = new support.geom.Circle(0, 0, 0);

    /**
     * Nazwa stany entity
     * @property {String} _currentStateId
     * @private
     */
    this._currentStateId = "default";
    this._currentStateModel = null;

    /**
     * Lista stanów entity
     * @property {app.model.EntityStateListModel} _entityStateListModel
     * @private
     */
    this._entityStateListModel = new app.model.EntityStateListModel();

    //default entity state
    this._entityStateListModel.addElement(new app.model.EntityStateModel());

    /**
     * Poprzednia pozycja jednostki
     * @property {support.geom.Point2d} _lastPosition
     * @private
     */
    this._lastPosition = new support.geom.Point2d(0, 0);

    /**
     * Aktualna liczba punktow zycia jednostki
     * @property {Number} _currentHp
     * @private
     */
    this._currentHp = 0;

    /**
     * @property {Number} _angle
     * @private
     */
    this._angle = 0;

    /**
     * Czestotliwosc ataku
     * @property {Number} _attackCooldown
     * @private
     */
    this._attackCooldown = 0;

    /**
     *
     * @property {Number} _buildTime
     * @private
     */
    this._buildTime = 0;

    /**
     *
     * @property {Number} _currentBuildTime
     * @private
     */
    this._currentBuildTime = 0;

    /**
     *
     * @property {Boolean} _selected
     * @private
     */
    this._selected = false;

    /**
     *
     * @property {Boolean} _selectable
     * @private
     */
    this._selectable = true;

    /**
     *
     * @property {Boolean} _targetable
     * @private
     */
    this._targetable = false;

    /**
     *
     * @property {Boolean} _holdPosition
     * @private
     */
    this._holdPosition = false;

    /**
     * @property {app.model.TaskModel} task
     * @private
     */
    this._task = new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE);

    /**
     * Aktualna lista ruchow do wykonania
     * @property {app.model.TaskListModel} _moveList
     * @private
     */
    this._moveList = new app.model.TaskListModel();

    /**
     * Aktualna lista jednostek do wybudowania
     * @property {app.model.EntityListModel} _buildList
     * @private
     */
    this._buildList = new app.model.EntityListModel();

    /**
     * @property {Boolean} _isSleepingX
     * @private
     */
    this._isSleepingX = false;

    /**
     * @property {Boolean} _isSleepingY
     * @private
     */
    this._isSleepingY = false;

    /**
     * @property {app.model.ResourcesModel} _resource
     * @private
     */
    this._resource = new app.model.ResourceModel("", 0, 0);

    /**
     * @property {Array String} _resourceStorageArray
     * @private
     */
    this._resourceStorageArray = [];

    /**
     * @property {Number} _tempX
     * @private
     */
    this._tempX = null;

    /**
     * @property {Number} _tempY
     * @private
     */
    this._tempY = null;

    /**
     * @property {app.listener.EntityListener} entityListener
     * @private
     */
    this._entityListener = null;

    /**
     * @property {Number} _gatherTime
     * @private
     */
    this._gatherTime = 0;

    /**
     * @property {app.model.ResourceModel} _carriedResource
     * @private
     */
    this._carriedResource = new app.model.ResourceModel("", 0, 0);

    /**
     * @property {Number} _targetEntityId
     * @private
     */
    this._targetEntityId = 0;

    /**
     * @property {app.model.EntityModel} _targetEntity
     * @private
     */
    this._targetEntity = null;

    /**
     * @property {boolean} _toRemove
     * @private
     */
    this._toRemove = false;

    /**
     * @property {number} _lastPositionUpdatedLoopNo
     * @private
     */
    this._lastPositionUpdatedLoopNo = 0;

    //PERFORMANCE TESTS TEMPORARTY!!!
    this._checkId = -1;

};

Utils.inherits(app.model.EntityModel, Object);

/**
 * @method getModelName
 * @return {String} id
 */
app.model.EntityModel.prototype.getModelName = function getModelName() {
    return this._modelName;
};

/**
 * @method setModelName
 * @param {String} value
 */
app.model.EntityModel.prototype.setModelName = function setModelName(value) {
    this._modelName = value
};

/**
 * @method getId
 * @return {Number} id
 */
app.model.EntityModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {Number} value
 */
app.model.EntityModel.prototype.setId = function setId(value) {
    this._id = value
};

/**
 * @method getTeam
 * @return {Number} team
 */
app.model.EntityModel.prototype.getTeam = function getTeam() {
    return this._team;
};

/**
 * @method setTeam
 * @param {Number} value
 */
app.model.EntityModel.prototype.setTeam = function setTeam(value) {
    this._team = value
};


/**
 * @method setStartValueX
 * @param {Number} value
 */
app.model.EntityModel.prototype.setStartValueX = function setStartValueX(value) {
    this._tempX = value;
    this._circle.setX(value);
    this._lastPosition.setX(value);
    this._isSleepingX = false;
};

/**
 * @method setStartValueY
 * @param {Number} value
 */
app.model.EntityModel.prototype.setStartValueY = function setStartValueY(value) {
    this._tempY = value;
    this._circle.setY(value);
    this._lastPosition.setY(value);
    this._isSleepingY = false;
};

/**
 * @method setX
 * @param {Number} value
 * @param {Boolean} callListener
 */
app.model.EntityModel.prototype.setX = function setX(value, callListener, logicLoopNo) {

    if (this._lastPositionUpdatedLoopNo < logicLoopNo) {

        this._lastPositionUpdatedLoopNo = logicLoopNo;

        this._lastPosition.setX(this._circle.getX());
        this._lastPosition.setY(this._circle.getY());
    }

    this._circle.setX(value);
    this._tempX = value;

    if (this._lastPosition.getX() === this._circle.getX()) {
        this._isSleepingX = true;
    } else {
        this._isSleepingX = false;
        this.setHoldPosition(false);

        if (callListener && !!this._entityListener) {
            this._entityListener.onXChange(this);
        }
    }

    if (isNaN(value)) {
        console.log("app.model.EntityModel.prototype.setX: " + NaN);
    }
};

/**
 * @method setY
 * @param {Number} value
 * @param {Boolean} callListener
 */
app.model.EntityModel.prototype.setY = function setY(value, callListener, logicLoopNo) {


    if (this._lastPositionUpdatedLoopNo < logicLoopNo) {

        this._lastPositionUpdatedLoopNo = logicLoopNo;

        this._lastPosition.setX(this._circle.getX());
        this._lastPosition.setY(this._circle.getY());
    }


    this._circle.setY(value);
    this._tempY = value;

    if (this._lastPosition.getY() === this._circle.getY()) {
        this._isSleepingY = true;
    } else {
        this._isSleepingY = false;
        this.setHoldPosition(false);

        if (callListener && !!this._entityListener) {
            this._entityListener.onYChange(this);
        }
    }

    if (isNaN(value)) {
        console.log("app.model.EntityModel.prototype.setY: " + NaN);
    }
};

/**
 * @method setRadius
 * @param {Number} value
 */
app.model.EntityModel.prototype.setRadius = function setRadius(value) {
    this._circle.setRadius(value);
    this._entityStateListModel.getElementById(this.getCurrentStateId()).setRadius(value);
    this._moveCollisionDetectionRadius = value + 100;
    this._collisionRadius = value - 5;
};

/**
 * @method setMass
 * @param {Number} value
 */
app.model.EntityModel.prototype.setMass = function setMass(value) {
    this._mass = value;
};

/**
 * @method setAngle
 * @param {Number} angle
 */
app.model.EntityModel.prototype.setAngle = function setAngle(angle) {
    this._angle = angle;
};

/**
 * @method setAttackCooldown
 * @param {Number} value
 */
app.model.EntityModel.prototype.setAttackCooldown = function setAttackCooldown(value) {
    this._attackCooldown = value;
};

/**
 * @method setBuildTime
 * @param {Number} value
 */
app.model.EntityModel.prototype.setBuildTime = function setBuildTime(value) {
    this._buildTime = value;
};

/**
 * @method setCurrentBuildTime
 * @param {Number} value
 */
app.model.EntityModel.prototype.setCurrentBuildTime = function setCurrentBuildTime(value) {
    this._currentBuildTime = value;
};

/**
 * @method setSelected
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setSelected = function setSelected(value) {
    this._selected = value;
};

/**
 * @method setSelectable
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setSelectable = function setSelectable(value) {
    this._selectable = value;
};

/**
 * @method setTargetable
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setTargetable = function setTargetable(value) {
    this._targetable = value;
};

/**
 * @method setTargetEntityId
 * @param {number} value
 */
app.model.EntityModel.prototype.setTargetEntityId = function setTargetEntityId(value) {
    this._targetEntityId = value;
};

/**
 * @method getTargetEntityId
 * @return {number} targetEntityId
 */
app.model.EntityModel.prototype.getTargetEntityId = function getTargetEntityId() {
    return this._targetEntityId;
};

/**
 * @method setTargetEntity
 * @param {app.model.EntityModel} value
 */
app.model.EntityModel.prototype.setTargetEntity = function setTargetEntity(value) {
    this._targetEntity = value;
};

/**
 * @method getTargetEntity
 * @return {app.model.EntityModel} targetEntity
 */
app.model.EntityModel.prototype.getTargetEntity = function getTargetEntity() {
    return this._targetEntity;
};

/**
 * @method setHoldPosition
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setHoldPosition = function setHoldPosition(value) {
    this._holdPosition = value;

    this._isSleepingX = false;
    this._isSleepingY = false;
};

/**
 * @method setMoveList
 * @param {app.model.TaskListModel} value
 */
app.model.EntityModel.prototype.setMoveList = function setMoveList(value) {
    this._moveList = value;
};

/**
 * @method setBuildList
 * @param {app.model.EntityListModel} value
 */
app.model.EntityModel.prototype.setBuildList = function setBuildList(value) {
    this._buildList = value;
};

/**
 * @method setResource
 * @param {app.model.ResourceModel} resource
 */
app.model.EntityModel.prototype.setResource = function setResource(resource) {
    this._resource = resource;
};

/**
 * @method setResourceStorageArray
 * @param {Array String} array
 */
app.model.EntityModel.prototype.setResourceStorageArray = function setResourceStorageArray(array) {
    this._resourceStorageArray = array;
};

/**
 * @method setTask
 * @param {app.model.TaskModel} value
 */
app.model.EntityModel.prototype.setTask = function setTask(value) {

    if (!(value instanceof app.model.TaskModel)) {
        throw "app.model.EntityModel.prototype.setTask. Setter value is not instanceof app.model.TaskModel";
    }

    this._task = value;
};

/**
 * @method setEntityListener
 * @param {app.listener.EntityListener} entityListener
 */
app.model.EntityModel.prototype.setEntityListener = function setEntityListener(entityListener) {
    this._entityListener = entityListener;
    //this._entityListener = null;
};

/**
 * @method setTemporaryX
 * @param {Number} value
 */
app.model.EntityModel.prototype.setTemporaryX = function setTemporaryX(value) {
    this._tempX = value;
};

/**
 * @method setTemporaryY
 * @param {Number} value
 */
app.model.EntityModel.prototype.setTemporaryY = function setTemporaryY(value) {
    this._tempY = value;
};

/**
 * @method setGatherTime
 * @param {Number} value
 */
app.model.EntityModel.prototype.setGatherTime = function setGatherTime(value) {
    this._gatherTime = value;
};

/**
 * @method setCarriedResource
 * @param {app.model.ResourceModel} carriedResource
 */
app.model.EntityModel.prototype.setCarriedResource = function setCarriedResource(carriedResource) {
    this._carriedResource = carriedResource;
};

/**
 * @method setToRemove
 * @param {boolean} value
 */
app.model.EntityModel.prototype.setToRemove = function setToRemove(value) {
    this._toRemove = value;
};

/**
 * @method getToRemove
 * @return {boolean} _toRemove
 */
app.model.EntityModel.prototype.getToRemove = function getToRemove() {
    return this._toRemove;
};


/*

 GETTERY

 */


/**
 * @method getX
 * @return {Number} x
 */
app.model.EntityModel.prototype.getX = function getX() {
    return this._circle.getX();
};

/**
 * @method getY
 * @return {Number} y
 */
app.model.EntityModel.prototype.getY = function getY() {
    return this._circle.getY();
};

/**
 * @method getCurrentStateId
 * @return {String} currentStateId
 */
app.model.EntityModel.prototype.getCurrentStateId = function getCurrentStateId() {
    return this._currentStateId;
};

/**
 * @method setCurrentStateId
 * @return {String} stateId
 */
app.model.EntityModel.prototype.setCurrentStateId = function setCurrentStateId(stateId) {

    if (this.getStateById(stateId) !== null) {
        this._currentStateId = stateId;

        this._currentStateModel = this.getEntityStateListModel().getElementById(this.getCurrentStateId());
    }
};

/**
 * @method getEntityStateListModel
 * @return {app.model.EntityStateListModel} entityStateListModel
 */
app.model.EntityModel.prototype.getEntityStateListModel = function getEntityStateListModel() {
    return this._entityStateListModel;
};

/**
 * @method getStateById
 * @return {app.model.EntityStateModel}
 */
app.model.EntityModel.prototype.getStateById = function getStateById(stateId) {
    return this.getEntityStateListModel().getElementById(stateId);
};

/**
 * @method getCurrentEntityStateModel
 * @return {app.model.EntityStateModel} entityStateListModel
 */
app.model.EntityModel.prototype.getCurrentEntityStateModel = function getCurrentEntityStateModel() {

    return this._currentStateModel;

};

/**
 * @method getRadius
 * @return {Number} radius
 */
app.model.EntityModel.prototype.getRadius = function getRadius() {
    return this.getCurrentEntityStateModel().getRadius();
};

/**
 * @method getViewRadius
 * @return {Number} viewRadius
 */
app.model.EntityModel.prototype.getViewRadius = function getViewRadius() {
    return this.getCurrentEntityStateModel().getViewRadius();
};

/**
 * @method getSelectTargetRadius
 * @return {Number} selectTargetRadius
 */
app.model.EntityModel.prototype.getSelectTargetRadius = function getSelectTargetRadius() {
    return this.getCurrentEntityStateModel().getSelectTargetRadius();
};

/**
 * @method getMass
 * @return {Number} mass
 */
app.model.EntityModel.prototype.getMass = function getMass() {
    return this.getCurrentEntityStateModel().getMass();
};

/**
 * @method getCollisionRadius
 * @return {Number} collisionRadius
 */
app.model.EntityModel.prototype.getCollisionRadius = function getCollisionRadius() {
    return this.getCurrentEntityStateModel().getCollisionRadius();
};

/**
 * @method getMoveCollisionDetectionRadius
 * @return {Number} moveCollisionDetectionRadius
 */
app.model.EntityModel.prototype.getMoveCollisionDetectionRadius = function getMoveCollisionDetectionRadius() {
    return this.getCurrentEntityStateModel().getMoveCollisionDetectionRadius();
};

/**
 * @method getCircle
 * @return {support.geom.Circle} circle
 */
app.model.EntityModel.prototype.getCircle = function getCircle() {

    this._circle.setRadius(this.getCurrentEntityStateModel().getRadius());
    return this._circle;
};

/**
 * @method getLastPosition
 * @return {support.geom.Point2d} lastPosition
 */
app.model.EntityModel.prototype.getLastPosition = function getLastPosition() {
    return this._lastPosition;
};

/**
 * @method getAngle
 * @return {Number} angle
 */
app.model.EntityModel.prototype.getAngle = function getAngle() {
    return this._angle;
};

/**
 * @method getGroundSpeed
 * @return {Number} groundSpeed
 */
app.model.EntityModel.prototype.getGroundSpeed = function getGroundSpeed() {
    return this.getCurrentEntityStateModel().getGroundSpeed();
};

/**
 * @method getHp
 * @return {Number} hp
 */
app.model.EntityModel.prototype.getHp = function getHp() {
    return this.getCurrentEntityStateModel().getHp();
};

/**
 * @method getCurrentHp
 * @return {Number} currentHp
 */
app.model.EntityModel.prototype.getCurrentHp = function getCurrentHp() {
    return this._currentHp;
};

/**
 * @method setCurrentHp
 * @param {Number} value
 */
app.model.EntityModel.prototype.setCurrentHp = function setCurrentHp(value) {
    this._currentHp = value;
};

/**
 * @method getAttackRange
 * @return {Number} attackRange
 */
app.model.EntityModel.prototype.getAttackRange = function getAttackRange() {

    this.getCurrentEntityStateModel().getAttackRange();


    return this.getCurrentEntityStateModel().getAttackRange();

};

/**
 * @method getAttackDamage
 * @return {Number} attackDamage
 */
app.model.EntityModel.prototype.getAttackDamage = function getAttackDamage() {
    return this.getCurrentEntityStateModel().getAttackDamage();
};

/**
 * @method getAttackRate
 * @return {Number} attackRate
 */
app.model.EntityModel.prototype.getAttackRate = function getAttackRate() {
    return this.getCurrentEntityStateModel().getAttackRate();
};

/**
 * @method getAttackCooldown
 * @return {Number} attackCooldown
 */
app.model.EntityModel.prototype.getAttackCooldown = function getAttackCooldown() {
    return this._attackCooldown;
};

/**
 * @method getBuildTime
 * @return {Number} buildTime
 */
app.model.EntityModel.prototype.getBuildTime = function getBuildTime() {
    return this._buildTime;
};

/**
 * @method getCurrentBuildTime
 * @return {Number} currentBuildTime
 */
app.model.EntityModel.prototype.getCurrentBuildTime = function getCurrentBuildTime() {
    return this._currentBuildTime;
};

/**
 * @method getSelected
 * @return {Boolean} selected
 */
app.model.EntityModel.prototype.getSelected = function getSelected() {
    return this._selected;
};

/**
 * @method getSelectable
 * @return {Boolean} selectable
 */
app.model.EntityModel.prototype.getSelectable = function getSelectable() {
    return this._selectable;
};

/**
 * @method getTargetable
 * @return {Boolean} targetable
 */
app.model.EntityModel.prototype.getTargetable = function getTargetable() {
    return this._targetable;
};

/**
 * @method getHoldPosition
 * @return {Boolean} holdPosition
 */
app.model.EntityModel.prototype.getHoldPosition = function getHoldPosition() {
    return this._holdPosition;
};

/**
 * @method getMoveList
 * @return {app.model.TaskListModel} moveList
 */
app.model.EntityModel.prototype.getMoveList = function getMoveList() {
    return this._moveList;
};

/**
 * @method getBuildList
 * @return {app.model.EntityListModel} buildList
 */
app.model.EntityModel.prototype.getBuildList = function getBuildList() {
    return this._buildList;
};

/**
 * @method getGraphicUrl
 * @return {String} graphicUrl
 */
app.model.EntityModel.prototype.getGraphicUrl = function getGraphicUrl() {
    return this.getCurrentEntityStateModel().getGraphicUrl();
};

/**
 * @method getGraphicOffset
 * @return {support.geom.Point2d} graphicOffset
 */
app.model.EntityModel.prototype.getGraphicOffset = function getGraphicOffset() {
    return this.getCurrentEntityStateModel().getGraphicOffset();
};

/**
 * @method isSleeping
 * @return {boolean}
 */
app.model.EntityModel.prototype.isSleeping = function isSleeping() {
    return this._isSleepingX && this._isSleepingY;
};

/**
 * @method getResource
 * @return {app.model.ResourceModel} resource
 */
app.model.EntityModel.prototype.getResource = function getResource() {
    return this._resource;
};

/**
 * @method getResourceStorageArray
 * @return {Boolean} goldStorage
 */
app.model.EntityModel.prototype.getResourceStorageArray = function getResourceStorageArray() {
    return this._resourceStorageArray;
};

/**
 * @method getTask
 * @return {app.model.TaskModel} value
 */
app.model.EntityModel.prototype.getTask = function getTask() {
    return this._task;
};

/**
 * @method getTemporaryX
 * @return {Number} tempX
 */
app.model.EntityModel.prototype.getTemporaryX = function getTemporaryX() {
    return this._tempX;
};

/**
 * @method getTemporaryY
 * @return {Number} tempY
 */
app.model.EntityModel.prototype.getTemporaryY = function getTemporaryY() {
    return this._tempY;
};

/**
 * @method getRotateGraphicOnMove
 * @return {Boolean} rotateGraphicOnMove
 */
app.model.EntityModel.prototype.getRotateGraphicOnMove = function getRotateGraphicOnMove() {
    return this.getCurrentEntityStateModel().getRotateGraphicOnMove();
};

/**
 * @method getGatherTime
 * @return {Number} value
 */
app.model.EntityModel.prototype.getGatherTime = function getGatherTime() {
    return this._gatherTime;
};

/**
 * @method getCarriedResource
 * @return {app.model.ResourceModel} carriedResource
 */
app.model.EntityModel.prototype.getCarriedResource = function getCarriedResource() {
    return this._carriedResource;
};


/*
 Z Interfejsu IMinimapElement
 */

/**
 * @method getPositionXonMap
 * @return {number} positionXonMap
 */
app.model.EntityModel.prototype.getPositionXonMap = function getPositionXonMap() {
    return this._circle.getX();
};

/**
 * @method getPositionYonMap
 * @return {number} positionYonMap
 */
app.model.EntityModel.prototype.getPositionYonMap = function getPositionYonMap() {
    return this._circle.getY();
};

/**
 * @method getRadiusOnMap
 * @return {number} radiusOnMap
 */
app.model.EntityModel.prototype.getRadiusOnMap = function getRadiusOnMap() {
    return this.getCurrentEntityStateModel().getRadius();
};

/**
 * @method getColorOnMinimap
 * @return {string} colorOnMinimap
 */
app.model.EntityModel.prototype.getColorOnMinimap = function getColorOnMinimap() {
    return '#FFFFFF';
};

/**
 * @method isVisibleOnMinimap
 * @return {boolean}
 */
app.model.EntityModel.prototype.isVisibleOnMinimap = function isVisibleOnMinimap() {
    return true;
};


/**
 * @method clone
 * @return {app.model.EntityModel} clone
 */
app.model.EntityModel.prototype.clone = function clone() {

    var clone = new app.model.EntityModel();

    clone._modelName = this._modelName;

    clone._team = this._team;
    clone._circle = new support.geom.Circle(this._circle.getX(), this._circle.getY(), this._circle.getRadius());
    clone._tempX = this._tempX;
    clone._tempY = this._tempY;
    clone._currentStateId = this._currentStateId;
    clone._lastPosition = new support.geom.Point2d(this._lastPosition.getX(), this._lastPosition.getY());
    clone._currentHp = this._currentHp;
    clone._angle = this._angle;
    clone._attackCooldown = this._attackCooldown;
    clone._buildTime = this._buildTime;
    clone._currentBuildTime = this._currentBuildTime;
    clone._selected = this._selected;
    clone._selectable = this._selectable;
    clone._targetable = this._targetable;
    clone._resource = this._resource.clone();
    clone._resourceStorageArray = this._resourceStorageArray;
    clone._task = new app.model.TaskModel(this._task.getX(), this._task.getY(), this._task.getRadius(), this._task.getEntityId(), this._task.getTaskEnum());

    clone._gatherTime = this._gatherTime;
    clone._carriedResource = this._carriedResource.clone();

    //klonowanie obiektow
    clone._entityStateListModel = this._entityStateListModel.clone();
    clone._moveList = this._moveList.clone();
    clone._buildList = this._buildList.clone();

    //init
    clone._currentStateModel = clone.getEntityStateListModel().getElementById(clone.getCurrentStateId());

    return clone;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.EntityModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    if (JSON._modelName !== undefined) {
        this._modelName = JSON._modelName;
    }

    if (JSON._id !== undefined) {
        this._id = JSON._id;
    }

    if (JSON._team !== undefined) {
        this._team = JSON._team;
    }

    if (JSON._circle !== undefined && JSON._circle._x !== undefined && JSON._circle._y !== undefined && JSON._circle._radius !== undefined) {
        this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
    } else if (JSON._radius !== undefined) {
        this._circle = new support.geom.Circle(0, 0, JSON._radius);
    }

    this._tempX = this.getX();
    this._tempY = this.getY();

    if (JSON._currentStateId !== undefined) {
        this._currentStateId = JSON._currentStateId;
    }

    if (JSON._entityStateListModel !== undefined) {
        this._entityStateListModel.loadFromJSON(JSON._entityStateListModel);
    }

    if (JSON._lastPosition !== undefined && JSON._lastPosition._x !== undefined && JSON._lastPosition._y !== undefined) {
        this._lastPosition = new support.geom.Point2d(JSON._lastPosition._x, JSON._lastPosition._y);
    }

    if (JSON._currentHp !== undefined) {
        this._currentHp = JSON._currentHp;
    }

    if (JSON._angle !== undefined) {
        this._angle = JSON._angle;
    }

    if (JSON._attackCooldown !== undefined) {
        this._attackCooldown = JSON._attackCooldown;
    }

    if (JSON._buildTime !== undefined) {
        this._buildTime = JSON._buildTime;
    }

    if (JSON._currentBuildTime !== undefined) {
        this._currentBuildTime = JSON._currentBuildTime;
    }

    if (JSON._selected !== undefined) {
        this._selected = JSON._selected;
    }

    if (JSON._selectable !== undefined) {
        this._selectable = JSON._selectable;
    }

    if (JSON._targetable !== undefined) {
        this._targetable = JSON._targetable;
    }

    if (JSON._moveList !== undefined) {
        this._moveList.loadFromJSON(JSON._moveList);
    }

    if (JSON._buildList !== undefined) {
        this._buildList.loadFromJSON(JSON._buildList);
    }

    if (JSON._resource !== undefined) {
        this._resource.loadFromJSON(JSON._resource);
    }

    if (JSON._resourceStorageArray !== undefined) {
        this._resourceStorageArray = JSON._resourceStorageArray;
    }

    if (JSON._task !== undefined) {
        this._task = new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE);
    }

    if (JSON._gatherTime !== undefined) {
        this._gatherTime = JSON._gatherTime;
    }

    if (JSON._carriedResource !== undefined) {
        this._carriedResource.loadFromJSON(JSON._carriedResource);
    }

    //init
    this._currentStateModel = this.getEntityStateListModel().getElementById(this.getCurrentStateId());


    if (this._lastPosition.getX() === 0) {
        this.setStartValueX(this.getX());
    }

    if (this._lastPosition.getY() === 0) {
        this.setStartValueY(this.getY());
    }

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.EntityModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var result = {
        0: this._modelName,
        1: this._id,
        2: this._team,
        3: this._circle.getMinifyJSON(),
        4: this._currentStateId,
        5: this._entityStateListModel.getMinifyJSON(),
        6: this._lastPosition.getMinifyJSON(),
        7: this._currentHp,
        8: this._angle,
        9: this._attackCooldown,
        a: this._buildTime,
        b: this._currentBuildTime,
        c: this._selected,
        d: this._selectable,
        e: this._targetable,
        f: this._moveList.getMinifyJSON(),
        g: this._buildList.getMinifyJSON(),
        h: this._resource.getMinifyJSON(),
        i: this._resourceStorageArray,
        j: this._task.getMinifyJSON(),
        k: this._gatherTime,
        l: this._carriedResource.getMinifyJSON()

    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.EntityModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var circle = new support.geom.Circle(0, 0, 0),
        point2d = new support.geom.Point2d(0, 0),
        taskListModel = new app.model.TaskListModel(),
        entityListModel = new app.model.EntityListModel(),
        entityStateListModel = new app.model.EntityStateListModel(),
        taskModel = new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE),
        carriedResource = new app.model.ResourceModel("", 0, 0),
        resource = new app.model.ResourceModel("", 0, 0);

    var result = {
        _modelName: minifyJSON["0"],
        _id: minifyJSON["1"],
        _team: minifyJSON["2"],
        _circle: circle.unMinifyJSON(minifyJSON["3"]),
        _currentStateId: minifyJSON["4"],
        _entityStateListModel: entityStateListModel.unMinifyJSON(minifyJSON["5"]),
        _lastPosition: point2d.unMinifyJSON(minifyJSON["6"]),
        _currentHp: minifyJSON["7"],
        _angle: minifyJSON["8"],
        _attackCooldown: minifyJSON["9"],
        _buildTime: minifyJSON["a"],
        _currentBuildTime: minifyJSON["b"],
        _selected: minifyJSON["c"],
        _selectable: minifyJSON["d"],
        _targetable: minifyJSON["e"],
        _moveList: taskListModel.unMinifyJSON(minifyJSON["f"]),
        _buildList: entityListModel.unMinifyJSON(minifyJSON["g"]),
        _resource: resource.unMinifyJSON(minifyJSON["h"]),
        _resourceStorageArray: minifyJSON["i"],
        _task: taskModel.unMinifyJSON(minifyJSON["j"]),
        _gatherTime: minifyJSON["k"],
        _carriedResource: carriedResource.unMinifyJSON(minifyJSON["l"])
    };

    return result;
};