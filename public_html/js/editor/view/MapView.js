/**
 * Created by adambartkowiak on 28/10/15.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class MapView
 * @constructor
 * @param {app.model.MapModel} mapModel
 * @param {editor.assets.AssetListModel} assetListModel
 * @param {number} width
 * @param {number} height
 */
editor.view.MapView = function MapView(mapModel, cameraModel, assetListModel, width, height) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, 0, 0, width, height);

    /**
     * @property {app.model.MapModel} mapModel
     * @private
     */
    this._mapModel = mapModel;

    /**
     * @property {app.model.CameraModel} cameraModel
     * @private
     */
    this._cameraModel = cameraModel;

    /**
     * @property {editor.assets.AssetListModel} selectedAssetUrl
     * @private
     */
    this._assetListModel = assetListModel;


    this._previewX = 0;
    this._previewY = 0;

    //init getGraphicTilesArray
    var tileCount = (mapModel.getMapGraphicModel().getMapWidth() / mapModel.getMapGraphicModel().getTileWidth()) * (mapModel.getMapGraphicModel().getMapHeight() / mapModel.getMapGraphicModel().getTileHeight());
    for (var i = 0; i < tileCount; i++) {
        this._mapModel.getMapGraphicModel().getTileArray().push([["grass", "grass", "grass", "grass"], ["", "", "", ""]]);

    }

    //init getCollisionTileArray
    var tileCount = (mapModel.getMapCollisionModel().getMapWidth() / mapModel.getMapCollisionModel().getTileWidth()) * (mapModel.getMapCollisionModel().getMapHeight() / mapModel.getMapCollisionModel().getTileHeight());
    for (var i = 0; i < tileCount; i++) {
        this._mapModel.getMapCollisionModel().getTileArray().push([{allowGroundUnits: "true"}]);
    }

    //init logicTIlesArray
    //var tileCount = (mapModel.getMapWidth()/mapModel.getTileWidth()) * (mapModel.getMapHeight()/mapModel.getTileHeight());
    //for (var i = 0; i< tileCount; i++){
    //    this._mapModel.getLogicTilesArray().push([{gid: "assets/editor/gcc02.png", x:0, y:0}]);
    //}


    this._mapTileListModel = new editor.model.MapTileListModel();

    //Ladowanie grafik z assets/graphic do Obiektow Image w this._tileImage
    this._tileImage = [];
    var assetsElement = document.getElementsByClassName("assetElement");
    var assetsElementLength = assetsElement.length;
    var index;
    var assetName;
    for (index = 0; index < assetsElementLength; index++) {

        assetName = assetsElement[index].dataset["assetname"];

        this._tileImage[assetName] = new Image();
        this._tileImage[assetName].src = assetName;


        //{
        //    "graphicOffsetX": 0,
        //    "graphicOffsetY": 0,
        //    "graphicWidth": 40,
        //    "graphicHeight": 40,
        //
        //    "graphicPatternX": 0,
        //    "graphicPatternY": 0,
        //    "graphicPatternWidth": 1,
        //    "graphicPatternHeight": 1,
        //    "graphicPatternArray": [
        //    [["cobblestones", "cobblestones", "grass", "grass"]]
        //]
        //}
        var mapTileModel = new editor.model.MapTileModel();
        mapTileModel.setGraphicSource(assetsElement[index].dataset["assetname"]);
        mapTileModel.setGraphicOffsetX(parseInt(assetsElement[index].dataset["graphicoffsetx"]));
        mapTileModel.setGraphicOffsetY(parseInt(assetsElement[index].dataset["graphicoffsety"]));
        //mapTileModel.setGraphicWidth(assetsElement[index].dataset["graphicwidth"]);
        //mapTileModel.setGraphicHeight(assetsElement[index].dataset["graphicheight"]);
        //mapTileModel.setGraphicPatternX(assetsElement[index].dataset["graphicpatternx"]);
        //mapTileModel.setGraphicPatternY(assetsElement[index].dataset["graphicpatterny"]);
        //mapTileModel.setGraphicPatternWidth(assetsElement[index].dataset["graphicpatternwidth"]);
        //mapTileModel.setGraphicPatternHeight(assetsElement[index].dataset["graphicpatternheight"]);
        mapTileModel.setGraphicPatternArray(JSON.parse(assetsElement[index].dataset["graphicpatternarray"]));

        this._mapTileListModel.addElement(mapTileModel);
    }

};

Utils.inherits(editor.view.MapView, support.view.AbstractView);

/**
 * @method draw
 * @param {HTMLCanvasElement} canvas
 * @public
 */
editor.view.MapView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

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
        layer,
        maxLayer = 2;

    //MAP IMAGES
    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
            for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {

                drawX = tileIndexX * tileGraphicWidth;
                drawY = tileIndexY * tileGraphicHeight;
                tileGraphic = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphic && tileGraphic[layer]) {
                    tileGraphicX = 0;
                    tileGraphicY = 0;
                    tileGraphicsData = tileGraphic[layer];

                    tileImage = this.getTileModelByGraphicPatternArray(layer, tileIndexX, tileIndexY);

                    if (tileImage !== null) {

                        if (drawX - this._cameraModel.getViewPortX() > -20 && drawY - this._cameraModel.getViewPortY() > -20 &&
                            drawX - this._cameraModel.getViewPortX() < this.getWidth() && drawY - this._cameraModel.getViewPortY() < this.getHeight()) {
                            canvasContext.drawImage(this._tileImage[tileImage.getGraphicSource()], drawX + tileImage.getGraphicOffsetX() - this._cameraModel.getViewPortX(), drawY + tileImage.getGraphicOffsetY() - this._cameraModel.getViewPortY());
                        }

                    }

                    //Moze bedzie potrzebne do zooma - w sumie sobie tu tak lezy ! heheh :) Powinno byc wywalone i revertem z gita brane ale nie chce mi sie :P
                    //this._image.drawRotateImage(canvasContext, this._grassTile, drawX - cameraPosX, drawY - cameraPosY, 0);

                    canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
                }
            }
        }
    }


    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(0,255,0,0.1)';

    //COLLISION MESH
    //for (layer = 0; layer < maxLayer; layer++){
    //    for (tileIndexX = 0; tileIndexX < maxTileCollisionIndexX; tileIndexX++) {
    //        for (tileIndexY = 0; tileIndexY < maxTileCollisionIndexY; tileIndexY++) {
    //
    //            drawX = tileIndexX * tileCollisionWidth;
    //            drawY = tileIndexY * tileCollisionHeight;
    //            tileCollisionId = mapModel.getMapCollisionModel().getTileArray()[maxTileCollisionIndexY * tileIndexX + tileIndexY];
    //
    //            if (tileCollisionId[layer]) {
    //                canvasContext.rect(drawX, drawY, tileCollisionWidth, tileCollisionHeight);
    //            }
    //        }
    //    }
    //}

    canvasContext.lineWidth = 1;
    canvasContext.stroke();


    canvasContext.beginPath();
    canvasContext.strokeStyle = 'rgba(255,255,255,0.2)';

    //GRAPHIC MESH
    //for (layer = 0; layer < maxLayer; layer++){
    //    for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
    //        for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {
    //
    //            drawX = tileIndexX * tileGraphicWidth;
    //            drawY = tileIndexY * tileGraphicHeight;
    //            tileGraphicId = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];
    //
    //            if (tileGraphicId[layer]) {
    //                canvasContext.rect(drawX, drawY, tileGraphicWidth, tileGraphicHeight);
    //            }
    //        }
    //    }
    //}

    canvasContext.lineWidth = 1;
    canvasContext.stroke();


    if (this._assetListModel.getSelectedAssetUrl()) {

        drawX = this._previewX - this._previewX % tileGraphicWidth;
        drawY = this._previewY - this._previewY % tileGraphicHeight;

        tileGraphicX = this._assetListModel.getSelectedAssetDrawX();
        tileGraphicY = this._assetListModel.getSelectedAssetDrawY();

        tileImage = this._tileImage[this._assetListModel.getSelectedAssetUrl()];

        canvasContext.globalAlpha = 0.6;
        canvasContext.drawImage(tileImage, drawX - tileGraphicX, drawY - tileGraphicY);
        canvasContext.globalAlpha = 1;

        canvasContext.beginPath();
        canvasContext.strokeStyle = 'rgba(255,255,0,0.8)';
        canvasContext.rect(drawX - tileGraphicX, drawY - tileGraphicY, 40, 40);
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
editor.view.MapView.prototype.onMouseEvent = function onMouseEvent(mouseEvent) {

    var result = support.view.AbstractView.prototype.onMouseEvent.call(this, mouseEvent);

    if (this._assetListModel.getSelectedAssetUrl()) {
        this._previewX = mouseEvent.getLocalX();
        this._previewY = mouseEvent.getLocalY();
    }

    return result;

};


//editor.view.MapView.prototype.checkGraphicTileData = function checkGraphicTileData(table1, table2) {
//
//    if (table1[0] === table2[0] && table1[1] === table2[1] && table1[2] === table2[2] && table1[3] === table2[3]) {
//        return true;
//    }
//    return false;
//};

//this.getGraphicByGraphicPatternArray(mapModel.getMapGraphicModel().getTileArray(), layer, tileGraphicX, tileGraphicY);

editor.view.MapView.prototype.getTileModelByGraphicPatternArray = function getTileModelByGraphicPatternArray(layer, indexX, indexY) {
    var tileModel = null,
        tileListModelLength = this._mapTileListModel.length(),
        tileListModelIndex,
        tileGraphicPatternArray,
        tileGraphicPatternArrayWidth,
        tileGraphicPatternArrayHeight,
        correct,
        graphicTileOnMap,
        patternTile,
        tileIndex;

    //iteruje sie po grafikach, sprawdzam ich paterny i wrzyrownuje do kolejnych pol na mapie
    for (tileListModelIndex = 0; tileListModelIndex < tileListModelLength; tileListModelIndex++) {

        tileModel = this._mapTileListModel.getElement(tileListModelIndex);
        tileGraphicPatternArray = tileModel.getGraphicPatternArray();

        if (tileGraphicPatternArray === null){
            continue;
        }

        tileGraphicPatternArrayHeight = tileGraphicPatternArray.length;
        tileGraphicPatternArrayWidth = tileGraphicPatternArray[0].length;

        correct = false;

        //Sprawdzam w tilesach mapy czy pasuja do patternu grafiki
        for (var h = 0; h < tileGraphicPatternArrayHeight; h++) {
            for (var w = 0; w < tileGraphicPatternArrayWidth; w++) {

                //map tile
                tileIndex = this._tileIndex(indexX + w, indexY + h);
                graphicTileOnMap = this._mapModel.getMapGraphicModel().getTileArray()[tileIndex];

                if(graphicTileOnMap === undefined){
                    correct = false;
                    break;
                }

                //pattern tile
                patternTile = tileGraphicPatternArray[h][w];

                if (patternTile[0] === "highground_cobblestones"){
                    var a = 0;
                }

                if (patternTile.equals(graphicTileOnMap[layer])){
                    correct = true;
                } else {
                    correct = false;
                }

                if (!correct){
                    break;
                }
            }

            if (!correct){
                break;
            }
        }

        if (correct){
            break;
        }
    }

    if (!correct){
        tileModel = null;
    }

    return tileModel;
};


editor.view.MapView.prototype.getImageData = function getImageData(width, height) {

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var tileIndexX,
        tileIndexY,
        tileGraphicWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileGraphicHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileGraphicIndexX = Math.ceil(this._mapModel.getMapWidth() / tileGraphicWidth),
        maxTileGraphicIndexY = Math.ceil(this._mapModel.getMapHeight() / tileGraphicHeight),

        miniMapTileGraphicWidth = tileGraphicWidth * width / this._mapModel.getMapWidth(),
        miniMapTileGraphicHeight = tileGraphicHeight * height / this._mapModel.getMapHeight(),

        drawX,
        drawY,
        tileGraphicId,

        tileGraphicsData,
        titleGraphicArray = mapModel.getMapGraphicModel().getTileArray(),
        tileImage,
        layer,
        maxLayer = 2;

    //MAP IMAGES
    for (layer = 0; layer < maxLayer; layer++) {
        for (tileIndexX = 0; tileIndexX < maxTileGraphicIndexX; tileIndexX++) {
            for (tileIndexY = 0; tileIndexY < maxTileGraphicIndexY; tileIndexY++) {

                drawX = tileIndexX * miniMapTileGraphicWidth;
                drawY = tileIndexY * miniMapTileGraphicHeight;
                tileGraphicId = mapModel.getMapGraphicModel().getTileArray()[maxTileGraphicIndexY * tileIndexX + tileIndexY];

                if (tileGraphicId[layer]) {
                    tileGraphicsData = tileGraphicId[layer];
                    //tileImage = this.selectGraphicTile(tileGraphicsData, titleGraphicArray, tileIndexX, tileIndexY);
                    tileImage = this.getTileModelByGraphicPatternArray(layer, tileIndexX, tileIndexY);

                    if (tileImage !== null) {
                        ctx.drawImage(this._tileImage[tileImage.getGraphicSource()], drawX, drawY, miniMapTileGraphicWidth, miniMapTileGraphicHeight);
                    }
                }
            }
        }
    }

    //return ctx.getImageData(0, 0, width, height);

    var img = new Image();
    img.src = canvas.toDataURL();
    return img;


};


editor.view.MapView.prototype.selectGraphicTile = function selectGraphicTile(tileGraphicsData, tileGraphicArray, currentX, currentY) {

    var tileImage = {};
    tileImage.src = null;
    tileImage.x = 0;
    tileImage.y = 0;

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "grass", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/graphic/gcc02.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "c", "c", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gcc01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "c", "grass", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gbc01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "grass", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gbl01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "c", "grass", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gbl02.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "grass", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gbr01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "c", "c", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gbr02.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "grass", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gcl01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "c", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gcr01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "c", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gtc01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "grass", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gtl01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "c", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gtl02.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "grass", "c", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gtr01.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "c", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gtr02.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["c", "grass", "grass", "c"])) {
        tileImage.src = this._tileImage["assets/editor/gcc1.png"];
    }

    if (this.checkGraphicTileData(tileGraphicsData, ["grass", "c", "c", "grass"])) {
        tileImage.src = this._tileImage["assets/editor/gcc2.png"];
    }

    ////HighGround
    ////topLeft
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX - 1, currentY)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY - 1)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX - 1, currentY - 1)][1], ["hg", "hg", "hg", "hg"])
    //) {
    //    tileImage.src = this._tileImage["assets/editor/wtl01.png"];
    //    tileImage.x = -15;
    //    tileImage.y = -14;
    //}
    //
    ////topRight
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX + 1, currentY)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY - 1)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX + 1, currentY - 1)][1], ["hg", "hg", "hg", "hg"])
    //) {
    //    tileImage.src = this._tileImage["assets/editor/wtr01.png"];
    //    tileImage.y = -14;
    //}
    //
    ////bottomLeft
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX - 1, currentY)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY + 1)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX - 1, currentY + 1)][1], ["hg", "hg", "hg", "hg"])
    //) {
    //    tileImage.src = this._tileImage["assets/editor/wbl01.png"];
    //    tileImage.x = -31;
    //    //tileImage.y = -14;
    //}
    //
    ////bottomRight
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX + 1, currentY)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY + 1)][1], ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX + 1, currentY + 1)][1], ["hg", "hg", "hg", "hg"])
    //) {
    //    tileImage.src = this._tileImage["assets/editor/wbr01.png"];
    //    //tileImage.y = -14;
    //}
    //
    //
    ////left
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX - 1, currentY)][1], ["hg", "hg", "hg", "hg"])) {
    //    tileImage.src = this._tileImage["assets/editor/wcl01.png"];
    //    tileImage.x = -23;
    //}
    //
    ////right
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX + 1, currentY)][1], ["hg", "hg", "hg", "hg"])) {
    //    tileImage.src = this._tileImage["assets/editor/wcr01.png"];
    //}
    //
    ////top
    //else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
    //    && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY - 1)][1], ["hg", "hg", "hg", "hg"])) {
    //    tileImage.src = this._tileImage["assets/editor/wtc01.png"];
    //    tileImage.y = -22;
    //}

    //bottom
    else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])
        && !this.checkGraphicTileData(tileGraphicArray[this._tileIndex(currentX, currentY + 1)][1], ["hg", "hg", "hg", "hg"])) {
        tileImage.src = this._tileImage["assets/editor/wbc01.png"];
        tileImage.y = 1;
    }

    else if (this.checkGraphicTileData(tileGraphicsData, ["hg", "hg", "hg", "hg"])) {
        tileImage.src = this._tileImage["assets/editor/tgcc01.png"];
    }

    return tileImage;
};

editor.view.MapView.prototype._tileIndex = function _tileIndex(x, y) {
    return y + x * this._mapModel.getMapHeight() / this._mapModel.getMapGraphicModel().getTileHeight();
};