/**
 * Created by adambartkowiak on 14/05/16.
 */

'use strict';
var ns = Utils.namespace("app.model.function");

var Utils = Utils || {};

/**
 * @namespace app.model.function
 * @class Attribute
 * @constructor
 * @param {string} id
 * @param {*} value
 */
app.model.function.Attribute = function Attribute(id, value) {

    app.model.function.AbstractValue.call(this, id, value);

};

Utils.inherits(app.model.function.Attribute, app.model.function.AbstractValue);

