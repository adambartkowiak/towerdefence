/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class AttributeModel
 * @memberOf app.model.function
 * @constructor
 * @param {string} id
 * @param {*} value
 */
app.model.function.AttributeModel = function AttributeModel(id, value) {
    app.model.function.AbstractValueModel.call(this, id, value);
};

Utils.inherits(app.model.function.AttributeModel, app.model.function.AbstractValueModel);