var up = require('./lib/up')
var slice = [].slice

module.exports = sub

function sub (_fs, dir) {
  // shallow clone
  var fs = {}
  Object.keys(_fs).forEach(function (m) {
    fs[m] = _fs[m]
  })

  // methods with 1st path argument
  ;[
    'exists',
    'readFile',
    'open',
    'truncate',
    'rmdir',
    'mkdir',
    'readdir',
    'lstat',
    'stat',
    'readlink',
    'unlink',
    'lchmod',
    'chmod',
    'lchown',
    'chown',
    'utimes',
    'writeFile',
    'appendFile',
    'watch',
    'unwatchFile',
    'realpath',
    'createReadStream',
    'createWriteStream',
    'SyncWriteStream'
  ]
    .reduce(function (acc, m) {
      return acc.concat([m, m + 'Sync'])
    }, [])
    .forEach(function (m) {
      if (!_fs[m]) return
      fs[m] = function () {
        var args = slice.call(arguments)
        args[0] = up(dir, args[0])
        return _fs[m].apply(_fs, args)
      }
    })

  // methods with 1st and 2nd path argemt
  ;[
    'rename',
    'renameSync',
    'symlink',
    'symlinkSync',
    'link',
    'linkSync'
  ].forEach(function (m) {
    if (!_fs[m]) return
    fs[m] = function () {
      var args = slice.call(arguments)
      args[0] = up(dir, args[0])
      args[1] = up(dir, args[1])
      return _fs[m].apply(_fs, args)
    }
  })

  return fs
}
