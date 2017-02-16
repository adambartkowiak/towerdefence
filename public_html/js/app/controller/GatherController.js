/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class GatherController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.GatherController = function GatherController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

    this._collisionTree = null;

    this._MAX_GATHER_TIME = 2000;

    this._MAX_CARGO_VALUE = 5;

};

Utils.inherits(app.controller.GatherController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.GatherController.prototype.update = function update(timeDelta) {

    var listLength = this._list.length(),
        elementIndex,
        element,
        availableStep,
        destinationEntity,
        cargoValue,
        destinationEntityCargoValue = 0;

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableStep = element.getMoveList() && element.getMoveList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableStep || element.getMoveList().getElement(0).getTaskEnum() !== app.enum.FunctionEnum.GATHER) {
            continue;
        }


        element.setGatherTime(element.getGatherTime() + timeDelta);

        if (element.getGatherTime() >= this._MAX_GATHER_TIME) {
            //dodaje do entity resourcy, ktore niesie
            destinationEntity = this._list.getElementById(element.getTask().getEntityId());

            if (destinationEntity === null) {
                continue;
            }

            if (destinationEntity.getResource().getValue() > 0) {
                destinationEntityCargoValue = destinationEntity.getResource().getValue();
                cargoValue = Math.min(this._MAX_CARGO_VALUE, destinationEntityCargoValue);

                element.setCarriedResource(new app.model.ResourceModel(destinationEntity.getResource().getName(), cargoValue, -1));

                //troszke to jest hak na zmiane grafiki z resourceami...
                //moze w sumie nie byc takiego stanu - moze tutaj by rzucic wyjątek??
                element.setCurrentStateId("with" + destinationEntity.getResource().getName());

                destinationEntity.getResource().setValue(destinationEntityCargoValue - cargoValue);

                //zmien grafike kiedy 0 resourcow
                if (destinationEntity.getResource().getValue() === 0) {
                    destinationEntity.setCurrentStateId("noresources");
                }

            }

            //kasuje cel, z listy punktow do odwiedzenia
            element.getMoveList().clear();

            //znajduje najblizszy entitty w ktorym moze oddawac resurcy i idzie do niego z akcja zwracania resourcow
            element.getMoveList().addElement(new app.model.TaskModel(0, 0, 5, Helper.getNearestResourceStorageId(element.getCarriedResource().getName(), this._list, element.getX(), element.getY()), app.enum.FunctionEnum.RETURN_CARGO));
        }

    }

};