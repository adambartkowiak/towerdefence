/**
 * Created by adambartkowiak on 30/10/15.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class EditorMapController
 * @constructor
 * @param {editor.model.EditorMapModel} mapModel
 * @param {app.model.WorldModel} worldModel
 */
editor.controller.EditorMapController = function EditorMapController(editorMapModel, worldModel) {

    this._editorMapModel = editorMapModel;

    this._mapModel = editorMapModel.getMapModel();

    this._worldModel = worldModel;

    this._cameraModel = worldModel.getCameraModel();

    this._activeBrushhName = "brushGrass";

    this._mapTileListModel = new editor.model.MapTileListModel();

    this._entityListModel = new app.model.EntityListModel();


    //Ladowanie paternów dla tilesow mapy
    var assetsElement = document.getElementsByClassName("mapTileElement");
    var assetsElementLength = assetsElement.length;
    var index;
    var assetName;
    for (index = 0; index < assetsElementLength; index++) {

        assetName = assetsElement[index].dataset["assetname"];

        //{
        //    "graphicPatternX": -1,
        //    "graphicPatternY": -1,
        //    "graphicPatternArray": [
        //    [["_NONE_", "_NONE_", "_NONE_", "water"], ["_NONE_", "_NONE_", "water", "water"], ["_NONE_", "_NONE_", "water", "_NONE_"]],
        //    [["_NONE_", "water", "_NONE_", "water"], ["water", "water", "water", "water"], ["water", "_NONE_", "water", "_NONE_"]],
        //    [["_NONE_", "water", "_NONE_", "_NONE_"], ["water", "water", "_NONE_", "_NONE_"], ["water", "_NONE_", "_NONE_", "_NONE_"]]
        //],
        //    "collisionArray": ["0xFFFF"]
        //}

        var mapTileModel = new editor.model.MapTileModel();
        mapTileModel.setGraphicSource(assetsElement[index].dataset["assetname"]);
        mapTileModel.setGraphicPatternX(parseInt(assetsElement[index].dataset["graphicpatternx"]));
        mapTileModel.setGraphicPatternY(parseInt(assetsElement[index].dataset["graphicpatterny"]));
        mapTileModel.setGraphicWidthInTile(parseInt(assetsElement[index].dataset["graphicwidthintile"]));
        mapTileModel.setGraphicHeightInTile(parseInt(assetsElement[index].dataset["graphicheightintile"]));
        mapTileModel.setGraphicPatternArray(JSON.parse(assetsElement[index].dataset["graphicpatternarray"]));

        var collisionJson = JSON.parse(assetsElement[index].dataset["collisionarray"]);

        if (collisionJson !== null) {
            for (var j = 0; j < collisionJson.length; j++) {
                for (var k = 0; k < collisionJson[j].length; k++) {
                    collisionJson[j][k] = parseInt(collisionJson[j][k]);
                }
            }
        }

        mapTileModel.setCollisionArray(collisionJson);

        this._mapTileListModel.addElement(mapTileModel);
    }


    //Loadowanie configow obiektów, ktore mozna dodawac w edytorze
    assetsElement = document.getElementsByClassName("entityElement");
    assetsElementLength = assetsElement.length;
    for (index = 0; index < assetsElementLength; index++) {

        assetName = assetsElement[index].dataset["assetname"];

        //{
        //    "graphicPath": "assets/graphics/images/base_03.png",
        //    "graphicOffsetX": 0,
        //    "graphicOffsetY": 0,
        //    "radius": 20,
        //    "groundSpeed": 0,
        //    "team": 0,
        //    "mass": 0,
        //    "hp": 100,
        //    "currentHp": 100,
        //    "selectable": true,
        //    "targetable": true
        //}
        var entityModel = new app.model.EntityModel();

        entityModel.setId(assetsElement[index].dataset["entityid"]);
        entityModel.setTeam(parseInt(assetsElement[index].dataset["team"]));
        entityModel.setMass(parseInt(assetsElement[index].dataset["mass"] === "" ? 0 : assetsElement[index].dataset["mass"]));
        entityModel.setGroundSpeed(parseInt(assetsElement[index].dataset["groundspeed"]));
        entityModel.setRadius(parseInt(assetsElement[index].dataset["radius"]));
        entityModel.setHp(parseInt(assetsElement[index].dataset["hp"]));
        entityModel.setCurrentHp(parseInt(assetsElement[index].dataset["currenthp"]));
        entityModel.setSelectable(assetsElement[index].dataset["selectable"]);
        entityModel.setTargetable(assetsElement[index].dataset["targetable"]);
        entityModel.setGraphicUrl(assetsElement[index].dataset["assetname"]);
        entityModel.setGraphicOffsetX(parseInt(assetsElement[index].dataset["graphicoffsetx"]));
        entityModel.setGraphicOffsetY(parseInt(assetsElement[index].dataset["graphicoffsety"]));


        this._entityListModel.addElement(entityModel);
    }


};

Utils.inherits(editor.controller.EditorMapController, support.AbstractMouseEventListener);

/**
 * Metoda sluzaca do obslugi Eventu.
 *
 * @method onMouseEvent
 * @public
 * @param {support.MouseEvent} mouseEvent
 * @return {boolean} true - event obsluzony przez widok, false - even przesylany dalej - nie zmienia logiki dispatch
 */
editor.controller.EditorMapController.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {
    var graphicTileArray,
        x = 0,
        y = 0,
        tileX,
        tileY,
        tileIndex;

    if ((mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_UP ||
        mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DRAG) &&
        mouseEvent.isMousePointerInsideTargetView()) {


        graphicTileArray = this._editorMapModel.getEditorMapTileArray();

        x = mouseEvent.getLocalX() + this._cameraModel.getViewPortX();
        y = mouseEvent.getLocalY() + this._cameraModel.getViewPortY();

        tileX = parseInt(x / this._editorMapModel.getMapModel().getMapGraphicModel().getTileWidth());
        tileY = parseInt(y / this._editorMapModel.getMapModel().getMapGraphicModel().getTileHeight());

        tileIndex = this._tileIndex(tileX, tileY);

        if (mouseEvent.getButtonCode() === 0) {
            //if (this._assetListModel.getSelectedAssetUrl() != null){

            //console.log(mouseEvent);

            //layer = this._assetListModel.getSelectedAssetLayer()
            //
            //if (!graphicTileArray[tileIndex][layer]) {
            //    graphicTileArray[tileIndex][layer] = {};
            //}

            //var

            if (this._activeBrushhName === "brushCobblestones") {
                this._setTileGraphicCode(graphicTileArray, 0, tileX, tileY, 2, 1, "cobblestones", 3, 3, true);
            }

            else if (this._activeBrushhName === "brushCobblestonesBig") {
                this._setTileGraphicCode(graphicTileArray, 0, tileX, tileY, 1, 1, "cobblestones", 6, 6, true);
            }

            else if (this._activeBrushhName === "brushGrass") {
                this._setGroundTileGraphicCode(graphicTileArray, 0, tileX, tileY, "grass", "cobblestones");
            }

            else if (this._activeBrushhName === "brushPaving") {
                this._setGroundTileGraphicCode(graphicTileArray, 0, tileX, tileY, "paving", "cobblestones");
            }

            else if (this._activeBrushhName === "brushPaving-Water") {
                this._setTileGraphicCode(graphicTileArray, 0, tileX, tileY, 2, 1, "paving", 3, 3, true, "cobblestones", 2, 3, false);
            }

            //if (this._activeBrushhName === "highground_cobblestones") {
            //    this._setHighGroundTileGraphicCode(graphicTileArray, 1, tileX, tileY, "highground_cobblestones");
            //}

            else if (this._activeBrushhName === "highground_cobblestones") {
                this._setTileGraphicCode(graphicTileArray, 1, tileX, tileY, 2, 1, "highground_cobblestones", 3, 3, false, 0, 0, false);
            }


            else if (this._activeBrushhName === "brushWater") {
                this._setTileGraphicCode(graphicTileArray, 0, tileX, tileY, 2, 1, "water", 3, 3, false, "cobblestones", 2, 3, true);
            }

            else if (this._entityListModel.getElementById(this._activeBrushhName) != null) {

                var unit = this._entityListModel.getElementById(this._activeBrushhName).clone();
                unit.setX(x);
                unit.setY(y);

                if (this._activeBrushhName === "unit1_team1") {

                    ////unit1 build list
                    var unit1BuildList = new app.model.ListModel();

                    var unit1Bullet = new app.model.EntityModel();
                    unit1Bullet.setRadius(10);
                    unit1Bullet.setAttackDamage(10);
                    unit1Bullet.setGroundSpeed(1000);
                    unit1Bullet.setHp(1);
                    unit1Bullet.setCurrentHp(1);
                    unit1Bullet.setBuildTime(300);
                    unit1Bullet.setGraphicUrl("assets/graphics/images/bullet0.png");
                    unit1Bullet.setSelectable(false);
                    unit1Bullet.setAttackRange(300);

                    var unit1BulletMoveList = new app.model.ListModel();
                    unit1BulletMoveList.addElement(new app.model.TargetModel(-1, -1, 5, 0, app.model.ActionTypeModel.ATTACK));
                    unit1Bullet.setMoveList(unit1BulletMoveList);


                    unit1BuildList.addElement(unit1Bullet);
                    unit.setBuildList(unit1BuildList);
                } else if (this._activeBrushhName === "bulding1_team1"){


                    //unit1
                    var unit1 = new app.model.EntityModel();
                    unit1.setTeam(1);
                    unit1.setX(60);
                    unit1.setY(200);
                    unit1.setRadius(20);
                    unit1.setGroundSpeed(120);
                    unit1.setHp(100);
                    unit1.setCurrentHp(100);
                    unit1.setBuildTime(200);
                    unit1.setSelectable(true);
                    unit1.setTargetable(true);
                    unit1.setGraphicUrl("assets/graphics/images/enemy0.png");

                    //unit1 move list
                    var unit1MoveList = new app.model.ListModel();
                    unit1MoveList.addElement(new app.model.TargetModel(1500, 700, 5, 0, app.model.ActionTypeModel.MOVE_AND_AIM));
                    unit1.setMoveList(unit1MoveList);

                    //unit1 build list
                    var unit1BuildList = new app.model.ListModel();

                    var unit1Bullet = new app.model.EntityModel();
                    unit1Bullet.setRadius(10);
                    unit1Bullet.setAttackDamage(10);
                    unit1Bullet.setGroundSpeed(800);
                    unit1Bullet.setHp(1);
                    unit1Bullet.setCurrentHp(1);
                    unit1Bullet.setBuildTime(200);
                    unit1Bullet.setGraphicUrl("assets/graphics/images/bullet0.png");
                    unit1Bullet.setSelectable(false);
                    unit1Bullet.setAttackRange(300);

                    var unit1BulletMoveList = new app.model.ListModel();
                    unit1BulletMoveList.addElement(new app.model.TargetModel(-1, -1, 5, 0, app.model.ActionTypeModel.ATTACK));
                    unit1Bullet.setMoveList(unit1BulletMoveList);


                    unit1BuildList.addElement(unit1Bullet);
                    unit1.setBuildList(unit1BuildList);

                    //base1 build list
                    var base1buildList = new app.model.ListModel();

                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);
                    base1buildList.addElement(unit1);

                    unit.setBuildList(base1buildList);

                }

                this._worldModel.getEntityListModel().addElement(unit);
            }

            //tileX
            //tileY
            //2
            //1
            //3
            //3
            //2
            //3
            //
            //this.updateMapModel(tileX, tileY, );
            var updateSpace = 7;
            this.updateMapModel(tileX - updateSpace, tileY - updateSpace, tileX + updateSpace, tileY + updateSpace);

            //}
        }
        //else if (mouseEvent.getButtonCode() === 2) {
        //
        //    graphicTileArray[tileIndex][0].gid = "";
        //    graphicTileArray[tileIndex][0].x = 0;
        //    graphicTileArray[tileIndex][0].y = 0;
        //
        //    if (graphicTileArray[tileIndex][1]){
        //        graphicTileArray[tileIndex][1].gid = "";
        //        graphicTileArray[tileIndex][1].x = 0;
        //        graphicTileArray[tileIndex][1].y = 0;
        //    }
        //
        //}

    }

    if (mouseEvent.getMouseEventType() === support.MouseEventType.MOUSE_DOWN) {
        return true;
    } else {
        return false;
    }
};

editor.controller.EditorMapController.prototype._tileIndex = function _tileIndex(x, y) {
    return y + x * this._editorMapModel.getMapModel().getMapHeight() / this._editorMapModel.getMapModel().getMapGraphicModel().getTileHeight();
};

editor.controller.EditorMapController.prototype._setGroundTileGraphicCode = function _setGroundTileGraphicCode(graphicTileArray, layer, x, y, code, blendCode) {

    //blendowanie
    if (blendCode !== null) {
        if (x > 0 && y > 0) {
            this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x - 1, y - 1, blendCode, code);
        }

        if (x > 0) {
            this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x - 1, y, blendCode, code);
            this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x - 1, y + 1, blendCode, code);
        }


        if (y > 0) {
            this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x, y - 1, blendCode, code);
        }

        this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x, y, blendCode, code);
        this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x, y + 1, blendCode, code);

        if (y > 0) {
            this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x + 1, y - 1, blendCode, code);
        }
        this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x + 1, y, blendCode, code);
        this._setGroundTileGraphicCodeConditional(graphicTileArray, layer, x + 1, y + 1, blendCode, code);
    }


    var tileIndex = this._tileIndex(x, y);
    graphicTileArray[tileIndex][layer]["data"][0] = code;
    graphicTileArray[tileIndex][layer]["data"][1] = code;
    graphicTileArray[tileIndex][layer]["data"][2] = code;
    graphicTileArray[tileIndex][layer]["data"][3] = code;

    //left
    if (x > 0) {
        tileIndex = this._tileIndex(x - 1, y);
        graphicTileArray[tileIndex][layer]["data"][1] = code;
        graphicTileArray[tileIndex][layer]["data"][3] = code;
    }


    //right
    tileIndex = this._tileIndex(x + 1, y);
    graphicTileArray[tileIndex][layer]["data"][0] = code;
    graphicTileArray[tileIndex][layer]["data"][2] = code;

    //top
    if (y > 0) {
        tileIndex = this._tileIndex(x, y - 1);
        graphicTileArray[tileIndex][layer]["data"][2] = code;
        graphicTileArray[tileIndex][layer]["data"][3] = code;
    }

    //bottom
    tileIndex = this._tileIndex(x, y + 1);
    graphicTileArray[tileIndex][layer]["data"][0] = code;
    graphicTileArray[tileIndex][layer]["data"][1] = code;

    //top left
    if (x > 0 && y > 0) {
        tileIndex = this._tileIndex(x - 1, y - 1);
        graphicTileArray[tileIndex][layer]["data"][3] = code;
    }

    //top right
    if (y > 0) {
        tileIndex = this._tileIndex(x + 1, y - 1);
        graphicTileArray[tileIndex][layer]["data"][2] = code;
    }

    //bottom left
    if (x > 0) {
        tileIndex = this._tileIndex(x - 1, y + 1);
        graphicTileArray[tileIndex][layer]["data"][1] = code;
    }

    //bottom right
    tileIndex = this._tileIndex(x + 1, y + 1);
    graphicTileArray[tileIndex][layer]["data"][0] = code;
};

editor.controller.EditorMapController.prototype._setGroundTileGraphicCodeConditional = function _setGroundTileGraphicCodeConditional(graphicTileArray, layer, x, y, code, conditionalCode) {


    var tileIndex = this._tileIndex(x, y);
    graphicTileArray[tileIndex][layer]["data"][0] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][0], code, conditionalCode);
    graphicTileArray[tileIndex][layer]["data"][1] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][1], code, conditionalCode);
    graphicTileArray[tileIndex][layer]["data"][2] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][2], code, conditionalCode);
    graphicTileArray[tileIndex][layer]["data"][3] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][3], code, conditionalCode);

    //left
    if (x > 0) {
        tileIndex = this._tileIndex(x - 1, y);
        graphicTileArray[tileIndex][layer]["data"][1] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][1], code, conditionalCode);
        graphicTileArray[tileIndex][layer]["data"][3] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][3], code, conditionalCode);
    }


    //right
    tileIndex = this._tileIndex(x + 1, y);
    graphicTileArray[tileIndex][layer]["data"][0] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][0], code, conditionalCode);
    graphicTileArray[tileIndex][layer]["data"][2] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][2], code, conditionalCode);

    //top
    if (y > 0) {
        tileIndex = this._tileIndex(x, y - 1);
        graphicTileArray[tileIndex][layer]["data"][2] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][2], code, conditionalCode);
        graphicTileArray[tileIndex][layer]["data"][3] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][3], code, conditionalCode);
    }

    //bottom
    tileIndex = this._tileIndex(x, y + 1);
    graphicTileArray[tileIndex][layer]["data"][0] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][0], code, conditionalCode);
    graphicTileArray[tileIndex][layer]["data"][1] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][1], code, conditionalCode);

    //top left
    if (x > 0 && y > 0) {
        tileIndex = this._tileIndex(x - 1, y - 1);
        graphicTileArray[tileIndex][layer]["data"][3] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][3], code, conditionalCode);
    }

    //top right
    if (y > 0) {
        tileIndex = this._tileIndex(x + 1, y - 1);
        graphicTileArray[tileIndex][layer]["data"][2] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][2], code, conditionalCode);
    }

    //bottom left
    if (x > 0) {
        tileIndex = this._tileIndex(x - 1, y + 1);
        graphicTileArray[tileIndex][layer]["data"][1] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][1], code, conditionalCode);
    }

    //bottom right
    tileIndex = this._tileIndex(x + 1, y + 1);
    graphicTileArray[tileIndex][layer]["data"][0] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][0], code, conditionalCode);
};

editor.controller.EditorMapController.prototype._conditionalCode = function _conditionalCode(currentCode, code, conditionalCode) {

    if (currentCode === conditionalCode) {
        return conditionalCode;
    } else {
        return code;
    }

};

editor.controller.EditorMapController.prototype._setHighGroundTileGraphicCode = function _setHighGroundTileGraphicCode(graphicTileArray, layer, x, y, code) {

    var xIndex = Math.floor(x / 2) * 2;

    var tileIndex1 = this._tileIndex(xIndex, y);
    var tileIndex2 = this._tileIndex(xIndex + 1, y);
    var tileIndex3 = this._tileIndex(xIndex, y + 1);
    var tileIndex4 = this._tileIndex(xIndex + 1, y + 1);

    graphicTileArray[tileIndex1][layer]["data"][0] = code;
    graphicTileArray[tileIndex1][layer]["data"][1] = code;
    graphicTileArray[tileIndex1][layer]["data"][2] = code;
    graphicTileArray[tileIndex1][layer]["data"][3] = code;

    graphicTileArray[tileIndex2][layer]["data"][0] = code;
    graphicTileArray[tileIndex2][layer]["data"][1] = code;
    graphicTileArray[tileIndex2][layer]["data"][2] = code;
    graphicTileArray[tileIndex2][layer]["data"][3] = code;

    graphicTileArray[tileIndex3][layer]["data"][0] = code;
    graphicTileArray[tileIndex3][layer]["data"][1] = code;
    graphicTileArray[tileIndex3][layer]["data"][2] = code;
    graphicTileArray[tileIndex3][layer]["data"][3] = code;

    graphicTileArray[tileIndex4][layer]["data"][0] = code;
    graphicTileArray[tileIndex4][layer]["data"][1] = code;
    graphicTileArray[tileIndex4][layer]["data"][2] = code;
    graphicTileArray[tileIndex4][layer]["data"][3] = code;

};

editor.controller.EditorMapController.prototype._setTileGraphicCode = function _setTileGraphicCode(graphicTileArray, layer, x, y, stepX, stepY, innerCode, innerCodeWidth, innerCodeHeight, innerBlending, outerCode, outerCodeWidth, outerCodeHeight, outerBlending) {

    var tileIndex = 0;

    x = Math.floor(x / stepX) * stepX;
    y = Math.floor(y / stepY) * stepY;

    var blenMask = [false, false, false, false];

    if (outerCode) {
        for (var i = -outerCodeWidth; i < innerCodeWidth + outerCodeWidth; i++) {
            for (var j = -outerCodeHeight; j < innerCodeHeight + outerCodeHeight - 1; j++) {

                tileIndex = this._tileIndex(x + i, y + j);

                if (outerBlending) {

                    blenMask = [false, false, false, false];

                    if (i === -outerCodeWidth) {
                        blenMask[0] = true;
                        blenMask[2] = true;
                    }

                    if (i === innerCodeWidth + outerCodeWidth - 1) {
                        blenMask[1] = true;
                        blenMask[3] = true;
                    }

                    if (j === -outerCodeHeight) {
                        blenMask[0] = true;
                        blenMask[1] = true;
                    }

                    if (j === innerCodeHeight + outerCodeHeight - 2) {
                        blenMask[2] = true;
                        blenMask[3] = true;
                    }

                }

                for (var k = 0; k < 4; k++) {
                    if (!blenMask[k]) {
                        graphicTileArray[tileIndex][layer]["data"][k] = this._conditionalCode(graphicTileArray[tileIndex][layer]["data"][k], outerCode, innerCode);
                    }
                }

            }
        }
    }


    for (var i = 0; i < innerCodeWidth; i++) {
        for (var j = 0; j < innerCodeHeight; j++) {

            tileIndex = this._tileIndex(x + i, y + j);

            blenMask = [false, false, false, false];

            if (innerBlending) {

                if (i === 0) {
                    blenMask[0] = true;
                    blenMask[2] = true;
                }

                if (i === innerCodeWidth - 1) {
                    blenMask[1] = true;
                    blenMask[3] = true;
                }

                if (j === 0) {
                    blenMask[0] = true;
                    blenMask[1] = true;
                }

                if (j === innerCodeHeight - 1) {
                    blenMask[2] = true;
                    blenMask[3] = true;
                }

            }

            for (var k = 0; k < 4; k++) {
                if (!blenMask[k]) {
                    graphicTileArray[tileIndex][layer]["data"][k] = innerCode;
                }
            }

        }
    }

};


/*
 Create MapModel from EditorMapModel
 */


/**
 * @method updateMapModel
 */
editor.controller.EditorMapController.prototype.updateMapModel = function updateMapModel(tileIndexStartX, tileIndexStartY, tileIndexEndX, tileIndexEndY) {

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(this._mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(this._mapModel.getMapHeight() / tileGraphicHeight),

        tileCollisionWidth = this._mapModel.getMapCollisionModel().getTileWidth(),
        tileCollisionHeight = this._mapModel.getMapCollisionModel().getTileHeight(),
        maxTileCollisionIndexX = Math.ceil(this._mapModel.getMapWidth() / tileCollisionWidth),
        maxTileCollisionIndexY = Math.ceil(this._mapModel.getMapHeight() / tileCollisionHeight),

        drawX,
        drawY,
        tileGraphic,
        tileGraphicX,
        tileGraphicY,

        tileCollisionId,
        titleGraphicArray = mapModel.getMapGraphicModel().getTileArray(),

        tileGraphicsData,
        tileImage,
        layer = 0,
        maxLayer = 2;

    var areaWidth = this._mapModel.getMapWidth();
    var areaHeight = this._mapModel.getMapHeight();

    //MAP IMAGES
    //Optymalizacja PETLI TUTAJ POWINNA BYC !!!

    var startIndexX = 0; //parseInt(Math.max(0, this._cameraModel.getViewPortX() / tileGraphicWidth));
    var startIndexY = 0; //parseInt(Math.max(0, this._cameraModel.getViewPortY() / tileGraphicHeight));
    var endIndexX = parseInt(areaWidth / tileGraphicWidth + 2);
    var endIndexY = parseInt(areaHeight / tileGraphicHeight + 2);

    if (tileIndexStartX !== undefined && tileIndexStartY !== undefined && tileIndexEndX !== undefined && tileIndexEndX !== undefined) {

        startIndexX = Math.max(tileIndexStartX, 0);
        startIndexY = Math.max(tileIndexStartY, 0);
        endIndexX = Math.min(parseInt(areaWidth / tileGraphicWidth + 2), tileIndexEndX);
        endIndexY = Math.min(parseInt(areaHeight / tileGraphicHeight + 2), tileIndexEndY);

    }


    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexX = startIndexX; tileIndexX < endIndexX; tileIndexX++) {
            for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {

                tileGraphic = this._editorMapModel.getEditorMapTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {
                    tileGraphicsData = tileGraphic[layer]["set"] = false;
                }
            }
        }
    }

    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexX = startIndexX; tileIndexX < endIndexX; tileIndexX++) {
            for (tileIndexY = startIndexY; tileIndexY < endIndexY; tileIndexY++) {

                drawX = tileIndexX * tileGraphicWidth;
                drawY = tileIndexY * tileGraphicHeight;
                tileGraphic = this._editorMapModel.getEditorMapTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {
                    tileGraphicX = 0;
                    tileGraphicY = 0;
                    tileGraphicsData = tileGraphic[layer];

                    var mapGraphicTileModelArray = this._mapModel.getMapGraphicModel().getTileArray();
                    var mapCollisionTileModelArray = this._mapModel.getMapCollisionModel().getTileArray();

                    if (tileGraphicsData["set"] === false) {
                        tileImage = this.getTileModelByGraphicPatternArray(layer, tileIndexX, tileIndexY);

                        if (tileImage !== null) {

                            if (mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
                                mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
                            }

                            var graphicTile = {
                                src: tileImage.getGraphicSource(),
                                width: tileImage.getGraphicWidthInTile() || 1,
                                height: tileImage.getGraphicHeightInTile() || 1
                            }


                            mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer] = graphicTile;

                            var collisionJson = tileImage.getCollisionArray();
                            if (collisionJson !== null) {
                                for (var j = 0; j < collisionJson.length; j++) {
                                    for (var k = 0; k < collisionJson[j].length; k++) {
                                        mapCollisionTileModelArray[maxTileGraphicIndexY * (tileIndexX + k) + tileIndexY + j][layer] = tileImage.getCollisionArray()[j][k];
                                    }
                                }
                            }


                        } else {
                            if (mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
                                mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
                            }

                            mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer] = null;
                        }
                    } else {
                        mapGraphicTileModelArray[maxTileGraphicIndexY * tileIndexX + tileIndexY][layer] = null;
                    }

                    //canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
                }
            }
        }
    }

    //init getCollisionTileArray
    //var tileCount = (mapModel.getMapCollisionModel().getMapWidth() / mapModel.getMapCollisionModel().getTileWidth()) * (mapModel.getMapCollisionModel().getMapHeight() / mapModel.getMapCollisionModel().getTileHeight());
    //for (var i = 0; i < tileCount; i++) {
    //    mapModel.getMapCollisionModel().getTileArray().push([{gu: "true"}]);
    //}
    //
    //
    //init logicTilesArray
    //var tileCount = (mapModel.getMapWidth()/mapModel.getTileWidth()) * (mapModel.getMapHeight()/mapModel.getTileHeight());
    //for (var i = 0; i< tileCount; i++){
    //    this._mapModel.getLogicTilesArray().push([{gid: "assets/editor/gcc02.png", x:0, y:0}]);
    //}

    this._mapModel.getMapGraphicModel().initRootTileArray();
};

editor.controller.EditorMapController.prototype.getTileModelByGraphicPatternArray = function getTileModelByGraphicPatternArray(layer, indexX, indexY) {
    var tileModel = null,
        tileListModelLength = this._mapTileListModel.length(),
        tileListModelIndex,
        tileGraphicPatternArray,
        tileGraphicPatternArrayWidth,
        tileGraphicPatternArrayHeight,
        tileGraphicPatternX,
        tileGraphicPatternY,
        correct,
        graphicTileOnMap,
        patternTile,
        tileIndex,
        selectedTileWidth = 0,
        selectedTileHeight = 0,
        selectedTileModel = null;

    //iteruje sie po grafikach, sprawdzam ich paterny i wrzyrownuje do kolejnych pol na mapie
    for (tileListModelIndex = 0; tileListModelIndex < tileListModelLength; tileListModelIndex++) {

        tileModel = this._mapTileListModel.getElement(tileListModelIndex);
        tileGraphicPatternArray = tileModel.getGraphicPatternArray();

        if (tileGraphicPatternArray === null) {
            continue;
        }

        tileGraphicPatternArrayHeight = tileGraphicPatternArray.length;
        tileGraphicPatternArrayWidth = tileGraphicPatternArray[0].length;

        tileGraphicPatternX = tileModel.getGraphicPatternX();
        tileGraphicPatternY = tileModel.getGraphicPatternY();


        correct = false;

        //Sprawdzam w tilesach mapy czy pasuja do patternu grafiki
        for (var h = 0; h < tileGraphicPatternArrayHeight; h++) {
            for (var w = 0; w < tileGraphicPatternArrayWidth; w++) {

                //map tile
                tileIndex = this._tileIndex(indexX + w + tileGraphicPatternX, indexY + h + tileGraphicPatternY);
                graphicTileOnMap = this._editorMapModel.getEditorMapTileArray()[tileIndex];

                if (graphicTileOnMap === undefined) {
                    correct = false;
                    break;
                }

                //pattern tile
                patternTile = tileGraphicPatternArray[h][w];

                correct = true;
                //Czy
                if (patternTile[0] !== "_NONE_" && patternTile[0] !== graphicTileOnMap[layer]["data"][0]) {
                    correct = false;
                } else if (patternTile[1] !== "_NONE_" && patternTile[1] !== graphicTileOnMap[layer]["data"][1]) {
                    correct = false;
                } else if (patternTile[2] !== "_NONE_" && patternTile[2] !== graphicTileOnMap[layer]["data"][2]) {
                    correct = false;
                } else if (patternTile[3] !== "_NONE_" && patternTile[3] !== graphicTileOnMap[layer]["data"][3]) {
                    correct = false;
                }


                if (!correct) {
                    break;
                }
            }

            if (!correct) {
                break;
            }
        }

        //przypisanie najwiekszego taila z listy Tilesow pasujacego do mapy
        if (correct && (selectedTileWidth * selectedTileHeight < tileGraphicPatternArrayHeight * tileGraphicPatternArrayWidth)) {
            selectedTileModel = tileModel;
            selectedTileHeight = tileGraphicPatternArrayHeight;
            selectedTileWidth = tileGraphicPatternArrayWidth;
        }
    }

    //Remove nieghbour Tiles From Searching
    if (selectedTileModel !== null) {
        for (var i = 0; i < selectedTileWidth - 2; i++) {
            for (var j = 0; j < selectedTileHeight - 2; j++) {
                tileIndex = this._tileIndex(indexX + i, indexY + j);
                this._editorMapModel.getEditorMapTileArray()[tileIndex][layer]["set"] = true;
            }
        }

    }

    return selectedTileModel;
};