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
 * @param {app.model.worldModel} worldModel
 *
 */
app.model.gui.MiniMapModel = function MiniMapModel(worldModel) {

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

};

Utils.inherits(app.model.gui.MiniMapModel, Object);


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