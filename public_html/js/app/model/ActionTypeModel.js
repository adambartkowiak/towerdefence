/**
 * Created by adambartkowiak on 02/08/15.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ActionTypeModel
 * @constructor
 */
app.model.ActionTypeModel = {
    MOVE: 0,
    ATTACK: 1,
    PATROL: 2,
    AIM: 3,
    MOVE_AND_AIM: 4,
    HOLD: 5,
    STAY: 6
};