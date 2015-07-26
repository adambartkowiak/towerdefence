/**
 * Created by adambartkowiak on 15.04.2015.
 */

'use strict';

var app = app || {};
app.managers = app.managers || {};

var Utils = Utils || {};

/**
 * @namespace app.managers
 * @class BulletManager
 * @constructor
 * @param {app.objects.BulletList} bulletList
 * @param {app.objects.EnemyList} enemyList
 * @param {app.objects.HudModel} hudModel
 */
app.managers.BulletManager = function BulletManager(bulletList, enemyList, hudModel) {

    /**
     * @property {app.objects.BulletList} _bulletList
     * @private
     */
    this._bulletList = bulletList;

    /**
     * @property {app.objects.EnemyList} _enemyList
     * @private
     */
    this._enemyList = enemyList;

    /**
     * @property {app.objects.HudModel}_hudModel
     * @private
     */
    this._hudModel = hudModel;

    /**
     * @property {Number} _collisionTrue
     * @private
     */
    this._collisionTrue = 0;

    /**
     * @property {Number} _collisionFalse
     * @private
     */
    this._collisionFalse = 0;


};

Utils.inherits(app.managers.BulletManager, Object);

/**
 * @method moveBullets
 * @param {Number} timeDelta
 */
app.managers.BulletManager.prototype.moveBullets = function moveBullets(timeDelta) {

    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, tX, tY, dX, dY, target, enemyGuid, enemy;
    var moveVector;
    var normalizedVector;

    for (bulletIndex = 0; bulletIndex < length; bulletIndex++) {
        bullet = this._bulletList.getBullet(bulletIndex);

        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemyGuid = target.getEnemyGuid();
        enemy = this._enemyList.getEnemyByGuid(enemyGuid);

        if (enemy !== null) {
            target.setX(enemy.getX());
            target.setY(enemy.getY());
        }

        tX = target.getX();
        tY = target.getY();

        //delta
        dX = tX - bX;
        dY = tY - bY;

        moveVector = new support.geom.SimpleVector2d(dX, dY);
        normalizedVector = moveVector.getNormalizedVector();

        bullet._moveVector.setX(dX);
        bullet._moveVector.setY(dY);

        //ustawienie obrotu strzaly na podstawie vektora znormalizowanego
        bullet.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX()) * 180 / Math.PI + 90);

        bullet.setX(bullet.getX() + normalizedVector.getX() * timeDelta / 1000 * bullet.getSpeed() * worldModel.SIZEPROPORTION);
        bullet.setY(bullet.getY() + normalizedVector.getY() * timeDelta / 1000 * bullet.getSpeed() * worldModel.SIZEPROPORTION);
    }

};

/**
 * @method checkTargetsToHit
 */
app.managers.BulletManager.prototype.checkTargetsToHit = function checkTargetsToHit() {

    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, tX, tY, target, enemyGuid, enemy, currentHp;
    //var targetBulletVector;

    var arrayToRemove = []
    var bulletToRemoveIndex = 0;

    for (bulletIndex = 0; bulletIndex < length; bulletIndex++) {
        bullet = this._bulletList.getBullet(bulletIndex);

        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemyGuid = target.getEnemyGuid();
        enemy = this._enemyList.getEnemyByGuid(enemyGuid);

        if (enemy !== null) {
            target.setX(enemy.getX());
            target.setY(enemy.getY());
        }

        //pozycja celu
        tX = target.getX();
        tY = target.getY();


        //kolizje 2 wektorow
        //@TODO: powinno byc kolizje wektora (poruszajacego sie punktu) i poruszajacego sie okregu
        var v1 = null;
        if (enemy !== null) {
            v1 = new support.geom.Vector2d(tX + enemy.getMoveVector().getNormalizedVector().getX(), tY + enemy.getMoveVector().getNormalizedVector().getY(), enemy.getLastPosition().getX(), enemy.getLastPosition().getY());
        } else {
            v1 = new support.geom.Vector2d(tX, tY, tX - 3, tY - 3);
        }

        var v2 = new support.geom.Vector2d(bX, bY, bullet.getLastPosition().getX(), bullet.getLastPosition().getY());

        //
        //if (support.geom.collision.Collision.Vector2dVector2d(v1, v2)) {
        //    this._collisionTrue += 1;
        //} else {
        //    this._collisionFalse += 1;
        //
        //}
        //
        //if ((this._collisionTrue % 50 === 0 && this._collisionTrue !== 0) || ( this._collisionFalse % 50 === 0 && this._collisionFalse !== 0)) {
        //    console.log("CollitionTrue: " + this._collisionTrue);
        //    console.log("CollitionFalse: " + this._collisionFalse);
        //}

        //remove bullet after hit target
        if (support.geom.collision.Collision.Vector2dVector2d(v1, v2)) {
            arrayToRemove.push(bulletIndex);
            if (enemy !== null) {
                currentHp = enemy.getCurrentHp();
                currentHp -= bullet.getDamage();
                this._hudModel.setScore(this._hudModel.getScore() + 1);
                if (currentHp <= 0) {
                    currentHp = 0;
                    this._hudModel.setScore(this._hudModel.getScore() + 999);
                    this._hudModel.setCash(this._hudModel.getCash() + 100);
                }
                enemy.setCurrentHp(currentHp);
            }
        }
    }

    length = arrayToRemove.length;
    for (bulletIndex = length - 1; bulletIndex >= 0; bulletIndex--) {
        bulletToRemoveIndex = arrayToRemove[bulletIndex];
        this._bulletList.remove(bulletToRemoveIndex);
    }
};


/**
 * @method checkTargetsToHit
 * @param {Number} cx
 * @param {Number} cy
 * @param {Number} r
 * @param {Number} vx1
 * @param {Number} vy1
 * @param {Number} vx2
 * @param {Number} vy2
 */
app.managers.BulletManager.prototype.CircleVectorColision = function CircleVectorColision(cx, cy, r, vx1, vy1, vx2, vy2) {
    return true;
};