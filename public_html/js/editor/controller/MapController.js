/**
 * Created by adambartkowiak on 30/10/15.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class MapController
 * @constructor
 * @param {app.model.MapModel} mapModel
 * @param {app.model.CameraModel} cameraModel
 * @param {editor.assets.AssetListModel} assetListModel
 */
editor.controller.MapController = function MapController(mapModel, cameraModel, assetListModel) {

    this._mapModel = mapModel;

    this._cameraModel = cameraModel;

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


        graphicTileArray = this._mapModel.getMapGraphicModel().getTileArray();

        x = mouseEvent.getLocalX() + this._cameraModel.getViewPortX();
        y = mouseEvent.getLocalY() + this._cameraModel.getViewPortY();

        tileX = parseInt(x/this._mapModel.getMapGraphicModel().getTileWidth());
        tileY = parseInt(y/this._mapModel.getMapGraphicModel().getTileHeight());

        tileIndex = this._tileIndex(tileX, tileY);

        if (mouseEvent.getButtonCode() === 0){
            if (this._assetListModel.getSelectedAssetUrl() != null){

                //console.log(mouseEvent);

                layer = this._assetListModel.getSelectedAssetLayer()

                if (!graphicTileArray[tileIndex][layer]){
                    graphicTileArray[tileIndex][layer] = {};
                }

                if ( this._assetListModel.getSelectedAssetUrl() === "assets/editor/gcc01.png"){
                    this._setTileGraphicCode(graphicTileArray, tileX, tileY, "c", 100, 100);
                }

                if ( this._assetListModel.getSelectedAssetUrl() === "assets/editor/gcc02.png"){
                    this._setTileGraphicCode(graphicTileArray, tileX, tileY, "grass", 100, 100);
                }

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


editor.controller.MapController.prototype._tileIndex = function _tileIndex(x, y) {
    return y + x * this._mapModel.getMapHeight()/this._mapModel.getMapGraphicModel().getTileHeight();
};

editor.controller.MapController.prototype._setTileGraphicCode = function _setTileGraphicCode(graphicTileArray, x, y, code, maxX, maxY) {

    var tileIndex = this._tileIndex(x, y);
    graphicTileArray[tileIndex][0][0] = code;
    graphicTileArray[tileIndex][0][1] = code;
    graphicTileArray[tileIndex][0][2] = code;
    graphicTileArray[tileIndex][0][3] = code;

    //left
    if (x>0){
        tileIndex = this._tileIndex(x-1, y);
        graphicTileArray[tileIndex][0][1] = code;
        graphicTileArray[tileIndex][0][3] = code;
    }

    //right
    tileIndex = this._tileIndex(x+1, y);
    graphicTileArray[tileIndex][0][0] = code;
    graphicTileArray[tileIndex][0][2] = code;

    //top
    if (y>0){
        tileIndex = this._tileIndex(x, y-1);
        graphicTileArray[tileIndex][0][2] = code;
        graphicTileArray[tileIndex][0][3] = code;
    }

    //bottom
    tileIndex = this._tileIndex(x, y+1);
    graphicTileArray[tileIndex][0][0] = code;
    graphicTileArray[tileIndex][0][1] = code;

    //top left
    if (x>0 && y>0) {
        tileIndex = this._tileIndex(x - 1, y - 1);
        graphicTileArray[tileIndex][0][3] = code;
    }

    //top right
    if (y>0) {
        tileIndex = this._tileIndex(x + 1, y - 1);
        graphicTileArray[tileIndex][0][2] = code;
    }

    //bottom left
    if (x>0) {
        tileIndex = this._tileIndex(x - 1, y + 1);
        graphicTileArray[tileIndex][0][1] = code;
    }

    //bottom right
    tileIndex = this._tileIndex(x+1, y+1);
    graphicTileArray[tileIndex][0][0] = code;

};
