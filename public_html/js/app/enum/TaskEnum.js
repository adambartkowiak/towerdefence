/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';
var ns = Utils.namespace("app.enum");

var Utils = Utils || {};

/**
 * @namespace app.enum
 * @class TaskEnum
 * @constructor
 */
app.enum.TaskEnum = {
    NONE: 0,
    ATTACK: 1,
    MOVE: 2,
    PATROL: 3,
    HOLD: 4,
    STAY: 5,
    GATHER: 6,
    AIM: 7,
    MOVE_AND_AIM: 8,
    RETURN_CARGO: 9,
    BUILD_BASE : 10,
    BUILD_WORKER : 11,
    BUILD_WARRIOR : 12
};