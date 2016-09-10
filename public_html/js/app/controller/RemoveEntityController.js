/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class RemoveEntityController
 * @constructor
 * @param {app.model.EntityListModel} entityListModel
 *
 */
app.controller.RemoveEntityController = function RemoveEntityController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.RemoveEntityController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.RemoveEntityController.prototype.update = function update(timeDelta) {

    var listLength = this._list.length(),
        elementIndex,
        element;

    //remove entities with 0hp
    for (elementIndex = listLength - 1; elementIndex >= 0; elementIndex--) {

        element = this._list.getElement(elementIndex);

        if (element.getToRemove() || element.getCurrentHp() <= 0) {
            // this._list.removeElementById(element.getId());
            this._list.removeElementByIndex(elementIndex);
        }


    }

};
