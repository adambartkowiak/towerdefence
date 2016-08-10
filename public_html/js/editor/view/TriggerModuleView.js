/**
 * Created by adambartkowiak on 30/5/16.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class TriggerModuleView
 * @constructor
 * @param {editor.controller.TriggerModuleController} triggerModuleController
 */
editor.view.TriggerModuleView = function TriggerModuleView(triggerModuleController) {

    /**
     * @param {editor.controller.TriggerModuleController} _triggerModuleController
     * @private
     */
    this._triggerModuleController = triggerModuleController;


    /**
     * @param {node} _lassClickedNode
     * @private
     */
    this._lassClickedNode = null;

};

Utils.inherits(editor.view.TriggerModuleView, Object);

/**
 * @method show
 * @public
 */
editor.view.TriggerModuleView.prototype.show = function show() {
    var moduleWindowDiv = document.getElementById("module-div"),
        innerHtmlCode = document.getElementById("HTMLTriggerModule").innerHTML,
        closeButton,
        that = this;

    //show element
    $(moduleWindowDiv).removeClass("hidden");

    //set inner HTML
    moduleWindowDiv.innerHTML = innerHtmlCode;

    //add close action
    closeButton = document.getElementById("trigger-module-close-button");
    closeButton.addEventListener("click", function () {
        moduleWindowDiv.innerHTML = "";
        $(moduleWindowDiv).addClass("hidden");
    });

    //add add trigger button
    var triggerListAddButton = document.getElementById("trigger-list-add-button");
    triggerListAddButton.addEventListener("click", function () {
        that._triggerModuleController.addTrigger()
    });

    this.showTriggerList();
};

/**
 * @method showTriggerList
 * @public
 */
editor.view.TriggerModuleView.prototype.showTriggerList = function showTriggerList() {

    var triggerListModel = worldModel.getTriggerListModel();
    var triggerListContent = document.getElementById("trigger-list-content");
    var triggerListElement = null;
    var triggerModel = null;
    var removeIconElement = null;

    var template = document.createElement("template");

    for (var i = 0; i < triggerListModel.length(); i++) {

        triggerModel = triggerListModel.getElement(i);
        template.innerHTML = "<a href=\"#\" class=\"list-group-item my-list-group-item\"> <p id=\"my-list-item-remove-" + i + "\"class=\"glyphicon glyphicon-trash my-list-item-remove\" aria-hidden=\"true\"><\/p> <p class=\"glyphicon glyphicon-pencil my-list-item-edit\" aria-hidden=\"true\"><\/p> <span>Change Time<\/span> <\/a>";

        triggerListElement = template.content.firstChild;
        triggerListElement.getElementsByTagName("span")[0].textContent = triggerModel.getName();
        triggerListContent.appendChild(template.content.firstChild);

        //addEventListners
        triggerListElement.addEventListener("click", this._createFunctionShowTriggerConfiguration(this, triggerModel.getId(), triggerListModel));

        removeIconElement = document.getElementById("my-list-item-remove-" + i);
        removeIconElement.addEventListener("click", this._createFunctionRemoveTrigger(this, triggerModel.getId(), triggerListModel));

    }

};

/**
 * @method showTriggerConfiguration
 * @public
 * @param {String} triggerId
 */
editor.view.TriggerModuleView.prototype.showTriggerConfiguration = function showTriggerConfiguration(triggerId) {

    var triggerListModel = worldModel.getTriggerListModel(),
        triggerConfigurationDiv = document.getElementById("trigger-configuration"),
        triggerModel = triggerListModel.getElementById(triggerId),
        nameHTMLElement,
        idHTMLElement,
        divForTree,
        treeRootUl;

    if (triggerModel === null) {
        return;
    }

    this._triggerModuleController.setEditingTriggerId(triggerId);

    triggerConfigurationDiv.innerHTML = "";

    this._createAddButtons();


    //Creating Tree Root
    divForTree = document.createElement("div");
    divForTree.id = "triggerDivTree";

    treeRootUl = document.createElement("ul");
    divForTree.appendChild(treeRootUl);

    triggerConfigurationDiv.appendChild(divForTree);


    //Create Fancy Tree
    var that = this;
    $("#triggerDivTree").fancytree({

        click: function (event, data) {

            var rootNode,
                currentNode = data.node,
                nodeLevel = 0;

            while (currentNode.parent.title !== "root") {
                currentNode = currentNode.parent;
                nodeLevel++;
            }
            rootNode = currentNode;

            if (data.targetType === "title") {
                if (nodeLevel >= 1 && rootNode.title == "Event") {
                    that._triggerModuleController.showEditGameEventView(data.node.key);
                } else if (nodeLevel >= 2 && rootNode.title == "Condition") {
                    that._triggerModuleController.showEditAttributeView(data.node.key);
                } else if (nodeLevel === 1 && rootNode.title == "Condition") {
                    that._triggerModuleController.showEditConditionView(data.node.key);
                } else if (nodeLevel >= 1 && rootNode.title == "Action") {
                    that._triggerModuleController.showEditAttributeView(data.node.key);
                }
            }

            that._lassClickedNode = data.node;

        }
    });


    //Add elements to tree
    var tree = $("#triggerDivTree").fancytree("getTree"),
        rootNode = tree.getRootNode();

    //Add name
    rootNode.addChildren({
        title: triggerModel.getName(),
        key: "tree-name"
    });

    //Add id
    rootNode.addChildren({
        title: triggerModel.getId() + " (trigger id)",
        key: "tree-id"
    });

    this._createTreeNodesForGameEventListModel(rootNode, triggerModel.getGameEventListModel());
    this._createTreeNodesForConditionListModel(rootNode, triggerModel.getConditionListModel());
    this._createTreeNodesForActionListModel(rootNode, triggerModel.getActionListModel());

};

/**
 * @method _createFunctionShowTriggerConfiguration
 * @private
 * @param {editor.view.TriggerModuleView} that
 * @param {string} id
 */
editor.view.TriggerModuleView.prototype._createFunctionShowTriggerConfiguration = function _createFunctionShowTriggerConfiguration(that, id) {

    return function () {
        console.log(arguments, id);

        $("#trigger-list .list-group-item.active").removeClass("active");
        $(this).addClass("active");

        that.showTriggerConfiguration(id);

        Utils.cancelBubble(event);
    };
};

/**
 * @method _createFunctionRemoveTrigger
 * @private
 * @param {editor.view.TriggerModuleView} that
 * @param {string} id
 */
editor.view.TriggerModuleView.prototype._createFunctionRemoveTrigger = function _createFunctionRemoveTrigger(that, id) {

    return function () {
        console.log(arguments, "REMOVE: " + id);
        Utils.cancelBubble(event);
        that._triggerModuleController.removeTriggerById(id);
        that.show();
    };
};

/**
 * @method _createTreeNodesForGameEventListModel
 * @public
 * @param {FancytreeNode} node
 * @param {app.model.GameEventListModel} gameEventArray
 */
editor.view.TriggerModuleView.prototype._createTreeNodesForGameEventListModel = function _createTreeNodesForGameEventListModel(node, gameEventListModel) {

    var gameEventModel,
        gameEventNode = node.addChildren({
            title: "Event",
            key: "tree-event",
            folder: true
        });

    for (var i = 0; i < gameEventListModel.length(); i++) {

        gameEventModel = gameEventListModel.getElement(i);

        gameEventNode.addChildren({
            title: Utils.getPropertyNameByValue(app.enum.GameEventEnum, gameEventModel.getGameEventEnum()),
            key: gameEventModel.getId()
        });

    }

};

/**
 * @method _createTreeNodesForConditionListModel
 * @public
 * @param {FancytreeNode} node
 * @param {app.model.ValueListModel} conditionListModel
 */
editor.view.TriggerModuleView.prototype._createTreeNodesForConditionListModel = function _createTreeNodesForConditionListModel(node, conditionListModel) {

    var conditionNode = node.addChildren({
        title: "Condition",
        key: "tree-condition",
        folder: true
    });

    for (var i = 0; i < conditionListModel.length(); i++) {
        this._createTreeNodesForFunction(conditionNode, conditionListModel.getElement(i));
    }

};

/**
 * @method _createTreeNodesForFunction
 * @public
 * @param {FancytreeNode} node
 * @param {app.model.function.AbstractValueModel} functionModel
 * @param {number} insertIndex
 */
editor.view.TriggerModuleView.prototype._createTreeNodesForFunction = function _createTreeNodesForFunction(node, functionModel, insertIndex) {

    var functionNode = node.addChildren({
        title: "Function: " + Utils.getPropertyNameByValue(app.enum.FunctionEnum, functionModel.getFunctionEnumValue()),
        key: functionModel.getId()
    }, insertIndex);


    if (functionModel.getFunctionAttributes().length > 0) {
        for (var i = 0; i < functionModel.getFunctionAttributes().length; i++) {

            this._createTreeNodeForAttribute(functionNode, functionModel.getFunctionAttributes()[i]);

        }
    }

};

/**
 * @method _createTreeNodeForAttribute
 * @public
 * @param {FancytreeNode} node
 * @param {app.model.function.AbstractValueModel} abstractValue
 * @param {number} insertIndex
 */
editor.view.TriggerModuleView.prototype._createTreeNodeForAttribute = function _createTreeNodeForAttribute(node, abstractValue, insertIndex) {

    if (abstractValue instanceof app.model.function.AttributeModel) {

        node.addChildren({
            title: abstractValue.constructor.name + " (" + abstractValue.getValue() + ")",
            key: abstractValue.getId()
        }, insertIndex);

    } else if (abstractValue instanceof app.model.function.AbstractFunctionModel) {

        this._createTreeNodesForFunction(node, abstractValue, insertIndex);
    }

};

/**
 * @method _createTreeNodesForActionListModel
 * @public
 * @param {FancytreeNode} node
 * @param {app.model.ValueListModel} actionListModel
 */
editor.view.TriggerModuleView.prototype._createTreeNodesForActionListModel = function _createTreeNodesForActionListModel(node, actionListModel) {


    var actionNode = node.addChildren({
        title: "Action",
        key: "tree-action",
        folder: true
    });

    for (var i = 0; i < actionListModel.length(); i++) {
        this._createTreeNodesForFunction(actionNode, actionListModel.getElement(i));
    }
};

/**
 * @method _createAddButtons
 * @public
 */
editor.view.TriggerModuleView.prototype._createAddButtons = function _createAddButtons() {
    var triggerConfigurationDiv = document.getElementById("trigger-configuration"),
        addEventButton = document.createElement("button"),
        addConditionButton = document.createElement("button"),
        addActionButton = document.createElement("button"),
        that = this;

    addEventButton.textContent = "ADD EVENT";
    addConditionButton.textContent = "ADD CONDITION";
    addActionButton.textContent = "ADD ACTION";

    $(addEventButton).addClass("btn").addClass("btn-default");
    $(addConditionButton).addClass("btn").addClass("btn-default");
    $(addActionButton).addClass("btn").addClass("btn-default");

    addEventButton.addEventListener("click", function () {
        that._triggerModuleController.showAddGameEventView();
    });

    addConditionButton.addEventListener("click", function () {
        that._triggerModuleController.addCondition();
    });

    addActionButton.addEventListener("click", function () {
        that._triggerModuleController.addAction();
    });

    triggerConfigurationDiv.appendChild(addEventButton);
    triggerConfigurationDiv.appendChild(addConditionButton);
    triggerConfigurationDiv.appendChild(addActionButton);
};

/**
 * @method reloadTree
 * @public
 */
editor.view.TriggerModuleView.prototype.reloadTree = function reloadTree() {
    console.log("odswiez drzewko eventowe");


    //@TODO: dopisac updatowanie node'a

    this.showTriggerConfiguration(this._triggerModuleController.getEditingTriggerId());
};