/**
 * Created by adambartkowiak on 3/7/16.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class SelectAttributeView
 * @constructor
 * @param {editor.controller.SelectAttributeController} selectAttributeController
 */
editor.view.SelectAttributeView = function SelectAttributeView(selectAttributeController) {

    /**
     * @param {editor.controller.SelectAttributeController} _selectAttributeController
     * @private
     */
    this._selectAttributeController = selectAttributeController;

    this._selectedPredefinedValueName = null;

    this._selectedFunctionName = null;

};

Utils.inherits(editor.view.SelectAttributeView, Object);

/**
 * @method show
 * @public
 */
editor.view.SelectAttributeView.prototype.show = function show() {

    var body = document.getElementsByTagName("body")[0],
        windowDiv = document.createElement("div"),
        innerHtmlCode = document.getElementById("HTMLSelectAttribute").innerHTML,
        closeButton,
        cancelButton,
        acceptButton,
        predefinedValueButton,
        customValueButton,
        variableButton,
        functionButton,
        predefinedValueDiv,
        customValueDiv,
        variableDiv,
        functionDiv,
        that = this;

    //set style and inner HTML
    windowDiv.setAttribute("id", "select-attribute-view");
    windowDiv.innerHTML = innerHtmlCode;

    body.appendChild(windowDiv);

    //get tabs buttons
    predefinedValueButton = document.getElementById("select-attribute-predefined-value-button");
    customValueButton = document.getElementById("select-attribute-custom-value-button");
    variableButton = document.getElementById("select-attribute-variable-button");
    functionButton = document.getElementById("select-attribute-function-button");

    //get tabs content
    predefinedValueDiv = document.getElementById("select-attribute-predefinedvalue-div");
    customValueDiv = document.getElementById("select-attribute-customvalue-div");
    variableDiv = document.getElementById("select-attribute-variable-div");
    functionDiv = document.getElementById("select-attribute-function-div");

    //create predefinedValues groupview
    this._createPredefinedValuesList(predefinedValueDiv);

    //create function groupview
    this._createFunctionList(functionDiv);

    //add close action
    closeButton = document.getElementById("select-attribute-close-button");
    closeButton.addEventListener("click", function () {
        that.destroy();
    });

    //add cancel action
    cancelButton = document.getElementById("select-attribute-cancel-button");
    cancelButton.addEventListener("click", function () {
        that.destroy();
    });

    //add accept action
    acceptButton = document.getElementById("select-attribute-accept-button");
    acceptButton.addEventListener("click", function () {

        if ($(predefinedValueButton).hasClass("active")) {

            that._selectAttributeController.onAccept(new editor.model.SelectAttributeModel(editor.enum.SelectAttributeEnum.PREDEFINED_VALUE, that._selectedPredefinedValueName));

        } else if ($(customValueButton).hasClass("active")) {

            var customValue = document.getElementById("select-attribute-value-text-input");
            that._selectAttributeController.onAccept(new editor.model.SelectAttributeModel(editor.enum.SelectAttributeEnum.CUSTOM_VALUE, customValue.value));

        } else if ($(variableButton).hasClass("active")) {

            //Nie da sie tego wybrać
            // that._selectAttributeController.onAccept(new editor.model.SelectAttributeModel(editor.enum.SelectAttributeEnum.VARIABLE, "VARIABLE VALUE"));

        } else if ($(functionButton).hasClass("active")) {

            that._selectAttributeController.onAccept(new editor.model.SelectAttributeModel(editor.enum.SelectAttributeEnum.FUNCTION, that._selectedFunctionName));
        }

        that.destroy();
    });

    predefinedValueButton.addEventListener("click", function () {
        $(predefinedValueButton).addClass("active");
        $(customValueButton).removeClass("active");
        $(variableButton).removeClass("active");
        $(functionButton).removeClass("active");

        $(predefinedValueDiv).removeClass("hidden");
        $(customValueDiv).addClass("hidden");
        $(variableDiv).addClass("hidden");
        $(functionDiv).addClass("hidden");

        $(acceptButton).prop('disabled', false);
    });

    customValueButton.addEventListener("click", function () {
        $(predefinedValueButton).removeClass("active");
        $(customValueButton).addClass("active");
        $(variableButton).removeClass("active");
        $(functionButton).removeClass("active");

        $(predefinedValueDiv).addClass("hidden");
        $(customValueDiv).removeClass("hidden");
        $(variableDiv).addClass("hidden");
        $(functionDiv).addClass("hidden");

        $(acceptButton).prop('disabled', false);
    });

    variableButton.addEventListener("click", function () {
        $(predefinedValueButton).removeClass("active");
        $(customValueButton).removeClass("active");
        $(variableButton).addClass("active");
        $(functionButton).removeClass("active");

        $(predefinedValueDiv).addClass("hidden");
        $(customValueDiv).addClass("hidden");
        $(variableDiv).removeClass("hidden");
        $(functionDiv).addClass("hidden");

        $(acceptButton).prop('disabled', true);
    });

    functionButton.addEventListener("click", function () {
        $(predefinedValueButton).removeClass("active");
        $(customValueButton).removeClass("active");
        $(variableButton).removeClass("active");
        $(functionButton).addClass("active");

        $(predefinedValueDiv).addClass("hidden");
        $(customValueDiv).addClass("hidden");
        $(variableDiv).addClass("hidden");
        $(functionDiv).removeClass("hidden");

        $(acceptButton).prop('disabled', false);
    });

};


/**
 * @method destroy
 * @public
 */
editor.view.SelectAttributeView.prototype.destroy = function destroy() {
    var body = document.getElementsByTagName("body")[0],
        windowDiv = document.getElementById("select-attribute-view");

    body.removeChild(windowDiv);
};

/**
 * @method _createPredefinedValuesList
 * @public
 */
editor.view.SelectAttributeView.prototype._createPredefinedValuesList = function _createPredefinedValuesList(listGroupHtml) {

    var resultHtml = "",
        i = 0,
        listElement,
        template = document.createElement("template");

    for (var name in app.enum.EntityPropertyEnum) {

        template.innerHTML = "<a href=\"#\" class=\"list-group-item\" id=\"select-attribute-predefinedvalue-" + i + "\">" + name + "<\/a>";

        listGroupHtml.appendChild(template.content.firstChild);

        listElement = document.getElementById("select-attribute-predefinedvalue-" + i);
        listElement.addEventListener("click", this._createFunctionClickPredefinedValue(this));

        i++;
    }

    return resultHtml;
};

/**
 * @method _createFunctionClickPredefinedValue
 * @public
 */
editor.view.SelectAttributeView.prototype._createFunctionClickPredefinedValue = function _createFunctionClickPredefinedValue(that) {

    return function () {

        $("#select-attribute-predefinedvalue-div .list-group-item.active").removeClass("active");
        $(this).addClass("active");

        that._selectedPredefinedValueName = this.innerText;

        Utils.cancelBubble(event);
    };

};

/**
 * @method _createFunctionList
 * @public
 */
editor.view.SelectAttributeView.prototype._createFunctionList = function _createFunctionList(listGroupHtml) {

    var resultHtml = "",
        i = 0,
        listElement,
        template = document.createElement("template");

    for (var name in app.enum.FunctionEnum) {

        template.innerHTML = "<a href=\"#\" class=\"list-group-item\" id=\"select-attribute-function-" + i + "\">" + name + "<\/a>";

        listGroupHtml.appendChild(template.content.firstChild);

        listElement = document.getElementById("select-attribute-function-" + i);
        listElement.addEventListener("click", this._createFunctionClickFunction(this));

        i++;
    }

    return resultHtml;
};

/**
 * @method _createFunctionClickFunction
 * @public
 */
editor.view.SelectAttributeView.prototype._createFunctionClickFunction = function _createFunctionClickFunction(that) {

    return function () {

        $("#select-attribute-function-div .list-group-item.active").removeClass("active");
        $(this).addClass("active");

        that._selectedFunctionName = this.innerText;

        Utils.cancelBubble(event);
    };

};