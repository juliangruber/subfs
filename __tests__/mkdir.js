var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('mkdir', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)

  subfs(dir, fs).mkdir('dir', function (err) {
    expect(err).toBeFalsy()
    expect(fs.existsSync(join(dir, 'dir'))).toBeTruthy()

    done()
  })
})

test('mkdirSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)

  subfs(dir, fs).mkdirSync('dir')
  expect(fs.existsSync(join(dir, 'dir'))).toBeTruthy()
})
