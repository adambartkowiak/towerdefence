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
    this._elements = ["Jakis text", "Dwa", "Trzy", "cztery", 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, "back"];


    this._elements = [
        {
            "text": "Move",
            "icon": "assets/graphics/icons/moveicon.png",
            "action": "SetMoveAction"
        },
        {
            "text": "Cancel",
            "icon": "assets/graphics/icons/cancelicon.png",
            "action": "CancelAction"
        },
        {
            "text": "Hold",
            "icon": "assets/graphics/icons/holdicon.png",
            "action": "HoldAction"
        },
        {
            "text": "Patrol",
            "icon": "assets/graphics/icons/patrolicon.png",
            "action": "SetPatrolAction"
        },
        {
            "text": "Attack",
            "icon": "assets/graphics/icons/attackicon.png",
            "action": "SetAttackAction"
        },
        {
            "text": "Gather",
            "icon": "assets/graphics/icons/gathericon.png",
            "action": "SetGatherAction"
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
                    "action": "SetBuildBaseAction"
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
            "action": "TrainWorkerAction"
        },
        {
            "text": "Warrior",
            "icon": null,
            "action": "TrainWarriorAction"
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
