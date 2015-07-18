/**
 * Created by adambartkowiak on 23.04.2015.
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
 * @param {app.objects.EnemyList} enemyList
 * @param {app.objects.CheckpointList} checkpointList
 *
 */
app.managers.EnemyManager = function EnemyManager(enemyList, checkpointList) {

    /**
     * @property {app.objects.EnemyList} _enemyList
     */
    this._enemyList = enemyList;

    /**
     * @property {app.objects.CheckpointList} _checkpointList
     */
    this._checkpointList = checkpointList;

};

/**
 * @inheritance
 */
Utils.inherits(app.managers.EnemyManager, Object);

/**
 * @methodName moveEnemy
 * @param {Number} timeDelta
 */
app.managers.EnemyManager.prototype.moveEnemy = function moveEnemy(timeDelta) {

    var enemyLength = this._enemyList.length();
    var checkpointLength = this._checkpointList.length();
    var enemyIndex;
    var checkpointIndex;
    var enemy, enemyMoveVector;
    var checkpoint, checkpointMoveVector;
    var enemyX, enemyY;
    var checkpointX, checkpointY;
    var dX, dY, dVector;

    for (enemyIndex = 0; enemyIndex < enemyLength; enemyIndex++) {
        enemy = this._enemyList.getEnemy(enemyIndex);

        enemyX = enemy.getX();
        enemyY = enemy.getY();

        for (checkpointIndex = 0; checkpointIndex < checkpointLength; checkpointIndex++) {
            checkpoint = this._checkpointList.getCheckpoint(checkpointIndex);

            checkpointX = checkpoint.getX();
            checkpointY = checkpoint.getY();

            dX = enemyX - checkpointX;
            dY = enemyY - checkpointY;

            dVector = new support.geom.SimpleVector2d(dX, dY);


            if (dVector.getVectorLength() < 5 * worldModel.SIZEPROPORTION) {
                //zmien kierunek
                checkpointMoveVector = checkpoint.getMoveVector();

                enemy.getMoveVector().setX(checkpointMoveVector.getX());
                enemy.getMoveVector().setY(checkpointMoveVector.getY());
            }
        }

        enemyMoveVector = enemy.getMoveVector();

        if (enemyMoveVector.getX() !== 0 || enemyMoveVector.getY() !== 0) {
            var normalizedVector = enemyMoveVector.getNormalizedVector();
            //wpisanie angle do wiezy
            enemy.setAngle(Math.atan2(normalizedVector.getY(), normalizedVector.getX()) * 180 / Math.PI + 0);

            enemy.setX(enemyX + normalizedVector.getX() * timeDelta / 1000 * enemy.getSpeed() * worldModel.SIZEPROPORTION);
            enemy.setY(enemyY + normalizedVector.getY() * timeDelta / 1000 * enemy.getSpeed() * worldModel.SIZEPROPORTION);
        } else {
            enemy.setCurrentHp(0);
        }
    }
};

/**
 * @methodName removeDeadEnemy
 */
app.managers.EnemyManager.prototype.removeDeadEnemy = function removeDeadEnemy() {

    var length = this._enemyList.length();
    var enemyIndex;
    var enemy;
    var x, y;

    for (enemyIndex = length - 1; enemyIndex >= 0; enemyIndex--) {
        enemy = this._enemyList.getEnemy(enemyIndex);

        if (enemy.getCurrentHp() === 0) {
            this._enemyList.remove(enemyIndex);
        }
    }
};