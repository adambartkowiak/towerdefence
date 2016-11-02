/**
 * Created by adambartkowiak on 25/09/16.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class UpdatePositionController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.UpdatePositionController = function UpdatePositionController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.UpdatePositionController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 * @param {Number} logicLoopNumber
 */
app.controller.UpdatePositionController.prototype.update = function update(timeDelta, logicLoopNumber) {

    var listLength = this._list.length(),
        elementIndex,
        element,
        currentMove,
        moveVector = new support.geom.SimpleVector2d(0, 0),
        normalizedMoveVector,
        normalizedX,
        normalizedY,
        maxMove;

    var overMaxMoveForThisUpdate = 0,
        maxMoveFromAll = 0;

    //Updatowanie pozycji elementów na podstawie tempPosition
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        currentMove = Math.max(Math.abs(element.getTemporaryX() - element.getX()), Math.abs(element.getTemporaryY() - element.getY()));
        maxMove = timeDelta * element.getGroundSpeed() / 1000;


        //wektor ruchu
        moveVector.setX(element.getTemporaryX() - element.getX());
        moveVector.setY(element.getTemporaryY() - element.getY());

        normalizedMoveVector = moveVector.getNormalizedVector();
        normalizedX = normalizedMoveVector.getX();
        normalizedY = normalizedMoveVector.getY();

        //ograniczenie dla dużych przemieszczeń
        if (currentMove > maxMove) {

            overMaxMoveForThisUpdate++;
            maxMoveFromAll = Math.max(currentMove, maxMoveFromAll);

            element.setTemporaryX(element.getX() + normalizedX * maxMove);
            element.setTemporaryY(element.getY() + normalizedY * maxMove);

        }

        //obrot Entity
        if (currentMove > timeDelta * 30 / 1000){
            // element.setAngle(Math.atan2(normalizedY, normalizedX) * 180 / Math.PI);
        }

        //wykonanie przesunięcia
        element.setX(element.getTemporaryX(), null, logicLoopNumber);
        element.setY(element.getTemporaryY(), null, logicLoopNumber);

    }

    if (overMaxMoveForThisUpdate > 0) {
        // console.log("overMaxMoveForThisUpdate: " + overMaxMoveForThisUpdate);
        // console.log("maxMoveFromAll: " + maxMoveFromAll);
    }

};