/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

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
    this._angle = null;

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
     * Aktualna lista ruchow do wykonania
     * @property {app.model.TargetListModel} _moveList
     * @private
     */
    this._moveList = null;

    /**
     * Aktualna lista jednostek do wybudowania
     * @property {app.model.EntityListModel} _buildList
     * @private
     */
    this._buildList = null;

    /**
     * @property {String} _graphicUrl
     * @private
     */
    this._graphicUrl = null;


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
};

/**
 * @method setStartValueY
 * @param {Number} value
 */
app.model.EntityModel.prototype.setStartValueY = function setStartValueY(value) {
    this._circle.setY(value);
    this._lastPosition.setY(value);
};

/**
 * @method setX
 * @param {Number} value
 */
app.model.EntityModel.prototype.setX = function setX(value) {
    this._lastPosition.setX(this._circle.getX());
    this._circle.setX(value);

    if (isNaN(value)){
        console.log("app.model.EntityModel.prototype.setX: " + NaN);
    }
};

/**
 * @method setY
 * @param {Number} value
 */
app.model.EntityModel.prototype.setY = function setY(value) {
    this._lastPosition.setY(this._circle.getY());
    this._circle.setY(value);

    if (isNaN(value)){
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
 * @method setMoveList
 * @param {app.model.TargetListModel} value
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
 * @method getMoveList
 * @return {app.model.TargetListModel} moveList
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


/*

 CLONE

 */


/**
 * @method clone
 * @return {app.model.EntityModel} clone
 */
app.model.EntityModel.prototype.clone = function clone() {

    var clone = new app.model.EntityModel();

    clone._team = this._team;
    clone._circle = new support.geom.Circle(this._circle.getX(), this._circle.getY(), this._circle.getRadius());
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


    //klonowanie obiektow
    clone._moveList = null;
    clone._buildList = null;

    if (this._moveList !== null) {
        clone._moveList = this._moveList.clone();
    }

    if (this._buildList !== null) {
        clone._buildList = this._buildList.clone();
    }

    clone._graphicUrl = this._graphicUrl;

    return clone;
};


/*

Load From JSON

 */
app.model.EntityModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    this._id = JSON._id;
    this._team = JSON._team;
    this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
    this._mass = JSON._mass;
    this._moveCollisionDetectionRadius = JSON._moveCollisionDetectionRadius;
    this._collisionRadius = JSON._collisionRadius;
    this._lastPosition = new support.geom.Point2d(JSON._lastPosition._x, JSON._lastPosition._y);
    this._angle = JSON._angle;
    this._groundSpeed = JSON._groundSpeed;
    this._hp = JSON._hp;
    this._currentHp = JSON._currentHp;
    this._attackRange = JSON._attackRange;
    this._attackDamage = JSON._attackDamage;
    this._attackRate = JSON._attackRate;
    this._attackCooldown = JSON._attackCooldown;
    this._constantBuild = JSON._constantBuild;
    this._buildTime = JSON._buildTime;
    this._currentBuildTime = JSON._currentBuildTime;
    this._selected = JSON._selected;
    this._selectable = JSON._selectable;
    this._targetable = JSON._targetable;


    //klonowanie obiektow
    this._moveList = null;
    //this._buildList = null;
    //
    if (JSON._moveList !== null) {
        this._moveList = new app.model.TargetListModel();
        this._moveList.loadFromJSON(JSON._moveList);
    }
    if (JSON._buildList !== null) {
        this._buildList = new app.model.EntityListModel();
        this._buildList.loadFromJSON(JSON._buildList);
    }

    this._graphicUrl = JSON._graphicUrl;

};

