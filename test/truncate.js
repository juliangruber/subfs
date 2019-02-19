var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('truncate', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).truncate('file.txt', 0, function (err) {
    t.error(err)
    t.equal(fs.readFileSync(join(dir, 'file.txt')).toString().length, 0)
  })
})

test('truncateSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).truncateSync('file.txt', 0)
  t.equal(fs.readFileSync(join(dir, 'file.txt')).toString().length, 0)
})
