/**
 * Created by adambartkowiak on 19/08/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};
app.model.gui = app.model.gui || {};

var Utils = Utils || {};

/**
 * @namespace app.model.gui
 * @class MiniMapModel
 * @constructor
 * @param {Number} miniMapWidth
 * @param {Number} miniMapHeight
 * @param {app.model.worldModel} worldModel
 *
 */
app.model.gui.MiniMapModel = function MiniMapModel(minimapPosiotionX, minimapPositionY, miniMapWidth, miniMapHeight, worldModel) {

    /**
     * @property {support.geom.Rect} _view
     * @private
     */
    this._view = new support.geom.Rect(minimapPosiotionX, minimapPositionY, miniMapWidth, miniMapHeight);

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

};

Utils.inherits(app.model.gui.MiniMapModel, Object);


/**
 * @method setMiniMapPositionX
 * @param {Number} value
 */
app.model.gui.MiniMapModel.prototype.setMiniMapPositionX = function setMiniMapPositionX(value) {
    this._view.setX(value);
};

/**
 * @method setMiniMapPositionY
 * @param {Number} value
 */
app.model.gui.MiniMapModel.prototype.setMiniMapPositionY = function setMiniMapPositionY(value) {
    this._view.setY(value);
};

/**
 * @method setMiniMapWidth
 * @param {Number} value
 */
app.model.gui.MiniMapModel.prototype.setMiniMapWidth = function setMiniMapWidth(value) {
    this._view.setWidth(value);
};

/**
 * @method setMiniMapHeight
 * @param {Number} value
 */
app.model.gui.MiniMapModel.prototype.setMiniMapHeight = function setMiniMapHeight(value) {
    this._view.setHeight(value);
};


/**
 * @method getMiniMapPositionX
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapPositionX = function getMiniMapPositionX() {
    return this._view.getX();
};

/**
 * @method getMiniMapPositionY
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapPositionY = function getMiniMapPositionY() {
    return this._view.getY();
};

/**
 * @method getMiniMapWidth
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapWidth = function getMiniMapWidth() {
    return this._view.getWidth();
};

/**
 * @method getMiniMapHeight
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapHeight = function getMiniMapHeight() {
    return this._view.getHeight();
};

/**
 * @method getWorldModel
 * @return {app.model.MapModel}
 */
app.model.gui.MiniMapModel.prototype.getWorldModel = function getWorldModel() {
    return this._worldModel;
};

/**
 * @method getMiniMapScaleWidth
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapScaleWidth = function getMiniMapScaleWidth() {
    var mapLongerEdge = Math.max(this._worldModel.getMapModel().getMapWidth(), this._worldModel.getMapModel().getMapHeight()),
        miniMapScaleWidth = this.getMiniMapWidth() / mapLongerEdge;

    return miniMapScaleWidth;
};

/**
 * @method getMiniMapScaleHeight
 * @return {Number}
 */
app.model.gui.MiniMapModel.prototype.getMiniMapScaleHeight = function getMiniMapScaleHeight() {
    var mapLongerEdge = Math.max(this._worldModel.getMapModel().getMapWidth(), this._worldModel.getMapModel().getMapHeight()),
        miniMapScaleHeight = this.getMiniMapHeight() / mapLongerEdge;

    return miniMapScaleHeight;
};


/*
 Ładowanie JSONa NORMALNEGO, Minifikacja, Odminifikowanie, Ładowanie JSONa ZMINIFIKOWANEGO,
 */

///**
// * @method loadFromJSON
// * @property {Object} unMinifyJSON
// */
//app.model.gui.MiniMapModel.prototype.loadFromJSON = function loadFromJSON(JSON) {
//    this._circle = new support.geom.Circle(JSON._circle._x, JSON._circle._y, JSON._circle._radius);
//    this._actionType = JSON._actionType;
//    this._entityId = JSON._entityId;
//};
//
///**
// * @method getMinifyJSON
// * @returns {Object} minifyJSON
// */
//app.model.gui.MiniMapModel.prototype.getMinifyJSON = function getMinifyJSON() {
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
//app.model.gui.MiniMapModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {
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