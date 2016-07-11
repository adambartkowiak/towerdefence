/**
 * Created by adambartkowiak on 31/07/15.
 */

/*

 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ValueListModel
 * @constructor
 */
app.model.ValueListModel = function ValueListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.ValueListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {Number} id
 * @return {app.model.function.AbstractValue} abstractValue
 */
app.model.ValueListModel.prototype.getElementById = function getElementById(id) {
    var result = null,
        index,
        length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            result = this._elements[index];
            break;
        } else {
            result = this._elements[index].getElementById(id);
            if (result !== null) {
                break;
            }
        }
    }

    return result;
};

/**
 * @method removeElementById
 * @param {Number} id
 */
app.model.ValueListModel.prototype.removeElementById = function removeElementById(id) {


    var element = this.getElementById(id);

    if (element !== null) {
        element.remove()
    }

};

/**
 * @method createListElement
 * @returns {app.model.EntityModel}
 */
app.model.ValueListModel.prototype.createListElement = function createListElement() {
    return new app.model.function.AbstractValue();
};