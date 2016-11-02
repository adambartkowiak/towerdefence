/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class HoldCommand
 * @constructor
 * @param {app.model.EntityListModel} entityListModel
 */
app.command.HoldCommand = function HoldCommand(entityListModel) {

    support.command.AbstractCommand.call(this);

    this._entityListModel = entityListModel;

};

Utils.inherits(app.command.HoldCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.HoldCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("HoldCommand");

    support.command.AbstractCommand.prototype.execute.call(this);

    var entityLength = this._entityListModel.length();
    var entity = null;

    for (var i=0; i<entityLength; i++){

        entity = this._entityListModel.getElement(i);

        if (entity.getSelected()) {
            if (entity.getMoveList()) {
                entity.getMoveList().clear();
            }
            entity.setHoldPosition(true);
            entity.setTask(new app.model.TaskModel(0, 0, 0, 0, app.enum.FunctionEnum.NONE, null));
        }


    }


};