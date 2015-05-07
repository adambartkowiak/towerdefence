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
 * @param {app.objects.TowerList} towerList
 * @param {app.objects.EnemyList} enemyList
 * @param {app.objects.EnemyList} bulletList
 * 
 */
app.managers.TowerManager = function TowerManager(towerList, enemyList, bulletList) {

    /**
     * @property _bulletList
     * @type Number
     */
    this._towerList = towerList;

    /**
     * @property _enemyList
     * @type Number
     */
    this._enemyList = enemyList;
    
    /**
     * @property _bulletList
     * @type Number
     */
    this._bulletList = bulletList;

};

/**
 * @inheritance
 */
Utils.inherits(app.managers.TowerManager, Object);

/**
 * @methodName tryShotToEnemy
 */
app.managers.TowerManager.prototype.tryShotToEnemy = function tryShotToEnemy() {
    
    var towerLength = this._towerList.length();
    var enemyLength = this._enemyList.length();
    var towerIndex;
    var enemyIndex;
    var tower;
    var enemy;
    var tX, tY, eX, eY, dX, dY, target;
    var moveVector, moveVectorLength;
    
    for (towerIndex = 0; towerIndex<towerLength; towerIndex++){
        
        var tower = this._towerList.getTower(towerIndex);
        
        for (enemyIndex = 0; enemyIndex<enemyLength; enemyIndex++){
                
            if(tower.getCooldown() === 0){
                var enemy = this._enemyList.getEnemy(enemyIndex);
                var target = new app.objects.Target(0, 0, enemy);

                tX = tower.getX();
                tY = tower.getY();
                eX = enemy.getX();
                eY = enemy.getY();

                dX = eX - tX;
                dY = eY - tY;

                moveVector = new support.geom.SimpleVector2d(dX, dY);
                moveVectorLength = moveVector.getVectorLength();

                if (moveVectorLength < 90){
                    var bullet = new app.objects.Bullet(tower.getX(), tower.getY(), target, 0, 0);
                    this._bulletList.addBullet(bullet);
                    tower.setCooldown(500);
                }
            }
        }
    }    
    
};

/**
 * @methodName cooldownTimer
 * @@param {Number} delta
 */
app.managers.TowerManager.prototype.cooldownTimer = function cooldownTimer(delta) {
    
    var length = this._towerList.length();
    var towerIndex;
    var tower;
    var cooldownValue;
    
    for (towerIndex = 0; towerIndex<length; towerIndex++){

        var tower = this._towerList.getTower(towerIndex);
        
        cooldownValue = tower.getCooldown();
        cooldownValue -= delta;
        
        if(cooldownValue < 0){
            cooldownValue = 0;
        }
        
        tower.setCooldown(cooldownValue);
    }
};