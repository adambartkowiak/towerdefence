/**
 * Created by adambartkowiak on 11/07/16.
 */

'use strict';
var ns = Utils.namespace("app.factory");

var Utils = Utils || {};

/**
 * @namespace app.factory
 * @class CommandFactory
 * @constructor
 */
app.factory.CommandFactory = function CommandFactory() {

    this._triggerModelList = null;
    this._entityModelList = null;
    this._teamListModel = null;
    this._objectiveListModel = null;
    this._variableListModel = null;
    this._globalEventListener = null;

};

Utils.inherits(app.factory.CommandFactory, Object);

/**
 * @method setTriggerListModel
 * @param {app.model.TriggerListModel} triggerModelList
 */
app.factory.CommandFactory.prototype.setTriggerListModel = function setTriggerListModel(triggerModelList) {
    this._triggerModelList = triggerModelList;
};

/**
 * @method setEntityListModel
 * @param {app.model.EntityListModel} entityModelList
 */
app.factory.CommandFactory.prototype.setEntityListModel = function setEntityListModel(entityModelList) {
    this._entityModelList = entityModelList;
};

/**
 * @method setTeamListModel
 * @param {app.model.TeamListModel} teamListModel
 */
app.factory.CommandFactory.prototype.setTeamListModel = function setTeamListModel(teamListModel) {
    this._teamListModel = teamListModel;
};

/**
 * @method setObjectiveListModel
 * @param {app.model.ObjectiveListModel} objectiveListModel
 */
app.factory.CommandFactory.prototype.setObjectiveListModel = function setObjectiveListModel(objectiveListModel) {
    this._objectiveListModel = objectiveListModel;
};

/**
 * @method setVariableListModel
 * @param {app.model.VariableListModel} variableListModel
 */
app.factory.CommandFactory.prototype.setVariableListModel = function setVariableListModel(variableListModel) {
    this._variableListModel = variableListModel;
};

/**
 * @method setGlobalEventListener
 * @param {app.listener.GlobalEventListener} globalEventListener
 */
app.factory.CommandFactory.prototype.setGlobalEventListener = function setGlobalEventListener(globalEventListener) {
    this._globalEventListener = globalEventListener;
};

/**
 * @method createCommand
 * @param {app.model.function.AbstractValueModel} abstractValueModel
 * @return {support.command.AbstractCommand} createdCommand
 */
app.factory.CommandFactory.prototype.createCommand = function createCommand(abstractValueModel) {
    var result = null,
        functionEnumValue = abstractValueModel.getFunctionEnumValue();

    switch (functionEnumValue) {
        case app.enum.FunctionEnum.EQUALS:
        {
            result = new app.command.ConditionEqualCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this.createCommand(abstractValueModel.getFunctionAttributes()[1]));
            break;
        }
        case app.enum.FunctionEnum.EQUALS_OR_GREATER:
        {
            result = new app.command.ConditionEqualOrGreaterCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this.createCommand(abstractValueModel.getFunctionAttributes()[1]));
            break;
        }
        case app.enum.FunctionEnum.GET_EVENT_ENTITY:
        {
            result = new app.command.GetEventEntityModelCommand(this._globalEventListener);
            break;
        }
        case app.enum.FunctionEnum.GET_ENTITY_PROPERTY:
        {
            result = new app.command.GetEntityPropertyCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this.createCommand(abstractValueModel.getFunctionAttributes()[1]));
            break;
        }
        case app.enum.FunctionEnum.GET_UNIT_COUNT:
        {
            result = new app.command.GetUnitCountCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this._entityModelList);
            break;
        }
        case app.enum.FunctionEnum.SHOW_CONSOLE_LOG:
        {
            result = new app.command.ShowConsoleLogCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]));
            break;
        }
        case app.enum.FunctionEnum.TURN_OFF_TRIGGER:
        {
            result = new app.command.TurnOffTriggerCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this._triggerModelList);
            break;
        }
        case app.enum.FunctionEnum.TURN_ON_TRIGGER:
        {
            result = new app.command.TurnOnTriggerCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]), this._triggerModelList);
            break;
        }
        case app.enum.FunctionEnum.GET_RESOURCES_VALUE:
        {
            result = new app.command.GetResourcesValueCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]) /*team*/, this.createCommand(abstractValueModel.getFunctionAttributes()[1]) /*resourceName*/, this._teamListModel);
            break;
        }
        case app.enum.FunctionEnum.CHANGE_OBJECTIVE_RESULT:
        {
            result = new app.command.ChangeObjectiveResultCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]) /*objectiveId*/, this.createCommand(abstractValueModel.getFunctionAttributes()[1]) /*objectiveresult*/, this._objectiveListModel);
            break;
        }
        case app.enum.FunctionEnum.GET_VARIABLE_VALUE:
        {
            result = new app.command.GetVariableValueCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]) /*variableId*/, this._variableListModel);
            break;
        }
        case app.enum.FunctionEnum.INCREMENT_VARIABLE_VALUE:
        {
            result = new app.command.IncrementVariableValueCommand(this.createCommand(abstractValueModel.getFunctionAttributes()[0]) /*variableId*/, this._variableListModel);
            break;
        }
        case app.enum.FunctionEnum.ALL_OBJECTIVES_COMPLETED:
        {
            result = new app.command.AllObjectivesCompletedCommand(this._objectiveListModel);
            break;
        }
        case app.enum.FunctionEnum.SHOW_VICTORY_POPUP:
        {
            result = new app.command.ShowVictoryPopupCommand();
            break;
        }
        case app.enum.FunctionEnum.VALUE:
        {
            // result = new app.model.function.GetUnitCountModel(Utils.guid(), new app.model.function.AttributeModel(Utils.guid(), 0));
            result = new app.command.AttributeCommand(abstractValueModel);
            // console.log("createCommand: Attribute command");
            break;
        }
    }

    return result;
};