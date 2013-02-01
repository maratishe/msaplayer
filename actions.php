<?php
set_time_limit( 0);
ob_implicit_flush( 1);
require_once( 'libs.php');
$s = hm( $_GET, $_POST); htg( $s);  
if ( $action == 'websocketserver') { 
	if ( procpid( 'websocket.server.php')) prockill( procpid( 'websocket.server.php'));
	procat( '/usr/local/php/bin/php /web/myplayer/websocket.server.php 0.0.0.0 5000');
	die( jsonsend( jsonmsg( 'ok')));
}
if ( $action == 'chunk') { // [seek], streams, thru, size
	// throughput
	$maxthru = round( 1920000 / 34);	// max thru per channel
	$rthru = round( $thru, 2) * $maxthru;
	$athru = 100000000;
	$diff = $athru - $rthru; // if ( $diff < 0) $diff = 0;
	$thru = $athru - $diff;	// the actual throughput
	$time = round( 1000000 * ( $size / $thru));
	usleep( $time);
	// read and send the chunk
	$in = fopen( 'test.webm', 'r');
	if ( isset( $seek) && $in) fseek( $in, $seek);
	if ( ! $in || feof( $in)) die( '');
	echo fread( $in, $size);
	fclose( $in);
}
if ( $action == 'stats') { // took, setup, timegaps
	$out = foutopen( "raw.bz64jsonl", 'a');
	$time = tsystem(); $shouldtake = 34000;	// test.webm should take 34s
	$setup = json2h( $setup, true);
	$timegaps = json2h( $timegaps, true);
	foutwrite( $out, compact( ttl( 'time,took,shouldtake,setup,timegaps')));
	foutclose( $out);
	die( jsonsend( jsonmsg( 'ok')));
}

?>
