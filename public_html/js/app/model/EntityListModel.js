/**
 * Created by adambartkowiak on 31/07/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class EntityListModel
 * @constructor
 */
app.model.EntityListModel = function EntityListModel() {

    app.model.ListModel.call(this);

    /**
     * @property {app.listener.EntityListListener} entityListListener
     * @private
     */
    this._entityListListener = null;

};

Utils.inherits(app.model.EntityListModel, app.model.ListModel);


/**
 * @method onAddElement
 * @param {Object} object
 */
app.model.EntityListModel.prototype.onAddElement = function onAddElement(object) {

    object.setEntityListener(this._entityListListener);

    if (!!this._entityListListener) {
        this._entityListListener.onUnitCreate(object);
    }
};

/**
 * @method onRemoveElement
 * @param {Object} object
 */
app.model.EntityListModel.prototype.onRemoveElement = function onRemoveElement(object) {
    if (!!this._entityListListener) {
        this._entityListListener.onUnitDie(object);
    }
};

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
 * @method getEntityCountByTeam
 * @param {Number} team
 * @return {Number} count
 */
app.model.EntityListModel.prototype.getEntityCountByTeam = function getEntityCountByTeam(team) {

    var index,
        length = this.length(),
        count = 0;

    for (index = 0; index < length; index++) {
        if (this._elements[index].getTeam() === team) {
            count++;
        }
    }

    return count;
};

/**
 * @method removeElementById
 * @param {Number} id
 */
app.model.EntityListModel.prototype.removeElementById = function removeElementById(id) {

    var index;
    var length = this.length();
    var foundIndex = -1;

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

/**
 * @method createListElement
 * @returns {app.model.EntityModel}
 */
app.model.EntityListModel.prototype.createListElement = function createListElement() {
    return new app.model.EntityModel();
};

/**
 * @method setEntityListListener
 * @param {app.listener.EntityListListener} entityListListener
 */
app.model.EntityListModel.prototype.setEntityListListener = function setEntityListListener(entityListListener) {
    this._entityListListener = entityListListener;
};
