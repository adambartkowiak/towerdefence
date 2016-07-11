/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';
var ns = Utils.namespace("app.enum");

var Utils = Utils || {};

/**
 * @namespace app.enum
 * @class GameEventEnum
 * @constructor
 */
app.enum.GameEventEnum = {
    NONE: 0,
    ADD_ENTITY : 1,
    REMOVE_ENTITY : 2,
    UNIT_ENTERS_REGION: 3,
    UNIT_LEAVES_REGION: 4,
    UNIT_CREATE: 5,
    UNIT_DIE: 6,
    TIME_DELTA: 7
};