var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('mkdir', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)

  subfs(fs, dir).mkdir('dir', function (err) {
    t.error(err)
    t.ok(fs.existsSync(join(dir, 'dir')))
  })
})

test('mkdirSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)

  subfs(fs, dir).mkdirSync('dir')
  t.ok(fs.existsSync(join(dir, 'dir')))
})
