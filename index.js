var join = require('path').join;
var slice = [].slice;

module.exports = sub;

function sub(_fs, dir) {
  var fs = {};

  Object.keys(_fs).forEach(function(m) {
    fs[m] = _fs[m];
  });

  // methods with 1st path argument
  [
    'exists', 'existsSync', 'readFile', 'readFileSync', 'open', 'openSync', 
    'truncate', 'truncateSync', 'rmdir', 'rmdirSync', 'mkdir', 'mkdirSync',
    'readdir', 'readdirSync', 'lstat', 'lstatSync', 'stat', 'statSync',
    'readlink', 'readlinkSync', 'unlink', 'unlinkSync', 'lchmod',
    'lchmodSync', 'chmod', 'chmodSync', 'lchown', 'lchownSync', 'chown',
    'chownSync', 'utimes', 'utimesSync', 'writeFile', 'writeFileSync',
    'appendFile', 'appendFileSync', 'watch', 'watchFile', 'unwatchFile',
    'realpath', 'realpathSync', 'createReadStream', 'createWriteStream',
    'SyncWriteStream'
  ].forEach(function(m) {
    if (!_fs[m]) return;
    fs[m] = function() {
      var args = slice.call(arguments);
      args[0] = join(dir, args[0]);
      return _fs[m].apply(_fs, args);
    }
  });

  // methods with 1st and 2nd path argemt
  [
    'rename', 'renameSync', 'symlink', 'symlinkSync', 'link', 'linkSync'
  ].forEach(function(m) {
    if (!_fs[m]) return;
    fs[m] = function() {
      var args = slice.call(arguments);
      args[0] = join(dir, args[0]);
      args[1] = join(dir, args[1]);
      return _fs[m].apply(_fs, args);
    };
  });

  return fs;
}

