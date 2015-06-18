# winston-winlog2
Windows Event Log logger for the node.js Winston module.

Exactly like the original winston-winlog, however uses coreybutler/node-windows instead of jfromaniello/windowseventlogjs so no native compiling using node-gyp is required. Also automatically pops up a UAC box if admin permissions are required.

## Installation

    $ npm install winston-winlog2
    $ npm install winston


## Usage

Configure :

```js
  var winston = require('winston'),
      winlog = require("winston-winlog2");

  winston.add(winlog, { source: 'myapp' });
```

Then you can do:

```bash
  winston.info("this is an info message");
  winston.warning("this is an warning message");
  winston.error("this is an error message");
```

And you will see

![2012-04-07_1148.png](http://joseoncodecom.ipage.com/wp-content/uploads/images/2012-04-07_1148.png)

### Custom event log

When adding the transport you can define a custom event log as follows:

```js
  winston.add(winlog, { source: 'myapp', eventLog: 'MyCustomEventLog' });
```

Then you will find your logs under "Applications and Services Logs"

![2012-04-20_0904.png](http://joseoncodecom.ipage.com/wp-content/uploads/images/2012-04-20_0904.png)

## How it works

This transport uses the module [node-windows](https://github.com/coreybutler/node-windows) to log events. 

The transport will do nothing (*doesn't throw!*) if you run it on a platform other than win32.
