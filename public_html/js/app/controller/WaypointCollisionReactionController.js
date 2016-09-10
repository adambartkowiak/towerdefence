/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class WaypointCollisionReactionController
 * @constructor
 * @param {app.model.ListModel} listModel
 *
 */
app.controller.WaypointCollisionReactionController = function WaypointCollisionReactionController(worldModel, listModel, collisionListModel) {

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

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

Utils.inherits(app.controller.WaypointCollisionReactionController, Object);

/**
 * @method update
 */
app.controller.WaypointCollisionReactionController.prototype.update = function update() {

    var listLength = this._collisionList.length();
    var collisionIndex;
    var collision;
    var collisionType;
    var targetEntity;

    for (collisionIndex = 0; collisionIndex < listLength; collisionIndex++) {

        collision = this._collisionList.getElement(collisionIndex);
        collisionType = collision.getTaskModel().getTaskEnum();

        if (collisionType === app.enum.FunctionEnum.MOVE) {

            if (collision.getEntityModel().getMoveList().getElement(0).getEntityId() > 0) {

            } else {
                //kasuje cel, z listy punktow do odwiedzenia
                collision.getEntityModel().getMoveList().removeElementByIndex(0);
            }

        } else if (collisionType === app.enum.FunctionEnum.MOVE_ATTACK) {

            //Zabiera zycie entity ktore zostalo trafione
            targetEntity = this._list.getElementById(collision.getTaskModel().getEntityId());

            if (collision.getEntityModel().getMoveList().getElement(0).getEntityId() > 0) {
                console.log("ATTACKING ENTITY: " + collision.getEntityModel().getMoveList().getElement(0).getEntityId());

                if (targetEntity !== null) {
                    // targetEntity.getCurrentEntityStateModel().setCurrentHp(targetEntity.getCurrentHp() - collision.getEntityModel().getAttackDamage());
                    targetEntity.setCurrentHp(targetEntity.getCurrentHp() - 2);
                    if (targetEntity.getCurrentHp() <= 0) {
                        this._list.removeElementById(collision.getTaskModel().getEntityId());
                    }
                }
            } else {
                //kasuje cel, z listy punktow do odwiedzenia
                collision.getEntityModel().getMoveList().removeElementByIndex(0);
            }

        } else if (collisionType === app.enum.FunctionEnum.PATROL) {

            //nic nie robil bo patroluje dalej :)
            var elements = collision.getEntityModel().getMoveList().getElements();
            elements.push(elements[0]);
            elements.splice(0, 1);

        } else if (collisionType === app.enum.FunctionEnum.GO_GATHER) {

            console.log("collisionType === app.enum.FunctionEnum.GO_GATHER");

            //kasowanie czasu zbierania
            collision.getEntityModel().setGatherTime(0);

            //kasuje cel, z listy punktow do odwiedzenia
            collision.getEntityModel().getMoveList().clear();

            //przełącza typ wykonywanego taska z GO_GATHER na GATHER
            collision.getEntityModel().getMoveList().addElement(new app.model.TaskModel(0, 0, 5, -1, app.enum.FunctionEnum.GATHER));

        } else if (collisionType === app.enum.FunctionEnum.GATHER) {

            console.log("collisionType === app.enum.FunctionEnum.GATHER");


        } else if (collisionType === app.enum.FunctionEnum.RETURN_CARGO) {

            console.log("collisionType === app.enum.FunctionEnum.RETURN_CARGO");

            //add cargo to team resources
            var entityModel = collision.getEntityModel();
            var team = this._worldModel.getTeamModelArray()[entityModel.getTeam()];
            team.addResource(entityModel.getCargoName(), entityModel.getAmountOfCargo());

            //reset cargo
            entityModel.setCargoName("");
            entityModel.setAmountOfCargo(0);
            entityModel.setCurrentStateId("default");


            //return to resources
            if (entityModel.getTask().getTaskEnum() === app.enum.FunctionEnum.GO_GATHER) {

                entityModel.getMoveList().clear();


                var resourcesEntity = this._list.getElementById(entityModel.getTask().getEntityId());
                var newResourceEntity = null;

                //Ustaw taska na inne entity z resourcami
                if (resourcesEntity !== null) {
                    if (resourcesEntity.getCurrentAmountOfWood() === 0 && resourcesEntity.getMaxAmountOfWood() > 0) {
                        newResourceEntity = Helper.getNearestWoodResources(this._list, resourcesEntity.getX(), resourcesEntity.getY());
                    } else if (resourcesEntity.getCurrentAmountOfGold() === 0 && resourcesEntity.getMaxAmountOfGold() > 0) {
                        newResourceEntity = Helper.getNearestGoldResources(this._list, resourcesEntity.getX(), resourcesEntity.getY());
                    }

                    if (newResourceEntity !== null) {
                        entityModel.getTask().setEntityId(newResourceEntity.getId());
                    }

                }

                entityModel.getMoveList().addElement(new app.model.TaskModel(0, 0, 5, entityModel.getTask().getEntityId(), app.enum.FunctionEnum.GO_GATHER));


            }

        } else if (collisionType === app.enum.FunctionEnum.BUILD_BUILDING) {

            console.log("collisionType === app.model.ActionTypeModel.BUILD_BASE");

            if (collision.getEntityModel().getTask().getTaskEnum() === app.enum.FunctionEnum.BUILD_BUILDING) {

                var entityModelToBuild = collision.getEntityModel().getTask().getTaskEntityModel().clone();

                console.log(entityModelToBuild);

                entityModelToBuild.setX(collision.getEntityModel().getX(), null);
                entityModelToBuild.setY(collision.getEntityModel().getY(), null);

                //Add building to map
                this._list.addElement(entityModelToBuild);

                collision.getEntityModel().getMoveList().clear();
            }

        } else if (collisionType === app.enum.FunctionEnum.ATTACK) {


            console.log(collision.getEntityModel());

            // //Kasuje entity, ktory trafil w cel ( czyli pocisk :) )
            // this._list.removeElementById(collision.getEntityModel().getId());
            //
            // //Zabiera zycie entity ktore zostalo trafione
            // targetEntity = this._list.getElementById(collision.getTaskModel().getEntityId());
            //
            // if (targetEntity !== null) {
            //     if (targetEntity.getCurrentHp() <= 0) {
            //         this._list.removeElementById(collision.getTaskModel().getEntityId());
            //     }
            // }
        }

    }

};