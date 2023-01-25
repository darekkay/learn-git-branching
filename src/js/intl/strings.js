exports.strings = {
  'git-status-detached': {
    __desc__: 'One of the lines for git status output',
    en_US: 'Detached head!'
  },
  'git-status-onbranch': {
    __desc__: 'One of the lines for git status output',
    en_US: 'On branch {branch}'
  },
  'git-status-readytocommit': {
    __desc__: 'One of the lines for git status output',
    en_US: 'Ready to commit! (as always in this demo)'
  },
  'git-dummy-msg': {
    __desc__: 'The dummy commit message for all commits. Feel free to put in a shoutout to your school / city / whatever!',
    en_US: 'Quick commit. Go Bears!'
  },
  'git-error-origin-fetch-uptodate': {
    __desc__: 'One of the error messages for git',
    en_US: 'Already up to date!'
  },
  'git-error-origin-fetch-no-ff': {
    __desc__: 'One of the error messages for git',
    en_US: 'Your origin branch is out of sync with the remote branch and fetch cannot be performed'
  },
  'git-error-origin-push-no-ff': {
    __desc__: 'One of the error messages for git',
    en_US: 'The remote repository has diverged from your local repository, so uploading your changes is not a simple fast forward (and thus your push was rejected). Please pull down the new changes in the remote repository, incorporate them into this branch, and try again. You can do so with git pull or git pull --rebase'
  },
  'git-error-remote-branch': {
    __desc__: 'One of the error messages for git',
    en_US: 'You cannot execute that command on a remote branch'
  },
  'git-error-origin-required': {
    __desc__: 'One of the error messages for git',
    en_US: 'An origin is required for that command'
  },
  'git-error-origin-exists': {
    __desc__: 'One of the error messages for git',
    en_US: 'An origin already exists! You cannot make a new one'
  },
  'git-error-branch': {
    __desc__: 'One of the error messages for git',
    en_US: "You can't delete the main branch, the branch you are on, or things that aren't branches"
  },
  'git-merge-msg': {
    __desc__: 'The commit message for a merge commit',
    en_US: 'Merge {target} into {current}'
  },
  'git-error-rebase-none': {
    __desc__: 'One of the error messages for git',
    en_US: 'No commits to rebase! Everything is a merge commit or changes already applied'
  },
  'git-result-nothing': {
    __desc__: 'The message that explains the result of a git command',
    en_US: 'Nothing to do...'
  },
  'git-result-fastforward': {
    __desc__: 'The message that explains the result of a git command',
    en_US: 'Fast forwarding...'
  },
  'git-result-uptodate': {
    __desc__: 'The message that explains the result of a git command',
    en_US: 'Branch already up-to-date'
  },
  'git-error-exist': {
    __desc__: 'One of the error messages for git',
    en_US: 'The ref {ref} does not exist or is unknown'
  },
  'git-error-relative-ref': {
    __desc__: 'One of the error messages for git',
    en_US: 'Commit {commit} does not have a {match}'
  },
  'git-warning-detached': {
    __desc__: 'One of the warning messages for git',
    en_US: 'Warning!! Detached HEAD state'
  },
  'git-warning-add': {
    __desc__: 'One of the warning messages for git',
    en_US: 'No need to add files in this demo'
  },
  'git-error-options': {
    __desc__: 'One of the error messages for git',
    en_US: 'Those options you specified are incompatible or incorrect'
  },
  'git-error-already-exists': {
    __desc__: 'One of the error messages for git',
    en_US: 'The commit {commit} already exists in your changes set, aborting!'
  },
  'git-error-reset-detached': {
    __desc__: 'One of the error messages for git',
    en_US: "Can't reset in detached head! Use checkout if you want to move"
  },
  'git-warning-hard': {
    __desc__: 'One of the warning messages for git',
    en_US: 'The default behavior for resets on LearnGitBranching is a --hard, so feel free to omit that option if you get tired of typing it out in our lessons. Just remember that the default behavior on actual Git is --mixed.'
  },
  'git-error-staging': {
    __desc__: 'One of the error messages for git',
    en_US: 'There is no concept of adding / staging files, so that option or command is invalid!'
  },
  'git-revert-msg': {
    __desc__: 'Message for reverting git command',
    en_US: 'Reverting {oldCommit}: {oldMsg}'
  },
  'git-error-args-many': {
    __desc__: 'One of the error messages for git',
    en_US: 'I expect at most {upper} argument(s) for {what}'
  },
  'git-error-args-few': {
    __desc__: 'One of the error messages for git',
    en_US: 'I expect at least {lower} argument(s) for {what}'
  },
  'git-error-no-general-args': {
    __desc__: 'One of the error messages for git',
    en_US: 'That command accepts no general arguments'
  },
  'git-error-command-not-supported': {
    __desc__: 'Message that appears in git console when command was not recognized.',
    en_US: `The command "{command}" isn't supported, sorry!`
  },
  'copy-tree-string': {
    __desc__: 'The prompt to copy the tree when sharing',
    en_US: 'Copy the tree string below'
  },
  'learn-git-branching': {
    __desc__: 'The title of the app, with spaces',
    en_US: 'Git Visualizer'
  },
  'select-a-level': {
    __desc__: 'The prompt to select a level on the drop down view',
    en_US: 'Select a level'
  },
  'main-levels-tab': {
    __desc__: 'The name of main levels tab on the drop down view',
    en_US: 'Main'
  },
  'remote-levels-tab': {
    __desc__: 'The name of remote levels tab on the drop down view',
    en_US: 'Remote'
  },
  'branch-name-short': {
    __desc__: 'When branch names get too long, we need to truncate them. This is the warning for that',
    en_US: 'Sorry, we need to keep branch names short for the visuals. Your branch name was truncated to 9 characters, resulting in "{branch}"'
  },
  'bad-branch-name': {
    __desc__: 'When the user enters a branch name thats not ok',
    en_US: 'That branch name "{branch}" is not allowed!'
  },
  'bad-tag-name': {
    __desc__: 'When the user enters a tag name thats not ok',
    en_US: 'That tag name "{tag}" is not allowed!'
  },
  'option-not-supported': {
    __desc__: 'When the user specifies an option that is not supported by our demo',
    en_US: 'The option "{option}" is not supported!'
  },
  'git-usage-command': {
    __desc__: 'The line that shows how to format a git command',
    en_US: 'git <command> [<args>]'
  },
  'git-supported-commands': {
    __desc__: 'In the git help command, the header above the supported commands',
    en_US: 'Supported commands:'
  },
  'git-usage': {
    __desc__: 'In the dummy git output, the header before showing all the commands',
    en_US: 'Usage:'
  },
  'git-version': {
    __desc__: 'The git version dummy output, kind of silly. PCOTTLE is my unix name but feel free to put yours instead',
    en_US: 'Git Version PCOTTLE.1.0'
  },
  'refresh-tree-command': {
    __desc__: 'when the tree is visually refreshed',
    en_US: 'Refreshing tree...'
  },
  'locale-command': {
    __desc__: 'when the locale is set to something',
    en_US: 'Locale set to {locale}'
  },
  'locale-reset-command': {
    __desc__: 'when the locale is reset',
    en_US: 'Locale reset to default, which is {locale}'
  },
  'show-command': {
    __desc__: 'command output title from "show"',
    en_US: 'Please use one of the following commands for more info:'
  },
  'show-all-commands': {
    __desc__: 'command output title from "show commands"',
    en_US: 'Here is a list of all the commmands available:'
  },
  'cd-command': {
    __desc__: 'dummy command output for the command in the key',
    en_US: 'Directory changed to "/directories/dont/matter/in/this/demo"'
  },
  'ls-command': {
    __desc__: 'Dummy command output for the command in the key',
    en_US: 'DontWorryAboutFilesInThisDemo.txt'
  },
  'mobile-alert': {
    __desc__: 'When someone comes to the site on a mobile device, they can not input commands so this is a nasty alert to tell them',
    en_US: "LGB can't receive input on mobile, visit on desktop! it's worth it :D"
  },
  'share-tree': {
    __desc__: 'When you export a tree, we want you to share the tree with friends',
    en_US: 'Share this tree with friends! They can load it with "import tree"'
  },
  'paste-json': {
    __desc__: 'When you are importing a level or tree',
    en_US: 'Paste a JSON blob below!'
  },
  'solved-map-reset': {
    __desc__: 'When you reset the solved map to clear your solved history, in case someone else wants to use your browser',
    en_US: 'Solved map was reset, you are starting from a clean slate!'
  },
  'level-cant-exit': {
    __desc__: 'When the user tries to exit a level when they are not in one',
    en_US: 'You are not in a level! You are in a sandbox, start a level with "levels"'
  },
  'level-no-id': {
    __desc__: "When you say an id but that level doesn't exist",
    en_US: 'A level for that id "{id}" was not found! Opening up a level selection view'
  },
  'undo-stack-empty': {
    __desc__: 'The undo command can only undo back until the last time the level was reset or the beginning of the level',
    en_US: 'The undo stack is empty!'
  },
  'already-solved': {
    __desc__: 'When you play in a level that is already solved',
    en_US: 'You have already solved this level, try other levels with "levels" or go back to sandbox with "sandbox"'
  },
  'solved-level': {
    __desc__: 'When you solved a level',
    en_US: 'Solved!!\n:D'
  },
  'command-disabled': {
    __desc__: 'When you try a command that is disabled',
    en_US: 'That git command is disabled for this level!'
  },
  'share-json': {
    __desc__: 'when you have made the level, prompt to share this',
    en_US: 'Here is the JSON for this level! Share it with someone or send it to me on GitHub'
  },
  'want-start-dialog': {
    __desc__: 'prompt to add a start dialog',
    en_US: 'You have not specified a start dialog, would you like to add one?'
  },
  'want-hint': {
    __desc__: 'prompt to add a hint',
    en_US: 'You have not specified a hint, would you like to add one?'
  },
  'prompt-hint': {
    __desc__: 'prompt for hint',
    en_US: 'Enter the hint for this level, or leave this blank if you do not want to include one'
  },
  'prompt-name': {
    __desc__: 'prompt for level name',
    en_US: 'Enter the name for the level'
  },
  'solution-empty': {
    __desc__: 'If you define a solution without any commands, aka a level that is solved without doing anything',
    en_US: 'Your solution is empty!! Something is amiss'
  },
  'define-start-warning': {
    __desc__: 'When you define the start point again, it overwrites the solution and goal so we add a warning',
    en_US: 'Defining start point... solution and goal will be overwritten if they were defined earlier'
  },
  'help-vague-level': {
    __desc__: 'When you are in a level and you say help, its vague and you need to specify',
    en_US: 'You are in a level, so multiple forms of help are available. Please select either "help level" to learn more about this lesson, "help general" for using Learn GitBranching, or "objective" to learn about how to solve the level.'
  },
  'help-vague-builder': {
    __desc__: 'When you are in a level builder, the help command is vague so you need to specify what you mean',
    en_US: 'You are in a level builder, so multiple forms of help are available. Please select either "help general" or "help builder"'
  },
  'show-goal-button': {
    __desc__: 'button label to show goal',
    en_US: 'Show Goal'
  },
  'hide-goal-button': {
    __desc__: 'button label to hide goal',
    en_US: 'Hide Goal'
  },
  'objective-button': {
    __desc__: 'button label to show objective',
    en_US: 'Instructions'
  },
  'git-demonstration-title': {
    __desc__: 'title of git demonstration window',
    en_US: 'Git Demonstration'
  },
  'goal-to-reach': {
    __desc__: 'title of window that shoes the goal tree to reach',
    en_US: 'Goal To Reach'
  },
  'goal-only-main': {
    __desc__: 'the helper message for the window that shows the goal tree when the goal will only be compared using the main branch',
    en_US: '<span class="fwber">Note:</span> Only the main branch will be checked in this level. The other branches are simply for reference (shown as dashed labels below). As always, you can hide this dialog with "hide goal"'
  },
  'hide-goal': {
    __desc__: 'the helper message for the window that shows the goal tree',
    en_US: 'You can hide this window with "hide goal"'
  },
  'hide-start': {
    __desc__: 'The helper message for the window that shows the start tree for a level',
    en_US: 'You can hide this window with "hide start"'
  },
  'level-builder': {
    __desc__: 'The name for the environment where you build levels',
    en_US: 'Level Builder'
  },
  'no-start-dialog': {
    __desc__: 'when the user tries to open a start dialog for a level that does not have one',
    en_US: 'There is no start dialog to show for this level!'
  },
  'no-hint': {
    __desc__: 'when no hint is available for a level',
    en_US: "Hmm, there doesn't seem to be a hint for this level :-/"
  },
  'error-untranslated-key': {
    __desc__: 'This error happens when we are trying to translate a specific key and the locale version is mission',
    en_US: 'The translation for {key} does not exist yet :( Please hop on github and offer up a translation!'
  },
  'error-untranslated': {
    __desc__: 'The general error when we encounter a dialog that is not translated',
    en_US: 'This dialog or text is not yet translated in your locale :( Hop on github to aid in translation!'
  },
  'cancel-button': {
    __desc__: 'Cancel button label after completing a level',
    en_US: 'Cancel'
  },
  'confirm-button': {
    __desc__: 'Confirm button label after completing a level',
    en_US: 'Confirm'
  },
  'level-label': {
    __desc__: 'Label in the top of the left-side menu. Rembember to leave some space on the sides',
    en_US: ' Level '
  },
  'command-helper-bar-levels': {
    __desc__: 'Levels command label in the bottom command helper bar.',
    en_US: 'Levels'
  },
  'command-helper-bar-solution': {
    __desc__: 'Solution command label in the bottom command helper bar.',
    en_US: 'Solution'
  },
  'command-helper-bar-reset': {
    __desc__: 'Reset command label in the bottom command helper bar.',
    en_US: 'Reset'
  },
  'command-helper-bar-undo': {
    __desc__: 'Undo command label in the bottom command helper bar.',
    en_US: 'Undo'
  },
  'command-helper-bar-objective': {
    __desc__: 'Objective command label in the bottom command helper bar.',
    en_US: 'Objective'
  },
  'command-helper-bar-help': {
    __desc__: 'Help command label in the bottom command helper bar.',
    en_US: 'Help'
  },
  'error-command-currently-not-supported': {
    __desc__: 'Message that appears in git console when command is not supported in the current environment.',
    en_US: 'That command is valid, but not supported in this current environment! Try entering a level or level builder to use that command'
  },
  'interactive-rebase-title': {
    __desc__: 'Title for the popup',
    en_US: 'Interactive Rebase'
  }
};
