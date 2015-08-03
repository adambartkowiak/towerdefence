/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class MoveController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.MoveController = function MoveController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.MoveController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.MoveController.prototype.update = function update(timeDelta) {

    var listLength = this._list.length();
    var elementIndex;
    var element;
    var moveVector;
    var availableStep;
    var targetEntityId;
    var targetEntity;
    var nextStepX;
    var nextStepY;
    var normalizedMoveVector;

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableStep) {
            continue;
        }

        //Ustawienie miejsca docelowego na podstawie pozycji entityId targetu
        targetEntityId = element.getMoveList().getElement(0).getEntityId();
        if (targetEntityId>0){
            targetEntity = this._list.getElementById(targetEntityId);
            nextStepX = element.getMoveList().getElement(0).setX(targetEntity.getX());
            nextStepY = element.getMoveList().getElement(0).setY(targetEntity.getY());
        }

        nextStepX = element.getMoveList().getElement(0).getX();
        nextStepY = element.getMoveList().getElement(0).getY();

        moveVector = new support.geom.SimpleVector2d(nextStepX - element.getX(), nextStepY - element.getY());

        normalizedMoveVector = moveVector.getNormalizedVector();
        element.setAngle(Math.atan2(normalizedMoveVector.getY(), normalizedMoveVector.getX()) * 180 / Math.PI);

        element.setX(element.getX() + normalizedMoveVector.getX() * timeDelta / 1000 * element.getGroundSpeed());
        element.setY(element.getY() + normalizedMoveVector.getY() * timeDelta / 1000 * element.getGroundSpeed());

    }

};





//
///**
// * @method moveEnemy
// * @param {Number} timeDelta
// */
//
//var enemyLength = this._enemyList.length();
//app.managers.EnemyManager.prototype.moveEnemy = function moveEnemy(timeDelta) {
//    var checkpointLength = this._checkpointList.length();
//    var enemyIndex;
//    var checkpointIndex;
//    var enemy, enemyMoveVector;
//    var checkpoint, checkpointMoveVector;
//    var enemyX, enemyY;
//    var checkpointX, checkpointY;
//    var dX, dY, dVector;
//
//    for (enemyIndex = 0; enemyIndex < enemyLength; enemyIndex++) {
//        enemy = this._enemyList.getEnemy(enemyIndex);
//
//        enemyX = enemy.getX();
//        enemyY = enemy.getY();
//
//        for (checkpointIndex = 0; checkpointIndex < checkpointLength; checkpointIndex++) {
//            checkpoint = this._checkpointList.getCheckpoint(checkpointIndex);
//
//            checkpointX = checkpoint.getX();
//            checkpointY = checkpoint.getY();
//
//            dX = enemyX - checkpointX;
//            dY = enemyY - checkpointY;
//
//            dVector = new support.geom.SimpleVector2d(dX, dY);
//
//
//            if (dVector.getVectorLength() < 5 * worldModel.SIZEPROPORTION) {
//                //zmien kierunek
//                checkpointMoveVector = checkpoint.getMoveVector();
//
//                enemy.getMoveVector().setX(checkpointMoveVector.getX());
//                enemy.getMoveVector().setY(checkpointMoveVector.getY());
//            }
//        }
//
//        enemyMoveVector = enemy.getMoveVector();
//
//        if (enemyMoveVector.getX() !== 0 || enemyMoveVector.getY() !== 0) {
//            var normalizedVector = enemyMoveVector.getNormalizedVector();
//            //wpisanie angle do wiezy
//            enemy.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX()) * 180 / Math.PI + 0);
//
//            enemy.setX(enemyX + normalizedVector.getX() * timeDelta / 1000 * enemy.getSpeed() * worldModel.SIZEPROPORTION);
//            enemy.setY(enemyY + normalizedVector.getY() * timeDelta / 1000 * enemy.getSpeed() * worldModel.SIZEPROPORTION);
//        } else {
//            enemy.setCurrentHp(0);
//        }
//    }
//};
//
//
///**
// * @method moveBullets
// * @param {Number} timeDelta
// */
//app.managers.BulletManager.prototype.moveBullets = function moveBullets(timeDelta) {
//
//    var length = this._bulletList.length();
//    var bulletIndex;
//    var bullet;
//    var bX, bY, tX, tY, dX, dY, target, enemyGuid, enemy;
//    var moveVector;
//    var normalizedVector;
//
//    for (bulletIndex = 0; bulletIndex < length; bulletIndex++) {
//        bullet = this._bulletList.getBullet(bulletIndex);
//
//        bX = bullet.getX();
//        bY = bullet.getY();
//        target = bullet.getTarget();
//        enemyGuid = target.getEnemyGuid();
//        enemy = this._enemyList.getEnemyByGuid(enemyGuid);
//
//        if (enemy !== null) {
//            target.setX(enemy.getX());
//            target.setY(enemy.getY());
//        }
//
//        tX = target.getX();
//        tY = target.getY();
//
//        //delta
//        dX = tX - bX;
//        dY = tY - bY;
//
//        moveVector = new support.geom.SimpleVector2d(dX, dY);
//        normalizedVector = moveVector.getNormalizedVector();
//
//        bullet._moveVector.setX(dX);
//        bullet._moveVector.setY(dY);
//
//        //ustawienie obrotu strzaly na podstawie vektora znormalizowanego
//        bullet.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX()) * 180 / Math.PI + 90);
//
//        bullet.setX(bullet.getX() + normalizedVector.getX() * timeDelta / 1000 * bullet.getSpeed() * worldModel.SIZEPROPORTION);
//        bullet.setY(bullet.getY() + normalizedVector.getY() * timeDelta / 1000 * bullet.getSpeed() * worldModel.SIZEPROPORTION);
//    }
//
//};