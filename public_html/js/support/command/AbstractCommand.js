/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var support = support || {};
    support.command = support.command || {};

var Utils = Utils || {};

/**
 * @namespace support.command
 * @class AbstractCommand
 * @constructor
 */
support.command.AbstractCommand = function AbstractCommand() {
    
    if (this.constructor.name === "AbstractCommand"){
        throw new Error("Constructor in " + this.constructor.name +
            "is abstract and should be override");
    }

};

Utils.inherits(support.command.AbstractCommand, Object);

/**
 * @method execute
 */
support.command.AbstractCommand.prototype.execute = function execute() {
    if (this.constructor.name === "AbstractCommand"){
        throw new Error("Method: execute in " + this.constructor.name +
            "is abstract and should be override");
    }
};