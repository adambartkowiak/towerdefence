/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class HudModel
 * @constructor
 * @param {Number} score
 * @param {Number} cash
 *
 */
app.objects.HudModel = function HudModel(score, cash) {


    /**
     * @property {Number} _score
     * @private
     */
    this._score = score;

    /**
     * @property {Number} _score
     * @private
     */
    this._cash = cash;

    /**
     * @property {String} _menuGraphicUrl
     * @private
     */
    this._menuGraphicUrl = "assets/images/menuBackground.png";

    /**
     * @property {Number} _towerMenuByGuid
     * @private
     */
    this._towerMenuByGuid = -1;

    /**
     * @property {Number} _towerXMenu
     * @private
     */
    this._towerXMenu = 0;

    /**
     * @property {Number} _towerMenu
     * @private
     */
    this._towerYMenu = 0;

    /**
     * @property {support.geom.Circle} _menuCircle
     * @private
     */
    this._menuCircle = new support.geom.Circle(0, 0, 0);

    /**
     * @property {support.geom.Rect} _menuOkButtonRect
     * @private
     */
    this._menuOkButtonRect = new support.geom.Rect(0, 0, 0, 0);

    /**
     * @property {support.geom.Rect} _menuCancelButtonRect
     * @private
     */
    this._menuCancelButtonRect = new support.geom.Rect(0, 0, 0, 0);

};

Utils.inherits(app.objects.HudModel, Object);

/**
 * @method getScore
 * @return {Number} score
 */
app.objects.HudModel.prototype.getScore = function getScore() {
    return this._score;
};

/**
 * @method setScore
 * @param {Number} score
 */
app.objects.HudModel.prototype.setScore = function setScore(score) {
    this._score = score;
};

/**
 * @method getCash
 * @return {Number} cash
 */
app.objects.HudModel.prototype.getCash = function getCash() {
    return this._cash;
};

/**
 * @method setCash
 * @param {Number} cash
 */
app.objects.HudModel.prototype.setCash = function setCash(cash) {
    this._cash = cash;
};

/**
 * @method getMenuGraphicUrl
 * @return {String} cash
 */
app.objects.HudModel.prototype.getMenuGraphicUrl = function getMenuGraphicUrl() {
    return this._menuGraphicUrl;
};

/**
 * @method setMenuGraphicUrl
 * @param {Number} menuGraphicUrl
 */
app.objects.HudModel.prototype.setMenuGraphicUrl = function setMenuGraphicUrl(menuGraphicUrl) {
    this._menuGraphicUrl = menuGraphicUrl;
};

/**
 * @method getTowerXMenu
 * @return {Number} towerXMenu
 */
app.objects.HudModel.prototype.getTowerXMenu = function getTowerXMenu() {
    return this._towerXMenu;
};

/**
 * @method getTowerYMenu
 * @return {Number} towerYMenu
 */
app.objects.HudModel.prototype.getTowerYMenu = function getTowerYMenu() {
    return this._towerYMenu;
};

/**
 * @method getTowerGuidForCurrentMenu
 * @return {Number} towerMenuByGuid
 */
app.objects.HudModel.prototype.getTowerGuidForCurrentMenu = function getTowerGuidForCurrentMenu() {
    return this._towerMenuByGuid;
};

/**
 * @method createMenuForTowerGuid
 * @param {Number} towerGuid
 * @param {Number} towerXMenu
 * @param {Number} towerYMenu
 */
app.objects.HudModel.prototype.createMenuForTowerGuid = function createMenuForTowerGuid(towerGuid, towerXMenu, towerYMenu) {
    this._towerMenuByGuid = towerGuid;
    this._towerXMenu = towerXMenu;
    this._towerYMenu = towerYMenu;
};

/**
 * @method disableMenuForTower
 */
app.objects.HudModel.prototype.disableMenuForTower = function disableMenuForTower() {
    this._towerMenuByGuid = -1;
};

/**
 * @method getMenuCircle
 * @return {support.geom.Circle} menuCircle
 */
app.objects.HudModel.prototype.getMenuCircle = function getMenuCircle() {
    return this._menuCircle;
};

/**
 * @method setMenuCircle
 * @param {Number} x
 * @param {Number} y
 * @param {Number} radius
 */
app.objects.HudModel.prototype.setMenuCircle = function setMenuCircle(x, y, radius) {
    this._menuCircle.setX(x);
    this._menuCircle.setY(y);
    this._menuCircle.setRadius(radius);
};

/**
 * @method getMenuOkButtonRect
 * @return {support.geom.Rect} menuOkButtonRect
 */
app.objects.HudModel.prototype.getMenuOkButtonRect = function getMenuOkButtonRect() {
    return this._menuOkButtonRect;
};

/**
 * @method getMenuCancelButtonRect
 * @return {support.geom.Rect} menuOkButtonRect
 */
app.objects.HudModel.prototype.getMenuCancelButtonRect = function getMenuCancelButtonRect() {
    return this._menuCancelButtonRect;
};

/**
 * @method setMenuOkButtonRect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
app.objects.HudModel.prototype.setMenuOkButtonRect = function setMenuOkButtonRect(x, y, width, height) {
    this._menuOkButtonRect.setX(x);
    this._menuOkButtonRect.setY(y);
    this._menuOkButtonRect.setWidth(width);
    this._menuOkButtonRect.setHeight(height);
};

/**
 * @method setMenuCancelButtonRect
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 */
app.objects.HudModel.prototype.setMenuCancelButtonRect = function setMenuCancelButtonRect(x, y, width, height) {
    this._menuCancelButtonRect.setX(x);
    this._menuCancelButtonRect.setY(y);
    this._menuCancelButtonRect.setWidth(width);
    this._menuCancelButtonRect.setHeight(height);
};

/**
 * @method saveHudModelToJsonText
 * @return {String} result
 */
app.objects.HudModel.prototype.saveHudModelToJsonText = function saveHudModelToJsonText() {
    return JSON.stringify(this);
};

/**
 * @method saveScoreToJsonText
 * @return {String} result
 */
app.objects.HudModel.prototype.saveScoreToJsonText = function saveScoreToJsonText() {
    var result = {};
    result.score = this._score;

    return JSON.stringify(result);
};

/**
 * @method loadHudModelFromJson
 * @param {String} json
 */
app.objects.HudModel.prototype.loadHudModelFromJson = function loadHudModelFromJson(json) {
    var jsonHud = json;

    this._score = jsonHud._score;
    this._cash = jsonHud._cash;
    this._towerMenuByGuid = jsonHud._towerMenuByGuid;
    this._towerXMenu = jsonHud._towerXMenu;
    this._towerYMenu = jsonHud._towerYMenu;
};

/**
 * @method loadTowerListFromJsonText
 * @param {String} jsonText
 */
app.objects.HudModel.prototype.loadHudModelFromJsonText = function loadHudModelFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadHudModelFromJson(myJson);
};