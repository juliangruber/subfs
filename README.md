# subfs

Create subfilesystems that are rooted at a specific directory.

[![build status](https://secure.travis-ci.org/juliangruber/subfs.png)](http://travis-ci.org/juliangruber/subfs)

## Motivation

Node's filesystem api isn't very composable because you can't pass a filesystem referecne to a directory,
you only can pass path prefixes to libraries that do something with the filesystem.

That approach has the downside that all those libraries require the `fs` module themselves, so they
don't run on the client, because you can't pass in a custom filesystem instance (which could be backed
by IndexDB or LocalStore for example). Yes, dependency injection.

So with this module, you can pass references to file system paths, that a module can treat as the root
filesystem and can't write outside of (unless it's doing some magic native bindings stuff). Now you just
need to encourage developers to accept `subfs` instances instead of paths in their modules!

## Example

```js
const subfs = require('subfs');


const sub = subfs(__dirname + '/dir');

// write file.txt into the filesystem mounted at ./dir
sub.writeFile('file.txt', 'foobar', function(err) {
  if (err) throw err;

  fs.readFile(__dirname + '/dir/file.txt', function(err, value) {
    if (err) throw err;

    console.log('value: %s', value);
    // value: foobar
  });
});
```

A module that consumes `subfs` could be called like this:

```js
const subfs = require('subfs');
const Logs = require('your-logs-module');

const logs = Logs(subfs(__dirname + '/logs'));
```

In the browser, initialize it like this:

```js
const fs = require('level-fs-browser');
const subfs = require('subfs');
const Logs = require('your-logs-module');

const logs = Logs(subfs(__dirname + '/logs', fs));
```

You just need to change one line!

## API

```js
var subfs = require('subfs');
```

### const sub = subfs(dir, fs)

Create a [fs](http://nodejs.org/api/fs.html) clone that prefixes each operation
with the given `dir`.

## Installation

With [npm](https://npmjs.org) do:

```bash
npm install subfs
```

## License

(MIT)

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
