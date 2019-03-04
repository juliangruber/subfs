const { join, normalize, sep } = require('path')

module.exports = up

function up (base, rel) {
  rel = normalize(rel).split(sep)

  // At root dir `..` direntry point to itself, remove them from path
  while (rel[0] === '..') rel.shift()

  return join(base, ...rel)
}
