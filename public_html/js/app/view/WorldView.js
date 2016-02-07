/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.view = app.view || {};

var Utils = Utils || {};

/**
 * @namespace app.view
 * @class WorldView
 * @constructor
 * @param {app.model.WorldModel} worldModel
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {app.controller.CommandController} commandController
 */
app.view.WorldView = function WorldView(worldModel, x, y, width, height) {

    /*
     Call Base/Super Constructor
     */
    app.view.AbstractWorldView.call(this, worldModel, x, y, width, height);

    this._commandController = commandController;

};

Utils.inherits(app.view.WorldView, app.view.AbstractWorldView);

/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
app.view.WorldView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");

    app.view.AbstractWorldView.prototype.draw.call(this, canvas);

    this._drawSelectedArea(canvasContext, this._worldModel.getCameraModel());

};

/**
 * @method _drawSelectedArea
 * @private
 * @param {CanvasRenderingContext2D} canvasContext
 * @param {app.model.CameraModel} cameraModel
 */
app.view.WorldView.prototype._drawSelectedArea = function _drawSelectedArea(canvasContext, cameraModel) {
    var selectRect = this._worldModel.getSelectRect();
    if (selectRect !== null) {
        canvasContext.fillStyle = '#00FF00';
        canvasContext.globalAlpha = 0.2;
        canvasContext.fillRect(selectRect.getX() - cameraModel.getViewPortX(), selectRect.getY() - cameraModel.getViewPortY(), selectRect.getWidth(), selectRect.getHeight());
        canvasContext.globalAlpha = 1;

        canvasContext.beginPath();
        canvasContext.strokeStyle = '#00FF00';
        canvasContext.rect(selectRect.getX() - 1 - cameraModel.getViewPortX(), selectRect.getY() - 1 - cameraModel.getViewPortY(), selectRect.getWidth() + 2, selectRect.getHeight() + 2);
        canvasContext.lineWidth = 1;
        canvasContext.stroke();
    }
};

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
app.view.WorldView.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {

    var listLength,
        elementIndex,
        element,
        selectedRect,
        collision = false,
        point2d = new support.geom.Point2d(mouseEvent.getLocalX(), mouseEvent.getLocalY()),
        circle = new support.geom.Circle(0, 0, 0);

    //DOWN
    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN) {
        /*
         zaznaczanie obiektow na mapie
         */
        if (mouseEvent.getButtonCode() === 0) {


            if (this._commandController.getAction() !== null) {

                var pointerOnMapX = mouseEvent.getLocalX() + this._worldModel.getCameraModel().getViewPortX();
                var pointerOnMapY = mouseEvent.getLocalY() + this._worldModel.getCameraModel().getViewPortY();

                if (this._worldModel.getSelectedEntityListModel().length() > 0) {
                    listLength = this._worldModel.getEntityListModel().length();
                    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

                        element = this._worldModel.getEntityListModel().getElement(elementIndex);

                        if (element.getSelected()) {
                            this._commandController.setActionOnEntity(element, pointerOnMapX, pointerOnMapY, app.model.ActionTypeModel.MOVE);
                        }

                    }
                }
                this._commandController.setAction(null);
            } else {
                var selectedRect = new support.geom.Rect(mouseEvent.getLocalX() + this._worldModel.getCameraModel().getViewPortX(), mouseEvent.getLocalY() + this._worldModel.getCameraModel().getViewPortY(), 1, 1);
                this._worldModel.setSelectRect(selectedRect);

                //DESELECT ALL
                listLength = this._worldModel.getEntityListModel().length();
                for (elementIndex = 0; elementIndex < listLength; elementIndex++) {
                    element = this._worldModel.getEntityListModel().getElement(elementIndex);
                    element.setSelected(false);
                }

                this._worldModel.getSelectedEntityListModel().clear();
            }


        }

        /*
         poruszanie obiektow lub poruszanie mapa
         */
        //right
        if (mouseEvent.getButtonCode() === 2) {

            var pointerOnMapX = mouseEvent.getLocalX() + this._worldModel.getCameraModel().getViewPortX();
            var pointerOnMapY = mouseEvent.getLocalY() + this._worldModel.getCameraModel().getViewPortY();

            if (this._worldModel.getSelectedEntityListModel().length() > 0) {
                listLength = this._worldModel.getEntityListModel().length();
                for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

                    element = this._worldModel.getEntityListModel().getElement(elementIndex);

                    if (element.getSelected()) {
                        this._commandController.setActionOnEntity(element, pointerOnMapX, pointerOnMapY, app.model.ActionTypeModel.MOVE);
                    }

                }
            }
//            else {
//                this._rightClickOffsetX = e.offsetX + this._worldModel.getCameraModel().getPositionX();
//                this._rightClickOffsetY = e.offsetY + this._worldModel.getCameraModel().getPositionY();
//            }

        }
    }

    //MOVE
    else if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_MOVE) {

    }

    //DRAG
    else if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG) {

        if (/*e.button === 0 && */this._worldModel.getSelectRect() !== null) {
            this._worldModel.getSelectRect().setWidth(mouseEvent.getLocalX() + this._worldModel.getCameraModel().getViewPortX() - this._worldModel.getSelectRect().getX());
            this._worldModel.getSelectRect().setHeight(mouseEvent.getLocalY() + this._worldModel.getCameraModel().getViewPortY() - this._worldModel.getSelectRect().getY());
        }

    }

    //UP
    else if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP) {

        if (mouseEvent.getButtonCode() === 0 && this._worldModel.getSelectRect() !== null) {

            listLength = this._worldModel.getEntityListModel().length();
            for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

                element = this._worldModel.getEntityListModel().getElement(elementIndex);

                circle.setX(element.getX());
                circle.setY(element.getY());
                circle.setRadius(element.getRadius());

                collision = support.geom.collision.Collision.CircleRect(circle, this._worldModel.getSelectRect());

                if (collision) {
                    if (element.getSelectable()) {
                        element.setSelected(true);
                        this._worldModel.getSelectedEntityListModel().addElement(element);
                    }
                }

            }

        }

        this._worldModel.setSelectRect(null);
    }

    return support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);
};