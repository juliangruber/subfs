var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('readdir', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  subfs({ dir, fs }).readdir('/', function (err, files) {
    expect(err).toBeFalsy()
    expect(files).toEqual(['file.txt'])

    done()
  })
})

test('readdirSync', function () {
  expect.assertions(1)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )
  fs.mkdirSync(dir)
  fs.writeFileSync(join(dir, 'file.txt'), 'foobar')

  expect(subfs({ dir, fs }).readdirSync('/')).toEqual(['file.txt'])
})
