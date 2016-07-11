/**
 * Created by adambartkowiak on 18.10.2015.
 */
'use strict';

var app = app || {};
    app.command = app.command || {};

var Utils = Utils || {};

/**
 * @namespace app.command
 * @class TrainWorkerCommand
 * @param {app.model.EntityListModel} entityListModel
 * @constructor
 */
app.command.TrainWorkerCommand = function TrainWorkerCommand(entityListModel) {
    
    support.command.AbstractCommand.call(this);
    
    /**
     * @param {app.model.EntityListModel} entityListModel
     * @private
     */
    this._entityListModel = entityListModel;

};

Utils.inherits(app.command.TrainWorkerCommand, support.command.AbstractCommand);

/**
 * @method execute
 * @param {support.MouseEvent} mouseEvent
 */
app.command.TrainWorkerCommand.prototype.execute = function execute(mouseEvent) {
    
    support.command.AbstractCommand.prototype.execute.call(this);

    var selectedEntity = Helper.getSelectedEntity(this._entityListModel);
    var buildList = selectedEntity.getBuildList();

    if (buildList !== null){
        var entityModel = new app.model.EntityModel();
        entityModel.loadFromJSON(JSON.parse("{\"_graphicUrl\":\"assets/graphics/images/unit1_team1.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":0},\"_radius\":18,\"_collisionRadius\":13,\"_groundSpeed\":150,\"_team\":1,\"_hp\":200,\"_currentHp\":200,\"_selectable\":true,\"_targetable\":true,\"_buildTime\":300}"));
        buildList.addElement(entityModel);
    }


    entityModel.loadFromJSON(JSON.parse("{\"_graphicUrl\":\"assets/graphics/images/unit1_team1.png\",\"_graphicOffset\":{\"_x\":0,\"_y\":0},\"_radius\":18,\"_collisionRadius\":13,\"_groundSpeed\":150,\"_team\":1,\"_hp\":200,\"_currentHp\":200,\"_selectable\":true,\"_targetable\":true}"));

    entityModel.setX(selectedEntity.getX()+Math.random()-0.5, null);
    entityModel.setY(selectedEntity.getY()+Math.random()-0.5, null);

};