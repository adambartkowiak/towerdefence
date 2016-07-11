/**
 * Created by adambartkowiak on 26/06/16.
 */

'use strict';
Utils.namespace("editor.controller");

/**
 * @namespace editor.controller
 * @class EditAttributeController
 * @constructor
 * @param {app.model.WorldModel} _worldModel
 * @param {app.model.TriggerModel} triggerModel
 * @param {string} attributeId
 */
editor.controller.EditAttributeController = function EditAttributeController(worldModel, triggerModel, attributeId) {

    /**
     *
     * @property {editor.view.SelectAttributeView} _view
     * @private
     */
    this._view = null;

    /**
     * @property {app.model.WorldModel} _worldModel
     * @private
     */
    this._worldModel = worldModel;

    /**
     * @property {app.model.TriggerModel} _triggerModel
     * @private
     */
    this._triggerModel = triggerModel;

    /**
     * @property {string} _attributeId
     * @private
     */
    this._attributeId = attributeId;

};

Utils.inherits(editor.controller.EditAttributeController, Object);

/**
 * @method setView
 * @public
 * @param {editor.view.SelectAttributeView} view
 */
editor.controller.EditAttributeController.prototype.setView = function setView(view) {

    this._view = view;

};

/**
 * @method onAccept
 * @public
 * @param {editor.model.SelectAttributeModel} selectAttributeModel
 */
editor.controller.EditAttributeController.prototype.onAccept = function onAccept(selectAttributeModel) {

    var attribute = this._triggerModel.getConditionListModel().getElementById(this._attributeId),
        parent = attribute.getParent(),
        index = parent.getElementIndex(attribute),
        newAttribute;

    parent.removeElementByIndex(index);


    if (selectAttributeModel.getAttributeEnumValue() === editor.enum.SelectAttributeEnum.CUSTOM_VALUE) {

        newAttribute = new app.model.function.Attribute(Utils.guid(), selectAttributeModel.getValue());

    } else if (selectAttributeModel.getAttributeEnumValue() === editor.enum.SelectAttributeEnum.PREDEFINED_VALUE) {

        // this._view._selectedPredefinedValueName;
        newAttribute = new app.model.function.Attribute(Utils.guid(), app.enum.EntityPropertyEnum[selectAttributeModel.getValue()]);

    } else if (selectAttributeModel.getAttributeEnumValue() === editor.enum.SelectAttributeEnum.FUNCTION) {
        var functionFactory = new app.factory.FunctionFactory(this._worldModel.getGlobalEventListener);
        newAttribute = functionFactory.createFunction(app.enum.FunctionEnum[selectAttributeModel.getValue()]);

    } else if (selectAttributeModel.getAttributeEnumValue() === editor.enum.SelectAttributeEnum.VARIABLE) {

        newAttribute = new app.model.function.Attribute(Utils.guid(), selectAttributeModel.getValue());

    }

    parent.insertElement(index, newAttribute);

};

