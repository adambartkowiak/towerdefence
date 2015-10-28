/**
 * Created by adambartkowiak on 18/10/15.
 */

'use strict';

var app = app || {};
app.view = app.view || {};
app.view.gui = app.view.gui || {};

var Utils = Utils || {};

/**
 * @namespace app.view.gui
 * @class ActionMenuView
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {app.controller.CommandController} commandController
 */
app.view.gui.ActionMenuView = function ActionMenuView(x, y, width, height, commandController) {

    /*
     Call Base/Super Constructor
     */
    support.view.AbsoluteLayoutView.call(this, x, y, width, height);

    /**
     * Tablica zawierajaca buttony menu {support.view.ButtonView}
     * 
     * @property {Array} buttonViews
     * @private
     */
    this._buttonViews = [];
    
    for (var i = 0 ; i<16; i++){
        var view = new support.view.ButtonView(5 + 50*(i%4), 5 + 50*(parseInt(i/4)), 40, 40);
        view.setBackgroundColor("#FF0000");
        view.setText(i);
        
        var command = null;
        
        //MOVE
        if (i === 0){
            command = new app.command.SetMoveCommandOnCommandController(commandController);
            view.setText("MOVE");
        }
        
        //ATTACK
        else if (i === 1){
            command = new app.command.SetMoveCommandOnCommandController(commandController);
            view.setText("ATTACK");
        }
        
        var commandMouseEventListener = new app.view.mouseEventListener.CommandMouseEventListener(command);
        view.setMouseEventListener(commandMouseEventListener);
        
        this.addView(view);
    }
    
};

Utils.inherits(app.view.gui.ActionMenuView, support.view.AbsoluteLayoutView);

