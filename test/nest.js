var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('nest', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  fs.writeFile(join(dir, 'dir', 'file.txt'), 'foobar', function (err) {
    t.error(err)

    subfs(subfs(fs, dir), 'dir').exists('file.txt', function (exists) {
      t.ok(exists)
    })
  })
})
