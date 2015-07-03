/**
 * Created by adambartkowiak on 15.04.2015.
 */

'use strict';

/**
 * @namespace
 * @type {app|*|{}}
 */
var app = app || {};
app.managers = app.managers || {};


/**
 * @imports
 */
var Utils = Utils || {};

/**
 * @constructor
 * @namespace app.managers
 * @param {app.objects.BulletList} bulletList
 * @param {app.objects.EnemyList} enemyList
 * 
 */
app.managers.BulletManager = function BulletManager(bulletList, enemyList) {

    /**
     * @property _bulletList
     * @type Number
     */
    this._bulletList = bulletList;

    /**
     * @property _enemyList
     * @type Number
     */
    this._enemyList = enemyList;

};

/**
 * @inheritance
 */
Utils.inherits(app.managers.BulletManager, Object);

/**
 * @methodName moveBullets
 * @param {Number} timeDelta 
 */
app.managers.BulletManager.prototype.moveBullets = function moveBullets(timeDelta) {
    
    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, tX, tY, dX, dY, target, enemyGuid, enemy;
    var moveVector;
    var normalizedVector;
    
    for (bulletIndex = 0; bulletIndex<length; bulletIndex++){
        bullet = this._bulletList.getBullet(bulletIndex);
        
        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemyGuid = target.getEnemyGuid();
        enemy = this._enemyList.getEnemyByGuid(enemyGuid);
        
        if (enemy !== null){
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
        
        //ustawienie obrotu strzaly na podstawie vektora znormalizowanego
        bullet.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX())*180/Math.PI+90);
        
        bullet.setX(bullet.getX() + normalizedVector.getX()*timeDelta/1000*bullet.getSpeed());
        bullet.setY(bullet.getY() + normalizedVector.getY()*timeDelta/1000*bullet.getSpeed());
    }
    
};

/**
 * @methodName 
 */
app.managers.BulletManager.prototype.checkTargetsToHit = function checkTargetsToHit(){
    
    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, tX, tY, dX, dY, target, enemyGuid, enemy, currentHp;
    var moveVector;
    
    var arrayToRemove = []
    var bulletToRemoveIndex = 0;
    
    for (bulletIndex = 0; bulletIndex<length; bulletIndex++){
        bullet = this._bulletList.getBullet(bulletIndex);
        
        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemyGuid = target.getEnemyGuid();
        enemy = this._enemyList.getEnemyByGuid(enemyGuid);
        
        if (enemy !== null){
            target.setX(enemy.getX());
            target.setY(enemy.getY());
        }
        
        tX = target.getX();
        tY = target.getY();
        
        //delta
        dX = tX - bX;
        dY = tY - bY;

        moveVector = new support.geom.SimpleVector2d(dX, dY);
        
        //remove bullet after hit target
        if (moveVector.getVectorLength() < 5){
            arrayToRemove.push(bulletIndex);
            if (enemy !== null){
                currentHp = enemy.getCurrentHp();
                currentHp -= 2;
                if (currentHp < 0){
                    currentHp = 0;
                }
                enemy.setCurrentHp(currentHp);
            }
        }
    }
    
    length = arrayToRemove.length;
    for (bulletIndex = length-1; bulletIndex>=0; bulletIndex--){
        bulletToRemoveIndex = arrayToRemove[bulletIndex];
        this._bulletList.remove(bulletToRemoveIndex);
    }
};


/**
 * @methodName saveBulletListToJsonText
 * @return {String} result
 */
app.managers.BulletManager.prototype.saveBulletListToJsonText = function saveBulletListToJsonText() {
    return JSON.stringify(this._bulletList.getBulletList());
};

/**
 * @methodName loadBulletListFromJsonText
 * @param {String} jsonText
 */
app.managers.BulletManager.prototype.loadBulletListFromJsonText = function loadBulletListFromJsonText(jsonText) {
    var myJson = JSON.parse(jsonText);
    var jsonBullet;
    
    this._bulletList.clear();
    
    for(var i=0; i<myJson.length; i++){
        jsonBullet = myJson[i];
        
        var newTarget = new app.objects.Target(jsonBullet._target._x, jsonBullet._target._y, jsonBullet._target._enemyGuid);
        var newBullet = new app.objects.Bullet(jsonBullet._x, jsonBullet._y, newTarget, jsonBullet._speed, jsonBullet._damage);
        newBullet.setAngle(jsonBullet._angle);
        
        this._bulletList.addBullet(newBullet);
    }
};