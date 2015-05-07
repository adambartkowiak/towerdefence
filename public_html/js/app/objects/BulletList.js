/**
 * Created by adambartkowiak on 11.04.2013.
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
 */
app.objects.BulletList = function BulletList() {

    /**
     * @property _bulletList
     * @type Array
     */
    this._bulletList = [];

};

/**
 * @inheritance
 */
Utils.inherits(app.objects.BulletList, Object);


/**
 * @methodName addBullet
 * @param {app.objects.Bullet} newBullet
 */
app.objects.BulletList.prototype.addBullet = function addBullet(newBullet) {
    this._bulletList.push(newBullet);
};

/**
 * @methodName clear
 */
app.objects.BulletList.prototype.clear = function clear() {
    this._bulletList.length = 0;
};

/**
 * @methodName remove
 * @param {Number} index
 */
app.objects.BulletList.prototype.remove = function remove(index) {
    this._bulletList.splice(index, 1);
};

/**
 * @methodName getBulletList
 * @return {Array} _x
 */
app.objects.BulletList.prototype.getBulletList = function getBulletList() {
    return this._bulletList;
};

/**
 * @methodName getBullet
 * @param {Number} index
 * @return {app.objects.Bullet} bulet
 */
app.objects.BulletList.prototype.getBullet = function getBullet(index) {
    return this._bulletList[index];
};

/**
 * @methodName length
 * @return {Number} length
 */
app.objects.BulletList.prototype.length = function length() {
    return this._bulletList.length;
};