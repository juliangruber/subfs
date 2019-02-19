const fs = require('fs')

const up = require('./lib/up')

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
]).flatMap(mapSync)

const TWO_ARGUMENTS_CALLBACKS = TWO_ARGUMENTS_PROMISES.flatMap(mapSync)

function mapSync (methodName) {
  return [methodName, `${methodName}Sync`]
}

function sub (target, src, dir, oneArgumentFunctions, twoArgumentsFunctions) {
  // functions with 1st path argument
  oneArgumentFunctions.forEach(function (m) {
    const func = src[m]
    if (!func) return

    target[m] = function (...args) {
      args[0] = up(dir, args[0])

      return func.apply(src, args)
    }
  })

  // functions with 1st and 2nd path arguments
  twoArgumentsFunctions.forEach(function (m) {
    const func = src[m]
    if (!func) return

    target[m] = function (...args) {
      args[0] = up(dir, args[0])
      args[1] = up(dir, args[1])

      return func.apply(src, args)
    }
  })
}

module.exports = function (dir, _fs = fs) {
  const result = {}

  Object.defineProperty(result, '_resolve', { value: up.bind(result, dir) })

  sub(result, _fs, dir, ONE_ARGUMENT_CALLBACKS, TWO_ARGUMENTS_CALLBACKS)

  // Promises
  const { promises } = _fs
  if (!promises) return

  const target = {}
  result.promises = target

  sub(target, promises, dir, ONE_ARGUMENT_PROMISES, TWO_ARGUMENTS_PROMISES)

  return result
}
