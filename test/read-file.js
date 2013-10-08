var test = require('tap').test;
var fs = require('fs');
var subfs = require('..');
var os = require('os');
var join = require('path').join;

test('readFile', function(t) {
  t.plan(3);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);

    subfs(fs, dir).readFile('file.txt', function(err, value) {
      t.error(err);
      t.equal(value.toString(), 'foobar');
    });
  });
});

test('readFileSync', function(t) {
  t.plan(2);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);
    t.equal(subfs(fs, dir).readFileSync('file.txt').toString(), 'foobar');
  });
});

