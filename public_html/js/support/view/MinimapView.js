/**
 * Created by adambartkowiak on 05/09/15.
 */


'use strict';

var app = app || {};
app.view = app.view || {};
support.view = support.view || {};

var Utils = Utils || {};

/**
 * @namespace support.view
 * @class MinimapView
 * @constructor
 */
support.view.MinimapView = function MinimapView() {

    /*
     Call Base/Super Constructor
     */
    support.view.AbstractView.call(this, 0, 0, 0, 0);

    /**
     * @property {number} _mapWidth
     * @private
     */
    this._mapWidth = 0;

    /**
     * @property {number} _mapHeight
     * @private
     */
    this._mapHeight = 0;

    /**
     * @property {string} _mapColor
     * @private
     */
    this._mapColor = "#444444";

    /**
     * @property {object} _viewPort
     * @private
     */
    this._viewPort = 0;

    /**
     * @property {number} _viewPortPositionX
     * @private
     */
    this._viewPortPositionX = 0;

    /**
     * @property {number} _viewPortPositionX
     * @private
     */
    this._viewPortPositionY = 0;

    /**
     * @property {number} _viewPortWidth
     * @private
     */
    this._viewPortWidth = 0;

    /**
     * @property {number} _viewPortHeight
     * @private
     */
    this._viewPortHeight = 0;

    /**
     * @property {string} _viewPortColor
     * @private
     */
    this._viewPortColor = "#FFFFFF";


    /*
     zeby t bylo optymalne to musi byc jakis interface do elmentow tablice.. aby pobierac z niej szybko dane :)

     */
    /**
     * @property {array} _elements
     * @private
     */
    this._elements = [];

};

Utils.inherits(support.view.MinimapView, support.view.AbstractView);


/**
 * @method setMapWidth
 * @public
 * @param {number} value
 */
support.view.MinimapView.prototype.setMapWidth = function setMapWidth(value) {
    this._mapWidth = value;
};

/**
 * @method setMapHeight
 * @public
 * @param {number} value
 */
support.view.MinimapView.prototype.setMapHeight = function setMapHeight(value) {
    this._mapHeight = value;
};

/**
 * @method setMapColor
 * @public
 * @param {string} value
 */
support.view.MinimapView.prototype.setMapColor = function setMapColor(value) {
    this._mapColor = value;
};

/**
 * @method setViewPort
 * @public
 * @param {number} value
 */
support.view.MinimapView.prototype.setViewPort = function setViewPort(value) {
    this._viewPort = value;
};

/**
 * @method setViewPortColor
 * @public
 * @param {number} value
 */
support.view.MinimapView.prototype.setViewPortColor = function setViewPortColor(value) {
    this._viewPortColor = value;
};

/**
 * @method setElements
 * @public
 * @param {Array} value
 */
support.view.MinimapView.prototype.setElements = function setElements(value) {
    this._elements = value;
};

/**
 * @method getMapWidth
 * @public
 * @return {number} mapWidth
 */
support.view.MinimapView.prototype.getMapWidth = function getMapWidth() {
    return this._mapWidth;
};

/**
 * @method getMapHeight
 * @public
 * @return {number} mapHeight
 */
support.view.MinimapView.prototype.getMapHeight = function getMapHeight() {
    return this._mapHeight;
};

/**
 * @method getMapColor
 * @public
 * @return {string} mapColor
 */
support.view.MinimapView.prototype.getMapColor = function getMapColor() {
    return this._mapColor;
};


/**
 * @method getViewPort
 * @public
 * @return {object} viewPort
 */
support.view.MinimapView.prototype.getViewPort = function getViewPort() {
    return this._viewPort;
};

/**
 * @method getViewPortColor
 * @public
 * @return {string} viewPortColor
 */
support.view.MinimapView.prototype.getViewPortColor = function getViewPortColor() {
    return this._viewPortColor;
};

/**
 * @method getElements
 * @public
 * @return {Array} elements
 */
support.view.MinimapView.prototype.getElements = function getElements() {
    return this._elements;
};

/**
 * @method _getMinimapScaleWidth
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMinimapScaleWidth = function _getMinimapScaleWidth() {
    return this.getWidth() / Math.max(this.getMapWidth(), this.getMapHeight());
};

/**
 * @method _getMinimapScaleHeight
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMinimapScaleHeight = function _getMinimapScaleHeight() {
    return this.getHeight() / Math.max(this.getMapWidth(), this.getMapHeight());
};

/**
 * @method _getMapStartXOnMinimap
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMapStartXOnMinimap = function _getMapStartXOnMinimap() {
    return this.getWidth() / 2 - this.getMapWidth() / 2 * this._getMinimapScaleWidth();
};

/**
 * @method _getMapStartYOnMinimap
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMapStartYOnMinimap = function _getMapStartYOnMinimap() {
    return this.getHeight() / 2 - this.getMapHeight() / 2 * this._getMinimapScaleHeight();
};

/**
 * @method _getMapWidthOnMinimap
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMapWidthOnMinimap = function _getMapWidthOnMinimap() {
    return this.getMapWidth() * this._getMinimapScaleWidth();
};

/**
 * @method _getMapHeightOnMinimap
 * @private
 * @return {number}
 */
support.view.MinimapView.prototype._getMapHeightOnMinimap = function _getMapHeightOnMinimap() {
    return this.getMapHeight() * this._getMinimapScaleHeight();
};


/**
 * @method _getViewPortPositionX
 * @public
 * @return {number} viewPortPositionX
 */
support.view.MinimapView.prototype._getViewPortPositionX = function _getViewPortPositionX() {
    return this._viewPort.getViewPortX();
};

/**
 * @method _getViewPortPositionY
 * @public
 * @return {number} viewPortPositionY
 */
support.view.MinimapView.prototype._getViewPortPositionY = function _getViewPortPositionY() {
    return this._viewPort.getViewPortY();
};

/**
 * @method getViewPortWidth
 * @public
 * @return {number} viewPortWidth
 */
support.view.MinimapView.prototype._getViewPortWidth = function _getViewPortWidth() {
    return this._viewPort.getViewPortWidth();
};

/**
 * @method _getViewPortHeight
 * @public
 * @return {number} viewPortHeight
 */
support.view.MinimapView.prototype._getViewPortHeight = function _getViewPortHeight() {
    return this._viewPort.getViewPortHeight();
};

/**
 * @method draw
 * @public
 * @param {app.model.MapModel} mapModel
 * @param {app.model.ListModel} entityListModel
 * @param {app.model.CameraModel} cameraModel
 */
support.view.MinimapView.prototype.draw = function draw(canvas) {

    var canvasContext = canvas.getContext("2d");

    var miniMapPositionX = this.getX(),
        miniMapPositionY = this.getY(),
        miniMapWidth = this.getWidth(),
        miniMapHeight = this.getHeight(),
        mapXOnMinimap = this._getMapStartXOnMinimap(),
        mapYOnMinimap = this._getMapStartYOnMinimap(),
        mapWidthOnMinimap = this._getMapWidthOnMinimap(),
        mapHeightOnMinimap = this._getMapHeightOnMinimap(),
        miniMapScaleWidth = this._getMinimapScaleWidth(),
        miniMapScaleHeight = this._getMinimapScaleHeight(),
        viewPortWidthOnMinimap = this._getViewPortWidth() * miniMapScaleWidth,
        viewPortHeightOnMinimap = this._getViewPortHeight() * miniMapScaleHeight,
        element,
        elementIndex,
        elementIndexMax = this._elements.length,
        elementSizeOnMinimap;

    //Rysowanie backgrounda miniMapy
    canvasContext.fillStyle = this.getBackgroundColor();
    canvasContext.fillRect(miniMapPositionX, miniMapPositionY, miniMapWidth, miniMapHeight);

    //Rysowanie mapy na minimapie
    canvasContext.fillStyle = this.getMapColor();
    canvasContext.fillRect(miniMapPositionX + mapXOnMinimap, miniMapPositionY + mapYOnMinimap, Math.round(mapWidthOnMinimap), Math.round(mapHeightOnMinimap));

    //Rysowanie obiektow na minimapie
    for (elementIndex = 0; elementIndex < elementIndexMax; elementIndex++) {
        element = this._elements[elementIndex];

        var posXonMinimap = Math.round(mapXOnMinimap + element.getPositionXonMap() * miniMapScaleWidth);
        var posYonMinimap = Math.round(mapYOnMinimap + element.getPositionYonMap() * miniMapScaleHeight);

        elementSizeOnMinimap = Math.ceil(element.getRadiusOnMap() * miniMapScaleWidth);

        //if (element.getTeam() === 1) {
        //    canvasContext.fillStyle = element.getColorOnMinimap();
        //    canvasContext.fillRect(miniMapPositionX + posXonMinimap - elementSizeOnMinimap / 2, miniMapPositionY + posYonMinimap - elementSizeOnMinimap / 2, elementSizeOnMinimap, elementSizeOnMinimap);
        //} else if (element.getTeam() === 2) {
        //    canvasContext.fillStyle = element.getColorOnMinimap();
        //    canvasContext.fillRect(miniMapPositionX + posXonMinimap - elementSizeOnMinimap / 2, miniMapPositionY + posYonMinimap - elementSizeOnMinimap / 2, elementSizeOnMinimap, elementSizeOnMinimap);
        //}

        canvasContext.fillStyle = element.getColorOnMinimap();
        canvasContext.fillRect(miniMapPositionX + posXonMinimap - elementSizeOnMinimap / 2, miniMapPositionY + posYonMinimap - elementSizeOnMinimap / 2, elementSizeOnMinimap, elementSizeOnMinimap);

    }

    //viewPort na minimapie
    canvasContext.beginPath();
    canvasContext.strokeStyle = this.getViewPortColor();
    canvasContext.rect(miniMapPositionX + mapXOnMinimap + this._getViewPortPositionX() * miniMapScaleWidth, miniMapPositionY + mapYOnMinimap + this._getViewPortPositionY() * miniMapScaleHeight, viewPortWidthOnMinimap, viewPortHeightOnMinimap);
    canvasContext.lineWidth = 1;
    canvasContext.stroke();

};


/**
 * @method onMouseDown
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseDown = function onMouseDown(e) {
    console.log("support.view.MinimapView.prototype.onMouseDown");
};

/**
 * @method onMouseUp
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseUp = function onMouseUp(e) {
    console.log("support.view.MinimapView.prototype.onMouseUp");
};

/**
 * @method onMouseMove
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseMove = function onMouseMove(e) {
    console.log("support.view.MinimapView.prototype.onMouseMove");
    var x = this._viewPort.getPositionX();
    this._viewPort.setPositionX(x+10);
};

/**
 * @method onMouseDrag
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseDrag = function onMouseDrag(e) {
    console.log("support.view.MinimapView.prototype.onMouseDrag");
};

/**
 * @method onMouseEnter
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseEnter = function onMouseEnter(e) {
    console.log("support.view.MinimapView.prototype.onMouseEnter");
};

/**
 * @method onMouseLeave
 * @public
 * @param {Event} e
 */
support.view.MinimapView.prototype.onMouseLeave = function onMouseLeave(e) {
    console.log("support.view.MinimapView.prototype.onMouseLeave");
};