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
 */
app.model.EntityModel = function EntityModel() {

    /**
     * Identyfikator jednostki
     * @property {Number} _id
     * @private
     */
    this._id = app.model.EntityModelIndex.getEntityModelIndex();

    /**
     * Drozyna do kotrej nalezy jednostka 0 neutralna
     * @property {Number} _id
     * @private
     */
    this._team = 0;

    /**
     * Figura geometryczna reprezentujaca jednostke
     * @property {support.geom.Circle} _circle
     * @private
     */
    this._circle = new support.geom.Circle(0, 0, 0);

    /**
     * Mass -1 nieskonczona
     * @property {number} _mass
     * @private
     * */
    this._mass = 0;

    /**
     * Radius wykrywania kolizji pomiedzy entity kiedy entity sie nie rusza.
     * @property {Number} _collisionRadius
     * @private
     */
    this._collisionRadius = 0;

    /**
     * Radius wykrywania kolizji pomiedzy entity w ruchu. Reakcja na inne obiekty w czasie poruszania sie
     * @property {Number} _moveCollisionDetectionRadius
     * @private
     */
    this._moveCollisionDetectionRadius = 0;

    /**
     * Poprzednia pozycja jednostki
     * @property {support.geom.Point2d} _lastPosition
     * @private
     */
    this._lastPosition = new support.geom.Point2d(0, 0);

    /**
     * @property {Number} _angle
     * @private
     */
    this._angle = 0;

    /**
     * Maksymalna predkosc jednostki
     * @property {Number} _groundSpeed
     * @private
     */
    this._groundSpeed = 0;

    /**
     * Maksymalna liczba punktow zycia jednostki
     * @property {Number} _hp
     * @private
     */
    this._hp = 0;

    /**
     * Aktualna liczba punktow zycia jednostki
     * @property {Number} _currentHp
     * @private
     */
    this._currentHp = 0;

    /**
     * Zasieg ataku jednostki
     * @property {Number} _attackRange
     * @private
     */
    this._attackRange = 0;

    /**
     * Obrazenia ataku
     * @property {Number} _attackDamage
     * @private
     */
    this._attackDamage = 0;

    /**
     * Czestotliwosc ataku
     * @property {Number} _attackRate
     * @private
     */
    this._attackRate = 0;

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
    this._task = new app.model.TaskModel(0, 0, 0, 0, app.enum.TaskEnum.NONE);

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
     * Tablica dostepnych akcji, ktora moze wykonac dane entity
     * @property {Array} _availableActions
     * @private
     */
    this._availableActions = [];

    /**
     * @property {String} _graphicUrl
     * @private
     */
    this._graphicUrl = null;

    /**
     * Offset grafiki wzgledem polozenia obiektu
     * @property {support.geom.Point2d} _graphicOffset
     * @private
     */
    this._graphicOffset = new support.geom.Point2d(0, 0);

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
     * @property {Boolean} _rotateGraphicOnMove
     * @privatedar
     */
    this._rotateGraphicOnMove = true;

    /**
     * @property {app.listener.EntityListener} entityListener
     * @private
     */
    this._entityListener = null;

};

Utils.inherits(app.model.EntityModel, Object);


/*

 SETTERY

 */


/**
 * @method setId
 * @param {Number} value
 */
app.model.EntityModel.prototype.setId = function setId(value) {
    this._id = value
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

        if (callListener && !!this._entityListener){
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

        if (callListener && !!this._entityListener){
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
 * @method setGroundSpeed
 * @param {Number} value
 */
app.model.EntityModel.prototype.setGroundSpeed = function setGroundSpeed(value) {
    this._groundSpeed = value;
};

/**
 * @method setHp
 * @param {Number} value
 */
app.model.EntityModel.prototype.setHp = function setHp(value) {
    this._hp = value;
};

/**
 * @method setCurrentHp
 * @param {Number} value
 */
app.model.EntityModel.prototype.setCurrentHp = function setCurrentHp(value) {
    this._currentHp = value;
};

/**
 * @method setAttackRange
 * @param {Number} value
 */
app.model.EntityModel.prototype.setAttackRange = function setAttackRange(value) {
    this._attackRange = value;
};

/**
 * @method setAttackDamage
 * @param {Number} value
 */
app.model.EntityModel.prototype.setAttackDamage = function setAttackDamage(value) {
    this._attackDamage = value;
};

/**
 * @method setAttackRate
 * @param {Number} value
 */
app.model.EntityModel.prototype.setAttackRate = function setAttackRate(value) {
    this._attackRate = value;
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
 * @method setGraphicUrl
 * @param {String} graphicUrl
 */
app.model.EntityModel.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @method setGraphicOffsetX
 * @param {Number} x
 */
app.model.EntityModel.prototype.setGraphicOffsetX = function setGraphicOffsetX(x) {
    this._graphicOffset.setX(x);
};

/**
 * @method setGraphicOffsetY
 * @param {Number} y
 */
app.model.EntityModel.prototype.setGraphicOffsetY = function setGraphicOffsetY(y) {
    this._graphicOffset.setY(y);
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
 * @method setRotateGraphicOnMove
 * @param {Boolean} value
 */
app.model.EntityModel.prototype.setRotateGraphicOnMove = function setRotateGraphicOnMove(value) {
    this._rotateGraphicOnMove = value;
};




/*

 GETTERY

 */


/**
 * @method getId
 * @return {Number} id
 */
app.model.EntityModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method getTeam
 * @return {Number} team
 */
app.model.EntityModel.prototype.getTeam = function getTeam() {
    return this._team;
};

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
 * @method getRadius
 * @return {Number} radius
 */
app.model.EntityModel.prototype.getRadius = function getRadius() {
    return this._circle.getRadius();
};

/**
 * @method getMass
 * @return {Number} mass
 */
app.model.EntityModel.prototype.getMass = function getMass() {
    return this._mass;
};

/**
 * @method getCollisionRadius
 * @return {Number} collisionRadius
 */
app.model.EntityModel.prototype.getCollisionRadius = function getCollisionRadius() {
    return this._collisionRadius;
};

/**
 * @method getMoveCollisionDetectionRadius
 * @return {Number} moveCollisionDetectionRadius
 */
app.model.EntityModel.prototype.getMoveCollisionDetectionRadius = function getMoveCollisionDetectionRadius() {
    return this._moveCollisionDetectionRadius;
};

/**
 * @method getCircle
 * @return {Number} circle
 */
app.model.EntityModel.prototype.getCircle = function getCircle() {
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
    return this._groundSpeed;
};

/**
 * @method getHp
 * @return {Number} hp
 */
app.model.EntityModel.prototype.getHp = function getHp() {
    return this._hp;
};

/**
 * @method getCurrentHp
 * @return {Number} currentHp
 */
app.model.EntityModel.prototype.getCurrentHp = function getCurrentHp() {
    return this._currentHp;
};

/**
 * @method getAttackRange
 * @return {Number} attackRange
 */
app.model.EntityModel.prototype.getAttackRange = function getAttackRange() {
    return this._attackRange;
};

/**
 * @method getAttackDamage
 * @return {Number} attackDamage
 */
app.model.EntityModel.prototype.getAttackDamage = function getAttackDamage() {
    return this._attackDamage;
};

/**
 * @method getAttackRate
 * @return {Number} attackRate
 */
app.model.EntityModel.prototype.getAttackRate = function getAttackRate() {
    return this._attackRate;
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
    return this._graphicUrl;
};

/**
 * @method getGraphicOffset
 * @return {support.geom.Point2d} graphicOffset
 */
app.model.EntityModel.prototype.getGraphicOffset = function getGraphicOffset() {
    return this._graphicOffset;
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
    return this._rotateGraphicOnMove;
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
    return this._circle.getRadius();
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
    clone._mass = this._mass;
    clone._moveCollisionDetectionRadius = this._moveCollisionDetectionRadius;
    clone._collisionRadius = this._collisionRadius;
    clone._lastPosition = new support.geom.Point2d(this._lastPosition.getX(), this._lastPosition.getY());
    clone._angle = this._angle;
    clone._groundSpeed = this._groundSpeed;
    clone._hp = this._hp;
    clone._currentHp = this._currentHp;
    clone._attackRange = this._attackRange;
    clone._attackDamage = this._attackDamage;
    clone._attackRate = this._attackRate;
    clone._attackCooldown = this._attackCooldown;
    clone._constantBuild = this._constantBuild;
    clone._buildTime = this._buildTime;
    clone._currentBuildTime = this._currentBuildTime;
    clone._selected = this._selected;
    clone._selectable = this._selectable;
    clone._targetable = this._targetable;
    clone._graphicUrl = this._graphicUrl;
    clone._graphicOffset = new support.geom.Point2d(this._graphicOffset.getX(), this._graphicOffset.getY());
    clone._maxAmountOfWood = this._maxAmountOfWood;
    clone._currentAmountOfWood = this._currentAmountOfWood;
    clone._maxAmountOfGold = this._maxAmountOfGold;
    clone._currentAmountOfGold = this._currentAmountOfGold;
    clone._woodStorage = this._woodStorage;
    clone._goldStorage = this._goldStorage;
    clone._task = new app.model.TaskModel(this._task.getX(), this._task.getY(), this._task.getRadius(), this._task.getEntityId(), this._task.getTaskEnum());
    clone._rotateGraphicOnMove = this._rotateGraphicOnMove;

    //klonowanie obiektow
    clone._moveList = this._moveList.clone();
    clone._buildList = this._buildList.clone();

    //klonowanie tablic
    clone._availableActions = this._availableActions.slice();

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

    if (JSON._mass !== undefined) {
        this._mass = JSON._mass;
    }

    if (JSON._moveCollisionDetectionRadius !== undefined) {
        this._moveCollisionDetectionRadius = JSON._moveCollisionDetectionRadius;
    }

    if (JSON._collisionRadius !== undefined) {
        this._collisionRadius = JSON._collisionRadius;
    }

    if (JSON._lastPosition !== undefined && JSON._lastPosition._x !== undefined && JSON._lastPosition._y !== undefined) {
        this._lastPosition = new support.geom.Point2d(JSON._lastPosition._x, JSON._lastPosition._y);
    }

    if (JSON._angle !== undefined) {
        this._angle = JSON._angle;
    }

    if (JSON._groundSpeed !== undefined) {
        this._groundSpeed = JSON._groundSpeed;
    }

    if (JSON._hp !== undefined) {
        this._hp = JSON._hp;
    }

    if (JSON._currentHp !== undefined) {
        this._currentHp = JSON._currentHp;
    }

    if (JSON._attackRange !== undefined) {
        this._attackRange = JSON._attackRange;
    }

    if (JSON._attackDamage !== undefined) {
        this._attackDamage = JSON._attackDamage;
    }

    if (JSON._attackRate !== undefined) {
        this._attackRate = JSON._attackRate;
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

    if (JSON._graphicUrl !== undefined) {
        this._graphicUrl = JSON._graphicUrl;
    }

    if (JSON._graphicOffset !== undefined && JSON._graphicOffset._x !== undefined && JSON._graphicOffset._y !== undefined) {
        this._graphicOffset = new support.geom.Point2d(JSON._graphicOffset._x, JSON._graphicOffset._y);
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
        this._task = new app.model.TaskModel(0, 0, 0, 0, app.enum.TaskEnum.NONE);
    }

    if (JSON._rotateGraphicOnMove !== undefined){
        this._rotateGraphicOnMove = JSON._rotateGraphicOnMove;
    }

    //if (JSON._availableActions !== undefined) {
    //    this._availableActions = JSON._availableActions;
    //}

    this._availableActions = [1, 2, 3, 4];
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
        4: this._mass,
        5: this._moveCollisionDetectionRadius,
        6: this._collisionRadius,
        7: this._lastPosition.getMinifyJSON(),
        8: this._angle,
        9: this._groundSpeed,
        a: this._hp,
        b: this._currentHp,
        c: this._attackRange,
        d: this._attackDamage,
        e: this._attackRate,
        f: this._attackCooldown,
        g: this._constantBuild,
        h: this._buildTime,
        i: this._currentBuildTime,
        j: this._selected,
        k: this._selectable,
        l: this._targetable,
        m: this._graphicUrl,
        n: this._moveList.getMinifyJSON(),
        o: this._buildList.getMinifyJSON(),
        p: this._availableActions,
        r: this._graphicOffset.getMinifyJSON(),
        s: this._maxAmountOfWood,
        t: this._currentAmountOfWood,
        u: this._maxAmountOfGold,
        w: this._currentAmountOfGold,
        x: this._woodStorage,
        y: this._goldStorage,
        z: this._task.getMinifyJSON(),
        11: this._rotateGraphicOnMove

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
    var taskModel = new app.model.TaskModel(0, 0, 0, 0, app.enum.TaskEnum.NONE);

    var result = {
        _id: minifyJSON["1"],
        _team: minifyJSON["2"],
        _circle: circle.unMinifyJSON(minifyJSON["3"]),
        _mass: minifyJSON["4"],
        _moveCollisionDetectionRadius: minifyJSON["5"],
        _collisionRadius: minifyJSON["6"],
        _lastPosition: point2d.unMinifyJSON(minifyJSON["7"]),
        _angle: minifyJSON["8"],
        _groundSpeed: minifyJSON["9"],
        _hp: minifyJSON["a"],
        _currentHp: minifyJSON["b"],
        _attackRange: minifyJSON["c"],
        _attackDamage: minifyJSON["d"],
        _attackRate: minifyJSON["e"],
        _attackCooldown: minifyJSON["f"],
        _constantBuild: minifyJSON["g"],
        _buildTime: minifyJSON["h"],
        _currentBuildTime: minifyJSON["i"],
        _selected: minifyJSON["j"],
        _selectable: minifyJSON["k"],
        _targetable: minifyJSON["l"],
        _graphicUrl: minifyJSON["m"],
        _moveList: taskListModel.unMinifyJSON(minifyJSON["n"]),
        _buildList: entityListModel.unMinifyJSON(minifyJSON["o"]),
        _availableActions: minifyJSON["p"],
        _graphicOffset: point2d.unMinifyJSON(minifyJSON["r"]),
        _maxAmountOfWood: minifyJSON["s"],
        _currentAmountOfWood: minifyJSON["t"],
        _maxAmountOfGold: minifyJSON["u"],
        _currentAmountOfGold: minifyJSON["w"],
        _woodStorage: minifyJSON["x"],
        _goldStorage: minifyJSON["y"],
        //_task: taskModel.unMinifyJSON(minifyJSON["z"])
        _rotateGraphicOnMove: minifyJSON["11"]
    };
    return result;
};