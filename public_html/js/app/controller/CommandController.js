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
     * @property {string} entityModelNameToBuild
     * @private
     */
    this._entityModelNameToBuild = null;

    /**
     * @property {app.model.EntityListModel} _entityListModel
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
 * @method getAction
 * @return {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.getAction = function getAction() {
    return this._currentAction;
};

/**
 * @method setEntityModelNameToBuild
 * @param {String} entityModelNameToBuild
 */
app.controller.CommandController.prototype.setEntityModelNameToBuild = function setEntityModelNameToBuild(entityModelNameToBuild) {
    this._entityModelNameToBuild = entityModelNameToBuild;
};

/**
 * @method getEntityModelNameToBuild
 * @return {string} currentActionEntityModel
 */
app.controller.CommandController.prototype.getEntityModelNameToBuild = function getEntityModelNameToBuild() {
    return this._entityModelNameToBuild;
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
 * @param {Number} action
 */
app.controller.CommandController.prototype.setActionOnEntity = function setActionOnEntity(entity, x, y, targetEntity, action) {

    var targetEntityId = 0;

    if (targetEntity !== null) {
        targetEntityId = targetEntity.getId();
    }

    if (action === app.enum.FunctionEnum.MOVE) {

        new app.command.MoveCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(targetEntityId)).execute();

    } else if (action === app.enum.FunctionEnum.ATTACK) {

        new app.command.AttackCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(targetEntityId)).execute();

    } else if (action === app.enum.FunctionEnum.MOVE_ATTACK) {

        new app.command.AttackCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(targetEntityId)).execute();

    } else if (action === app.enum.FunctionEnum.GO_GATHER) {

        new app.command.GoGatherCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(targetEntityId)).execute();

    } else if (action === app.enum.FunctionEnum.PATROL) {

        new app.command.PatrolCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(targetEntityId)).execute();

    } else if (action === app.enum.FunctionEnum.BUILD_BUILDING) {

        new app.command.BuildCommand(new app.command.AttributeCommand(entity.getId()), new app.command.AttributeCommand(x), new app.command.AttributeCommand(y), new app.command.AttributeCommand(this._entityModelNameToBuild)).execute();

    }

};
