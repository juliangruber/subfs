var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('exists', function (done) {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).exists('file.txt', function (exists) {
    expect(exists).toBeTruthy()

    done()
  })
})

test('existsSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  expect(subfs(dir, fs).existsSync('file.txt')).toBeTruthy()
})
