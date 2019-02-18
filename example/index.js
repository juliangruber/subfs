var fs = require('fs')
var subfs = require('..')

var sub = subfs(fs, __dirname + '/dir')

sub.writeFile('file.txt', 'foobar', function (err) {
  if (err) throw err
  fs.readFile(__dirname + '/dir/file.txt', function (err, value) {
    if (err) throw err
    console.log('value: %s', value)
  })
})
