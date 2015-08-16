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
 *
 */
app.controller.SelectTargetController = function SelectTargetController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.SelectTargetController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.SelectTargetController.prototype.update = function update(timeDelta) {

    var listLength = this._list.length();
    var elementIndex;
    var element;
    var targetIndex;
    var targetListLength;
    var potentialTarget;
    var availableToBuild;
    var toBuild;
    var foundTarget = false;
    var distanceVector = new support.geom.Vector2d(0,0,0,0);
    var shotDistance = 0;
    var currentShotDistance = 0;
    var c1 = new support.geom.Circle(0, 0, 0);
    var p1 = new support.geom.Point2d(0, 0);

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableToBuild = element.getBuildList() && element.getBuildList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableToBuild) {
            continue;
        }

        toBuild = element.getBuildList().getElement(0);

        if (toBuild !== null) {

            if (toBuild.getMoveList() !== null && toBuild.getMoveList().length() > 0) {

                if (toBuild.getMoveList().getElement(0).getActionType() === app.model.ActionTypeModel.ATTACK){

                    //AttackRangeCircle
                    c1.setX(element.getX());
                    c1.setY(element.getY());
                    c1.setRadius(toBuild.getAttackRange());

                    foundTarget = false;
                    targetListLength = this._list.length();

                    shotDistance = Infinity;
                    currentShotDistance = Infinity;

                    for (targetIndex = 0; targetIndex < targetListLength; targetIndex++){
                        potentialTarget = this._list.getElement(targetIndex);

                        p1.setX(potentialTarget.getX());
                        p1.setY(potentialTarget.getY());

                        if(potentialTarget.getId() !== element.getId() &&
                            potentialTarget.getTargetable() &&
                            potentialTarget.getTeam() !== element.getTeam() &&
                            potentialTarget.getTeam() !== 0 &&
                            support.geom.collision.Collision.Point2dCircle(p1, c1)){

                            /*
                            Wybieranie celu, ktory jest najblizej
                             */
                            distanceVector.getStartPoint().setX(p1.getX())
                            distanceVector.getStartPoint().setY(p1.getY())
                            distanceVector.getEndPoint().setX(c1.getX())
                            distanceVector.getEndPoint().setY(c1.getY())
                            currentShotDistance = distanceVector.getVectorLength();

                            if (shotDistance > currentShotDistance){
                                toBuild.getMoveList().getElement(0).setEntityId(potentialTarget.getId());
                                foundTarget = true;
                                shotDistance = currentShotDistance;
                            }

                        }
                    }

                    if (!foundTarget){
                        toBuild.getMoveList().getElement(0).setEntityId(0);

                    }

                }

            }

        }

    }

};
