/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

/**
 * @namespace app.model
 * @class TriggerModel
 * @memberOf app.model
 * @constructor
 * @param {String} id
 * @param {String} name
 * @param {app.model.GameEventListModel} gameEventListModel
 * @param {app.model.FunctionListModel} conditionListModel
 * @param {app.model.FunctionListModel} commandArray
 * @param {boolean} active
 * @param {app.listener.GlobalEventListener} globalEventListener
 */
app.model.TriggerModel = function TriggerModel(id, name, gameEventListModel, conditionListModel, actionListModel, active, globalEventListener) {

    /**
     *
     * @property {String} _id
     * @private
     */
    this._id = id;

    /**
     *
     * @property {String} _name
     * @private
     */
    this._name = name;

    /**
     *
     * @property {boolean} _active
     * @private
     */
    this._active = active !== undefined ? active : true;

    /**
     *
     * @property {app.model.GameEventListModel} _gameEventListModel
     * @private
     */
    this._gameEventListModel = gameEventListModel;

    /**
     *
     * @property {app.model.FunctionListModel} _conditionListModel
     * @private
     */
    this._conditionListModel = conditionListModel;

    /**
     *
     * @property {app.model.FunctionListModel} _actionListModel
     * @private
     */
    this._actionListModel = actionListModel;

    /**
     *
     * @property {app.listener.GlobalEventListener} _globalEventListener
     * @private
     */
    this._globalEventListener = globalEventListener;

    /**
     *
     * @property {app.factory.FunctionModelFactory} _functionModelFactory
     * @private
     */
    this._functionModelFactory = new app.factory.FunctionModelFactory(this._globalEventListener);


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
 * @return {app.model.FunctionListModel} conditionListModel
 */
app.model.TriggerModel.prototype.getConditionListModel = function getConditionListModel() {
    return this._conditionListModel;
};

/**
 * @method setConditionListModel
 * @param {app.model.FunctionListModel} conditionListModel
 */
app.model.TriggerModel.prototype.setConditionListModel = function setConditionListModel(conditionListModel) {
    this._conditionListModel = conditionListModel;
};

/**
 * @method getActionListModel
 * @return {app.model.FunctionListModel} actionListModel
 */
app.model.TriggerModel.prototype.getActionListModel = function getActionListModel() {
    return this._actionListModel;
};

/**
 * @method setActionListModel
 * @param {app.model.FunctionListModel} actionListModel
 */
app.model.TriggerModel.prototype.setActionListModel = function setActionListModel(actionListModel) {
    this._actionListModel = actionListModel;
};

/**
 * @method getAttributeById
 * @param {String} id
 */
app.model.TriggerModel.prototype.getAttributeById = function getAttributeById(id) {

    var result = this.getConditionListModel().getElementById(id);

    if (result === null) {
        result = this.getActionListModel().getElementById(id)
    }

    return result;
};

/**
 * @method getFunctionListModelByAttributeId
 * @param {String} id
 */
app.model.TriggerModel.prototype.getFunctionListModelByAttributeId = function getFunctionListModelByAttributeId(id) {

    var result;

    if (this.getConditionListModel().getElementById(id) !== null) {
        result = this.getConditionListModel();

    } else if (this.getActionListModel().getElementById(id) !== null) {
        result = this.getActionListModel();
    }

    return result;
};

/**
 * @method clone
 * @return {app.model.TriggerModel} clone
 */
app.model.TriggerModel.prototype.clone = function clone() {
    return new app.model.TriggerModel(this.getId(), this.getName(), this.getGameEventListModel(), this.getConditionListModel(), this.getActionListModel(), this.getActive(), this._globalEventListener);
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.TriggerModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._name = JSON._name;
    this._active = JSON._active;
    this._gameEventListModel.loadFromJSON(JSON._gameEventListModel);
    this._conditionListModel.loadFromJSON(JSON._conditionListModel);
    this._actionListModel.loadFromJSON(JSON._actionListModel);
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.TriggerModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._id,
        2: this._name,
        3: this._active,
        4: this._gameEventListModel.getMinifyJSON(),
        5: this._conditionListModel.getMinifyJSON(),
        6: this._actionListModel.getMinifyJSON()
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.TriggerModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var gameEventListModel = new app.model.GameEventListModel(),
        conditionListModel = new app.model.FunctionListModel(this._functionModelFactory),
        actionListModel = new app.model.FunctionListModel(this._functionModelFactory);

    var result = {
        _id: minifyJSON["1"],
        _name: minifyJSON["2"],
        _active: minifyJSON["3"],
        _gameEventListModel: gameEventListModel.unMinifyJSON(minifyJSON["4"]),
        _conditionListModel: conditionListModel.unMinifyJSON(minifyJSON["5"]),
        _actionListModel: actionListModel.unMinifyJSON(minifyJSON["6"])
    };

    return result;
};
