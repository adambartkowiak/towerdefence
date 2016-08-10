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
     * @property {JOSN} _resourcesJSON
     * @private
     */
    this._resourcesJSON = [];


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
 * @method getResourcesJSON
 * @return {JOSN} resources
 */
app.model.TeamModel.prototype.getResourcesJSON = function getResourcesJSON() {
    return this._resourcesJSON;
};

/**
 * @method setResourcesJSON
 * @param {String} name
 */
app.model.TeamModel.prototype.setResourcesJSON = function setResourcesJSON(resourcesJSON) {
    this._resourcesJSON = resourcesJSON;
};

/**
 * @method addResource
 * @param {String} name
 * @param {String} value
 */
app.model.TeamModel.prototype.addResource = function addResource(name, value) {

    if(this._resourcesJSON[name] !== undefined){
        this._resourcesJSON[name] += value;
    } else {
        this._resourcesJSON[name] = value;
    }

};



/**
 * @method clone
 * @return {app.model.TeamModel} clone
 */
app.model.TeamModel.prototype.clone = function clone() {

    var result =  new app.model.TeamModel(this.getName(), this.getColor());

    result.setResourcesJSON(this.getResourcesJSON());

    return result;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.TeamModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
    this._name = JSON._name;
    this._color = JSON._color;
    this._resourcesJSON = JSON._resourcesJSON;
};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
 */
app.model.TeamModel.prototype.getMinifyJSON = function getMinifyJSON() {
    var result = {
        1:this._name,
        2:this._color,
        3:this._resourcesJSON
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
        _resourcesJSON: minifyJSON["3"]
    };

    return result;
};
