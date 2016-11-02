/**
 * Created by adambartkowiak on 19/05/16.
 */

'use strict';
var ns = Utils.namespace("app.listener");

var Utils = Utils || {};

/**
 * @namespace app.listener
 * @class GlobalEventListener
 * @constructor
 */
ns.GlobalEventListener = function GlobalEventListener() {

    this._triggerModelList = null;
    this._entityListModel = null;
    this._teamListModel = null;
    this._objectiveListModel = null;
    this._variableListModel = null;

    this._commandFactory = new app.factory.CommandFactory();
    this._commandFactory.setGlobalEventListener(this);

    /*
     informacje o eventach!!
     */
    this._currentEventEntity = null;

    this._currentEventRegion = null;

    this._lastDiedEntity = null;

    this._lastCreatedEntity = null;

    this._lastEneteredRegion = null;

    this._lastLeavedRegion = null;


};

ns.GlobalEventListener.prototype.getCurrentEventEntity = function getCurrentEventEntity() {
    return this._currentEventEntity;
};

ns.GlobalEventListener.prototype.setTriggerListModel = function setTriggerListModel(triggerModelList) {
    this._triggerModelList = triggerModelList;
    this._commandFactory.setTriggerListModel(this._triggerModelList);
};

ns.GlobalEventListener.prototype.setEntityListModel = function setEntityListModel(entityListModel) {
    this._entityListModel = entityListModel;
    this._commandFactory.setEntityListModel(this._entityListModel);
};

ns.GlobalEventListener.prototype.setTeamListModel = function setTeamListModel(teamListModel) {
    this._teamListModel = teamListModel;
    this._commandFactory.setTeamListModel(this._teamListModel);
};

ns.GlobalEventListener.prototype.setObjectiveListModel = function setObjectiveListModel(objectiveListModel) {
    this._objectiveListModel = objectiveListModel;
    this._commandFactory.setObjectiveListModel(this._objectiveListModel);
};

ns.GlobalEventListener.prototype.setVariableListModel = function setVariableListModel(variableListModel) {
    this._variableListModel = variableListModel;
    this._commandFactory.setVariableListModel(this._variableListModel);
};


ns.GlobalEventListener.prototype.onEvent = function onEvent(gameEventEnumValue, entity, region) { //eventOptions

    if (FEATURE_TOGGLE.SHOW_EVENT_CONSOLE_LOGS) {
        console.log("gameEventEnumValue: " + gameEventEnumValue);
        console.log(entity);
        console.log(region);
    }

    //Jezeli sa triggery dla tego eventu to nastepuje ich sprawdzenie
    this.callTriggerForEvent(gameEventEnumValue, entity);
};

ns.GlobalEventListener.prototype.onUnitDie = function onUnitDie(entity) {

    // console.log("onUnitDie");

    this._currentEventRegion = null;
    this._currentEventEntity = entity;

    this._lastDiedEntity = entity;

    this.callTriggerForEvent(app.enum.GameEventEnum.UNIT_DIE, entity);
};

ns.GlobalEventListener.prototype.onUnitCreate = function onUnitCreate(entity) {

    this._currentEventRegion = null;
    this._currentEventEntity = entity;

    this._lastCreatedEntity = entity;

    this.callTriggerForEvent(app.enum.GameEventEnum.UNIT_CREATE, entity);
};

ns.GlobalEventListener.prototype.onUnitEntersRegion = function onUnitEntersRegion(entity, region) {

    this._currentEventRegion = region;
    this._currentEventEntity = entity;

    this.callTriggerForEvent(app.enum.GameEventEnum.UNIT_ENTERS_REGION, entity, region);
};

ns.GlobalEventListener.prototype.onUnitLeavesRegion = function onUnitLeavesRegion(entity, region) {

    this._currentEventRegion = region;
    this._currentEventEntity = entity;

    this.callTriggerForEvent(app.enum.GameEventEnum.UNIT_LEAVES_REGION, entity, region);
};

ns.GlobalEventListener.prototype.onTimeDelta = function onTimeDelta(time) {

    this._currentEventRegion = null;
    this._currentEventEntity = null;

    this.callTriggerForEvent(app.enum.GameEventEnum.TIME_DELTA, time);
};

ns.GlobalEventListener.prototype.onTeamCreate = function onTeamCreate(team) {

    this._currentEventRegion = null;
    this._currentEventEntity = null;

    this.callTriggerForEvent(app.enum.GameEventEnum.TEAM_CREATE, team);
};

ns.GlobalEventListener.prototype.onTeamRemove = function onTeamRemove(team) {

    this._currentEventRegion = null;
    this._currentEventEntity = null;

    this.callTriggerForEvent(app.enum.GameEventEnum.TEAM_REMOVE, team);
};

ns.GlobalEventListener.prototype.onChangeResourceValue = function onChangeResourceValue(teamName, resourceName, value) {

    this._currentEventRegion = null;
    this._currentEventEntity = null;

    // console.log("onChangeResourceValue: " + teamName + ", " + resourceName + ", " + value)

    this.callTriggerForEvent(app.enum.GameEventEnum.CHANGE_TEAM_RESOURCES_VALUE, teamName, resourceName, value);
};

ns.GlobalEventListener.prototype.callTriggerForEvent = function callTriggerForEvent(gameEventEnumValue, entity) {

    var triggerIndex,
        triggerArray = this._triggerModelList.getElements(),
        triggerCount = triggerArray.length,
        currentTrigger,

        gameEventIndex,
        gameEventListModel,
        gameEventCount,
        currentGameEvent,

        conditionIndex,
        conditionListModel,
        conditionCount,
        currentConditionModel,
        currentConditionCommand,
        currentConditionCommandResult,

        actionIndex,
        actionListModel,
        actionCount,
        currentActionModel,

        createdCommand = null;

    for (triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
        currentTrigger = triggerArray[triggerIndex];

        if (currentTrigger.getActive() === false) {
            continue;
        }

        //gameEvents
        gameEventListModel = currentTrigger.getGameEventListModel();
        gameEventCount = gameEventListModel.length();

        //conditions
        conditionListModel = currentTrigger.getConditionListModel();
        conditionCount = conditionListModel.length();

        //actions
        actionListModel = currentTrigger.getActionListModel();
        actionCount = actionListModel.length();

        for (gameEventIndex = 0; gameEventIndex < gameEventCount; gameEventIndex++) {

            currentGameEvent = gameEventListModel.getElement(gameEventIndex);

            // console.log("Trigger Number: " + currentGameEvent.getGameEventEnum());

            if (currentGameEvent.getGameEventEnum() === gameEventEnumValue) {

                //condition
                for (conditionIndex = 0; conditionIndex < conditionCount; conditionIndex++) {

                    currentConditionModel = conditionListModel.getElement(conditionIndex);

                    currentConditionCommand = this._commandFactory.createCommand(currentConditionModel);

                    currentConditionCommandResult = currentConditionCommand.execute();

                    //exit if condition != true
                    if (currentConditionCommandResult != true) {
                        break;
                    }
                }

                if (!currentConditionCommandResult){
                    break;
                }

                // console.log("Trigger Number: " + currentGameEvent.getGameEventEnum() + ", and conndition PASSED!");

                //command
                for (actionIndex = 0; actionIndex < actionCount; actionIndex++) {

                    currentActionModel = actionListModel.getElement(actionIndex);

                    //create function and execute it
                    createdCommand = this._commandFactory.createCommand(currentActionModel);
                    createdCommand.execute();
                }

            }
        }


    }

};