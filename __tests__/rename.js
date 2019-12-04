var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('rename', function (done) {
  expect.assertions(3)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).rename('file.txt', 'renamed.txt', function (err) {
    expect(err).toBeFalsy()
    expect(fs.existsSync(join(dir, 'file.txt'))).toBeFalsy()
    expect(fs.existsSync(join(dir, 'renamed.txt'))).toBeTruthy()

    done()
  })
})

test('renameSync', function () {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).renameSync('file.txt', 'renamed.txt')
  expect(fs.existsSync(join(dir, 'file.txt'))).toBeFalsy()
  expect(fs.existsSync(join(dir, 'renamed.txt'))).toBeTruthy()
})
