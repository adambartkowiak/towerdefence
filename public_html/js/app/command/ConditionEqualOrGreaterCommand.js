/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ConditionEqualOrGreaterCommand
 * @constructor
 * @param {app.command.AttributeCommand} param1
 * @param {app.command.AttributeCommand} param2
 */
app.command.ConditionEqualOrGreaterCommand = function ConditionEqualOrGreaterCommand(param1, param2) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} param1
     * @private
     */
    this._param1 = param1;

    /**
     * @property {app.command.AttributeCommand} param2
     * @private
     */
    this._param2 = param2;

};

Utils.inherits(app.command.ConditionEqualOrGreaterCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ConditionEqualOrGreaterCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ConditionEqualOrGreaterCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    var param1 = this._param1.execute(null),
        param2 = this._param2.execute(null);
    // console.log("ConditionEqualOrGreaterCommand - param1: ");
    // console.log(param1);

    // console.log("ConditionEqualOrGreaterCommand - param2: ");
    // console.log(param2);

    if (param1 >= param2){
        return true;
    } else {
        return false;
    }

};