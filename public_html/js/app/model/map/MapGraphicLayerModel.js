/**
 * Created by adambartkowiak on 1/11/15.
 */

/*
 Klasa zawiera nazwe grafiki per tile oraz wielkosci grafik.
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

    /**
     * @property {Array} _rootTileArray
     * @private
     */
    this._rootTileArray = [];

    /**
     * @property {Array} _fowTileArray
     * @private
     */
    this._fogOfWarTileArray = [];
};

Utils.inherits(app.model.map.MapGraphicLayerModel, app.model.map.AbstractMapLayerModel);


/**
 * @method getRootTileArray
 * @return {Array}
 */
ns.MapGraphicLayerModel.prototype.getRootTileArray = function getRootTileArray() {
    return this._rootTileArray;
};

/**
 * @method setRootTileArray
 * @param {Array} rootTileArray
 */
ns.MapGraphicLayerModel.prototype.setRootTileArray = function setRootTileArray(rootTileArray) {
    this._rootTileArray = rootTileArray;
};

/**
 * @method initRootTileArray
 */
ns.MapGraphicLayerModel.prototype.initRootTileArray = function initRootTileArray() {

    var layer = 0,
        maxLayer = 2,
        tileIndexX,
        tileIndexY,
        tileGraphicWidth = this.getTileWidth(),
        tileGraphicHeight = this.getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(this.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(this.getMapHeight() / tileGraphicHeight),
        tile,
        rootTile,
        graphic,
        graphicTileWidth,
        graphicTileHeight;

    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
            for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {

                if (this._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
                    this._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
                }

                var rootTile = {};
                rootTile.src = null;
                rootTile.x = 0;
                rootTile.y = 0;
                rootTile.renderTime = 0;
                rootTile.mmRenderTime = 0;

                this._rootTileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer] = rootTile;

            }
        }
    }


    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
            for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {

                tile = this._tileArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer];

                if (tile && tile.src !== null) {

                    var rootTile = {};

                    //Ustawienie w tablicy RootTile inforacji o RootowymTileu oraz tilesach z nim powiazanych
                    for (var x = 0; x < tile.width; x++) {
                        for (var y = 0; y < tile.height; y++) {

                            rootTile = {};

                            rootTile.src = null;

                            if (x === 0 && y === 0) {
                                rootTile.src = tile.src;
                            }

                            rootTile.x = -x;
                            rootTile.y = -y;
                            rootTile.renderTime = 0;
                            rootTile.mmRenderTime = 0;

                            if (this._rootTileArray[maxTileGraphicIndexY * (tileIndexX + x) + (tileIndexY + y)] === undefined) {
                                this._rootTileArray[maxTileGraphicIndexY * (tileIndexX + x) + (tileIndexY + y)] = [];
                            }

                            this._rootTileArray[maxTileGraphicIndexY * (tileIndexX + x) + (tileIndexY + y)][layer] = rootTile;
                        }
                    }

                }

            }
        }
    }
};

