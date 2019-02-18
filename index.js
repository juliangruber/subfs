var up = require('./lib/up')
var slice = [].slice

const ONE_ARGUMENT_PROMISES = [
  'access',
  'appendFile',
  'chmod',
  'chown',
  'lchmod',
  'lchown',
  'lstat',
  'mkdir',
  'open',
  'readdir',
  'readFile',
  'readlink',
  'realpath',
  'rmdir',
  'stat',
  'truncate',
  'unlink',
  'utimes',
  'writeFile'
]

const TWO_ARGUMENTS_PROMISES = ['copyFile', 'link', 'rename', 'symlink']

const ONE_ARGUMENT_CALLBACKS = ONE_ARGUMENT_PROMISES.concat([
  'createReadStream',
  'createWriteStream',
  'exists',
  'unwatchFile',
  'watch',
  'watchFile'
]).reduce(reduceSync, [])

const TWO_ARGUMENTS_CALLBACKS = TWO_ARGUMENTS_PROMISES.reduce(reduceSync, [])

function reduceSync (acc, m) {
  return acc.concat([m, m + 'Sync'])
}

module.exports = sub

function sub (
  _fs,
  dir,
  oneArgument = ONE_ARGUMENT_CALLBACKS,
  twoArguments = TWO_ARGUMENTS_CALLBACKS
) {
  // shallow clone
  var fs = {}
  Object.keys(_fs).forEach(function (m) {
    fs[m] = _fs[m]
  })

  // methods with 1st path argument
  oneArgument.forEach(function (m) {
    if (!_fs[m]) return
    fs[m] = function () {
      var args = slice.call(arguments)
      args[0] = up(dir, args[0])
      return _fs[m].apply(_fs, args)
    }
  })

  // methods with 1st and 2nd path argemt
  twoArguments.forEach(function (m) {
    if (!_fs[m]) return
    fs[m] = function () {
      var args = slice.call(arguments)
      args[0] = up(dir, args[0])
      args[1] = up(dir, args[1])
      return _fs[m].apply(_fs, args)
    }
  })

  // Promises
  if (_fs.promises) {
    fs.promises = sub(
      _fs.promises,
      dir,
      ONE_ARGUMENT_PROMISES,
      TWO_ARGUMENTS_PROMISES
    )
  }

  return fs
}
