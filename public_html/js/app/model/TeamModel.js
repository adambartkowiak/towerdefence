/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class TeamModel
 * @constructor
 * @param {String} name
 * @param {String} color
 */
app.model.TeamModel = function TeamModel(name, color) {

    /**
     * @property {String} _name
     * @private
     */
    this._name = name;

    /**
     * @property {String} _color
     * @private
     */
    this._color = color;

    /**
     * @property {Array} _resourcesArray
     * @private
     */
    this._resourcesArray = [];

    /**
     * @property {app.listener.TeamListModelListener} _teamListModelListener
     * @private
     */
    this._teamListModelListener = null;

};

Utils.inherits(app.model.TeamModel, Object);

/**
 * @method getName
 * @return {String} name
 */
app.model.TeamModel.prototype.getName = function getName() {
    return this._name;
};

/**
 * @method setName
 * @param {String} name
 */
app.model.TeamModel.prototype.setName = function setName(name) {
    this._name = name;
};

/**
 * @method getColor
 * @return {String} color
 */
app.model.TeamModel.prototype.getColor = function getColor() {
    return this._color;
};

/**
 * @method setColor
 * @param {String} name
 */
app.model.TeamModel.prototype.setColor = function setColor(color) {
    this._color = color;
};

/**
 * @method getResourcesArray
 * @return {Array} resourcesArray
 */
app.model.TeamModel.prototype.getResourcesArray = function getResourcesArray() {
    return this._resourcesArray;
};

/**
 * @method setResourcesArray
 * @param {Array} resourcesArray
 */
app.model.TeamModel.prototype.setResourcesArray = function setResourcesArray(resourcesArray) {
    this._resourcesArray = resourcesArray;
};

/**
 * @method setTeamListModelListener
 * @param {app.listener.TeamModelListListener} entityListener
 */
app.model.TeamModel.prototype.setTeamListModelListener = function setTeamListModelListener(teamListModelListener) {
    this._teamListModelListener = teamListModelListener;
};

/**
 * @method addResource
 * @param {String} name
 * @param {String} value
 */
app.model.TeamModel.prototype.addResource = function addResource(name, value) {

    if(this._resourcesArray[name] !== undefined){
        this._resourcesArray[name] += value;
    } else {
        this._resourcesArray[name] = value;
    }

    if (this._teamListModelListener !== null){
        this._teamListModelListener.onChangeResourceValue(this._name, name, value);
    }

};



/**
 * @method clone
 * @return {app.model.TeamModel} clone
 */
app.model.TeamModel.prototype.clone = function clone() {

    var result =  new app.model.TeamModel(this.getName(), this.getColor());

    result.setResourcesArray(this.getResourcesArray());

    return result;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.TeamModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._name = JSON._name;
    this._color = JSON._color;
    this._resourcesArray = JSON._resourcesArray;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.TeamModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1:this._name,
        2:this._color,
        3:this._resourcesArray
    };

    return result;
};

/**
 * @method unMinifyJSON
 * @property {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.TeamModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _name: minifyJSON["1"],
        _color: minifyJSON["2"],
        _resourcesArray: minifyJSON["3"]
    };

    return result;
};
