/**
 * Created by adambartkowiak on 30/5/16.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class NewMapModuleView
 * @constructor
 * @param {editor.controller.newMapModuleController} newMapModuleController
 */
editor.view.NewMapModuleView = function NewMapModuleView(newMapModuleController) {

    /**
     * @property {editor.controller.newMapModuleController} _newMapModuleController
     * @private
     */
    this._newMapModuleController = newMapModuleController;
};

Utils.inherits(editor.view.NewMapModuleView, Object);

/**
 * @method show
 * @public
 */
editor.view.NewMapModuleView.prototype.show = function show() {
    var moduleWindowDiv = document.getElementById("module-div"),
        innerHtmlCode = document.getElementById("HTMLNewMapModule").innerHTML,
        closeButton,
        cancelButton,
        acceptButton,
        that = this;

    //show element
    $(moduleWindowDiv).removeClass("hidden");

    //set inner HTML
    moduleWindowDiv.innerHTML = innerHtmlCode;

    //add close action
    closeButton = document.getElementById("create-map-module-close-button");
    closeButton.addEventListener("click", function () {
        moduleWindowDiv.innerHTML = "";
        $(moduleWindowDiv).addClass("hidden");
    });

    //add cancel action
    cancelButton = document.getElementById("create-map-module-cancel-button");
    cancelButton.addEventListener("click", function () {
        moduleWindowDiv.innerHTML = "";
        $(moduleWindowDiv).addClass("hidden");
    });

    //add accept action
    acceptButton = document.getElementById("create-map-module-accept-button");
    acceptButton.addEventListener("click", function () {

        var widthValue = document.getElementById("create-map-module-width-input").value;
        var heightValue = document.getElementById("create-map-module-height-input").value;

        if (!!that._newMapModuleController){
            that._newMapModuleController.createNewMap(widthValue, heightValue);
        }

        moduleWindowDiv.innerHTML = "";
        $(moduleWindowDiv).addClass("hidden");
    });
};
