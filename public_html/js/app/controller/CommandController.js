/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CommandController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.CommandController = function CommandController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._currentAction = null;

};

Utils.inherits(app.controller.CommandController, Object);

/**
 * @method setAction
 * @param {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.setAction = function setAction(action) {
    this._currentAction = action;
};

/**
 * @method setAction
 * @return {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.getAction = function getAction() {
    return this._currentAction;
};

/**
 * @method setActionOnEntity
 * @param {app.model.EntityModel} entity
 * @param {number} x
 * @param {number} y
 * @param {app.model.AvailableActionsModel} action
 */
app.controller.CommandController.prototype.setActionOnEntity = function setActionOnEntity(entity, x, y, action) {
    
    if (action === app.model.ActionTypeModel.MOVE){
        if (entity.getSelected() && entity.getMoveList()) {
            entity.getMoveList().clear();
            entity.getMoveList().addElement(new app.model.TargetModel(x, y, 5, 0, action));
        } else if (entity.getSelected()) {
            entity.setMoveList(new app.model.ListModel());
            entity.getMoveList().addElement(new app.model.TargetModel(x, y, 5, 0, action));
        }
    }
    
    this.setAction(null);
    
};
