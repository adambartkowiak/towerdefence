/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CollisionReactionController
 * @constructor
 * @param {app.model.ListModel} listModel
 *
 */
app.controller.CollisionReactionController = function CollisionReactionController(listModel, collisionListModel) {

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

Utils.inherits(app.controller.CollisionReactionController, Object);

/**
 * @method update
 */
app.controller.CollisionReactionController.prototype.update = function update() {

    var listLength = this._collisionList.length();
    var collisionIndex;
    var collision;
    var collisionType;
    var targetEntity;

    for (collisionIndex = 0; collisionIndex < listLength; collisionIndex++) {

        collision = this._collisionList.getElement(collisionIndex);
        collisionType = collision.getTargetModel().getActionType();

        if (collisionType === app.model.ActionTypeModel.MOVE) {

            //kasuje cel, z listy punktow do odwiedzenia
            collision.getEntityModel().getMoveList().removeElement(0);

        } else if (collisionType === app.model.ActionTypeModel.ATTACK) {

            //Kasuje entity, ktory trafil w cel ( czyli pocisk :) )
            this._list.removeElementById(collision.getEntityModel().getId());

            //Zabiera zycie entity ktore zostalo trafione
            targetEntity = this._list.getElementById(collision.getTargetModel().getEntityId());

            if (targetEntity !== null) {
                targetEntity.setCurrentHp(targetEntity.getCurrentHp() - collision.getEntityModel().getAttackDamage());
                if (targetEntity.getCurrentHp() <= 0){
                    this._list.removeElementById(collision.getTargetModel().getEntityId());
                }
            }
        }

    }

};