var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('rmdir', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  subfs({ dir, fs }).rmdir('dir', function (err) {
    expect(err).toBeFalsy()
    expect(fs.existsSync(join(dir, 'dir'))).toBeFalsy()

    done()
  })
})

test('rmdirSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  subfs({ dir, fs }).rmdirSync('dir')
  expect(fs.existsSync(join(dir, 'dir'))).toBeFalsy()
})
