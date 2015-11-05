/**
 * Created by adambartkowiak on 1/11/15.
 */

'use strict';
var ns = Utils.namespace("app.model.map");

/**
 * @namespace app.model.map
 * @class MapGraphicLayerModel
 * @constructor
 * @param {Number} mapWidth
 * @param {Number} mapHeight
 * @param {Number} tileWidth
 * @param {Number} tileHeight
 *
 */
app.model.map.MapGraphicLayerModel = function MapGraphicLayerModel(mapWidth, mapHeight, tileWidth, tileHeight) {

    /*
     Call Base/Super Constructor
     */
    app.model.map.AbstractMapLayerModel.call(this, mapWidth, mapHeight, tileWidth, tileHeight);
};

Utils.inherits(app.model.map.MapGraphicLayerModel, app.model.map.AbstractMapLayerModel);