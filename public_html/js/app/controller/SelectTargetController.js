/**
 * Created by adambartkowiak on 06/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class SelectTargetController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 * @param {app.controller.CollisionDetectionController} collisionDetectionController
 *
 */
app.controller.SelectTargetController = function SelectTargetController(entityListModel, collisionDetectionController) {

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
};

Utils.inherits(app.controller.SelectTargetController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.SelectTargetController.prototype.update = function update(timeDelta) {

    //Tutaj by bardzo duzego busta by dalo podzielenie entity na teamy juz na poziomie kolizji.
    //Aby w ogole nie rozpatrywac entity z tego samego teamu...

    if (!FEATURE_TOGGLE.SELECT_TARGET){
        return;
    }

    var listLength = this._list.length(),
        elementIndex,
        element,
        targetIndex,
        targetListLength,
        potentialTarget,
        potentialTargetList,
        selectedTarget = 0,
        foundTarget = false,
        c1 = new support.geom.Circle(0, 0, 0),
        c2 = new support.geom.Circle(0, 0, 0),
        circleCircleCollisionResult = null,
        shortestDistanceToTarget = 0,
        currentDistanceToTarget = 0,
        targetEntity = null;

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        if (element.getSelectTargetRadius() === 0) {
            continue;
        }

        targetEntity = element.getTargetEntity();

        //Unselect target if has no hp;
        if (targetEntity !== null && targetEntity.getCurrentHp() <= 0) {
            element.setTargetEntity(null);
        }


        //search for target
        if (targetEntity === null) {

            //potencjalny target
            potentialTargetList = this._collisionDetectionController.getPotentialCollisionArrayForCircle(element.getX(), element.getY(), element.getSelectTargetRadius(), 0);

            foundTarget = false;
            targetListLength = potentialTargetList.length;

            shortestDistanceToTarget = Infinity;
            currentDistanceToTarget = Infinity;

            c1.setX(element.getX());
            c1.setY(element.getY());
            c1.setRadius(element.getCollisionRadius() + element.getSelectTargetRadius());

            for (targetIndex = 0; targetIndex < targetListLength; targetIndex++) {
                potentialTarget = potentialTargetList[targetIndex];

                if (potentialTarget.getTeam() === element.getTeam() ||
                    potentialTarget.getTeam() === 0 || !potentialTarget.getTargetable() ||
                    potentialTarget.getId() === element.getId()) {
                    continue;
                }

                c2.setX(potentialTarget.getX());
                c2.setY(potentialTarget.getY());
                c2.setRadius(potentialTarget.getCollisionRadius());

                circleCircleCollisionResult = support.geom.collision.Collision.CircleCircleFastWithDistanceSquer(c1, c2);
                currentDistanceToTarget = circleCircleCollisionResult.sd;

                /*
                 Wybieranie celu, ktory jest najblizej. Sprawdzane sa kwadraty odleglosci
                 */
                if (circleCircleCollisionResult.result && shortestDistanceToTarget > currentDistanceToTarget) {
                    shortestDistanceToTarget = currentDistanceToTarget;
                    selectedTarget = potentialTarget;
                    foundTarget = true;
                }

            }

            if (foundTarget) {
                element.setTargetEntity(selectedTarget);
                element.setTargetEntityId(selectedTarget.getId());
            }
        }


    }


};
