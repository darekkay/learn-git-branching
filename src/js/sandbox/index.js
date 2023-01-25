var Backbone = require('backbone');

var util = require('../util');
var intl = require('../intl');
var Main = require('../app');
var Errors = require('../util/errors');

var Visualization = require('../visuals/visualization').Visualization;
var Command = require('../models/commandModel').Command;

var Sandbox = Backbone.View.extend({
  // tag name here is purely vestigial. I made this a view
  // simply to use inheritance and have a nice event system in place
  tagName: 'div',
  initialize: function(options) {
    options = options || {};
    this.options = options;

    this.initVisualization(options);
    this.initCommandCollection(options);
    this.initUndoStack(options);

    if (!options.wait) {
      this.takeControl();
    }
  },

  getDefaultVisEl: function() {
    return $('#mainVisSpace')[0];
  },

  getAnimationTime: function() { return 700 * 1.5; },

  initVisualization: function(options) {
    this.mainVis = new Visualization({
      el: options.el || this.getDefaultVisEl()
    });
  },

  initUndoStack: function(options) {
    this.undoStack = [];
  },

  initCommandCollection: function(options) {
    // don't add it to just any collection -- adding to the
    // CommandUI collection will put in history
    this.commandCollection = Main.getCommandUI().commandCollection;
  },

  takeControl: function() {
    // we will be handling commands that are submitted, mainly to add the sandbox functionality
    Main.getEventBaton().stealBaton('commandSubmitted', this.commandSubmitted, this);
    // we obviously take care of sandbox commands
    Main.getEventBaton().stealBaton('processSandboxCommand', this.processSandboxCommand, this);
  },

  releaseControl: function() {
    // we will be handling commands that are submitted, mainly to add the sandbox functionality
    Main.getEventBaton().releaseBaton('commandSubmitted', this.commandSubmitted, this);
    // we obviously take care of sandbox commands
    Main.getEventBaton().releaseBaton('processSandboxCommand', this.processSandboxCommand, this);
  },

  beforeCommandCB: function() {
    this.pushUndo();
  },

  pushUndo: function() {
    // go ahead and push the three onto the stack
    this.undoStack.push(this.mainVis.gitEngine.printTree());
  },

  undo: function(command, deferred) {
    var toRestore = this.undoStack.pop();
    if (!toRestore) {
      command.set('error', new Errors.GitError({
        msg: intl.str('undo-stack-empty')
      }));
      deferred.resolve();
      return;
    }

    this.mainVis.reset(toRestore);
    setTimeout(function() {
      command.finishWith(deferred);
    }, this.mainVis.getAnimationTime());
  },

  commandSubmitted: function(value) {
    // allow other things to see this command (aka command history on terminal)
    Main.getEvents().trigger('commandSubmittedPassive', value);

    util.splitTextCommand(value, function(command) {
      this.commandCollection.add(new Command({
        rawStr: command
      }));
    }, this);
  },

  processSandboxCommand: function(command, deferred) {
    // I'm tempted to do cancel case conversion, but there are
    // some exceptions to the rule
    var commandMap = {
      'undo': this.undo,
      'reset': this.reset,
      'delay': this.delay,
      'clear': this.clear,
      'export tree': this.exportTree,
      'import tree': this.importTree,
      'importTreeNow': this.importTreeNow,
    };

    var method = commandMap[command.get('method')];
    if (!method) { throw new Error('no method for that wut'); }

    method.apply(this, [command, deferred]);
  },

  hide: function() {
    this.mainVis.hide();
  },

  show: function() {
    this.mainVis.show();
  },

  importTreeNow: function(command, deferred) {
    var options = command.get('regexResults') || [];
    if (options.length < 2) {
      command.set('error', new Errors.GitError({
        msg: intl.str('git-error-options')
      }));
      command.finishWith(deferred);
    }
    var string = options.input.replace(/importTreeNow\s+/g, '');
    try {
      this.mainVis.gitEngine.loadTreeFromString(string);
    } catch (e) {
      command.set('error', new Errors.GitError({
        msg: String(e)
      }));
    }
    command.finishWith(deferred);
  },

  exportTree: function(command, deferred) {
    command.finishWith(deferred);
  },

  clear: function(command, deferred) {
    Main.getEvents().trigger('clearOldCommands');
    if (command && deferred) {
      command.finishWith(deferred);
    }
  },

  mobileAlert: function(command, deferred) {
    alert(intl.str('mobile-alert'));
    command.finishWith(deferred);
  },

  delay: function(command, deferred) {
    var amount = parseInt(command.get('regexResults')[1], 10);
    setTimeout(function() {
      command.finishWith(deferred);
    }, amount);
  },

  reset: function(command, deferred) {
    this.mainVis.reset();
    this.initUndoStack();

    setTimeout(function() {
      command.finishWith(deferred);
    }, this.mainVis.getAnimationTime());
  }
});

exports.Sandbox = Sandbox;
