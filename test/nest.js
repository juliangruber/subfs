var test = require('tap').test;
var fs = require('fs');
var subfs = require('..');
var os = require('os');
var join = require('path').join;

test('nest', function(t) {
  t.plan(3);
  var dir = os.tmpdir();

  fs.mkdir(join(dir, 'dir'), function(err) {
    t.error(err);

    fs.writeFile(join(dir, 'dir', 'file.txt'), 'foobar', function(err) {
      t.error(err);

      subfs(subfs(fs, dir), 'dir').exists('file.txt', function(exists) {
        t.ok(exists);
      });
    });
  });
});

