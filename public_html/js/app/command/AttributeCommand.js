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
 * @param {string|number|boolean} value
 */
app.command.AttributeCommand = function AttributeCommand(value) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {string|number|boolean} value
     * @private
     */
    this._value = value;

};

Utils.inherits(app.command.AttributeCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 * @return
 */
app.command.AttributeCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    return this._value;

};