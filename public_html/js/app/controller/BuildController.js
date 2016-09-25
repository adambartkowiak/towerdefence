/**
 * Created by adambartkowiak on 01/08/15.
 */

'use strict';

var app = app || {};
app.controller = app.controller || {};

var Utils = Utils || {};

/**
 * @namespace app.controller
 * @class BuildController
 * @constructor
 * @param {app.model.EntityListModel} entityListModel
 *
 */
app.controller.BuildController = function BuildController(entityListModel) {

    /**
     * @property {app.model.EntityListModel} _list
     * @private
     */
    this._list = entityListModel;

};

Utils.inherits(app.controller.BuildController, Object);

/**
 * @method update
 * @param {Number} timeDelta
 */
app.controller.BuildController.prototype.update = function update(timeDelta) {

    return;

    var listLength = this._list.length();
    var elementIndex;
    var element;
    var availableToBuild;
    var toBuild;
    var removeAfterBuild = true;

    for (elementIndex = 0; elementIndex < listLength; elementIndex++) {

        element = this._list.getElement(elementIndex);

        availableToBuild = element.getBuildList() && element.getBuildList().length() > 0;

        //NO AVAILABLE STEPS!
        if (!availableToBuild) {
            continue;
        }

        toBuild = element.getBuildList().getElement(0);

        if (toBuild !== null) {
            toBuild._currentBuildTime += timeDelta;
            if (toBuild._currentBuildTime >= toBuild._buildTime) {

                removeAfterBuild = true;

                if (toBuild.getMoveList() !== null && toBuild.getMoveList().length() > 0 &&
                    toBuild.getMoveList().getElement(0).getTaskEnum() === app.enum.FunctionEnum.ATTACK &&
                    (toBuild.getMoveList().getElement(0).getEntityId() === 0 || this._list.getElementById(toBuild.getMoveList().getElement(0).getEntityId()) === null )) {
                    continue;
                }

                //Wyzerowanie czasu
                toBuild._currentBuildTime = 0;

                //Wykasowanie elemntu budowanego z kolejki
                if (toBuild.getMoveList() !== null && toBuild.getMoveList().length() > 0 && toBuild.getMoveList().getElement(0).getTaskEnum() === app.enum.FunctionEnum.ATTACK) {
                    removeAfterBuild = false;
                }

                if (removeAfterBuild) {
                    element.getBuildList().removeElementByIndex(0);
                }

                var newEntity = toBuild.clone();
                newEntity.setX(element.getX() + Math.random() - 0.5);
                newEntity.setY(element.getY() + Math.random() - 0.5);


                /*
                 Brak precyzji celowania
                 */
                //var enemy = this._list.getElementById(toBuild.getMoveList().getElement(0).getEntityId());
                //if (enemy !== null) {
                //    var randomX = enemy.getRadius() * (Math.random() - 0.5) * 2;
                //    var randomY = enemy.getRadius() * (Math.random() - 0.5) * 2;
                //
                //    newEntity.getMoveList().getElement(0).setEntityId(0);
                //    newEntity.getMoveList().getElement(0).setX(enemy.getX() + randomX);
                //    newEntity.getMoveList().getElement(0).setY(enemy.getY() + randomY);
                //}


                this._list.addElement(newEntity);

            }
        }

    }

};
