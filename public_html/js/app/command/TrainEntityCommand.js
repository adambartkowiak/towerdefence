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
 * @param {app.command.AttributeCommand} entityModelNameToTrain
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
     * @property {app.command.AttributeCommand} entityModelNameToTrain
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
        entityModelToTrain = this._entityDictionary.getElementByModelName(this._entityModelNameToTrain.execute(null)),
        entityToTrain = entityModelToTrain.clone(),
        randX = (Math.random() - 0.5),
        randY = (Math.random() - 0.5),
        vector2d = new support.geom.SimpleVector2d(randX, randY),
        dX = vector2d.getNormalizedVector().getX() * (selectedEntity.getCurrentEntityStateModel().getRadius() + entityToTrain.getCurrentEntityStateModel().getRadius()),
        dY = vector2d.getNormalizedVector().getY() * (selectedEntity.getCurrentEntityStateModel().getRadius() + entityToTrain.getCurrentEntityStateModel().getRadius());

    if (selectedEntity !== null) {
        entityToTrain.setStartValueX(selectedEntity.getX() + dX);
        entityToTrain.setStartValueY(selectedEntity.getY() + dY);

        this._entityListModel.addElement(entityToTrain);
    }

};