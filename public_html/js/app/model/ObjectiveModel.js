/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ObjectiveModel
 * @constructor
 * @param {String} name
 * @param {String} message
 */
app.model.ObjectiveModel = function ObjectiveModel(name, message, finished, result) {

    /**
     * @property {String} _id
     * @private
     */
    this._id = app.model.EntityModelIndex.getEntityModelIndex();

    /**
     * @property {String} _name
     * @private
     */
    this._name = name;

    /**
     * @property {String} _message
     * @private
     */
    this._message = message;

    /**
     * @property {boolean} _finished
     * @private
     */
    this._finished = finished;

    /**
     * @property {boolean} _result
     * @private
     */
    this._result = result;

};

Utils.inherits(app.model.ObjectiveModel, Object);

/**
 * @method getId
 * @return {String} id
 */
app.model.ObjectiveModel.prototype.getId = function getId() {
    return this._id;
};

/**
 * @method setId
 * @param {String} id
 */
app.model.ObjectiveModel.prototype.setId = function setId(id) {
    this._id = id;
};

/**
 * @method getName
 * @return {String} name
 */
app.model.ObjectiveModel.prototype.getName = function getName() {
    return this._name;
};

/**
 * @method setName
 * @param {String} name
 */
app.model.ObjectiveModel.prototype.setName = function setName(name) {
    this._name = name;
};

/**
 * @method getMessage
 * @return {String} message
 */
app.model.ObjectiveModel.prototype.getMessage = function getMessage() {
    return this._message;
};

/**
 * @method setMessage
 * @param {String} message
 */
app.model.ObjectiveModel.prototype.setMessage = function setMessage(message) {
    this._message = message;
};

/**
 * @method getFinished
 * @return {boolean} finished
 */
app.model.ObjectiveModel.prototype.getFinished = function getFinished() {
    return this._finished;
};

/**
 * @method setFinished
 * @param {boolean} finished
 */
app.model.ObjectiveModel.prototype.setFinished = function setFinished(finished) {
    this._finished = finished;
};

/**
 * @method getResult
 * @return {boolean} result
 */
app.model.ObjectiveModel.prototype.getResult = function getResult() {
    return this._result;
};

/**
 * @method setResult
 * @param {boolean} result
 */
app.model.ObjectiveModel.prototype.setResult = function setResult(result) {
    this._result = result;
};

/**
 * @method clone
 * @return {app.model.ObjectiveModel} clone
 */
app.model.ObjectiveModel.prototype.clone = function clone() {

    var result = new app.model.ObjectiveModel(this.getName(), this.getMessage(), this.getFinished(), this.getResult());
    return result;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.ObjectiveModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._id = JSON._id;
    this._name = JSON._name;
    this._message = JSON._message;
    this._finished = JSON._finished;
    this._result = JSON._result;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.ObjectiveModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1: this._id,
        2: this._name,
        3: this._message,
        4: this._finished,
        5: this._result
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.ObjectiveModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _id: minifyJSON["1"],
        _name: minifyJSON["2"],
        _message: minifyJSON["3"],
        _finished: minifyJSON["4"],
        _result: minifyJSON["5"]
    };

    return result;
};
