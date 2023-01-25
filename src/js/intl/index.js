var _ = require('underscore');
var strings = require('../intl/strings').strings;

var defaultLocale = "en_US";

// lets change underscores template settings so it interpolates
// things like "{branchName} does not exist".
var templateSettings = Object.assign({}, _.templateSettings);
templateSettings.interpolate = /\{(.+?)\}/g;
var template = exports.template = function(str, params) {
  return _.template(str, templateSettings)(params);
};

var str = exports.str = function(key, params) {
  params = params || {};
  // this function takes a key like "error-branch-delete"
  // and parameters like {branchName: 'bugFix', num: 3}.
  //
  // it sticks those into a translation string like:
  //   'en': 'You can not delete the branch {branchName} because' +
  //         'you are currently on that branch! This is error number + {num}'
  //
  // to produce:
  //
  // 'You can not delete the branch bugFix because you are currently on that branch!
  //  This is error number 3'

  if (!strings[key][defaultLocale]) {
    if (key !== 'error-untranslated') {
      return str('error-untranslated');
    }
    return 'No translation for the key "' + key + '"';
  }

  return template(
    strings[key][defaultLocale],
    params
  );
};

var getIntlKey = exports.getIntlKey = function(obj, key) {
  if (!obj || !obj[key]) {
    throw new Error('that key ' + key + ' doesn\'t exist in this blob ' + obj);
  }
  if (!obj[key][defaultLocale]) {
    console.warn(
      'WARNING!! This blob does not have intl support:',
      obj,
      'for this key',
      key
    );
  }

  return obj[key][defaultLocale];
};

exports.todo = function(str) {
  return str;
};

exports.getDialog = function(obj) {
  return getIntlKey(obj, 'dialog') || obj.dialog[defaultLocale];
};

exports.getHint = function(level) {
  if (!getIntlKey(level, 'hint')) {
    return getIntlKey(level, 'hint', defaultLocale) + ' -- ' + str('error-untranslated');
  }
  return getIntlKey(level, 'hint');
};

exports.getName = function(level) {
  if (!getIntlKey(level, 'name')) {
    return getIntlKey(level, 'name', defaultLocale) + ' -- ' + str('error-untranslated');
  }
  return getIntlKey(level, 'name');
};

