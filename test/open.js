var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('open', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(fs, dir).open('file.txt', 'r', function (err, fd) {
    t.error(err)
    t.ok(fd)
  })
})

test('openSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  t.ok(subfs(fs, dir).openSync('file.txt', 'r'))
})
