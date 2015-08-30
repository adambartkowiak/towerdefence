/**
 * Created by adambartkowiak on 19/08/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class MiniMapModel
 * @constructor
 * @param {Number} miniMapWidth
 * @param {Number} miniMapHeight
 * @param {app.model.MapModel} mapModel
 *
 */
app.model.MiniMapModel = function MiniMapModel(miniMapWidth, miniMapHeight, mapModel) {

    /**
     * @property {number} _miniMapWidth
     * @private
     */
    this._miniMapWidth = miniMapWidth;

    /**
     * @property {number} _miniMapHeight
     * @private
     */
    this._miniMapHeight = miniMapHeight;

    /**
     * @property {MapModel} _miniMapModel
     * @private
     */
    this._mapModel = mapModel;

};

Utils.inherits(app.model.MiniMapModel, Object);


/**
 * @method setMiniMapWidth
 * @param {Number} value
 */
app.model.MiniMapModel.prototype.setMiniMapWidth = function setMiniMapWidth(value) {
    this._miniMapWidth = value;
};

/**
 * @method setMiniMapHeight
 * @param {Number} value
 */
app.model.MiniMapModel.prototype.setMiniMapHeight = function setMiniMapHeight(value) {
    this._miniMapHeight = value;
};

/**
 * @method setMapModel
 * @param {app.model.MapModel} value
 */
app.model.MiniMapModel.prototype.setMapModel = function setMapModel(value) {
    this._mapModel = value;
};



/**
 * @method getMiniMapWidth
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMiniMapWidth = function getMiniMapWidth() {
    return this._miniMapWidth;
};

/**
 * @method getMiniMapHeight
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMiniMapHeight = function getMiniMapHeight() {
    return this._miniMapHeight;
};

/**
 * @method getMapModel
 * @return {app.model.MapModel}
 */
app.model.MiniMapModel.prototype.getMapModel = function getMapModel() {
    return this._mapModel;
};

/**
 * @method getMiniMapScaleWidth
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMiniMapScaleWidth = function getMiniMapScaleWidth() {
    var mapLongerEdge = Math.max(this._mapModel.getMapWidth(), this._mapModel.getMapHeight()),
        miniMapWidth = this._miniMapWidth,
        miniMapScaleWidth = miniMapWidth / mapLongerEdge;

    return miniMapScaleWidth;
};

/**
 * @method getMiniMapScaleHeight
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMiniMapScaleHeight = function getMiniMapScaleHeight() {
    var mapLongerEdge = Math.max(this._mapModel.getMapWidth(), this._mapModel.getMapHeight()),
        miniMapHeight = this._miniMapHeight,
        miniMapScaleHeight = miniMapHeight / mapLongerEdge;

    return miniMapScaleHeight;
};

/**
 * @method getMapStartXOnMiniMap
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMapStartXOnMiniMap = function getMapStartXOnMiniMap() {
    return this._miniMapWidth / 2 - this._mapModel.getMapWidth() / 2 * this.getMiniMapScaleWidth();
};

/**
 * @method getMapStartYOnMiniMap
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMapStartYOnMiniMap = function getMapStartYOnMiniMap() {
    return this._miniMapHeight / 2 - this._mapModel.getMapHeight() / 2 * this.getMiniMapScaleHeight();
};

/**
 * @method getMapWidthOnMiniMap
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMapWidthOnMiniMap = function getMapWidthOnMiniMap() {
    return this._mapModel.getMapWidth() * this.getMiniMapScaleWidth();
};

/**
 * @method getMapHeightOnMiniMap
 * @return {Number}
 */
app.model.MiniMapModel.prototype.getMapHeightOnMiniMap = function getMapHeightOnMiniMap() {
    return this._mapModel.getMapHeight() * this.getMiniMapScaleHeight();
};



/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

///**
// * @method loadFromJSON
// * @property {Object} unMinifyJSON
// */
//app.model.MiniMapModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
//    this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
//    this._actionType = JSON._actionType;
//    this._entityId = JSON._entityId;
//};
//
///**
// * @method getMinifyJSON
// * @returns {Object} minifyJSON
// */
//app.model.MiniMapModel.prototype.getMinifyJSON = function getMinifyJSON() {
//    var result = {
//        1: this._circle.getMinifyJSON(),
//        2: this._actionType,
//        3: this._entityId
//    }
//
//    return result;
//};
//
///**
// * @method unMinifyJSON
// * @property {Object} minifyJSON
// * @return {Object} unMinifyJSON
// */
//app.model.MiniMapModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {
//
//    var circle = new support.geom.Circle(0, 0, 0);
//
//    var result = {
//        _circle: circle.unMinifyJSON(minifyJSON["1"]),
//        _actionType: minifyJSON["2"],
//        _entityId: minifyJSON["3"]
//    };
//
//    return result;
//};