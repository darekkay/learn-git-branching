const Sandbox = require('../sandbox/').Sandbox;
const EventBaton = require('../util/eventBaton').EventBaton;

window.initGitVisualizer = ({
  node
}) => {
  // TODO: implement

  new Sandbox({
    el: node,
    eventBaton: new EventBaton()
  });

  console.info("initializing", node);
};
