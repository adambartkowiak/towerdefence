/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class SetBuildBuildingCommandOnCommandController
 * @param {app.controller.CommandController} commandController
 * @param {app.model.EntityListModel} entityDictionary
 * @param {app.command.AttributeCommand} entityModelNameToBuild
 * @constructor
 */
app.command.SetBuildBuildingCommandOnCommandController = function SetBuildBuildingCommandOnCommandController(commandController, entityDictionary, entityModelNameToBuild) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @property {app.controller.CommandController} commandController
     * @private
     */
    this._commandController = commandController;

    /**
     * @param {app.model.EntityListModel} entityDictionary
     * @private
     */
    this._entityDictionary = entityDictionary;

    /**
     * @property {app.command.AttributeCommand} entityModelNameToBuild
     * @private
     */
    this._entityModelNameToBuild = entityModelNameToBuild;

};

Utils.inherits(app.command.SetBuildBuildingCommandOnCommandController, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.SetBuildBuildingCommandOnCommandController.prototype.execute = function execute(mouseEvent) {

    support.command.AbstractCommand.prototype.execute.call(this);

    console.log("app.command.SetBuildBuildingCommandOnCommandController.prototype.execute");


    var entityModelNameToBuild = this._entityModelNameToBuild.execute(null);

    this._commandController.setAction(app.enum.FunctionEnum.BUILD_BUILDING);
    this._commandController.setEntityModelNameToBuild(this._entityModelNameToBuild.execute(null));
    
};