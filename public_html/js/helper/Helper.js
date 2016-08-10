/**
 * Created by adambartkowiak on 12/04/16.
 */

'use strict';
var Utils = Utils || {};
var Helper = Helper || {};

/**
 * @class Helper
 * @method getNearestGoldStorageId
 * @param {app.model.EntityListModel} listModel
 * @param {Number} x
 * @param {Number} y
 */
Helper.getNearestGoldStorageId = function getNearestGoldStorageId(listModel, x, y){

    var index,
        length = listModel.length(),
        selectedId = null,
        currentEntity = null,
        minDistance  = Number.MAX_VALUE,
        vector = new support.geom.Vector2d(0,0,0,0);

    for (index = 0; index < length; index++) {
        if (listModel.getElement(index).getGoldStorage() === true) {

            currentEntity = listModel.getElement(index);

            vector.getStartPoint().setX(x);
            vector.getStartPoint().setY(y);

            vector.getEndPoint().setX(currentEntity.getX());
            vector.getEndPoint().setY(currentEntity.getY());

            if (minDistance > vector.getVectorLength() ){

                minDistance = vector.getVectorLength();
                selectedId = currentEntity.getId();
            }

        }
    }

    return selectedId;
};

/**
 * @class Helper
 * @method getNearestWoodStorageId
 * @param {app.model.EntityListModel} listModel
 * @param {Number} x
 * @param {Number} y
 */
Helper.getNearestWoodStorageId = function getNearestWoodStorageId(listModel, x, y){
    var index,
        length = listModel.length();

    for (index = 0; index < length; index++) {
        if (listModel.getElement(index).getWoodStorage() === true) {
            return listModel.getElement(index).getId();
        }
    }

    return null;
};

/**
 * @class Helper
 * @method getNearestGoldResources
 * @param {app.model.EntityListModel} listModel
 * @param {Number} x
 * @param {Number} y
 * @return {app.model.EntityModel}
 */
Helper.getNearestGoldResources = function getNearestGoldResources(listModel, x, y){

    var index,
        length = listModel.length(),
        selectedEntity = null,
        currentEntity = null,
        minDistance  = Number.MAX_VALUE,
        vector = new support.geom.Vector2d(0,0,0,0);

    for (index = 0; index < length; index++) {
        if (listModel.getElement(index).getCurrentAmountOfGold() > 0) {

            currentEntity = listModel.getElement(index);

            vector.getStartPoint().setX(x);
            vector.getStartPoint().setY(y);

            vector.getEndPoint().setX(currentEntity.getX());
            vector.getEndPoint().setY(currentEntity.getY());

            if (minDistance > vector.getVectorLength() ){

                minDistance = vector.getVectorLength();
                selectedEntity = currentEntity;
            }

        }
    }

    return selectedEntity;
};

/**
 * @class Helper
 * @method getNearestWoodResources
 * @param {app.model.EntityListModel} listModel
 * @param {Number} x
 * @param {Number} y
 * @return {app.model.EntityModel}
 */
Helper.getNearestWoodResources = function getNearestWoodResources(listModel, x, y){
    var index,
        length = listModel.length(),
        selectedEntity = null,
        currentEntity = null,
        minDistance  = Number.MAX_VALUE,
        vector = new support.geom.Vector2d(0,0,0,0);

    for (index = 0; index < length; index++) {
        if (listModel.getElement(index).getCurrentAmountOfWood() > 0) {

            currentEntity = listModel.getElement(index);

            vector.getStartPoint().setX(x);
            vector.getStartPoint().setY(y);

            vector.getEndPoint().setX(currentEntity.getX());
            vector.getEndPoint().setY(currentEntity.getY());

            if (minDistance > vector.getVectorLength() ){

                minDistance = vector.getVectorLength();
                selectedEntity = currentEntity;
            }

        }
    }

    return selectedEntity;
};

/**
 * @class Helper
 * @method getSelectedEntity
 * @param {app.model.EntityListModel} listModel
 * @param {Number} x
 * @param {Number} y
 */
Helper.getSelectedEntity = function getSelectedEntity(listModel){
    var index,
        length = listModel.length();

    for (index = 0; index < length; index++) {
        if (listModel.getElement(index).getSelected() === true) {
            return listModel.getElement(index);
        }
    }

    return null;
};