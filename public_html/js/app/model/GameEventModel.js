/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class GameEventModel
 * @constructor
 * @param {String} id
 * @param {app.enum.GameEventEnum} gameEventEnum
 *
 */
app.model.GameEventModel = function GameEventModel(id, gameEventEnum) {

    /**
     * @property {String} _id
     * @private
     */
    this._id = id;

    /**
     * @property {app.enum.GameEventEnum} _gameEventEnum
     * @private
     */
    this._gameEventEnum = gameEventEnum;

};

Utils.inherits(app.model.GameEventModel, Object);


/**
 * @method setId
 * @param {String} value
 */
app.model.GameEventModel.prototype.setId = function setId(value) {
    this._id = value;
};

/**
 * @method setGameEventEnum
 * @param {Number} value
 */
app.model.GameEventModel.prototype.setGameEventEnum = function setGameEventEnum(value) {
    this._gameEventEnum = value;
};

/**
 * @method getId
 * @return {Number} id
 */
app.model.GameEventModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method getGameEventEnum
 * @return {Number} gameEventEnum
 */
app.model.GameEventModel.prototype.getGameEventEnum = function getGameEventEnum() {
    return this._gameEventEnum;
};

/**
 * @method clone
 * @return {app.model.GameEventModel} clone
 */
app.model.GameEventModel.prototype.clone = function clone() {
    return new app.model.GameEventModel(this.getId(), this.getGameEventEnum());
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.GameEventModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._gameEventEnum = JSON._gameEventEnum;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.GameEventModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1:this._id,
        2:this._gameEventEnum,
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.GameEventModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _id: minifyJSON["1"],
        _gameEventEnum: minifyJSON["2"],
    };

    return result;
};