/**
 * Created by adambartkowiak on 03/09/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ActionTypeModel
 * @constructor
 */
app.model.AvailableActionsModel = {

    //TO GENERALNIE POWINIEN BYC JSON - ktory powinien generowac sie automatycznie na podstawie innych JSONow np. budynkow, akcji, jednostek itp.

    MOVE: 0,
    CANCEL: 1,
    HOLD: 2,
    PATROL: 3,
    ATTACK: 4,
    GATHER_WOOD: 5,
    GATHER_GOLD: 6,
    BUILD_COMMANDCENTER: 7,
    BUILD_BARRACKS: 8,
    BUILD_ARCHERY: 9,
    BUILD_TREE1: 10,
    BUILD_TREE2: 11,
    BUILD_TREE3: 12,
    BUILD_ROCK1: 13,
    BUILD_ROCK2: 14,
    BUILD_ROCK3: 15,
    TRAIN_ARCHER: 16,
    TRAIN_WARRIOR: 17,
    TRAIN_WORKER: 18
};