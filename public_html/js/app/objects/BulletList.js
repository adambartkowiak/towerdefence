/**
 * Created by adambartkowiak on 11.04.2013.
 */

'use strict';

var app = app || {};
app.objects = app.objects || {};

var Utils = Utils || {};

/**
 * @namespace app.objects
 * @class BulletList
 * @constructor
 */
app.objects.BulletList = function BulletList() {

    /**
     * @property {Array} _bulletList
     * @private
     */
    this._bulletList = [];

};

Utils.inherits(app.objects.BulletList, Object);


/**
 * @method addBullet
 * @param {app.objects.Bullet} newBullet
 */
app.objects.BulletList.prototype.addBullet = function addBullet(newBullet) {
    this._bulletList.push(newBullet);
};

/**
 * @method clear
 */
app.objects.BulletList.prototype.clear = function clear() {
    this._bulletList.length = 0;
};

/**
 * @method remove
 * @param {Number} index
 */
app.objects.BulletList.prototype.remove = function remove(index) {
    this._bulletList.splice(index, 1);
};

/**
 * @method getBulletList
 * @return {Array} _x
 */
app.objects.BulletList.prototype.getBulletList = function getBulletList() {
    return this._bulletList;
};

/**
 * @method getBullet
 * @param {Number} index
 * @return {app.objects.Bullet} bulet
 */
app.objects.BulletList.prototype.getBullet = function getBullet(index) {
    return this._bulletList[index];
};

/**
 * @method length
 * @return {Number} length
 */
app.objects.BulletList.prototype.length = function length() {
    return this._bulletList.length;
};

/**
 * @method saveBulletListToJsonText
 * @return {String} result
 */
app.objects.BulletList.prototype.saveBulletListToJsonText = function saveBulletListToJsonText() {
    return JSON.stringify(this._bulletList);
};

/**
 * @method loadBulletListFromJson
 * @param {String} json
 */
app.objects.BulletList.prototype.loadBulletListFromJson = function loadBulletListFromJson(json) {
    var myJson = json;
    var jsonBullet;

    this.clear();

    for (var i = 0; i < myJson.length; i++) {
        jsonBullet = myJson[i];

        var newTarget = new app.objects.Target(jsonBullet._target._x, jsonBullet._target._y, jsonBullet._target._enemyGuid);
        var newBullet = new app.objects.Bullet(jsonBullet._x, jsonBullet._y, newTarget, jsonBullet._speed, jsonBullet._damage, jsonBullet._graphicUrl);
        newBullet.setAngle(jsonBullet._angle);

        this.addBullet(newBullet);
    }
};

/**
 * @method loadBulletListFromJsonText
 * @param {String} jsonText
 */
app.objects.BulletList.prototype.loadBulletListFromJsonText = function loadBulletListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    this.loadBulletListFromJson(myJson);
};