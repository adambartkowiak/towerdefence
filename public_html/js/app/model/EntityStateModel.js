/**
 * Created by adambartkowiak on 07/08/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityStateModel
 * @constructor
 * @memberof app.model
 */
app.model.EntityStateModel = function EntityStateModel() {

    /**
     * Id stanu Entity - identyfikator - nie jest to GUID
     * @property {string} _id
     * @private
     */
    this._id = "default";

    /**
     * Mass -1 nieskonczona
     * @property {number} _mass
     * @private
     * */
    this._mass = 0;

    /**
     * Radius entity
     * @property {number} _circle
     * @private
     */
    this._radius = 0;

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
     * Tablica dostepnych akcji, ktora moze wykonac dane entity
     * @property {Array} _availableActions
     * @private
     */
    this._availableActionsMenu = [];

};

Utils.inherits(app.model.EntityStateModel, Object);


/**
 * @method getId
 * @return {Number} id
 */
app.model.EntityStateModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {Number} id
 */
app.model.EntityStateModel.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getMass
 * @return {Number} mass
 */
app.model.EntityStateModel.prototype.getMass = function getMass() {
    return this._mass;
};

/**
 * @method setMass
 * @param {Number} mass
 */
app.model.EntityStateModel.prototype.setMass = function setMass(mass) {
    this._mass = mass;
};

/**
 * @method getRadius
 * @return {Number} value
 */
app.model.EntityStateModel.prototype.getRadius = function getRadius() {
    return this._radius;
};

/**
 * @method setRadius
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setRadius = function setRadius(value) {
    this._radius = value;
};

/**
 * @method getMoveCollisionDetectionRadius
 * @return {Number} moveCollisionDetectionRadius
 */
app.model.EntityStateModel.prototype.getMoveCollisionDetectionRadius = function getMoveCollisionDetectionRadius() {
    return this._moveCollisionDetectionRadius;
};

/**
 * @method setMoveCollisionDetectionRadius
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setMoveCollisionDetectionRadius = function setMoveCollisionDetectionRadius(value) {
    this._moveCollisionDetectionRadius = value;
};

/**
 * @method getCollisionRadius
 * @return {Number} collisionRadius
 */
app.model.EntityStateModel.prototype.getCollisionRadius = function getCollisionRadius() {
    return this._collisionRadius;
};

/**
 * @method setCollisionRadius
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setCollisionRadius = function setCollisionRadius(value) {
    this._collisionRadius = value;
};

/**
 * @method getGroundSpeed
 * @return {Number} groundSpeed
 */
app.model.EntityStateModel.prototype.getGroundSpeed = function getGroundSpeed() {
    return this._groundSpeed;
};

/**
 * @method setGroundSpeed
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setGroundSpeed = function setGroundSpeed(value) {
    this._groundSpeed = value;
};

/**
 * @method getHp
 * @return {Number} hp
 */
app.model.EntityStateModel.prototype.getHp = function getHp() {
    return this._hp;
};

/**
 * @method setHp
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setHp = function setHp(value) {
    this._hp = value;
};

/**
 * @method getCurrentHp
 * @return {Number} currentHp
 */
app.model.EntityStateModel.prototype.getCurrentHp = function getCurrentHp() {
    return this._currentHp;
};

/**
 * @method setCurrentHp
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setCurrentHp = function setCurrentHp(value) {
    this._currentHp = value;
};

/**
 * @method getAttackRange
 * @return {Number} attackRange
 */
app.model.EntityStateModel.prototype.getAttackRange = function getAttackRange() {
    return this._attackRange;
};

/**
 * @method setAttackRange
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setAttackRange = function setAttackRange(value) {
    this._attackRange = value;
};

/**
 * @method getAttackDamage
 * @return {Number} attackDamage
 */
app.model.EntityStateModel.prototype.getAttackDamage = function getAttackDamage() {
    return this._attackDamage;
};

/**
 * @method setAttackDamage
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setAttackDamage = function setAttackDamage(value) {
    this._attackDamage = value;
};

/**
 * @method getAttackRate
 * @return {Number} attackRate
 */
app.model.EntityStateModel.prototype.getAttackRate = function getAttackRate() {
    return this._attackRate;
};

/**
 * @method setAttackRate
 * @param {Number} value
 */
app.model.EntityStateModel.prototype.setAttackRate = function setAttackRate(value) {
    this._attackRate = value;
};

/**
 * @method getGraphicUrl
 * @return {String} graphicUrl
 */
app.model.EntityStateModel.prototype.getGraphicUrl = function getGraphicUrl() {
    return this._graphicUrl;
};

/**
 * @method setGraphicUrl
 * @param {String} graphicUrl
 */
app.model.EntityStateModel.prototype.setGraphicUrl = function setGraphicUrl(graphicUrl) {
    this._graphicUrl = graphicUrl;
};

/**
 * @method getGraphicOffset
 * @return {support.geom.Point2d} graphicOffset
 */
app.model.EntityStateModel.prototype.getGraphicOffset = function getGraphicOffset() {
    return this._graphicOffset;
};

/**
 * @method setGraphicOffsetX
 * @param {Number} x
 */
app.model.EntityStateModel.prototype.setGraphicOffsetX = function setGraphicOffsetX(x) {
    this._graphicOffset.setX(x);
};

/**
 * @method setGraphicOffsetY
 * @param {Number} y
 */
app.model.EntityStateModel.prototype.setGraphicOffsetY = function setGraphicOffsetY(y) {
    this._graphicOffset.setY(y);
};

/**
 * @method getAvailableActionsMenu
 * @return {String} graphicUrl
 */
app.model.EntityStateModel.prototype.getAvailableActionsMenu = function getAvailableActionsMenu() {
    return this._availableActionsMenu;
};

/**
 * @method setAvailableActionsMenu
 * @param {Array|Object} value
 */
app.model.EntityStateModel.prototype.setAvailableActionsMenu = function setAvailableActionsMenu(value) {
    this._availableActionsMenu = value;
};





/**
 * @method clone
 * @return {app.model.EntityStateModel} clone
 */
app.model.EntityStateModel.prototype.clone = function clone() {

    var clone = new app.model.EntityStateModel();

    clone._id = this._id;
    clone._mass = this._mass;
    clone._radius = this._radius;
    clone._collisionRadius = this._collisionRadius;
    clone._moveCollisionDetectionRadius = this._moveCollisionDetectionRadius;
    clone._groundSpeed = this._groundSpeed;
    clone._hp = this._hp;
    clone._currentHp = this._currentHp;
    clone._attackRange = this._attackRange;
    clone._attackDamage = this._attackDamage;
    clone._attackRate = this._attackRate;
    clone._graphicUrl = this._graphicUrl;
    clone._graphicOffset = new support.geom.Point2d(this._graphicOffset.getX(), this._graphicOffset.getY());

    //klonowanie tablic
    clone._availableActionsMenu = this._availableActionsMenu.slice();

    return clone;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.EntityStateModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    if (JSON._id !== undefined) {
        this._id = JSON._id;
    }

    if (JSON._mass !== undefined) {
        this._mass = JSON._mass;
    }

    if (JSON._radius !== undefined ) {
        this._radius = JSON._radius;
    }

    if (JSON._collisionRadius !== undefined) {
        this._collisionRadius = JSON._collisionRadius;
    }

    if (JSON._moveCollisionDetectionRadius !== undefined) {
        this._moveCollisionDetectionRadius = JSON._moveCollisionDetectionRadius;
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

    if (JSON._graphicUrl !== undefined) {
        this._graphicUrl = JSON._graphicUrl;
    }

    if (JSON._graphicOffset !== undefined && JSON._graphicOffset._x !== undefined && JSON._graphicOffset._y !== undefined) {
        this._graphicOffset = new support.geom.Point2d(JSON._graphicOffset._x, JSON._graphicOffset._y);
    }

    //if (JSON._availableActions !== undefined) {
    //    this._availableActions = JSON._availableActions;
    //}

    this._availableActionsMenu = [1, 2, 3, 4];
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.EntityStateModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var result = {
        1: this._id,
        2: this._mass,
        3: this._radius,
        4: this._collisionRadius,
        5: this._moveCollisionDetectionRadius,
        6: this._groundSpeed,
        7: this._hp,
        8: this._currentHp,
        9: this._attackRange,
        a: this._attackDamage,
        b: this._attackRate,
        c: this._graphicUrl,
        d: this._graphicOffset.getMinifyJSON(),
        e: this._availableActionsMenu

    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.EntityStateModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var point2d = new support.geom.Point2d(0, 0);

    var result = {
        _id: minifyJSON["1"],
        _mass: minifyJSON["2"],
        _radius: minifyJSON["3"],
        _collisionRadius: minifyJSON["4"],
        _moveCollisionDetectionRadius: minifyJSON["5"],
        _groundSpeed: minifyJSON["6"],
        _hp: minifyJSON["7"],
        _currentHp: minifyJSON["8"],
        _attackRange: minifyJSON["9"],
        _attackDamage: minifyJSON["a"],
        _attackRate: minifyJSON["b"],
        _graphicUrl: minifyJSON["c"],
        _graphicOffset: point2d.unMinifyJSON(minifyJSON["d"]),
        _availableActionsMenu: minifyJSON["e"]
    };
    return result;
};








