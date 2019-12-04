var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('truncate', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).truncate('file.txt', 0, function (err) {
    expect(err).toBeFalsy()
    expect(
      fs.readFileSync(join(dir, 'file.txt')).toString().length
    ).toStrictEqual(0)

    done()
  })
})

test('truncateSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).truncateSync('file.txt', 0)
  expect(
    fs.readFileSync(join(dir, 'file.txt')).toString().length
  ).toStrictEqual(0)
})
