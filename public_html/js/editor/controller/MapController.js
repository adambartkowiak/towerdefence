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
        tileIndex,
        layer;

    if ((mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP ||
        mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG) &&
        mouseEvent.isMousePointerInsideTargetView()){


        graphicTileArray = this._mapModel.getGraphicTilesArray();

        x = mouseEvent.getLocalX();
        y = mouseEvent.getLocalY();

        tileX = parseInt(x/this._mapModel.getTileWidth());
        tileY = parseInt(y/this._mapModel.getTileHeight());

        tileIndex = tileY + tileX * this._mapModel.getMapHeight()/this._mapModel.getTileHeight();

        if (mouseEvent.getButtonCode() === 0){
            if (this._assetListModel.getSelectedAssetUrl() != null){

                //console.log(mouseEvent);

                layer = this._assetListModel.getSelectedAssetLayer()

                if (!graphicTileArray[tileIndex][layer]){
                    graphicTileArray[tileIndex][layer] = {};
                }

                graphicTileArray[tileIndex][layer].gid = this._assetListModel.getSelectedAssetUrl();
                graphicTileArray[tileIndex][layer].x = this._assetListModel.getSelectedAssetDrawX();
                graphicTileArray[tileIndex][layer].y = this._assetListModel.getSelectedAssetDrawY();
            }
        } else if (mouseEvent.getButtonCode() === 2) {

            graphicTileArray[tileIndex][0].gid = "";
            graphicTileArray[tileIndex][0].x = 0;
            graphicTileArray[tileIndex][0].y = 0;

            if (graphicTileArray[tileIndex][1]){
                graphicTileArray[tileIndex][1].gid = "";
                graphicTileArray[tileIndex][1].x = 0;
                graphicTileArray[tileIndex][1].y = 0;
            }

        }

    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN){
        return true;
    } else {
        return false;
    }
};