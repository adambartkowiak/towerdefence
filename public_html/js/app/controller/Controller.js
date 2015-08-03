/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.MainController = app.MainController || {};

var Utils = Utils || {};

/**
 * @namespace app.MainController
 * @class MainController
 * @constructor
 * @param {app.model.ListModel} listModel
 *
 */
app.MainController.MainController = function MainController(listModel) {

    /**
     * @property {app.model.ListModel} _list
     * @private
     */
    this._list = listModel;

};

Utils.inherits(app.MainController.MainController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.MainController.MainController.prototype.update = function update(timeDelta) {

};