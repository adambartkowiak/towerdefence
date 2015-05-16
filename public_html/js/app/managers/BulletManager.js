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
 */
app.managers.BulletManager.prototype.moveBullets = function moveBullets() {
    
    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, eX, eY, dX, dY, target, enemy;
    var moveVector;
    var normalizedVector;
    
    for (bulletIndex = 0; bulletIndex<length; bulletIndex++){
        bullet = this._bulletList.getBullet(bulletIndex);
        
        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemy = target.getEnemy();
        eX = enemy.getX();
        eY = enemy.getY();
        
        //delta
        dX = eX - bX;
        dY = eY - bY;

        moveVector = new support.geom.SimpleVector2d(dX, dY);
        normalizedVector = moveVector.getNormalizedVector();
        
        //ustawienie obrotu strzaly na podstawie vektora znormalizowanego
        bullet.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX())*180/Math.PI+90);
        
        bullet.setX(bullet.getX() + normalizedVector.getX()*5);
        bullet.setY(bullet.getY() + normalizedVector.getY()*5);
    }
    
};

/**
 * @methodName 
 */
app.managers.BulletManager.prototype.checkTargetsToHit = function checkTargetsToHit(){
    
    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, eX, eY, dX, dY, target, enemy, currentHp;
    var moveVector;
    
    var arrayToRemove = []
    var bulletToRemoveIndex = 0;
    
    for (bulletIndex = 0; bulletIndex<length; bulletIndex++){
        bullet = this._bulletList.getBullet(bulletIndex);
        
        bX = bullet.getX();
        bY = bullet.getY();
        target = bullet.getTarget();
        enemy = target.getEnemy();
        eX = enemy.getX();
        eY = enemy.getY();
        
        //delta
        dX = eX - bX;
        dY = eY - bY;

        moveVector = new support.geom.SimpleVector2d(dX, dY);
        
        //remove bullet after hit target
        if (moveVector.getVectorLength() < 5){
            arrayToRemove.push(bulletIndex);
            currentHp = enemy.getCurrentHp();
            currentHp -= 2;
            if (currentHp < 0){
                currentHp = 0;
            }
            enemy.setCurrentHp(currentHp);
        }
    }
    
    length = arrayToRemove.length;
    for (bulletIndex = length-1; bulletIndex>=0; bulletIndex--){
        bulletToRemoveIndex = arrayToRemove[bulletIndex];
        this._bulletList.remove(bulletToRemoveIndex);
    }
};