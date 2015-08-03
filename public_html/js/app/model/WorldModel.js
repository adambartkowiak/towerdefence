/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class WorldModel
 * @constructor
 */
app.model.WorldModel = function WorldModel() {

    /**
     * @property {app.model.ListModel} _entityModelList
     * @private
     */
    this._entityModelList = new app.model.ListModel();

    /**
     * @property {app.model.Map} _map
     * @private
     */
    //this._map = new app.model.Map();

};

Utils.inherits(app.model.WorldModel, Object);






/**
 * @method getEntityListModel
 * @return {app.model.ListModel}
 */
app.model.WorldModel.prototype.getEntityListModel = function getEntityListModel() {
    return this._entityModelList;
};

/**
 * @method getMap
 * @return {app.model.Map}
 */
app.model.WorldModel.prototype.getMap = function getMap() {
    return this._map;
};





/**
 * @method setEntityListModel
 * @param {app.model.ListModel} towerList
 */
app.model.WorldModel.prototype.setEntityListModel = function setEntityListModel(entityListModel) {
    this._entityModelList = entityListModel;
};

/**
 * @method setMap
 * @param {app.model.Map} map
 */
app.model.WorldModel.prototype.setMap = function setMap(map) {
    this._map = map;
};