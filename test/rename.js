var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('rename', function (t) {
  t.plan(3)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(fs, dir).rename('file.txt', 'renamed.txt', function (err) {
    t.error(err)
    t.notOk(fs.existsSync(join(dir, 'file.txt')))
    t.ok(fs.existsSync(join(dir, 'renamed.txt')))
  })
})

test('renameSync', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(fs, dir).renameSync('file.txt', 'renamed.txt')
  t.notOk(fs.existsSync(join(dir, 'file.txt')))
  t.ok(fs.existsSync(join(dir, 'renamed.txt')))
})
