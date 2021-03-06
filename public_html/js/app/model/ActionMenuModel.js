/**
 * Created by adambartkowiak on 16/03/16.
 */

'use strict';
var ns = Utils.namespace("app.model");

var Utils = Utils || {};

/**
 * @namespace app.model
 * @class ActionMenuModel
 * @constructor
 */
ns.ActionMenuModel = function ActionMenuModel() {

    /**
     * @property {Array} _elements
     * @private
     */
    this._elements = [];
    // this._elements = [
    //     {
    //         "text": "Move",
    //         "icon": "assets/graphics/icons/moveicon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 400
    //         }
    //     },
    //     {
    //         "text": "Cancel",
    //         "icon": "assets/graphics/icons/cancelicon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 2
    //         }
    //     },
    //     {
    //         "text": "Hold",
    //         "icon": "assets/graphics/icons/holdicon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 103
    //         }
    //     },
    //     {
    //         "text": "Patrol",
    //         "icon": "assets/graphics/icons/patrolicon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 402
    //         }
    //     },
    //     {
    //         "text": "Attack",
    //         "icon": "assets/graphics/icons/attackicon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 401
    //         }
    //     },
    //     {
    //         "text": "Gather",
    //         "icon": "assets/graphics/icons/gathericon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 403
    //         }
    //     },
    //     {
    //         "text": null,
    //         "icon": null,
    //         "action": null
    //     },
    //     {
    //         "text": null,
    //         "icon": null,
    //         "action": null
    //     },
    //     {
    //         "text": "Build",
    //         "icon": "assets/graphics/icons/castle_01_icon.png",
    //         "elements": [
    //             {
    //                 "text": "Castle",
    //                 "icon": "assets/graphics/icons/castle_01_icon.png",
    //                 "action": {
    //                     "1": "##GENERATE_GUID##",
    //                     "2": 404,
    //                     "3": "{\"_team\":0,\"_selectable\":true,\"_targetable\":true,\"_woodStorage\":true,\"_goldStorage\":true,\"_currentHp\":1000,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":-1,\"_radius\":43,\"_collisionRadius\":43,\"_groundSpeed\":0,\"_hp\":1000,\"_graphicUrl\":\"assets/graphics/images/castle_01.png\",\"_graphicOffset\":{\"_x\":-6,\"_y\":35},\"_rotateGraphicOnMove\":false}]}}"
    //                 }
    //             },
    //             {
    //                 "text": "Tower",
    //                 "icon": "assets/graphics/icons/tower_01_icon.png",
    //                 "action": {
    //                     "1": "##GENERATE_GUID##",
    //                     "2": 404,
    //                     "3": "{\"_team\":0,\"_selectable\":true,\"_targetable\":true,\"_currentHp\":1000,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":-1,\"_radius\":23,\"_collisionRadius\":23,\"_viewRadius\":600,\"_selectTargetRadius\":250,\"_groundSpeed\":0,\"_hp\":1000,\"_graphicUrl\":\"assets/graphics/images/tower_01.png\",\"_graphicOffset\":{\"_x\":-4,\"_y\":35},\"_rotateGraphicOnMove\":false},{\"_id\":\"inconstrucion\",\"_mass\":-1,\"_radius\":23,\"_collisionRadius\":23,\"_groundSpeed\":0,\"_hp\":1000,\"_graphicUrl\":\"assets/graphics/images/tower_01.png\",\"_graphicOffset\":{\"_x\":-4,\"_y\":35},\"_rotateGraphicOnMove\":false}]}}"
    //                 }
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": null,
    //                 "icon": null,
    //                 "action": null
    //             },
    //             {
    //                 "text": "Back",
    //                 "icon": "assets/graphics/icons/backicon.png",
    //                 "action": {
    //                     "1": "##GENERATE_GUID##",
    //                     "2": 1005
    //                 }
    //             },
    //         ]
    //     },
    //     {
    //         "text": null,
    //         "icon": null,
    //         "action": null
    //     },
    //     {
    //         "text": "Worker",
    //         "icon": "assets/graphics/icons/worker_01_icon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 301,
    //             "3": "{\"_team\":1,\"_selectable\":true,\"_targetable\":true,\"_currentHp\":300,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":0,\"_radius\":12,\"_collisionRadius\":12,\"_viewRadius\":200,\"_selectTargetRadius\":200,\"_groundSpeed\":80,\"_hp\":300,\"_graphicUrl\":\"assets/graphics/images/worker_01.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":18},\"_rotateGraphicOnMove\":false,\"_entityAttackListModel\":{\"_elements\":[{\"_id\":\"melee\",\"_minRange\":0,\"_maxRange\":5,\"_rate\":1000,\"_damage\":100,\"_createBullet\":false},{\"_id\":\"range\",\"_minRange\":5,\"_maxRange\":150,\"_rate\":500,\"_createBullet\":true,\"_bulletOffset\":{\"_x\":0,\"_y\":18},\"_bulletEntity\":{\"_currentStateId\":\"default\",\"_selectable\":false,\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":0,\"_radius\":5,\"_collisionRadius\":5,\"_selectTargetRadius\":1000,\"_groundSpeed\":500,\"_removeAfterHit\":true,\"_graphicUrl\":\"assets/graphics/images/bullet0.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":0},\"_entityAttackListModel\":{\"_elements\":[{\"_id\":\"melee\",\"_minRange\":0,\"_maxRange\":5,\"_rate\":1,\"_damage\":20,\"_createBullet\":false}]}}]}}}]}},{\"_id\":\"withgold\",\"_mass\":0,\"_radius\":12,\"_collisionRadius\":12,\"_viewRadius\":150,\"_selectTargetRadius\":150,\"_groundSpeed\":50,\"_graphicUrl\":\"assets/graphics/images/worker_01withgold.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":18},\"_rotateGraphicOnMove\":false},{\"_id\":\"withwood\",\"_mass\":0,\"_radius\":12,\"_collisionRadius\":12,\"_viewRadius\":150,\"_selectTargetRadius\":150,\"_groundSpeed\":50,\"_graphicUrl\":\"assets/graphics/images/worker_01withwood.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":18},\"_rotateGraphicOnMove\":false}]}}"
    //         }
    //     },
    //     {
    //         "text": "Warrior",
    //         "icon": "assets/graphics/icons/warrior_01_icon.png",
    //         "action": {
    //             "1": "##GENERATE_GUID##",
    //             "2": 301,
    //             "3": "{\"_team\":1,\"_selectable\":true,\"_targetable\":true,\"_currentHp\":400,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":0,\"_radius\":14,\"_collisionRadius\":14,\"_groundSpeed\":80,\"_viewRadius\":250,\"_selectTargetRadius\":200,\"_hp\":400,\"_graphicUrl\":\"assets/graphics/images/warrior_01.png\",\"_graphicOffset\":{\"_x\":-22,\"_y\":29},\"_rotateGraphicOnMove\":false}]}}"
    //         }
    //     }
    // ];

    this._currentPathArray = [];

};

Utils.inherits(ns.ActionMenuModel, Object);

/**
 * @method setElements
 * @param {Array} elements
 */
ns.ActionMenuModel.prototype.setElements = function setElements(elements) {
    this._elements = elements;
    this._currentPathArray = [];
};

/**
 * @method getElements
 * @return {Object} elements
 */
ns.ActionMenuModel.prototype.getElements = function getElements() {
    return this._elements;
};
