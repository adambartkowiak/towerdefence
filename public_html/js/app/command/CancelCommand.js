/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class CancelCommand
 * @constructor
 * @param {app.model.EntityListModel} entityListModel
 */
app.command.CancelCommand = function CancelCommand(entityListModel) {

    support.command.AbstractCommand.call(this);

    this._entityListModel = entityListModel;

};

Utils.inherits(app.command.CancelCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.CancelCommand.prototype.execute = function execute(mouseEvent) {

    console.log("CancelCommand");

    support.command.AbstractCommand.prototype.execute.call(this);

    var entityLength = this._entityListModel.length();
    var entity = null;

    for (var i=0; i<entityLength; i++){

        entity = this._entityListModel.getElement(i);

        if (entity.getSelected()) {
            if (entity.getMoveList()) {
                entity.getMoveList().clear();
            }
            entity.setHoldPosition(false);
            entity.setTask(app.enum.TaskEnum.NONE);
        }
    }


};