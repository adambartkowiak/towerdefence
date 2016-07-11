/**
 * Created by adambartkowiak on 30/5/16.
 */

'use strict';
Utils.namespace("editor.view");

/**
 * @namespace editor.view
 * @class SelectGameEventView
 * @constructor
 */
editor.view.SelectGameEventView = function SelectGameEventView(selectGameEventController) {

    /**
     * @param {editor.controller.AbstractSelectGameEventController} _selectGameEventController
     * @private
     */
    this._selectGameEventController = selectGameEventController;

    /**
     * @param {String} _selectedGameEventName
     * @private
     */
    this._selectedGameEventName = null;
};

Utils.inherits(editor.view.SelectGameEventView, Object);

/**
 * @method show
 * @public
 */
editor.view.SelectGameEventView.prototype.show = function show() {

    var body = document.getElementsByTagName("body")[0],
        windowDiv = document.createElement("div"),
        innerHtmlCode = document.getElementById("HTMLSelectGameEvent").innerHTML,
        closeButton,
        cancelButton,
        acceptButton,
        listGroupHtml,
        that = this;

    //set style and inner HTML
    windowDiv.setAttribute("id", "select-game-event-view");
    windowDiv.innerHTML = innerHtmlCode;

    body.appendChild(windowDiv);

    listGroupHtml = document.getElementById("game-event-list-group");
    this._createGameEventList(listGroupHtml);

    //add close action
    closeButton = document.getElementById("select-game-event-close-button");
    closeButton.addEventListener("click", function () {
        that.destroy();
    });

    //add cancel action
    cancelButton = document.getElementById("select-game-event-cancel-button");
    cancelButton.addEventListener("click", function () {
        that.destroy();
    });

    //add accept action
    acceptButton = document.getElementById("select-game-event-accept-button");
    acceptButton.addEventListener("click", function () {

        that._selectGameEventController.onAccept(that._selectedGameEventName);

        that.destroy();
    });

};

/**
 * @method destroy
 * @public
 */
editor.view.SelectGameEventView.prototype.destroy = function destroy() {
    var body = document.getElementsByTagName("body")[0],
        windowDiv = document.getElementById("select-game-event-view");

    body.removeChild(windowDiv);
};

/**
 * @method _createGameEventList
 * @public
 */
editor.view.SelectGameEventView.prototype._createGameEventList = function _createGameEventList(listGroupHtml) {

    var resultHtml = "",
        i = 0,
        listElement,
        template = document.createElement("template");

    for (var name in app.enum.GameEventEnum) {

        template.innerHTML = "<a href=\"#\" class=\"list-group-item\" id=\"select-game-event-" + i + "\">" + name + "<\/a>";

        listGroupHtml.appendChild(template.content.firstChild);

        listElement = document.getElementById("select-game-event-" + i);
        listElement.addEventListener("click", this._createFunctionClickGameEvent(this));

        i++;
    }

    return resultHtml;
};

/**
 * @method _createFunctionClickGameEvent
 * @public
 */
editor.view.SelectGameEventView.prototype._createFunctionClickGameEvent = function _createFunctionClickGameEvent(that) {

    return function () {

        $("#select-game-event-view .list-group-item.active").removeClass("active");
        $(this).addClass("active");

        that._selectedGameEventName = this.innerText;

        Utils.cancelBubble(event);
    };

};