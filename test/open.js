var test = require('tap').test;
var fs = require('fs');
var subfs = require('..');
var os = require('os');
var join = require('path').join;

test('open', function(t) {
  t.plan(3);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);

    subfs(fs, dir).open('file.txt', 'r', function(err, fd) {
      t.error(err);
      t.ok(fd);
    });
  });
});

test('openSync', function(t) {
  t.plan(2);
  var dir = os.tmpdir();

  fs.writeFile(join(dir, 'file.txt'), 'foobar', function(err) {
    t.error(err);
    t.ok(subfs(fs, dir).openSync('file.txt', 'r'));
  });
});

