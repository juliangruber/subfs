var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('stat', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).stat('file.txt', function (err, stat) {
    t.error(err)
    t.ok(stat)
  })
})

test('statSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  t.ok(subfs(dir, fs).statSync('file.txt'))
})
