/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class ConditionEqualCommand
 * @constructor
 * @param {String} team
 */
app.command.ConditionEqualCommand = function ConditionEqualCommand(param1, param2) {

    support.command.AbstractCommand.call(this);

    this._param1 = param1;

    this._param2 = param2;

};

Utils.inherits(app.command.ConditionEqualCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.ConditionEqualCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("ConditionEqualCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    var param1 = this._param1.execute(null),
        param2 = this._param2.execute(null);

    // console.log("ConditionEqualCommand - param1: ");
    // console.log(param1);

    // console.log("ConditionEqualCommand - param2: ");
    // console.log(param2);

    if (param1 === param2){
        return true;
    } else {
        return false;
    }

};