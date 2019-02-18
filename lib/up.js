var path = require('path')

module.exports = up

function removeUp (slice) {
  return slice !== '..'
}

function up (base, rel) {
  rel = path.normalize(path.join(base, rel))

  const relative = path.relative(base, rel)
  if (relative.startsWith('..')) {
    // At root dir, `..` direntry point to itself
    rel = path.join(base, ...relative.split(path.sep).filter(removeUp))
  }

  return rel
}
