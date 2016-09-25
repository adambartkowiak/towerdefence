/**
 * Created by adambartkowiak on 01/08/15.
 */


'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class WaypointCollisionDetectionController
 * @constructor
 * @param {app.model.ListModel} listModel
 *
 */
app.controller.WaypointCollisionDetectionController = function WaypointCollisionDetectionController(listModel, collisionListModel) {

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

Utils.inherits(app.controller.WaypointCollisionDetectionController, Object);

/**
 * @method update
 */
app.controller.WaypointCollisionDetectionController.prototype.update = function update() {

    // return;

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


        /*
         KOLIZJA PROSTA: OKRAG - PUNKT
         */
        //punkt
        var collisionType2_p1 = new support.geom.Point2d(element.getMoveList().getElement(0).getX(), element.getMoveList().getElement(0).getY());

        //okrag
        var collisionType2_c1 = new support.geom.Circle(element.getX(), element.getY(), element.getRadius());

        //kolizja: punkt-okrag
        var collisionType2 = support.geom.collision.Collision.Point2dCircle(collisionType2_p1, collisionType2_c1);


        /*
         KOLIZJA PROSTA: OKRAG - OKRAG
         */

        var targetEntity = null;

        if ( element.getMoveList().getElement(0).getEntityId() > 0){
            targetEntity = this._list.getElementById(element.getMoveList().getElement(0).getEntityId());
        }


        var collisionType3 = false;

        if (targetEntity !== null){
            //okrag
            var collisionType3_c1 = new support.geom.Circle(targetEntity.getX(), targetEntity.getY(), targetEntity.getRadius());

            //okrag
            var collisionType3_c2 = new support.geom.Circle(element.getX(), element.getY(), element.getRadius());

            //kolizja: okrag-okrag
            collisionType3 = support.geom.collision.Collision.CircleCircle(collisionType3_c1, collisionType3_c2);
        }



        /*
        KOLIZJA ZLOZONA
         */

        //Target - Circle
        var targetCurrentPosition = element.getMoveList().getElement(0);
        var collitionType1_c1 = new support.geom.Circle(targetCurrentPosition.getX(), targetCurrentPosition.getY(), targetCurrentPosition.getRadius());

        //Element - Last Move
        var collitionType1_v1 = new support.geom.Vector2d(element.getX(), element.getY(), element.getLastPosition().getX(), element.getLastPosition().getY());

        //Collision: Circle-Vector
        var collisionType1 = false;

        if (!collisionType2){
            collisionType1 = support.geom.collision.Collision.CircleVector2d(collitionType1_c1, collitionType1_v1);
        }

        var collision = collisionType1 || collisionType2 || collisionType3;

        /*@TODO: powinno tutaj zostac zgloszona kolizja - i inny modul powinien ja obsluzy
         na zasadzie raport collision Obiekt o ID takiem z Obiektem o ID takim...

         Inny modul powinien sprawdzic co to za cila i powinien wykonac logike kolizji..

         */

        //Jezeli nastapila kolizja nastepuje wykasowanie elementu
        if (collision) {
            //console.log("COLLISION: true");

            //chodzenie po X Y
            this._collisionList.addElement(new app.model.TaskForEntityModel(element, element.getMoveList().getElement(0)));

            //chodzenie do obiektu


            //atakowanie do punktu x y


            //atakowanie obiektu

        }


    }

};