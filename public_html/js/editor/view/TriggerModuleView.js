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
        rootUl;

    if (triggerModel === null) {
        return;
    }

    this._triggerModuleController.setEditingTriggerId(triggerId);

    triggerConfigurationDiv.innerHTML = "";

    divForTree = document.createElement("div");
    divForTree.id = "gameEventArrayDivTree";

    rootUl = document.createElement("ul");
    divForTree.appendChild(rootUl);

    //name
    nameHTMLElement = document.createElement("li");
    nameHTMLElement.textContent = triggerModel.getName();
    rootUl.appendChild(nameHTMLElement);

    //id
    idHTMLElement = document.createElement("li");
    idHTMLElement.textContent = triggerModel.getId() + " (trigger id)";
    rootUl.appendChild(idHTMLElement);

    //event && condition && action
    this._createHTMLforEventListModel(rootUl, triggerModel.getGameEventListModel());
    this._createHTMLforConditionListModel(rootUl, triggerModel.getConditionListModel());
    this._createHTMLforActionArray(rootUl, triggerModel.getCommandArray());


    //buttons addRemove
    this._createAddEventButton();
    // this._createAddConditionButton();
    // this._createAddCommandButton();

    triggerConfigurationDiv.appendChild(divForTree);

    // return;

    var that = this;
    $("#gameEventArrayDivTree").fancytree({
        // extensions: ["edit"],
        // edit: {
        //     // Available options with their default:
        //     adjustWidthOfs: 4,   // null: don't adjust input size to content
        //     inputCss: {minWidth: "3em"},
        //     triggerCancel: ["esc", "tab", "click"],
        //     triggerStart: ["f2", "dblclick", "shift+click", "mac+enter"],
        //     // beforeEdit: $.noop,  // Return false to prevent edit mode
        //     // edit: $.noop,        // Editor was opened (available as data.input)
        //     // beforeClose: $.noop, // Return false to prevent cancel/save (data.input is available)
        //     // save: $.noop         // Save data.input.val() or return false to keep editor open
        //     // close: $.noop,       // Editor was removed
        //     beforeEdit: function (event, data) {
        //         // `data.node` is about to be edited.
        //         // Return false to prevent this.
        //         console.log(event);
        //         console.log(data);
        //
        //         var result = true;
        //         var searchingString = "(trigger id)";
        //         if (data.orgTitle.lastIndexOf(searchingString) !== -1 && data.orgTitle.lastIndexOf(searchingString) === data.orgTitle.length - searchingString.length) {
        //             alert("You can't edit \"trigger id\" it is set automatycly by the system.");
        //             result = false
        //         }
        //
        //         return result;
        //     }
        // },

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
                }
            }

            that._lassClickedNode = data.node;

            //jak wszystkoe bedzie mialo ID to latwo bedzie sobie to wyszukac i nie bedzie zalezne od interfejsu graficznego !!!
            //Dodatkowo id moze byc wazne w innych miejscach,

        }
    });


};

/**
 * @method _createFunctionShowTriggerConfiguration
 * @private
 */
editor.view.TriggerModuleView.prototype._createFunctionShowTriggerConfiguration = function _createFunctionShowTriggerConfiguration(that, id, triggerListModel) {

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
 */
editor.view.TriggerModuleView.prototype._createFunctionRemoveTrigger = function _createFunctionRemoveTrigger(that, id, triggerListModel) {

    return function () {
        console.log(arguments, "REMOVE: " + id);
        Utils.cancelBubble(event);
        that._triggerModuleController.removeTriggerById(id);
        that.show();
    };
};

/**
 * @method _createHTMLforEventListModel
 * @public
 * @param {HTMLElement} rootUl
 * @param {app.model.GameEventListModel} gameEventArray
 */
editor.view.TriggerModuleView.prototype._createHTMLforEventListModel = function _createHTMLforEventListModel(rootUl, gameEventListModel) {


    var rootLi = document.createElement("li");
    rootLi.textContent = "Event";

    var HTMLUl = document.createElement("ul");
    var HTMLli = null;

    var gameEventModel;

    for (var i = 0; i < gameEventListModel.length(); i++) {

        gameEventModel = gameEventListModel.getElement(i);

        HTMLli = document.createElement("li");
        HTMLli.textContent = Utils.getPropertyNameByValue(app.enum.GameEventEnum, gameEventModel.getGameEventEnum());
        HTMLli.id = gameEventModel.getId();

        HTMLUl.appendChild(HTMLli);
    }

    rootLi.appendChild(HTMLUl);
    rootUl.appendChild(rootLi);
};

/**
 * @method _createHTMLforConditionListModel
 * @public
 * @param {HTMLElement} rootUl
 * @param {app.model.ValueListModel} conditionListModel
 */
editor.view.TriggerModuleView.prototype._createHTMLforConditionListModel = function _createHTMLforConditionListModel(rootUl, conditionListModel) {


    var rootLi = document.createElement("li");
    rootLi.textContent = "Condition";

    var HTMLUl = document.createElement("ul");

    for (var i = 0; i < conditionListModel.length(); i++) {
        this._createHTMLforFunction(HTMLUl, conditionListModel.getElement(i));
    }

    rootLi.appendChild(HTMLUl);
    rootUl.appendChild(rootLi);
};

/**
 * @method _createHTMLforFunction
 * @public
 * @param {HTMLElement} rootUl
 * @param {app.model.function.AbstractValue} functionModel
 */
editor.view.TriggerModuleView.prototype._createHTMLforFunction = function _createHTMLforFunction(rootUl, functionModel) {
    var HTMLli = document.createElement("li");
    HTMLli.textContent = "Function: " + Utils.getPropertyNameByValue(app.enum.FunctionEnum, functionModel.getFunctionEnumValue());
    HTMLli.id = functionModel.getId();

    if (functionModel.getFunctionAttributes().length > 0) {
        var HTMLUl = document.createElement("ul");
        for (var i = 0; i < functionModel.getFunctionAttributes().length; i++) {

            if (functionModel.getFunctionAttributes()[i] instanceof app.model.function.Attribute) {
                var insideLi = document.createElement("li");
                insideLi.textContent = functionModel.getFunctionAttributes()[i].constructor.name + " (" + functionModel.getFunctionAttributes()[i].getValue() + ")";
                insideLi.id = functionModel.getFunctionAttributes()[i].getId();
                HTMLUl.appendChild(insideLi);

            } else if (functionModel.getFunctionAttributes()[i] instanceof app.model.function.AbstractFunction) {
                this._createHTMLforFunction(HTMLUl, functionModel.getFunctionAttributes()[i]);
            }

        }
        HTMLli.appendChild(HTMLUl);
    }

    rootUl.appendChild(HTMLli);
};

/**
 * @method _createHTMLforActionArray
 * @public
 * @param {HTMLElement} rootUl
 * @param {Array} commandArray
 */
editor.view.TriggerModuleView.prototype._createHTMLforActionArray = function _createHTMLforActionArray(rootUl, commandArray) {


    var rootLi = document.createElement("li");
    rootLi.textContent = "Command";

    var HTMLUl = document.createElement("ul");
    var HTMLli = null;

    for (var i = 0; i < commandArray.length; i++) {
        HTMLli = document.createElement("li");
        HTMLli.textContent = "Command: " + commandArray[i].constructor.name;

        HTMLUl.appendChild(HTMLli);
    }

    rootLi.appendChild(HTMLUl);

    rootUl.appendChild(rootLi);
};

/**
 * @method _createAddEventButton
 * @public
 */
editor.view.TriggerModuleView.prototype._createAddEventButton = function _createAddEventButton() {
    var triggerConfigurationDiv = document.getElementById("trigger-configuration"),
        addEventButton = document.createElement("button"),
        addConditionButton = document.createElement("button"),
        addCommandButton = document.createElement("button"),
        that = this;

    addEventButton.textContent = "ADD EVENT";
    addConditionButton.textContent = "ADD CONDITION";
    addCommandButton.textContent = "ADD COMMAND";

    $(addEventButton).addClass("btn").addClass("btn-default");
    $(addConditionButton).addClass("btn").addClass("btn-default");
    $(addCommandButton).addClass("btn").addClass("btn-default");

    addEventButton.addEventListener("click", function () {
        that._triggerModuleController.showAddGameEventView();
    });

    addConditionButton.addEventListener("click", function () {
        that._triggerModuleController.addCondition();
    });

    triggerConfigurationDiv.appendChild(addEventButton);
    triggerConfigurationDiv.appendChild(addConditionButton);
    triggerConfigurationDiv.appendChild(addCommandButton);
};

/**
 * @method reloadTree
 * @public
 */
editor.view.TriggerModuleView.prototype.reloadTree = function reloadTree(){
    console.log("odswiez drzewko eventowe");


    //@TODO: dopisac updatowanie node'a

    this.showTriggerConfiguration(this._triggerModuleController.getEditingTriggerId());
};