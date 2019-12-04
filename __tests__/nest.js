var fs = require('fs')
var os = require('os')
var join = require('path').join

var subfs = require('..')

test('nest', function (done) {
  expect.assertions(2)
  var dir = join(
    os.tmpdir(),
    Math.random()
      .toString(16)
      .slice(2)
  )

  fs.mkdirSync(dir)
  fs.mkdirSync(join(dir, 'dir'))

  fs.writeFile(join(dir, 'dir', 'file.txt'), 'foobar', function (err) {
    expect(err).toBeFalsy()

    subfs({ dir: 'dir', fs: subfs({ dir, fs }) }).exists('file.txt', function (
      exists
    ) {
      expect(exists).toBeTruthy()

      done()
    })
  })
})
