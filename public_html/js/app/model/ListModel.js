/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

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
 */
app.model.ListModel.prototype.addElement = function addElement(object) {
    this._elements.push(object);
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
 * @method removeElement
 * @param {Number} index
 */
app.model.ListModel.prototype.removeElement = function removeElement(index) {
    this._elements.splice(index, 1);
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
 * @method clone
 * @return {app.model.ListModel} clone
 */
app.model.ListModel.prototype.clone = function clone() {

    var index;
    var length = this.length();
    var clone = new app.model.ListModel();

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
        elementToAdd = this.createListElement();
        elementToAdd.loadFromJSON(elementJSON);

        this.addElement(elementToAdd);
    }

};

/**
 * @method getMinifyJSON
 * @returns {Object} minifyJSON
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
 * @property {Object} minifyJSON
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
        element = this.createListElement();

        result["_elements"].push(element.unMinifyJSON(elementJSON));
    }
    return result;
};