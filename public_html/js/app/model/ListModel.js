/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ListModel
 * @constructor
 */
app.model.ListModel = function ListModel() {

    /**
     * @property {Array} _elements
     * @private
     */
    this._elements = [];

};

Utils.inherits(app.model.ListModel, Object);


/**
 * @method addElement
 * @param {Object} object
 * @return {app.model.ListModel} this
 */
app.model.ListModel.prototype.addElement = function addElement(object) {
    this.onAddElement(object);
    this._elements.push(object);

    return this;
};

/**
 * @method onAddElement
 * @param {Object} object
 */
app.model.ListModel.prototype.onAddElement = function onAddElement(object) {

};

/**
 * @method insertElement
 * @public
 * @param {number} index
 * @param {Object} element
 */
app.model.ListModel.prototype.insertElement = function insertElement(index, element) {
    this._elements.splice(index, 0, element);
};

/**
 * @method getElement
 * @param {Number} index
 * @return {Object} object
 */
app.model.ListModel.prototype.getElement = function getElement(index) {
    return this._elements[index];
};

/**
 * @method removeElementByIndex
 * @param {Number} index
 */
app.model.ListModel.prototype.removeElementByIndex = function removeElementByIndex(index) {
    this.onRemoveElement(this._elements[index]);
    this._elements.splice(index, 1);
};

/**
 * @method onRemoveElement
 * @param {Object} object
 */
app.model.ListModel.prototype.onRemoveElement = function onRemoveElement(object) {

};

/**
 * @method getElements
 * @return {Array} _elements
 */
app.model.ListModel.prototype.getElements = function getElements() {
    return this._elements;
};

/**
 * @method clear
 */
app.model.ListModel.prototype.clear = function clear() {
    this._elements.length = 0;
};

/**
 * @method length
 * @return {Number} length
 */
app.model.ListModel.prototype.length = function length() {
    return this._elements.length;
};

/**
 * @method createMe
 * @return {app.model.ListModel} createMe
 */
app.model.ListModel.prototype.createMe = function createMe() {
    return new app.model.ListModel();
};

/**
 * @method clone
 * @return {app.model.ListModel} clone
 */
app.model.ListModel.prototype.clone = function clone() {

    var index;
    var length = this.length();
    var clone = this.createMe();

    for (index = 0; index < length; index++) {
        clone._elements[index] = this._elements[index].clone();
    }

    return clone;
};

/**
 * @method loadFromJSON
 * @property {Object} unMinifyJSON
 */
app.model.ListModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    /*
     Przypisanie obiektow JSONowych do zmiennych
     */
    var _elementsJSON = JSON._elements;

    /*
     Wczytywanie obiektow do listy
     */

    this.clear();

    var elementJSON = null;
    var elementToAdd = null;
    var elementIndex;
    var elementJSONlength = _elementsJSON.length;

    for (elementIndex = 0; elementIndex<elementJSONlength; elementIndex++){

        elementJSON = _elementsJSON[elementIndex];
        elementToAdd = this.createListElement(elementJSON, false);
        elementToAdd.loadFromJSON(elementJSON);

        this.addElement(elementToAdd);
    }

};

/**
 * @method getMinifyJSON
 * @return {Object} minifyJSON
 */
app.model.ListModel.prototype.getMinifyJSON = function getMinifyJSON() {

    var result = {};
    var objectIndex;
    var element = null;

    //pole o nazwie "1" w obiekcie to tablica
    result[1] = [];

    for (objectIndex = 0; objectIndex<this._elements.length; objectIndex++){
        element = this._elements[objectIndex];
        result[1].push(element.getMinifyJSON());
    }

    return result;
};

/**
 * @method unMinifyJSON
 * @param {Object} minifyJSON
 * @return {Object} unMinifyJSON
 */
app.model.ListModel.prototype.unMinifyJSON = function unMinifyJSON(minifyJSON) {

    var result = {
        _elements: []
    };

    /*
     Przypisanie obiektow JSONowych do zmiennych
     */
    var _elementsJSON = minifyJSON[1];

    /*
     Uruchomienie odminifikowania na obiektach listy
     */

    var elementJSON = null;
    var element = null;
    var elementIndex;
    var elementJSONlength = _elementsJSON.length;

    for (elementIndex = 0; elementIndex<elementJSONlength; elementIndex++){

        elementJSON = _elementsJSON[elementIndex];
        element = this.createListElement(elementJSON, true);

        result["_elements"].push(element.unMinifyJSON(elementJSON));
    }
    return result;
};