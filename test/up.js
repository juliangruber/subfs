var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('up', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).exists('../../../../../file.txt', function (exists) {
    t.ok(exists)
  })
})
