/**
 * Created by adambartkowiak on 30/10/15.
 */

'use strict';

Utils.namespace(["editor", "controller"]);

/**
 * @namespace editor.controller
 * @class MapController
 * @constructor
 * @param {app.model.MapModel} mapModel
 * @param {editor.assets.AssetListModel} assetListModel
 */
editor.controller.MapController = function MapController(mapModel, assetListModel) {

    this._mapModel = mapModel;

    this._assetListModel = assetListModel;

};

Utils.inherits(editor.controller.MapController, support.AbstractMouseEventListener);

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
editor.controller.MapController.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {
    var graphicTileArray,
        x = 0,
        y = 0,
        tileX,
        tileY,
        tileIndex;

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP ||
        mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG){


        graphicTileArray = this._mapModel.getGraphicTilesArray();

        x = mouseEvent.getLocalX();
        y = mouseEvent.getLocalY();

        tileX = parseInt(x/this._mapModel.getTileWidth());
        tileY = parseInt(y/this._mapModel.getTileHeight());

        tileIndex = tileY + tileX * this._mapModel.getMapHeight()/this._mapModel.getTileHeight();

        //console.log(graphicTileArray[tileIndex]);
        //console.log(graphicTileArray[tileIndex].gid);

        if (this._assetListModel.getSelectedAssetUrl() != null){
            console.log(tileIndex);
            graphicTileArray[tileIndex].gid = this._assetListModel.getSelectedAssetUrl();
        }

        //console.log(graphicTileArray[tileIndex].gid);

    }
};