/*jslint node: true */
'use strict';

var util = require('util');
var Transport = require('winston').Transport;

var EventLogger;
try {
	var nodeWindows = require('node-windows');
	EventLogger = nodeWindows.EventLogger;
}
catch ( err ) {
}


var EventLog = function (options) {
	Transport.call(this, options);
	options = options || {};

	this.name = 'eventlog';

	if ( EventLogger ) {
		var eventLog = options.eventLog || "application"; //system is also valid.
		var source = options.source || "node"; //system is also valid
		this.logger = new EventLogger(source, eventLog);
	}
};

util.inherits(EventLog, Transport);


EventLog.prototype.log = function (level, msg, meta, callback) {
	if (this.silent || !this.logger) {
		return callback(null, true);
	}

	var message = msg + (meta ? ("\r\n\r\n" + "metadata: " + JSON.stringify(meta, null, 2)) : "");

	switch ( level ) {
		default:
		case "info":
			this.logger.info(message);
			break;
		case "warning":
			this.logger.warn(message);
			break;
		case "error":
			this.logger.error(message);
			break;
	}
	
	this.emit('logged');

	callback(null, true);
};

module.exports = EventLog;

