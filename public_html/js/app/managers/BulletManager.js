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
 * @param {app.objects.HudModel} hudModel
 * 
 */
app.managers.BulletManager = function BulletManager(bulletList, enemyList, hudModel) {

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

    /**
     * @property _hudModel
     * @type Number
     */
    this._hudModel = hudModel;

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
        
        bullet.setX(bullet.getX() + normalizedVector.getX()*timeDelta/1000*bullet.getSpeed()*worldModel.SIZEPROPORTION);
        bullet.setY(bullet.getY() + normalizedVector.getY()*timeDelta/1000*bullet.getSpeed()*worldModel.SIZEPROPORTION);
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
        if (moveVector.getVectorLength() < 5*worldModel.SIZEPROPORTION){
            arrayToRemove.push(bulletIndex);
            if (enemy !== null){
                currentHp = enemy.getCurrentHp();
                currentHp -= bullet.getDamage();
                this._hudModel.setScore(this._hudModel.getScore()+1);
                if (currentHp <= 0){
                    currentHp = 0;
                    this._hudModel.setScore(this._hudModel.getScore()+999);
                    this._hudModel.setCash(this._hudModel.getCash()+100);
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