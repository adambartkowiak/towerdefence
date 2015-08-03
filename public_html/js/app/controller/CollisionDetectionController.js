/**
 * Created by adambartkowiak on 01/08/15.
 */


'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CollisionDetectionController
 * @constructor
 * @param {app.model.ListModel} listModel
 *
 */
app.controller.CollisionDetectionController = function CollisionDetectionController(listModel, collisionListModel) {

    /**
     * @property {app.model.ListModel} _list
     * @private
     */
    this._list = listModel;

    /**
     * @property {app.model.ListModel} _collisionList
     * @private
     */
    this._collisionList = collisionListModel;


};

Utils.inherits(app.controller.CollisionDetectionController, Object);

/**
 * @method update
 */
app.controller.CollisionDetectionController.prototype.update = function update() {

    var listLength = this._list.length();
    var elementIndex;
    var element;
    var availableStep;

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);


        //SPRAWDZANIE KOLIZJI ENTITY Z INNYMI ENTITY
        //CHODZENIE PO MAPIE, odbijanie sie od innych entity!


        //SPRAWDZANIE KOLIZJI CZY ENTITY DOTARL DO CELU
        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableStep) {
            continue;
        }


        //RODZAJ TYPU WYKRYWANIA KOLIZJI MIEDZY OBIEKTAMI
        //punkt
        var p1 = new support.geom.Point2d(element.getMoveList().getElement(0).getX(), element.getMoveList().getElement(0).getY());

        //okrag reprezentujacy element
        //bo tu jest szukana kolizja z punktem docelowym a nie z wrogiem !!!!
        var c1 = new support.geom.Circle(element.getX(), element.getY(), element.getRadius());

        //odcinek reprezentujacy ostatni ruch elementu
        //var v2 = new support.geom.Vector2d(element.getX(), element.getY(), element.getLastPosition().getX(), element.getLastPosition().getY());

        //wynik detekcji kolizji
        //var collision = support.geom.collision.Collision.Point2dCircle(c1, v2);

        var collision = support.geom.collision.Collision.Point2dCircle(p1, c1);


        /*@TODO: powinno tutaj zostac zgloszona kolizja - i inny modul powinien ja obsluzy
         na zasadzie raport collision Obiekt o ID takiem z Obiektem o ID takim...

         Inny modul powinien sprawdzic co to za cila i powinien wykonac logike kolizji..

         */

        //Jezeli nastapila kolizja nastepuje wykasowanie elementu
        if (collision) {
            //console.log("COLLISION: true");

            //chodzenie po X Y
            this._collisionList.addElement(new app.model.EntityTargetCollisionModel(element, element.getMoveList().getElement(0)));

            //chodzenie do obiektu


            //atakowanie do punktu x y


            //atakowanie obiektu

        }


    }

};


//
//
//
//
///**
// * @method checkTargetsToHit
// */
//app.managers.BulletManager.prototype.checkTargetsToHit = function checkTargetsToHit() {
//
//    var length = this._bulletList.length();
//    var bulletIndex;
//    var bullet;
//    var target, enemyGuid, enemy, currentHp;
//    //var targetBulletVector;
//
//    var arrayToRemove = []
//    var bulletToRemoveIndex = 0;
//
//    for (bulletIndex = 0; bulletIndex < length; bulletIndex++) {
//        bullet = this._bulletList.getBullet(bulletIndex);
//
//        target = bullet.getTarget();
//        enemyGuid = target.getEnemyGuid();
//        enemy = this._enemyList.getEnemyByGuid(enemyGuid);
//
//        if (enemy !== null) {
//            target.setX(enemy.getX());
//            target.setY(enemy.getY());
//        }
//
//        //okrag reprezentujacy przeciwnika
//        var c1 = new support.geom.Circle(target.getX(), target.getY(), 5);
//        //odcinek reprezentujacy ostatni ruch wektora
//        var v2 = new support.geom.Vector2d(bullet.getX(), bullet.getY(), bullet.getLastPosition().getX(), bullet.getLastPosition().getY());
//        //wynik detekcji kolizji
//        var collision = support.geom.collision.Collision.CircleVector2d(c1, v2);
//
//        //remove bullet after hit target
//        if (collision) {
//            arrayToRemove.push(bulletIndex);
//            if (enemy !== null) {
//                currentHp = enemy.getCurrentHp();
//                currentHp -= bullet.getDamage();
//                this._hudModel.setScore(this._hudModel.getScore() + 1);
//                if (currentHp <= 0) {
//                    currentHp = 0;
//                    this._hudModel.setScore(this._hudModel.getScore() + 999);
//                    this._hudModel.setCash(this._hudModel.getCash() + 100);
//                }
//                enemy.setCurrentHp(currentHp);
//            }
//        }
//    }
//
//    length = arrayToRemove.length;
//    for (bulletIndex = length - 1; bulletIndex >= 0; bulletIndex--) {
//        bulletToRemoveIndex = arrayToRemove[bulletIndex];
//        this._bulletList.remove(bulletToRemoveIndex);
//    }
//};