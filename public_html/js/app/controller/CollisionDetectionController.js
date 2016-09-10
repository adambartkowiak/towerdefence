/**
 * Created by adambartkowiak on 03/05/16.
 */


/**
 * Klasa jest odpowiedzialna za tworzenie siatki kolizji oraz za zwracanie obiektów, które są na tej siatce na podstawie kształtów.
 *
 * Kształty moga byc: okragle i prostokatne.
 */

'use strict';

var totalElementsToCheck = 0;
var uniqueElementsToCheck = 0;
var totalArrayExtends = 0;
var getPotentialCollisionArrayForCircle_CALL_NUMBER = 1;

var UNIQUE_EXTEND = true;

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class CollisionDetectionController
 * @constructor
 * @param {app.model.EntityListModel} listModel
 *
 */
app.controller.CollisionDetectionController = function CollisionDetectionController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

    /**
     * @property {app.model.MapModel} _mapModel
     * @private
     */
    this._mapModel = null;

    /**
     * @property {Array} _collisionMap
     * @private
     */
    this._collisionMap = [];

    /**
     * @property {number} _mapWidth
     * @private
     */
    this._mapWidth = 0;

    /**
     * @property {number} _mapHeight
     * @private
     */
    this._mapHeight = 0;

    /**
     * @property {number} _tileWidth
     * @private
     */
    this._tileWidth = 0;

    /**
     * @property {number} _tileHeight
     * @private
     */
    this._tileHeight = 0;

};

Utils.inherits(app.controller.CollisionDetectionController, Object);

/**
 * @method prepareObjectsGroups
 * @param {app.model.MapModel} mapModel
 */
app.controller.CollisionDetectionController.prototype.prepareObjectsGroups = function prepareObjectsGroups(mapModel) {

    this._mapModel = mapModel;

    var listLength = this._list.length(),
        elementIndex,
        element,
        elementX = 0,
        elementY = 0,
        elementCollisionRadius = 0,
        tileIndexX = 0,
        tileIndexY = 0,
        startTileIndexX = 0,
        startTileIndexY = 0,
        endTileIndexX = 0,
        endTileIndexY = 0,
        tileWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileIndexY = Math.ceil(this._mapModel.getMapGraphicModel().getMapHeight() / tileHeight),
        rowOffset = 0,
        selectedIndex = 0;


    this._collisionMap = [];
    // this._collisionMap.length = 0;
    // this._collisionMap.splice(0, this._collisionMap.length);

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        elementX = element.getX();
        elementY = element.getY();
        elementCollisionRadius = element.getCollisionRadius();

        //startIndex
        startTileIndexX = Math.floor((elementX - elementCollisionRadius) / tileWidth);
        startTileIndexY = Math.floor((elementY - elementCollisionRadius) / tileHeight);

        //endIndex
        endTileIndexX = Math.floor((elementX + elementCollisionRadius) / tileWidth);
        endTileIndexY = Math.floor((elementY + elementCollisionRadius) / tileHeight);

        for (tileIndexX = startTileIndexX; tileIndexX <= endTileIndexX; tileIndexX++) {

            rowOffset = maxTileIndexY * tileIndexX;

            for (tileIndexY = startTileIndexY; tileIndexY <= endTileIndexY; tileIndexY++) {

                selectedIndex = rowOffset + tileIndexY;

                if (this._collisionMap[selectedIndex] === undefined) {
                    this._collisionMap[selectedIndex] = [];
                }

                this._collisionMap[selectedIndex].push(element);

            }
        }

    }

};

/**
 * @method getPotentialCollisionArrayForCircle
 * @param {number} x
 * @param {number} y
 * @param {number} collisionRadius
 * @param {number} mask
 */
app.controller.CollisionDetectionController.prototype.getPotentialCollisionArrayForCircle = function getPotentialCollisionArrayForCircle(x, y, collisionRadius, mask) {

    getPotentialCollisionArrayForCircle_CALL_NUMBER += 1;

    var tileWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
        tileHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
        maxTileIndexY = Math.ceil(this._mapModel.getMapGraphicModel().getMapHeight() / tileHeight),

        startTileIndexX = Math.floor((x - collisionRadius) / tileWidth),
        startTileIndexY = Math.floor((y - collisionRadius) / tileHeight),
        endTileIndexX = Math.floor((x + collisionRadius) / tileWidth),
        endTileIndexY = Math.floor((y + collisionRadius) / tileHeight),

        selectedIndex = 0,
        result = [];

    for (var tileIndexX = startTileIndexX; tileIndexX <= endTileIndexX; tileIndexX++) {
        for (var tileIndexY = startTileIndexY; tileIndexY <= endTileIndexY; tileIndexY++) {

            selectedIndex = maxTileIndexY * tileIndexX + tileIndexY;
            if (this._collisionMap[selectedIndex] !== undefined) {

                if (UNIQUE_EXTEND){
                    result.extendUnique(this._collisionMap[selectedIndex], getPotentialCollisionArrayForCircle_CALL_NUMBER);
                } else {
                    result.extend(this._collisionMap[selectedIndex]);
                }

                // totalElementsToCheck += this._collisionMap[selectedIndex].length;
                // totalArrayExtends += 1;
            }

        }
    }

    // //UNIQUES CHECK
    // var counts = {};
    // for (var i = 0; i < result.length; i++) {
    //     counts[result[i].getId()] = 1 + (counts[result[i].getId()] || 0);
    //     if (counts[result[i].getId()] === 1) {
    //         uniqueElementsToCheck++;
    //     }
    // }

    // totalElementsToCheck += result.length;


    return result;
};

/**
 * @method getCollisionArrayForCircle
 * @param {number} x
 * @param {number} y
 * @param {number} collisionRadius
 * @param {number} mask
 */
app.controller.CollisionDetectionController.prototype.getCollisionArrayForCircle = function getCollisionArrayForCircle(x, y, collisionRadius, mask) {

    var potentialCollisionArray = this.getPotentialCollisionArrayForCircle(x, y, collisionRadius, mask),
        potentialCollisionArrayLength = potentialCollisionArray.length,
        i = 0,
        entity = null,
        result = [];

    var c1 = new support.geom.Circle(x, y, collisionRadius);
    var c2 = new support.geom.Circle(0, 0, 0);

    for (i = 0; i < potentialCollisionArrayLength; i++) {

        entity = potentialCollisionArray[i];

        c2.setX(entity.getX());
        c2.setY(entity.getY());
        c2.setRadius(entity.getCollisionRadius());

        var collision = support.geom.collision.Collision.CircleCircle(c1, c2);

        if (collision) {
            result.push(entity);
        }

    }

    return result;
};

// /**
//  * @method getPotentialCollisionArrayForRectangle
//  * @param {number} x
//  * @param {number} y
//  * @param {number} width
//  * @param {number} height
//  * @param {number} mask
//  */
// app.controller.CollisionDetectionController.prototype.getPotentialCollisionArrayForRectangle = function getPotentialCollisionArrayForRectangle(x, y, width, height, mask) {
//
//     var tileWidth = this._mapModel.getMapGraphicModel().getTileWidth(),
//         tileHeight = this._mapModel.getMapGraphicModel().getTileHeight(),
//         maxTileIndexX = Math.ceil(this._mapModel.getMapGraphicModel().getMapWidth() / tileWidth),
//         maxTileIndexY = Math.ceil(this._mapModel.getMapGraphicModel().getMapHeight() / tileHeight),
//
//         startTileIndexX = Math.floor((x - radius) / tileWidth),
//         startTileIndexY = Math.floor((y - radius) / tileHeight),
//         endTileIndexX = Math.floor((x + radius) / tileWidth),
//         endTileIndexY = Math.floor((y + radius) / tileHeight),
//
//         selectedIndex = 0,
//         result = [];
//
//     for (var tileIndexX = startTileIndexX; tileIndexX <= endTileIndexX; tileIndexX++) {
//         for (var tileIndexY = startTileIndexY; tileIndexY <= endTileIndexY; tileIndexY++) {
//
//             selectedIndex = maxTileIndexY * tileIndexX + tileIndexY;
//             result = result.concat(this._collisionTree[selectedIndex]);
//
//         }
//     }
//
//     return result;
// };


//OLD METHODS FROM MAP MODEL.. ADD UPDATE REMOVE ENTITIES FROM SPATIAL HASHES


// /**
//  * @method addEntity
//  * @param {app.model.EntityModel} entityModel
//  */
// app.model.MapModel.prototype.addEntity = function addEntity(entityModel) {
//     //console.log("app.model.MapModel.prototype.addEntity:" + entityModel.getId());
//
//     var element,
//         elementX = 0,
//         elementY = 0,
//         elementRadius = 0,
//         tileIndexX = 0,
//         tileIndexY = 0,
//         startTileIndexX = 0,
//         startTileIndexY = 0,
//         endTileIndexX = 0,
//         endTileIndexY = 0,
//         tileGraphicWidth = this.getMapGraphicModel().getTileWidth(),
//         tileGraphicHeight = this.getMapGraphicModel().getTileHeight(),
//         maxTileGraphicIndexX = Math.ceil(this.getMapGraphicModel().getMapWidth() / tileGraphicWidth),
//         maxTileGraphicIndexY = Math.ceil(this.getMapGraphicModel().getMapHeight() / tileGraphicHeight);
//
//
//     element = entityModel;
//
//     elementX = element.getX();
//     elementY = element.getY();
//     elementRadius = element.getRadius();
//
//     //startIndex
//     startTileIndexX = Math.round((elementX - elementRadius) / tileGraphicWidth);
//     startTileIndexY = Math.round((elementY - elementRadius) / tileGraphicHeight);
//
//     //endIndex
//     endTileIndexX = Math.round((elementX + elementRadius) / tileGraphicWidth);
//     endTileIndexY = Math.round((elementY + elementRadius) / tileGraphicHeight);
//
//
//     for (tileIndexX = startTileIndexX; tileIndexX <= endTileIndexX; tileIndexX++) {
//         for (tileIndexY = startTileIndexY; tileIndexY <= endTileIndexY; tileIndexY++) {
//
//             if (this._collisionSpatialHashingArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] === undefined) {
//                 this._collisionSpatialHashingArray[maxTileGraphicIndexY * tileIndexX + tileIndexY] = [];
//             }
//
//             this._collisionSpatialHashingArray[maxTileGraphicIndexY * tileIndexX + tileIndexY].push(element);
//
//             //create collision array By Entity
//             if(this._collisionHashesByEntityId[element.getId()] === undefined){
//                 this._collisionHashesByEntityId[element.getId()] = [];
//             }
//             this._collisionHashesByEntityId[element.getId()].push(maxTileGraphicIndexY * tileIndexX + tileIndexY);
//
//         }
//     }
// };
//
// /**
//  * @method removeEntity
//  * @param {app.model.EntityModel} entityModel
//  */
// app.model.MapModel.prototype.removeEntity = function removeEntity(entityModel) {
//     //console.log("app.model.MapModel.prototype.removeEntity:" + entityModel.getId());
//
//     var entityCollisionTreeIndexArray = this._collisionHashesByEntityId[entityModel.getId()];
//
//     //remove entity from _collisionSpatialHashingArray, from all buckets
//     for (var i = 0; i < entityCollisionTreeIndexArray.length; i++) {
//         this.removeEntityById(this._collisionSpatialHashingArray[entityCollisionTreeIndexArray[i]], entityModel.getId());
//     }
//
//     this._collisionHashesByEntityId[entityModel.getId()] = [];
// };
//
// /**
//  * @private
//  * @method removeEntityById
//  * @param {Array} collisionSpatialHashingArrayBucket
//  * @param {Number} id
//  */
// app.model.MapModel.prototype.removeEntityById = function removeEntityById(collisionSpatialHashingArrayBucket, id) {
//
//     var max = collisionSpatialHashingArrayBucket.length,
//         i;
//
//     for (i = max-1; i >= 0; i--) {
//         if (collisionSpatialHashingArrayBucket[i].getId() === id){
//             collisionSpatialHashingArrayBucket.splice(i, 1);
//             //console.log("REMOVED: collisionSpatialHashingArrayBucket");
//         }
//     }
//
// };
//
// /**
//  * @method updateEntity
//  * @param {app.model.EntityModel} entityModel
//  */
// app.model.MapModel.prototype.updateEntity = function updateEntity(entityModel) {
//     //console.log("app.model.MapModel.prototype.updateEntity");
//     updateSpacialHashingCount++;
//     //this.removeEntity(entityModel);
//     //this.addEntity(entityModel);
//
//     //console.log(this._collisionHashesByEntityId);
// };
