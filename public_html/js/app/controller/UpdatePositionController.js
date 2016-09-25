/**
 * Created by adambartkowiak on 25/09/16.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class UpdatePositionController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.UpdatePositionController = function UpdatePositionController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.UpdatePositionController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 * @param {Number} logicLoopNumber
 */
app.controller.UpdatePositionController.prototype.update = function update(timeDelta, logicLoopNumber) {

    var listLength = this._list.length();
    var elementIndex;
    var element;

    //Updatowanie pozycji elementów na podstawie tempPosition
    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        element.setX(element.getTemporaryX(), null, logicLoopNumber);
        element.setY(element.getTemporaryY(), null, logicLoopNumber);

    }

};