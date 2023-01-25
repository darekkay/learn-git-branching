var Backbone = require('backbone');
var jQuery = require('jquery');
var EventEmitter = require('events').EventEmitter;

var Visualization = require('../visuals/visualization').Visualization;


var util = require('../util');
var intl = require('../intl');

/**
 * Globals
 */

Backbone.$ = jQuery;

//


function createVisualization (selector) {
  return new Visualization({
    el: document.querySelector(selector),
    noKeyboardInput: true,
    noClick: true,
    smallCanvas: true,
    zIndex: -1
  });
}

if (window) {
  window.createVisualization = createVisualization;
}


//


// Bypass jasmine
if (util.isBrowser()) {
  window.jQuery = jQuery;
  window.$ = jQuery;
  window.Raphael = require('raphael');
}

var events = Object.assign(
  {},
  EventEmitter.prototype,
  {
    trigger: function() {
      // alias this for backwards compatibility
      this.emit.apply(this, arguments);
    }
  }
);
// Allow unlimited listeners, so FF doesn't break
events.setMaxListeners(0);
var commandUI;
var sandbox;
var eventBaton;

///////////////////////////////////////////////////////////////////////

var init = function() {
  /**
    * There is a decent amount of bootstrapping we need just to hook
    * everything up. The init() method takes on these responsibilities,
    * including but not limited to:
    *   - setting up Events and EventBaton
    *   - calling the constructor for the main visualization
    *   - initializing the command input bar
    *   - handling window.focus and zoom events
  **/
  var Sandbox = require('../sandbox/').Sandbox;
  var EventBaton = require('../util/eventBaton').EventBaton;

  eventBaton = new EventBaton();
  commandUI = new CommandUI();
  sandbox = new Sandbox({
    eventBaton,
    events
  });

  initRootEvents(eventBaton);

  window.eventBaton = eventBaton;

  // unfortunate global export for casper tests
  window.intl = intl;
};

var initRootEvents = function(eventBaton) {
  $(window).on('resize', function(e) {
    events.trigger('resize', e);
  });

  $(window).trigger('resize');
};

if (require('../util').isBrowser()) {
  // this file gets included via node sometimes as well
  $(document).ready(init);
}

/**
  * the UI method simply bootstraps the command buffer and
  * command prompt views. It only interacts with user input
  * and simply pipes commands to the main events system
**/
function CommandUI() {
  Backbone.$ = $; // lol WTF BACKBONE MANAGE YOUR DEPENDENCIES
  var Collections = require('../models/collections');

  this.commandCollection = new Collections.CommandCollection();
  this.commandBuffer = new Collections.CommandBuffer({
    collection: this.commandCollection
  });
}

exports.getEvents = function() {
  return events;
};

exports.getSandbox = function() {
  return sandbox;
};

exports.getEventBaton = function() {
  return eventBaton;
};

exports.getCommandUI = function() {
  return commandUI;
};

exports.init = init;
