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
 */
app.managers.BulletManager = function BulletManager(bulletList, enemyList, hudModel) {

    /**
     * @property {app.objects.BulletList} _bulletList
     */
    this._bulletList = bulletList;

    /**
     * @property {app.objects.EnemyList} _enemyList
     */
    this._enemyList = enemyList;

    /**
     * @property {app.objects.HudModel}_hudModel
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
 * @methodName
 */
app.managers.BulletManager.prototype.checkTargetsToHit = function checkTargetsToHit() {

    var length = this._bulletList.length();
    var bulletIndex;
    var bullet;
    var bX, bY, tX, tY, dX, dY, target, enemyGuid, enemy, currentHp;
    var targetBulletVector;

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

        //delta (pozycja celu - pozycja pocisku)
        dX = tX - bX;
        dY = tY - bY;

        targetBulletVector = new support.geom.SimpleVector2d(dX, dY);


        this.CircleVectorColision(tX, tY, 5, bX, bY, bX - bullet._moveVector.getX(), bY - bullet._moveVector.getY());

        //napisac kolizje w zaleznosci od 


        //remove bullet after hit target
        if (targetBulletVector.getVectorLength() < 5 * worldModel.SIZEPROPORTION) {
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

app.managers.BulletManager.prototype.CircleVectorColision = function CircleVectorColision(cx, cy, r, vx1, vy1, vx2, vy2) {
    return true;
};


//kolizja wektora z okregiem zwiera kolizje 2 wektorow.


//W sumie przeciecie 2 wektorow trzeba sprawdzic zawsze kied


//1. kolizja 2 wektorow
//2. kolizja wektora z okregiem (trzeba wyznaczyc wektor prostopadly do wektora 2 i sprawdzic czy sie przecinaja, je
//jezeli sie nie przecinaja to sprawdzic czy sredk kola jest w odleglosci od mniejszej niz promien w stosunku do koncow wektora)
//3.         


//        //sprawdzenie czy 2 wektory sie przecianja lub czy wktor przecina okrag
//        
//        //wektor ruchu przeciwnika, ale nie musi byc bo moze to byc cel w miejscu 
//        //to wtedy np zrobic ze jest okregiem o promieniu 5 :)
//        
//        //wektor ruchu pocisku
//        
//        //sprawdzenie przeciecia wektorow lub czy wektor przecina okrag
//        
//        
//        
//        
//        //ruch gracza
//        //o ile gracz sie poruszy
//        var pMoveVx = Math.cos(this._angle);
//        var pMoveVy = - Math.sin(this._angle);
//        
//        //pozycja targetu
//        target.getX();
//        target.getY();
//        
//        //poprzednia pozycja targetu
//        target.getX-()
//        
//
//        //pozycja gracza
//        //this._getX();
//        //this._getY();
//
//
//        //pozcyja pocisku
//        
//        //poprzednia pozycja pocisku
//
//
//        //sciana
//        //punkt sciany A - poczatek odcinka sciany
//        var wV1x = wall.getWallPoint(wallNo-1).getX();
//        var wV1y = wall.getWallPoint(wallNo-1).getY();
//
//        //punkt sciany B - koniec odcinka sciany
//        var wV2x = wall.getWallPoint(wallNo).getX();
//        var wV2y = wall.getWallPoint(wallNo).getY();
//
//
//
//
//
//
//        //Sciana
//        //Wyznaczenie prostej Ax + By + C = 0 dla gracza
//        var a = pMoveVy;
//        var b = - pMoveVx;
//        var c = - a * this.getX() - b * this.getY();
//
//        //odleglosci punktu poczatkowego i koncowego
//        var k1 = k1_1 = a * wV1x + b * wV1y + c;
//        var k2 = k1_2 = a * wV2x + b * wV2y + c;
//
//        //kiedy punkty koncowe sa po tej samej stronie
//        //wektory sie nie przecianja
//        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
//            continue;
//        } 
//
//
//
//
//        //Wyznaczenie prostej dla sciany
//        a = wV2y - wV1y;
//        b = -(wV2x - wV1x);
//        c = - a * wV1x - b * wV1y;
//
//        //odleglosci punktu poczatkowego i koncowego
//        k1 = k2_1 = a * this.getX() + b * this.getY() + c;
//        k2 = k2_2 = a * (this.getX() + pMoveVx) + b * (this.getY() + pMoveVy) + c;
//
//        //kiedy punkty koncowe sa po tej samej stronie
//        //wektory sie nie przecianja
//        if ((k1 > 0 && k2 > 0) || (k1 < 0 && k2 < 0)){
//            continue;
//        }