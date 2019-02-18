var test = require('tap').test
var fs = require('fs')
var subfs = require('..')
var os = require('os')
var join = require('path').join

test('readFile', function (t) {
  t.plan(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(fs, dir).readFile('file.txt', function (err, value) {
    t.error(err)
    t.equal(value.toString(), 'foobar')
  })
})

test('readFileSync', function (t) {
  t.plan(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  t.equal(
    subfs(fs, dir)
      .readFileSync('file.txt')
      .toString(),
    'foobar'
  )
})
