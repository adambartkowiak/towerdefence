/**
 * Created by adambartkowiak on 18/08/16.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class AttackController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 * @param {app.controller.CollisionDetectionController} collisionDetectionController
 *
 */
app.controller.AttackController = function AttackController(entityListModel, collisionDetectionController) {

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

Utils.inherits(app.controller.AttackController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.AttackController.prototype.update = function update(timeDelta) {

    //Tutaj by bardzo duzego busta by dalo podzielenie entity na teamy juz na poziomie kolizji.
    //Aby w ogole nie rozpatrywac entity z tego samego teamu...

    var listLength = this._list.length(),
        elementIndex,
        element,
        c1 = new support.geom.Circle(0, 0, 0),
        c2 = new support.geom.Circle(0, 0, 0),
        entityAttackModel = null,
        entityAttackModelIndex = 0,
        entityAttackListModel = null,
        entityAttackListModelLength = 0,
        targetEntity = null,
        bulletEntity = null,
        isTargetInAttackRange = false,
        circleCircleCollisionResult = 0,
        squareDistanceToTarget = 0,
        squareMinDistance = 0,
        squareMaxDistance = 0;


    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);
        element.setAttackCooldown(element.getAttackCooldown() - timeDelta);

        if (element.getTargetEntity() === null || element.getAttackCooldown() > 0) {
            continue;
        } else {

            entityAttackListModel = element.getCurrentEntityStateModel().getEntityAttackListModel();
            entityAttackListModelLength = entityAttackListModel.length();

            targetEntity = element.getTargetEntity();

            c1.setX(element.getX());
            c1.setY(element.getY());
            c1.setRadius(element.getCollisionRadius() + element.getSelectTargetRadius());

            c2.setX(targetEntity.getX());
            c2.setY(targetEntity.getY());
            c2.setRadius(targetEntity.getCollisionRadius());

            circleCircleCollisionResult = support.geom.collision.Collision.CircleCircleFastWithDistanceSquer(c1, c2)
            squareDistanceToTarget = circleCircleCollisionResult.sd;


            //check entity attacks
            for (entityAttackModelIndex = 0; entityAttackModelIndex < entityAttackListModelLength; entityAttackModelIndex++) {

                entityAttackModel = entityAttackListModel.getElement(entityAttackModelIndex);

                //min/max range
                if (entityAttackModel.getMinRange() > 0) {
                    squareMinDistance = Math.pow(element.getCollisionRadius() + targetEntity.getCollisionRadius() + entityAttackModel.getMinRange(), 2);
                } else {
                    squareMinDistance = 0;
                }

                squareMaxDistance = Math.pow(element.getCollisionRadius() + targetEntity.getCollisionRadius() + entityAttackModel.getMaxRange(), 2);


                //isTargetInAttackRange
                if (squareDistanceToTarget >= squareMinDistance &&
                    squareDistanceToTarget <= squareMaxDistance) {
                    isTargetInAttackRange = true;
                } else {
                    isTargetInAttackRange = false;
                }

                //range
                if (isTargetInAttackRange) {

                    if (entityAttackModel.getCreateBullet()) {
                        bulletEntity = entityAttackModel.getBulletEntityModel().clone();
                        bulletEntity.setStartValueX(element.getX());
                        bulletEntity.setStartValueY(element.getY());
                        bulletEntity.setCurrentHp(1);
                        bulletEntity.getCurrentEntityStateModel().setRotateGraphicOnMove(true);

                        bulletEntity.setTask(new app.model.TaskModel(0, 0, 25, targetEntity.getId(), app.enum.FunctionEnum.ATTACK));

                        bulletEntity.setMoveList(new app.model.ListModel());
                        bulletEntity.getMoveList().addElement(new app.model.TaskModel(0, 0, 25, targetEntity.getId(), app.enum.FunctionEnum.ATTACK));

                        bulletEntity.setTargetEntity(targetEntity);

                        this._list.addElement(bulletEntity);

                    } else {
                        targetEntity.setCurrentHp(targetEntity.getCurrentHp() - entityAttackModel.getDamage());

                        if (element.getCurrentEntityStateModel().getRemoveAfterHit()) {
                            element.setToRemove(true);
                        }

                    }

                    element.setAttackCooldown(entityAttackModel.getRate());

                    break;
                } else {
                    
                }

            }


        }


    }


};
