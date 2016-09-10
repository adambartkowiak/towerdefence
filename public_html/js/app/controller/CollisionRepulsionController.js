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

    this._handleCollisionVector = new support.geom.SimpleVector2d(0, 0);

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

    this._entitiesToUpdate = [];
    // this._entitiesToUpdate.length = 0;

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

            for (potentialCollisionIndex = 0; potentialCollisionIndex < potentialCollisionLength; potentialCollisionIndex++) {

                potentialCollisionElement = potentialCollisionList[potentialCollisionIndex];

                //samego ze soba nie sprawdzam kolizji bo to bez sensu :)
                if (element === potentialCollisionElement) {
                    continue;
                }

                if (potentialCollisionElement.getMoveList().getElement(0) !== undefined && potentialCollisionElement.getMoveList().getElement(0).getTaskEnum() === app.enum.FunctionEnum.ATTACK) {
                    continue;
                }

                c2.setX(potentialCollisionElement.getTemporaryX());
                c2.setY(potentialCollisionElement.getTemporaryY());
                c2.setRadius(potentialCollisionElement.getCollisionRadius());

                var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

                if (collision) {
                    this._handleReactionOnCollision(this._entitiesToUpdate, element, potentialCollisionElement);
                }

            }
        }

    }

    //update modyfied entities
    this._updateEntitiesPosition(this._entitiesToUpdate);

};


/**
 * @method _handleReactionOnCollision
 * @param {Array} entitiesToUpdate
 */
app.controller.CollisionRepulsionController.prototype._handleReactionOnCollision = function _handleReactionOnCollision(entitiesToUpdate, element, potentialCollisionElement){

    var normalizedCollisionVector,
        lengthVector,
        vX,
        vY,
        maxMoveX,
        maxMoveY;

    //wektor miedzy srodkami
    this._handleCollisionVector.setX(element.getTemporaryX() - potentialCollisionElement.getTemporaryX());
    this._handleCollisionVector.setY(element.getTemporaryY() - potentialCollisionElement.getTemporaryY());

    lengthVector = this._handleCollisionVector.getVectorLength() - element.getCollisionRadius() - potentialCollisionElement.getCollisionRadius();

    vX = potentialCollisionElement.getTemporaryX();
    vY = potentialCollisionElement.getTemporaryY();

    normalizedCollisionVector = this._handleCollisionVector.getNormalizedVector();

    maxMoveX = normalizedCollisionVector.getX() * lengthVector * 0.5;
    maxMoveY = normalizedCollisionVector.getY() * lengthVector * 0.5;

    if (potentialCollisionElement.getMass() !== -1
        && potentialCollisionElement.getHoldPosition() !== true) {

        potentialCollisionElement.setTemporaryX(vX + maxMoveX);
        potentialCollisionElement.setTemporaryY(vY + maxMoveY);

        entitiesToUpdate[potentialCollisionElement.getId()] = potentialCollisionElement;
    }

    element.setTemporaryX(element.getTemporaryX() - maxMoveX);
    element.setTemporaryY(element.getTemporaryY() - maxMoveY);

    entitiesToUpdate[element.getId()] = element;
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