var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('stat', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs(dir, fs).stat('file.txt', function (err, stat) {
    expect(err).toBeFalsy()
    expect(stat).toBeTruthy()

    done()
  })
})

test('statSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  expect(subfs(dir, fs).statSync('file.txt')).toBeTruthy()
})
