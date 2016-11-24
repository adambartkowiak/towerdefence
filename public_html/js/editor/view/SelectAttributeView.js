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
        customValueSelectValueTypeDropDown,
        selectAttributeCustomValueStringItem,
        selectAttributeCustomValueNumberItem,
        selectAttributeCustomValueBooleanItem,
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

    //get custom value elments
    customValueSelectValueTypeDropDown = document.getElementById("select-attribute-value-selectvaluetypedropdown");
    selectAttributeCustomValueStringItem = document.getElementById("select-attribute-value-selectvaluetypedropdown-string");
    selectAttributeCustomValueNumberItem = document.getElementById("select-attribute-value-selectvaluetypedropdown-number");
    selectAttributeCustomValueBooleanItem = document.getElementById("select-attribute-value-selectvaluetypedropdown-boolean");

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

            var customValueText = document.getElementById("select-attribute-value-text-input").value;
            var customValueNumber = document.getElementById("select-attribute-value-number-input").value;
            var customValueBoolean = $('#select-attribute-value-boolean-div input:radio:checked').val();
            var customValue = 0;

            if (!$("#select-attribute-value-string-div").hasClass("hidden")) {
                customValue = customValueText;
            } else if (!$("#select-attribute-value-number-div").hasClass("hidden")) {
                customValue = parseInt(customValueNumber);
            } else if (!$("#select-attribute-value-boolean-div").hasClass("hidden")) {
                customValue = (customValueBoolean === 'true');
            }

            that._selectAttributeController.onAccept(new editor.model.SelectAttributeModel(editor.enum.SelectAttributeEnum.CUSTOM_VALUE, customValue));

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

    selectAttributeCustomValueStringItem.addEventListener("click", function () {
        var formGroups,
            formGroup,
            index;

        customValueSelectValueTypeDropDown.innerHTML = "String <span class=\"caret\"></span>";

        //show selected formGroup and hidden rest
        formGroups = customValueDiv.getElementsByClassName("form-group");
        for (index = 0; index < formGroups.length; index++) {

            formGroup = formGroups[index];

            if (formGroup.id === "select-attribute-value-string-div") {
                $(formGroup).removeClass("hidden");
            } else {
                $(formGroup).addClass("hidden");
            }
        }
    });

    selectAttributeCustomValueNumberItem.addEventListener("click", function () {
        var formGroups,
            formGroup,
            index;

        customValueSelectValueTypeDropDown.innerHTML = "Number <span class=\"caret\"></span>";

        //show selected formGroup and hidden rest
        formGroups = customValueDiv.getElementsByClassName("form-group");
        for (index = 0; index < formGroups.length; index++) {

            formGroup = formGroups[index];

            if (formGroup.id === "select-attribute-value-number-div") {
                $(formGroup).removeClass("hidden");
            } else {
                $(formGroup).addClass("hidden");
            }
        }
    });

    selectAttributeCustomValueBooleanItem.addEventListener("click", function () {
        var formGroups,
            formGroup,
            index;

        customValueSelectValueTypeDropDown.innerHTML = "Boolean <span class=\"caret\"></span>";

        //show selected formGroup and hidden rest
        formGroups = customValueDiv.getElementsByClassName("form-group");
        for (index = 0; index < formGroups.length; index++) {

            formGroup = formGroups[index];

            if (formGroup.id === "select-attribute-value-boolean-div") {
                $(formGroup).removeClass("hidden");
            } else {
                $(formGroup).addClass("hidden");
            }
        }
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