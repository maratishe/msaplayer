var B = {};
B.active = true;
this.onmessage = function( e) {
	var h = e.data;
	// get content using web socket
	var socket = new WebSocket( "ws://" + h.bip + ":5000");
	socket.binaryType = "arraybuffer";
	socket.onopen = function( h2) { 
		socket.send( ( h.CHUNKSIZE * h.pos) + ' ' + h.CHUNKSIZE + ' ' + h.STREAMS + ' ' + h.THRU + ' ' + h.LASTPOS);
		h.pos += h.pos * h.CHUNKSIZE;
	} 
	socket.onmessage = function( h2) { 
		//var data = new Uint8Array( h2.data);
		//POSES[ pos] += data.length;
		//console.log( 'put pos/length', pos, data.length);
		//BUFFER[ '' + h.pos] = data;
		h.pos += h.STREAMS * h.CHUNKSIZE;
		postMessage( h2.data, [ h2.data]);
		//buffer.append( data);
		//console.log( POSES);
	}
	socket.onclose = function( h2) {  postMessage( 'done'); close(); }
}