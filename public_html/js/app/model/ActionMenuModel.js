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
                    "text": "B1",
                    "icon": null,
                    "action": {
                        "1": "##GENERATE_GUID##",
                        "2": 404
                    }
                },
                {
                    "text": "B2",
                    "icon": null,
                    "action": "SetSubAction2"
                },
                {
                    "text": "Next",
                    "elements": [
                        {
                            "text": "C1",
                            "icon": null,
                            "action": "SetSubAction1"
                        },
                        {
                            "text": "C2",
                            "icon": null,
                            "action": "SetSubAction2"
                        },
                        {
                            "text": "C3",
                            "icon": null,
                            "action": "SetSubAction3"
                        },
                        {
                            "text": "C4",
                            "icon": null,
                            "action": "SetSubAction3"
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
                            "action": "back"
                        }
                    ]
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
                    "action": "back"
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
