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
    EQUAL: 10,
    EQUAL_OR_GREATER: 11,

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
    MOVE_ATTACK: 109,

    //Entity Action - connected with building
    START_BUILD_BUILDING: 200,
    BUILD_BUILDING: 201,

    //Entity Action - connected with training/production
    TRAIN_UNIT: 301,

    //Set mouse functions
    SET_MOVE_ACTION: 400,
    SET_MOVE_ATTACK_ACTION: 401,
    SET_PATROL_ACTION: 402,
    SET_GO_GATHER_ACTION: 403,
    SET_BUILD_BUILDING: 404,

    //Interface
    SHOW_CONSOLE_LOG: 500,

    //System
    TURN_OFF_TRIGGER: 1000,
    TURN_ON_TRIGGER: 1001,
    GET_ENTITY_PROPERTY: 1002,
    GET_EVENT_ENTITY: 1003,
    GET_UNIT_COUNT: 1004,
    ACTION_MENU_BACK: 1005,
    GET_RESOURCES_VALUE: 1006,
    CHANGE_OBJECTIVE_RESULT: 1007,
    GET_VARIABLE_VALUE: 1008,
    INCREMENT_VARIABLE_VALUE: 1009,
    ALL_OBJECTIVES_COMPLETED: 1010,
    SHOW_VICTORY_POPUP: 1011

};