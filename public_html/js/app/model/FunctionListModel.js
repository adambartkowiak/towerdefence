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
 * @class FunctionListModel
 * @constructor
 */
app.model.FunctionListModel = function FunctionListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.FunctionListModel, app.model.ListModel);

/**
 * @method getElementById
 * @param {Number} id
 * @return {app.model.function.AbstractValueModel} abstractValue
 */
app.model.FunctionListModel.prototype.getElementById = function getElementById(id) {
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
 * @method getElementIndex
 * @param {app.model.function.AbstractValueModel} element
 * @return {Number} index
 */
app.model.FunctionListModel.prototype.getElementIndex = function getElementIndex(element) {
    var result = null,
        index,
        length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === element.getId()) {
            result = index;
            break;
        }
    }

    return result;
};

/**
 * @method removeElementById
 * @param {Number} id
 */
app.model.FunctionListModel.prototype.removeElementById = function removeElementById(id) {


    var element = this.getElementById(id);

    if (element !== null) {
        element.remove()
    }

};

/**
 * @method createMe
 * @return {app.model.FunctionListModel}
 */
app.model.FunctionListModel.prototype.createMe = function createMe() {
    return new app.model.FunctionListModel();
};

/**
 * @method createListElement
 * @param {Object} elementJSON
 * @param {boolean} minified
 * @return {app.model.EntityModel}
 */
app.model.FunctionListModel.prototype.createListElement = function createListElement(elementJSON, minified) {

    //Mozna by tu jakos przeslac parametry i robic juz od poczatku poprawne elementy.

    console.log(elementJSON, minified);

    return new app.model.function.AbstractFunction("", app.enum.FunctionEnum.NONE, []);

};