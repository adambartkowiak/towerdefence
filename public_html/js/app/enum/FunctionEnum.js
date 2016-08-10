/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';
var ns = Utils.namespace("app.enum");

var Utils = Utils || {};

/**
 * @namespace app.enum
 * @class FunctionEnum
 * @constructor
 */
app.enum.FunctionEnum = {

    //Basic
    NONE: 0,
    VALUE: 1,
    CANCEL: 2,

    //Logic
    EQUALS: 10,
    EQUALS_OR_GREATER: 11,

    //Entity Action - connected with movement
    MOVE: 100,
    ATTACK: 101,
    PATROL: 102,
    HOLD: 103,
    STAY: 104,
    GO_GATHER: 105,
    REPAIR: 106,
    RETURN_CARGO: 107,
    GATHER: 108,


    //Entity Action - connected with building
    START_BUILDING_BASE: 200,
    BUILD_BASE: 201,

    //Entity Action - connected with training/production
    TRAIN_WORKER: 301,
    TRAIN_WARRIOR: 302,

    //Set mouse functions
    SET_MOVE_ACTION: 400,
    SET_ATTACK_ACTION: 401,
    SET_PATROL_ACTION: 402,
    SET_GO_GATHER_ACTION: 403,
    SET_BUILDING_BASE: 404,

    //Interface
    SHOW_CONSOLE_LOG: 500,

    //System
    TURN_OFF_TRIGGER: 1000,
    TURN_ON_TRIGGER: 1001,
    GET_ENTITY_PROPERTY: 1002,
    GET_EVENT_ENTITY: 1003,
    GET_UNIT_COUNT: 1004,
    ACTION_MENU_BACK: 1005

};