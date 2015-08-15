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

    var potentialCollisionElement;
    var potentialCollisionIndex;
    var potentialCollisionLength;

    var collisionVector;
    var collisionVector2;


    /*
    Wyznaczenie przesuniec
     */
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //PRZEPYCHANIE PRZECIWNIKOW KTORZY SIE NIE PORUSZAJA
        var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getCollisionRadius());
        var c2 = new support.geom.Circle(0, 0, 0);


        //ROZPYCHANIE OBIEKTOW JEZELI NACHODZA NA SIEBIE - w sumie to moze byc inny kontrolet
        if (true) {
            var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getCollisionRadius());
            var c2 = new support.geom.Circle(0, 0, 0);


            //Pociski nie omijaja celow tylko leca przez nie !
            if (element.getMoveList() === null || element.getMoveList().length() === 0 || element.getMoveList().length() > 0 && element.getMoveList().getElement(0).getActionType() !== app.model.ActionTypeModel.ATTACK) {

                potentialCollisionLength = this._list.length();
                for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {
                    potentialCollisionElement = this._list.getElement(potentialCollisionIndex);

                    //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                    if (element === potentialCollisionElement) {
                        continue;
                    }

                    //nie przesuwamy obiektu o nieskonczonej masie
                    if (potentialCollisionElement.getMass() === -1){
                        continue;
                    }


                    //omijanie pociskow tez nie ma sensu
                    if (potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() > 0 &&
                        potentialCollisionElement.getMoveList().getElement(0).getActionType() === app.model.ActionTypeModel.ATTACK) {

                        continue;
                    }


                    c2.setX(potentialCollisionElement.getX());
                    c2.setY(potentialCollisionElement.getY());
                    c2.setRadius(potentialCollisionElement.getCollisionRadius());

                    var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                    if (collision) {

                        //wektor miedzy srodkami
                        collisionVector = new support.geom.SimpleVector2d(element.getX() - potentialCollisionElement.getX(), element.getY() - potentialCollisionElement.getY());
                        var lengthVector = collisionVector.getVectorLength() - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius();

                        var vX = potentialCollisionElement.getX();
                        var vY = potentialCollisionElement.getY();


                        if (element.getMoveList() === null || element.getMoveList().length() === 0) {

                            if (potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() > 0 &&
                                potentialCollisionElement.getMoveList().getElement(0).getActionType() !== app.model.ActionTypeModel.ATTACK) {
                                continue;
                            }

                        }

                        potentialCollisionElement.setX(vX + collisionVector.getNormalizedVector().getX() * lengthVector/2);
                        potentialCollisionElement.setY(vY + collisionVector.getNormalizedVector().getY() * lengthVector/2);

                    }
                }
            }
        }
    }






    //OMIJANIE PRZECIWNIKOW NA HOLDZIE oraz w RUCHU

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableStep || element.getGroundSpeed() === 0) {
            continue;
        }

        //Ustawienie miejsca docelowego na podstawie pozycji entityId targetu
        targetEntityId = element.getMoveList().getElement(0).getEntityId();
        if (targetEntityId > 0) {
            targetEntity = this._list.getElementById(targetEntityId);
            if (targetEntity !== null) {
                nextStepX = element.getMoveList().getElement(0).setX(targetEntity.getX());
                nextStepY = element.getMoveList().getElement(0).setY(targetEntity.getY());
            }
        }

        //Ustalenie pozycji Docelowej X, Y
        nextStepX = element.getMoveList().getElement(0).getX();
        nextStepY = element.getMoveList().getElement(0).getY();

        //Wyznaczenie wektora do celu
        moveVector = new support.geom.SimpleVector2d(nextStepX - element.getX(), nextStepY - element.getY());

        //Wektor ruchu
        normalizedMoveVector = moveVector.getNormalizedVector();


        /*
         SPRAWDZANIE KOLIZJI POC !!!!
         A PODSTAWIE KOLIZJI ZOSTAJE ZMODYFIKOWANY WEKTOR NORMALNY RUCHU
         */

        if (true) {
            //Sprawdzenie czy nie wystepuje kolizja na drodze w promieniu wykrywania kolizji - petla ze wszystkimi entitys
            var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getMoveCollisionDetectionRadius());
            var c2 = new support.geom.Circle(0, 0, 0);


            var totalMoveVector = new support.geom.SimpleVector2d(0, 0);


            //Pociski nie omijaja celow tylko leca przez nie !
            if (element.getMoveList().getElement(0).getActionType() !== app.model.ActionTypeModel.ATTACK) {

                potentialCollisionLength = this._list.length();
                for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {
                    potentialCollisionElement = this._list.getElement(potentialCollisionIndex);

                    //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                    if (element === potentialCollisionElement) {
                        continue;
                    }

                    //omijanie pociskow tez nie ma sensu
                    if (potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() > 0 &&
                        potentialCollisionElement.getMoveList().getElement(0).getActionType() === app.model.ActionTypeModel.ATTACK) {
                        continue;
                    }

                    //nie ma ruchow
                    if (potentialCollisionElement.getMoveList() === null || potentialCollisionElement.getMoveList() !== null && potentialCollisionElement.getMoveList().length() === 0) {
                        continue;
                    }

                    c2.setX(potentialCollisionElement.getX());
                    c2.setY(potentialCollisionElement.getY());
                    c2.setRadius(potentialCollisionElement.getMoveCollisionDetectionRadius());

                    var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                    if (collision) {

                        //wektor miedzy srodkami
                        collisionVector = new support.geom.SimpleVector2d(element.getX() - potentialCollisionElement.getX(), element.getY() - potentialCollisionElement.getY());

                        //wektor do niego prostopadly
                        collisionVector2 = new support.geom.SimpleVector2d(-collisionVector.getY(), collisionVector.getX());

                        //jezenie obiekty oddalaja sie od siebie to sie nie wymijaja.
                        var vectorLength = collisionVector.getVectorLength();


                        /*
                         Liczenie wag wektora prostopadlego i normalnego
                         Jak sa daleko to waga jest 1, jak sie stykaja to waga jest 0
                         */
                        var wag = (vectorLength - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius()) / (element.getMoveCollisionDetectionRadius() - element.getCollisionRadius() + potentialCollisionElement.getMoveCollisionDetectionRadius() - potentialCollisionElement.getCollisionRadius());

                        //zamiana jak jest blisko to jest 1 jak daleko 0
                        wag = 1 - wag;

                        wag = Math.pow(wag, 6);




                        if (wag>1) {wag = 1}
                        if (wag<0) {wag = 0};


                        collisionVector.setX(element.getX() - potentialCollisionElement.getX() + normalizedMoveVector.getX());
                        collisionVector.setY(element.getY() - potentialCollisionElement.getY() + normalizedMoveVector.getY());

                        if (collisionVector.getVectorLength() >= vectorLength) {
                            break;
                        }

                        //Cosinus kata miedzy ektorem do celu, a kate przeciecia
                        var xA = normalizedMoveVector.getX();
                        var yA = normalizedMoveVector.getY();

                        var xB = collisionVector2.getNormalizedVector().getX();
                        var yB = collisionVector2.getNormalizedVector().getY();


                        /*
                         OBLICZANIE PO STREMU TEZ JEST POMOCNE
                         */
                        var cosA1 = xA * xB + yA * yB;
                        //jezeli cosA to zmieniamy wektor na wektor styczny!
                        if (!isNaN(cosA1)) {
                            var acos = Math.acos(cosA1) * 180 / Math.PI;

                            if (acos > 90) {
                                yB = -yB;
                                xB = -xB;
                            }
                        }


                        /*
                         OBLICZANIE PO NOWEMU
                         */

                        //NOWE LEPSZE OMIJANIE!
                        var newMoveVector = new support.geom.SimpleVector2d(0, 0);

                        //console.log(wag);

                        newMoveVector.setX(xA*(1 - wag) + xB * wag);
                        newMoveVector.setY(yA*(1 - wag) + yB * wag);

                        //newMoveVector.setX(xA + xB);
                        //newMoveVector.setY(yA + yB);

                        //roznica pomiedzy newMoveVector, a normalizedVector
                        var cosA2 = xA * newMoveVector.getNormalizedVector().getX() + yA * newMoveVector.getNormalizedVector().getY();
                        if (cosA2 > 1) {cosA2 = 1};
                        if (cosA2 > 0) {cosA2 = 0};


                        var acos2 = Math.acos(cosA2) * 180 / Math.PI;

                        var xC = newMoveVector.getX();
                        var yC = newMoveVector.getY();

                        xC = xC * acos2;
                        yC = yC * acos2;

                        //im wieksza roznica w kacie tym wieksza waga wektora


                        totalMoveVector.setX(totalMoveVector.getX() + xC);
                        totalMoveVector.setY(totalMoveVector.getY() + yC);

                    }
                }
            }

            //totalMoveVector.setX(totalMoveVector.getX() + xA);
            //totalMoveVector.setY(totalMoveVector.getY() + yA);

            if (totalMoveVector.getX() !== 0 || totalMoveVector.getY() !== 0){


                normalizedMoveVector.setX(totalMoveVector.getNormalizedVector().getX());
                normalizedMoveVector.setY(totalMoveVector.getNormalizedVector().getY());


                //console.log(normalizedMoveVector.getX() + " " + normalizedMoveVector.getY());
            }

        }




        //obrot postaci
        element.setAngle(Math.atan2(normalizedMoveVector.getY(), normalizedMoveVector.getX()) * 180 / Math.PI);


        //Przemieszczenie entitty o podany wektor
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