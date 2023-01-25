var util = require('../util');

var constants = require('../util/constants');
var intl = require('../intl');

var Commands = require('../commands');
var Errors = require('../util/errors');
var CommandProcessError = Errors.CommandProcessError;
var GlobalStateStore = require('../stores/GlobalStateStore');
var GlobalStateActions = require('../actions/GlobalStateActions');
var GitError = Errors.GitError;
var Warning = Errors.Warning;
var CommandResult = Errors.CommandResult;

var instantCommands = [
  [/^ls( |$)/, function() {
    throw new CommandResult({
      msg: intl.str('ls-command')
    });
  }],
  [/^cd( |$)/, function() {
    throw new CommandResult({
      msg: intl.str('cd-command')
    });
  }],
  [/^show$/, function(bits) {
    var lines = [
      intl.str('show-command'),
      '<br/>',
      'show commands',
      'show solution',
      'show goal'
    ];

    throw new CommandResult({
      msg: lines.join('\n')
    });
  }],
  [/^alias (\w+)="(.+)"$/, function(bits) {
    const alias = bits[1];
    const expansion = bits[2];
    throw new CommandResult({
      msg: 'Set alias "'+alias+'" to "'+expansion+'"',
    });
  }],
  [/^unalias (\w+)$/, function(bits) {
    const alias = bits[1];
    throw new CommandResult({
      msg: 'Removed alias "'+alias+'"',
    });
  }],
  [/^refresh$/, function() {
    var events = require('../app').getEvents();

    events.trigger('refreshTree');
    throw new CommandResult({
      msg: intl.str('refresh-tree-command')
    });
  }],
  [/^rollup (\d+)$/, function(bits) {
    var events = require('../app').getEvents();

    // go roll up these commands by joining them with semicolons
    events.trigger('rollupCommands', bits[1]);
    throw new CommandResult({
      msg: 'Commands combined!'
    });
  }],
  [/^echo "(.*?)"$|^echo (.*?)$/, function(bits) {
    var msg = bits[1] || bits[2];
    throw new CommandResult({
      msg: msg
    });
  }],
  [/^show +commands$/, function(bits) {
    var allCommands = getAllCommands();
    var allOptions = Commands.commands.getOptionMap();
    var commandToOptions = {};

    Object.keys(allOptions).forEach(function(vcs) {
      var vcsMap = allOptions[vcs];
      Object.keys(vcsMap).forEach(function(method) {
        var options = vcsMap[method];
        if (options) {
          commandToOptions[vcs + ' ' + method] = Object.keys(options).filter(option => option.length > 1);
        }
      });
    });


    var lines = [
      intl.str('show-all-commands'),
      '<br/>'
    ];
    Object.keys(allCommands)
      .forEach(function(command) {
        lines.push(command);
        if (commandToOptions[command]) {
          commandToOptions[command].forEach(option => lines.push('&nbsp;&nbsp;&nbsp;&nbsp;' + option));
        }
      });

    throw new CommandResult({
      msg: lines.join('\n')
    });
  }]
];

var regexMap = {
  'reset': /^reset( +--forSolution)?$/,
  'delay': /^delay (\d+)$/,
  'clear': /^clear($|\s)/,
  'sandbox': /^sandbox($|\s)/,
  'export tree': /^export +tree$/,
  'importTreeNow': /^importTreeNow($|\s)/,
  'import tree': /^import +tree$/,
  'undo': /^undo($|\s)/,
};

var getAllCommands = function() {
  var toDelete = [
    'mobileAlert'
  ];

  var allCommands = Object.assign(
    {},
    regexMap
  );
  var mRegexMap = Commands.commands.getRegexMap();
  Object.keys(mRegexMap).forEach(function(vcs) {
    var map = mRegexMap[vcs];
    Object.keys(map).forEach(function(method) {
      var regex = map[method];
      allCommands[vcs + ' ' + method] = regex;
    });
  });
  toDelete.forEach(function(key) {
    delete allCommands[key];
  });

  return allCommands;
};

exports.getAllCommands = getAllCommands;
exports.instantCommands = instantCommands;
exports.parse = util.genParseCommand(regexMap, 'processSandboxCommand');
