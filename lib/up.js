var path = require('path')

module.exports = up

function up (base, rel) {
  rel = path.normalize(path.join(base, rel))
  if (/^\.\./.test(path.relative(base, rel))) {
    rel = path.join(base, path.basename(rel))
  }
  return rel
}
