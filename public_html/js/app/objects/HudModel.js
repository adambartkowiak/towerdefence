/**
 * Created by adambartkowiak on 11.04.2015.
 */

'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.objects = app.objects || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.objects
 * @param {Number} score
 * @param {Number} cash
 * 
 */
app.objects.HudModel = function HudModel(score, cash) {

    
    /**
     * @property {Number} _score
     */
    this._score = score;

    /**
     * @property {Number} _score
     */
    this._cash = cash;
    
    /**
     * @property {Number} _towerMenu
     */
    this._towerMenuByGuid = -1;
    
    /**
     * @property {Number} _towerMenu
     */
    this._towerXMenu = 0;
    
    /**
     * @property {Number} _towerMenu
     */
    this._towerYMenu = 0;
    
    /**
     * @property {Number} _towerMenu
     */
    this._menuCircle = new support.geom.Circle(0, 0, 0);
    
    /**
     * @property {Number} _towerMenu
     */
    this._menuOkButtonRect = new support.geom.Rect(0, 0, 0, 0);
    
    /**
     * @property {Number} _towerMenu
     */
    this._menuCancelButtonRect = new support.geom.Rect(0, 0, 0, 0);
    
};

/**
 * @inheritance
 */
Utils.inherits(app.objects.HudModel, Object);

/**
 * @methodName getScore
 * @return {NUmber} score
 */
app.objects.HudModel.prototype.getScore = function getScore() {
    return this._score;
};

/**
 * @methodName setScore
 * @param {Number} score
 */
app.objects.HudModel.prototype.setScore = function setScore(score) {
    this._score = score;
};

/**
 * @methodName getCash
 * @return {Number} cash
 */
app.objects.HudModel.prototype.getCash = function getCash() {
    return this._cash;
};

/**
 * @methodName setCash
 * @param {Number} cash
 */
app.objects.HudModel.prototype.setCash = function setCash(cash) {
    this._cash = cash;
};

/**
 * @methodName getTowerXMenu
 * @return {Number} towerXMenu
 */
app.objects.HudModel.prototype.getTowerXMenu = function getTowerXMenu() {
    return this._towerXMenu;
};

/**
 * @methodName getTowerYMenu
 * @return {Number} towerYMenu
 */
app.objects.HudModel.prototype.getTowerYMenu = function getTowerYMenu() {
    return this._towerYMenu;
};

/**
 * @methodName getTowerGuidForCurrentMenu
 * @return {Number} towerMenuByGuid
 */
app.objects.HudModel.prototype.getTowerGuidForCurrentMenu = function getTowerGuidForCurrentMenu() {
    return this._towerMenuByGuid;
};

/**
 * @methodName createMenuForTowerGuid
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
 * @methodName disableMenuForTower
 */
app.objects.HudModel.prototype.disableMenuForTower = function disableMenuForTower() {
    this._towerMenuByGuid = -1;
};

/**
 * @methodName getMenuCircle
 * @return {support.geom.Circle} menuCircle
 */
app.objects.HudModel.prototype.getMenuCircle = function getMenuCircle() {
    return this._menuCircle;
};

/**
 * @methodName setMenuCircle
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
 * @methodName getMenuOkButtonRect
 * @return {support.geom.Rect} menuOkButtonRect
 */
app.objects.HudModel.prototype.getMenuOkButtonRect = function getMenuOkButtonRect() {
    return this._menuOkButtonRect;
};

/**
 * @methodName getMenuCancelButtonRect
 * @return {support.geom.Rect} menuOkButtonRect
 */
app.objects.HudModel.prototype.getMenuCancelButtonRect = function getMenuCancelButtonRect() {
    return this._menuCancelButtonRect;
};

/**
 * @methodName setMenuOkButtonRect
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
 * @methodName setMenuCancelButtonRect
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
 * @methodName saveHudModelToJsonText
 * @return {String} result
 */
app.objects.HudModel.prototype.saveHudModelToJsonText = function saveHudModelToJsonText() {
    return JSON.stringify(this);
};

/**
 * @methodName loadTowerListFromJsonText
 * @param {String} jsonText
 */
app.objects.HudModel.prototype.loadHudModelFromJsonText = function loadHudModelFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    var jsonHud = myJson;
    
    this._score = jsonHud._score;
    this._cash = jsonHud._cash;
    this._towerMenuByGuid = jsonHud._towerMenuByGuid;
    this._towerXMenu = jsonHud._towerXMenu;
    this._towerYMenu = jsonHud._towerYMenu;
};