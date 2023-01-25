"use strict";

var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var ActionTypes = AppConstants.ActionTypes;

var _isAnimating = false;

var GlobalStateStore = Object.assign(
{},
EventEmitter.prototype,
AppConstants.StoreSubscribePrototype,
{
  getIsAnimating: function() {
    return _isAnimating;
  },

  dispatchToken: AppDispatcher.register(function(payload) {
    var action = payload.action;
    var shouldInform = false;

    switch (action.type) {
      case ActionTypes.CHANGE_IS_ANIMATING:
        _isAnimating = action.isAnimating;
        shouldInform = true;
        break;
    }

    if (shouldInform) {
      GlobalStateStore.emit(AppConstants.CHANGE_EVENT);
    }
  })

});

module.exports = GlobalStateStore;
