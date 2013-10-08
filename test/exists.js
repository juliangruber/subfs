var test = require('tap').test;
var fs = require('fs');
var subfs = require('..');
var os = require('os');
var join = require('path').join;

test('exists', function(t) {
  t.plan(2);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);

    subfs(fs, dir).exists('file.txt', function(exists) {
      t.ok(exists);
    });
  });
});

test('existsSync', function(t) {
  t.plan(2);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);
    t.ok(subfs(fs, dir).existsSync('file.txt'));
  });
});

