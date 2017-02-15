/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class AttackCommand
 * @constructor
 * @param {number} entityId
 * @param {app.command.AttributeCommand} destinationX
 * @param {app.command.AttributeCommand} destinationY
 * @param {app.command.AttributeCommand} targetEntityId
 */
app.command.AttackCommand = function AttackCommand(entityId, destinationX, destinationY, targetEntityId) {

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
     * @property {app.command.AttributeCommand} targetEntityId
     * @private
     */
    this._targetEntityId = targetEntityId;


};

Utils.inherits(app.command.AttackCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.AttackCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    var destinationX = this._destinationX.execute(),
        destinationY = this._destinationY.execute(),
        targetEntityId = this._targetEntityId.execute(),
        entityModel = worldModel.getEntityListModel().getElementById(this._entityId.execute());


    if (entityModel.getMoveList()) {
        entityModel.getMoveList().clear();
    } else {
        entityModel.setMoveList(new app.model.ListModel());
    }

    entityModel.setTask(new app.model.TaskModel(destinationX, destinationY, 5, targetEntityId, app.enum.FunctionEnum.MOVE_ATTACK, null));
    entityModel.getMoveList().addElement(new app.model.TaskModel(destinationX, destinationY, 5, targetEntityId, app.enum.FunctionEnum.MOVE_ATTACK, null));

};