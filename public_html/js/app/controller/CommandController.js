/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CommandController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.CommandController = function CommandController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._currentAction = null;

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._entityListModel = entityListModel;

};

Utils.inherits(app.controller.CommandController, Object);

/**
 * @method setAction
 * @param {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.setAction = function setAction(action) {
    this._currentAction = action;
};

/**
 * @method setAction
 * @return {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.getAction = function getAction() {
    return this._currentAction;
};

/**
 * @method getEntityListModel
 * @return {app.model.EntityListModel} entityListModel
 */
app.controller.CommandController.prototype.getEntityListModel = function getEntityListModel(entityListModel) {
    return this._entityListModel;
};

/**
 * @method setEntityListModel
 * @param {app.model.EntityListModel} entityListModel
 */
app.controller.CommandController.prototype.setEntityListModel = function setEntityListModel(entityListModel) {
    this._entityListModel = entityListModel;
};

/**
 * @method setActionOnEntity
 * @param {app.model.EntityModel} entity
 * @param {number} x
 * @param {number} y
 * @param {app.model.EntityModel} targetEntity
 * @param {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.setActionOnEntity = function setActionOnEntity(entity, x, y, targetEntity, action) {

    var targetEntityId = 0;

    if (targetEntity !== null){
        targetEntityId = targetEntity.getId();
    }

    if (action === app.enum.TaskEnum.MOVE){

        entity.setTask(app.enum.TaskEnum.MOVE);
        if (entity.getSelected() && entity.getMoveList()) {
            entity.getMoveList().clear();
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, targetEntityId, action));
        } else if (entity.getSelected()) {
            entity.setMoveList(new app.model.ListModel());
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, targetEntityId, action));
        }
    } else if (action === app.enum.TaskEnum.GATHER){

        entity.setTask(new app.model.TaskModel(x, y, 5, targetEntityId, action));
        if (entity.getSelected() && entity.getMoveList()) {
            entity.getMoveList().clear();
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, targetEntityId, action));
        } else if (entity.getSelected()) {
            entity.setMoveList(new app.model.ListModel());
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, targetEntityId, action));
        }
    // } else if (action === app.enum.TaskEnum.PATROL){
    //
    //     entity.setTask(app.enum.TaskEnum.PATROL);
    //     if (entity.getSelected() && entity.getMoveList()) {
    //         entity.getMoveList().clear();
    //         entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, action));
    //         entity.getMoveList().addElement(new app.model.TaskModel(entity.getX(), entity.getY(), 5, targetEntityId, action));
    //     } else if (entity.getSelected()) {
    //         entity.setMoveList(new app.model.ListModel());
    //         entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, action));
    //         entity.getMoveList().addElement(new app.model.TaskModel(entity.getX(), entity.getY(), 5, targetEntityId, action));
    //     }
    } else if (action === app.enum.TaskEnum.PATROL){

        entity.setTask(app.enum.TaskEnum.PATROL);
        if (entity.getSelected() && entity.getMoveList()) {
            entity.getMoveList().clear();
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, action));
            entity.getMoveList().addElement(new app.model.TaskModel(entity.getX(), entity.getY(), 5, targetEntityId, action));
        } else if (entity.getSelected()) {
            entity.setMoveList(new app.model.ListModel());
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, action));
            entity.getMoveList().addElement(new app.model.TaskModel(entity.getX(), entity.getY(), 5, targetEntityId, action));
        }
    } else if (action === app.enum.TaskEnum.BUILD_BASE){

        entity.setTask(new app.model.TaskModel(x, y, 5, 0, app.enum.TaskEnum.BUILD_BASE));
        if (entity.getSelected() && entity.getMoveList()) {
            entity.getMoveList().clear();
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, app.enum.TaskEnum.BUILD_BASE));
        } else if (entity.getSelected()) {
            entity.setMoveList(new app.model.ListModel());
            entity.getMoveList().addElement(new app.model.TaskModel(x, y, 5, 0, app.enum.TaskEnum.BUILD_BASE));
        }
    }
    
};
