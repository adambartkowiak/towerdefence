/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class GetEntityPropertyModel
 * @constructor
 * @param {string} id
 * @param {app.model.function.AbstractValue} entity
 * @param {app.model.function.AbstractValue} property | PropertyEnum
 */
app.model.function.GetEntityPropertyModel = function GetEntityPropertyModel(id, entity, property) {

    app.model.function.AbstractFunctionModel.call(this, id, app.enum.FunctionEnum.GET_ENTITY_PROPERTY, [entity, property]);

};

Utils.inherits(app.model.function.GetEntityPropertyModel, app.model.function.AbstractFunctionModel);
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

