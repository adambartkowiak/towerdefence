/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class AttributeCommand
 * @constructor
 * @param {app.model.function.AttributeModel} attributeModel
 */
app.command.AttributeCommand = function AttributeCommand(attributeModel) {

    support.command.AbstractCommand.call(this);

    this._attributeModel = attributeModel;

};

Utils.inherits(app.command.AttributeCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 * @return
 */
app.command.AttributeCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    return this._attributeModel.getValue();

};