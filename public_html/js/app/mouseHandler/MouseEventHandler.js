/**
 * Created by adambartkowiak on 20.04.15.
 */
'use strict';

var app = app || {};
app.mouseHandler = app.mouseHandler || {};

var Utils = Utils || {};

/**
 * @namespace app.mouseHandler
 * @class MouseEventHandler
 * @constructor
 * @param {support.Timer} timer
 * @param {app.model.EntityListModel} entityList
 */
app.mouseHandler.MouseEventHandler = function MouseEventHandler(timer, entityList, worldModel) {

    /**
     * @property {support.Timer} _timer
     * @private
     */
    this._timer = timer;

    /**
     * @property {app.model.EntityListModel} _entityListModel
     * @private
     */
    this._entityListModel = entityList;

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {support.geom.Rect} _dragSelectionRect
     * @private
     */
    this._dragSelectionRect = null;

    /**
     * @property {boolean} _isShiftPressed
     * @private
     */
    this._isShiftPressed = false;

    /**
     * @property {boolean} _clickOnMinimap
     * @private
     */
    this._clickOnMinimap = false;

    this._rightClickOffsetX = 0;
    this._rightClickOffsetY = 0;
};

Utils.inherits(app.mouseHandler.MouseEventHandler, support.AbstractMouseEventHandler);

/**
 * @method onMouseDown
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {

    if (e.target.id !== "map") {
        return;
    }

    var listLength = this._entityListModel.length();
    var elementIndex;
    var element;
    var miniMapModel = this._worldModel.getMiniMapModel();

    if (e.shiftKey) {
        this._isShiftPressed = true;
    } else {
        this._isShiftPressed = false;
    }

    if (e.altKey) {

        for (elementIndex = listLength - 1; elementIndex >= 0; elementIndex--) {
            element = this._entityListModel.getElement(elementIndex);

            if (element.getSelected()) {
                this._entityListModel.removeElement(elementIndex);
            }

        }

    }

    if (e.offsetX < miniMapModel.getMiniMapWidth() && e.offsetY > 500 - miniMapModel.getMiniMapHeight()) {
        this._clickOnMinimap = true;
    } else {
        this._clickOnMinimap = false;
    }

    if (e.button === 0) {
        //sprawdzam czy klikniecie odbylo sie na miniMapie
        if (this._clickOnMinimap) {
            this._worldModel.getCameraModel().setPositionX((e.offsetX - 0 - this._worldModel.getMiniMapModel().getMapStartXOnMiniMap()) / this._worldModel.getMiniMapModel().getMiniMapScaleWidth());
            this._worldModel.getCameraModel().setPositionY((e.offsetY - 500 + miniMapModel.getMiniMapHeight() - this._worldModel.getMiniMapModel().getMapStartYOnMiniMap()) / this._worldModel.getMiniMapModel().getMiniMapScaleHeight());
        } else {
            this._dragSelectionRect = new support.geom.Rect(e.offsetX + this._worldModel.getCameraModel().getViewPortX(), e.offsetY + this._worldModel.getCameraModel().getViewPortY(), 5, 5);
            this._worldModel.setSelectRect(this._dragSelectionRect);

            //DESELECT ALL
            listLength = this._entityListModel.length();
            for (elementIndex = 0; elementIndex < listLength; elementIndex++) {
                element = this._entityListModel.getElement(elementIndex);
                element._selected = false;
            }

            worldModel.getSelectedEntityListModel().clear();
        }

        console.log(this._clickOnMinimap);
    }


    //right
    if (e.button === 2) {
        if (this._worldModel.getSelectedEntityListModel().length() > 0) {
            for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

                element = this._entityListModel.getElement(elementIndex);

                if (element._selected && element.getMoveList()) {
                    if (!this._isShiftPressed) {
                        element.getMoveList().clear();
                    }
                    element.getMoveList().addElement(new app.model.TargetModel(e.offsetX + this._worldModel.getCameraModel().getViewPortX(), e.offsetY + this._worldModel.getCameraModel().getViewPortY(), 5, 0, app.model.ActionTypeModel.MOVE));
                } else if (element._selected) {
                    element.setMoveList(new app.model.ListModel());
                    element.getMoveList().addElement(new app.model.TargetModel(e.offsetX + this._worldModel.getCameraModel().getViewPortX(), e.offsetY + this._worldModel.getCameraModel().getViewPortY(), 5, 0, app.model.ActionTypeModel.MOVE));
                }

            }
        } else {
            this._rightClickOffsetX = e.offsetX + this._worldModel.getCameraModel().getPositionX();
            this._rightClickOffsetY = e.offsetY + this._worldModel.getCameraModel().getPositionY();
        }

    }


};

/**
 * @method onMouseUp
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {

    var listLength = this._entityListModel.length();
    var elementIndex;
    var element;
    var collision = false;
    var point2d = new support.geom.Point2d(0, 0);
    var circle = new support.geom.Circle(0, 0, 0);


    //console.log(this._dragSelectionRect);

    //left
    if (e.button === 0 && this._dragSelectionRect !== null) {

        for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

            element = this._entityListModel.getElement(elementIndex);


            circle.setX(element.getX());
            circle.setY(element.getY());
            circle.setRadius(element.getRadius());

            collision = support.geom.collision.Collision.CircleRect(circle, this._dragSelectionRect);

            if (collision) {
                if (element.getSelectable()) {
                    element._selected = true;

                    worldModel.getSelectedEntityListModel().addElement(element);

                }
            }

        }

    }

    this._dragSelectionRect = null;
    this._worldModel.setSelectRect(this._dragSelectionRect);

};

/**
 * @method onMouseMove
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseMove = function onMouseMove(e) {

};

/**
 * @method onMouseDrag
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDrag = function onMouseDrag(e) {

    var miniMapModel = this._worldModel.getMiniMapModel();

    if (e.target.id !== "map") {
        return;
    }

    var listLength = this._entityListModel.length();
    var elementIndex;
    var element;
    var collision = false;
    var point2d = new support.geom.Point2d(e.offsetX, e.offsetY);

    if (e.button === 0 && this._dragSelectionRect !== null) {
        this._dragSelectionRect.setWidth(e.offsetX + this._worldModel.getCameraModel().getViewPortX() - this._dragSelectionRect.getX());
        this._dragSelectionRect.setHeight(e.offsetY + this._worldModel.getCameraModel().getViewPortY() - this._dragSelectionRect.getY());
    }

    if (this._clickOnMinimap) {
        this._worldModel.getCameraModel().setPositionX((e.offsetX - 0 - this._worldModel.getMiniMapModel().getMapStartXOnMiniMap()) / this._worldModel.getMiniMapModel().getMiniMapScaleWidth());
        this._worldModel.getCameraModel().setPositionY((e.offsetY - 500 + miniMapModel.getMiniMapHeight() - this._worldModel.getMiniMapModel().getMapStartYOnMiniMap()) / this._worldModel.getMiniMapModel().getMiniMapScaleHeight());
    }

    if (e.button === 2 && this._worldModel.getSelectedEntityListModel().length() === 0) {

        this._worldModel.getCameraModel().setPositionX(this._rightClickOffsetX - e.offsetX);
        this._worldModel.getCameraModel().setPositionY(this._rightClickOffsetY - e.offsetY);

    }

    //podazanie za kliknietym przyciskiem
    //if (e.button === 2) {
    //
    //    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {
    //
    //        element = this._entityListModel.getElement(elementIndex);
    //
    //        if (element._selected && element.getMoveList()) {
    //            element.getMoveList().clear();
    //            element.getMoveList().addElement(new app.model.TargetModel(e.offsetX, e.offsetY, 0, app.model.ActionTypeModel.MOVE));
    //        } else if (element._selected){
    //            element.setMoveList(new app.model.ListModel());
    //            element.getMoveList().addElement(new app.model.TargetModel(e.offsetX, e.offsetY, 0, app.model.ActionTypeModel.MOVE));
    //        }
    //
    //    }
    //
    //}
};



///**
// * @method onMouseUp
// * @param {Event} e
// */
//app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {
//
//    var mapModel = this._worldModel.getMap();
//    var mapField = mapModel.getFieldByPixels(e.offsetX, e.offsetY);
//    var towerList = this._worldModel.getTowerList();
//    var fieldWidth = mapModel.getFieldWidth();
//    var fieldHeight = mapModel.getFieldHeight();
//    var towerX = Math.floor(e.offsetX / fieldWidth) * fieldWidth + fieldWidth * 0.5;
//    var towerY = Math.floor(e.offsetY / fieldHeight) * fieldHeight + fieldHeight * 0.5;
//    var tower = towerList.getTowerByPosition(towerX, towerY);
//    var towerType = 0;
//
//    //console.log("\"_x\":" + towerX + ", \"_y\":" + towerY + ",");
//
//    mapModel.setSelectedField(mapField);
//
//    //nie mmay odpalonego menu edycji wiezy
//    if (this._hudModel.getTowerGuidForCurrentMenu() === -1) {
//        if (mapField.getEmpty() === true) {
//            if (this._hudModel.getCash() >= 200) {
//                var bullet = new app.objects.Bullet(0, 0, null, 500, 0.1, "assets/images/bullet0.png");
//                towerList.addTower(new app.objects.Tower(towerX, towerY, 250, 150, bullet, "assets/images/tower0.png"));
//                mapField.setEmpty(false);
//                //this._hudModel.setCash(this._hudModel.getCash()-200);
//            }
//        } else {
//            if (tower !== null) {
//                this._hudModel.createMenuForTowerGuid(tower.getGuid(), towerX, towerY);
//                this._timer.changeMultiplier(0.03);
//            }
//        }
//    }
//    //mamy juz odpalone meny edycji wiezy
//    else {
//        var okButtonRect = this._hudModel.getMenuOkButtonRect();
//        var cancleButtonRect = this._hudModel.getMenuCancelButtonRect();
//        var menuCircle = this._hudModel.getMenuCircle();
//        var point = new support.geom.Point2d(e.offsetX, e.offsetY);
//        var selectedTower = towerList.getTowerByGuid(this._hudModel.getTowerGuidForCurrentMenu());
//        var maxTowerType = 2;
//
//        if (menuCircle.isPointInside(point)) {
//            //updaradowanie wiezyczki
//            if (okButtonRect.isPointInside(point)) {
//                if (selectedTower.getType() < maxTowerType) {
//                    selectedTower.setType(selectedTower.getType() + 1);
//                }
//            }
//            //kasowanie wiezyczki
//            if (cancleButtonRect.isPointInside(point)) {
//                mapField = mapModel.getFieldByPixels(selectedTower.getX(), selectedTower.getY());
//                mapField.setEmpty(true);
//                this._worldModel.getTowerList().deleteTower(selectedTower);
//
//                //this._hudModel.setCash(this._hudModel.getCash()+250*);
//
//                this._hudModel.disableMenuForTower();
//                this._timer.changeMultiplier(1);
//
//            }
//        } else {
//            this._hudModel.disableMenuForTower();
//            this._timer.changeMultiplier(1);
//        }
//    }
//};
