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

ns.GlobalEventListener.prototype.getCurrentEventEntity = function getCurrentEventEntity(){
    return this._currentEventEntity;
};

ns.GlobalEventListener.prototype.setTriggerListModel = function setTriggerListModel(triggerModelList) {
    this._triggerModelList = triggerModelList;
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

ns.GlobalEventListener.prototype.callTriggerForEvent = function callTriggerForEvent(gameEventEnumValue, entity) {

    var triggerIndex,
        triggerArray = this._triggerModelList.getElements(),
        triggerCount = triggerArray.length,
        currentTrigger,

        eventIndex,
        eventArray,
        eventCount,
        currentEvent,

        conditionIndex,
        conditionArray,
        conditionCount,
        currentCondition,

        commandIndex,
        commandArray,
        commandCount,
        currentCommand;

    for (triggerIndex = 0; triggerIndex < triggerCount; triggerIndex++) {
        currentTrigger = triggerArray[triggerIndex];

        if (currentTrigger.getActive() === false){
            continue;
        }

        //events
        eventArray = currentTrigger.getGameEventArray();
        eventCount = eventArray.length;

        //conditions
        conditionArray = currentTrigger.getConditionArray();
        conditionCount = conditionArray.length;

        //commands
        commandArray = currentTrigger.getCommandArray();
        commandCount = commandArray.length;

        for (eventIndex = 0; eventIndex<eventCount; eventIndex++){

            eventArray = currentTrigger.getGameEventArray();
            currentEvent = eventArray[eventIndex];

            if (currentEvent === gameEventEnumValue) {

                //condition
                for(conditionIndex = 0; conditionIndex<conditionCount; conditionIndex++){

                    currentCondition = conditionArray[conditionIndex];
                    //exit if condition === false
                    if (currentCondition.getValue() === false){
                        return;
                    }
                }

                //command
                for(commandIndex = 0; commandIndex<commandCount; commandIndex++){

                    currentCommand = commandArray[commandIndex];
                    currentCommand.execute();
                }

            }
        }


    }

};