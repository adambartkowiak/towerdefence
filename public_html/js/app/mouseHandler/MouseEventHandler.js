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
app.mouseHandler.MouseEventHandler = function MouseEventHandler(timer, entityList) {

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
};

Utils.inherits(app.mouseHandler.MouseEventHandler, support.AbstractMouseEventHandler);

/**
 * @method onMouseDown
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseDown = function onMouseDown(e) {

    var listLength = this._entityListModel.length();
    var elementIndex;
    var element;
    var collision = false;
    var point2d = new support.geom.Point2d(e.offsetX, e.offsetY);

    //left
    if (e.button === 0) {

        for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

            element = this._entityListModel.getElement(elementIndex);

            collision = support.geom.collision.Collision.Point2dCircle(point2d, element.getCircle());

            console.log("COLISION" + collision);

            if (collision) {
                if (element.getSelectable()){
                    element._selected = true;
                }
            }

        }

    }
    //right
    else if (e.button === 2) {

        for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

            element = this._entityListModel.getElement(elementIndex);

            if (element._selected) {
                element.getMoveList().clear();
                element.getMoveList().addElement(new app.model.TargetModel(e.offsetX, e.offsetY, 0, app.model.ActionTypeModel.MOVE));
            }

        }

    }


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

/**
 * @method onMouseUp
 * @param {Event} e
 */
app.mouseHandler.MouseEventHandler.prototype.onMouseUp = function onMouseUp(e) {

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

};