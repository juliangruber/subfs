const fs = require('fs')
const { join } = require('path')

const subfs = require('..')

const sub = subfs(join(__dirname, 'dir'))

sub.writeFile('file.txt', 'foobar', function (err) {
  if (err) throw err

  fs.readFile(join(__dirname, 'dir', 'file.txt'), function (err, value) {
    if (err) throw err

    console.log('value: %s', value)
  })
})
