'use strict';

var config = require('../config');
var gulp = require('gulp');

var MergeStream = require('merge-stream');

var imagemin = require('gulp-imagemin');
var _ = require('lodash');

/**************************
 * Task processes and copies all dependencies, either installed by npm or stored locally in the project
 **************************/
function dependencies() {

  //as we do multiple things in this task, we merge the multiple streams
  var stream = new MergeStream();

  //copy over libs which are not on npm (/tpl) , add by sianting at 20220926.
  var tplTask = gulp.src(config.sources.globs.tpl, { allowEmpty: true });

  _.forEach(config.roots, function (root) {
    tplTask = tplTask.pipe(gulp.dest(root + config.targets.tpl))
  });

  stream.add(tplTask);

  return stream;
};

module.exports = { dependencies: dependencies };
