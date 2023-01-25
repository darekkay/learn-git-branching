"use strict";

var keyMirror = require('../util/keyMirror');

var CHANGE_EVENT = 'change';

module.exports = {

  CHANGE_EVENT: CHANGE_EVENT,

  StoreSubscribePrototype: {
    subscribe: function(cb) {
      this.on(CHANGE_EVENT, cb);
    },

    unsubscribe: function(cb) {
      this.removeListener(CHANGE_EVENT, cb);
    }
  },

  ActionTypes: keyMirror({
    CHANGE_IS_ANIMATING: null,
  }),

  PayloadSources: keyMirror({
    VIEW_ACTION: null,
    URI_ACTION: null
  })
};
