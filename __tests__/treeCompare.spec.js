var TreeCompare = require('../src/js/graph/treeCompare');

var loadTree = function(treeString) {
  return TreeCompare.convertTreeSafe(treeString);
};

var testMethod = function(compareMethod, goalTreeString, cases, options) {
  cases = cases || {};
  options = options || {};
  if (!options.dontCompareGoal) {
    // always expect the goal to compare to itself correctly
    cases[goalTreeString] = true;
  }

  Object.keys(cases).forEach(function(actualTree) {
    var value = cases[actualTree];
    var isEqual = TreeCompare.dispatch(compareMethod, goalTreeString, actualTree);
    if (isEqual !== value) {
      console.log('this goal tree', loadTree(goalTreeString));
      console.log('did not match this tree', loadTree(actualTree));
      console.log('for this value', value);
    }
    expect(isEqual).toBe(value);
  }.bind(this));
};

describe('Tree Compare', function() {
  it('will return false early if goal missing origin', function() {
    testMethod(
      {}, // checked for all methods
      '{}', // no origin tree
      {
        '{"originTree":{}}': false
      }, {
        dontCompareGoal: true
      }
    );
  });

  it('will return false early if current missing origin', function() {
    testMethod(
      {}, // checked for all methods
      '{"originTree":{}}',
      {
        '{}': false
      }, {
        dontCompareGoal: true
      }
    );
  });

  it('compares with considering leftover branches', function() {
    testMethod(
      {
        compareAllBranchesAndEnforceBranchCleanup: true,
      },
      '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"foo","id":"HEAD"}}',
      {
        '{"branches":{"main":{"target":"C2","id":"main","remoteTrackingBranchID":null},"foo":{"target":"C2","id":"foo","remoteTrackingBranchID":null},"randoBran":{"target":"C2","id":"randoBran","remoteTrackingBranchID":null}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"tags":{},"HEAD":{"target":"foo","id":"HEAD"}}': false,
      },
    );
  });

  it('deep compares on origin tree', function() {
    testMethod(
      {}, // checked for all methods so this doesn't matter
      // state with originTree
      '{"branches":{"main":{"target":"C1","id":"main"},"o/main":{"target":"C1","id":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"main","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"main","id":"HEAD","type":"general ref"}}}',
      {
        // different cases for origin tree too
        '{"branches":{"MaIn":{"target":"C1","id":"MaIn"},"o/main":{"target":"C1","id":"o/MaIn"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"MaIn","id":"HEAD"},"originTree":{"branches":{"MaIn":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"MaIn","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 09:58:50 GMT-0800 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"MaIn","id":"HEAD","type":"general ref"}}}': true,
        // one extra commit in origin
        '{"branches":{"main":{"target":"C1","id":"main"},"o/main":{"target":"C1","id":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C2","id":"main","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:50 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 10:24:55 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"}},"HEAD":{"target":"main","id":"HEAD","type":"general ref"}}}': false,
        // extra commit local
        '{"branches":{"main":{"target":"C2","id":"main"},"o/main":{"target":"C1","id":"o/main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C1","id":"main","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:31:20 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:31:20 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"}},"HEAD":{"target":"main","id":"HEAD","type":"general ref"}}}': false
      }
    );
  });

  it('uses originCompare for the origin comparison results', function() {
    testMethod({
        // compare all branches and head locally, but only main remotely
        originCompare: {
          compareOnlyMain: true
        }
      },
      // start with a local / origin with two branches
      '{"branches":{"main":{"target":"C3","id":"main"},"side":{"target":"C2","id":"side"},"o/main":{"target":"C3","id":"o/main"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C3","id":"main","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C2","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"}},"HEAD":{"target":"main","id":"HEAD","type":"general ref"}}}',
      {
        // committing remotely on other branch is fine
        '{"branches":{"main":{"target":"C3","id":"main"},"side":{"target":"C2","id":"side"},"o/main":{"target":"C3","id":"o/main"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C3","id":"main","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C4","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"},"C4":{"type":"commit","parents":["C2"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:35:38 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C4"}},"HEAD":{"target":"side","id":"HEAD","type":"general ref"}}}': true,
        // but committing on main is not ok
        '{"branches":{"main":{"target":"C3","id":"main"},"side":{"target":"C2","id":"side"},"o/main":{"target":"C3","id":"o/main"},"o/side":{"target":"C2","id":"o/side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C1"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"},"originTree":{"branches":{"main":{"remoteTrackingBranch":null,"remote":false,"target":"C5","id":"main","type":"branch"},"side":{"remoteTrackingBranch":null,"remote":false,"target":"C4","id":"side","type":"branch"}},"commits":{"C0":{"type":"commit","parents":[],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C0","rootCommit":true},"C1":{"type":"commit","parents":["C0"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C1"},"C2":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C2"},"C3":{"type":"commit","parents":["C1"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:34:45 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C3"},"C4":{"type":"commit","parents":["C2"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:35:38 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C4"},"C5":{"type":"commit","parents":["C3"],"author":"Peter Cottle","createTime":"Wed Jul 24 2013 12:37:44 GMT-0700 (PDT)","commitMessage":"Quick commit. Go Bears!","id":"C5"}},"HEAD":{"target":"main","id":"HEAD","type":"general ref"}}}': false
      }
    );
  });

  it('has default behavior to check all branches and main', function() {
    testMethod(
      {}, // default method, which is compare all branches and HEAD
      "{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
      {
        // side branch that is checked out
        '{"branches":{"main":{"target":"C2","id":"main"},"side":{"target":"C3","id":"side"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"side","id":"HEAD"}}': false,
        // different cases of branches
        '{"branches":{"mAiN":{"target":"C3","id":"mAiN"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"mAiN","id":"HEAD"}}': true,
        // head detached
        '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"C2","id":"HEAD"}}': false
      }
    );
  });

  it('compares only main', function() {
    testMethod(
      { compareOnlyMain: true },
      "{\"branches\":{\"main\":{\"target\":\"C3\",\"id\":\"main\"}},\"commits\":{\"C0\":{\"parents\":[],\"id\":\"C0\",\"rootCommit\":true},\"C1\":{\"parents\":[\"C0\"],\"id\":\"C1\"},\"C2\":{\"parents\":[\"C1\"],\"id\":\"C2\"},\"C3\":{\"parents\":[\"C2\"],\"id\":\"C3\"}},\"HEAD\":{\"target\":\"main\",\"id\":\"HEAD\"}}",
      {
        // side branch that is checked out
        '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"main","id":"HEAD"}}': true,
        // head detached
        '{"branches":{"main":{"target":"C3","id":"main"}},"commits":{"C0":{"parents":[],"id":"C0","rootCommit":true},"C1":{"parents":["C0"],"id":"C1"},"C2":{"parents":["C1"],"id":"C2"},"C3":{"parents":["C2"],"id":"C3"}},"HEAD":{"target":"C2","id":"HEAD"}}': true
      }
    );
  });
});
