
var channel = function( pos) { 
	pos *= CHUNKSIZE;
	var one = function() { $.arraybufferload( 'actions.php?action=chunk&streams=' + STREAMS + '&thru=' + THRU + '&seek=' + pos + '&size=' + CHUNKSIZE, function( L) { 
		if ( ! L || ! L.length) return one();
		BUFFER[ '' + pos] = L;
		pos += CHUNKSIZE * STREAMS;
		eval( one)();
	}); }
	eval( one)();
}
for ( var i = 0; i < STREAMS; i++) eval( channel)( i);
	
