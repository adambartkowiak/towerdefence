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
 * @param {app.model.EntityListModel} entityDictionary
 * @param {String} entityModelNameToTrain
 * @constructor
 */
app.command.TrainEntityCommand = function TrainEntityCommand(entityListModel, entityDictionary, entityModelNameToTrain) {

    support.command.AbstractCommand.call(this);

    /**
     * @param {app.model.EntityListModel} entityListModel
     * @private
     */
    this._entityListModel = entityListModel;

    /**
     * @param {app.model.EntityListModel} entityDictionary
     * @private
     */
    this._entityDictionary = entityDictionary;

    /**
     * @property {String} entityModelNameToTrain
     * @private
     */
    this._entityModelNameToTrain = entityModelNameToTrain;

};

Utils.inherits(app.command.TrainEntityCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TrainEntityCommand.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    var selectedEntity = Helper.getSelectedEntity(this._entityListModel),
        entityModelToTrain = this._entityDictionary.getElementByModelName(this._entityModelNameToTrain),
        entityToTrain = entityModelToTrain.clone(),
        randX = Math.random() - 0.5,
        randY = Math.random() - 0.5;

    if (selectedEntity !== null) {
        entityToTrain.setStartValueX(selectedEntity.getX() + randX);
        entityToTrain.setStartValueY(selectedEntity.getY() + randY);

        this._entityListModel.addElement(entityToTrain);
    }

};