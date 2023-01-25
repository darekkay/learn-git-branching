var toGlobalize = {
  App: require('../app/index.js'),
  Tree: require('../visuals/tree'),
  Visuals: require('../visuals'),
  Git: require('../git'),
  CommandModel: require('../models/commandModel'),
  GlobalStateActions: require('../actions/GlobalStateActions'),
  GlobalStateStore: require('../stores/GlobalStateStore'),
  Constants: require('../util/constants'),
  Commands: require('../commands'),
  Collections: require('../models/collections'),
  Async: require('../visuals/animation'),
  AnimationFactory: require('../visuals/animation/animationFactory'),
  Main: require('../app'),
  HeadLess: require('../git/headless'),
  Q: { Q: require('q') },
  ZoomLevel: require('../util/zoomLevel'),
  VisBranch: require('../visuals/visBranch'),
  Sandbox: require('../sandbox/'),
  SandboxCommands: require('../sandbox/commands'),
  Markdown: require('marked').marked,
  Util: require('../util/index'),
  Intl: require('../intl')
};

Object.keys(toGlobalize).forEach(function(moduleName) {
  var module = toGlobalize[moduleName];

  for (var key in module) {
    var value = module[key];
    if (value instanceof Function) {
      value = value.bind(module);
    }
    window['debug_' + moduleName + '_' + key] = value;
  }
});

$(document).ready(function() {
  window.debug_events = toGlobalize.Main.getEvents();
  window.debug_eventBaton = toGlobalize.Main.getEventBaton();
  window.debug_sandbox = toGlobalize.Main.getSandbox();
  window.debug_modules = toGlobalize;
  window.debug_copyTree = function() {
    return toGlobalize.Main.getSandbox().mainVis.gitEngine.printAndCopyTree();
  };
});
