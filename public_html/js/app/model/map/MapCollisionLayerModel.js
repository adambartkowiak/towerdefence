/**
 * Created by adambartkowiak on 1/11/15.
 */

'use strict';
Utils.namespace(["app", "model", "map"]);

/**
 * @namespace app.model.map
 * @class MapCollisionLayerModel
 * @constructor
 * @param {Number} mapWidth
 * @param {Number} mapHeight
 * @param {Number} tileWidth
 * @param {Number} tileHeight
 *
 */
app.model.map.MapCollisionLayerModel = function MapCollisionLayerModel(mapWidth, mapHeight, tileWidth, tileHeight) {

    /*
     Call Base/Super Constructor
     */
    app.model.map.AbstractMapLayerModel.call(this, mapWidth, mapHeight, tileWidth, tileHeight);
};

Utils.inherits(app.model.map.MapCollisionLayerModel, app.model.map.AbstractMapLayerModel);