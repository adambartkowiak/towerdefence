/**
 * Created by adambartkowiak on 05/09/15.
 */


'use strict';

var app = app || {};
app.view = app.view || {};
app.view.gui = app.view.gui || {};

var Utils = Utils || {};

/**
 * @namespace app.view.gui
 * @class StatusMenuView
 * @constructor
 * @param {HTMLCanvasElement} canvas
 * @param {app.model.WorldModel} worldModel
 */
app.view.gui.StatusMenuView = function StatusMenuView(canvas, worldModel) {

    /**
     * @property {HTMLCanvasElement} _canvas
     * @private
     */
    this._canvas = canvas;

    /**
     * @property {CanvasRenderingContext2D} _canvasContext
     * @private
     */
    this._canvasContext = canvas.getContext("2d");


    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

};


/**
 * @method draw
 * @public
 * @param {app.model.MapModel} mapModel
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
app.view.gui.StatusMenuView.prototype.draw = function draw() {

    var minimapWidth = this._worldModel.getMiniMapModel().getMiniMapWidth();
    var actionMenuWidth = 150;
    var outsideSpace = 10;
    var hudHeight = 75;
    var hudTop = this._canvas.height - hudHeight;

    this._canvasContext.fillStyle = '#222222';
    this._canvasContext.fillRect(minimapWidth + outsideSpace, hudTop, canvas.width - minimapWidth - actionMenuWidth - outsideSpace*2, hudHeight);

    this._canvasContext.fillStyle = '#FFFFFF';
    this._canvasContext.fillText("EntityModelIndex: " + app.model.EntityModelIndex.ENTITY_MODEL_INDEX, minimapWidth + outsideSpace + 10, hudTop + 20);


    //Zaznaczanie
    var selectedElementLength = this._worldModel.getSelectedEntityListModel().length();
    if (selectedElementLength === 1) {

        var selectedElement = this._worldModel.getSelectedEntityListModel().getElement(0);
        //HP
        this._canvasContext.fillText("HP: " + selectedElement.getCurrentHp() + "/" + selectedElement.getHp(), minimapWidth + outsideSpace + 10, hudTop + 40);

        var buildList = selectedElement.getBuildList();
        if (buildList !== null) {
            var buildListIndex;
            var buildListLength = buildList.length();
            var buildListElement = null;

            for (buildListIndex = 0; buildListIndex < buildListLength; buildListIndex++) {
                buildListElement = buildList.getElement(buildListIndex);
                this._canvasContext.fillText("BUILDING: " + buildListElement.getCurrentBuildTime() + "/" + buildListElement.getBuildTime(), minimapWidth + outsideSpace + 200, hudTop + 20 + 20 * buildListIndex);
            }
        }


    } else if (selectedElementLength > 1) {

        this._canvasContext.fillText("SELECTED COUNT: " + selectedElementLength, minimapWidth + outsideSpace + 10, hudTop + 40);

    }

};



/**
 * @method onMouseDown
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseDown = function onMouseDown(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseDown");
};

/**
 * @method onMouseUp
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseUp = function onMouseUp(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseUp");
};

/**
 * @method onMouseMove
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseMove = function onMouseMove(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseMove");
};

/**
 * @method onMouseDrag
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseDrag = function onMouseDrag(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseDrag");
};

/**
 * @method onMouseEnter
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseEnter = function onMouseEnter(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseEnter");
};

/**
 * @method onMouseLeave
 * @public
 * @param {Event} e
 */
app.view.gui.StatusMenuView.prototype.onMouseLeave = function onMouseLeave(e) {
    console.log("app.view.gui.StatusMenuView.prototype.onMouseLeave");
};
