/*jslint node: true */
'use strict';

var events = require('events');
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

	this.name		 = 'eventlog';
	this.eventLog	 = options.eventLog || "application"; //system is also valid.
	this.source	= options.source || "node"; //system is also valid
	this.json		 = options.json		|| false;
	this.timestamp = typeof options.timestamp !== 'undefined' ? options.timestamp : false;

	if ( EventLogger ) {
		this.logger = new EventLogger(this.source, this.eventLog);
	}

	if (this.json) {
		this.stringify = options.stringify || function (obj) {
			return JSON.stringify(obj, null, 2);
		};
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

exports.EventLog = EventLog;

exports.config = {
	levels: {
		info: 0,
		warning: 1,
		error: 2
	},
	colors: {
		info: 'green',
		warning: 'yellow',
		error: 'red'
	}
};

