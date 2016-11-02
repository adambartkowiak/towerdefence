/**
 * Created by adambartkowiak on 1/04/16.
 */

'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class GetEntityPropertyCommand
 * @constructor
 * @param {app.command.AttributeCommand} entity
 * @param {app.command.AttributeCommand} property
 */
app.command.GetEntityPropertyCommand = function GetEntityPropertyCommand(entity, property) {

    support.command.AbstractCommand.call(this);

    /**
     * @property {app.command.AttributeCommand} entity
     * @private
     */
    this._entity = entity;

    /**
     * @property {app.command.AttributeCommand} property
     * @private
     */
    this._property = property;

};

Utils.inherits(app.command.GetEntityPropertyCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.GetEntityPropertyCommand.prototype.execute = function execute(mouseEvent) {

    // console.log("GetEntityPropertyCommand: execute");

    support.command.AbstractCommand.prototype.execute.call(this);

    // console.log(this._entity);
    // console.log(this._property);

    var entity = this._entity.execute(null),
        property = this._property.execute(null);

    if (property === app.enum.EntityPropertyEnum.GRAPHIC_URL) {
        return entity.getGraphicUrl();
    }

};

//
// /**
//  * @method getValue
//  */
// app.model.function.GetEntityPropertyModel.prototype.getValue = function getValue() {
//
//     var property = this._functionAttributes[0].getValue(),
//         entity = this._functionAttributes[1].getValue();
//
//     if (property === app.enum.EntityPropertyEnum.GRAPHIC_URL) {
//         return entity.getGraphicUrl();
//     }
//     else if (property === app.enum.EntityPropertyEnum.HP) {
//         return entity.getCurrentHp();
//     }
//     else if (property === app.enum.EntityPropertyEnum.ID) {
//         return entity.getId();
//     }
//     else if (property === app.enum.EntityPropertyEnum.TEAM) {
//         return entity.getTeam();
//     }
//
//     return null;
// };