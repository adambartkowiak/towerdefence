/**
 * Created by adambartkowiak on 04/10/15.
 */

'use strict';

var support = support || {};

var Utils = Utils || {};

/**
 * @namespace support
 * @class MouseEventType
 * @constructor
 */
support.MouseEventType = {
    MOUSE_DOWN : 0,
    MOUSE_MOVE : 1,
    MOUSE_UP : 2,
    MOUSE_LEAVE : 3,
    MOUSE_ENTER : 4,
    MOUSE_DRAG : 5, //Mouse_DWON + MOUSE_UP
    EVENT_CANCEL: 6
};