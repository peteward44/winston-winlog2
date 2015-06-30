/*global describe:false, it:false */
'use strict';

var winston = require('winston');
var winlog = require('../');


describe('winston-winlog2', function() {
	
	before( function() {
		winston.add( winlog, {} );
	} );
	
	it('info', function(done) {
		winston.info( 'info message', function( err ) {
			done( err );
		} );
	});
	
	it('warn', function(done) {
		winston.warn( 'warning message', function( err ) {
			done( err );
		} );
	});
	
	it('error', function(done) {
		winston.error( 'error message', function( err ) {
			done( err );
		} );
	});
		
	it('info newline', function(done) {
		winston.info( 'info message\r\nnewline', function( err ) {
			done( err );
		} );
	});
	
	it('warn newline', function(done) {
		winston.warn( 'warning message\r\nnewline', function( err ) {
			done( err );
		} );
	});
	
	it('error newline', function(done) {
		winston.error( 'error message\r\nnewline', function( err ) {
			done( err );
		} );
	});
		
	it('info metadata', function(done) {
		winston.info( 'info message', { 'meta': true, nested: { foo: 'bar', bool: true } }, function( err ) {
			done( err );
		} );
	});
	
	it('warn metadata', function(done) {
		winston.warn( 'warning message', { 'meta': true, nested: { foo: 'bar', bool: true } }, function( err ) {
			done( err );
		} );
	});
	
	it('error metadata', function(done) {
		winston.error( 'error message', { 'meta': true, nested: { foo: 'bar', bool: true } }, function( err ) {
			done( err );
		} );
	});
});

