/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class TrainWarriorCommand
 * @param {app.model.EntityListModel} entityListModel
 * @constructor
 */
app.command.TrainWarriorCommand = function TrainWarriorCommand(entityListModel) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @param {app.model.EntityListModel} entityListModel
     * @private
     */
    this._entityListModel = entityListModel;

};

Utils.inherits(app.command.TrainWarriorCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TrainWarriorCommand.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    var selectedEntity = Helper.getSelectedEntity(this._entityListModel);
    var buildList = selectedEntity.getBuildList();

    if (buildList !== null){
        var entityModel = new app.model.EntityModel();
        entityModel.loadFromJSON(JSON.parse("{\"_graphicUrl\":\"assets/graphics/images/unit2_team1.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":0},\"_radius\":20,\"_collisionRadius\":15,\"_groundSpeed\":80,\"_team\":1,\"_hp\":300,\"_currentHp\":300,\"_selectable\":true,\"_targetable\":true,\"_buildTime\":300}"));
        buildList.addElement(entityModel);
    }
    
};