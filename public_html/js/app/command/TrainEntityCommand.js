/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class TrainEntityCommand
 * @param {app.model.EntityListModel} entityListModel
 * @param {app.model.EntityModel} entityModelToTrain
 * @constructor
 */
app.command.TrainEntityCommand = function TrainEntityCommand(entityListModel, entityModelToTrain) {

    support.command.AbstractCommand.call(this);

    /**
     * @param {app.model.EntityListModel} entityListModel
     * @private
     */
    this._entityListModel = entityListModel;

    /**
     * @property {app.model.EntityModel} entityModelToTrain
     * @private
     */
    this._entityModelToTrain = entityModelToTrain;

};

Utils.inherits(app.command.TrainEntityCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TrainEntityCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    var selectedEntity = Helper.getSelectedEntity(this._entityListModel),
        entityToTrain = this._entityModelToTrain.clone(),
        randX = Math.random() - 0.5,
        randY = Math.random() - 0.5;

    if (selectedEntity !== null) {
        entityToTrain.setStartValueX(selectedEntity.getX() + randX);
        entityToTrain.setStartValueY(selectedEntity.getY() + randY);

        this._entityListModel.addElement(entityToTrain);
    }

};