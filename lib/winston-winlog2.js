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
		var eventLog = options.eventLog || "APPLICATION"; //SYSTEM is also valid.
		var source = options.source || "node";
		this.logger = new EventLogger(source, eventLog);
	}
};

util.inherits(EventLog, Transport);


EventLog.prototype.log = function (level, msg, meta, callback) {
	if (this.silent || !this.logger) {
		return callback(null, true);
	}
	var that = this;
	var message = msg + (meta ? (" metadata: " + JSON.stringify(meta, null, 2)) : "");
	// new lines not supported by node-windows as it passes message on the command line through child_process.exec: Remove them
	message = message.replace( /[\r\n]+/g, ' ' );
	
	var cb = function( err ) {
		that.emit('logged');
		callback(null, true);
	};

	switch ( level ) {
		default:
		case "info":
			this.logger.info(message, 100, cb );
			break;
		case "warn":
			this.logger.warn(message, 100, cb);
			break;
		case "error":
			this.logger.error(message, 100, cb);
			break;
	}
};

module.exports = EventLog;

