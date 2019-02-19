var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('rmdir', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  subfs(dir, fs).rmdir('dir', function (err) {
    t.error(err)
    t.notOk(fs.existsSync(join(dir, 'dir')))
  })
})

test('rmdirSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  subfs(dir, fs).rmdirSync('dir')
  t.notOk(fs.existsSync(join(dir, 'dir')))
})
