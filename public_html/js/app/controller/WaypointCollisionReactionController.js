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


            if (collision.getEntityModel().getMoveList().getElement(0).getEntityId() > 0){

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
            if (entityModel.getTask().getTaskEnum() === app.enum.FunctionEnum.GO_GATHER){

                entityModel.getMoveList().clear();


                var resourcesEntity = this._list.getElementById(entityModel.getTask().getEntityId());
                var newResourceEntity = null;

                //Ustaw taska na inne entity z resourcami
                if (resourcesEntity !== null){
                    if (resourcesEntity.getCurrentAmountOfWood() === 0 && resourcesEntity.getMaxAmountOfWood() > 0){
                        newResourceEntity = Helper.getNearestWoodResources(this._list, resourcesEntity.getX(), resourcesEntity.getY());
                    } else if (resourcesEntity.getCurrentAmountOfGold() === 0 && resourcesEntity.getMaxAmountOfGold() > 0){
                        newResourceEntity = Helper.getNearestGoldResources(this._list, resourcesEntity.getX(), resourcesEntity.getY());
                    }

                    if (newResourceEntity !== null){
                        entityModel.getTask().setEntityId(newResourceEntity.getId());
                    }

                }

                entityModel.getMoveList().addElement(new app.model.TaskModel(0, 0, 5, entityModel.getTask().getEntityId(), app.enum.FunctionEnum.GO_GATHER));



            }

        } else if (collisionType === app.enum.FunctionEnum.BUILD_BASE) {

            console.log("collisionType === app.model.ActionTypeModel.BUILD_BASE");

            if (collision.getEntityModel().getTask().getTaskEnum() === app.enum.FunctionEnum.BUILD_BASE){
                collision.getEntityModel().getMoveList().clear();

                var entityModel = new app.model.EntityModel();

                entityModel.loadFromJSON(JSON.parse("{\"_team\":1,\"_circle\":{\"_x\":236,\"_y\":496,\"_radius\":95},\"_mass\":-1,\"_moveCollisionDetectionRadius\":0,\"_collisionRadius\":90,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":0,\"_hp\":1000,\"_currentHp\":1000,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":0,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/building1_team1.png\",\"_moveList\":{\"_elements\":[]},\"_buildList\":{\"_elements\":[{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}},{\"_id\":22,\"_team\":1,\"_circle\":{\"_x\":60,\"_y\":200,\"_radius\":20},\"_mass\":0,\"_moveCollisionDetectionRadius\":120,\"_collisionRadius\":15,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":120,\"_hp\":100,\"_currentHp\":100,\"_attackRange\":0,\"_attackDamage\":0,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":true,\"_targetable\":true,\"_graphicUrl\":\"assets/graphics/images/enemy0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":1500,\"_y\":700,\"_radius\":5},\"_actionType\":4,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[{\"_id\":23,\"_team\":0,\"_circle\":{\"_x\":0,\"_y\":0,\"_radius\":10},\"_mass\":0,\"_moveCollisionDetectionRadius\":110,\"_collisionRadius\":5,\"_lastPosition\":{\"_x\":0,\"_y\":0},\"_angle\":0,\"_groundSpeed\":800,\"_hp\":1,\"_currentHp\":1,\"_attackRange\":300,\"_attackDamage\":10,\"_attackRate\":0,\"_attackCooldown\":0,\"_constantBuild\":false,\"_buildTime\":2000,\"_currentBuildTime\":0,\"_selected\":false,\"_selectable\":false,\"_targetable\":false,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_moveList\":{\"_elements\":[{\"_circle\":{\"_x\":-1,\"_y\":-1,\"_radius\":5},\"_actionType\":1,\"_entityId\":0}]},\"_buildList\":{\"_elements\":[]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[],\"_graphicOffset\":{\"_x\":0,\"_y\":0}}]},\"_availableActions\":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],\"_graphicOffset\":{\"_x\":0,\"_y\":40},\"_woodStorage\":true,\"_goldStorage\":true}"));

                entityModel.setX(collision.getEntityModel().getX(), null);
                entityModel.setY(collision.getEntityModel().getY(), null);

                //Add building to map
                this._list.addElement(entityModel);
            }

        } else if (collisionType === app.enum.FunctionEnum.ATTACK) {

            //Kasuje entity, ktory trafil w cel ( czyli pocisk :) )
            this._list.removeElementById(collision.getEntityModel().getId());

            //Zabiera zycie entity ktore zostalo trafione
            targetEntity = this._list.getElementById(collision.getTaskModel().getEntityId());

            if (targetEntity !== null) {
                targetEntity.setCurrentHp(targetEntity.getCurrentHp() - collision.getEntityModel().getAttackDamage());
                if (targetEntity.getCurrentHp() <= 0){
                    this._list.removeElementById(collision.getTaskModel().getEntityId());
                }
            }
        }

    }

};