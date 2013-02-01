
var channel = function( pos) { 
	//POSES[ pos] = 0;
	var worker = new Worker( WORKER + '.js');
	worker.onmessage = function( e) { 
		if ( e.data == 'done') { console.log( 'closed'); return; }
		var data;
		try { data = new Uint8Array( e.data); }
		catch( e) { return; } 	// error in datatype, return 
		BUFFER[ '' + pos] = data; 
		pos += STREAMS * CHUNKSIZE;
	}
	worker.postMessage( { bip: $.io.bip, CHUNKSIZE: CHUNKSIZE, STREAMS: STREAMS, pos: pos, THRU: THRU, LASTPOS: LASTPOS});
	pos *= CHUNKSIZE;
}
for ( var i = 0; i < STREAMS; i++) eval( channel)( i);