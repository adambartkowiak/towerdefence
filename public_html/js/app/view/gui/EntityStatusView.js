/**
 * Created by adambartkowiak on 18/10/15.
 */

'use strict';

var app = app || {};
app.view = app.view || {};
app.view.gui = app.view.gui || {};

var Utils = Utils || {};

/**
 * @namespace app.view.gui
 * @class EntityStatusView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {app.model.EntityListModel} entityListModel
 */
app.view.gui.EntityStatusView = function EntityStatusView(x, y, width, height, entityListModel) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbsoluteLayoutView.call(this, x, y, width, height);


    this._entityListModel = entityListModel;

    this.update();

};

Utils.inherits(app.view.gui.EntityStatusView, support.view.AbsoluteLayoutView);

/**
 * @method draw
 * @public
 * @param {HTMLCanvasElement} canvas
 */
app.view.gui.EntityStatusView.prototype.draw = function draw(canvas){

    support.view.AbsoluteLayoutView.prototype.draw.call(this, canvas);

    // var parentX = 0,
    //     parentY = 0;
    //
    // if (this.getParentViewGroup() !== null){
    //     parentX = this.getParentViewGroup().getX();
    //     parentY = this.getParentViewGroup().getY();
    // }
    //
    // var canvasContext = canvas.getContext("2d");
    //
    // canvasContext.fillStyle = "rgba(255, 255, 255, 1)"
    // canvasContext.fillText("app.view.gui.EntityStatusView", parentX + this.getX(), parentY + this.getY());
    //
    // canvasContext.fillText("count: " + this._entityListModel.length(), parentX + this.getX(), parentY + this.getY() + 20);
    //
    // if (this._entityListModel.length() === 1){
    //
    //     var entity = this._entityListModel.getElement(0);
    //
    //     //draw loading bar
    //     canvasContext.beginPath();
    //     canvasContext.strokeStyle = '#FFFFFF';
    //     canvasContext.rect(parentX + this.getX() + 50, parentY + this.getY()+50, 400, 20);
    //     canvasContext.stroke();
    //
    //     if (entity.getBuildList() !== null && entity.getBuildList().length() > 0){
    //
    //         var buildingEntity = entity.getBuildList().getElement(0);
    //
    //         canvasContext.fillRect(parentX + this.getX() + 50, parentY + this.getY()+50, buildingEntity.getCurrentBuildTime()/buildingEntity.getBuildTime() *400, 20);
    //
    //     }
    //
    // }

};

/**
 * @method updateMenu
 * @public
 */
app.view.gui.EntityStatusView.prototype.update = function update() {

    //var view, i;
    //
    //var currentElementsPath = this._actionMenuModel._currentPathArray;
    //var elements = null;
    //
    ////go to node
    //elements = this._actionMenuModel.getElements();
    //for (i = 0; i<currentElementsPath.length; i++){
    //    elements = elements[currentElementsPath[i]];
    //}
    //
    ////create menu step
    //for (i = 0; i < 16; i++) {
    //    view = this._buttonViews[i];
    //
    //    if (elements[i] !== undefined) {
    //        view.setText(elements[i].text);
    //
    //        if (elements[i].elements) {
    //
    //            var actionMenuUpdateMenuCommand = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, this._actionMenuModel._currentPathArray.concat([i, "elements"]));
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(actionMenuUpdateMenuCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "back") {
    //
    //            var newPathArray = this._actionMenuModel._currentPathArray.slice();
    //            newPathArray.splice(-2, 2);
    //            var actionMenuUpdateMenuCommand = new app.command.ActionMenuUpdateMenuCommand(this, this._actionMenuModel, newPathArray);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(actionMenuUpdateMenuCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "SetMoveAction") {
    //
    //            var moveCommand = new app.command.SetMoveCommandOnCommandController(this._commandController);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(moveCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        }  else if (elements[i].action === "SetPatrolAction") {
    //
    //            var patrolCommand = new app.command.SetPatrolCommandOnCommandController(this._commandController);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(patrolCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        }  else if (elements[i].action === "SetGatherAction") {
    //
    //            var gatherCommand = new app.command.SetGatherCommandOnCommandController(this._commandController);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(gatherCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "CancelAction") {
    //
    //            var cancelCommand = new app.command.CancelCommand(this._entityListModel);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(cancelCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "HoldAction") {
    //
    //            var holdCommand = new app.command.HoldCommand(this._entityListModel);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(holdCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "SetBuildBaseAction") {
    //
    //            var buildBaseCommand = new app.command.SetBuildBaseCommandOnCommandController(this._commandController);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(buildBaseCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "BuildWorkerAction") {
    //
    //            var buildWorkerCommand = new app.command.BuildWorkerCommand(this._entityListModel);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(buildWorkerCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else if (elements[i].action === "BuildWarriorAction") {
    //
    //            var buildWarriorCommand = new app.command.BuildWarriorCommand(this._entityListModel);
    //            var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(buildWarriorCommand);
    //            view.setMouseEventListener(commandMouseEventListener);
    //
    //        } else {
    //            view.setMouseEventListener(null);
    //        }
    //
    //    } else {
    //        view.setText(i);
    //    }
    //
    //}


};