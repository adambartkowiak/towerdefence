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
     * Identyfikator jednostki
     * @property {Number} _id
     * @private
     */
    this._id = app.model.EntityModelIndex.getEntityModelIndex();

    /**
     * @property {support.geom.Circle}
     * @private
     */
    this._circle = new support.geom.Circle(0, 0, 0);

    /**
     * Drozyna do kotrej nalezy jednostka 0 neutralna
     * @property {Number} _team
     * @private
     */
    this._team = 0;

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
     * Okresla czy budowa ma odbywac sie cigle
     * @property {Boolean} _constantBuild
     * @private
     */
    this._constantBuild = false;

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
     * @property {Number} _maxAmountOfWood
     * @private
     */
    this._maxAmountOfWood = 0;

    /**
     * @property {Number} _currentAmountOfWood
     * @private
     */
    this._currentAmountOfWood = 0;

    /**
     * @property {Number} _maxAmountOfGold
     * @private
     */
    this._maxAmountOfGold = 0;

    /**
     * @property {Number} _currentAmountOfGold
     * @private
     */
    this._currentAmountOfGold = 0;

    /**
     * @property {Boolean} _woodStorage
     * @private
     */
    this._woodStorage = false;

    /**
     * @property {Boolean} _goldStorage
     * @private
     */
    this._goldStorage = false;

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
     * @property {String} _cargoName
     * @private
     */
    this._cargoName = "";

    /**
     * @property {Number} _amountOfCargo
     * @private
     */
    this._amountOfCargo = 0;

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

    //PERFORMANCE TESTS TEMPORARTY!!!
    this._checkId = -1;

};

Utils.inherits(app.model.EntityModel, Object);


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
    this._circle.setX(value);
    this._lastPosition.setX(value);
    this._isSleepingX = false;
};

/**
 * @method setStartValueY
 * @param {Number} value
 */
app.model.EntityModel.prototype.setStartValueY = function setStartValueY(value) {
    this._circle.setY(value);
    this._lastPosition.setY(value);
    this._isSleepingY = false;
};

/**
 * @method setX
 * @param {Number} value
 * @param {Boolean} callListener
 */
app.model.EntityModel.prototype.setX = function setX(value, callListener) {
    this._lastPosition.setX(this._circle.getX());
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
app.model.EntityModel.prototype.setY = function setY(value, callListener) {
    this._lastPosition.setY(this._circle.getY());
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
 * @method setConstantBuild
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setConstantBuild = function setConstantBuild(value) {
    this._constantBuild = value;
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
 * @method setMaxAmountOfWood
 * @param {Number} value
 */
app.model.EntityModel.prototype.setMaxAmountOfWood = function setMaxAmountOfWood(value) {
    this._maxAmountOfWood = value;
};

/**
 * @method setCurrentAmountOfWood
 * @param {Number} value
 */
app.model.EntityModel.prototype.setCurrentAmountOfWood = function setCurrentAmountOfWood(value) {
    this._currentAmountOfWood = value;
};

/**
 * @method setMaxAmountOfGold
 * @param {Number} value
 */
app.model.EntityModel.prototype.setMaxAmountOfGold = function setMaxAmountOfGold(value) {
    this._maxAmountOfGold = value;
};

/**
 * @method setCurrentAmountOfGold
 * @param {Number} value
 */
app.model.EntityModel.prototype.setCurrentAmountOfGold = function setCurrentAmountOfGold(value) {
    this._currentAmountOfGold = value;
};

/**
 * @method setWoodStorage
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setWoodStorage = function setWoodStorage(value) {
    this._woodStorage = value;
};

/**
 * @method setGoldStorage
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setGoldStorage = function setGoldStorage(value) {
    this._goldStorage = value;
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
 * @method setCargoName
 * @param {String} name
 */
app.model.EntityModel.prototype.setCargoName = function setCargoName(name) {
    this._cargoName = name;
};

/**
 * @method setAmountOfCargo
 * @param {Number} value
 */
app.model.EntityModel.prototype.setAmountOfCargo = function setAmountOfCargo(value) {
    this._amountOfCargo = value;
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
 * @method getConstantBuild
 * @return {Boolean} constantBuild
 */
app.model.EntityModel.prototype.getConstantBuild = function getConstantBuild() {
    return this._constantBuild;
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
 * @method getMaxAmountOfWood
 * @return {Number} maxAmountOfWood
 */
app.model.EntityModel.prototype.getMaxAmountOfWood = function getMaxAmountOfWood() {
    return this._maxAmountOfWood;
};

/**
 * @method getCurrentAmountOfWood
 * @return {Number} currentAmountOfWood
 */
app.model.EntityModel.prototype.getCurrentAmountOfWood = function getCurrentAmountOfWood() {
    return this._currentAmountOfWood;
};

/**
 * @method getMaxAmountOfGold
 * @return {Number} maxAmountOfGold
 */
app.model.EntityModel.prototype.getMaxAmountOfGold = function getMaxAmountOfGold() {
    return this._maxAmountOfGold;
};

/**
 * @method getCurrentAmountOfGold
 * @return {Number} currentAmountOfGold
 */
app.model.EntityModel.prototype.getCurrentAmountOfGold = function getCurrentAmountOfGold() {
    return this._currentAmountOfGold;
};

/**
 * @method getWoodStorage
 * @return {Boolean} woodStorage
 */
app.model.EntityModel.prototype.getWoodStorage = function getWoodStorage() {
    return this._woodStorage;
};

/**
 * @method getGoldStorage
 * @return {Boolean} goldStorage
 */
app.model.EntityModel.prototype.getGoldStorage = function getGoldStorage() {
    return this._goldStorage;
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
 * @method getCargoName
 * @return {String} name
 */
app.model.EntityModel.prototype.getCargoName = function getCargoName() {
    return this._cargoName;
};

/**
 * @method getAmountOfCargo
 * @return {Number} value
 */
app.model.EntityModel.prototype.getAmountOfCargo = function getAmountOfCargo() {
    return this._amountOfCargo;
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

    clone._team = this._team;
    clone._circle = new support.geom.Circle(this._circle.getX(), this._circle.getY(), this._circle.getRadius());
    clone._tempX = this._tempX;
    clone._tempY = this._tempY;
    clone._currentStateId = this._currentStateId;
    clone._lastPosition = new support.geom.Point2d(this._lastPosition.getX(), this._lastPosition.getY());
    clone._currentHp = this._currentHp;
    clone._angle = this._angle;
    clone._attackCooldown = this._attackCooldown;
    clone._constantBuild = this._constantBuild;
    clone._buildTime = this._buildTime;
    clone._currentBuildTime = this._currentBuildTime;
    clone._selected = this._selected;
    clone._selectable = this._selectable;
    clone._targetable = this._targetable;
    clone._maxAmountOfWood = this._maxAmountOfWood;
    clone._currentAmountOfWood = this._currentAmountOfWood;
    clone._maxAmountOfGold = this._maxAmountOfGold;
    clone._currentAmountOfGold = this._currentAmountOfGold;
    clone._woodStorage = this._woodStorage;
    clone._goldStorage = this._goldStorage;
    clone._task = new app.model.TaskModel(this._task.getX(), this._task.getY(), this._task.getRadius(), this._task.getEntityId(), this._task.getTaskEnum());
    clone._rotateGraphicOnMove = this._rotateGraphicOnMove;
    clone._gatherTime = this._gatherTime;
    clone._cargoName = this._cargoName;
    clone._amountOfCargo = this._amountOfCargo;

    //klonowanie obiektow
    clone._entityStateListModel = this._entityStateListModel.clone();
    clone._moveList = this._moveList.clone();
    clone._buildList = this._buildList.clone();

    //init
    clone._currentStateModel =  clone.getEntityStateListModel().getElementById(clone.getCurrentStateId());

    return clone;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.EntityModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

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

    if (JSON._constantBuild !== undefined) {
        this._constantBuild = JSON._constantBuild;
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

    if (JSON._maxAmountOfWood !== undefined) {
        this._maxAmountOfWood = JSON._maxAmountOfWood;
    }

    if (JSON._currentAmountOfWood !== undefined) {
        this._currentAmountOfWood = JSON._currentAmountOfWood;
    }

    if (JSON._maxAmountOfGold !== undefined) {
        this._maxAmountOfGold = JSON._maxAmountOfGold;
    }

    if (JSON._currentAmountOfGold !== undefined) {
        this._currentAmountOfGold = JSON._currentAmountOfGold;
    }

    if (JSON._woodStorage !== undefined) {
        this._woodStorage = JSON._woodStorage;
    }

    if (JSON._goldStorage !== undefined) {
        this._goldStorage = JSON._goldStorage;
    }

    if (JSON._task !== undefined) {
        this._task = new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE);
    }

    if (JSON._rotateGraphicOnMove !== undefined) {
        this._rotateGraphicOnMove = JSON._rotateGraphicOnMove;
    }

    if (JSON._gatherTime !== undefined) {
        this._gatherTime = JSON._gatherTime;
    }

    if (JSON._cargoName !== undefined) {
        this._cargoName = JSON._cargoName;
    }

    if (JSON._amountOfCargo !== undefined) {
        this._amountOfCargo = JSON._amountOfCargo;
    }

    //init
    this._currentStateModel =  this.getEntityStateListModel().getElementById(this.getCurrentStateId());

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.EntityModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var result = {
        1: this._id,
        2: this._team,
        3: this._circle.getMinifyJSON(),
        4: this._currentStateId,
        5: this._entityStateListModel.getMinifyJSON(),
        6: this._lastPosition.getMinifyJSON(),
        7: this._currentHp,
        8: this._angle,
        9: this._attackCooldown,
        a: this._constantBuild,
        b: this._buildTime,
        c: this._currentBuildTime,
        d: this._selected,
        e: this._selectable,
        f: this._targetable,
        g: this._moveList.getMinifyJSON(),
        h: this._buildList.getMinifyJSON(),
        i: this._maxAmountOfWood,
        j: this._currentAmountOfWood,
        k: this._maxAmountOfGold,
        l: this._currentAmountOfGold,
        m: this._woodStorage,
        n: this._goldStorage,
        o: this._task.getMinifyJSON(),
        p: this._rotateGraphicOnMove,
        r: this._gatherTime,
        s: this._cargoName,
        t: this._amountOfCargo

    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.EntityModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var circle = new support.geom.Circle(0, 0, 0);
    var point2d = new support.geom.Point2d(0, 0);
    var taskListModel = new app.model.TaskListModel();
    var entityListModel = new app.model.EntityListModel();
    var entityStateListModel = new app.model.EntityStateListModel();
    var taskModel = new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE);

    var result = {
        _id: minifyJSON["1"],
        _team: minifyJSON["2"],
        _circle: circle.unMinifyJSON(minifyJSON["3"]),
        _currentStateId: minifyJSON["4"],
        _entityStateListModel: entityStateListModel.unMinifyJSON(minifyJSON["5"]),
        _lastPosition: point2d.unMinifyJSON(minifyJSON["6"]),
        _currentHp: minifyJSON["7"],
        _angle: minifyJSON["8"],
        _attackCooldown: minifyJSON["9"],
        _constantBuild: minifyJSON["a"],
        _buildTime: minifyJSON["b"],
        _currentBuildTime: minifyJSON["c"],
        _selected: minifyJSON["d"],
        _selectable: minifyJSON["e"],
        _targetable: minifyJSON["f"],
        _moveList: taskListModel.unMinifyJSON(minifyJSON["g"]),
        _buildList: entityListModel.unMinifyJSON(minifyJSON["h"]),
        _maxAmountOfWood: minifyJSON["i"],
        _currentAmountOfWood: minifyJSON["j"],
        _maxAmountOfGold: minifyJSON["k"],
        _currentAmountOfGold: minifyJSON["l"],
        _woodStorage: minifyJSON["m"],
        _goldStorage: minifyJSON["n"],
        //_task: taskModel.unMinifyJSON(minifyJSON["o"])
        _rotateGraphicOnMove: minifyJSON["p"],
        _gatherTime: minifyJSON["r"],
        _cargoName: minifyJSON["s"],
        _amountOfCargo: minifyJSON["t"]
    };
    return result;
};