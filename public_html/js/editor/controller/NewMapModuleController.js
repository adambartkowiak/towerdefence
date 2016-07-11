/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class NewMapModuleController
 * @constructor
 * @param {app.model.WorldModel} worldModel
 * @param {editor.view.WorldView}
 * @param {support.view.MinimapView}
 */
editor.controller.NewMapModuleController = function NewMapModuleController(worldModel, editorWorldView, miniMapView) {

    /**
     * @property {app.model.WorldModel}
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {editor.view.WorldView}
     * @private
     */
    this._editorWorldView = editorWorldView;

    /**
     * @property {support.view.MinimapView}
     * @private
     */
    this._miniMapView = miniMapView;

};

Utils.inherits(editor.controller.NewMapModuleController, Object);

/**
 * @method createNewMap
 * @public
 */
editor.controller.NewMapModuleController.prototype.createNewMap = function createNewMap(width, height) {

    var intWidthValue = parseInt(width) || 20;
    var intHeightValue = parseInt(height) || 20;

    //create MapModel
    var mapModel = new app.model.MapModel(intWidthValue * 40, intHeightValue * 40, 40, 40);

    //create EditorMapModel
    var editorMapModel = new editor.model.EditorMapModel(mapModel);

    //set MapModel
    this._worldModel.setMapModel(mapModel);

    //Update miniMapView
    this._miniMapView.setMapWidth(mapModel.getMapWidth());
    this._miniMapView.setMapHeight(mapModel.getMapHeight());

    //Reset camera
    this._worldModel.getCameraModel().setPositionX(0);
    this._worldModel.getCameraModel().setPositionY(0);

    //Update mapModelOnView
    this._editorWorldView._editorMapModel = editorMapModel;
    this._editorWorldView._mapModel = mapModel;

    //Clear entities
    this._worldModel.getEntityListModel().clear();

    /*
     Generowani tilesow Edytora typ terenu - wszystko jest tutaj opisane w sposob latwy edytowaly dla edytora
     */
    var tileCount = (mapModel.getMapGraphicModel().getMapWidth() / mapModel.getMapGraphicModel().getTileWidth()) * (mapModel.getMapGraphicModel().getMapHeight() / mapModel.getMapGraphicModel().getTileHeight());
    editorMapModel.getEditorMapTileArray().length = 0;
    for (var i = 0; i < tileCount; i++) {
        editorMapModel.getEditorMapTileArray().push([{
            "set": false,
            "data": ["grass", "grass", "grass", "grass"]
        }, {"set": false, "data": ["", "", "", ""]}]);
    }

    /*
     Generowanie mapy kolizji - mapa kolizji ma ten sam format dla edytora i dla gry
     */
    editorMapModel.getMapModel().getMapCollisionModel().getTileArray().length = 0;
    for (var i = 0; i < tileCount; i++) {
        editorMapModel.getMapModel().getMapCollisionModel().getTileArray().push([0x0000, 0]);
    }

    //Set controller on editorWorldView
    var editorMapController = new editor.controller.EditorMapController(editorMapModel, worldModel);
    editorMapController.updateMapModel();

    this._editorWorldView.setMouseEventListener(editorMapController);
};