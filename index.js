var gutil = require('gulp-util')
var through = require('through2')
var exec = require('child_process').exec
var chalk = require('chalk')

/**
 * Builds shell command for PHPMD according to specified options.
 */
var buildCommand = function(file, opt) {
  var opt = opt || {}
  var command = (opt.bin || 'phpmd') + ' ' + file.path

  if (opt.hasOwnProperty('format')) {
    command += ' ' + opt.format + ' '
  }

  if (opt.hasOwnProperty('ruleset')) {
    command += ' ' + opt.ruleset + ' '
  }

  if (opt.hasOwnProperty('minimumpriority')) {
    command += ' --minimumpriority="' + opt.minimumpriority + '"'
  }

  if (opt.hasOwnProperty('strict')) {
    command += ' --strict'
  }

  return command
}

var phpmdPlugin = function(options) {
  return through.obj(function(file, enc, callback) {
    var stream = this

    if (file.isNull()) {
      stream.push(file)
      callback()

      return
    }

    if (file.isStream()) {
      stream.emit('error', new gutil.PluginError('gulp-phpmd', 'Streams are not supported'))
      callback()

      return
    }

    // Run PHPMD
    exec(buildCommand(file, options), function(error, stdout, stderr) {
      if (error) {
        var message = 'PHP Code Sniffer found a ' + chalk.yellow('problem')
                    + ' in ' + chalk.magenta(file.path) + '\n\t'
                    + stdout.replace(/\n/g, '\n\t');
        stream.emit('error', new gutil.PluginError('gulp-phpmd', message))
        callback()

        return
      }

      stream.push(file)
      callback()
    })
  })
}

module.exports = phpmdPlugin
