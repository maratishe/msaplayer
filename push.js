
var channel = function( pos) { 
	// get content using web socket
	var socket = new WebSocket( "ws://" + $.io.bip + ":5000");
	socket.binaryType = "arraybuffer";
	socket.onopen = function( h) { 
		socket.send( ( CHUNKSIZE * pos) + ' ' + CHUNKSIZE + ' ' + STREAMS + ' ' + THRU + ' ' + LASTPOS);
		pos = pos * CHUNKSIZE;
	} 
	socket.onmessage = function( h) { 
		var data;
		try { data = new Uint8Array( h.data); }
		catch( e) { return; }	// error in data type, hoping for next data piece
		//POSES[ pos] += data.length;
		//console.log( 'put pos/length', pos, data.length);
		BUFFER[ '' + pos] = data;
		pos += STREAMS * CHUNKSIZE;
		//buffer.append( data);
		//console.log( POSES);
	}
	socket.onclose = function( h) {  }
}
for ( var i = 0; i < STREAMS; i++) eval( channel)( i);
	
