/**
 * Created by adambartkowiak on 01/08/15.
 */
/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';

var app = app || {};
app.model = app.model || {};

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityListModel
 * @constructor
 */
app.model.EntityListModel = function ListModel() {

    app.model.ListModel.call(this);

};

Utils.inherits(app.model.EntityListModel, app.model.ListModel);


/**
 * @method getElementById
 * @param {Number} id
 * @return {Object} object
 */
app.model.EntityListModel.prototype.getElementById = function getElementById(id) {

    var index;
    var length = this.length();

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            return this._elements[index];
        }
    }

    return null;
};

/**
 * @method removeElementById
 * @param {Number} id
 */
app.model.EntityListModel.prototype.removeElementById = function removeElementById(id) {

    var index;
    var length = this.length();
    var foundIndex = -1

    for (index = 0; index < length; index++) {
        if (this._elements[index].getId() === id) {
            foundIndex = index;
            break;
        }
    }

    if (foundIndex >= 0) {
        this.removeElement(foundIndex);
    }

};

app.model.EntityListModel.prototype.loadFromJSON = function loadFromJSON(JSON) {

    /*
     przypisanie obiektow JSONowych do zmiennych
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
        elementToAdd = new app.model.EntityModel();
        elementToAdd.loadFromJSON(elementJSON);

        this.addElement(elementToAdd);
    }

};