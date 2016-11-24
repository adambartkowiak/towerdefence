/**
 * Created by adambartkowiak on 30/5/16.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class ObjectiveModuleView
 * @constructor
 * @param {editor.controller.ObjectiveModuleController} objectiveModuleController
 */
editor.view.ObjectiveModuleView = function ObjectiveModuleView(objectiveModuleController) {

    /**
     * @property {editor.controller.ObjectiveModuleController} _objectiveModuleController
     * @private
     */
    this._objectiveModuleController = objectiveModuleController;

    this._cancelFunctionPointer = null;

    this._acceptFunctionPointer = null;
};

Utils.inherits(editor.view.ObjectiveModuleView, Object);

/**
 * @method show
 * @public
 */
editor.view.ObjectiveModuleView.prototype.show = function show() {
    var moduleWindowDiv = document.getElementById("module-div"),
        innerHtmlCode = document.getElementById("HTMLObjectiveModule").innerHTML,
        closeButton,
        cancelButton,
        acceptButton,
        that = this;

    //show element
    $(moduleWindowDiv).removeClass("hidden");

    //set inner HTML
    moduleWindowDiv.innerHTML = innerHtmlCode;

    //add close action
    closeButton = document.getElementById("objective-module-close-button");
    closeButton.addEventListener("click", function () {
        moduleWindowDiv.innerHTML = "";
        $(moduleWindowDiv).addClass("hidden");
    });

    //add objective button
    var objectiveListAddButton = document.getElementById("objective-list-add-button");
    objectiveListAddButton.addEventListener("click", function () {
        that._objectiveModuleController.addObjective()
        that.show();
    });

    this.showObjectiveList();
};

/**
 * @method showObiectiveList
 * @public
 */
editor.view.ObjectiveModuleView.prototype.showObjectiveList = function showObjectiveList() {

    var objectiveListModel = worldModel.getObjectiveListModel();
    var objectiveListContent = document.getElementById("objective-list-content");
    var objectiveListElement = null;
    var objectiveModel = null;
    var removeIconElement = null;

    var template = document.createElement("template");

    for (var i = 0; i < objectiveListModel.length(); i++) {

        objectiveModel = objectiveListModel.getElement(i);
        template.innerHTML = "<a href=\"#\" class=\"list-group-item my-list-group-item\"> <p id=\"my-list-item-remove-" + i + "\"class=\"glyphicon glyphicon-trash my-list-item-remove\" aria-hidden=\"true\"><\/p> <p class=\"glyphicon glyphicon-pencil my-list-item-edit\" aria-hidden=\"true\"><\/p> <span>Change Time<\/span> <\/a>";

        objectiveListElement = template.content.firstChild;
        objectiveListElement.getElementsByTagName("span")[0].textContent = objectiveModel.getName();
        objectiveListContent.appendChild(template.content.firstChild);

        //addEventListners
        objectiveListElement.addEventListener("click", this._createFunctionShowObjectiveConfiguration(this, objectiveModel.getId(), objectiveListModel));

        removeIconElement = document.getElementById("my-list-item-remove-" + i);
        removeIconElement.addEventListener("click", this._createFunctionRemoveObjective(this, objectiveModel.getId(), objectiveListModel));
    }

};

/**
 * @method showObjectiveConfiguration
 * @private
 * @param {string} objectiveId
 */
editor.view.ObjectiveModuleView.prototype.showObjectiveConfiguration = function showObjectiveConfiguration(objectiveId) {

    var objectiveListModel = worldModel.getObjectiveListModel(),
        objectiveModuleConfigurationSpan = document.getElementById("objective-module-configuration-span"),
        objectiveModuleConfigurationForm = document.getElementById("objective-module-configuration-form"),
        objectiveModuleConfigurationName = document.getElementById("objective-module-configuration-name"),
        objectiveModuleConfigurationDescription = document.getElementById("objective-module-configuration-description"),
        objectiveModuleConfigurationAcceptButton = document.getElementById("objective-module-configuration-accept-button"),
        objectiveModuleConfigurationCancelButton = document.getElementById("objective-module-configuration-cancel-button"),
        objectiveModel = objectiveListModel.getElementById(objectiveId),
        that = this;

    if (objectiveModel === null) {
        return;
    }

    this._objectiveModuleController.setEditingObjectiveId(objectiveId);

    $(objectiveModuleConfigurationSpan).addClass("hidden");

    $(objectiveModuleConfigurationForm).removeClass("hidden");
    objectiveModuleConfigurationName.value = objectiveModel.getName();
    objectiveModuleConfigurationDescription.value = objectiveModel.getMessage();

    //cancelFunction - remove event
    if (this._cancelFunctionPointer !== null){
        objectiveModuleConfigurationCancelButton.removeEventListener("click", this._cancelFunctionPointer);
    }

    //cancelFunction - add event
    this._cancelFunctionPointer = this._createFunctionCancelEdit(this, objectiveId);
    objectiveModuleConfigurationCancelButton.addEventListener("click", this._cancelFunctionPointer);

    //acceptFunction - remove event
    if (this._acceptFunctionPointer !== null){
        objectiveModuleConfigurationAcceptButton.removeEventListener("click", this._acceptFunctionPointer);
    }

    //acceptFunction - add event
    this._acceptFunctionPointer = this._createFunctionAcceptEdit(this, objectiveId, objectiveModuleConfigurationName, objectiveModuleConfigurationDescription);
    objectiveModuleConfigurationAcceptButton.addEventListener("click", this._acceptFunctionPointer);
};

/**
 * @method _createFunctionShowObjectiveConfiguration
 * @private
 * @param {editor.view.ObjectiveModuleView} that
 * @param {string} id
 */
editor.view.ObjectiveModuleView.prototype._createFunctionShowObjectiveConfiguration = function _createFunctionShowObjectiveConfiguration(that, id) {

    return function () {
        console.log(arguments, id);

        $("#objective-list .list-group-item.active").removeClass("active");
        $(this).addClass("active");

        that.showObjectiveConfiguration(id);

        Utils.cancelBubble(event);
    };
};

/**
 * @method _createFunctionRemoveObjective
 * @private
 * @param {editor.view.ObjectiveModuleView} that
 * @param {string} id
 */
editor.view.ObjectiveModuleView.prototype._createFunctionRemoveObjective = function _createFunctionRemoveObjective(that, id) {

    return function () {
        console.log(arguments, "REMOVE: " + id);
        Utils.cancelBubble(event);
        that._objectiveModuleController.removeObjectiveById(id);
        that.show();
    };
};

/**
 * @method _createFunctionCancelEdit
 * @private
 * @param {editor.view.ObjectiveModuleView} that
 * @param {string} id
 */
editor.view.ObjectiveModuleView.prototype._createFunctionCancelEdit = function _createFunctionCancelEdit(that, id) {

    return function () {
        that.showObjectiveConfiguration(id);
    };
};

/**
 * @method _createFunctionAcceptEdit
 * @private
 * @param {editor.view.ObjectiveModuleView} that
 * @param {string} id
 * @param {HTMLElement} nameInput
 * @param {HTMLElement} descriptionInput
 */
editor.view.ObjectiveModuleView.prototype._createFunctionAcceptEdit = function _createFunctionAcceptEdit(that, id, nameInput, descriptionInput) {

    return function () {
        that._objectiveModuleController.saveObjective(id, nameInput.value, descriptionInput.value);
        that.showObjectiveConfiguration(id);

    };
};