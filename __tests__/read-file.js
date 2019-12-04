var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('readFile', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).readFile('file.txt', function (err, value) {
    expect(err).toBeFalsy()
    expect(value.toString()).toStrictEqual('foobar')

    done()
  })
})

test('readFileSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  expect(
    subfs({ dir, fs })
      .readFileSync('file.txt')
      .toString()
  ).toStrictEqual('foobar')
})
