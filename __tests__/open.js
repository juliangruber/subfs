var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('open', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).open('file.txt', 'r', function (err, fd) {
    expect(err).toBeFalsy()
    expect(fd).toBeTruthy()

    done()
  })
})

test('openSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  expect(subfs({ dir, fs }).openSync('file.txt', 'r')).toBeTruthy()
})
