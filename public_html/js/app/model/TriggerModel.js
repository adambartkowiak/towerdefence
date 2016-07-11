/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TriggerModel
 * @constructor
 * @param {String} id
 * @param {String} name
 * @param {app.model.GameEventListModel} gameEventListModel
 * @param {app.model.ValueListModel} conditionListModel
 * @param {support.command.AbstractCommand[]} commandArray
 */
app.model.TriggerModel = function TriggerModel(id, name, gameEventListModel, conditionListModel, commandArray) {

    this._id = id;

    this._name = name;

    this._active = true;

    this._gameEventListModel = gameEventListModel;

    //left value: value or function
    //operator: equals, not equals, grather than, lower than, unit is alive
    //right value: value or function
    // this._condition = condition;
    this._conditionListModel = conditionListModel;

    //end game
    //show message
    //kill unit
    //span unit
    //order unit to
    //revile area
    //Turn on.off trigger
    //TU MA BYC JAKAS KONKRETNA COMMENDA, TAKA SAMA KOMENDA MA BYC W NP ACTION MENU
    // this._command = command;
    this._commandArray = commandArray;


};

Utils.inherits(app.model.TriggerModel, Object);

/**
 * @method getId
 * @return {String} id
 */
app.model.TriggerModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method getName
 * @return {String} name
 */
app.model.TriggerModel.prototype.getName = function getName() {
    return this._name;
};

/**
 * @method setName
 * @param {String} name
 */
app.model.TriggerModel.prototype.setName = function setName(name) {
    this._name = name;
};

/**
 * @method getActive
 * @return {Boolean} active
 */
app.model.TriggerModel.prototype.getActive = function getActive() {
    return this._active;
};

/**
 * @method setActive
 * @param {Boolean} active
 */
app.model.TriggerModel.prototype.setActive = function setActive(active) {
    this._active = active;
};

/**
 * @method getGameEventListModel
 * @return {app.model.GameEventListModel} gameEventListModel
 */
app.model.TriggerModel.prototype.getGameEventListModel = function getGameEventListModel() {
    return this._gameEventListModel;
};

/**
 * @method setGameEventListModel
 * @param {app.model.GameEventListModel} gameEventListModel
 */
app.model.TriggerModel.prototype.setGameEventListModel = function setGameEventListModel(gameEventListModel) {
    this._gameEventListModel = gameEventListModel;
};

/**
 * @method getConditionListModel
 * @return {app.model.ValueListModel} conditionListModel
 */
app.model.TriggerModel.prototype.getConditionListModel = function getConditionListModel() {
    return this._conditionListModel;
};

/**
 * @method setConditionListModel
 * @param {app.model.ValueListModel} conditionListModel
 */
app.model.TriggerModel.prototype.setConditionListModel = function setConditionListModel(conditionListModel) {
    this._conditionListModel = conditionListModel;
};

/**
 * @method getCommandArray
 * @return {support.command.AbstractCommand[]} commandArray
 */
app.model.TriggerModel.prototype.getCommandArray = function getCommandArray() {
    return this._commandArray;
};

/**
 * @method setCommandArray
 * @param {support.command.AbstractCommand[]} commandArray
 */
app.model.TriggerModel.prototype.setCommandArray = function setCommandArray(commandArray) {
    this._commandArray = commandArray;
};
