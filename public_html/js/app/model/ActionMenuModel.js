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

    this._elements = [
        {
            "text": "Move",
            "icon": "assets/graphics/icons/moveicon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 400
            }
        },
        {
            "text": "Cancel",
            "icon": "assets/graphics/icons/cancelicon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 2
            }
        },
        {
            "text": "Hold",
            "icon": "assets/graphics/icons/holdicon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 103
            }
        },
        {
            "text": "Patrol",
            "icon": "assets/graphics/icons/patrolicon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 402
            }
        },
        {
            "text": "Attack",
            "icon": "assets/graphics/icons/attackicon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 401
            }
        },
        {
            "text": "Gather",
            "icon": "assets/graphics/icons/gathericon.png",
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 403
            }
        },
        {
            "text": null,
            "icon": null,
            "action": null
        },
        {
            "text": null,
            "icon": null,
            "action": null
        },
        {
            "text": "Build",
            "elements": [
                {
                    "text": "Castle",
                    "icon": null,
                    "action": {
                        "1": "##GENERATE_GUID##",
                        "2": 404,
                        "3": "{\"_team\":0,\"_selectable\":true,\"_targetable\":true,\"_woodStorage\":true,\"_goldStorage\":true,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":-1,\"_radius\":43,\"_collisionRadius\":43,\"_groundSpeed\":0,\"_hp\":1000,\"_currentHp\":1000,\"_graphicUrl\":\"assets/graphics/images/castle_01.png\",\"_graphicOffset\":{\"_x\":-6,\"_y\":35}}]}}"
                    }
                },
                {
                    "text": "Tower",
                    "icon": null,
                    "action": {
                        "1": "##GENERATE_GUID##",
                        "2": 404,
                        "3": "{\"_team\":0,\"_selectable\":true,\"_targetable\":true,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":-1,\"_radius\":23,\"_collisionRadius\":23,\"_groundSpeed\":0,\"_hp\":100,\"_currentHp\":100,\"_graphicUrl\":\"assets\/graphics\/images\/tower_01.png\",\"_graphicOffset\":{\"_x\":-4,\"_y\":35}},{\"_id\":\"inconstrucion\",\"_mass\":-1,\"_radius\":23,\"_collisionRadius\":23,\"_groundSpeed\":0,\"_hp\":100,\"_currentHp\":100,\"_graphicUrl\":\"assets\/graphics\/images\/tower_01.png\",\"_graphicOffset\":{\"_x\":-4,\"_y\":35}}]}}"
                    }
                },
                {
                    "text": "Tree",
                    "icon": null,
                    "action": {
                        "1": "##GENERATE_GUID##",
                        "2": 404,
                        "3": "{\"_team\":0,\"_selectable\":true,\"_targetable\":true,\"_maxAmountOfWood\":100,\"_currentAmountOfWood\":100,\"_currentStateId\":\"default\",\"_entityStateListModel\":{\"_elements\":[{\"_id\":\"default\",\"_mass\":-1,\"_radius\":10,\"_collisionRadius\":10,\"_groundSpeed\":0,\"_hp\":100,\"_currentHp\":100,\"_graphicUrl\":\"assets\/graphics\/images\/tree_02.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":18}},{\"_id\":\"noresources\",\"_mass\":-1,\"_radius\":10,\"_collisionRadius\":0,\"_groundSpeed\":0,\"_graphicUrl\":\"assets\/graphics\/images\/tree_02cut.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":18}}]}}"
                    }
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": null,
                    "icon": null,
                    "action": null
                },
                {
                    "text": "Back",
                    "icon": null,
                    "action": {
                        "1": "##GENERATE_GUID##",
                        "2": 1005
                    }
                },
            ]
        },
        {
            "text": null,
            "icon": null,
            "action": null
        },
        {
            "text": "Worker",
            "icon": null,
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 301
            }
        },
        {
            "text": "Warrior",
            "icon": null,
            "action": {
                "1": "##GENERATE_GUID##",
                "2": 302
            }
        }
    ];

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
