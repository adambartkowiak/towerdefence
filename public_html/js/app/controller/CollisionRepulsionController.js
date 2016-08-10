/**
 * Created by adambartkowiak on 14/04/16.
 */


'use strict';

var updateSpacialHashingCount = 0;

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CollisionRepulsionController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 * @param {app.controller.CollisionDetectionController} collisionDetectionController
 *
 */
app.controller.CollisionRepulsionController = function CollisionRepulsionController(entityListModel, collisionDetectionController) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

    /**
     * @property {app.controller.CollisionDetectionController} collisionDetectionController
     * @private
     */
    this._collisionDetectionController = collisionDetectionController;

    /**
     * @property {Array} _entitiesToUpdate
     * @private
     */
    this._entitiesToUpdate = [];

};

Utils.inherits(app.controller.CollisionRepulsionController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.CollisionRepulsionController.prototype.update = function update(timeDelta) {

    //console.log("Last Update Count:" + updateSpacialHashingCount);
    updateSpacialHashingCount = 0;
    //console.log("New Update:");

    var listLength = this._list.length();
    var elementIndex;
    var element;

    var potentialCollisionList;
    var potentialCollisionElement;
    var potentialCollisionIndex;
    var potentialCollisionLength;

    var collisionVector;

    //this.prepareObjectsGroups(mapModel);

    var c1 = new support.geom.Circle(0, 0, 0);
    var c2 = new support.geom.Circle(0, 0, 0);

    this.entitiesToUpdate = [];
    /*
     ROZPYCHANIE OBIEKTÓW JEZELI NA SIEBIE NACHODZA
     */
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);
        //availableStep = element.getMoveList() && element.getMoveList().length() > 0;


        //jezeli element nie zmienił pozycji to nie sprawdza on czy wypycha inny obiekt -
        //bo skoro nie zmienil pozycji to nie moze tego robic

        //Ale moze pojawic sie nowy obiket - ktory poruszy ten obiekt.. a pojawienie sie obiektu to poiwnna byc zmiana pozycji! :)

        //TO BY MOZNA ZROBIC UZYPIANIE OBIEKTOW ALE PO CZASIE!

        if (element.isSleeping()) {
            continue;
        }

        //jezeli element jest nieskonczenie ciezki - to nie sprawdzamy dla niego kolizji
        //wtedy inne elementy sprawdzaja czy go nie dotykaja i jak tak to odbijaja/odpychaja sie od niego
        //Z tego wynika ze obiekty nieskonczenie ciezkie nie koliduja ze soba
        if (element.getMass() === -1) {
            continue;
        }

        //jezeli entity jest na holdzie to nie porusza sie i nie moze byc poruszane - tak samo jak by miało masę -1
        if (element.getHoldPosition()) {
            continue;
        }

        c1.setX(element.getTemporaryX());
        c1.setY(element.getTemporaryY());
        c1.setRadius(element.getCollisionRadius());

        //Pociski nie rozpychaja innych obiektów!
        if (element.getMoveList() && element.getMoveList().length() > 0 && element.getMoveList().getElement(0).getTaskEnum() !== app.enum.FunctionEnum.ATTACK || element.getMoveList() && element.getMoveList().length() === 0) {

            potentialCollisionList = this.getCollisionArrayByEntityElement(element);
            potentialCollisionLength = potentialCollisionList.length;
            //console.log("LENGTH: before for " + potentialCollisionList.length);

            for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {
                //console.log("LENGTH: in for " + potentialCollisionList.length);

                potentialCollisionElement = potentialCollisionList[potentialCollisionIndex];


                //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                if (element === potentialCollisionElement) {
                    //console.log("potentialCollisionLength - end for");
                    continue;
                }

                if (potentialCollisionElement.getMoveList() && potentialCollisionElement.getMoveList().length() > 0 && potentialCollisionElement.getMoveList().getElement(0).getTaskEnum() === app.enum.FunctionEnum.ATTACK) {
                    //console.log("potentialCollisionLength - end for");
                    continue;
                }

                c2.setX(potentialCollisionElement.getTemporaryX());
                c2.setY(potentialCollisionElement.getTemporaryY());
                c2.setRadius(potentialCollisionElement.getCollisionRadius());

                var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                if (collision) {

                    //wektor miedzy srodkami
                    collisionVector = new support.geom.SimpleVector2d(element.getTemporaryX() - potentialCollisionElement.getTemporaryX(), element.getTemporaryY() - potentialCollisionElement.getTemporaryY());
                    var lengthVector = collisionVector.getVectorLength() - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius();

                    var vX = potentialCollisionElement.getTemporaryX();
                    var vY = potentialCollisionElement.getTemporaryY();


                    var maxMoveX = collisionVector.getNormalizedVector().getX() * lengthVector * 0.5;
                    var maxMoveY = collisionVector.getNormalizedVector().getY() * lengthVector * 0.5;

                    if (potentialCollisionElement.getMass() !== -1
                        && !potentialCollisionElement.getHoldPosition()) {

                        //potentialCollisionElement.setX(vX + maxMoveX);
                        //potentialCollisionElement.setY(vY + maxMoveY);

                        potentialCollisionElement.setTemporaryX(vX + maxMoveX);
                        potentialCollisionElement.setTemporaryY(vY + maxMoveY);

                        this._entitiesToUpdate[potentialCollisionElement.getId()] = potentialCollisionElement;
                    }

                    //element.setX(element.getX() - maxMoveX);
                    //element.setY(element.getY() - maxMoveY);

                    element.setTemporaryX(element.getTemporaryX() - maxMoveX);
                    element.setTemporaryY(element.getTemporaryY() - maxMoveY);

                    this._entitiesToUpdate[element.getId()] = element;

                }

            }
        }

    }

    //update modyfied entities
    this._updateEntitiesPosition(this._entitiesToUpdate);

};

/**
 * @method _updateEntitiesPosition
 * @param {Array} entitiesToUpdate
 */
app.controller.CollisionRepulsionController.prototype._updateEntitiesPosition = function _updateEntitiesPosition(entitiesToUpdate){
    var updateTempIndex,
        updateTempMax = entitiesToUpdate.length,
        entityToUpdate;

    for (updateTempIndex = 0; updateTempIndex<updateTempMax; updateTempIndex++){
        entityToUpdate = entitiesToUpdate[updateTempIndex];

        if (!!entityToUpdate){
            entityToUpdate.setX(entityToUpdate.getTemporaryX());
            entityToUpdate.setY(entityToUpdate.getTemporaryY());
        }
    }
};


/**
 * @method getCollisionArrayByEntityElement
 * @param {app.model.MapModel} mapModel
 */
app.controller.CollisionRepulsionController.prototype.getCollisionArrayByEntityElement = function getCollisionArrayByEntityElement(element) {
    return this._collisionDetectionController.getPotentialCollisionArrayForCircle(element.getX(), element.getY(), element.getCollisionRadius(), 0);
};