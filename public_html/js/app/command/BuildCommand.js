/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class BuildCommand
 * @constructor
 * @param {app.command.AttributeCommand} entityId
 * @param {app.command.AttributeCommand} destinationX
 * @param {app.command.AttributeCommand} destinationY
 * @param {app.command.AttributeCommand} entityModelNameToBuild
 */
app.command.BuildCommand = function BuildCommand(entityId, destinationX, destinationY, entityModelNameToBuild) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} entityId
     * @private
     */
    this._entityId = entityId;

    /**
     * @property {app.command.AttributeCommand} destinationX
     * @private
     */
    this._destinationX = destinationX;

    /**
     * @property {app.command.AttributeCommand} destinationY
     * @private
     */
    this._destinationY = destinationY;

    /**
     * @property {app.command.AttributeCommand} entityModelNameToBuild
     * @private
     */
    this._entityModelNameToBuild = entityModelNameToBuild;

};

Utils.inherits(app.command.BuildCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.BuildCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    var destinationX = this._destinationX.execute(null),
        destinationY = this._destinationY.execute(null),
        entityId = this._entityId.execute(null),
        entityModel = worldModel.getEntityListModel().getElementById(entityId),
        entityModelNameToBuild = this._entityModelNameToBuild.execute(null),
        entityModelToBuild = worldModel.getEntityDictionary().getElementByModelName(entityModelNameToBuild);

    if (entityModel.getMoveList()) {
        entityModel.getMoveList().clear();
    } else {
        entityModel.setMoveList(new app.model.ListModel());
    }

    entityModel.setTask(new app.model.TaskModel(destinationX, destinationY, 5, 0, app.enum.FunctionEnum.BUILD_BUILDING, entityModelToBuild));
    entityModel.getMoveList().addElement(new app.model.TaskModel(destinationX, destinationY, 5, 0, app.enum.FunctionEnum.BUILD_BUILDING, entityModelToBuild));

};