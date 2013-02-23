<?php


mb_internal_encoding( "UTF-8");
// search and index
$LUCENEDIR = '/ntfs/lucene'; 
$LUCENECODEDIR = '/code/lucene2';
$CONTENTDIR = '/ntfs/content';
// perform aslock() for each file (for now, only JSON)
$ASLOCKON = false;	// locks files before all file operations
$IOSTATSON = false; // when true, will collect statistics about file file write/reads (with locks)
// collect IO stats globally (can be used by a logger) (only JSON implements it for now)
$IOSTATS = array();  // stats is in [ {type,time,[size]}, ...] 
// file locks
$ASLOCKS = array();	$ASLOCKSTATS = array(); $ASLOCKSTATSON = false; // filename => lock
$JQMODE = 'sourceone';	// debug|source|sourceone (debug is SCRIPT tag per file, sourceone is stuff put into one file)
$JQMAP = array( 'libs' => 'jquery.', 'basics' => '', 'advanced' => '');
$JQ = array(		// {{{ all JQ files (jquery.*.js)
	'libs' => array( 	// those that cannot be changed
		'1.6.4', 'base64', 'form', 'json.2.3', 'Storage', 'svg', 'timers' //, 'lzw-async'
	),
	'basics' => array( 'ioutils', 'iobase'),
	'advanced' => array(
		'iodraw',
		// ioatoms
		'ioatoms',
		'ioatoms.input', 'ioatoms.containers', 
		'ioatoms.output', 'ioatoms.gui', 'ioatoms.gridgui'
	)
); // }}}
$env = makenv(); // CDIR,BIP,SBDIR,ABDIR,BDIR,BURL,ANAME,DBNAME,ASESSION,RIP,RPORT,RAGENT
//var_dump( $env);
foreach ( $env as $k => $v) $$k = $v;
$DB = null; $DBNAME = $ANAME;	// db same as ANAME
$MAUTHDIR = '/code/mauth';
$MFETCHDIR = '/code/mfetch';
// library loader
if ( ! isset( $LIBCASES)) $LIBCASES = array( 'commandline', 'csv', 'filelist', 'hashlist', 'hcsv', 'json', 
	'json', 'math', 'string', 'time', 'db', 'proc', 'async', 'plot', 
	'ngraph', 'objects', 'chart', 'r', 'mauth', 'matrixfile', 'matrixmath',
	'binary', 'curl', 'mfetch', 'network', 'remote', 'lucene', 'pdf', 'crypt', 'file', 'dll', 'hashing', 'queue',
	'optimization', 'websocket'
);
//foreach ( $LIBCASES as $lib) require_once( "$ABDIR/lib/$lib.php");




$CLHELP = array();
// command line functions
function clinit() {
global $prefix, $BDIR, $CDIR;
// additional (local) functions and env (if present)
if ( is_file( "$BDIR/functions.php")) require_once( "$BDIR/functions.php");
if ( is_file( "$BDIR/env.php")) require_once( "$BDIR/env.php");
// yet additional env and functions in current directory -- only when CDIR != BDIR
if ( $CDIR && $BDIR != $CDIR && is_file( "$CDIR/functions.php")) require_once( "$CDIR/functions.php");
if ( $CDIR && $BDIR != $CDIR && is_file( "$CDIR/env.php")) require_once( "$CDIR/env.php");
}
function clrun( $command, $silent = true, $background = true, $debug = false) {
if ( $debug) echo "RUN [$command]\n";
if ( $silent) system( "$command > /dev/null 2>1" . ( $background ? ' &' : ''));
else system( $command);
}
function clget( $one, $two = '', $three = '', $four = '', $five = '', $six = '', $seven = '', $eight = '', $nine = '', $ten = '', $eleven = '', $twelve = '') {
global $argc, $argv, $GLOBALS;
// keys
if ( count( ttl( $one)) > 1) $ks = ttl( $one);
else $ks = array( $one, $two, $three, $four, $five, $six, $seven, $eight, $nine, $ten, $eleven, $twelve);
while ( count( $ks) && ! llast( $ks)) lpop( $ks);
// values
$vs = $argv; $progname = lshift( $vs);
if ( count( $vs) == 1) {	// only one argument, maybe hash
$h = tth( $vs[ 0]); $ok = true; if ( ! count( $h)) $ok = false;
foreach ( $h as $k => $v) if ( ! $k || ! strlen( "$k") || ! $v || ! strlen( "$v")) $ok = false;
if ( $ok && ltt( hk( $h)) == ltt( $ks)) $vs = hv( $h);	// keys are decleared by themselves, just create values
}
if ( count( $vs) && ( $vs[ 0] == '-h' || $vs[ 0] == '--help' || $vs[ 0] == 'help')) { clshowhelp(); die( ''); }
if ( count( $vs) != count( $ks)) {
echo "\n";
echo "ERROR! clget() wrong command line, see keys/values and help below...\n";
echo "(expected) keys: " . ltt( $ks, ' ') . "\n";
echo "(found) values: " . ltt( $vs, ' ') . "\n";
echo "---\n";
clshowhelp();
die( '');
}
// merge keys with values
$h = array(); for ( $i = 0; $i < count( $ks); $i++) $h[ '' . $ks[ $i]] = trim( $vs[ $i]);
$ks = hk( $h); for ( $i = 1; $i < count( $ks); $i++) if ( $h[ $ks[ $i]] == 'ditto') $h[ $ks[ $i]] = $h[ $ks[ $i - 1]];
foreach ( $h as $k => $v) echo "  $k=[$v]\n";
foreach ( $h as $k => $v) $GLOBALS[ $k] = $v;
return $h;
}
// quiet version, do not output anything, other than errors
function clgetq( $one, $two = '', $three = '', $four = '', $five = '', $six = '', $seven = '', $eight = '', $nine = '', $ten = '', $eleven = '', $twelve = '') {
global $argc, $argv, $GLOBALS;
// keys
if ( count( ttl( $one)) > 1) $ks = ttl( $one);
else $ks = array( $one, $two, $three, $four, $five, $six, $seven, $eight, $nine, $ten, $eleven, $twelve);
while ( count( $ks) && ! llast( $ks)) lpop( $ks);
// values
$vs = $argv; $progname = lshift( $vs);
if ( count( $vs) == 1) {	// only one argument, maybe hash
$h = tth( $vs[ 0]); $ok = true; if ( ! count( $h)) $ok = false;
foreach ( $h as $k => $v) if ( ! $k || ! strlen( "$k") || ! $v || ! strlen( "$v")) $ok = false;
if ( $ok && ltt( hk( $h)) == ltt( $ks)) $vs = hv( $h);	// keys are decleared by themselves, just create values
}
if ( count( $vs) && ( $vs[ 0] == '-h' || $vs[ 0] == '--help' || $vs[ 0] == 'help')) { clshowhelp(); die( ''); }
if ( count( $vs) != count( $ks)) {
echo "\n";
echo "ERROR! clget() wrong command line, see keys/values and help below...\n";
echo "(expected) keys: " . ltt( $ks, ' ') . "\n";
echo "(found) values: " . ltt( $vs, ' ') . "\n";
echo "---\n";
clshowhelp();
die( '');
}
// merge keys with values
$h = array(); for ( $i = 0; $i < count( $ks); $i++) $h[ '' . $ks[ $i]] = trim( $vs[ $i]);
$ks = hk( $h); for ( $i = 1; $i < count( $ks); $i++) if ( $h[ $ks[ $i]] == 'ditto') $h[ $ks[ $i]] = $h[ $ks[ $i - 1]];
foreach ( $h as $k => $v) //echo "  $k=[$v]\n";
foreach ( $h as $k => $v) $GLOBALS[ $k] = $v;
return $h;
}
function clhelp( $msg) { global $CLHELP; lpush( $CLHELP, $msg); }
function clshowhelp() { // show contents of CLHELP
global $CLHELP;
foreach ( $CLHELP as $msg) {
if ( substr( $msg, strlen( $msg) - 1, 1) != "\n") $msg .= "\n"; 	// no end line in this msg, add one
echo $msg;
}

}

?><?php
// CVS functions
function csvload( $file, $delimiter= ',') { // returns array of arrays
$in = fopen( $file, 'r');
$out = array();
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in));
if ( ! $line) continue;
$split = explode( $delimiter, $line);
if ( count( $out) && count( $split) != count( $out[ count( $out) - 1])) continue;	// lines are not the same
array_push( $out, $split);
}
fclose( $in);
return $out;
}
function csvone( $csv, $number) {	// returns the array of the column by number
$out = array();
foreach ( $csv as $line) {
if ( count( $line) <= $number) continue;
array_push( $out, $line[ $number]);
}
return $out;
}

// complex csv storage and output CSV MULTI = csvm
function &csvminit( $spacer = true) { return array( 'depth' => 0, 'lines' => array(), 'spacer' => $spacer); }
// data is a hash, key is column name, values are arrays of varying sizes
function csvmadd( &$csvm, $blockname, $data) {
$lines =& $csvm[ 'lines'];
$count = count( array_keys( $data));
$lines[ 0] .= $blockname; for ( $i = 0; $i < $count; $i++) $lines[ 0] .= ',';
foreach ( $data as $name => $values) {
$lines[ 1] .= $name . ',';
$size = mmax( array( count( $lines) - 2, count( $values)));
if ( $size <= 0) for ( $y = 2; $y < count( $lines); $y++) $lines[ $y] .= ',';
for ( $y = 0; $y < $size; $y++) {
if ( ! isset( $lines[ $y + 2])) { $lines[ $y + 2] = ''; for ( $z = 0; $z < $csvm[ 'depth']; $z++) $lines[ $y + 2] .= ','; }
if ( isset( $values[ $y])) $lines[ $y + 2] .= $values[ $y] . ',';
else $lines[ $y + 2] .= ',';
}

}
// add another comma (spacer) on all lines
if ( $csvm[ 'spacer']) for ( $i = 0; $i < count( $lines); $i++) $lines[ $i] .= ',';
$csvm[ 'depth'] += ( $count + ( $csvm[ 'spacer'] ? 1 : 0));
}
function csvmprint( &$csvm, $printheaders = true) {
for ( $i = ( $printheaders ? 0 : 2); $i < count( $csvm[ 'lines']); $i++) echo $csvm[ 'lines'][ $i] . "\n";
}
function csvmsave( &$csvm, $path, $printheaders = true, $flag = 'w') {	// save multi-column CSV to file
$out = fopen( $path, $flag);
for ( $i = ( $printheaders ? 0 : 2); $i < count( $csvm[ 'lines']); $i++) fwrite( $out, $csvm[ 'lines'][ $i] . "\n");
fclose( $out);
}

?><?php

function cleanfilename( $name,  $bad = '', $replace = '.', $donotlower = true) {
if ( ! $bad) $bad = '*{}|=/ -_",;:!?()[]&%$# ' . "'" . '\\';
$name = strcleanup( $name, $bad, $replace);
for ( $i = 0; $i < 10; $i++) $name = str_replace( $replace . $replace, $replace, $name);
if ( strpos( $name, '.') === 0) $name = substr( $name, 1);
if ( ! $donotlower) $name = strtolower( $name);
return $name;
}

// flatten directory with its subdirectories and return hash{ path: filename}
function flgetall( $dir, $extspick = '', $extsignore = '') { // picks and ignores are dot-delimited
if ( $extspick) $extspick = ttl( $extspick, '.'); else $extspick = array();
if ( $extsignore) $extsignore = ttl( $extsignore, '.'); else $extsignore = array();
$dirs = array( $dir);
$h = array();
$limit = 10000; while ( count( $dirs)) {
$dir = lshift( $dirs);
$FL = flget( $dir);
foreach ( $FL as $file) {
if ( is_dir( "$dir/$file")) { lpush( $dirs, "$dir/$file"); continue; }
$ext = lpop( ttl( $file, '.'));
if ( $extspick && lisin( $extspick, $ext)) { $h[ "$dir/$file"] = $file; continue; }
if ( $extsignore && lisin( $extsignore, $ext)) continue;	// ignore, wrong extension
if ( ! is_file( "$dir/$file")) continue;
$h[ "$dir/$file"] = $file;
}

}
return $h;
}
// read a file list, enables prefix and generic filters
function flget( $dir, $prefix = '', $string = '', $ending = '', $length = -1, $skipfiles = false, $skipdirs = false) {
$in = popen( "ls -a $dir", 'r');
$list = array();
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in));
if ( ! $line) continue;
if ( $line === '.' || $line === '..') continue;
if ( is_dir( "$dir/$line") && $skipdirs) continue;
if ( is_file( "$dir/$line") && $skipfiles) continue;
if ( $prefix && strpos( $line, $prefix) !== 0) continue;
if ( $string && ! strpos( $line, $string)) continue;	// string not found anywhere
if ( $ending && strrpos( $line, $ending) !== strlen( $line) - strlen( $ending)) continue;
if ( $length > 0 && strlen( $line) != $length) continue;
array_push( $list, $line);
}
pclose( $in);
return $list;
}
// pdef format: x.x.*?.x.*?.log (only * is interpreted, ? is pos number)
function flparse( $list, $pdef, $numeric = true, $delimiter2 = null) { // returns multiarray containing filenames
$plist = array();
$split = explode( '.', $pdef);
for ( $i = 0; $i < count( $split); $i++) {
if ( strpos( $split[ $i], '*') === false) continue;	// not to be parsed
$pos = $i;
if ( strlen( str_replace( '*', '', $split[ $i]))) $pos = ( int)str_replace( '*', '', $split[ $i]);
$plist[ $pos] = $i;
}
ksort( $plist, SORT_NUMERIC);
$plist = array_values( $plist);
$pcount = count( $split);
$mlist = array();
foreach ( $list as $file) {
$fname = $file;
if ( $delimiter2) $fname = str_replace( $delimiter2, '.', $fname);
$split = explode( '.', $fname);
if ( count( $split) !== $pcount) continue; 	// rogue file
unset( $ml);
$ml =& $mlist;
for ( $i = 0; $i < count( $plist) - 1; $i++) {
$part = $split[ $plist[ $i]];
if ( $numeric) $part = ( int)$part;
if ( ! isset( $ml[ $part])) $ml[ $part] = array();
unset( $nml);
$nml =& $ml[ $part];
unset( $ml);
$ml =& $nml;
}
$part = $split[ $plist[ count( $plist) - 1]];
if ( $numeric) $part = ( int)$part;
if ( isset( $ml[ $part]) && is_array( $ml[ $part])) array_push( $ml[ $part], $file);
else if ( isset( $ml[ $part])) $ml[ $part] = array( $ml[ $part], $file);
else $ml[ $part] = $file;
}
return $mlist;
}
// debug
function fldebug( $fl) {
echo "DEBUG FILE LIST\n";
foreach ( $fl as $k1 => $v1) {
echo "$k1   $v1\n";
if ( is_array( $v1)) foreach ( $v1 as $k2 => $v2) {
echo "   $k2   $v2\n";
if ( is_array( $v2)) foreach ( $v2 as $k3 => $v3) {
echo "      $k3   $v3\n";
if ( is_array( $v3)) foreach ( $v3 as $k4 => $v4) {
echo "         $k4   $v4\n";
}
}
}
}
echo "\n\n";
}

?><?php

function hdebug( &$h, $level) {  // converts hash into text with indentation levels
if ( ! count( $h)) return;
$key = lshift( hk( $h));
$v =& $h[ $key];
for ( $i = 0; $i < $level * 5; $i++) echo ' ';
echo $key;
if ( is_array( $v)) { echo "\n"; hdebug( $h[ $key], $level + 1); }
else echo "   $v\n";
unset( $h[ $key]);
hdebug( $h, $level);	// keep doing it until run out of keys
}
function hm( $one, $two, $three = NULL, $four = NULL) {
if ( ! $one && ! $two) return array();
$out = $one; if ( ! $out) $out = array();
if ( is_array( $two)) foreach ( $two as $key => $value) $out[ $key] = $value;
if ( ! $three) return $out;
foreach ( $three as $key => $value) $out[ $key] = $value;
if ( ! $four) return $out;
foreach ( $four as $key => $value) $out[ $key] = $value;
return $out;
}
function htouch( &$h, $key, $v = array(), $replaceifsmaller = true, $replaceiflarger = true, $tree = false) { // key can be array, will go deep that many levels
if ( is_string( $key) && count( ttl( $key)) > 1) $key = ttl( $key);
if ( ! is_array( $key)) $key = array( $key); $changed = false;
foreach ( $key as $k) {
if ( ! isset( $h[ $k])) { $h[ $k] = $v; $changed = true; }
if ( is_numeric( $v) && is_numeric( $h[ $k]) && $replaceifsmaller && $v < $h[ $k]) { $h[ $k] = $v; $changed = true; }
if ( is_numeric( $v) && is_numeric( $h[ $k]) && $replaceiflarger && $v > $h[ $k]) { $h[ $k] = $v; $changed = true; }
if ( $tree) $h =& $h[ $k];	// will go deeper only if 'tree' type is set to true
}
return $changed;
}
function hltl( $hl, $key) {	// hash list to list
$l = array();
foreach ( $hl as $h) if ( isset( $h[ $key])) array_push( $l, $h[ $key]);
return $l;
}
function hlf( &$hl, $key = '', $value = '', $remove = false) {	// filters only lines with [ key [=value]]
$lines = array(); $hl2 = array();
foreach ( $hl as $h) {
if ( $key && ! isset( $h[ $key])) continue;
if ( ( $key && $value) && ( ! isset( $h[ $key]) || $h[ $key] != $value)) { lpush( $hl2, $h); continue; }
array_push( $lines, $h);
}
if ( $remove) $hl = $hl2;	// replace the original hashlist
return $lines;
}
function hlm( $hl, $purge = '') {	// merging hash list, $purge can be an array
if ( $purge && ! is_array( $purge)) $purge = explode( ':', $purge);
$ph = array(); if ( $purge) foreach ( $purge as $key) $ph[ $key] = true;
$out = array();
foreach ( $hl as $h) {
foreach ( $h as $key => $value) {
if ( isset( $ph[ $key])) continue;
$out[ $key] = $value;
}
}
return $out;
}
function hlth( $hl, $kkey, $vkey) { // pass keys for key and value on each line
$h = array();
foreach ( $hl as $H) $h[ $H[ $kkey]] = $H[ $vkey];
return $h;
}
// convert hash of lists (same length) to list of hashes
function holthl( $h) {
$out = array();
$keys = array_keys( $h);
for ( $i = 0; $i < count( $h[ $keys[ 0]]); $i++) {
$item = array();
foreach ( $keys as $key) $item[ $key] = $h[ $key][ $i];
array_push( $out, $item);
}
return $out;
}
// adds a new key to each hash in the hash list
function hltag( &$h, $key, $value) {	// does not return anything
for ( $i = 0; $i < count( $h); $i++) $h[ $i][ $key] = $value;
}
// sort hashlist
function hlsort( &$hl, $key, $how = SORT_NUMERIC, $bigtosmall = false) {
$h2 = array(); foreach ( $hl as $h) { htouch( $h2, '' . $h[ $key]); lpush( $h2[ '' . $h[ $key]], $h); }
if ( $bigtosmall) krsort( $h2, $how);
else ksort( $h2, $how);
$L = hv( $h2); $hl = array();
foreach ( $L as $L2) { foreach ( $L2 as $h) lpush( $hl, $h); }
return $hl;
}
// creates new hash where values in original are keys in resulting hash
function hvak( $h, $overwrite = true, $value = NULL, $numeric = false) {
$out = array();
foreach ( $h as $k => $v) {
if ( ! $overwrite && isset( $out[ $v])) continue;
$value2 = ( $value === NULL) ? $k : $value;
$out[ $v] = $numeric ? ( ( int)$value2) : $value2;
}
return $out;
}
function htv( $h, $key) { return $h[ $key]; }
// hash and GLOBALS
function htg( $h, $keys = '', $prefix = '', $trim = true) {
if ( ! $keys) $keys = array_keys( $h);
if ( is_string( $keys)) $keys = ttl( $keys, '.');
foreach ( $keys as $k) $GLOBALS[ $prefix . $k] = $trim ? trim( $h[ $k]) : $h[ $k];
}
function hcg( $h) { foreach ( $h as $k => $v) { if ( is_numeric( $k)) unset( $GLOBALS[ $v]); else unset( $GLOBALS[ $k]); }}
// keys and values
function hk( $h) { return array_keys( $h); }
function hv( $h) { return array_values( $h); }
// hash-like array_ shorthands
// return array(), keys + values, use list( $k, $v) = func() to get returns
function hpop( &$h) { if ( ! count( $h)) return array( null, null); end( $h); $k = key( $h); $v = $h[ $k]; unset( $h[ $k]); return array( $k, $v); }
function hshift( &$h) { if ( ! count( $h)) return array( null, null); reset( $h); $k = key( $h); $v = $h[ $k]; unset( $h[ $k]); return array( $k, $v); }
function hfirst( &$h) { if ( ! count( $h)) return array( null, null); reset( $h); $k = key( $h); return array( $k, $h[ $k]); }
function hlast( &$h) { if ( ! count( $h)) return array( null, null); end( $h); $k = key( $h); return array( $k, $h[ $k]); }
// only for values
function hpopv( &$h) { if ( ! count( $h)) return null; $v = end( $h); $k = key( $h); unset( $h[ $k]); return $v; }
function hshiftv( &$h) { if ( ! count( $h)) return null; $v = reset( $h); $k = key( $h); unset( $h[ $k]); return $v; }
function hfirstv( &$h) { if ( ! count( $h)) return null; return reset( $h); }
function hlastv( &$h) { if ( ! count( $h)) return null; return end( $h); }
// same for keys
function hpopk( &$h) { if ( ! count( $h)) return null; end( $h); $k = key( $h); unset( $h[ $k]); return $k; }
function hshiftk( &$h) { if ( ! count( $h)) return null; reset( $h); $k = key( $h); unset( $h[ $k]); return $k; }
function hfirstk( &$h) { if ( ! count( $h)) return null; reset( $h); return key( $h); }
function hlastk( &$h) { if ( ! count( $h)) return null; end( $h); return key( $h); }


function hth64( $h, $keys = null) {	// keys can be array or string
if ( $keys === null) $keys = array_keys( $h);
if ( $keys && ! is_array( $keys)) $keys = explode( '.', $keys);
$keys = hvak( $keys, true, true);
$H = array(); foreach ( $h as $k => $v) $H[ $k] = isset( $keys[ $k]) ? base64_encode( $v) : $v;
return $H;
}
function h64th( $h, $keys = null) {	// keys can be array or string
if ( $keys === null) $keys = array_keys( $h);
if ( $keys && ! is_array( $keys)) $keys = explode( '.', $keys);
$keys = hvak( $keys, true, true);
$H = array(); foreach ( $h as $k => $v) $H[ $k] = isset( $keys[ $k]) ? base64_decode( $v) : $v;
return $H;
}


// hash functions
function tth( $t, $bd = ',', $sd = '=', $base64 = false, $base64keys = null) {	// text to hash
if ( ! $base64keys) $base64keys = array();
if ( is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
if ( $base64) $t = base64_decode( $t);
$h = array();
$parts = explode( $bd, trim( $t));
foreach ( $parts as $part) {
$split = explode( $sd, $part);
if ( count( $split) === 1) continue;	// skip this one
$h[ trim( array_shift( $split))] = trim( implode( $sd, $split));
}
foreach ( $base64keys as $k) if ( isset( $h[ $k])) $h[ $k] = base64_decode( $h[ $k]);
return $h;
}
// processes text body into hash list
function tthl( $text, $ld = '...', $bd = ',', $sd = '=') {
$lines = explode( '...', base64_decode( $props[ 'search.config']));
$hl = array();
foreach ( $lines as $line) {
$line = trim( $line);
if ( ! $line || strpos( $line, '#') === 0) continue;
array_push( $hl, tth( $line, $bd, $sd));
}
return $hl;
}
function htt( $h, $sd = '=', $bd = ',', $base64 = false, $base64keys = null) { // hash to text
// first, process base64
if ( ! $base64keys) $base64keys = array();
if ( is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
foreach ( $base64keys as $k) if ( isset( $h[ $k])) $h[ $k] = base64_encode( $h[ $k]);
$parts = array();
foreach ( $h as $key => $value) array_push( $parts, $key . $sd . $value);
if ( ! $parts) return '';
if ( $base64) return base64_encode( implode( $bd, $parts));
return implode( $bd, $parts);
}
function ttl( $t, $d = ',', $cleanup = "\n:\t", $skipempty = true, $base64 = false, $donotrim = false) { // text to list
if ( ! $cleanup) $cleanup = '';
if ( $base64) $t = base64_decode( $t);
$l = explode( ':', $cleanup);
foreach ( $l as $i) if ( $i != $d) $t = str_replace( $i, ' ', $t);
$l = array();
$parts = explode( $d, $t);
foreach ( $parts as $p) {
if ( ! $donotrim) $p = trim( $p);
if ( ! strlen( $p) && $skipempty) continue;	// empty
array_push( $l, $p);
}
return $l;
}
function ttlm( $t, $d = ',', $skipempty = true) { // manual ttl
$out = array();
while ( strlen( $t)) {
$pos = 0;
for ( $i = 0; $i < strlen( $t); $i++) if ( ord( substr( $t, $i, 1)) == ord( $d)) break;
if ( $i == strlen( $t)) { array_push( $out, $t); break; }	// end of text
if ( ! $i) { if ( ! $skipempty) array_push( $out, ''); }
else array_push( $out, substr( $t, 0, $i));
$t = substr( $t, $i + 1);
}
return $out;
}
function ltt( $l, $d = ',', $base64 = false) {	// list to text
if ( ! count( $l)) return '';
if ( $base64) return base64_encode( implode( $d, $l));
return implode( $d, $l);
}
function ldel( $list, $v) {	// delete item from list
$L = array();
foreach ( $list as $item) if ( $item != $v) array_push( $L, $item);
return $L;
}
function ledit( $list, $old, $new) {	// delete item from list
$L = array();
foreach ( $list as $item) {
if ( $item == $old) array_push( $L, $new);
else array_push( $L, $item);
}
return $L;
}
function ltll( $list) { 	// list to list of lists
$out = array(); foreach ( $list as $v) { lpush( $out, array( $v)); }
return $out;
}
function lth( $list, $prefix) { // list to hash using prefix[number] as key, if prefix is array, will use those keys directly
$L = array(); for ( $i = 0; $i < ( is_array( $prefix) ? count( $prefix) : count( $list)); $i++) $L[ $i] = is_array( $prefix) && isset( $prefix[ $i]) ? $prefix[ $i] : "$prefix$i";
$h = array();
for ( $i = 0; $i < ( is_array( $prefix) ? count( $prefix) : count( $list)); $i++) $h[ $L[ $i]] = $list[ $i];
return $h;
}
function lr( $list) { return $list[ mt_rand( 0, count( $list) - 1)]; }
function lrv( $list) { return mt_rand( $list[ 0], $list[ 1]); }
function lm( $one, $two) {
$out = array();
foreach ( $one as $v) array_push( $out, $v);
foreach ( $two as $v) array_push( $out, $v);
return $out;
}
function lisin( $list, $item) { 	// list is in, checks if element is in list
foreach ( $list as $item2) if ( $item2 == $item) return true;
return false;
}
// array_ shorthands
function ladd( &$list, $v) { array_push( $list, $v); }
function lpush( &$list, $v) { array_push( $list, $v); }
function lshift( &$list) { if ( ! $list || ! count( $list)) return null; return array_shift( $list); }
function lunshift( &$list, $v) { array_unshift( $list, $v); }
function lpop( &$list) { if ( ! $list || ! count( $list)) return null; return array_pop( $list); }
function lfirst( &$list) { if ( ! $list || ! count( $list)) return null; return reset( $list); }
function llast( &$list) { if ( ! $list || ! count( $list)) return null; return end( $list); }


?><?php
// library for handling hash-CSV files
// * hash csv is when each line is in format key1=value1,key2=value2,... etc

// line-by-line reading of hcsv files
function hcsvopen( $filename, $critical = false) {	// returns filehandler
$in = @fopen( $filename, 'r');
if ( $critical && ! $in) die( "could not open [$filename]");
return $in;
}
function hcsvnext( $in, $key = '', $value = '', $notvalue = '') { 	// returns line hash, next by key or value is possible
if ( ! $in) return null;
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in));
if ( ! $line || strpos( $line, '#') === 0) continue;
$hash = tth( $line);
if ( ! $hash || ! count( array_keys( $hash))) continue;
if ( $key) {
if ( ! isset( $hash[ $key])) continue;
if ( $value && $hash[ $key] != $value) continue;
if ( $notvalue && $hash[ $key] == $value) continue;
return $hash;
}
else return $hash;
}
return null;
}
function hcsvclose( $in) { @fclose( $in); }

// one-liners, read entire hcsv files
function hcsvread( $filename, $key = '', $value = '') {	 // returns hash list, can filter by [ key [= value]]
$lines = array();
$hcsv = hcsvopen( $filename);
while ( 1) {
$h = hcsvnext( $hcsv, $key, $value);
if ( ! $h) break;
array_push( $lines, $h);
}
hcsvclose( $hcsv);
return $lines;
}

?><?php
// json object library, requires json.php
$JO = array();
function jsonencode( $data, $tab = 1, $linedelimiter = "\n") { switch ( gettype( $data)) {
case 'boolean': return ( $data ? 'true' : 'false');
case 'NULL': return "null";
case 'integer': return ( int)$data;
case 'double':
case 'float': return ( float)$data;
case 'string': {
$out = '';
$len = strlen( $data);
$special = false;
for ( $i = 0; $i < $len; $i++) {
$ord = ord( $data{ $i});
$flag = false;
switch ( $ord) {
case 0x08: $out .= '\b'; $flag = true; break;
case 0x09: $out .= '\t'; $flag = true; break;
case 0x0A: $out .=  '\n'; $flag = true; break;
case 0x0C: $out .=  '\f'; $flag = true; break;
case 0x0D: $out .= '\r'; $flag = true; break;
case  0x22:
case 0x2F:
case 0x5C: $out .= '\\' . $data{ $i}; $flag = true; break;
}
if ( $flag) { $special = true; continue; } // switched case

// normal ascii
if ( $ord >= 0x20 && $ord <= 0x7F) {
$out .= $data{ $i}; continue;
}
// unicode
if ( ( $ord & 0xE0) == 0xC0) {
$char = pack( 'C*', $ord, ord( $data{ $i + 1}));
$i += 1;
$utf16 = mb_convert_encoding( $char, 'UTF-16', 'UTF-8');
$out .= sprintf( '\u%04s', bin2hex( $utf16));
$special = true;
continue;
}
if ( ( $ord & 0xF0) == 0xE0) {
$char = pack( 'C*', $ord, ord( $data{ $i + 1}), ord( $data{ $i + 2}));
$i += 2;
$utf16 = mb_convert_encoding( $char, 'UTF-16', 'UTF-8');
$out .= sprintf( '\u%04s', bin2hex($utf16));
$special = true;
continue;
}
if ( ( $ord & 0xF8) == 0xF0) {
$char = pack( 'C*', $ord, ord( $data{ $i + 1}), ord( $data{ $i + 2}), ord( $data{ $i + 3}));
$i += 3;
$utf16 = mb_convert_encoding( $char, 'UTF-16', 'UTF-8');
$out .= sprintf( '\u%04s', bin2hex( $utf16));
$special = true;
continue;
}
if ( ( $ord & 0xFC) == 0xF8) {
$char = pack( 'C*', $ord, ord( $data{ $i + 1}), ord( $data{ $i + 2}), ord( $data{ $i + 3}), ord( $data{ $i + 4}));
$c += 4;
$utf16 = mb_convert_encoding( $char, 'UTF-16', 'UTF-8');
$out .= sprintf( '\u%04s', bin2hex( $utf16));
$special = true;
continue;
}
if ( ( $ord & 0xFE) == 0xFC) {
$char = pack( 'C*', $ord, ord( $data{ $i + 1}), ord( $data{ $i + 2}), ord( $data{ $i + 3}), ord( $data{ $i + 4}), ord( $data{ $i + 5}));
$c += 5;
$utf16 = mb_convert_encoding( $char, 'UTF-16', 'UTF-8');
$out .= sprintf( '\u%04s', bin2hex( $utf16));
$special = true;
continue;
}
}
return '"' . $out . '"';
}
case 'array': {
if ( is_array( $data) && count( $data) && ( array_keys( $data) !== range( 0, sizeof( $data) - 1))) {
$parts = array();
foreach ( $data as $k => $v) {
$part = '';
for ( $i = 0; $i < $tab; $i++) $part .= "\t";
$part .= '"' . $k . '"' . ': ' . jsonencode( $v, $tab + 1);
array_push( $parts, $part);
}
return "{" . $linedelimiter . implode( ",$linedelimiter", $parts) . '}';
}
// not a hash, but an array
$parts = array();
foreach ( $data as $v) {
$part = '';
for ( $i = 0; $i < $tab; $i++) $part .= "\t";
array_push( $parts, $part . jsonencode( $v, $tab + 1));
}
return "[$linedelimiter" . implode( ",$linedelimiter", $parts) . ']';
}

}}
// JSON functions (class at the end) (requires json class to be imported)
function jsonparse( $text) { return json_decode( $text, true); }
function jsonload( $filename, $ignore = false, $lock = false) {	// load from file and then parse
global $ASLOCKON, $IOSTATSON, $IOSTATS;
$lockd = $ignore ? $lock : $ASLOCKON;	// lock decision, when ignore is on, listen to local flag
$time = null; if ( $lockd) list( $time, $lock) = aslock( $filename);
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsonload.aslock,time=$time"));
$start = null; if ( $IOSTATSON) $start = tsystem();
$body = ''; $in = @fopen( $filename, 'r'); while ( $in && ! feof( $in)) $body .= trim( fgets( $in));
if ( $in) fclose( $in);
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsonload.fread,time=" . round( tsystem() - $start, 4)));
if ( $lockd) asunlock( $filename, $lock);
$info = $body ? @jsonparse( $body) : null;
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsonload.done,took=" . round( 1000000 * ( tsystem() - $start)) . ',size=' . ( $body ? strlen( $body) : 0)));
return $info;
}
function jsondump( $jsono, $filename, $ignore = false, $lock = false) {	// dumps to file, does not use JSON class
global $ASLOCKON, $IOSTATSON, $IOSTATS;
$lockd = $ignore ? $lock : $ASLOCKON;	// lock decision, when ignore is on, listen to local flag
$time = null; if ( $lockd)  list( $time, $lock) = aslock( $filename);
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsondump.aslock,time=$time"));
$start = null; if ( $IOSTATSON) $start = tsystem();
$text = jsonencode( $jsono);
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsondump.jsonencode,time=" . round( tsystem() - $start, 4)));
$out = fopen( $filename, 'w'); fwrite( $out, $text); fclose( $out);
if ( $lockd) asunlock( $filename, $lock);
if ( $IOSTATSON) lpush( $IOSTATS, tth( "type=jsondump.done,took=" . round( 1000000 * ( tsystem() - $start)) . ',size=' . strlen( $text)));
}
function jsonsend( $jsono, $header = false) {	// send to browser, do not use JSON class
if ( $header) header( 'Content-type: text/html');
echo jsonencode( $jsono);
}
function jsonsendbycallback( $jsono) {	// send to browser, do not use JSON class
$txt = $jsono === null ? null : base64_encode( json_encode( $jsono));
echo "eval( callback)( '$txt')\n";
}
function jsonsendbycallbackm( $items, $asjson = false) {	// send to browser, do not use JSON class, send a LIST of items, first aggregating, then calling a callback
echo "var list = [];\n";
foreach ( $items as $item) echo "list.push( " . ( $asjson ? json_encode( $item) : $item) . ");\n";
echo "eval( callback)( list);\n";
}

// json2h and back translations
function h2json( $h, $base64 = false, $base64keys = '', $singlequotestrings = false, $bzip = false) {
if ( ! $base64keys) $base64keys = array();
if ( $base64keys && is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
foreach ( $base64keys as $k) $h[ $k] = base64_encode( $h[ $k]);
if ( $singlequotestrings) foreach ( $h as $k => $v) if ( is_string( $v)) $h[ $k] = "'$v'";
$json = jsonencode( $h);
if ( $bzip) $json = bzcompress( $json);
if ( $base64) $json = base64_encode( $json);
return $json;
}
function json2h( $json, $base64 = false, $base64keys = '', $bzip = false) {
if ( ! $base64keys) $base64keys = array();
if ( $base64keys && is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
if ( $base64) $json = base64_decode( $json);
if ( $bzip) $json = bzdecompress( $json);
$h = @jsonparse( $json);
if ( $h) foreach ( $base64keys as $k) $h[ $k] = base64_decode( $h[ $k]);
return $h;
}

// read entire json64 files
function b64jsonload( $file, $json = true, $base64 = true, $bzip = false) {
$in = finopen( $file); $HL = array();
while ( ! findone( $in)) {
list( $h, $progress) = finread( $in, $json, $base64, $bzip); if ( ! $h) continue;
lpush( $HL, $h);
}
finclose( $in); return $HL;
}
function b64jsonldump( $HL, $file, $json = true, $base64 = true, $bzip = false) {
$out = foutopen( $file, 'w'); foreach ( $HL as $h) foutwrite( $out, $h, $json, $base64, $bzip); foutclose( $out);
}


// json object functions, all return $JO (for shorthand)
function jsonerr( $err) {
global $JO;
if ( ! isset( $JO[ 'errs'])) $JO[ 'errs'] = array();
array_push( $JO[ 'errs'], $err);
return $JO;
}
function jsonmsg( $msg) {
global $JO;
if ( ! isset( $JO[ 'msgs'])) $JO[ 'msgs'] = array();
array_push( $JO[ 'msgs'], $msg);
return $JO;
}
function jsondbg( $msg) {
global $JO;
if ( ! isset( $JO[ 'dbgs'])) $JO[ 'dbgs'] = array();
array_push( $JO[ 'dbgs'], $msg);
return $JO;
}


?><?php

// trigonometry
function mrotate( $r, $a, $round = 3) { 	// rotate point ( r, 0) for a degrees (ccw) and return new ( x, y)
while ( $a > 360) $a -= 360;
$cos = cos( 2 * 3.14159265 * ( $a / 360));
$x = round( $r * $cos, $round);
$y = round( pow( pow( $r, 2) - pow( $x, 2), 0.5), $round);
if ( ! misvalid( $y)) $y = 0;
if ( $a > 180) $y = - $y;
return compact( ttl( 'x,y'));
}

function misvalid( $number) {
if ( strtolower( "$number") == 'nan') return false;
if ( strtolower( "$number") == 'na') return false;
if ( strtolower( "$number") == 'inf') return false;
if ( strtolower( "$number") == '-inf') return false;
return true;
}
// mathematics functions
function mr( $length = 10) {	// math random
$out = '';
for ( $i = 0; $i < $length; $i++) $out .= mt_rand( 0, 9);
return $out;
}
function msum( $list) {
$sum = 0; foreach ( $list as $item) $sum += $item;
return $sum;
}
function mavg( $list) {
$sum = 0;
foreach ( $list as $item) $sum += $item;
return count( $list) ? $sum / count( $list) : 0;
}
function mmean( $list) { sort( $list, SORT_NUMERIC); return $list[ ( int)( 0.5 * mt_rand( 0, count( $list)))]; }
function mumid( $list) { $h = array(); foreach ( $list as $v) $h[ "$v"] = true; return m50( hk( $h)); }
function m25( $list) { sort( $list, SORT_NUMERIC); return $list[ ( int)( 0.25 * mt_rand( 0, count( $list)))]; }
function m50( $list) { sort( $list, SORT_NUMERIC); return $list[ ( int)( 0.5 * mt_rand( 0, count( $list)))]; }
function m75( $list) { sort( $list, SORT_NUMERIC); return $list[ ( int)( 0.75 * mt_rand( 0, count( $list)))]; }
function mvar( $list) {
$avg = mavg( $list);
$sum = 0;
foreach ( $list as $item) $sum += abs( pow( $item - $avg, 2));
return count( $list) ? pow( $sum / count( $list), 0.5) : 0;
}
function mmin( $one, $two = NULL) {
$list = $one;
if ( $two !== NULL && ! is_array( $one)) $list = array( $one, $two);
$min = $list[ 0];
foreach ( $list as $v) if ( $v < $min) $min = $v;
return $min;
}
function mmax( $one, $two = NULL) {
$list = $one;
if ( $two !== NULL && ! is_array( $one)) $list = array( $one, $two);
$max = $list[ 0];
foreach ( $list as $v) if ( $v > $max) $max = $v;
return $max;
}
function mround( $v, $round) { // difference from traditional math, $round can be negative, will round before decimal points in this case
if ( $round >= 0) return round( $v, $round);
// round is a negative value, will round before the decimal point
$v2 = 1; for ( $i = 0; $i < abs( $round); $i++) $v2 *= 10;
return $v2 * round( $v / $v2); // first, shrink, then round, then expand again
}
function mhalfround( $v, $round) { // round is multiples of 0.5, same as mround, only semi-decimal, i.e. rounds within closest 0.5 or 5
$round2 = $round - round( $round); // possible half a decimal
$round = round( $round);	// decimals
if ( $round2) $v *= 2;	// make the thing twice as big before rounding
$v = mround( $v, $round);
if ( $round2) $v = mround( 0.5 * $v, $round+1);
return $v;
}
function mratio( $one, $two) {	// one,two cannot be negative
if ( ! $one || ! $two) return 0;
if ( $one && $two && $one == $two) return 1;
$one = abs( $one); $two = abs( $two);
return mmin( $one, $two) / mmax( $one, $two);
}
function mstats( $list, $precision = 2) { 	// return hash of simple stats: min,max,avg,var
$min = mmin( $list); $max = mmax( $list); $avg = round( mavg( $list), $precision); $var = round( mvar( $list), $precision);
$h = tth( "min=$min,max=$max,avg=$avg,var=$var");
foreach ( $h as $k => $v) $h[ $k] = round( $v, $precision);
return $h;
}
// logarithmic mapping of an array of samples, $list should be normalized, but if aboveone=true, then non-normalized but positive
function mrel( $list) { // returns list of values relative to the min
$min = mmin( $list);
$list2 = array(); foreach ( $list as $v) lpush( $list2, $v - $min);
return $list2;
}
function mlog( $list, $digits = 5, $neg = null, $zero = null) { // for all x < 0 returns ( -log( abs( x) OR NEG), for all 0 returns 0 OR ZERO
$L = array();
foreach ( $list as $v) {
if ( $v < 0) $v2 = $neg === null ? - log10( abs( $list)) : $neg;
else if ( $v == 0) $v2 = $zero === null ? 0 : $zero;
else $v2 = log10( $v);
$v2 =  round( $v2, $digits);
lpush( $L, $v2);
}
return $L;
}
function mmap( $list, $min, $max, $precision = 5, $normprecision = 5) {
$list2 = mnorm( $list, null, null, $normprecision);
$list3 = array();
foreach ( $list2 as $v) lpush( $list3, round( $min + $v * ( $max - $min), $precision));
return $list3;
}
function mnorm( $list, $optmax = NULL, $optmin = NULL, $precision = 5) {	// normalize the list to 0..1 scale
$out = array();
$min = mmin( $list);
if ( $optmin !== NULL) $min = $optmin;
$max = mmax( $list);
if ( $optmax !== NULL) $max = $optmax;
foreach ( $list as $item) array_push( $out, round( mratio( $item - $min, $max - $min), $precision));
return $out;
}
function mabs( $list, $round = 5) { // returns list with abs() of values
$out = array(); for ( $i = 0; $i < count( $list); $i++) $out[ $i] = round( abs( $list[ $i]), $round);
return $out;
}
function mdistance( $list) { 	// returns list of distances between samples
$out = array();
for ( $i = 1; $i < count( $list); $i++) array_push( $out, $list[ $i] - $list[ $i - 1]);
return $out;
}
// direction = up | down | both (down cuts above and selects below), percentile is fraction of 1
function mpercentile( $list, $percentile, $direction) {
if ( ! count( $list)) return $list;
sort( $list, SORT_NUMERIC);
$range = $list[ count( $list) - 1] - $list[ 0];
$threshold = $list[ 0] + $percentile * $range;
if ( $direction == 'both') $threshold2 = $list[ 0] + ( 1 - $percentile) * $range;
$out = array();
foreach ( $list as $item) {
if ( $direction == 'both' && $item >= $threshold && $item <= $threshold2) {
array_push( $out, $item);
continue;
}
if ( ( $item <= $threshold && $direction == 'down') || ( $item >= $threshold && $direction == 'up'))
array_push( $out, $item);
}
return $out;
}
// qqplot, two lists, global sum, returns cumulative aggregates normalized on 0..1 scale
function mqqplotbysum( $one, $two, $step = 1, $round = 2) { // returns [ x, y], x=one, y=two, lists have to be the same size
$sum = 0;
foreach ( $one as $v) $sum += $v;
foreach ( $two as $v) $sum += $v;
$x = array(); $y = array();
$sum2 = 0;
for ( $i = 0; $i < count( $one); $i += $step) {
for ( $ii = $i; $ii < $i + $step; $ii++) {
$sum2 += $one[ $ii];
$sum2 += $two[ $ii];
}
lpush( $x, round( $sum2 / $sum, 2));
lpush( $y, round( $sum2 / $sum, 2));
}
return array( $x, $y);
}
function mqqplotbyvalue( $one, $two, $step = 1, $round = 2) { // returns [ x, y], x=one, y=two, lists have to be the same size
$max = mmax( array( mmax( $one), mmax( $two)));
$x = array(); $y = array();
for ( $i = 0; $i < count( $one); $i += $step) {
lpush( $x, round( $one[ $i] / $max, 2));
lpush( $y, round( $two[ $i] / $max, 2));
}
return array( $x, $y);
}
// calculates density as moving window, returns hash { bit.center: count}
function mdensity( $list, $min = null, $max = null, $step = 100, $window = 30, $round = 3) { // $step = $window / 3 is advised, both are countable numerals
if ( $min === null) $min = mmin( $list);
if ( $max === null) $max = mmax( $list);
$step = round( ( $max - $min) / $step, $round); $out = array();
for ( $v = ( 0.5 * $window) * $step; $v < $max - ( 0.5 * $window) * $step; $v += $step) {
$count = 0;
foreach ( $list as $v2) if ( $v2 >= ( $v - 0.5 * $window * $step) && $v2 <= $v + 0.5 * $window * $step) $count++;
$out[ "$v"] = $count;
}
return $out;
}
// returns frequency hash (v => count) in descending order
function mfrequency( $list, $shaper = 1, $round = 0) { // round 0 means interger values
$out = array();
foreach ( $list as $v) {
$v = $shaper * ( round( $v / $shaper, $round));
if ( ! isset( $out[ "$v"])) $out[ "$v"] = 0;
$out[ "$v"]++;
}
arsort( $out, SORT_NUMERIC);
return $out;
}
// randomly shifts values a bit around their actual values (used in plots)
function mjitter( $list, $range, $quantizer = 1000) {
for ( $i = 0; $i < count( $list); $i++) {
$jitter = ( mt_rand( 0, $quantizer) / $quantizer) * $range;
$direction = mt_rand( 0, 9);
if ( $direction < 5) $list[ $i] += $jitter;
else $list[ $i] -= $jitter;
}
return $list;
}

?><?php

// valid char ranges: { from: to (UTF32 ints), ...} -- valid if terms of containing meaning (symbools and junks are discarded)
$UTF32GOODCHARS = tth( "65345=65370,65296=65305,64256=64260,19968=40847,12354=12585,11922=12183,1072=1105,235=235,48=57,97=122,44=46"); // UTF-32 INTS!
$UTF32TRACK = array(); 	// to track decisions for specific chars
function utf32isgood( $n) { 	// n: 32-bit integer representation of a char (small endian)
global $UTF32GOODCHARS, $UTF32TRACK; if ( count( $UTF32TRACK) > 50000) $UTF32TRACK = array();	// if too big, reset
if ( isset( $UTF32TRACK[ $n])) return $UTF32TRACK[ $n];	// true | false
$good = false;
foreach ( $UTF32GOODCHARS as $low => $high) if ( $n >= $low && $n <= $high) $good = true;
$UTF32TRACK[ $n] = $good; return $good;
}
function utf32fix( $n, $checkgoodness = true) { 	// returns same number OR 32 (space) if bad symbol
if ( $checkgoodness) if ( ! utf32isgood( $n)) return 32;	// return space
if ( $n >= 65345 && $n <= 65370) $n = 97 + ( $n - 65345);	// convert Romaji to single-byte ASCII
return $n;
}
function utf32ispdfglyph( $n) { return ( $n >= 64256 && $n <= 64260); }
function utf32fixpdf( $n) { // returns UTF-32 string
$L = ttl( 'ff,fi,fl,ffi,ffl'); if ( $n >= 64256 && $n <= 64260) return mb_convert_encoding( $L[ $n - 64256], 'UTF-32', 'ASCII');	// replacement string
return bwriteint( bintro( $n)); // string of the current char, no change
}
function utf32clean( $body, $e = null) {	// returns new body
$body3 = ''; if ( ! mb_strlen( $body)) return $body3;
$body = mb_strtolower( $body);
$body2 = @mb_convert_encoding( $body, 'UTF-32', 'UTF-8'); if ( ! $body2) return '';	// nothing in body
$count = mb_strlen( $body2, 'UTF-32');
//echoe( $e, " cleanfilebody($count)");
for ( $i = 0; $i < $count; $i++) {
if ( $e && $i == 5000 * ( int)( $i / 5000)) echoe( $e, " cleanfilebody(" . round( 100 * ( $i / $count)) . '%)');
$char = @mb_substr( $body2, $i, 1, 'UTF-32'); if ( ! $char) continue;
$n = bintro( breadint( $char));
$n2 = utf32fix( $n, true);	// fix range (32 when bad), fix PDF, convert back to string
if ( $n == $n2 && ! utf32ispdfglyph( $n)) $body3 .= $char;
else $body3 .= utf32fixpdf( $n2);
}
// get rid of double spaces
$body2 = trim( @mb_convert_encoding( $body3, 'UTF-8', 'UTF-32')); if ( ! mb_strlen( $body2)) return '';	// nothing left in string
$before = mb_strlen( $body2);
$limit = 1000; while ( $limit--) {
$body2 = str_replace( '  ', ' ', $body2);
$after = mb_strlen( $body2); if ( $after == $before) break;	// no more change
$before = $after;
}
//echoe( $e, '');
if ( $e) { echoe( $e, " cleanfilebody(" . mb_substr( $body2, 0, 50) . '...)'); sleep( 1); }
return $body2;
}

function sfixpdfglyphs( $s) { 	// fix pdf glyphs like ffi,ff, etc.
$body2 = @mb_convert_encoding( $s, 'UTF-32', 'UTF-8'); if ( ! $body2) return $s;	// nothing in body
$body = ''; $count = mb_strlen( $body2, 'UTF-32');
for ( $i = 0; $i < $count; $i++) {
$char = @mb_substr( $body2, $i, 1, 'UTF-32'); if ( ! $char) continue;
$n = bintro( breadint( $char));
if ( $n == 8211) $char = mb_convert_encoding( '--', 'UTF-32', 'ASCII');
//echo  "  $n:" . substr( $s, $i, 1) . "\n";
if ( ! utf32ispdfglyph( $n)) { $body .= $char; continue; }
$body .= utf32fixpdf( $n);
}
return trim( @mb_convert_encoding( $body, 'UTF-8', 'UTF-32'));
}

// email processors
function strmailto( $email, $subject, $body) { 	// returns encoded mailto URL -- make sure it is smaller than 10?? bytes
$text = "$email?subject=$subject&body=$body";
$setup = array( '://'=> '%3A%2F%2F', '/'=> '%2F', ':'=> '%3A', ' '=> '%20', ','=> '%2C', "\n"=> '%0A', '='=> '%3D', '&'=> '%26', '#'=> '%23', '"'=> '%22');
foreach ( $setup as $k => $v) $text = str_replace( $k, $v, $text);
return $text;
}
// base64
function s2s64( $txt) { return base64_encode( $txt); }
function s642s( $txt) { return base64_decode( $txt); }
// string library
function strisalphanumeric( $string, $allowspace = true) {
$ok = true;
$alphanumeric = ". a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 0 1 2 3 4 5 6 7 8 9 ";
if ( ! $allowspace) $alphanumeric = str_replace( ' ', '', $alphanumeric);
for ( $i = 0; $i < strlen( $string); $i++) {
$letter = substr( $string, $i, 1);
if ( ! is_numeric( strpos( $alphanumeric, $letter))) { $ok = false; break; }
}
return $ok;
}
function strcleanup( $text, $badsymbols, $replace = '') {
for ( $i = 0; $i < strlen( $badsymbols); $i++) {
$text = str_replace( substr( $badsymbols, $i, 1), $replace, $text);
}
return $text;
}
function strtosqlilike( $text) {	// replaces whitespace with %
$split = explode( ' ', $text);
$split2 = array();
foreach ( $split as $part) {
$part = trim( $part);
if ( ! $part) continue;
array_push( $split2, strtolower( $part));
}
return '%' . implode( '%', $split2) . '%';
}
function strdblquote( $text) { return '"' . $text . '"'; }
function strquote( $text) { return "'$text'"; }
?><?php

// text-based parsers
function tstring2yyyymm( $ym) { // ym should be 'Month YYYY' -- if month is not found, 00 is used
$L = ttl( $ym, ' '); $m = count( $L) == 2 ? lshift( $L) : ''; $y = lshift( $L);
if ( $y < 100) $y = ( $y < 20 ? '20' : '19') . $y;
if ( $m) $m = strtolower( $m);
foreach ( tth( 'jan=01,feb=02,mar=03,apr=04,may=05,jun=06,jul=07,aug=08,sep=09,oct=10,nov=11,dec=12') as $k => $v) { if ( $m && strpos( $m, $k) !== false) $m = $v; }
if ( ! $m) $m = 0;
$ym = round( sprintf( "%04d%02d", $y, $m));
return $ym;
}
function tyyyymm2year( $ym) { return ( int)substr( $ym, 0, 4); }
function tyyyymm2month( $ym) { return $m = ( int)substr( $ym, 4, 2); }
function tm2string( $m, $short = false) {
$one = ttl( '?,January,February,March,April,May,June,July,August,September,October,November,December');
$two = ttl( '?,Jan.,Feb.,March,April,May,June,July,Aug.,Sep.,Oct.,Nov.,Dec.');
return $short ? $two[ $m] : $one[ $m];
}

// basic system-based time functions
function tsystem() {	// epoch of system time
$list = @gettimeofday();
return ( double)( $list[ 'sec'] + 0.000001 * $list[ 'usec']);
}
function tsystemstamp() {	// epoch of system time
$list = @gettimeofday();
return @date( 'Y-m-d H:i:s', $list[ 'sec']) . '.' . sprintf( '%06d', $list[ 'usec']);
}
function tsdate( $stamp) {	// extract date from stamp
return trim( array_shift( explode( ' ', $stamp)));
}
function tstime( $stamp) {	// time part of stamp
return trim( array_pop( explode( ' ', $stamp)));
}
function tsdb( $db) {	// Y-m-d H:i:s.us
return dbsqlgetv( $db, 'time', 'SELECT now() as time');
}
function tsclean( $stamp) {	// cuts us off
return array_shift( explode( '.', $stamp));
}
function tsets( $epoch) {	// epoch to string
$epoch = ( double)$epoch;
return @date( 'Y-m-d H:i:s', ( int)$epoch) . ( count( explode( '.', "$epoch")) === 2 ? '.' . array_pop( explode( '.', "$epoch")) : '');
}
function tsste( $string) {	// string to epoch
$usplit = explode( '.', $string);
$split = explode( ' ', $usplit[ 0]);
$us = ( count( $usplit) == 2) ?  '.' . $usplit[ 1] : '';
$dsplit = explode( '-', $split[ 0]);
$tsplit = explode( ':', $split[ 1]);
return ( double)(
@mktime(
$tsplit[ 0],
$tsplit[ 1],
$tsplit[ 2],
$dsplit[ 1],
$dsplit[ 2],
$dsplit[ 0]) . $us
);
}
// human readible values up until weeks, prefixes: m,h,d,w
function tshinterval( $before, $after = null, $fullnames = false) {	// double values
$prefix = 'ms';
$setup = tth( 'ms=milliseconds,s=seconds,m=minutes,h=hours,d=days,w=weeks,mo=months,y=years');
if ( ! $fullnames) foreach ( $setup as $k => $v) $setup[ $k] = $k;	// key same as value
extract( $setup);
if ( ! $after) $interval = abs( $before);
else $interval = abs( $after - $before);
$ginterval = $interval;
if ( $interval < 1) return round( 1000 * $interval) . $ms;
$interval = round( $interval, 1); if ( $interval <= 10) return $interval . $s; // seconds
if ( $interval <= 60) return round( $interval) . $s;
$interval = round( $interval / 60, 1); if ( $interval <= 10) return $interval . $m; // minutes
if ( $interval <= 60) return round( $interval) . $m;
$interval = round( $interval / 60, 1); if ( $interval <= 24) return $interval . $h; // hours
$interval = round( $interval / 24, 1); if ( $interval <= 7) return $interval . $d; // days
$interval = round( $interval / 7, 1); if ( $interval <= 54) return $interval . $w; // weeks
$interval = round( $interval / 30.5, 1); if ( $interval <= 54) return $interval . $w; // weeks
// interpret months from timestamps
$one = tsets( tsystem()); $two = tsets( tsystem() - $ginterval);
$L = ttl( $one, '-'); $one = 12 * lshift( $L) + lshift( $L) - 1 + lshift( $L) / 31;
$L = ttl( $two, '-'); $two = 12 * lshift( $L) + lshift( $L) - 1 + lshift( $L) / 31;
return round( $one - $two, 1) . $mo;
}
function tshparse( $in) { // parses s|m|h|d|w into seconds
$out = ( double)$in;
if ( strpos( $in, 's')) return $out;
if ( strpos( $in, 'm')) return $out * 60;
if ( strpos( $in, 'h')) return $out * 60 * 60;
if ( strpos( $in, 'd')) return $out * 60 * 60 * 24;
if ( strpos( $in, 'w')) return $out * 60 * 60 * 24 * 7;
return $in;
}

?><?php
// DB/SQL interface

// top-level utility
function dbstart( $other = '') {
global $DB, $DBNAME;
$name = $DBNAME;
if ( $other) $name = $other;
if ( $DB) return;  	// already connected
// attempt to connect 20 times with 100ms timeout if failed
for ( $i = 0; $i < 10; $i++) {
$conn = @pg_connect( "dbname=$name");
if ( $conn) {
$DB = $conn;
return;
}
usleep( 50000);
}
die( 'could not connect to db');
}
function dblog( $type, $props, $app = -1, $student = -1) {
global $DB, $ASESSION;
$ssid = $ASESSION[ 'ssid'];
if ( $student == -1) $student = $ASESSION[ 'id'];
if ( ! $props) $props = array();
if ( ! is_array( $props)) $props = tth( $props);
$sql = "INSERT INTO logs ( app, ssid, uid, type, props) VALUES ( $app, '$ssid', $student, '$type', '" . base64_encode( jsonencode( $props)) . "')";
@pg_query( $DB, $sql);
}
// sessions ( ssid,uid,type,props), uid(int) = user
function dbsession( $type, $props = array(), $ssid = -1, $user = -1) {
global $DB, $ASESSION;
if ( ! $DB) return;	// no debugging if there is no DB
if ( $ssid == -1) $ssid = $ASESSION[ 'ssid'];
if ( $user == -1) $user = $ASESSION[ 'id'];
if ( ! $props) $props = array();
if ( ! is_array( $props)) $props = tth( $props);
$sql = "INSERT INTO sessions ( ssid, uid, type, props) VALUES ( '$ssid', $user, '$type', '" . htt( $props) . "')";
pg_query( $DB, $sql);
}
function dbnid( $db, $counter) {
$sql = "select nextval( '$counter') as id";
$L = @pg_fetch_object( @pg_query( $db, $sql), 0);
return $L->id;
}
// getters and setters
function dbget( $db, $table, $id, $key, $base64 = false) {	// id either hash or hcsv format (use single quotes for symbolic values)
if ( is_array( $id)) $id = htt( $id);
$id = str_replace( ',', ' AND ', $id);
$value = dbsqlgetv( $db, $key, "SELECT $key from $table where $id");
if ( $base64) $value = base64_decode( $value);
return $value;
}
function dbset( $db, $table, $id, $key, $value, $quote = false, $base64 = false) { // id either a hash or hcsv format (use single quotes for symbolic values)
if ( is_array( $id)) $id = htt( $id);
$id = str_replace( ',', ' AND ', $id);
if ( $base64) $value = base64_encode( $value);
if ( $quote) $value = "'$value'";
// automatically detect if quotes are needed (non-numeric need quotes)
if ( ! $quote && ! is_numeric( $value)) $value = "'$value'";
$sql = "UPDATE $table SET $key=$value WHERE $id";
@pg_query( $db, $sql);
}
function dbgetprops( $db, $table, $id, $key) {
$value = dbget( $db, $table, $id, $key);
if ( ! $value) return array();	// some error, possibly
return tth( $value);
}
function dbsetprops( $db, $table, $id, $key, $hash) {	// quote=true by default
dbset( $db, $table, $id, $key, htt( $hash), true);
}
function dbgetjson( $db, $table, $id, $key, $base64 = false, $base64keys = null) {
$value = dbget( $db, $table, $id, $key);
if ( ! $value) return array();	// some error, possibly
if ( $base64) $value = base64_decode( $value);
$value = jsonparse( $value);
if ( ! $base64keys) $base64keys = array();
if ( is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
foreach ( $base64keys as $key) if ( isset( $value[ $key])) $value[ $key] = base64_decode( $value[ $key]);
return $value;
}
function dbsetjson( $db, $table, $id, $key, $hash, $base64 = false, $base64keys = null) {	// quote=true by default
if ( ! $base64keys) $base64keys = array();
if ( is_string( $base64keys)) $base64keys = ttl( $base64keys, '.');
foreach ( $base64keys as $key2) if ( $hash[ $key2]) $hash[ $key2] = base64_encode( $hash[ $key2]);
$value = jsonencode( $hash);
if ( $base64) $value = base64_encode( $value);
dbset( $db, $table, $id, $key, $value, true);
}
// time and epoch time in db tables
function dbgetime( $db, $tname, $id) {
$sql = "SELECT time FROM $tname WHERE id=$id";
$line = @pg_fetch_object( @pg_query( $db, $sql), 0);
return $line->time;
}
function dbgetetime( $db, $tname, $id) {	// epoch time
$sql = "SELECT extract( epoch from time) as time FROM $tname WHERE id=$id";
$line = @pg_fetch_object( @pg_query( $db, $sql), 0);
return ( double)$line->time;
}
function dbsetime( $db, $tname, $id, $time) {	// string
global $DBCONN;
$sql = "UPDATE $tname SET time='$time' WHERE id=$id";
@pg_query( $db, $sql);
}


// sql interfaces, get value, list, hash, hash list, hcsv, hcsvl
function dbsqlgetv( $db, $key, $sql, $critical = false) {
$R = @pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : null;
$L = pg_fetch_assoc( $R, 0);
if ( $key && ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : null;
return $L[ $key];
}
function dbsqlgetl( $db, $key, $sql, $critical = false) {
$R = @pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : array();
$list = array();
for ( $i = 0; $i < pg_num_rows( $R); $i++) {
$L = pg_fetch_assoc( $R, $i);
if ( ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : array();
array_push( $list, $L[ $key]);
}
return $list;
}
// $keys are either dot-delimited string or array
function dbsqlgeth( $db, $keys, $sql, $critical = false) {
if ( ! $keys) $keys = array();
if ( ! is_array( $keys)) $keys = explode( '.', $keys);
$R = @pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : array();
$L = pg_fetch_assoc( $R, 0);
foreach ( $keys as $key) if ( ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : array();
return $L;
}
function dbsqlgethl( $db, $keys, $sql, $critical = false) {
if ( ! $keys) $keys = array();
if ( ! is_array( $keys)) $keys = explode( '.', $keys);
$R = pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : array();
$list = array();
for ( $i = 0; $i < pg_num_rows( $R); $i++) {
$L = pg_fetch_assoc( $R, $i);
foreach ( $keys as $key) if ( ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : array();
array_push( $list, $L);
}
return $list;
}
// will run tth (comma-delimited) on the value in a single column
function dbsqlgethcsv( $db, $key, $sql, $critical = false) {
$R = @pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : null;
$L = pg_fetch_assoc( $R, 0);
if ( ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : null;
return tth( $L[ $key]);
}
function dbsqlgethcsvl( $db, $key, $sql, $critical = false) {
$R = @pg_query( $db, $sql);
if ( ! $R || ! pg_num_rows( $R)) return $critical ? die( "failed running sql [$sql]\n") : array();
$list = array();
for ( $i = 0; $i < pg_num_rows( $R); $i++) {
$L = pg_fetch_assoc( $R, $i);
if ( ! isset( $L[ $key])) return $critical ? die( "no key [$key] set in sql result [" . htt( $L) . "]\n") : array();
array_push( $list, tth( $L[ $key]));
}
return $list;
}

// set functions
// numbers and strings can be dot-delimited or arrays
// both numbers and strings are keys which types are integers or strings
// ! default is a number
function dbsqlhtth( $hash, $strings = array()) {	// hash to type hash
if ( ! is_array( $strings)) $strings = explode( '.', $strings);
$isstring = array();
foreach ( $strings as $string) $isstring[ $string] = true;
$keys = array_keys( $hash);
$out = array();
foreach ( $keys as $key) $out[ $key] = array( 'isstring' => $isstring[ $key], 'value' => $hash[ $key]);
return $out;
}
// requires type hash as input (previous method converts)
function dbsqlseth( $db, $tname, $thash, $show = false) {
$keys = array_keys( $thash);
$kstring = implode( ',', $keys);
$values = array();
foreach ( $keys as $key) {
if ( $thash[ $key][ 'isstring']) array_push( $values, "'" . $thash[ $key][ 'value'] . "'");
else array_push( $values, $thash[ $key][ 'value']);
}
$vstring = implode( ',', $values);
$sql = "insert into $tname ( $kstring) values ( $vstring)";
if ( $show) echo "SQL[$sql]\n";
pg_query( $db, $sql);
}
function dbsqluph( $db, $tname, $where, $thash) {	// updates
$keys = array_keys( $thash);
$list = array();
foreach ( $keys as $key) {
$value = $thash[ $key][ 'value'];
if ( $thash[ $key][ 'isstring']) $value = "'$value'";
array_push( $list, "$key=$value");
}
$sql = "update $tname set " . implode( ',', $list) . " where $where";
@pg_query( $db, $sql);
}


// db time functions
// if from and till are numeric, turns them to strings
function dbtimeclean( $db, $tname, $key, $from, $till, $debug = false) { // returns number of erased entries
if ( is_numeric( $from)) $from = tsets( $from);
if ( is_numeric( $till)) $till = tsets( $till);
$number = 0;
if ( $debug) $number = dbsqlgetv( $db, 'count', "SELECT count( $key) as count from $tname where $key between '$from' and '$till'");
@pg_query( $db, "delete from $tname where $key between '$from' and '$till'");
return $number;
}


// db management and export functions
function dbl() {	// returns list of hashes (name,owner,encoding) for all dbs
return dbparse( dbrun( "psql -l"));
}
function dbtl( $db) { // returns hashlist(schema,name,type,owner) of tables of a given db
return dbparse( dbrun( 'psql -c "\d" ' . $db));
}
function dbtchl( $db, $table) { // db table column hash list (column, type, modifiers)
return dbparse( dbrun( 'psql -c "\d ' . $table . '" ' . $db));
}
function dbtsize( $db, $table, $cname) { // returns integer for size of table
$in = popen( 'psql -c "select count( ' . $cname . ') as count from ' . $table . '" ' . $db, 'r');
$size = NULL; while ( $in && ! feof( $in)) { $line = trim( fgets( $in)); if ( is_numeric( $line)) $size = ( int)$line; }
pclose( $in); return $size;
}


// raw functions, like reading pgsql output
function dbrun( $command) {
$in = popen( $command, 'r');
$lines = array(); while ( $in && ! feof( $in)) { $line = trim( fgets( $in)); if ( ! $line) continue; array_push( $lines, $line); }
pclose( $in); return $lines;
}
function dbparse( $lines) {	// returns hash list
array_shift( $lines);
$names = ttl( array_shift( $lines), '|'); for ( $i = 0; $i < count( $names); $i++) $names[ $i] = strtolower( $names[ $i]);
array_shift( $lines); $L = array();
while ( count( $lines)) {
$l = ttl( array_shift( $lines), '|', "\n:\t", false);
if ( count( $l) !== count( $names)) continue;
$H = array(); for ( $i = 0; $i < count( $names); $i++) $H[ $names[ $i]] = $l[ $i];
array_push( $L, $H);
}
return $L;
}

?><?php

function procfindlib( $name) { 	// will look either in /usr/local, /APPS or /APPS/research
$paths = ttl( '/usr/local,/APPS,/APPS/research');
foreach ( $paths as $path) {
if ( is_dir( "$path/$name")) return "$path/$name";
}
die( "Did not find library [$name] in any of the paths [" . ltt( $paths) . "]\n");
}

// will work only on linux
function procat( $proc, $minutesfromnow = 0) {
$time = 'now'; if ( $minutesfromnow) $time .= " + $minutesfromnow minutes";
$out = popen( "at $time >/dev/null 2>/dev/null 3>/dev/null", 'w');
fwrite( $out, $proc);
pclose( $out);
}
function procatwatch( $c, $procidstring, $statusfile, $e = null, $sleep = 2, $timeout = 300) { // c should know/use statusfile
$startime = tsystem(); if ( ! $e) $e = echoeinit();
procat( $c); $h = tth( 'progress=?');
while ( tsystem() - $startime < $timeout) {
sleep( $sleep);
if ( ! procpid( $procidstring)) break;	// process finished
$h2 = jsonload( $statusfile, true, true); if ( ! $h2 && ! isset( $h2[ 'progress'])) continue;
$h = hm( $h, $h2); echoe( $e, ' ' . $h[ 'progress']);
}
echoe( $e, '');	// erase all previous echos
}


function procores() { 	// count the number of cores on this machine
$file = file( '/proc/cpuinfo');
$count = 0; foreach ($file as $line) if ( strpos( $line, 'processor') === 0) $count++;
return $count;
}

// ghostscript command line -- should have gswin32c in PATH
function procgspdf2png( $pdf, $png = '', $r = 300) { // returns TRUE | failed command line    -- judges failure by absence of png file
if ( ! $png) { $L = ttl( $pdf, '.'); lpop( $L); $png = ltt( $L, '.') . '.png'; }
if ( is_file( $png)) `rm -Rf $png`;
$c = "gswin32c -q -sDEVICE=png16m -r$r -sOutputFile=$png -dBATCH -dNOPAUSE $pdf"; echopipee( $c);
if ( ! is_file( $png)) return $c;
return true;
}

// ffmpeg command line -- ffmpeg should be in PATH
function procffmpeg( $in = '%06d.png', $out = 'temp.avi', $rate = null) { // returns TRUE | failed command line
if ( is_file( $out)) `rm -Rf $out`;
$c = "ffmpeg";
if ( $rate) $c .= " -r $rate";
$c .= " -i $in $out";
echopipee( $c);
if ( @filesize( $out) == 0) { `rm -Rf $out`; return $c; }	// present but empty file
if ( ! is_file( $out)) return $c;
echopipee( "chmod -R 777 $out");
return true;
}

// pdftk command line -- pdftk should be in PATH
function procpdftk( $in = 'tempdf*', $out = 'temp.pdf', $donotremove = false) { // returns TRUE | failed command line
if ( is_file( $out)) `rm -Rf $out`;
$c = "pdftk $in cat output $out"; echopipee( $c);
if ( ! is_file( $out)) return $c;
echopipee( "chmod -R 777 $out");
if ( ! $donotremove) `rm -Rf $in`;
return true;
}


function procdf() { 	// runs df -h in terminal and returns hash { mountpoint: { use(string), avail(string), used(string), size(string)}, ...}
$in = popen( 'df -h', 'r');
$ks = ttl( trim( fgets( $in)), ' '); lpop( $ks); lpop( $ks); lpop( $ks); lpush( $ks, 'Use'); // Mounted on
for ( $i = 0; $i < count( $ks); $i++) $ks[ $i] = strtolower( $ks[ $i]);	// lower caps in all keys
$D = array();
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in)); if ( ! $line) continue;
$vs = ttl( $line, ' '); if ( count( $vs) < 4) continue;	// probably 2-line entry
$mount = lpop( $vs); $h = array();
$ks2 = $ks; while ( count( $ks2) > 1) $h[ lpop( $ks2)] = lpop( $vs);
$D[ $mount] = $h;
}
pclose( $in);
return $D;
}
function procdu( $dir = null) { 	// runs du -s
$cwd = getcwd(); if ( $dir) chdir( $dir); $size = null;
$in = popen( 'du -s', 'r');
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in)); if ( ! $line) continue;
$size = lshift( ttl( $line, ' '));
}
pclose( $in);
return $size;
}
function procdfuse( $mount) { 	// parser for procdf output, will return int of use on that mount
$h = procdf();
if ( ! isset( $h[ $mount])) return null;
return ( int)( $h[ $mount][ 'use']);
}
function procdfavail( $mount) { 	// will parse 'avail', will return available size in Mb
$h = procdf();
if ( ! isset( $h[ $mount])) return null;
$v = $h[ $mount][ 'avail'];
if ( strpos( $v, 'G')) return 1000 * ( int)( $v);
if ( strpos( $v, 'M')) return ( int)$v;
if ( strpos( $v, 'K') || strpos( $line, 'k')) return 0.001 * ( int)( $v);
}

// no pipe, just echo with erasure on each update, monitors the time as well
function echoeinit() { // returns handler { last: ( string length), firstime, lastime}
$h = array(); $h[ 'last'] = 0;
$h[ 'firstime'] = tsystem();
$h[ 'lastime'] = tsystem();
return $h;
}
function echoe( &$h, $msg) { // if h[ 'last'] set, will erase old info first, then post current
if ( $h[ 'last']) for ( $i = 0; $i < $h[ 'last']; $i++) { echo chr( 8); echo '  '; echo chr( 8); echo chr( 8); } // retreat erasing with spaces
echo $msg; $h[ 'last'] = mb_strlen( $msg);
$h[ 'lastime'] = tsystem();
}
function echoetime( &$h) { extract( $h); return tshinterval( $firstime, $lastime); }

function procpid( $name, $notpid = null) {  // returns pid or FALSE, if not running
$in = popen( 'ps ax', 'r');
$found = false;
$pid = null;
while( ! feof( $in)) {
$line = trim( fgets( $in));
if ( strpos( $line, $name) !== FALSE) {
$split = explode( ' ', $line);
$pid = trim( $split[ 0]);
if ( $notpid && $notpid == $pid) { $pid = null; continue; }
$found = true;
break;
}
}
pclose( $in);
if ( $found && is_numeric( $pid)) return $pid;
return false;
}
function procline( $name) {
$in = popen( 'ps ax', 'r');
$found = false;
$pid = null;
$pline = '';
while( ! feof( $in)) {
$line = trim( fgets( $in));
if ( strpos( $line, $name) !== FALSE) {
$pline = $line;
break;
}
}
pclose( $in);
if ( $pline) return $pline;
return false;
}
function prockill( $pid, $signal = NULL) { // signal 9 is deadly
if ( ! $pid) return;	 // ignore, if pid is not set
if ( $signal) `kill -$signal $pid > /dev/null 2> /dev/null`;
else `kill $pid > /dev/null 2> /dev/null`;
}
function prockillandmakesure( $name, $limit = 20, $signal = NULL) { // signal 9 is deadly
$rounds = 0;
while ( $rounds < 20 && $pid = procpid( $name)) { $rounds++; prockill( $pid, $signal); }
return $rounds;
}
function procispid( $pid) {  // returns false|true, true if pid still exists
$in = popen( "ps ax", 'r');
$found = false;
while ( $in && ! feof( $in)) {
$pid2 = array_shift( ttl( trim( fgets( $in)), ' '));
if ( $pid - $pid2 === 0) { pclose( $in); return true; }
}
pclose( $in);
return false;
}
function procpipe( $command, $second = false, $third = false) {	// return output of command
$c = "$command";
if ( $second) $c .= ' 2>&1'; else $c .= ' 2>/dev/null';
if ( $third) $c .= ' 3>&1'; else $c .= ' 3> /dev/null';
$in = popen( $c, 'r');
$lines = array();
while ( $in && ! feof( $in)) array_push( $lines, trim( fgets( $in)));
return $lines;
}
// different from pipe by directing output to a file, monitoring executable and getting updates from file
function procpipe2( $command, $tempfile, $second = false, $third = false, $echo = false, $pname = '', $usleep = 100000) {
$c = "$command > $tempfile";
$tempfile2 = $tempfile . '2';
if ( $second) $c .= ' 2>&1'; else $c .= ' 2>/dev/null';
if ( $third) $c .= ' 3>&1'; else $c .= ' 3> /dev/null';
`$c &`;
if ( ! $pname) $pname = array_shift( ttl( $command, ' '));
$pid = procpid( $pname); if ( ! $pid) $pid = -1;
$lines = array(); $linepos = 0; $lastround = 3;
while( procispid( $pid) || $lastround) {
if ( ! procispid( $pid)) $lastround--;
// get raw lines
`rm -Rf $tempfile2`;
`cp $tempfile $tempfile2`;
$lines2 = array(); $in = fopen( $tempfile2, 'r'); while ( $in && ! feof( $in)) array_push( $lines2, fgets( $in)); fclose( $in);
`rm -Rf $tempfile2`;
//echo "found [" . count( $lines2) . "]\n";
// convert to actual lines by escaping ^m symbol as well
$cleans = array( 0, 13);
foreach ( $cleans as $clean) {
$lines3 = array(); $next = false;
foreach ( $lines2 as $line) {
//echo "line length[" . strlen( $line) . "]\n";
//$lines4 = ttlm( $line, chr( $clean));
$lines4 = ttl( $line, chr( $clean));
//echo "line split[" . count( $lines4) . "]\n";
foreach ( $lines4 as $line2) array_push( $lines3, trim( $line2));
}
$lines2 = $lines3;
}
for ( $i = 0; $i < $linepos && count( $lines2); $i++) array_shift( $lines2);
$linepos += count( $lines2);
foreach ( $lines2 as $line) { array_push( $lines, $line); if ( $echo) echo "pid[$pid][$linepos] $line\n"; }
usleep( $usleep);
}
return $lines;
}
function procwho() { // returns the name of the user
$in = popen( 'whoami', 'r');
if ( ! $in) die( 'fialed to know myself');
$user = trim( fgets( $in));
fclose( $in);
return $user;
}
function procwhich( $command) { // returns the path to the command
$in = popen( 'which $command', 'r');
$path = ''; if ( $in && ! feof( $in)) $path = trim( fgets( $in));
fclose( $in);
return $path;
}
// pipe and echo
function echopipe( $command, $tag = null, $chunksize = 1024) { // returns array( time it took (s), lastline)
$in = popen( "$command 2>&1 3>&1", 'r');
$start = tsystem();
$line = ''; $lastline = '';
echo $tag ? $tag : '';
while ( $in && ! feof( $in)) {
$stuff = fgets( $in, $chunksize + 1);
echo $stuff; $line .= $stuff;
$tail = substr( $stuff, mb_strlen( $stuff) - 1, 1);
if ( $tail == "\n") { echo  $tag ? $tag : ''; $lastline = $line; $line = ''; }
}
@fclose( $in);
return array( tsystem() - $start, $lastline);
}
// with erase -- erases each previous line when outputing the next one (actually, does it symbol by symbol)
function echopipee( $command, $limit = null, $debug = null, $alerts = null, $logfile = null, $newlog = true) {	// returns array( time it took (s), lastline)
if ( $alerts && is_string( $alerts)) $alerts = ttl( $alerts);
$start = tsystem();
$in = popen( "$command 2>&1 3>&1", 'r');
$count = 0; $line = ''; $lastline = '';
if ( $debug) fwrite( $debug, "opening command [$command]\n");
if ( $logfile && $newlog) { $out = fopen( $logfile, 'w'); fclose( $out); }	// empty the log file, only if newlog = true
if ( $logfile && ! $newlog) { $out = fopen( $logfile, 'a'); fwrite( $out, "NEW ECHOPIPEE for c[$command]\n"); fclose( $out); }
$endofline = false;
while ( $in && ! feof( $in)) {
$stuff = fgetc( $in);
$line .= $stuff == chr( 13) ? "\n" : $stuff;
if ( ( ! $limit || ( $limit && mb_strlen( $line) < $limit)) && $stuff != "\n") {
if ( $endofline) {
// end of line or chunk (with limit), revert the line back to zero
if ( $logfile) { $out = fopen( $logfile, 'a'); fwrite( $out, $line); fclose( $out); }
if ( $debug) fwrite( $debug, $line);
// hide previous output
for ( $i = 0; $i < $count; $i++) { echo chr( 8); echo '  '; echo chr( 8); echo chr( 8); } // retreat erasing with spaces
$count = 0; $lastline = $line; $line = ''; // back to zero
// check for any alert words in output
if ( $alerts) foreach ( $alerts as $alert) { // if alert word is found, echo the full line and do not erase it
if ( strpos( strtolower( $line), strtolower( $alert)) != false) { echo "   $line   "; break; }
}
$endofline = false;
}
echo $stuff;
if ( $stuff != chr( 8)) $count++;
else $count--; if ( $count < 0) $count = 0;
continue;
}
$endofline = true;
}
for ( $i = 0; $i < $count; $i++) { echo chr( 8); echo ' '; echo chr( 8); } // erase current output
pclose( $in);
if ( $logfile) { $out = fopen( $logfile, 'a'); fwrite( $out, "\n\n\n\n\n"); fclose( $out); }
return array( tsystem() - $start, $lastline);
}
function echopipeo( $command) {	// returns array( time it took (s), lastline)
$start = tsystem();
$in = popen( "$command 2>&1 3>&1", 'r');
$endofline = false; $count = 0; $line = ''; $lastline = '';
while ( $in && ! feof( $in)) {
$stuff = fgetc( $in);
$line .= $stuff == chr( 13) ? "\n" : $stuff;
if ( $endofline) { // none-eol-char but endofline is marked
for ( $i = 0; $i < $count; $i++) { echo chr( 8); echo '  '; echo chr( 8); echo chr( 8); } // retreat erasing with spaces
$count = 0; $lastline = $line; $line = ''; // back to zero
$endofline = false;
}
while ( $in && ! feof( $in)) {
$stuff = fgetc( $in);
$line .= $stuff == chr( 13) ? "\n" : $stuff;
if ( $stuff == "\n") break;	// end of line break the inner loop
echo $stuff;
if ( $stuff != chr( 8)) $count++;
else $count--; if ( $count < 0) $count = 0;
}
$endofline = true;
}
pclose( $in);
return array( tsystem() - $start, trim( $lastline));
}


?><?php

// asynchronous file access
// depends on time
function aslock( $file, $timeout = 1.0, $grain = 0.05) {	// returns [ time, lock]
global $ASLOCKS, $ASLOCKSTATS, $ASLOCKSTATSON;
// create a fairly unique lock file based on current time
$time = tsystem(); $start = ( double)$time;
if ( $ASLOCKSTATSON) lpush( $ASLOCKSTATS, tth( "type=aslock.start,time=$time,file=$file,grain=$grain"));
$out = null; $count = 0;
while( $time - $start < $timeout) {
// create a unique lock filename based on rounded current time
$time = tsystem(); if ( count( ttl( "$time", '.')) == 1) $time .= '.0';
$stamp = '' . round( $time);	// times as string
$L = ttl( "$time", '.'); $stamp .= '.' . lpop( $L);	// add us tail
$stamp = $grain * ( int)( $stamp / $grain);	// round what's left of time to the nearest grain
$lock = "$file.$stamp.lock";
if ( ! is_file( $lock)) { $out = fopen( $lock, 'w'); break; }	// success obtaining the lock
usleep( mt_rand( round( 0.5 * 1000000 * $grain), round( 1.5 * 1000000 * $grain)));	// between 0.5 and 1.5 of the grain
$count++;
}
if ( ! $out) $out = @fopen( $lock, 'w');
if ( ! isset( $ASLOCKS[ $lock])) $ASLOCKS[ $lock] = $out;
if ( $ASLOCKSTATSON) lpush( $ASLOCKSTATS, tth( "type=aslock.end,time=$time,file=$file,count=$count,status=" . ( $out ? 'ok' : 'failed')));
return array( $time, $lock);
}
function asunlock( $file, $lockfile = null) { // if lockfile is nul, will try to close the last lock with this prefix
global $ASLOCKS, $ASLOCKSTATS, $ASLOCKSTATSON;
$time = tsystem();
if ( $lockfile) {
if ( isset( $ASLOCKS[ $lockfile])) { @fclose( $ASLOCKS[ $lockfile]); @unlink( $lockfile); }
unset( $ASLOCKS[ $lockfile]); @unlink( $lockfile);
}
else {	// lockfile unknown, try to close the last one with $file as prefix
$ks = hk( $ASLOCKS);
while ( count( $ks)) {
$k = lpop( $ks);
if ( strpos( $k, $file) !== 0) continue;
@fclose( $ASLOCKS[ $k]); @unlink( $ASLOCKS[ $k]);
unset( $ASLOCKS[ $k]);
break;
}

}
if ( $ASLOCKSTATSON) lpush( $ASLOCKSTATS, tth( "type=asunlock,time=$time,file=$file,status=ok"));
}

?><?php
$ANOTHERPDF;
$PLOTDONOTSCALE = false;
define( 'FPDF_FONTPATH',  "$ABDIR/lib/fpdf/font/");
// plot library, requires FPDF+addons framework
// use only CSS colors
// scalex() and scaley() put (0:0) coord in bottom left corner (human way != computer way)
function plotnew( $title = 'no title', $author = 'no autor', $orientation = 'L', $size = 'A4', $other = null) { // A4 can be WxH format
global $BDIR, $ABDIR;
require_once( "$ABDIR/lib/fpdf/ufpdf.php");
$pdf = null;
if ( ! $other) {	// create new plot
$pdf = new FFPDF( $orientation, 'mm', $size);
$pdf->Open();
$pdf->SetTitle( $title);
$pdf->SetAuthor( $author);
$pdf->AddFont( 'Gothic', '', 'GOTHIC.TTF.php');
}
else $pdf = $other[ 'pdf'];
$obj = array( 'pdf' => $pdf);
switch ( $size) {
case 'A4': $obj[ 'w'] = $orientation == 'L' ? 297 : 210; $obj[ 'h'] = $orientation == 'L' ? 210 : 297; break;
default: { extract( lth( ttl( $size, 'x'), ttl( 'w,h'))); $obj[ 'w'] = $w; $obj[ 'h'] = $h; }
}
// start from top-left corner by default
$obj[ 'top'] = 0;	// width and height are defined for each page
$obj[ 'left'] = 0;
return $obj;
}
function plotinit( $title = 'no title', $author = 'no autor', $orientation = 'L', $size = 'A4', $other = null) {	// returns pdf class
global $ANOTHERPDF;
$ANOTHERPDF = plotnew( $title, $author, $orientation, $size); // for textdim
plotpage( $ANOTHERPDF);
return plotnew( $title, $author, $orientation, $size, $other);
}
// margindef can be 'top:right:bottom:left' -- as in CSS
function plotpage( &$pdf, $margindef = 0.1, $donotadd = false) {
if ( ! $donotadd) $pdf[ 'pdf']->addPage();
$margins = array( 0.1, 0.1, 0.1, 0.1);
if ( is_array( $margindef)) $margins = $margindef;
if ( is_numeric( $margindef)) $margins = array( $margindef, $margindef, $margindef, $margindef); // top, right, bottom, left
if ( is_string( $margindef)) $margins = ttl( $margindef, ':');
$pdf[ 'left'] = ( int)( $margins[ 3] * $pdf[ 'w']);
$pdf[ 'top'] = ( int)( $margins[ 0] * $pdf[ 'h']);
$pdf[ 'width'] = ( int)( $pdf[ 'w'] - $pdf[ 'left'] - $margins[ 1] * $pdf[ 'w']);
$pdf[ 'height'] = ( int)( $pdf[ 'h'] - $pdf[ 'top'] - $margins[ 2] * $pdf[ 'h']);
}
// margindef can be "top:right:bottom:left" -- as in CSS
function plotscale( &$pdf, $xs, $ys, $margindef = 0.1) {	// adds xmin, xmax, ymin, ymax
$margins = array();
if ( ! $margindef && isset( $pdf[ 'margins'])) $margins = $pdf[ 'margins'];
$margins = array( 0.1, 0.1, 0.1, 0.1);
if ( is_numeric( $margindef)) $margins = array( $margindef, $margindef, $margindef, $margindef); // top, right, bottom, left
if ( is_string( $margindef)) $margins = ttl( $margindef, ':');
$min = mmin( $xs); $max = mmax( $xs);
$pdf[ 'margins'] = $margins;
// xmin
$rxmin = $min - $margins[ 3] * ( $max - $min);
if ( ! isset( $pdf[ 'xmin'])) $pdf[ 'xmin'] = $rxmin;
if ( $rxmin < $pdf[ 'xmin']) $pdf[ 'xmin'] = $rxmin;
// xmax
$rxmax = $max + $margins[ 1] * ( $max - $min);
if ( ! isset( $pdf[ 'xmax'])) $pdf[ 'xmax'] = $rxmax;
if ( $rxmax > $pdf[ 'xmax']) $pdf[ 'xmax'] = $rxmax;
// ymin
$min = mmin( $ys); $max = mmax( $ys);
$rymin = $min - $margins[ 2] * ( $max - $min);
if ( ! isset( $pdf[ 'ymin'])) $pdf[ 'ymin'] = $rymin;
if ( $rymin < $pdf[ 'ymin']) $pdf[ 'ymin'] = $rymin;
// ymax
$rymax = $max + $margins[ 0] * ( $max - $min);
if ( ! isset( $pdf[ 'ymax'])) $pdf[ 'ymax'] = $rymax;
if ( $rymax > $pdf[ 'ymax']) $pdf[ 'ymax'] = $rymax;
}
function plotdump( &$pdf, $file) {	// close and write to file
$pdf[ 'pdf']->Close();
$pdf[ 'pdf']->Output( $file, 'F');
}
function plotraw( &$pdf) { return $pdf[ 'pdf']; } // returns raw object
// pdf setup functions
function plotsetalpha( &$pdf, $alpha) { $pdf[ 'pdf']->SetAlpha( $alpha); }
// cap (square|butt|round), join(meter|round|bevel), dash '4,2'
function plotsetlinestyle( &$pdf, $lw, $color = '#000', $dash = 0, $cap = 'butt', $join = 'miter', $phase = 0) {
$r = 0; $g = 0; $b = 0;
if ( $color !== null) $pdf[ 'pdf']->HTML2RGB( $color, $r, $g, $b);
$setup = array();
if ( $lw !== null) $setup[ 'width'] = $lw;
if ( $cap !== null) $setup[ 'cap'] = $cap;
if ( $join !== null) $setup[ 'join'] = $join;
if ( $dash !== null) $setup[ 'dash'] = $dash;
if ( $phase !== null) $setup[ 'phase'] = $phase;
if ( $color !== null) $setup[ 'color'] = array( $r, $g, $b);
$pdf[ 'pdf']->SetLineStyle( $setup);
}
function plotsetdrawstyle( &$pdf, $color) { $pdf[ 'pdf']->SetDrawColor( $color); }
function plotsetfillstyle( &$pdf, $color) { $pdf[ 'pdf']->SetFillColor( $color); }
function plotsettextstyle( &$pdf, $font = null, $fontsize = null, $color = null) {
if ( $font === null) $font = 'Gothic';	// default
if ( $fontsize !== null) $pdf[ 'pdf']->SetFont( 'Gothic', '', $fontsize);
if ( $color !== null) $pdf[ 'pdf']->SetTextColor( $color);
}
function plotlinewidth( &$pdf, $lw) { $pdf[ 'pdf']->SetLineWidth( $lw); }
// transforms (scale does not seem to work well -- or I don't get it
function plotstartransformscale( &$pdf, $x, $y, $scalex = 100, $scaley = 100, $donotstart = false) {
if ( ! $donotstart) $pdf[ 'pdf']->StartTransform();
if ( $scalex) $pdf[ 'pdf']->ScaleX( $scalex, plotscalex( $pdf, $x), plotscaley( $pdf, $y));
if ( $scaley) $pdf[ 'pdf']->ScaleY( $scaley, plotscalex( $pdf, $x), plotscaley( $pdf, $y));
}
function plotstartransformtranslate( &$pdf, $xplus, $yplus, $donotstart = false) {
if ( ! $donotstart) $pdf[ 'pdf']->StartTransform();
$pdf[ 'pdf']->Translate( $xplus, $yplus);
}
function plotstartransformrotate( &$pdf, $x, $y, $angle, $donotstart = false) { // counterclockwise
if ( ! $donotstart) $pdf[ 'pdf']->StartTransform();
$pdf[ 'pdf']->Rotate( $angle, plotscalex( $pdf, $x), plotscaley( $pdf, $y));
}
function plotstartransformskew( &$pdf, $x, $y, $anglex = 100, $angley = 100, $donotstart = false) { // angle -90..90
if ( ! $donotstart) $pdf[ 'pdf']->StartTransform();
if ( $anglex) $pdf[ 'pdf']->SkewX( $anglex, plotscalex( $pdf, $x), plotscaley( $pdf, $y));
if ( $angley) $pdf[ 'pdf']->SkewY( $angley, plotscalex( $pdf, $x), plotscaley( $pdf, $y));
}
function plotstoptransform( &$pdf) { $pdf[ 'pdf']->StopTransform(); }



// base drawing and text writing functions
// style( D|F|DF), start: xf,yf end: xt,yt, controls: xN,yN
function plotline( &$pdf, $x1, $y1, $x2, $y2, $lw = null, $color = null, $alpha = null, $dash = null) {
if ( is_string( $dash)) {	// maybe special dash
$s = ttl( $dash, ',');
$tail = array_pop( $s);
if ( $tail == '*') {
$d = ( int)( 3 * pow(  pow( plotscalex( $pdf, $x1) - plotscalex( $pdf, $x2), 2) + pow( plotscaley( $pdf, $y1) - plotscaley( $pdf, $y2), 2), 0.5));
$sum = msum( $s);
$tail = $d - $sum - 1;
array_push( $s, $tail);
}
else array_push( $s, $tail);
$dash = ltt( $s, ',');
plotsetlinestyle( $pdf, $lw, $color, $dash, 'butt', null, 3);
}
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $color !== null) plotsetdrawstyle( $pdf, $color);
$pdf[ 'pdf']->Line( plotscalex( $pdf, $x1), plotscaley( $pdf, $y1), plotscalex( $pdf, $x2), plotscaley( $pdf, $y2));
}
function plotrect( &$pdf, $x, $y, $w, $h, $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
$pdf[ 'pdf']->Rect( plotscalex( $pdf, $x), plotscaley( $pdf, $y), $w, $h, $style);
}
function plotcurve( &$pdf, $xf, $yf, $x0, $y0, $x1, $y1, $xt, $yt, $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
$pdf[ 'pdf']->Curve(
plotscalex( $pdf, $xf), plotscaley( $pdf, $yf),
plotscalex( $pdf, $x0), plotscaley( $pdf, $y0),
plotscalex( $pdf, $x1), plotscaley( $pdf, $y1),
plotscalex( $pdf, $xt), plotscaley( $pdf, $yt),
$style
);
}
function plotellipse( &$pdf, $x, $y, $rx, $ry, $a = 0, $af = 0, $at = 360, $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
$pdf[ 'pdf']->Ellipse(
plotscalex( $pdf, $x), plotscaley( $pdf, $y),
$rx, $ry, $a, $af, $at, $style
);
}
function plotcircle( &$pdf, $x, $y, $r, $af = 0, $at = 360, $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
$pdf[ 'pdf']->Circle(
plotscalex( $pdf, $x), plotscaley( $pdf, $y),
$r, $af, $at, $style
);
}
function plotpolygon( &$pdf, $points, $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( is_string( $points)) $points = ttl( $points);
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
for ( $i = 0; $i < count( $points); $i += 2) {	// scale in pairs
$points[ $i] = plotscalex( $pdf, $points[ $i]);
if ( isset( $points[ $i + 1])) $points[ $i + 1] = plotscaley( $pdf, $points[ $i + 1]);
}
$pdf[ 'pdf']->Polygon( $points, $style);
}
function plotroundedrect( &$pdf, $x, $y, $w, $h, $r, $corners = '1111', $style = 'DF', $lw = null, $draw = null, $fill = null, $alpha = null) {
if ( $lw !== null) plotlinewidth( $pdf, $lw);
if ( $draw !== null) plotsetdrawstyle( $pdf, $draw);
if ( $fill !== null) plotsetfillstyle( $pdf, $fill);
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
$pdf[ 'pdf']->RoundedRect( plotscalex( $pdf, $x), plotscaley( $pdf, $y), $w, $h, $r, $corners, $style);
}

// various bullets: cross,plus,hline,vline,triangle,diamond,rect,circle
function plotbullet( &$pdf, $type, $x, $y, $size = 2, $lw = 0.1, $draw = null, $fill = null, $alpha = null) { switch( $type) {
case 'cross': plotbulletcross( $pdf, $x, $y, $size, $lw, $draw, $alpha); break;
case 'plus': plotbulletplus( $pdf, $x, $y, $size, $lw, $draw, $alpha); break;
case 'hline': plotbullethline( $pdf, $x, $y, $size, $lw, $draw, $alpha); break;
case 'vline': plotbulletvline( $pdf, $x, $y, $size, $lw, $draw, $alpha); break;
case 'triangle': plotbullettriangle( $pdf, $x, $y, $size, $lw, $draw, $fill, $alpha); break;
case 'diamond': plotbulletdiamond( $pdf, $x, $y, $size, $lw, $draw, $fill, $alpha); break;
case 'rect': plotbulletrect( $pdf, $x, $y, $size, $lw, $draw, $fill, $alpha); break;
case 'circle': plotbulletcircle( $pdf, $x, $y, $size, $lw, $draw, $fill, $alpha); break;
default: plotbulletcustom( $pdf, $x, $y, $type, $lw, $draw, $fill, $alpha); break; // type contains the polygon setup
}}
function plotbulletcross( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $alpha = null) {
$size = 0.5 * $size;
plotline( $pdf, "$x:-$size", "$y:$size", "$x:$size", "$y:-$size", $lw, $draw, $alpha);
plotline( $pdf, "$x:$size", "$y:$size", "$x:-$size", "$y:-$size", $lw, $draw, $alpha);
}
function plotbulletplus( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $alpha = null) {
$size = 0.5 * $size;
plotline( $pdf, $x, "$y:$size", $x, "$y:-$size", $lw, $draw, $alpha);
plotline( $pdf, "$x:$size", $y, "$x:-$size", $y, $lw, $draw, $alpha);
}
function plotbullethline( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $alpha = null) {
$size = 0.5 * $size;
plotline( $pdf, "$x:$size", $y, "$x:-$size", $y, $lw, $draw, $alpha);
}
function plotbulletvline( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $alpha = null) {
$size = 0.5 * $size;
plotline( $pdf, $x, "$y:$size", $x, "$y:-$size", $lw, $draw, $alpha);
}
function plotbullettriangle( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $fill = null, $alpha = null) {
$style = 'D';
if ( $draw && $fill) $style = 'DF';
if ( ! $draw && $fill) $style = 'F';
$size = 0.5 * $size;
plotpolygon( $pdf, "$x,$y:$size,$x:-$size,$y:-$size,$x:$size,$y:-$size,$x,$y:$size", $style, $lw, $draw, $fill, $alpha);
}
function plotbulletdiamond( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $fill = null, $alpha = null) {
$style = 'D';
if ( $draw && $fill) $style = 'DF';
if ( ! $draw && $fill) $style = 'F';
$size = 0.5 * $size;
plotpolygon( $pdf, "$x,$y:$size,$x:-$size,$y,$x,$y:-$size,$x:$size,$y,$x,$y:$size", $style, $lw, $draw, $fill, $alpha);
}
function plotbulletrect( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $fill = null, $alpha = null) {
$style = 'D';
if ( $draw && $fill) $style = 'DF';
if ( ! $draw && $fill) $style = 'F';
$size = 0.5 * $size;
plotpolygon( $pdf, "$x:-$size,$y:$size,$x:-$size,$y:-$size,$x:$size,$y:-$size,$x:$size,$y:$size,$x:-$size,$y:$size", $style, $lw, $draw, $fill, $alpha);
}
function plotbulletcircle( &$pdf, $x, $y, $size = 2, $lw = 0.1, $draw = null, $fill = null, $alpha = null) {
$style = 'D';
if ( $draw && $fill) $style = 'DF';
if ( ! $draw && $fill) $style = 'F';
$size = 0.5 * $size;
plotcircle( $pdf, $x, $y, $size, 0, 360, $style, $lw, $draw, $fill, $alpha);
}
function plotbulletcustom( &$pdf, $x, $y, $setup, $lw = 0.1, $draw = null, $fill = null, $alpha = null) {
// setup is in form    xdiff:ydiff,xdiff:ydiff
$style = 'D';
if ( $draw && $fill) $style = 'DF';
if ( ! $draw && $fill) $style = 'F';
$L = array(); foreach ( ttl( $setup) as $vs) { extract( lth( ttl( $vs, ':'), ttl( 'xdiff,ydiff'))); lpush( $L, "$x:$xdiff"); lpush( $L, "$y:$ydiff"); }
plotpolygon( $pdf, ltt( $L), $style, $lw, $draw, $fill, $alpha);
}


// by default the string is printed from bottom-left
function plotstringdim( &$pdf, $text, $fontsize = null, $noh = false) {	// returns w,h,lh,em,ex array = text dimensions
global $ANOTHERPDF; $pdf =& $ANOTHERPDF;
plotsettextstyle( $pdf, null, $fontsize, null);
$h2 = -1; $h = -1;
if ( ! $noh) {	// calculate height as well
$pdf[ 'pdf']->Text( 0, 0, "\n");
//$h = ( int)( $pdf[ 'pdf']->getY() / 2.5);	// 2.2 worked also
$h = $pdf[ 'pdf']->FontSize; $h2 = round( $h - 0.2 * $h, 2);
}
$w = ( int)( $pdf[ 'pdf']->GetStringWidth( $text));
return tth( "lh=$h,h=$h2,w=$w,em=" . round( 0.9 * $h2, 2) . ",ex=" . round( 0.7 * $h2, 2));
}
function plotstring( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
plotsettextstyle( $pdf, null, $fontsize, $color);
$pdf[ 'pdf']->Text( plotscalex( $pdf, $x), plotscaley( $pdf, $y), $text);
}
// try to align to the (r)ight, (c)enter, (ml) mid-left, etc... plotstring() plots on the right,bottommost
function plotstringr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
$w = $pdf[ 'pdf']->GetStringWidth( $text);
plotstring( $pdf, "$x:-$w", $y, $text, $fontsize, $color, $alpha);
return tth( "w=$w");
}
function plotstringc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
$w = $pdf[ 'pdf']->GetStringWidth( $text);
$w2 = 0.5 * $w;
plotstring( $pdf, "$x:-$w2", $y, $text, $fontsize, $color, $alpha);
return tth( "w=$w");
}
function plotstringml( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize)); // em, ex
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstring( $pdf, $x, "$y:-$h2", $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
function plotstringmr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstring( $pdf, "$x:-$w", "$y:-$h2", $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
function plotstringmc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
$w2 = 0.5 * $w;
plotstring( $pdf, "$x:-$w2", "$y:-$h2", $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
function plotstringtl( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
plotstring( $pdf, $x, "$y:-" . ( mb_strtolower( $text) == $text ? $ex : $em), $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
function plotstringtr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
plotstring( $pdf, "$x:-$w", "$y:-" . ( mb_strtolower( $text) == $text ? $ex : $em), $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
function plotstringtc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = ( mb_strtolower( $text) == $text ? $ex : $em);
plotstring( $pdf, "$x:-$w2", "$y:-$h2", $text, $fontsize, $color, $alpha);
return tth( "w=$w,h=$h");
}
// vertical strings, all custom functions are 90-counterclockwise (use plotvstring() for custom solutions)
function plotvstring( &$pdf, $x, $y, $cx, $cy, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
if ( $alpha !== null) plotsetalpha( $pdf, $alpha);
plotsettextstyle( $pdf, null, $fontsize, $color);
plotstartransformrotate( $pdf, $cx, $cy, $rotate);
$pdf[ 'pdf']->Text( plotscalex( $pdf, $x), plotscaley( $pdf, $y), $text);
plotstoptransform( $pdf);
// return dimensions
return plotstringdim( $pdf, $text, $fontsize);
}
function plotvstringbr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
plotvstring( $pdf, $x, $y, "$x:$w", $y, $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringbl( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
plotvstring( $pdf, $x, $y, $x, $y, $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringtr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, "$x:$w", "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringtl( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, $x, "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringbc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
plotvstring( $pdf, $x, $y, "$x:$w2", $y, $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringtc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, "$x:$w2", "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringmr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, $x, "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringml( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, "$x:$w", "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
function plotvstringmc( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $apha = null) {
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotvstring( $pdf, $x, $y, "$x:$w2", "$y:$h2", $text, $fontsize, $color, $rotate, $alpha);
return tth( "w=$w,h=$h");
}
// special cases, mid-down|up from here, center-right|left from here
function plotvstringmd( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w", "$y:-$h2", $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringmu( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, $x, "$y:-$h2", $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringmm( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w2", "$y:-$h2", $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringmmr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w2", $y, $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringmml( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w2", "$y:-$h2", $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringcr( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w2:$h2", $y, $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}
function plotvstringcl( &$pdf, $x, $y, $text, $fontsize = null, $color = null, $rotate = 90, $alpha = null) {
plotsettextstyle( $pdf, null, $fontsize, $color);
extract( plotstringdim( $pdf, $text, $fontsize));
$w2 = 0.5 * $w;
$h = ( mb_strtolower( $text) == $text ? $ex : $em);
$h2 = 0.5 * ( mb_strtolower( $text) == $text ? $ex : $em);
plotstartransformrotate( $pdf, $x, $y, $rotate);
plotstring( $pdf, "$x:-$w2:$h2", "$y:-$h", $text, $fontsize, $color, $alpha);
plotstoptransform( $pdf);
return tth( "w=$w,h=$h");
}

// internal functions and utilities
function plotscalex( &$pdf, $x) {	// allows coord:offset format
global $PLOTDONOTSCALE;
$xs = is_string( $x) ? ttl( $x, ':') : array( $x);
$x = array_shift( $xs);
if ( ! $PLOTDONOTSCALE) {
// check for devision by zero, if zero, put in center
if ( $pdf[ 'xmax'] == $pdf[ 'xmin']) $x = $pdf[ 'left'] + 0.5 * $pdf[ 'width'];
else $x = $pdf[ 'left'] + $pdf[ 'width'] * ( ( $x - $pdf[ 'xmin']) / ( $pdf[ 'xmax'] - $pdf[ 'xmin']));
}
// serve offset
while ( count( $xs)) $x += ( double)array_shift( $xs);
return $x;
}
function plotscaley( &$pdf, $y) { 	// allows coord:offset format
global $PLOTDONOTSCALE;
$ys = is_string( $y) ? ttl( $y, ':') : array( $y);
$y = array_shift( $ys);
if ( ! $PLOTDONOTSCALE) {
// check for devision by zero, if zero, put in center
if ( $pdf[ 'ymax'] == $pdf[ 'ymin']) $y = $pdf[ 'top'] + 0.5 * $pdf[ 'height'];
else $y = $pdf[ 'top'] + $pdf[ 'height'] - $pdf[ 'height'] * ( ( $y - $pdf[ 'ymin']) / ( $pdf[ 'ymax'] - $pdf[ 'ymin']));
}
// serve offset, opposite direction (computer versus human view)
while ( count( $ys)) $y -= ( double)array_shift( $ys);
return $y;
}
function plotscalexdiff( &$pdf, $x1, $x2 = 0) {	// always returns positive
return abs( plotscalex( $pdf, $x2) - plotscalex( $pdf, $x1));
}
function plotscaleydiff( &$pdf, $y1, $y2 = 0) {
return abs( plotscaley( $pdf, $y2) - plotscaley( $pdf, $y1));
}


?><?php
// eveyrthing that has to do with network graphs
class IDGen {
public $id = 0;
public $used = array();
public function next() { $this->id++; return $this->id; }
public function random( $digits) {
$limit = 1000;
while ( $limit--) {	// generate a new key
$k = mr( $digits); if ( isset( $this->used[ "$k"])) continue;
return $k;
}
die( " ERROR! IDGen() : cannot generate a random key after 1000 attemps, [" . count( $this->used) . "] key have already been used!\n\n");
}
public function reset() { $this->id = 0; $this->used = array(); }
}
class Location {
public $coordinates;
public function __construct( $one = 0, $two = 0, $three = '') {
if ( is_array( $one)) return $this->coordinates = $one;
if ( count( explode( ':', $one)) > 1) return $this->coordinates = explode( ':', $one);
$this->coordinates = array( $one);
if ( $two !== '') array_push( $this->coordinates, $two);
if ( $three !== '') array_push( $this->coordinates, $three);
}
public function isEmpty() {
if ( count( $this->coordinates) == 1 && ! $this->coordinates[ 0]) return true;
return false;
}
public function distance( $location, $precision = 4) {
$dimension = mmax( array( count( $this->coordinates), count( $location->coordinates)));
$sum = 0;
for ( $i = 0; $i < $dimension; $i++) {
$sum += pow(
isset( $this->coordinates[ $i]) ? $this->coordinates[ $i] : 0 -
isset( $location->coordinates[ $i]) ? $location->coordinates[ $i] : 0,
2
);
}
return $sum ? round( pow( $sum, 0.5), $precision) : 1;
}
public function dimension() { return count( $this->coordinates); }
}
class Node {
public $id;
public $location;	// Location object
public $in;			// hash (id) of Edge objects
public $out; 		// hash (id) of Edge objects
// constructor
public function __construct( $IDGen) {
$this->id = is_numeric( $IDGen) ? ( int)$IDGen : $IDGen->next();
$this->in = array(); $this->out = array();
$this->location = new Location();	// empty location just in case
}
public function place( $location) { $this->location = $location; }
public function addIn( $L) { $this->in[ $L->id] = $L; $L->target = $this; }
public function addOut( $L) { $this->out[ $L->id] = $L; $L->source = $this; }
public function isLink( $N) { // out connecting to this node
foreach ( $this->out as $id => $L) if ( $L->target->id == $N->id) return true;
return false;
}
public function getLink( $N) { // out connecting this with N
foreach ( $this->out as $id => $L) if ( $L->target->id == $N->id) return $L;
die( " Node.ERROR: no link from this node(" . $this->id . ") to node(" . $N->id . ")\n");
}
public function getLinks() { return $this->out; }
public function getDistance( $N) {	// N-dimensional distance, 1 hop
if ( ! $this->location || ! $node->location) return 1;	// location object is not set
return $this->location->distance( $N->location);
}
public function isme( $N) { if ( $this->id == $N->id) return true; return false; }
// location shortcuts
public function x() { return $this->location->coordinates[ 0]; }
public function y() { return $this->location->coordinates[ 1]; }
public function z() { return $this->location->coordinates[ 2]; }
public function nth( $n) { return $this->location->coordinates[ $n]; }
}
class Link {
public $id;
public $cost;
public $bandwidth;
public $propagation;
// objects
public $source;		// Node
public $target; 		// Node
public function __construct( $IDGen, $bandwidth = 1, $cost = 1, $propagation = 0) {
$this->id = is_numeric( $IDGen) ? ( int)$IDGen : $IDGen->next();
$this->cost = $cost;
$this->bandwidth = $bandwidth;
$this->propagation = $propagation;
$this->source = NULL; $this->target = NULL;
}
public function distance() {	// uses Location in both target and source
if ( ! $this->source || ! $this->target) die( " Link.ERROR: distance() cannot be calculated for link(" . $this->id . "), no source and target in this link.\n");
if ( $this->source == $this->target) return 0;
$source = $this->source;
return $this->propagation ? ( $this->propagation * 300000) :  $source->getDistance( $this->target);
}
public function delay() { return round( $this->distance() / 300000, 6); }
public function isme( $L) { if ( $this->source->id == $L->source->id && $this->target->id == $L->target->id) return true; return false; }
}
class Path {	// between 2 nodes, can be multihop
public $source;				// Node object
public $destination;		// Node object
public $hops;				// list of Edge objects
public function __construct( $source) {
$this->source = $source;
$this->destination = $source;	// default at first
$this->hops = array();
}
public function addHop( $L) {
lpush( $this->hops, $L);
$this->destination = $L->target;
}
public function getHops() { return $this->hops; }
public function isNodeInPath( $L) {	// walk all hops
if ( $this->source->id == $L->id) return true;
foreach ( $this->hops as $hop) if ( $hop->target->id == $L->id) return true;
return false;
}
public function getHopCount() { return count( $this->hops); }
public function getHopIds() {
$list = array();
foreach ( $this->hops as $L) lpush( $list, $L->id);
return $list;
}
public function getEndToEndCost( $usedistance = true, $usecost = true) {
$delay = 0;
foreach ( $this->hops as $L) {
if ( ! $usedistance && ! $usecost) $delay += 1;
else $delay += ( $usedistance ? $L->delay() : 1) + ( $usecost ? $L->cost : 1);
if ( ! $delay) $delay = 1;
}
return $delay;
}
public function isSamePath( $P) {
if ( $this->getHopCount() != $P->getHopCount()) return false;
for ( $i = 0; $i < count( $this->hops); $i++) if ( $this->hops[ $i]->id != $P->hops[ $i]->id) return false;
return true;
}
public function isSamePrefix( $P) {	// P is the prefix (shorter)
if ( count( $this->hops) < count( $P->hops)) return false;
for ( $i = 0; $i < count( $P->hops); $i++) if ( $this->hops[ $i]->id != $P->hops[ $i]->id) return false;
return true;
}
public function nodestring( $delimiter = '-') {
$list = array( $this->source->id);
if ( ! $this->getHopCount()) return implode( '.', $list);
for ( $i = 0; $i < count( $this->hops); $i++)
array_push( $list, $this->hops[ $i]->target->id);
return implode( $delimiter, $list);
}

}
class Graph {	// simple container for nodes and edges
public $nodes = array();
public $links = array();
// GETTERS and SETTERS
// node
public function addNode( $N) { $this->nodes[ $N->id] = $N; }
public function getNodes() { return $this->nodes; }
public function getNode( $id) { return $this->nodes[ $id]; }
public function getNodeCount() { return count( $this->nodes); }
// link
public function addLink( $L) { $this->links[ $L->id] = $L; }
public function getLinks() { return $this->links; }
public function getLink( $id) { return $this->links[ $id]; }
public function getLinkByNodeIds( $id1, $id2) {
foreach ( $this->links as $L) if ( $L->source->id == $id1 && $L->target->id = $id2) return $L;
return null;
}
public function getLinkCount() { return count( $this->links); }
// other functions
public function getDimension() {
$ds = array();
foreach ( $this->getNodes() as $N) {
if ( ! $N->location) continue;
lpush( $ds, count( $N->location->coordinates));
}
return mmax( $ds);
}
public function makePathByNodeIds( $nids) {
if ( ! count( $nids)) return null;
if ( is_array( $nids[ 0])) $nids = lshift( $nids);	// multiple paths, use the first one
$N = $this->getNode( ( int)$nids[ 0]); if ( ! $N) die( " Graph.ERROR: makePathByNodeIds() no node for id(" . $nids[ 0] . ")\n");
$P = new Path( $N); lshift( $nids);
while ( count( $nids)) {
$N = $P->destination; $nid = ( int)lshift( $nids);
$N2 = $this->getNode( $nid); if ( ! $N2) die( " Graph.ERROR: makePathByNodeIds() no node for id(" . $nids[ 0] . ")\n");
if ( ! $N->isLink( $N2)) return die( " Graph.ERROR makePathByNodeIds() : no link between nid(" . $N->id . ") and nid(" . $N2->id . ")\n");
$P->addHop( $N->getLink( $N2));
}
return $P;
}
public function purgeLink( $L) {
unset( $L->source->out[ $L->id]);
unset( $L->target->in[ $L->id]);
unset( $this->links[ $L->id]);
unset( $L);
}
public function purgeNode( $N) {
foreach ( $N->in as $L) $this->purgeLink( $L);
foreach ( $N->out as $L) $this->purgeLink( $L);
unset( $this->nodes[ $N->id]);
unset( $N);
}

}


// draw graph
// ngdrawgraph( CharLP | null, Graph, ChartSetupStyle, ChartSetupStyle(bg) | NULL, 0.2 (node size/ line width), (size -) spacer)
// warning: if S2 != null, will paint the background before each new foreground
function ngdrawgraph( $C2, $G, $S1, $S2 = null, $size, $spacer = 0, $shiftx = 0, $shifty = 0, $FS = 18) {
$C = null;
if ( ! $C2) {
list( $C, $CS) = chartsplitpage( 'L', $FS, '1', '1', '0,0', '0.1:0.1:0.1:0.1'); $C2 = $CS[ 0];
foreach ( $G->getNodes() as $N) $C2->train( array( $N->x()), array( $N->y()));
$C2->autoticks( null, null, 10, 10);
}
extract( $C2->info()); // xmin, xmax, ymin, ymax
$size = round( $size * mmax( array( $xmax - $xmin, $ymax - $ymin)));
// draw nodes as rectangles
foreach ( $G->getNodes() as $N) ngdrawnode( $C2, $N, $S1, $S2, $size, $spacer, $shiftx, $shifty);
// draw links as polygons -- complex algorithm for calculating where
foreach ( $G->getLinks() as $L) ngdrawlink( $C2, $L, $S1, $S2, $size, $spacer, $shiftx, $shifty);
return $C ? array( $C, $C2) : $C2;
}
function ngdrawnode( $C2, $N, $S1, $S2, $size, $spacer, $shiftx = 0, $shifty = 0) {
$x = $N->x(); $y = $N->y(); $w = round( 0.5 * $size, 1);
$xys = array();
lpush( $xys, ttl( "$x:-$w:$spacer:$shiftx,$y:-$w:$spacer:$shifty"));
lpush( $xys, ttl( "$x:-$w:$spacer:$shiftx,$y:$w:-$spacer:$shifty"));
lpush( $xys, ttl( "$x:$w:-$spacer:$shiftx,$y:$w:-$spacer:$shifty"));
lpush( $xys, ttl( "$x:$w:-$spacer:$shiftx,$y:-$w:$spacer:$shifty"));
if ( $S2) chartshape( $C2, $xys, $S2);	// erase if found
chartshape( $C2, $xys, $S1);
}
function ngdrawlink( $C2, $L, $S1, $S2, $size, $spacer, $shiftx = 0, $shifty = 0) {
$x1 = $L->source->x(); $y1 = $L->source->y();
$x2 = $L->target->x(); $y2 = $L->target->y();
$xys = array(); $w1 = round( 0.2 * $size, 1); $w2 = round( 0.55 * $size, 1);  $w3 = round( 0.3 * $size, 1);
if ( $x1 == $x2) { // vertical line
$ysmall = mmin( array( $y1, $y2)); $ybig = mmax(  array( $y1, $y2));
lpush( $xys, array( "$x1:-$w1:$spacer:$shiftx", "$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, array( "$x1:$w1:-$spacer:$shiftx", "$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, array( "$x1:$w1:-$spacer:$shiftx", "$ybig:-$w2:$spacer:$shifty"));
lpush( $xys, array( "$x1:-$w1:$spacer:$shiftx", "$ybig:-$w2:$spacer:$shifty"));
}
if ( $y1 == $y2) { // horizontal line
$xsmall = mmin( array( $x1, $x2)); $xbig = mmax( array( $x1, $x2));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$y1:-$w1:$spacer:$shifty"));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$y1:$w1:-$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$y2:$w1:-$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$y2:-$w1:$spacer:$shifty"));
}
if ( $x1 != $x2 && $y1 != $y2 && ( $x1 < $x2 && $y1 < $y2 || $x1 > $x2 && $y1 > $y2)) { // upslope
$xsmall = mmin( array( $x1, $x2)); $xbig = mmax( array( $x1, $x2));
$ysmall = mmin( array( $y1, $y2)); $ybig = mmax( array( $y1, $y2));
lpush( $xys, ttl( "$xsmall:$w2:-$w3:-$spacer:$shiftx,$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$ysmall:$w2:-$w3:$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx:$w3,$ybig:-$w2:$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$ybig:-$w2:$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$ybig:-$w2:$w3:$spacer:$shifty"));
}
if ( $x1 != $x2 && $y1 != $y2 && ( $x1 < $x2 && $y1 > $y2 || $x1 > $x2 && $y1 < $y2)) { // downslope
$xsmall = mmin( array( $x1, $x2)); $xbig = mmax( array( $x1, $x2));
$ysmall = mmin( array( $y1, $y2)); $ybig = mmax( array( $y1, $y2));
lpush( $xys, ttl( "$xsmall:$w2:-$w3:-$spacer:$shiftx,$ybig:-$w2:$spacer:$shifty"));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$ybig:-$w2:$spacer:$shifty"));
lpush( $xys, ttl( "$xsmall:$w2:-$spacer:$shiftx,$ybig:-$w2:$w3:-$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$w3:$spacer:$shiftx,$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$ysmall:$w2:-$spacer:$shifty"));
lpush( $xys, ttl( "$xbig:-$w2:$spacer:$shiftx,$ysmall:$w2:-$w3:-$spacer:$shifty"));
}
if ( count( $xys)) { if ( $S2) chartshape( $C2, $xys, $S2); chartshape( $C2, $xys, $S1); }
}

// graphviz functions
function graphvizwrite( $H, $path) { 	// H: [ { area, lineshort, linefull, stationshort, stationfull}, ...] -- list of station hashes
$h = array(); foreach ( $H as $h2) { extract( $h2); htouch( $h, $lineshort); lpush( $h[ $lineshort], $stationshort); }
$out = fopen( $path, 'w');
fwrite( $out, "graph G {\n");
foreach ( $h as $line => $stations) fwrite( $out, "   $line -- " . ltt( $stations, ' -- ') . "\n");
fwrite( $out, "}\n");
fclose( $out);
}
function graphviztext( $json, $size =  '11,8') { 	// depends on graphvizwrite() size in inches, default is an *.info file next to input *.dot
$L = ttl( $json, '.'); lpop( $L); lpush( $L, 'dot'); $out = ltt( $L, '.');
graphvizwrite( jsonload( $json), $out); $in = $out;
$L = ttl( $in, '/', '', false); $in = lpop( $L); $root = ltt( $L, '/');
$L = ttl( $in, '.'); lpop( $L); $out = ltt( $L, '.') . '.info';
$path = procfindlib( 'graphviz');
$CWD = getcwd(); chdir( $root);
$c = "$path/bin/neato -Gsize=$size -Tdot $in -o $out"; procpipe( $c);
if ( ! is_file( $out)) die( "ERROR! graphviztext() failed to run c[$c]\n");
chdir( $CWD);
return "$root/$out";
}
function graphvizpdf( $json, $legend = true, $specialine = null, $fontsize = 10, $size = '11,8') { 	// depends on graphvizwrite(), will create a PDF file with the same root
$in2 = graphviztext( $json, $size);	// create *.info file first
$L = ttl( $in2, '.'); lpop( $L); lpush( $L, 'pdf'); $out = ltt( $L, '.');
$colors = ttl( '#099,#900,#990,#059,#809,#8B2,#B52,#29E,#0A0,#C0C');
$raw = jsonload( $json); $link2line = array(); $line2stations = array();
foreach ( $raw as $h2) {
extract( $h2); 	// area, lineshort, linefull, stationshort, stationfull
htouch( $line2stations, $lineshort);
lpush( $line2stations[ $lineshort], $stationshort);
}
foreach ( $line2stations as $line => $stations) {
lunshift( $stations, $line);
for ( $i = 1; $i < count( $stations); $i++) $link2line[ $stations[ $i - 1] . ',' . $stations[ $i]] = $line;
}
$L = ttl( $json, '.'); lpop( $L); $root = ltt( $L, '.');
// try to draw the PDF by yourself
$lines = file( $in2); $line2color = array(); $station2colors = array(); $line2comment = array();
$stations = array(); $links = array();
foreach ( $lines as $line) {
$line = trim( $line); if ( ! $line) continue;
$bads = '];'; for ( $i = 0; $i < strlen( $bads); $i++) $line = str_replace( substr( $bads, $i, 1), '', $line);
$line = str_replace( '",', ':', $line); $line = str_replace( ', ', ':', $line);
$line = str_replace( ',', ' ', $line);
$line = str_replace( ':', ',', $line);
$line = str_replace( '"', '', $line);
$L = ttl( $line, '['); if ( count( $L) != 2) continue;
$head = lshift( $L); $tail = lshift( $L);
$h = tth( $tail); if ( ! isset( $h[ 'pos'])) continue;
if ( count( ttl( $head, '--')) == 1) {
$h = hm( $h, lth( ttl( $h[ 'pos'], ' '), ttl( 'x,y'))); $stations[ trim( $head)] = $h; continue;
}
extract( lth( ttl( $head, '--'), ttl( 'name1,name2')));
$h = hm( $h, lth( ttl( $h[ 'pos'], ' '), ttl( 'x1,y1,x2,y2,x3,y3,x4,y4')));
$k = "$name1,$name2";
$h[ 'line'] = $link2line[ $k];
$links[ $k] = $h;
}
foreach ( $raw as $h) { extract( $h); if ( ! isset( $line2color[ $lineshort])) $line2color[ $lineshort] = $lineshort == $specialine ? '#000' : ( count( $colors) ? lshift( $colors) : '#666'); $station2colors[ $lineshort] = array( $line2color[ $lineshort]); }
foreach ( $raw as $h) { extract( $h); htouch( $station2colors, $stationshort); lpush( $station2colors[ $stationshort], $line2color[ $lineshort]); }
foreach ( $raw as $h) { extract( $h); $line2comment[ $lineshort] = $linefull . ' (' . $area . ') ' . $linecomment; }
$bottom = 0.05; if ( $legend) $bottom += round( ( count( $line2color) * $fontsize) / 200, 2);
$P = plotinit(); plotpage( $P);
$xs = array(); $ys = array(); foreach ( $stations as $k => $v) { extract( $v); lpush( $xs, $x); lpush( $ys, $y); }
plotscale( $P, $xs, $ys, "0.05:0.05:$bottom:0.05");
$yoff = '-5'; if ( $legend) plotline( $P, mmin( $xs), "0:$yoff", mmax( $xs), "0:$yoff", 0.2, '#000', 1.0); $yoff .= ":-$fontsize"; $used = array();
foreach ( $links as $k => $v) {
extract( $v); 	// x1..4, y1..4
plotcurve( $P, $x1, $y1, $x2, $y2, $x3, $y3, $x4, $y4, 'D', $line == $specialine ? 1 : 0.5, $line2color[ $line], null, 1.0);
}
foreach ( $stations as $k => $v) {
extract( $v); 	// width, height, x, y
extract( plotstringdim( $P, $k, $fontsize)); // w, h
$colors = $station2colors[ $k]; $add = 0.07 * count( $colors);
foreach ( $colors as $color) {
$h2 = hvak( $line2color, true); $line = $h2[ $color];
$color2 = ( $line == $specialine) ? '#fff' : ( isset( $line2color[ $k]) ? '#fff' : '#000');
$color3 = isset( $line2color[ $k]) ? $color : ( $specialine == $line ? '#000' : '#fff');
plotellipse( $P, $x, $y, ( 0.8 + $add) * $w, ( 0.7 + $add) * $h, 0, 0, 360, 'DF', 0.5, $color, $color3);
plotstringmc( $P, $x, $y, $k, $fontsize, $color2, 1.0);
$add -= 0.07;
// draw line legend if needed
if ( isset( $used[ $line]) || ! $legend) continue;
// draw legend
plotellipse( $P, 0.5 * $w, "0:$yoff", 0.8 * $w, 0.7 * $h, 0, 0, 360, 'DF', 0.5, $color, $color);
plotstringmc( $P, 0.5 * $w, "0:$yoff", $line, $fontsize, '#fff', 1.0);
plotstringml( $P, ( 0.5 * $w) . ":$w", "0:$yoff", $line2comment[ $line], $fontsize, '#000', 1.0);
$used[ $line] = true; $yoff .= ":-$em:-2";
}

}
plotdump( $P, $out);
return $out;
}


// parser for various topology types
function ngparsegml( $file) {	// returns ( 'nodes' => ( id => ( name,x,y), 'links' => ( id => ( source,target,bandwidth,metric)))
$nodes = array();
$links = array();
$in = fopen( $file, 'r');
$entry = NULL; $mode = '';
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in));
if ( strpos( $line, 'node') === 0) {	// new node
if ( $entry) array_push( $nodes, $entry);
$entry = array(); $mode = 'node';
}
if ( strpos( $line, 'edge') === 0) { 	// new edge
if ( $entry) {
if ( $mode == 'node') array_push( $nodes, $entry);
else array_push( $links, $entry);
$mode = 'link';
}
$entry = array();
}
if ( is_array( $entry)) array_push( $entry, $line);
}
array_push( $links, $entry);
fclose( $in);

// turn arrays to hashes
$hnodes = array(); $hlinks = array();
foreach ( $nodes as $node) {
$hnode = array();
foreach ( $node as $line) {
$split = explode( ' ', $line);
$hnode[ array_shift( $split)] = implode( ' ', $split);
}
array_push( $hnodes, $hnode);
}
foreach ( $links as $link) {
$hlink = array();
foreach ( $link as $line) {
$split = explode( ' ', $line);
$hlink[ array_shift( $split)] = implode( ' ', $split);
}
array_push( $hlinks, $hlink);
}

// go over the list
$topo = array( 'nodes' => array(), 'links' => array());
foreach ( $hnodes as $node) {
$id = ( int)$node[ 'id'];
$entry = array(
'name' => str_replace( '"', '', $node[ 'name']),
'x' => ( double)$node[ 'x'],
'y' => ( double)$node[ 'y']
);
$topo[ 'nodes'][ $id] = $entry;
}
foreach ( $hlinks as $link) {
$b = trim( $link[ 'bandwidth']);
if ( strpos( $b, 'G')) $b = 1000000000.0 * ( int)$b;
if ( strpos( $b, 'M')) $b = 1000000.0 * ( int)$b;
array_push( $topo[ 'links'], array(
'source' => ( int)$link[ 'source'],
'target' => ( int)$link[ 'target'],
'bandwidth' => $b,
'weight' => ( double)$link[ 'weight']
));

}
return $topo;
}
// parses list of hashes into Topology object (relies on ngparsegml()
function ngmakegraph( $h) {	// h can come from ngparsegml
$G = new Graph(); $IDGEN = new IDGen();
foreach ( $h[ 'nodes'] as $id => $nh) {
$N = new Node( $id);
$N->place( new Location( $nh[ 'x'], $nh[ 'y']));
$G->addNode( $N);
}
foreach ( $h[ 'links'] as $id => $eh) {
$L = new Link( $IDGEN, $eh[ 'bandwidth'], $eh[ 'weight'], 0);
$L->source = $G->nodes[ ( int)$eh[ 'source']];
$L->target = $G->nodes[ ( int)$eh[ 'target']];
$G->links[ $L->id] = $L;
$L->source->addOut( $L); $L->target->addIn( $L);
}
return $G;
}
/** writes GML format to a file
Rules:
graph should be directed by default, one should avoid having undirected graphs
(if you need one, use script to create undirected GML by creating additional links for reverse directions)
node id attribute of nodes is sequential
node name attribute is in format: $node->name $node->id so that to keep the actual id arround)

in graphics section of node, only x and y will be created,
(* if coordinates have >2 dimensions, something else should be figured out)
all nodes should have Location objects with coordinates set in at least 2 dimensions
(if not, you can use ngrandomlocations() to add random locations to your nodes)

*/
function ngsavegml( $G, $file, $directed = true) {
$out = fopen( $file, 'w');
fwrite( $out, "graph [\n");	// open graph
fwrite( $out, "\t" . "directed " . ( $directed ? '1' : '0') . "\n");
$nids = array(); 	// node id => sequence id
foreach ( $G->nodes as $id => $N) {
fwrite( $out, "\t" . "node [\n");	// open node
fwrite( $out ,"\t\t" . "id " . $id . "\n");
fwrite( $out, "\t\t" . 'name "Node' . $id . '"' . "\n");
fwrite( $out, "\t\t" . "graphics [\n");	// open graphics
fwrite( $out, "\t\t\t" . "center [\n"); 			// open center
fwrite( $out, "\t\t\t\t" . "x " . $N->location->coordinates[ 0] . "\n");
fwrite( $out, "\t\t\t\t" . "y " . $N->location->coordinates[ 1] . "\n");
fwrite( $out, "\t\t\t" . "]\n");					// close center
fwrite( $out, "\t\t" . "]\n");	// close graphics
fwrite( $out, "\t" . "]\n");	 // close node
$nids[ $id] = $N;
}
foreach ( $G->links as $id => $L) {
fwrite( $out, "\t" . "edge [\n");	// open edge
fwrite( $out, "\t\t" . "simplex 1\n");
fwrite( $out, "\t\t" . "source " . $L->source->id . "\n");
fwrite( $out, "\t\t" . "target " . $L->target->id . "\n");
fwrite( $out, "\t\t" . "bandwidth " . $L->bandwidth . "\n");
fwrite( $out, "\t\t" . "weight " . $L->cost . "\n");
fwrite( $out, "\t" . "]\n"); 			// close edge
}
fwrite( $out, "]\n");	// close graph
fclose( $out);
}


// larger functions, like end-to-end paths, all require R.igraph installed
/** takes full path to GML file, node id 1,2, returns list of paths (=node id lists)
* 		returns list of array( source,node1,node2...,dest) of node ids
* 		in most cases, there is only one array in the list = one shortest path exists between nodes
*		WARNING: list can also be empty = there is no path between nodes
*/
function ngRspGML( $gml, $n1, $n2, $cleanup = true) { // if cleanup=false, set path to Rscript file
if ( ! is_numeric( $n1)) $n1 = $n1->id;
if ( ! is_numeric( $n2)) $n2 = $n2->id;
$s = "library( igraph)\n";
$s .= 'g <- read.graph( "' . $gml . '", "gml")' . "\n";
$s .= 'get.shortest.paths( g, ' . $n1 . ', ' . $n2 . ', "out")' . "\n";
$lines = Rscript( $s, null, false, $cleanup);
$list = array();
while ( count( $lines)) {
$line = trim( lshift( $lines)); if ( ! $line) continue;
if ( strpos( $line, '[[') !== 0) die( " ERROR Strange line($line)\n");
$vs = Rreadlist( $lines);	// messes with lines (by reference)
$source = ( int)lfirst( $vs);
$dest = ( int)llast( $vs);
if ( $source != $n1 || $dest != $n2) die( " ngRspGML() ERROR: bad e2e path, source($source) and dest($dest) are not ($nid1) and ($nid2)\n");	// start and end are not my nodes
lpush( $list, $vs);
}
return $list;
}
function ngRsp( $T, $n1, $n2, $directed = true, $cleanup = true, $gml = null) {	// writes temp.gml in current dir and calls ngRspGML()
$nid2id = hvak( hk( $T->getNodes()), true);
$id2nid = hk( $T->getNodes());
if ( ! $gml) { ngsavegml( $T, 'temp.gml', $directed); $gml = 'temp.gml'; }	// directed by default
$nids = ngRspGML( $gml, $nid2id[ $n1], $nid2id[ $n2], $cleanup);
if ( ! $nids || ! count( $nids)) return null;
if ( is_array( $nids[ 0])) $nids = lshift( $nids);
for ( $i = 0; $i < count( $nids); $i++) $nids[ $i] = $id2nid[ $nids[ $i]];
if ( $cleanup) `rm -Rf temp.gml`;
return $nids;
}



?><?php
// helps to work with arrays and hashes filled with objects
class OHash {	// object hash, also works with arrays
public $object;
private $keys;
private $hash;
function __construct( &$hash) {
$this->keys = array();
if ( ! $hash || ! is_array( $hash)) return;
$this->hash =& $hash;
$this->keys = array_keys( $hash);
unset( $this->object);
if ( ! $this->end()) $this->object =& $hash[ $this->keys[ 0]];
}
function end() { return count( $this->keys) ? false : true; }
function key() { return $this->keys[ 0]; }
function &object() { return $this->hash[ $this->keys[ 0]]; }
function next() {
array_shift( $this->keys);
unset( $this->object);
if ( count( $this->keys)) $this->object =& $this->hash[ $this->keys[ 0]];
}

}

?><?php
// chart objects/functions, depends on plot.php
class ChartSetupStyle { // style, lw, draw, fill, alpha
public $style = 'D';
public $lw = 0.01;
public $draw = '#000';
public $fill = null;
public $alpha = 1.0;
function __construct( $style = 'D', $lw = 0.1, $draw = '#000', $fill = '#000', $alpha = 1.0) {
$this->style = $style;
$this->lw = $lw;
$this->draw = $draw;
$this->fill = $fill;
$this->alpha = $alpha;
}

}
class ChartSetupFrame {
public $fontsize = 14;
public $xticks = NULL;	// string(start,end,step)|string( one,two,three,four,...)|array(), requires training
public $yticks = NULL;	// string|array(), same as above, requires training
public $margins = array( 0.1, 0.1, 0.1, 0.1); // top,right,bottom,left
public $boxstyle;	// all are ChartSetupStyle objects
public $linestyle;
public $textstyle;
function __construct() {
$this->boxstyle = new ChartSetupStyle();
$this->linestyle = new ChartSetupStyle();
$this->textstyle = new ChartSetupStyle();
}

}
class ChartSetup {	// orientation, fontsize    -- setup for all chart objects
public $author = 'no author';
public $orientation = 'L';
public $size = 'A4';
public $title = 'no title';
public $margins = array( 0.1, 0.1, 0.1, 0.1); // top,right,bottom,left
public $round = NULL;
public $frame;	// ChartSetupFrame
public $style;	// ChartSetupStyle for data
function __construct( $orientation = 'L', $FS = 20) {
$this->orientation = $orientation === null ? 'L' : $orientation;
// frame
$this->frame = new ChartSetupFrame();
$this->frame->yticks = '';
$this->frame->xticks = '';
$this->frame->fontsize = $FS === null ? 20 : $FS;
// default style
$this->style = new ChartSetupStyle();
}

}
// chart legends
class ChartLegend {	// top right corner, vertical
public $chart;
public $top;
public $right;
public $fontsize; // will use $C->setup->frame->fontsize
private $maxw = 0;	// max width of text in legends
private $linegap = 0;
private $items = array(); // hashlist( bullet,size,lw,text)
function __construct( $c, $top = 3, $right = 3, $linegap = 2) {
$this->chart = $c;
$this->top = $top; $this->right = $right;
$this->fontsize = $c->setup->frame->fontsize;
$this->linegap = $linegap;
}
public function add( $bullet, $size, $lw, $text, $S = null) {
$w = htv( plotstringdim( $this->chart->plot, $text, $this->fontsize, true), 'w');
if ( $w > $this->maxw) $this->maxw = $w;
$H = tth( "bullet=$bullet,size=$size,lw=$lw,text=$text");
$H[ 'S'] = $S ? $S : new ChartSetupStyle();
ladd( $this->items, $H);
}
public function draw( $nobullets = false) {
$x = $this->chart->plot[ 'xmax'] . ':-' . $this->maxw . ':-' . $this->right;
$y = $this->chart->plot[ 'ymax'] . ':-' . $this->top;
foreach ( $this->items as $item) {
unset( $color); unset( $alpha);
extract( $item);	// bullet,size,lw,text,S (style)
extract( plotstringtl( $this->chart->plot, $x, $y, $text, $this->fontsize, $S->draw, $S->alpha));	// w,h
$h2 = 0.5 * $h;
if ( ! $nobullets) plotbullet( $this->chart->plot, $bullet, "$x:-$size:-2", "$y:-$h2", $size, $lw, $S->draw, $S->fill, $S->alpha);
if ( $lw < $h) $y .= ":-$h:-" . $this->linegap;
else $y .= ":-$lw:-" . $this->linegap;
}

}

}
class ChartLegendBR {	// bottom right corner, vertical
public $chart;
public $bottom;
public $right;
public $fontsize; // will use $C->setup->frame->fontsize
public $linestyle;
public $textstyle;
private $maxw = 0;	// max width of text in legends
private $items = array(); // hashlist( bullet,size,lw,text)
private $linegap;
function __construct( $c, $bottom = 3, $right = 3, $linegap = 2) {
$this->chart = $c;
$this->bottom = $bottom; $this->right = $right;
$this->fontsize = $c->setup->frame->fontsize;
$this->linegap = $linegap;
}
public function add( $bullet, $size, $lw, $text, $S = null) {
$w = htv( plotstringdim( $this->chart->plot, $text, $this->fontsize, true), 'w');
if ( $w > $this->maxw) $this->maxw = $w;
$H = tth( "bullet=$bullet,size=$size,lw=$lw,text=$text");
$H[ 'S'] = $S ? $S : new ChartSetupStyle();
ladd( $this->items, $H);
}
public function draw( $nobullets = false) {
$x = $this->chart->plot[ 'xmax'] . ':-' . $this->maxw . ':-' . $this->right;
$y = $this->chart->plot[ 'ymin'] . ':' . $this->bottom;
foreach ( $this->items as $item) {
unset( $color); unset( $alpha);
extract( $item);	// bullet,size,lw,text,S
plotstring( $this->chart->plot, $x, $y, $text, $this->fontsize, $S->draw, $S->alpha);
extract( plotstringdim( $this->chart->plot, $text, $this->fontsize));
$h2 = 0.5 * $h;
if ( ! $nobullets) plotbullet( $this->chart->plot, $bullet, "$x:-$size:-2", "$y:$h2", $size, $lw, $S->draw, $S->fill, $S->alpha);
if ( $lw < $h) $y .= ":$h:" . $this->linegap;
else $y .= ":$lw:" . $this->linegap;
}

}

}
class ChartLegendTL {	// top left corner, vertical
public $chart;
public $top;
public $left;
public $fontsize; // will use $C->setup->frame->fontsize
public $linestyle;
public $textstyle;
private $maxw = 0;	// max width of text in legends
private $items = array(); // hashlist( bullet,size,lw,text)
private $linegap;
function __construct( $c, $top = 3, $left = 3, $linegap = 2) {
$this->chart = $c;
$this->top = $top; $this->left = $left;
$this->fontsize = $c->setup->frame->fontsize;
$this->linegap = $linegap;
}
public function add( $bullet, $size, $lw, $text, $S = null) {
$w = htv( plotstringdim( $this->chart->plot, $text, $this->fontsize, true), 'w');
if ( $w > $this->maxw) $this->maxw = $w;
$H = tth( "bullet=$bullet,size=$size,lw=$lw,text=$text");
$H[ 'S'] = $S ? $S : new ChartSetupStyle();
lpush( $this->items, $H);
}
public function draw( $nobullets = false) {
$x = $this->chart->plot[ 'xmin'] . ':' . $this->left;
$y = $this->chart->plot[ 'ymax'] . ':-' . $this->top;
foreach ( $this->items as $item) {
unset( $color); unset( $alpha);
extract( $item);	// bullet,size,lw,text,S
extract( plotstringtl( $this->chart->plot, $x, $y, $text, $this->fontsize, $S->draw, $S->alpha));	// w,h
$h2 = 0.5 * $h;
if ( ! $nobullets) plotbullet( $this->chart->plot, $bullet, "$x:-$size:-2", "$y:-$h2", $size, $lw, $S->draw, $S->fill, $S->alpha);
if ( $lw < $h) $y .= ":-$h:-" . $this->linegap;
else $y .= ":-$lw:-" . $this->linegap;
}

}

}
class ChartLegendO {	// top right corner, vertical, outside of the frame, to the right of the frame
public $chart;
public $top;
public $left;
public $fontsize; // will use $C->setup->frame->fontsize
public $linestyle;
public $textstyle;
private $maxw = 0;	// max width of text in legends
private $items = array(); // hashlist( bullet,size,lw,text)
private $linegap;
function __construct( $c, $top = 3, $left = 15, $linegap = 2) {
$this->chart = $c;
$this->top = $top; $this->left = $left;
$this->fontsize = $c->setup->frame->fontsize;
$this->linegap = $linegap;
}
public function add( $bullet, $size, $lw, $text, $S = null) {
$w = htv( plotstringdim( $this->chart->plot, $text, $this->fontsize, true), 'w');
if ( $w > $this->maxw) $this->maxw = $w;
$H = tth( "bullet=$bullet,size=$size,lw=$lw,text=$text");
$H[ 'S'] = $S ? $S : new ChartSetupStyle();
ladd( $this->items, $H);
}
public function draw( $nobullets = false) {
$x = $this->chart->plot[ 'xmax'] . ':' . $this->left;
$y = $this->chart->plot[ 'ymax'] . ':-' . $this->top;
foreach ( $this->items as $item) {
unset( $color); unset( $alpha);
extract( $item);	// bullet,size,lw,text,S
extract( plotstringtl( $this->chart->plot, $x, $y, $text, $this->fontsize, $S->draw, $S->alpha));	// w,h
$h2 = 0.5 * $h;
if ( ! $nobullets) plotbullet( $this->chart->plot, $bullet, "$x:-$size:-2", "$y:-$h2", $size, $lw, $S->draw, $S->fill, $S->alpha);
if ( $lw < $h) $y .= ":-$h:-" . $this->linegap;
else $y .= ":-$lw:-" . $this->linegap;
}

}

}
class ChartLegendOR {	// from top right corner upwards on the outside
public $chart;
public $bottom;
public $right;
public $fontsize; // will use $C->setup->frame->fontsize
public $linestyle;
public $textstyle;
private $maxw = 0;	// max width of text in legends
private $items = array(); // hashlist( bullet,size,lw,text)
private $linegap;
function __construct( $c, $bottom = 3, $right = 3, $linegap = 2) {
$this->chart = $c;
$this->bottom = $bottom; $this->right = $right;
$this->fontsize = $c->setup->frame->fontsize;
$this->linegap = $linegap;
}
public function add( $bullet, $size, $lw, $text, $S = null) {
$w = htv( plotstringdim( $this->chart->plot, $text, $this->fontsize, true), 'w');
if ( $w > $this->maxw) $this->maxw = $w;
$H = tth( "bullet=$bullet,size=$size,lw=$lw,text=$text");
$H[ 'S'] = $S ? $S : new ChartSetupStyle();
ladd( $this->items, $H);
}
public function draw( $nobullets = false) {
$x = $this->chart->plot[ 'xmax'] . ':-' . $this->maxw . ':-' . $this->right;
$y = $this->chart->plot[ 'ymax'] . ':' . $this->bottom;
foreach ( $this->items as $item) {
unset( $color); unset( $alpha);
extract( $item);	// bullet,size,lw,text,S
plotstring( $this->chart->plot, $x, $y, $text, $this->fontsize, $S->draw, $S->alpha);
extract( plotstringdim( $this->chart->plot, $text, $this->fontsize));
$h2 = 0.5 * $h;
if ( ! $nobullets) plotbullet( $this->chart->plot, $bullet, "$x:-$size:-2", "$y:$h2", $size, $lw, $S->draw, $S->fill, $S->alpha);
if ( $lw < $h) $y .= ":$h:" . $this->linegap;
else $y .= ":$lw:" . $this->linegap;
}

}

}
// chart names
class ChartName {	// bottom center
public $chart;
function __construct( $c) { $this->chart = $c; }
public function add( $name) {
$w = $this->chart->plot[ 'width'];
$w2 = round( 0.5 * $w);
$y = $this->chart->ymin . ':-5';
extract( plotstringtc( $this->chart->plot, $this->chart->plot[ 'xmin'] . ":$w2", $y, $name));
$this->chart->ymin .= ":-$h";
}

}
// chart models
class ChartFactory { public function make( $C, $margins) { return null; }}	// extend to use page splitter
class ChartLP {	// plain linear chart, bottom X and left Y scales
public $setup;	// ChartSetup object
public $plot;
public $pdf;
private $xticks = array();
private $yticks = array();
private $roundup = 2;
// for decorations: min and max coordinates, affected by frame
public $xmin = null;
public $xmax = null;
public $ymin = null;
public $ymax = null;
// will remember margindef at each training
public $margindef = null;
// make PDF and new page
function __construct( $setup = NULL, $plot = NULL, $margins = null) {
if ( ! $setup) $this->setup = new ChartSetup( $setup);
else $this->setup = $setup;	// ready made setup object
if ( $margins) $this->setup->margins = $margins;
$this->plot = plotinit( $this->setup->title, $this->setup->author, $this->setup->orientation, $this->setup->size, $plot);
if ( ! $plot) plotpage( $this->plot, $this->setup->margins);
else plotpage( $this->plot, $this->setup->margins, true);
$this->pdf = $this->plot[ 'pdf'];
}
// user interface
public function info( $baseonly = false) { // returns { xmin, xmax, ymin, ymax, FS}, when baseonly=true, will shed all added coordinate hacks and will only use the base value ( lshift( ttl( ':')))
$ymin = $this->ymin; $xmin = $this->xmin; $ymax = $this->ymax; $xmax = $this->xmax; $FS = $this->setup->frame;
$h = array(); foreach ( ttl( 'xmin,xmax,ymin,ymax,FS') as $k) $h[ $k] = $$k === null ? $this->plot[ $k] : $$k;
if ( $baseonly) foreach ( ttl( 'xmin,ymin,xmax,ymax') as $k) if ( $$k && count( ttl( $$k, ':')) > 1) $h[ $k] = lshift( ttl( $$k, ':'));
return $h;
}
// allows xs,ys to be in format: min,max,step (ignores step)
public function train( $xs, $ys, $margindef = '0.05:0.05:0.05:0.05') {
if ( is_string( $xs)) { $xs = ttl( $xs); if ( count( $xs) == 3) lpop( $xs); }
if ( is_string( $ys)) { $ys = ttl( $ys); if ( count( $ys) == 3) lpop( $ys); }
if ( $this->setup->round) { 	// round all numbers
for ( $i = 0; $i < count( $xs); $i++) $xs[ $i] = round( $xs[ $i], $this->setup->round);
for ( $i = 0; $i < count( $ys); $i++) $ys[ $i] = round( $ys[ $i], $this->setup->round);
}
plotscale( $this->plot, $xs, $ys, $margindef ? $margindef : $this->setup->frame->margins);
$this->margindef = $margindef;
}
// add should be hashstring with xmin,xmax,ymin,ymax, will overwrite whatever automatic decisions are made
// if xroundstep and yroundstep are NULL, will try to calculate them automatically, based on counts (counts should be set!)
public function autoticks( $xroundstep = NULL, $yroundstep = NULL, $xcount = 10, $ycount = 10, $add = null) { // will create ticks automatically and change content of FS
$FS = $this->setup->frame;
foreach ( ttl( 'x,y') as $k) {
unset( $v); $k2 = $k . 'roundstep'; $v =& $$k2; if ( $v !== null) continue;	// set by user,   DO NOT REASSIGN $V
$h = array(); $h[ $k . 'min'] = $this->plot[ $k .'min']; $h[ $k . 'max'] = $this->plot[ $k .'max'];
if ( $add) foreach( tth( $add) as $k2 => $v2) $h[ $k2] = $v2;	// ?min,?max, forced if $add is set
$min = $h[ $k . 'min']; $max = $h[ $k . 'max']; $diff = $max - $min; $k2 = $k . 'count'; $step = $diff / $$k2;
//echo "k[$k]   min[$min] max[$max] diff[$diff] step[$step]\n";
$goodround = null; $thre = 1 + round( 0.5 * $$k2); // allow number of ticks to drop to 50% + 1 of the value in the argument, but not lower -- round ticks is a priority
for ( $round = 6; $round >= -6; $round -= 0.5) {	// try to round the step as best as you can
$step2 = mhalfround( $step, $round); if ( $step2 == 0) continue;
if ( $diff / $step2 < $thre) { $goodround = $round + 1; break; }
$goodround = $round;
}
if ( $goodround !== null) $v = mhalfround( $step, $goodround); else $v = $step;
}
unset( $k); unset( $v);
//echo " xroundstep[$xroundstep] yroundstep[$yroundstep]\n";
$xmin = $xroundstep * (  ( int)( $this->plot[ 'xmin'] / $xroundstep));
$xmax = $xroundstep * (  ( int)( $this->plot[ 'xmax'] / $xroundstep));
$ymin = $yroundstep * (  ( int)( $this->plot[ 'ymin'] / $yroundstep));
$ymax = $yroundstep * (  ( int)( $this->plot[ 'ymax'] / $yroundstep));
if ( $add) foreach( tth( $add) as $k => $v) $$k = $v;	// overwrite some keys, if those are set in $add
//echo " xmin[$xmin] xmax[$xmax] ymin[$ymin] ymax[$ymax]"; die( '');
plotscale( $this->plot, ttl( "$xmin,$xmax"), ttl( "$ymin,$ymax"), $this->margindef);
$xstep = ( $xmax - $xmin) / $xcount;
$xstep = $xroundstep * (  1 + ( int)( $xstep / $xroundstep)); if ( $xstep < $xroundstep) $xstep = $xroundstep;
$ystep = ( $ymax - $ymin) / $ycount;
$ystep = $yroundstep * (  1 + ( int)( $ystep / $yroundstep)); if ( $ystep < $yroundstep) $ystep = $yroundstep;
$FS->xticks = "$xmin,$xmax,$xstep";
$FS->yticks = "$ymin,$ymax,$ystep";
$this->xticks = $FS->xticks;
$this->yticks = $FS->yticks;
//echo "xticks[" . $FS->xticks . "]  yticks[" . $FS->yticks . "]\n";
}
public function forget() {	// forget training
$L = ttl( 'xmin,xmax,ymin,ymax');
foreach ( $L as $k) unset( $this->plot[ $k]);
}
public function dump( $path) { plotdump( $this->plot, $path); }
// frame and related drawing procedures
public function frame( $xname, $yname, $framesetup = null, $noaxes = false) {
if ( $framesetup) $this->setup->frame = $framesetup;
$FS = $this->setup->frame;
// first, draw the frame
$L = ttl( 'xmin,xmax,ymin,ymax');
foreach ( $L as $k) $$k = $this->plot[ $k];
plotrect( $this->plot, $xmin, $ymax, plotscalexdiff( $this->plot, $xmin, $xmax), plotscaleydiff( $this->plot, $ymin, $ymax), $FS->boxstyle->style, $FS->boxstyle->lw, $FS->boxstyle->draw, $FS->boxstyle->fill, $FS->boxstyle->alpha);
$this->xmin = $xmin; $this->xmax = $xmax; $this->ymin = $ymin; $this->ymax = $ymax;
if ( $noaxes) return;	// do not continue past this point
$maxh = 0; $h = 0; $ticks =& $this->xticks;
if ( $xname && is_array( $xname)) { 	// categorical axis, calculate ticks
$ticks = array(); foreach ( $xname as $k => $v) $ticks[ "$v"] = round( $k, $this->roundup);
}
else if ( $xname) {	// numeric scale, numeric ticks
if ( is_string( $ticks) && count( ttl( $ticks)) == 3) { // string( min, max, step) style
extract( lth( ttl( $ticks), ttl( 'min,max,step')));
$ticks = array();
for ( $v = $min; $v <= $max; $v += $step) $ticks[ "$v"] = round( $v, $this->roundup);
}
else if ( is_string( $ticks)) {   // string( one, two, three, four) style
$L = ttl( $ticks);
$ticks = array();
foreach ( $L as $v) $ticks[ "$v"] = round( $v, $this->roundup);
}

}
if ( $xname) { // draw x scale
if ( ! $noaxes) plotline( $this->plot, $xmin, "$ymin:-2", $xmax, "$ymin:-2", $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
$xhs = array(); foreach ( $ticks as $k => $v) lpush( $xhs, $this->xtick( $k, $v));
$maxh = mmax( $xhs); //$this->ymin .= ":-7:-$maxh";
if ( ! is_array( $xname)) $this->xname( $xname, "-7:-$maxh"); // not categorical, so, show the name
}
if ( $yname) { // draw y scale
// y scale
$yticks = $this->yticks;
//echo " yticks: " . json_encode( $yticks) . "\n";
if ( is_string( $yticks) && count( ttl( $yticks)) == 3) { // string( min, max, step) style
extract( lth( ttl( $yticks), 'def'));
$yticks = array();
for ( $v = $def0; $v <= $def1; $v += $def2) ladd( $yticks, round( $v, $this->roundup));
}
else if ( is_string( $yticks)) { // string( one, two, three, four...) style
$L = ttl( $yticks);
$yticks = array();
foreach ( $L as $v) ladd( $yticks, round( $v, $this->roundup));
}
plotline( $this->plot, "$xmin:-2", $ymin, "$xmin:-2", $ymax, $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
$yws = array(); foreach ( $yticks as $y) lpush( $yws, $this->ytick( "$y", $y));
$maxw = mmax( $yws); $this->xmin .= ":-7:-$maxw:-4";
$this->yname( $yname);
}

}
public function xtickline() {
extract( $this->info( true));	// xmin, ymin, xmax, ymax, FS
//echo " xmin=$xmin,xmax=$xmax,ymin=$ymin,ymax=$ymax\n";
plotline( $this->plot, $xmin, "$ymin:-2", $xmax, "$ymin:-2", $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
}
public function ytickline() {
extract( $this->info()); // xmin, ymin, xmax, ymax
plotline( $this->plot, "$xmin:-2", $ymin, "$xmin:-2", $ymax, $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
}
// when drawing ticks and axis names manually, do not forget that xmin and ymin could be updated to new values if frame() (and some other) functions were called before
public function xtick( $show, $x) { // returns height of current string
extract( $this->info( true)); // xmin, ymin, xmax, ymax
plotline( $this->plot, $x, "$ymin:-2", $x, "$ymin:-5", $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
return htv( plotstringtc( $this->plot, $x, "$ymin:-7", "$show", $FS->fontsize, $FS->textstyle->draw, $FS->textstyle->alpha), 'h');
}
public function xtickv( $v, $x) { // returns height of current string -- vertical view
extract( $this->info( true)); // xmin, xmax, ymin, ymax, FS
plotline( $this->plot, $x, "$ymin:-2", $x, "$ymin:-5", $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
extract( plotstringdim( $this->plot, "$v", $this->setup->frame->fontsize)); // w, h
$w2 = 0.5 * $w; $h2 = 0.5 * $h;
return htv( plotvstring( $this->plot, "$x:-$h2", "$ymin:-7", "$x:-$h2", "$ymin:-7", $v, $FS->fontsize, $FS->textstyle->draw, -90, $FS->textstyle->alpha), 'w');
}
public function ytick( $v, $y) { // returns width of the current string
extract( $this->info());	// xmin, xmax, ymin, ymax, FS
plotline( $this->plot, "$xmin:-2", $y, "$xmin:-5", $y, $FS->linestyle->lw, $FS->linestyle->draw, $FS->linestyle->alpha);
return htv( plotstringmr( $this->plot, "$xmin:-7", $y, $v, $FS->fontsize, $FS->textstyle->draw, $FS->textstyle->alpha), 'w');
}
public function xname( $v, $ymin2 = null) {	// returns the height for the string
extract( $this->info()); 	// xmin, ymin, xmax, ymax, FS
if ( $ymin2 !== null) { extract( $this->info( true)); $ymin .= ":$ymin2"; }
$w = $this->plot[ 'width']; $w2 = 0.5 * $w;
return htv( plotstringtc( $this->plot, "$xmin:$w2", "$ymin:-3", $v, $FS->fontsize, $FS->textstyle->draw, $FS->textstyle->alpha), 'h');
}
public function yname( $v, $xmin2 = null) {	// returns the height for the string
extract( $this->info()); // xmin, xmax, ymin, ymax, FS
if ( $xmin2 !== null) { extract( $this->info( true)); $xmin .= $xmin2; }
$h = $this->plot[ 'height']; $h2 = 0.5 * $h;
return htv( plotvstringmmr( $this->plot, $xmin, "$ymin:$h2", $v, $FS->fontsize, $FS->textstyle->draw, 90, $FS->textstyle->alpha), 'w');
}

}
class ChartCobweb {  // cobweb chart
// open to the outside
public $setup;	// ChartSetup object
public $plot;
public $pdf;
public $roundup = 2;
// private setup
private $ticks = array();		// [ { tick.k: tick.v,...}, ...]  for each dimension
private $bounds = array();	// [ { min, max}, ...]  for each dimension
private $angles = array(); // [ angle, angle, ...]
private $tags = array();
// will remember margindef at each training
public $margindef = null;
// make PDF and new page
function __construct( $setup = NULL, $plot = NULL, $margins = null) {
if ( ! $setup) $this->setup = new ChartSetup( $setup);
else $this->setup = $setup;	// ready made setup object
if ( $margins) $this->setup->margins = $margins;
$this->plot = plotinit( $this->setup->title, $this->setup->author, $this->setup->orientation, $this->setup->size, $plot);
if ( ! $plot) plotpage( $this->plot, $this->setup->margins);
else plotpage( $this->plot, $this->setup->margins, true);
$this->pdf = $this->plot[ 'pdf'];
}
public function info() {
$h = array(); foreach ( ttl( 'FS') as $k) $h[ $k] = $this->plot[ $k];
return $h;
}
public function train( $vs, $margindef = 0.1) { // vs: multidimensional data samples
$bounds =& $this->bounds;
for ( $d = 0; $d < count( $vs); $d++) { // find min, max for each dimension
$vs2 = $vs[ $d];
if ( isset( $bounds[ $d])) { extract( $bounds[ $d]); lpush( $vs2, $min); lpush( $vs2, $max); }
extract( mstats( $vs2));
$h = compact( ttl( 'min,max'));
foreach ( $h as $k => $v) $h[ $k] = round( $v, $this->roundup);
$bounds[ $d] = $h;
}
plotscale( $this->plot, ttl( '-1,0,1'), ttl( '-1,0,1'), $margindef);
$this->margindef = $margindef;
}
// add should be hashstring with xmin,xmax,ymin,ymax, will overwrite whatever automatic decisions are made
// if xroundstep and yroundstep are NULL, will try to calculate them automatically, based on counts (counts should be set!)
public function autoticks( $count, $constraints = null) { // constraints: { min, max}
$FS = $this->setup->frame; $bounds =& $this->bounds;
$this->ticks = array(); $ticks =& $this->ticks;
for ( $d = 0; $d < count( $this->bounds); $d++) {
$h = $bounds[ $d];
if ( $constraints) foreach( tth( $constraints) as $k2 => $v2) $h[ $k2] = $v2;	// forced if $constraints is set
extract( $bounds[ $d]); $step = ( $max - $min) / $count;
//$min = round( $min - $this->margindef * ( $max - $min), $this->roundup);
$max = round( $max + $this->margindef * ( $max - $min), $this->roundup);
$diff = $max - $min; $goodround = null; $thre = 1 + round( 0.5 * $count); // allow number of ticks to drop to 50% + 1 of the value in the argument, but not lower -- round ticks is a priority
$range = $diff;
if ( $step == 0) { $ticks[ $d] = compact( ttl( 'min,max,range,step')); continue; }
for ( $round = 6; $round >= -6; $round -= 0.5) {	// try to round the step as best as you can
$step2 = mhalfround( $step, $round); if ( $step2 == 0) continue;
if ( $diff / $step2 < $thre) { $goodround = $round + 1; break; }
$goodround = $round;
}
if ( $goodround !== null) $v = mhalfround( $step, $goodround); else $v = $step;
$range = $max - $min;
$bounds[ $d] = compact( ttl( 'min,max,range'));
$min = round( $v * ( int)( $min / $v), $this->roundup);
$max = round( $v * ( int)( $max / $v), $this->roundup);
$step = $v; $range = $max - $min;
$ticks[ $d] = compact( ttl( 'min,max,range,step'));
//plotscale( $this->plot, ttl( "$min,$max"), ttl( "$min,$max"), $this->margindef);
}

}
public function dump( $path) { plotdump( $this->plot, $path); }
// frame and related drawing procedures
public function frame( $names, $BS = 3) {
$angles =& $this->angles; $step = round( 360 / count( $this->bounds));
for ( $angle = 0; $angle < 360; $angle += $step) lpush( $angles, $angle);
for ( $d = 0; $d < count( $angles); $d++) {
$this->axisline( $d);
//$this->axisticks( $d);
$this->axisname( $d, $names[ $d]);
}
// draw filled-in circle in the middle
plotcircle( $this->plot, 0, 0, $BS, 0, 360, 'DF', 0.1, '#000', '#000', 1.0);
//echo "x1=$x1,y1=$y1   x=$x,y=$y\n";
$PLOTDONOTSCALE = false;
}
public function axisline( $d) { 	// d: dimension
global $PLOTDONOTSCALE;
//echo json_encode( $this->bounds) . "\n"; die( "\n");
$angle = $this->angles[ $d];
$x1 = plotscalex( $this->plot, 0); $y1 = plotscaley( $this->plot, 0);
$x2 = plotscalex( $this->plot, 1); $y2 = plotscaley( $this->plot, 0);
extract( mrotate( $x2 - $x1, $angle)); // x, y
$PLOTDONOTSCALE = true;
//echo " x1=$x1,y1=$y1,x2=$x2,y2=$y2   x=$x,y=$y\n";
plotline( $this->plot, $x1, $y1, $x1 + $x, $y1 + $y, 0.1, '#000', 1.0);
$PLOTDONOTSCALE = false;
}
public function axisticks( $d, $BS = 3) {
global $PLOTDONOTSCALE;
$angle = $this->angles[ $d];
extract( $this->ticks[ $d]);	// min, max, range, step
//echo "min=$min,max=$max,range=$range,step=$step\n"; die( "\n");
for ( $X = $min; $X <= $max; $X += $step) {
$x1 = plotscalex( $this->plot, 0); $y1 = plotscaley( $this->plot, 0);
$x2 = plotscalex( $this->plot, $X / ( $max - $min)); $y2 = plotscaley( $this->plot, 0);
extract( mrotate( $x2 - $x1, $angle)); // x, y
$PLOTDONOTSCALE = true;
//echo " x1=$x1,y1=$y1,x2=$x2,y2=$y2   x=$x,y=$y\n";
plotcircle( $this->plot, $x1 + $x, $y1 + $y, $BS, 0, 360, 'D', 0.1, '#000', null, 1.0);
//echo "x1=$x1,y1=$y1   x=$x,y=$y\n";
$PLOTDONOTSCALE = false;
}

}
public function axisname( $d, $v, $FS = 20) {
global $PLOTDONOTSCALE;
$angle = $this->angles[ $d];
extract( $this->ticks[ $d]);	// min, max, range, step
$x1 = plotscalex( $this->plot, 0); $y1 = plotscaley( $this->plot, 0);
$x2 = plotscalex( $this->plot, 1); $y2 = plotscaley( $this->plot, 0);
extract( mrotate( $x2 - $x1, $angle)); // x, y
$PLOTDONOTSCALE = true;
//echo " x1=$x1,y1=$y1,x2=$x2,y2=$y2   x=$x,y=$y\n";
plotstringtl( $this->plot, ( $x1 + $x) . ':3', ( $y1 + $y) . ':3', "$v", $FS, '#000', 1.0);
//echo "x1=$x1,y1=$y1   x=$x,y=$y\n";
$PLOTDONOTSCALE = false;
}
// drawing function
public function drawv2xy( $vs, $reverseorder = false) { // returns [ xs, ys]
global $PLOTDONOTSCALE;
$bounds =& $this->bounds;
$X = array(); $Y = array();
$ds = hk( $bounds); if ( $reverseorder) rsort( $ds, SORT_NUMERIC);
foreach ( $ds as $d) {
$angle = $this->angles[ $d];
extract( $bounds[ $d]); 	// min, max, range
$x1 = plotscalex( $this->plot, 0); $y1 = plotscaley( $this->plot, 0);
$x2 = plotscalex( $this->plot, $vs[ $d] / $range); $y2 = plotscaley( $this->plot, 0);
extract( mrotate( $x2 - $x1, $angle)); // x, y
lpush( $X, $x1 + $x); lpush( $Y, $y1 + $y);
}
return array( $X, $Y);
}
public function drawtags( $vs, $safedistance = 0.1) {
global $PLOTDONOTSCALE, $FS; if ( ! $FS) $FS = 20;
$x1 = plotscalex( $this->plot, 1); $y1 = plotscaley( $this->plot, 1);
$x2 = plotscalex( $this->plot, -1); $y2 = plotscaley( $this->plot, -1);
$max = mmax( array( abs( $x1 - $x2), abs( $y1 - $y2))); $safe = $safedistance * $max;
list( $X, $Y) = $this->drawv2xy( $vs);
$PLOTDONOTSCALE = true;
for ( $i = 0; $i < count( $X); $i++) {
$OK = true; $x2 = $X[ $i]; $y2 = $Y[ $i];
foreach ( $this->tags as $h) {
extract( $h);	// x, y
$distance = pow( pow( $x - $x2, 2) + pow( $y - $y2, 2), 0.5);
if ( $distance < $safe) { $OK = false; break; }
}
if ( ! $OK) continue;
extract( $this->ticks[ $i]);	 // step
$v = $step * ( int)( $vs[ $i] / $step);	// round up the tag
plotstringtl( $this->plot, "$x2:3", "$y2:3", "$v", $FS, '#000', 1.0);
lpush( $this->tags, tth( "x=$x2,y=$y2"));
}
$PLOTDONOTSCALE = false;
}
public function drawarea( $upper, $lower = null, $S = null, $labeldistance = 0.1) {
global $PLOTDONOTSCALE;
if ( ! $S) { $S = new ChartSetupStyle(); $S->style = 'D'; $S->lw = 0.5; $S->draw = '#000'; $S->fill = null; $S->alpha = 1.0; }
$bounds =& $this->bounds;
if ( ! $lower) { $lower = $upper; for ( $i = 0; $i < count( $lower); $i++) $lower[ $i] = $bounds[ $i][ 'min']; }
$P = array();
list( $x, $y) = $this->drawv2xy( $upper);
for ( $i = 0; $i < count( $x); $i++) { lpush( $P, $x[ $i]); lpush( $P, $y[ $i]); }
lpush( $P, $x[ 0]); lpush( $P, $y[ 0]); // full upper circle
list( $x2, $y2) = $this->drawv2xy( $lower, true);
lpush( $P, llast( $x2)); lpush( $P, llast( $y2));
for ( $i = 0; $i < count( $x2); $i++) { lpush( $P, $x2[ $i]); lpush( $P, $y2[ $i]); }
lpush( $P, $x[ 0]); lpush( $P, $y[ 0]); // full circle
$PLOTDONOTSCALE =  true;
plotpolygon( $this->plot, $P, $S->style, $S->lw, $S->draw, $S->fill, $S->alpha);
$PLOTDONOTSCALE = false;
$this->drawtags( $upper, $labeldistance);
$this->drawtags( $lower, $labeldistance);
}
public function drawline( $vs, $S = null, $labeldistance = 0.1) {
global $PLOTDONOTSCALE;
if ( ! $S) { $S = new ChartSetupStyle(); $S->style = 'D'; $S->lw = 0.5; $S->draw = '#000'; $S->fill = null; $S->alpha = 1.0; }
list( $x, $y) = $this->drawv2xy( $vs);
lpush( $x, lfirst( $x)); lpush( $y, lfirst( $y));
//die( jsonsend( compact( ttl( 'x,y'))) . "\n");
$PLOTDONOTSCALE =  true;
for ( $i = 1; $i < count( $x); $i++) plotline( $this->plot, $x[ $i - 1], $y[ $i - 1], $x[ $i], $y[ $i], $S->lw, $S->draw, $S->alpha);
$PLOTDONOTSCALE = false;
$this->drawtags( $vs, $labeldistance);
}
public function drawbullets( $vs, $bullet, $BS = 3, $S = null, $labeldistance = 0.1) {
global $PLOTDONOTSCALE;
if ( ! $S) { $S = new ChartSetupStyle(); $S->style = 'D'; $S->lw = 0.5; $S->draw = '#000'; $S->fill = null; $S->alpha = 1.0; }
list( $x, $y) = $this->drawv2xy( $vs);
$PLOTDONOTSCALE =  true;
for ( $i = 0; $i < count( $x); $i++) plotbullet( $this->plot, $bullet, $x[ $i], $y[ $i],  $BS, $S->lw, $S->draw, $S->fill, $S->alpha);
$PLOTDONOTSCALE = false;
$this->drawtags( $vs, $labeldistance);
}

}


// all these fun]ctions require a trained and framed chart object
function chartscatter( $c, $xs, $ys, $bullet, $size, $style = NULL) { // bullet: cross|plus|hline|vline|triangle|diamond|rect|circle
if ( ! is_array( $xs)) $xs = array( $xs);
if ( ! is_array( $ys)) $ys = array( $ys);
if ( ! $style) $style = $c->setup->style;
for ( $i = 0; $i < count( $xs); $i++)
plotbullet( $c->plot, $bullet, $xs[ $i], $ys[ $i], $size, $style->lw, $style->draw, $style->fill, $style->alpha);

}
function chartline( $c, $xs, $ys, $style = NULL) {
if ( ! $style) $style = $c->setup->style;
for ( $i = 1; $i < count( $xs); $i++)
plotline( $c->plot, $xs[ $i - 1], $ys[ $i - 1], $xs[ $i], $ys[ $i], $style->lw, $style->draw, $style->alpha);

}
function chartbar( $c, $xs, $ys, $w = 0, $zero = null, $style = NULL) {
if ( ! $style) $style = $c->setup->style;
if ( $zero === NULL) $zero = $c->plot[ 'ymin'];
$w2 = 0.5 * $w;
for ( $i = 0; $i < count( $xs); $i++) {
if ( ! $w) plotline( $c->plot, $xs[ $i], $zero, $xs[ $i], $ys[ $i], $style->lw, $style->draw, $style->alpha);
else plotrect( $c->plot, $xs[ $i] . ":-$w2", $ys[ $i], $w, ( $ys[ $i] < 0 ? -1 : 1) * plotscaleydiff( $c->plot, $zero, $ys[ $i]), $style->style, $style->lw, $style->draw, $style->fill, $style->alpha);
}

}
function chartstep( $c, $xs, $ys, $style = NULL) {
if ( ! $style) $style = $c->setup->style;
if ( count( $xs) < 2) return; 	// impossible to write
for ( $i = 1; $i < count( $xs); $i++) {
plotline( $c->plot, $xs[ $i - 1], $ys[ $i - 1], $xs[ $i], $ys[ $i - 1], $style->lw, $style->draw, $style->alpha);
plotline( $c->plot, $xs[ $i], $ys[ $i - 1], $xs[ $i], $ys[ $i], $style->lw, $style->draw, $style->alpha);
}

}
function chartarea( $c, $xs, $ys1, $ys2, $style = NULL) { // bullet: cross|plus|hline|vline|triangle|diamond|rect|circle
if ( ! $style) $style = $c->setup->style;
//die( "   alpha:" . $style->alpha);
$points = array();
for ( $i = 0; $i < count( $xs); $i++) { lpush( $points, $xs[ $i]); lpush( $points, $ys1[ $i]); }
for ( $i = count( $xs) - 1; $i >= 0; $i--) { lpush( $points, $xs[ $i]); lpush( $points, $ys2[ $i]); }
plotpolygon( $c->plot, $points, $style->style, $style->lw, $style->draw, $style->fill, $style->alpha);
}
function chartshape( $c, $xys, $style = NULL) { // bullet: cross|plus|hline|vline|triangle|diamond|rect|circle
if ( ! $style) $style = $c->setup->style;
//die( "   alpha:" . $style->alpha);
$points = array(); foreach ( $xys as $xy) foreach ( $xy as $v) lpush( $points, $v);
plotpolygon( $c->plot, $points, $style->style, $style->lw, $style->draw, $style->fill, $style->alpha);
}
function chartext( $c, $xs, $ys, $texts, $style = NULL, $fontsize = null, $function = 'plotstringmc') {
if ( ! is_array( $texts)) { $L = array(); foreach ( $xs as $x) lpush( $L, $texts); $texts = $L; }
if ( ! $style) $style = $c->setup->style;
for ( $i = 0; $i < count( $xs); $i++)
$function( $c->plot, $xs[ $i], $ys[ $i], '' . $texts[ $i], $fontsize, $style->draw, $style->alpha);
}

// will return array (same as split setup dimensions) with frame setups !== chart objects
function chartsplitsetup( $h = '0.5,0.5', $w = '0.5,0.5', $spacers = "0.15,0.15", $frame = '0.1:0.1:0.1:0.15', $flatten = true) {
extract( lth( ttl( $frame, ':'), ttl( 'ftop,fright,fbottom,fleft')));	// (f) top, right, bottom, left
$w2 = round( 1 - $fright - $fleft - ( - 1 + count( ttl( $w))) * lpop( ttl( $spacers)) , 3);
$h2 = round( 1 - $ftop - $fbottom - ( - 1 + count( ttl( $h))) * lshift( ttl( $spacers)) , 3);
$L = array(); $y = $ftop;
foreach ( ttl( $h) as $h3) {
$L2 = array(); $x = $fleft; $h4 = round( $h3 * $h2, 3);	// scaled down height for this plot
foreach ( ttl( $w) as $w3) {
$w4 = round( $w3 * $w2, 3); // scaled down width for this plot
extract( lth( array( $y, round( 1 - ( $x + $w4), 3), round( 1 - ( $y + $h4), 3), $x), ttl( 'top,right,bottom,left')));
lpush( $L2, "$top:$right:$bottom:$left");
$x = round( $x + $w4 + lpop( ttl( $spacers)), 3);
}
lpush( $L, $L2); $y = round( $y + $h4 + lshift( ttl( $spacers)), 3);
}
if ( ! $flatten) return $L; // return multidimensional array of frame objects, height(rows) then width(columns)
$L2 = array(); foreach ( $L as $one) foreach ( $one as $two) lpush( $L2, $two);
return $L2;
}
// calls chartsplitpage() and constructs secondary chart objects, returns ( $C, $CS) - CS is array of secondary charts
function chartsplitpage( $orientation = 'L', $FS = 20, $h = '0.5,0.5', $w = '0.5,0.5', $spacers = '0.15,0.15', $frame = '0.1:0.1:0.1:0.15', $flatten = true, $C = null) {
$CS = new ChartSetup( $orientation, $FS);
$C = new ChartLP( $CS, $C ? $C->plot : null, '0:0:0:0');
$C->train( ttl( '0,1'), ttl( '0,1'));
// split the page according to setup
$cs = chartsplitsetup( $h, $w, $spacers, $frame, $flatten);
for ( $i = 0; $i < count( $cs); $i++) {
if ( ! is_array( $cs[ $i])) { $cs[ $i] = new ChartLP( $CS, $C->plot, $cs[ $i]); continue; }
for ( $ii = 0; $ii < count( $cs[ $i]); $ii++) $cs[ $i][ $ii] = new ChartLP( $CS, $C->plot, $cs[ $i][ $ii]);
}
return array( $C, $cs);
}

// new page splitters -- replacement for chartsplitpage
function chartlay( $C, $margins, $factory) { // factory should have make( $C, $margins)
//echo "margins: $margins\n";
return call_user_func_array( array( $factory, 'make'), array( $C, $margins));
}
function chartlayout( $CF, $o = 'L', $how = '1x1', $spacer = 10, $frame = '0.1:0.1:0.1:0.15', $C = null) { // 1x1 is HxV
global $FS; if ( ! $FS) $FS = 20;
extract( lth( ttl( $frame, ':'), ttl( 'ftop,fright,fbottom,fleft')));	// (f) top, right, bottom, left
extract( lth( ttl(  $how, 'x'), ttl( 'sh,sv'))); 	// sh, sw
$CS = new ChartSetup( $o, $FS);
if ( ! $C) $C = new ChartLP( $CS, $C ? $C->plot : null, '0:0:0:0');
$C->train( ttl( '0,1'), ttl( '0,1'));
extract( $C->plot); 	// w, h
$left = $fleft * $w; $top = $ftop * $h;
$width = ( 1 - $fleft - $fright) * $w - $spacer * ( $sh - 1);
$height = ( 1 - $ftop - $fbottom) * $h - $spacer * ( $sv - 1);
$W = $width / $sh; $H = $height / $sv;
//echo htt( compact( ttl( 'w,h,width,height,W,H'))) . "\n";
$tree = array(); $flat = array(); $Y = $top;
for ( $y = 0; $y < $sv; $y++) {
$tree[ $y] = array(); $X = $left;
for ( $x = 0; $x < $sh; $x++) {
$T = round( $Y / $h, 2);
$R = round( 1 - ( $X + $W) / $w, 2);
$B = round( 1 - ( $Y + $H) / $h, 2);
$L = round( $X / $w, 2);
//echo htt( compact( ttl( 'X,Y,T,R,B,L'))) . "\n";
$C2 = chartlay( $C, ltt( array( $T, $R, $B, $L), ':'), $CF);
$tree[ $y][ $x] = $C2; lpush( $flat, $C2);
$X += $W + $spacer;
}
$Y += $H + $spacer;
}
return array( $C, $flat, $tree);
}



// returns coordinates acceptible by plot* functions
function chart2plot( $C, $xwhere, $ywhere = null) { 	// where: min|max, returns { x, y}
$P =& $C->plot; if ( ! $ywhere) extract( lth( ttl( $xwhere), ttl( 'xwhere,ywhere')));
$xk = "x$xwhere"; $yk = "y$ywhere";
return array( 'x' => $P[ $xk], 'y' => $P[ $yk]);
}


?><?php
$RHOME = '';
// interface for R statistics library
// all this library doess forms Rscript programs for specific targets,
// runs Rscript, collects its ra output and parses it in order
// to obtain meaningful information
//     In short, this is an efficient shortcut for most statistical processing of your data

// puts R program into file, runs Rscript and returns raw text output
function Rscript( $rstring, $tempfile = null, $skipemptylines = true, $cleanup = true, $echo = false, $quiet = true) {
global $RHOME;
if ( ! $tempfile) $tempfile = ftempname( 'rscript');
if ( $tempfile && lpop( ttl( $tempfile, '.')) != 'rscript') $tempfile = ftempname( 'rscript', $tempfile);
$out = fopen( $tempfile, 'w');
fwrite( $out, $rstring . "\n");
fclose( $out);
$c = "Rscript $tempfile";
if ( $RHOME) $c = "$RHOME/bin/$c";
if ( $quiet) $c .= ' 2>/dev/null 3>/dev/null';
$in = popen( $c, 'r');
$lines = array();
while ( $in && ! feof( $in)) {
$line = trim( fgets( $in));
if ( ! $line && $skipemptylines) { if ( $echo) echo "\n"; continue; }
if ( $echo) echo $line . "\n";
array_push( $lines, $line);
}
fclose( $in);
if ( $cleanup) `rm -Rf $tempfile`;
return $lines;
}
// works directly on R output lines (passed by reference), so, be careful!
function Rreadlist( &$lines) { 	// reads split list in R output, list split into several lines, headed by [elementcount]
$L = array();
while ( count( $lines)) {
$line = lshift( $lines);
if ( ! trim( $line)) break;
$L2 = ttl( trim( $line), ' ');	// safely remove empty elements
if ( ! $L2 || ! count( $L2)) break;
if ( strpos( $L2[ 0], '[') !== 0) break;
$count = ( int)str_replace( '[', '', str_replace( ']', '', $L2[ 0]));
if ( $count !== count( $L) + 1) die( "Rreadlist() ERROR: Strange R line, expecting count[" . count( $L) . "] but got line [" . trim( $line) . "], critical, so, die()\n\n");
for ( $ii = 1; $ii < count( $L2); $ii++) lpush( $L, $L2[ $ii]);
}
return $L;
}
function Rreadmatrix( &$lines) {	// reads a matrix of values, returns mx object
// first, estimate how many rows in matrix (not cols)
$rows = array();
while ( count( $lines)) {
$line = trim( lshift( $lines)); if ( ! $line) break;
$L = ttl( $line, ' '); $head = lshift( $L);
//echo " line($line) head($head) L:" . json_encode( $L) . "\n";
if ( strpos( $head, ',]') === false) continue; // next line
$head = str_replace( ',', '', $head);
htouch( $rows, "$head"); foreach ( $L as $v) lpush( $rows[ "$head"], $v);
}
//echo " read matrix OK\n";
return hv( $rows);	// same as mx object: [ rows: [ cols]]
}
function Rreadlisthash( &$lines) {	// reads hash of lists
// first, estimate how many rows in matrix (not cols)
$rows = array(); $ks = array();
while ( count( $lines)) {
$line = trim( lshift( $lines)); if ( ! $line) break;
if ( strpos( $line, '[') === false) { $ks = ttl( $line, ' '); continue; }
$L = ttl( $line, ' '); $head = lshift( $L);
$head = str_replace( '[', '', $head); $head = str_replace( ',]', '', $head);
$line = ( int)$head; htouch( $rows, $line);
if ( count( $L) != count( $ks)) die( " Rreadlisthash() ERROR! ks(" . ltt( $ks) . ") does not match vs(" . ltt( $L) . ")\n");
for ( $i = 0; $i < count( $ks); $i++) $rows[ $line][ $ks[ $i]] = $L[ $i];
}
foreach ( $rows as $row => $h) $rows[ $row] = hv( $h);
return hv( $rows);
}


// permutation entropy -- uses PDC package (linux only)
function Rpe( $L, $mindim = 2, $maxdim = 7, $lagmin = 1, $lagmax = 1, $cleanup = true) { 	// list of values, returns minimum PE
$R = "library( pdc)\n";
$R .= "pe <- entropy.heuristic( c( " . ltt( $L) . "), m.min=$mindim, m.max=$maxdim, t.min=$lagmin, t.max=$lagmax)\n";
$R .= 'pe$entropy.values';
$mx = mxtranspose( Rreadmatrix( Rscript( $R, 'pe', false, $cleanup))); if ( ! $mx || ! is_array( $mx) || ! isset( $mx[ 2])) die( " bad R.PE\n");
$h  = array();
return round( mmin( $mx[ 2]), 2); // return the samelest PE among dimensions
}


// string functions
function RSstrcmp( $one, $two, $cleanup = true) {
$R = "agrep( '$one', '$two')";
$L = Rreadlist( Rscript( $R, null, true, $cleanup));
if ( ! $L && ! count( $L)) return 0;
rsort( $L, SORT_NUMERIC);
return lshift( $L);
}


// outliers
function Rdixon( $list, $cleanup = true) { // will return { Q, p-value} from Dixon outlier test, data should be ordered and preferrably normalized
sort( $list, SORT_NUMERIC);
$script = "library( outliers)\n";
$script .= "dixon.test( c( " . ltt( $list) . "))\n";
$L = Rscript( $script, 'dixon', true, $cleanup);
foreach ( $L as $line) {
$line = trim( $line); if ( ! $line) continue;
$h = tth( $line); if ( ! isset( $h[ 'Q']) || ! isset( $h[ 'p-value'])) continue;
return $h;
}
return null;
}

// randomness,  runs test, etc. returns hash{ statistic, pvalue}
function Rruns( $list, $skipemptylines = true, $cleanup = true) {
$script = "library( lawstat)\n";
$script .= "runs.test( c( " . ltt( $list) . "))\n";
$L = Rscript( $script, 'runs', $skipemptylines, $cleanup);
if ( ! count( $L)) return lth( ttl( '-1,-1'), ttl( 'statistic,pvalue'));
while ( count( $L) && ! strlen( trim( llast( $L)))) lpop( $L);
if ( ! count( $L)) return lth( ttl( '-1,-1'), ttl( 'statistic,pvalue'));
$s = llast( $L); $s = str_replace( '<', '=', $s);
$h = tth( $s); if ( ! isset( $h[ 'p-value'])) die( "ERROR! Cannot parse RUNS line [" . llast( $L) . "]\n");
return lth( hv( $h), ttl( 'statistic,pvalue'));
}

/** reinforcement learning, requires MDP (depends on XML) package installed (seems to only install on Linux)
* automatic stuff:
*    - binaries are created with RL_ prefix
*    - 'reward' is the automatic label of the optimized variable
* setup structure: [ stage1, stage2, stage3, ... ]
*   stage structure: { 'state label': { 'action label': { action setup}}, ...}
*     action setup: { weight, dests: [ { state (label), prob (0..1)}, ...]}
*/
function RsimpleMDP( $setup, $skipemptylines = true, $cleanup = true) { 	// returns [ { stageno, stateno, state, action, weight}, ...]   list of data for each iteration
// create the script
$s = 'library( MDP)' . "\n";
$s .= 'prefix <- "RL_"' . "\n";
$s .= 'w <- binaryMDPWriter( prefix)' . "\n";
$s .= 'label <- "reward"' . "\n";
$s .= 'w$setWeights(c( label))' . "\n";
$s .= 'w$process()' . "\n";
// create map of stages and actions
$map = array(); foreach ( $setup as $k1 => $h1) lpush( $map, hvak( hk( $h1), true));
//echo 'MAP[' . json_encode( $map) . "]\n";
for ( $i = 0; $i < count( $setup); $i++) {
$h = $setup[ $i];
$s .= '   w$stage()' . "\n";
foreach ( $h as $label1 => $h1) {
//echo "label1[$label1] h1[" . json_encode( $h1) . "]\n";
$s .= '      w$state( label = "' . $label1 . '"' . ( $h1 ? '' : ', end=T') . ')' . "\n";
if ( ! $h1) continue;	// no action state, probably terminal stage
foreach ( $h1 as $label2 => $h2) {
extract( $h2);	// weight, dests: [ { state, prob}]
$fork = array(); foreach ( $dests as $h3) {
extract( $h3); // state, prob
lpush( $fork, 1);
lpush( $fork, $map[ $i + 1][ $state]);
lpush( $fork, $prob);
}
$s .= '         w$action( label = "' . $label2 . '", weights = ' . $weight . ', prob = c( ' . ltt( $fork) . '), end = T)' . "\n";
}
$s .= '      w$endState()' . "\n";
}
$s .= '   w$endStage()' . "\n";
}
$s .= 'w$endProcess()' . "\n";
$s .= 'w$closeWriter()' . "\n";
$s .= "\n";
$s .= 'stateIdxDf( prefix)' . "\n";
$s .= 'actionInfo( prefix)' . "\n";
$s .= 'mdp <- loadMDP( prefix)' . "\n";
$s .= 'mdp' . "\n";
$s .= 'valueIte( mdp , label , termValues = c( 50, 20))' . "\n";
$s .= 'policy <- getPolicy( mdp , labels = TRUE)' . "\n";
$s .= 'states <- stateIdxDf( prefix)' . "\n";
$s .= 'policy <- merge( states , policy)' . "\n";
$s .= 'policyW <- getPolicyW( mdp, label)' . "\n";
$s .= 'policy <- merge( policy, policyW)' . "\n";
$s .= 'policy' . "\n";
// run the script
$L = Rscript( $s, 'mdp', $skipemptylines, $cleanup);
while ( count( $L) && strpos( $L[ 0], 'Run value iteration using') !== 0) lshift( $L);
if ( count( $L) < 3) return null;	// some error, probably the problem is written wrong
lshift( $L); lshift( $L); // header should be sId, n0, s0, lable, aLabel, w0
if ( ! is_numeric( lshift( ttl( $L[ 0], ' ')))) lshift( $L);
$out = array();
foreach ( $L as $line) {
$L2 = ttl( $line, ' ');
$run = lshift( $L2);
lshift( $L2);
$stageno = lshift( $L2);
$stateno = lshift( $L2);
$state = lshift( $L2);
$action = lshift( $L2);
$weight = lshift( $L2);
$h = tth( "run=$run,stageno=$stageno,stateno=$stateno,state=$state,action=$action,weight=$weight");
lpush( $out, $h);
}
// create policy from runs
$policy = array();
foreach  ( $out as $h) {
$stageno = null; extract( $h);	// stageno, state, action
if ( ! is_numeric( $stageno)) continue;
if ( ! isset( $policy[ $stageno])) $policy[ $stageno] = array();
$policy[ $stageno][ $state] = $action;
}
ksort( $policy, SORT_NUMERIC);
return $policy;
}

// clustering
function Rkmeans( $list, $centers, $group = true, $cleanup = true) { // returns list of cluster numbers as affiliations
sort( $list, SORT_NUMERIC);
$s = 'kmeans( c( ' . ltt( $list) . "), $centers)";
$lines = Rscript( $s, 'kmeans', false, $cleanup);
while ( count( $lines) && trim( $lines[ 0]) != 'Clustering vector:') lshift( $lines);
if ( count( $lines)) lshift( $lines);
$out = array();
foreach ( $lines as $line) {
$line = trim( $line); if ( ! $line) break;	// end of block
$L = ttl( $line, ' '); lshift( $L);
foreach ( $L as $v) lpush( $out, ( int)$v);
}
if ( count( $out) != count( $list)) return null;	// failed
if ( ! $group) return $out; // these are just cluster belonging ... 1 through centers
if ( count( $out) != count( $list)) die( "ERROR! Rkmeans() counts do not match    LIST(" . ltt( $list) . ")   OUT(" . ltt( $out) . ")   LINES(" . ltt( $lines, "\n") . ")\n");
$clusters = array(); for ( $i = 0; $i < $centers; $i++) $clusters[ $i] = array();
for ( $i = 0; $i < count( $list); $i++) {
if ( ! isset( $out[ $i])) die( "ERROR! Rkmeans() no out[$i]   LIST(" . ltt( $list) . ")  OUT(" . ltt( $out) . ")\n");
if ( ! isset( $clusters[ $out[ $i] - 1])) die( "ERROR! Rkmeans() no cluster(" . $out[ $i] . ") in data  LIST(" . ltt( $list) . ")  OUT(" . ltt( $out) . ")");
lpush( $clusters[ $out[ $i] - 1], $list[ $i]);
}
return $clusters;
}
function Rkmeanshash( $list, $means, $digits = 5) { 	// returns { 'center': [ data], ...}
$L = Rkmeans( $list, $means, true);
if ( count( $L) != $means) die( " Rkmeanshash() ERROR! count(" . count( $L) . ") != means($means)\n");
$h = array();
foreach ( $L as $L2) $h[ '' . round( mavg( $L2), $digits)] = $L2;
return $h;
}


// correlation
/** cross-correlation function (specifically, the one implemented by R)
$one is the first array
$two is the second array, will be tested agains $one
$lag is the lag in ccf() (read ccf manual in R)
$normalize true will normalize both arrays prior to calling ccf()
$debug should be on only when testing for weird behavior
returns hash ( lag => ccf)
*/
function Rccf( $one, $two, $lag = 5, $normalize = true, $cleanup = true, $debug = false) {
if ( $debug) echo "\n";
if ( $debug) echo "Rccf, with [" . count( $one) . "] and [" . count( $two) . "] in lists\n";
if ( $normalize) { $one = mnorm( $one); $two = mnorm( $two); }
$rstring = 'ccf('
. ' c(' . implode( ',', $one) . '), '
. ' c(' . implode( ',', $two) . '), '
. "plot = FALSE, lag.max = $lag, na.action = na.pass"
. ')';
if ( $debug) echo "rstring [$rstring]\n";
$lines = Rscript( $rstring, 'ccf', true, $cleanup);
while ( count( $lines) && strpos( $lines[ 0], 'Autocorrelations') === false) lshift( $lines); lshift( $lines);
$out = array();
while ( count( $lines)) {
$ks = ttl( lshift( $lines), ' ');
$vs = ttl( lshift( $lines), ' ');
$out = hm( $out, lth( $vs, $ks));
}
return $out;
}
// takes Rccf() output and selects the best value of all lags in hash, returns double
function Rccfbest( $ccf) {
arsort( $ccf, SORT_NUMERIC);
$key = array_shift( array_keys( $ccf));
return $ccf[ $key];
}
// runs Rccf with 1 lag, but returns '0'th result -- the case when lag makes no sense
function Rccfsimple( $one, $two, $normalize = true, $cleanup = true) { return htv( Rccf( $one, $two, 1, $normalize, $cleanup), '0'); }


// auto-correlation
function Racf( $one, $maxlag = 15, $normalize = true, $debug = false) {
if ( $maxlag < 3) return array();	// too small leg
if ( $debug) echo "\n";
if ( $debug) echo "Rccf, with [" . count( $one) . "] and [" . count( $two) . "] in lists\n";
if ( $normalize) { $one = mnorm( $one); $two = mnorm( $two); }
$rstring = 'acf('
. ' c(' . implode( ',', $one) . '), '
. ' c(' . implode( ',', $two) . '), '
. "plot = FALSE, lag.max = $maxlag, na.action = na.pass"
. ')';
if ( $debug) echo "rstring [$rstring]\n";
$lines = Rscript( $rstring, 'acf');
if ( $debug) echo "received [" . count( $lines) . "] lines from Rscript()\n";
if ( $debug) foreach ( $lines as $line) echo '   + [' . trim( $line) . ']' . "\n";

$goodlines = array();
while ( count( $lines)) {
$line = trim( array_pop( $lines));
$line = str_replace( '+', '', str_replace( '[', '', str_replace( ']', '', $line)));
array_unshift( $goodlines, $line);
$L = ttl( $line, ' '); if ( $L[ 0] == 0 && $L[ 1] == 1 && $L[ 2] == 2) break;
}
$out = array();
while ( count( $goodlines)) {
$keys = ttl( array_shift( $goodlines), ' ');
$values = ttl( array_shift( $goodlines), ' ');
for ( $i = 0; $i < count( $keys); $i++) $out[ $keys[ $i]] = $values[ $i];
}
return $out;
}


// fitting
/** try to fit a list of values to a given distribution model, return parameter hash if successful
$list is a simple array of values ( normalization is preferred?)
$type is the type supported by fitdistr (read R MASS manual)
$expectkeys: string in format key1.key2.key3 (dot-delimited list of keys to parse from fitdist output)
returns hash ( parameter => value)
*** distributions without START: exponential,lognormal,poisson,weibull
*** others will require START variable assigned something
*/
function Rfitdistr( $list, $type, $cleanup = true) {	 // returns hash ( param name => param value)
$rs = "library( MASS)\n"	// end of line is essential
. "fitdistr( c( " . implode( ',', $list) . '), "' . $type . '")' . "\n";
$lines = Rscript( $rs, 'fitdistr', true, $cleanup);
$h = null;
while ( count( $lines) > 2) {
$L = ttl( lshift( $lines), ' ');
$L2 = ttl( $lines[ 0], ' ');
if ( count( $L) != count( $L2)) continue;
$good = true; foreach ( $L2 as $v) if ( ! is_numeric( $v)) $good = false;
if ( ! $good) continue;
// good data
for ( $i = 0; $i < count( $L); $i++) $h[ $L[ $i]] = $L2[ $i];
break;
}
return $h;
}
/** test a given distirbution model agains real samples
$list is array of values to be tested
$type string supported by ks.test() in R (read manual if in doubt)
$params hash specific to a given distribution (read manual, and may be test in R before running automatically)
returns hash ( D, p-value) when successful, empty hash otherwise
*** map from distr names:  exponential=pexp,lognormal=plnorm,poisson=ppois,weibull=pweibull
*/
function Rkstest( $list, $type, $params = null, $cleanup = true) { // params is hash, returns hash of output
$type = is_array( $type) ? 'c(' . ltt( $type) . ')' :'"' . $type . '"';
$rs = "ks.test( c(" . ltt( $list) . '), ' . $type . ( $params ? ', ' . htt( $params) : '') . ")\n";
$lines = Rscript( $rs, 'kstest', true, $cleanup);
foreach ( $lines as $line) {
$h = tth( str_replace( '<', '=', $line));
if ( ! isset( $h[ 'D']) && ! isset( $h[ 'p-value'])) continue;
return $h;
}
return array();
}
// linear fitting of a single list of values in R
function Rfitlinear( $list) { // returns list( b, a) in Y = aX + b, X: keys, Y: values in list
$s = 'y = c(' . ltt( $list) . ')' . "\n";
$s .= 'x = c(' . ltt( hk( $list)) . ')' . "\n";
$s .= 'lm( y~x)' . "\n";
$lines = Rscript( $s, 'fitlinear');
while( count( $lines) && ! trim( llast( $lines))) lpop( $lines);
if ( ! count( $lines)) return array( null, null);
return ttl( lpop( $lines), ' ');
}

// PLS, specifically, SPE (squared prediction error)
function Rpls( $x, $y, $cleanup = true) { // x: list, y: list (same length), returns list of scores (SPE)
$S = "library( pls)\n";
$S .= "mydata = data.frame( X = as.matrix( c(" . ltt( $x) . ")), Y = as.matrix( c( " . ltt( $y) . ")))\n";
$S .= "data = plsr( X ~ Y, data = mydata)\n";
$S .= 'data$scores' . "\n";
$L = Rscript( $S, 'pls', true, $cleanup);
while ( count( $L) && trim( $L[ 0]) != 'Comp 1') lshift( $L);
if ( ! count( $L)) return null;
lshift( $L); $L2 = array();
for ( $i = 0; $i < count( $y) && count( $L); $i++) lpush( $L2, lpop( ttl( lshift( $L), ' ')));
return $L2;
}

// Kalman filter, takes input list, regressed it, and returns list of predictions
function Rkalman( $x, $degree = 1, $cleanup = true) { 	// x: list, returns prediction list of size( list) [ 0, pred 1, pred2 ...]
$S = "library( dlm)\n";
$S .= "dlmFilter( c( " . ltt( $x) . "), dlmModPoly( $degree))\n";
$L = Rscript( $S, 'kalman', true, $cleanup);
while ( count( $L) && trim( $L[ 0]) != '$f') lshift( $L); // skip until found line '$f' prediction values
lshift( $L);	// skip the line with $f itself
return Rreadlist( $L);
}


// PCA
/** select top N principle components based an a matrix (matrixmath)
*	$percentize true|false, if true, will turn fractions into percentage points
*	$round how many decimal numbers to round to
*	returns hashlist ( std.dev, prop, cum.prop)
*/
function Rpcastats( $mx, $howmany = 10, $percentize = true, $round = 2) { // returns hashlist
$lines = Rscript( "summary( princomp( " . mx2r( $mx) . "))");
//echo "[" . count( $lines) . "] lines\n";
if ( ! $lines) return array();
while ( strpos( $lines[ 0], 'Importance of components') !== 0) array_shift( $lines);
array_shift( $lines);
$H = array();
while ( count( $lines) && count( array_keys( $H)) < $howmany) {
$tags = ttl( array_shift( $lines), ' ');
//echo "tags: " . ltt( $tags, ' ') . "\n";
for ( $i = 0; $i < count( $tags); $i++) {
$tags[ $i] = array_pop( explode( '.', $tags[ $i]));
}
$labels = ttl( 'std.dev,prop,cum.prop');
while ( count( $labels)) {
$label = array_shift( $labels);
$L = ttl( array_shift( $lines), ' ');
$tags2 = $tags;
while ( count( $tags2)) {
$tag = array_pop( $tags2);
$H[ $tag][ $label] = array_pop( $L);
}

}

}
ksort( $H, SORT_NUMERIC);
$list = array_values( $H);
while ( count( $list) > $howmany) array_pop( $list);
if ( $percentize) for ( $i = 0; $i < count( $list); $i++) foreach ( $list[ $i] as $k => $v) if ( $k != 'std.dev') $list[ $i][ $k] = round( 100 * $v, $round);
return $list;
}
function Rpcascores( $mx, $comp) { // which component, returns list of size of mx's width
$text = "pca <- princomp( " . ( is_array( $mx[ 0]) ?  mx2r( $mx) : 'matrix( c(' . ltt( $mx) . '), ' . ( int)pow( count( $mx), 0.5) . ', ' . ( int)pow( count( $mx), 0.5) . ')') . ")\n";
$text .= "pca" . '$' . "scores[,$comp]\n";
$lines = Rscript( $text, 'pca');
//echo "[" . count( $lines) . "] lines\n";
if ( ! $lines) return array();
$list = array();
foreach ( $lines as $line) {
$L = ttl( $line, ' '); array_shift( $L);
foreach ( $L as $v) array_push( $list, $v);
}
while ( count( $list) > count( $mx)) array_pop( $list);
return $list;
}
function Rpcaloadings( $mx, $comp, $cleanup = true) { // which component, returns list of size of mx's width
$text = "pca <- princomp( " . ( is_array( $mx[ 0]) ?  mx2r( $mx) : 'matrix( c(' . ltt( $mx) . '), ' . ( int)pow( count( $mx), 0.5) . ', ' . ( int)pow( count( $mx), 0.5) . ')') . ")\n";
$text .= "pca" . '$' . "loadings[,$comp]\n";
$lines = Rscript( $text, 'pca', true, $cleanup);
//echo "[" . count( $lines) . "] lines\n";
if ( ! $lines) return array();
$list = array();
foreach ( $lines as $line) {
$L = ttl( $line, ' '); array_shift( $L);
foreach ( $L as $v) array_push( $list, $v);
}
while ( count( $list) > count( $mx)) array_pop( $list);
return $list;
}
function Rpcarotation( $mx, $cleanup = true) { // returns MX[ row1[ PC1, PC2,...]], ...] -- standard matrix
$text = "pca <- prcomp( " . ( is_array( $mx[ 0]) ?  mx2r( $mx) : 'matrix( c(' . ltt( $mx) . '), ' . ( int)pow( count( $mx), 0.5) . ', ' . ( int)pow( count( $mx), 0.5) . ')') . ")\n";
$text .= 'pca$rotation' . "\n";
$lines = Rscript( $text, 'pcarotation', true, $cleanup);
return Rreadlisthash( $lines);
}


// distributions, use R to generate values from various distributions
function Rdist( $rscript, $cleanup = true) { return Rreadlist( Rscript( $rscript, null, true, $cleanup)); } // general distribution runner/reader, output should always be R list
function Rdistbinom( $period, $howmany = 10) { 	// probability is 1/period, default howmany is 100 * period
$prob = round( 1 / $period, 6);
if ( ! $howmany) $howmany = $period * 1000;
if ( $howmany > 1000000) $howmany = $period * 1000;
return Rdist( "rbinom( $howmany, 1, $prob)");
}
function Rdistpoisson( $mean, $howmany = 1000) { return Rdist( "rpois( $howmany, $mean)"); }
function Rdensity( $L, $cleanup = true) { 	// returns { x, y} of density
$R = 'd <- density( c(' . ltt( $L) . '))' . "\n";
$x = Rreadlist( Rscript( $R . 'd$x', null, true, $cleanup));
$y = Rreadlist( Rscript( $R . 'd$y', null, true, $cleanup));
return array( 'x' => $x, 'y' => $y);
}
function Rhist( $L, $breaks = 20, $digits = 3, $cleanup = true) { 	// y value = bin counts
$R = 'd <- hist( c(' . ltt( $L) . "), prob=1, breaks=$breaks)" . "\n";
$y = Rreadlist( Rscript( $R . 'd$counts', null, true, $cleanup));
$step = ( 1 / $breaks) * ( mmax( $L) - mmin( $L));
$x = 0.5 * $step; $h = array();
foreach ( $y as $v) { $h[ '' . round( $x, $digits)] = $v; $x += $step; }
return $h;
}


?><?php
// mauth package (TCP-based secure authentication)
function mauth( $login, $password, $domain = '', $timeout = 2.0, $bip = null) { // ANAME, SBDIR, MAUTHDPORT
global $BIP, $MAUTHDIR, $ANAME, $SBDIR, $MAUTHDPORT;	// this name should be registered with mauth
if ( ! $bip) $bip = $BIP;
$app = $ANAME;
if ( $domain) $app = $domain;	// allows optionally to set another domain for login
$c = "command=login,domain=$app,login=$login,password=$password";
if ( strlen( $c) > 240) return array( false, 'either login or password are too long');
// get mauthd env
require( "$MAUTHDIR/mauthdport.php");
if ( ! $MAUTHDPORT) return array( false, 'failed to read mauth runtime details');
$info = ntcptxopen( $bip, $MAUTHDPORT);
if ( $info[ 'error']) return array( false, "could not contact mauth deamon");
$sock = $info[ 'sock'];
//echo "mauth sock[$sock]\n";
$status = ntcptxstring( $sock, sprintf( '%250s', $c), $timeout);
//die( "txstring OK\n");
if ( ! $status) { @socket_shutdown( $sock); @sock_close( $sock); return array( false, "could not comm(tx) to mauth deamon"); }
$text = ntcprxstring( $sock, 250, $timeout);
//die( jsonsend( jsonmsg( 'RX ok')));
if ( ! $text) { @socket_shutdown( $sock); @socket_close( $sock); return array( false, "failed to comm(rx) with mauth deamon"); }
//echo "string [$text]\n";
$info = tth( $text); if ( $info[ 'status'] == 'ok') return array( true, '');
return array( false, $info[ 'msg']);
}
function mauthchange( $login, $password, $domain = '', $timeout = 2.0, $bip = null) { // ANAME, SBDIR, MAUTHDPORT
global $BIP, $MAUTHDIR, $ANAME, $SBDIR, $MAUTHDPORT;	// this name should be registered with mauth
if ( ! $bip) $bip = $BIP;
$app = $ANAME;
if ( $domain) $app = $domain;	// allows optionally to set another domain for login
// get mauthd env
require( "$MAUTHDIR/mauthdport.php");
if ( ! $MAUTHDPORT) return array( false, 'failed to read mauth runtime details');
$info = ntcptxopen( $bip, $MAUTHDPORT);
if ( $info[ 'error']) return array( false, "could not contact mauth deamon");
$sock = $info[ 'sock'];
//echo "mauth sock[$sock]\n";
$status = ntcptxstring( $sock, sprintf( '%250s', "command=change,domain=$app,login=$login,password=$password"), $timeout);
if ( ! $status) { @socket_shutdown( $sock); @sock_close( $sock); return array( false, "could not comm(tx) to mauth deamon"); }
$text = ntcprxstring( $sock, 250, $timeout);
if ( ! $text) { @socket_shutdown( $sock); @socket_close( $sock); return array( false, "failed to comm(rx) with mauth deamon"); }
//echo "string [$text]\n";
$info = tth( $text); if ( $info[ 'status'] == 'ok') return array( true, '');
return array( false, $info[ 'msg']);
}
function mauthadd( $login, $password, $domain = '', $timeout = 2.0, $bip = null) { // ANAME, SBDIR, MAUTHDPORT
global $BIP, $MAUTHDIR, $ANAME, $SBDIR, $MAUTHDPORT;	// this name should be registered with mauth
if ( ! $bip) $bip = $BIP;
//die( jsonsend( jsonmsg( "BIP[$BIP]")));
$app = $ANAME;
if ( $domain) $app = $domain;	// allows optionally to set another domain for login
// get mauthd env
require( "$MAUTHDIR/mauthdport.php");
if ( ! $MAUTHDPORT) return array( false, 'failed to read mauth runtime details');
$info = ntcptxopen( $bip, $MAUTHDPORT);
if ( $info[ 'error']) return array( false, "could not contact mauth deamon");
$sock = $info[ 'sock'];
//echo "mauth sock[$sock]\n";
$status = ntcptxstring( $sock, sprintf( '%250s', "command=add,domain=$app,login=$login,password=$password"), $timeout);
if ( ! $status) { @socket_shutdown( $sock); @sock_close( $sock); return array( false, "could not comm(tx) to mauth deamon"); }
$text = ntcprxstring( $sock, 250, $timeout);
if ( ! $text) { @socket_shutdown( $sock); @socket_close( $sock); return array( false, "failed to comm(rx) with mauth deamon"); }
//echo "string [$text]\n";
$info = tth( $text); if ( $info[ 'status'] == 'ok') return array( true, '');
return array( false, $info[ 'msg']);
}

?><?php
// can be used to store large matrices of data in files
// only INTEGER values can be stored in matrix file, so, all
// other data types have to be mapped to 0..max
// -1 is default for missing values, 0 should normally represent 0
//    * original purpose of mf is to store e2e spaces of metics created from network graphs

// returns mf handle( file, filsize, w, h)
function mfinit( $file, $w, $h, $fill = false, $fillvalue = 0, $readmode = false) {
if ( $readmode) return array( 'file' => $file, 'w' => $w, 'h' => $h);
$out = fopen( $file, "wb");
ftruncate( $out, $h * $w * 4);
if ( $fill) {	// fill with fillvalue
rewind( $out);
for ( $i = 0; $i < $w; $i++) {
for ( $y = 0; $y < $h; $y++) bfilewriteint( $out, $fillvalue);
}
}
fclose( $out);
return array( 'file' => $file, 'w' => $w, 'h' => $h);
}
function mfend( &$mf) {
if ( isset( $mf[ 'in']) && $mf[ 'in']) { fclose( $mf[ 'in']); unset( $mf[ 'in']); }
if ( isset( $mf[ 'out']) && $mf[ 'out']) { fclose( $mf[ 'out']); unset( $mf[ 'out']); }
}
function mfopenread( $file, $w, $h) { return mfinit( $file, $w, $h, false, 0, true); }
function mfopenwrite( $file, $w, $h, $fill = false, $fillvalue = 0) { return mfinit( $file, $w, $h, $fill, $fillvalue); }
function mfclose( &$mf) { return mfend( $mf); }
// data management
function mfgetline( &$mf, $line, $store = true, $keep = true, $seek = true, $debug = false, $debugperiod = 500) {
if ( isset( $mf[ 'in'])) $in = $mf[ 'in'];
else $in = fopen( $mf[ 'file'], 'rb');
if ( $store) $mf[ 'in'] = $in;
if ( $seek) { rewind( $in); fseek( $in, $line * $mf[ 'w'] * 4); }
$out = array();
$debugv = $debug ? $debugperiod : -1;
for ( $i = 0; $i < $mf[ 'w']; $i++) {
$v = bfilereadint( $in);
if ( ! $v) $v = -1;
$debugv--;
if ( ! $debugv) { echo "dec/hex[$v " . bint2hex( $v) . "]\n"; $debugv = $debugperiod; }
if ( $debug) echo '.';
array_push( $out, $v);
}
if ( ! $keep) { fclose( $in); unset( $mf[ 'in']); }
return $out;
}
function mfgethorizontal( &$mf, $line, $poslist, $store = true, $keep = true) {
if ( isset( $mf[ 'in'])) $in = $mf[ 'in'];
else $in = fopen( $mf[ 'file'], 'rb');
if ( $store) $mf[ 'in'] = $in;
//rewind( $in);
$pos = $line * $mf[ 'w'] * 4;
//echo "   POS[$pos = $line * " . $mf[ 'w'] . " * 4]";
fseek( $in, $pos);
//echo "START.POS[" . ftell( $in) . "]"; sleep( 1);
$out = array();
$lastpos = 0;
foreach ( $poslist as $pos) {
$posdiff = $pos - $lastpos;
for ( $i = 0; $i < $posdiff; $i++) bfilereadint( $in);
$v = bfilereadint( $in);
//echo '..' . ftell( $in) . '..';
$out[ $pos] = $v;
$lastpos = $pos + 1;
}
if ( ! $keep) { fclose( $in); unset( $mf[ 'in']); }
return $out;
}
function mfsetline( &$mf, $line, $list, $store = true, $keep = true, $seek = true, $debug = false, $debugperiod = 500) {
if ( isset( $mf[ 'out'])) $out = $mf[ 'out'];
else { $out = fopen( $mf[ 'file'], 'r+b'); }
if ( $store) $mf[ 'out'] = $out;
if ( $seek) { rewind( $out); fseek( $out, $line * $mf[ 'w'] * 4); }
$debugv = $debug ? $debugperiod : -1;
for ( $i = 0; $i < $mf[ 'w']; $i++) {
$v = isset( $list[ $i]) ? round( $list[ $i]) : 0;
if ( $v < 0) $v = bfullint();
$debugv--;
$s = bfilewriteint( $out, $v);
if ( ! $debugv) { echo "dec/string[$v.$s(" . strlen( $s) . ")]"; $debugv = $debugperiod; }
if ( $debug) { echo '.'; }
}
if ( ! $keep) { fclose( $out); unset( $mf[ 'out']); }
}
function mfsetvalue( &$mf, $y, $x, $value, $store = true, $keep = true) {
if ( isset( $mf[ 'out'])) $out = $mf[ 'out'];
else { $out = fopen( $mf[ 'file'], 'r+b'); }
if ( $store) $mf[ 'out'] = $out;
fseek( $out, ( $y * $mf[ 'w'] * 4) + $x * 4);
$v = round( $value);
if ( $v < 0) $v = bfullint();
$s = bfilewriteint( $out, $v);
if ( ! $keep) { fclose( $out); unset( $mf[ 'out']); }
}

// format cmonverters
// reads mf file into a matrix format for matrixmath
function &mf2mx( $mf, $w, $h, $missing = null) { // missing = -1 values in mf file
$mx = mxinit( $h, $w);
$mf = mfinit( $mf, $w, $h, null, null, true); // read mode
for ( $i = 0; $i < $h; $i++) {
$line = mfgetline( $mf, $i);
for ( $y = 0; $y < $w; $y++)
$mx[ $i][ $y] = ( $line[ $y] == -1 ? ( $missing === null ? $line[ $y] : $missing): $line[ $y]);
}
mfend( $mf);
return $mx;
}
function mx2mf( &$mx, $w, $h, $file) {	// write the file
$mf = mfinit( $file, $w, $h);	// write mode
for ( $i = 0; $i < $h; $i++) mfsetline( $mf, $mx[ $i], false, false, true);
mfend( $mf);
}


?><?php
/** library for working with matrix math, created 2010/03/09
*	Depends on R for major operations, small ones serve by itself
*/
function &mxinit( $rows, $cols, $fill = 0) {
$mx = array();
for ( $row = 0; $row < $rows; $row++) {
$mx[ $row] = array();
for ( $col = 0; $col < $cols; $col++) $mx[ $row][ $col] = $fill;
}
return $mx;
}
function mxinfo( &$mx) { return array( 'rows' => count( $mx), 'cols' => count( $mx[ 0])); }
function mx01( &$mx, $threshold = 0) {	// all values > 0 are 1, 0 otherwise
extract( mxinfo( $mx));
for ( $row = 0; $row < $rows; $row++)
for ( $col = 0; $col < $cols; $col++)
if ( $mx[ $row][ $col] > $threshold) $mx[ $row][ $col] = 1; else $mx[ $row][ $col] = 0;
}
function mxnorm( &$mx, $digits = 2) {
$min = $mx[ 0][ 0]; $max = $min;
for ( $x = 0; $x < count( $mx); $x++) {
for ( $y = 0; $y < count( $mx); $y++) {
if ( $mx[ $x][ $y] < $min) $min = $mx[ $x][ $y];
if ( $mx[ $x][ $y] > $max) $max = $mx[ $x][ $y];
}
}
for ( $x = 0; $x < count( $mx); $x++) {
for ( $y = 0; $y < count( $mx); $y++) {
$v = 0; if ( $min != $max) $v = ( $mx[ $x][ $y] - $min) / ( $max - $min);
$mx[ $x][ $y] = round( $v, $digits);
}
}
}
function &mxsum( &$mx1, &$mx2) { 	// returns a third matrix object
$info1 = mxinfo( $mx1); $info2 = mxinfo( $mx2);
foreach ( $info1 as $k => $v) if ( $info2[ $k] != $v) { echo "ERROR in matrixmath(): mx1 and mx2 have differecent dimensions!\n"; die( ''); }
extract( $info1);
$mx = mxinit( $rows, $cols); for ( $row = 0; $row < $rows; $row++) for ( $col = 0; $col < $cols; $col++) $mx[ $row][ $col] = $mx1[ $row][ $col] + $mx2[ $row][ $col];
return $mx;
}
function &mxproduct( &$mx1, &$mx2) { // this requires R, returns new matrix
$info1 = mxinfo( $mx1); $info2 = mxinfo( $mx2); // row1, col2 are new dimensions
$rows = $info1[ 'rows']; $cols = $info2[ 'cols'];
$rs = mx2r( $mx1) . ' %*% ' . mx2r( $mx2);
$lines = Rscript( $rs, null, false, true);
while ( ! strlen( trim( $lines[ count( $lines) - 1]))) array_pop( $lines);
$nlines = array(); for ( $i = 0; $i < $rows; $i++) $nlines[ $i] = array();
while ( count( $lines) && count( $nlines[ 0]) < $cols) {
for ( $i = $rows - 1; $i >= 0; $i--) {
$line = trim( array_pop( $lines));
if ( strpos( $line, '[') !== 0) { echo "Wrong format of line Rscript output [$line]\n" . "Matrix debug\n"; mxdebug( $mx1); mxdebug( $mx2); die( ''); }
$list = ttl( $line, ' '); array_shift( $list);
while ( count( $list)) array_unshift( $nlines[ $i], array_pop( $list));
}
array_pop( $lines);
}
for ( $row = 0; $row < $rows; $row++)
if ( count( $nlines[ $row]) !== $cols) { echo "Wrong col count on row[$row]\n" . "Matrix debug\n"; mxdebug( $mx1); mxdebug( $mx2); die( ''); }
$mx = mxinit( $rows, $cols);
for ( $row = 0; $row < $rows; $row++)
for ( $col = 0; $col < $cols; $col++)
$mx[ $row][ $col] = $nlines[ $row][ $col];
return $mx;
}
function &mxtranspose( &$mx) {	// returns another matrix
$info = mxinfo( $mx); foreach ( $info as $k => $v) $$k = $v;
$nmx = mxinit( $cols, $rows);
for ( $col = 0; $col < $cols; $col++)
for ( $row = 0; $row < $rows; $row++)
$nmx[ $col][ $row] = $mx[ $row][ $col];
return $nmx;
}

// R interface helpers
function mx2r( &$mx) {	// returns r notation: matrix( c( ,,,), rows, cols)
extract( mxinfo( $mx)); // cols, rows
$list = array();
for ( $col = 0; $col < $cols; $col++) for ( $row = 0; $row < $rows; $row++) array_push( $list, $mx[ $row][ $col]);
return "matrix( c( " . implode( ',', $list) . "), $rows, $cols)";
}
function list2mx( $VS, $cols) {
$mx = array();
for ( $i = 0; $i < count( $VS) - $cols; $i++) $mx[ $i] = array();
for ( $row = 0; $row < count( $VS) - $cols; $row++) {
for ( $col = 0; $col < $cols; $col++) {
$mx[ $row][ $col] = $VS[ $col + $row];
}

}
return $mx;
}

// outputs
function mx2csv( &$mx, $file, $mode = 'w') {
$out = fopen( $file, $mode);
$info = mxinfo( $mx); foreach ( $info as $k => $v) $$k = $v;
for ( $row = 0; $row < $rows; $row++) {
$list = array();
for ( $col = 0; $col < $cols; $col++) array_push( $list, $mx[ $row][ $col]);
fwrite( $out, implode( ',', $list) . "\n");
}
fclose( $out);
}
function mxdebug( &$mx, $width = 5, $space = true) {	// formated matrix to stdout
$info = mxinfo( $mx);  foreach ( $info as $k => $v) $$k = $v;
echo "matrix info[" . htt( $info) . "]\n";
for ( $row = 0; $row < $rows; $row++) {
echo '   ';
for ( $col = 0; $col < $cols; $col++) {
$v = $mx[ $row][ $col];
if ( $v == ( int)$v) echo sprintf( ( $space ? ' ' : '') . '%' . $width . 'd', $v);
else echo sprintf( ( $space ? ' ' : '') . '%' . $width . 'f', $v);
}
echo "\n";
}

}

?><?php

// string readers and writers, writer can write multiple bytes into one string (unicode)
function breadbyte( $s) {	// returns interger of one byte or null
$v = @unpack( 'Cbyte', $s);
return isset( $v[ 'byte']) ? $v[ 'byte'] : null;
}
function breadbytes( $s, $count = 4) { 	// returns list of bytes, up to four -- if more, do integers or split smaller
$ks = ttl( 'one,two,three,four');
$def = ''; for ( $i = 0; $i < $count; $i++) $def .= 'C' . $ks[ $i];
$v = @unpack( $def, $s); if ( ! $v || ! is_array( $v)) return null;
return hv( $v);	// return list of values
}
function breadint( $s) { $v = @unpack( 'Inumber', $s); return isset( $v[ 'number']) ? $v[ 'number'] : null; }
// one can be an array, will create tw\o, three, etc. from it, but no more than 6 bytes
function bwritebytes( $one, $two = null, $three = null, $four = null, $five = null, $six = null) {
if ( is_array( $one)) {	// extract one,two,three,.... from array of one
$L = ttl( 'one,two,three,four,five,six'); while ( count( $L) > count( $one)) lpop( $L);
$h = array(); for ( $i = 0; $i < count( $L); $i++) $h[ $L[ $i]] = $one[ $i];
extract( $h);
}
if ( $two === null) return pack( "C", $one);
if ( $three === null) return pack( "CC", $one, $two);
if ( $four === null) return pack( "CCC", $one, $two, $three);
if ( $five === null) return pack( "CCCC", $one, $two, $three, $four);
if ( $six === null) return pack( "CCCCC", $one, $two, $three, $four, $five);
return pack( "CCCCCC", $one, $two, $three, $four, $five, $six);
}
function bwriteint( $n) { return pack( 'I', $n); } 	// back 4 bytes of integer into a binary string (also UTF-32)
function bintro( $n) { 	// binary reverse byte order of integer
return bmask( btail( $n >> 24, 8), 24, 8) + bmask( btail( $n >> 16, 8) << 8, 16, 8) + bmask( btail( $n >> 8, 8) << 16, 8, 8) + bmask( btail( $n, 8) << 24, 0, 8);
}


// slightly better binary writer
// header: variable number of bytes, bitstring is split into multiple of 8, first 3 bits contain the number of data points (up to 8, 0 is not an option)
//              total byte-length of header is: round( length.of.bitstring / 8, next.full.8)
//              code for each field: 000: null, 011: true, 100: 1 byte, 101: 2 bytes, 110: 3 bytes, 111: 4 bytes
//  h: { key: value, ...}, will look only at values (array===hash), order of keys should be managed by the writer
function bjamwrite( $out, $h, $donotwriteheader = false) { 	// write values from this hash (array is a kind of hash), returns header bytes
foreach ( $h as $k => $v) if ( is_numeric( $v)) $h[ $k] = ( int)$v;	// make sure all numbers are round\
$header = bjamheaderwrite( $out, $h, $donotwriteheader);
//die( '   header:' . json_encode( $header));
$count = btail( $header[ 0] >> 5, 3); $bs = bjamheader2bitstring( $header); $vs = hv( $h);
//die( "  bs[$bs]\n");
for ( $i = 0; $i < $count; $i++) {
$code = bjamstr2code( substr( $bs, 3 + 3 * $i, 3));
$count2 = $code - 4 + 1; if ( $count2 < 0) $count2 = 0;
for ( $ii = $count2 - 1; $ii >= 0; $ii--) bfilewritebyte( $out, btail( $vs[ $i] >> ( 8 * $ii), 8));	// if count2 = 0 (NULL), nothing is written
}
return $header;
}
function bjamread( $in, $header = null) { 	// read one set (with header) from the file, return list of values
if ( ! $header) $header = bjamheaderead( $in);
//die( " header[" . json_encode( $header) . "]\n");
$count = btail( $header[ 0] >> 5, 3); $bs = bjamheader2bitstring( $header); $vs = array();
//echo " count[$count] bs[$bs]";
for ( $i = 0; $i < $count; $i++) {
$code = bjamstr2code( substr( $bs, 3 + 3 * $i, 3));
if ( $code == 0) { lpush( $vs, null); continue; } // no actual data, deduct from flags
if ( $code == 3) { lpush( $vs, true); continue; }
$count2 = $code - 4 + 1; if ( $count2 < 0) $count2 = 0; $v = array();
for ( $ii = 0; $ii < $count2; $ii++) lpush( $v, bfilereadbyte( $in));
while ( count( $v) < 4) lunshift( $v, 0);
$v = bhead( $v[ 0] << 24, 8) | bmask( $v[ 1] << 16, 8, 8) | bmask( $v[ 2] << 8, 16, 8) | btail( $v[ 3], 8);
lpush( $vs, $v);
//echo "   code[$code] v[$v]";
}
//die( "\n");
return $vs;
}
function bjamheaderwrite( $out, $h, $donotwrite = false) { // returns [ byte1, byte2, byte3, ...] as many bytes as needed
$ks = hk( $h); while ( count( $ks) > 7) lpop( $ks);
$hs = bbitstring( count( $ks), 3);
foreach ( $ks as $k) $hs .= bbitstring( bjamint2code( $h[ $k]), 3);
//die( "   h[" . json_encode( $h) . "] hs[$hs]\n");
$bytes = array();
for ( $i = 0; $i < strlen( $hs); $i += 8) {
$byte = array(); for ( $ii = 0; $ii < 8; $ii++) lpush( $byte, ( $i + $ii < strlen( $hs)) ? ( substr( $hs, $i + $ii, 1) == '0' ? 0 : 1) : 0);
lpush( $bytes, bwarray2byte( $byte));
}
if ( $donotwrite) return $bytes;	// return header bytes without writing to file
foreach ( $bytes as $byte) bfilewritebyte( $out, $byte);
return $bytes;
}
function bjamheaderead( $in) { 	// returns [ byte1, byte2, byte3, ...]
$bytes = array( bfilereadbyte( $in));	// first byte
$count = btail( $bytes[ 0] >> 5, 3);	// count of items
$bitcount = 3 + 3 * $count;
$bytecount = $bitcount / 8; if ( $bytecount > ( int)$bytecount) $bytecount = 1 + ( int)$bytecount;
$bytecount = round( $bytecount);	// make it round just in case
for ( $i = 1; $i < $bytecount; $i++) lpush( $bytes, bfilereadbyte( $in));
return $bytes;
}
function bjamheader2bitstring( $bytes) { // returns '01011...' bitstring of the header, some bits at the end may be unused
$bs = '';
foreach ( $bytes as $byte) { $byte = bwbyte2array( $byte); foreach ( $byte as $bit) $bs .= $bit ? '1' : '0'; }
return $bs;
}
function bjamint2code( $v) { // returns 3-bit binary code for this (int) value
if ( $v === null || $v === false) return 0;	// 000
if ( $v === true) return 3;	// 011
$count = 1;
if ( btail( $v >> 8, 8)) $count = 2;
if ( btail( $v >> 16, 8)) $count = 3;
if ( btail( $v >> 24, 8)) $count = 4;
return 4 + ( $count - 1);  // between 100 and 111
}
function bjamstr2code( $s) { // converts 3-char string into a code
$byte = array(); for ( $i = 0; $i < 5; $i++) lpush( $byte, 0);
for ( $i = 0; $i < 3; $i++) lpush( $byte, substr( $s, $i, 1) == '0' ? 0 : 1);
return bwarray2byte( $byte);
}
function bjamcode2count( $code) { return $code >= 4 ? $code - 4 + 1 : 0; }
function bjamcount2code( $count) { return $count > 0 ? 4 + $count - 1 : 0; }


// for working with binary/hex info
function bfilereadint( $in) {
$s = fread( $in, 4);
return breadint( $s);
}
function bfilewriteint( $out, $v) {
$s = pack( "I", $v);
fwrite( $out, $s);
return $s;
}
function bfilereadbyte( $in) {	// return interger
$s = fread( $in, 1);
return breadbyte( $s);
}
function bfilewritebyte( $out, $v) {
fwrite( $out, bwritebytes( $v));
}
// optimial binary, to use only as few bytes as possible
function boptfilereadint( $in, $flags = null) { // return integer, if $flags = null, read byte with flags first
if ( $flags === null) $flags = bwbyte2array( bfilereadbyte( $in), true);	// as numbers
$count = 0;
if ( is_array( $flags)) for ( $i = 0; $i < count( $flags); $i++) $flags[ $i] = $flags[ $i] ? 1 : 0; // make sure those are numbers, not boolean values
if ( is_array( $flags) && count( $flags) > 2 && $flags[ 0] && $flags[ 1] && $flags[ 2]) $count = 4;
else if ( is_array( $flags)) $count = $flags[ 0] * 2 + $flags[ 1];
else $count = $flags;	// number of bytes to read can be passed as integer
$v = 0;
if ( $count > 0) $v = bfilereadbyte( $in);
if ( $count > 1) $v = bmask( bfilereadbyte( $in) << 8, 16, 8) | $v;
if ( $count > 2) $v = bmask( bfilereadbyte( $in) << 16, 8, 8) | $v;
if ( $count > 3) $v = bmask( bfilereadbyte( $in) << 24, 0, 8) | $v;
return $v;
}
function boptfilewriteint( $out, $v, $writeflags = true, $donotwrite = false, $count = null, $maxcount = 4) { // if writeflags=false, will return flags and will not write them
$flags = array();
// set flags first
$flags = array( false, false);
if ( ! $count) {	// calculate the count
$count = 0;
if ( btail( $v, 8) && $maxcount > 0) { $flags = array( false, true); $count = 1; }
if ( btail( $v >> 8, 8) && $maxcount > 1) { $flags = array( true, false); $count = 2; }
if ( btail( $v >> 16, 8) && $maxcount > 2) { $flags = array( true, true); $count = 3; }
if ( btail( $v >> 24, 8) && $maxcount > 3) { $flags = array( true, true, true); $count = 4; }
}
while ( count( $flags) < 8) lpush( $flags, false);	// fillter
if ( $donotwrite) return $flags;	// do not do the actual writing
if ( $writeflags) bfilewritebyte( $out, bwarray2byte( $flags));
// now write bytes of the number, do not write anything if zero size
if ( $count > 0) bfilewritebyte( $out, btail( $v, 8));
if ( $count > 1) bfilewritebyte( $out, btail( $v >> 8, 8));
if ( $count > 2) bfilewritebyte( $out, btail( $v >> 16, 8));
if ( $count > 3) bfilewritebyte( $out, btail( $v >> 24, 8));
return $flags;
}
// bitwise operations, flags to arrays and back
function bwbyte2array( $v, $asnumbers = false) { // returns array of flags
$L = array();
for ( $i = 0; $i < 8; $i++) {
lunshift( $L, ( $v & 0x01) ? ( $asnumbers ? 1 : true) : ( $asnumbers ? 0 : false));
$v = $v >> 1;
}
return $L;
}
function bwarray2byte( $flags) { // returns number representing the flags
$number = 0;
while ( count( $flags)) {
$number = $number << 1;
$flag = lshift( $flags);
if ( $flag) $number = $number | 0x01;
else $number = $number | 0x00;
}
return $number;
}
// integer variables
function bfullint() { return ( 0xFF << 24) + ( 0xFF << 16) + ( 0xFF << 8) + 0xFF; }
function bemptyint() { return ( 0x00 << 24) + ( 0x00 << 16) + ( 0x00 << 8) + 0x00; }
function b01( $pos, $length) { // return int where bit string has $length bits starting from pos
$v = 0x01;
for ( $i = 0; $i < $length - 1; $i++) $v = ( $v << 1) | 0x01;
for ( $i = 0; $i < ( 32 - $pos - $length); $i++) $v = ( ( $v << 1) | 0x01) ^ 0x01; // sometimes << bit shift in PHP results in 1 at the tail, this weird notation will work with or without this bug
return $v;
}
function bmask( $v, $pos, $length) { // returns value where only $length bits from $pos are left, and the rest are zero
$mask = b01( $pos, $length);
return $v & $mask;
}
function bhead( $v, $bits) { return bmask( $v, 0, $bits); }
function btail( $v, $bits) { return bmask( $v, 32 - $bits, $bits); }
function bbitstring( $number, $length = 32, $separatelength = 0) { 	// from end
$out = ''; $separator = $separatelength;
for ( $i = 0; $i < $length; $i++) {
$number2 = $number & 0x01;
if ( $number2) $out = "1$out";
else $out = "0$out";
$separator--; if ( $separator == 0 && $i < $length - 1) { $out = ".$out"; $separator = $separatelength; }
$number = $number >> 1;
}
return $out;
}

// converters
function bint2hex( $number) { return sprintf( "%X", $number); } // only integer types
function bint2bytestring( $number) { 	// returns string containing byte sequence from integer (from head to tail bits)
return bwritebytes( bmask( $number >> 24, 24, 8), bmask( $number >> 16, 24, 8), bmask( $number >> 8, 24, 8), bmask( $number, 24, 8));
}
function bbytestring2int( $s) {
$v = @unpack( 'Cone/Ctwo/Cthree/Cfour', $s);
extract( $v);
return bmask( $one << 24, 0, 8) | bmask( $two << 16, 8, 8) | bmask( $three << 8, 16, 8) | bmask( $four, 24, 8);
}
function bint2bytelist( $number, $count = 4) { $L = array(); for ( $i = 0; $i < $count; $i++) lunshift( $L, btail( $number >> ( 8 * $i), 8)); return $L; }


/** packets: specific binary format for writing packet trace information compactly  2012/03/31 moved to fin/fout calls
* the main idea: use boptfile but collect and store all flag bits separately (do not allow boptfile read/write bits from file)
* flags are collected into 2 first bytes in the following structure:
*   BYTE 0: (1) protocol, (7) length of the record
*   BYTE 1: (2) pspace, (2) sport, (2) dport, (2) psize
*  *** sip and dip are written in fixed 4 bytes and do not require flags
*/
function bpacketsinit( $filename) { return fopen( $filename, 'w'); } // noththing to do, just open the new file
function bpacketsopen( $filename) { return fopen( $filename, 'r'); } // binary safe
function bpacketsclose( $handle) { fclose( $handle); }
function bpacketswrite( $out, $h) { // h { pspace, sip, sport, dip, dport, psize, protocol}
$L = ttl( 'pspace,sip,sport,dip,dport,psize'); foreach ( $L as $k) $h[ $k] = ( int)$h[ $k]; // force values to integers
extract( $h);
$flags = array( 0, 0);
$flags[ 0] = $protocol == 'udp' ? 0x00 : bmask( 0xff, 24, 1);
// first, do the flag run
$size = 4;
$f = boptfilewriteint( null, $pspace, true, true, null, 3); // pspace  (max 3 bytes = 2 flag bits)
$v = bwarray2byte( $f); $flags[ 1] = $flags[ 1] | $v;
$size += ( $f[ 0] ? 2 : 0) + ( $f[ 1] ? 1 : 0);
$size += 4;	// sip
$f = boptfilewriteint( null, $sport, true, true, null, 3); // sport
$v = bwarray2byte( $f); $flags[ 1] = $flags[ 1] | ( $v >> 2);
$size += ( $f[ 0] ? 2 : 0) + ( $f[ 1] ? 1 : 0);
$size += 4;	// dip
$f = boptfilewriteint( null, $dport, true, true, null, 3); // dport
$v = bwarray2byte( $f); $flags[ 1] = $flags[ 1] | ( $v >> 4);
$size += ( $f[ 0] ? 2 : 0) + ( $f[ 1] ? 1 : 0);
$f = boptfilewriteint( null, $psize, true, true, null, 3); // psize
$v = bwarray2byte( $f); $flags[ 1] = $flags[ 1] | ( $v >> 6);
$size += ( $f[ 0] ? 2 : 0) + ( $f[ 1] ? 1 : 0);
// remember the length of the line
$flags[ 0] = $flags[ 0] | $size;
// now, write the actual data
bfilewritebyte( $out, $flags[ 0]);
bfilewritebyte( $out, $flags[ 1]);
boptfilewriteint( $out, $pspace, false, false, null, 3); // pspace
boptfilewriteint( $out, $sip, false, false, 4); // sip
boptfilewriteint( $out, $sport, false, false, null, 3); // sport
boptfilewriteint( $out, $dip, false, false, 4); // dip
boptfilewriteint( $out, $dport, false, false, null, 3); // dport
boptfilewriteint( $out, $psize, false, false, null, 3); // psize
}
function bpacketsread( $in) { // returns { pspace, sip, sport, dip, dport, psize, protocol}
if ( ! $in || feof( $in)) return null; // no data
$v = bfilereadbyte( $in); $f = bwbyte2array( $v, true);
$protocol = $f[ 0] ? 'tcp' : 'udp';	// protocol
$f[ 0] = 0;
$linelength = bwarray2byte( $f);	// line length
if ( ! $linelength) return null;	// no data
$h = array();
$h[ 'protocol'] = $protocol;
$v = bfilereadbyte( $in); $f = bwbyte2array( $v, true);
$h[ 'pspace'] = boptfilereadint( $in, array( $f[ 0], $f[ 1], 0, 0, 0, 0, 0, 0));
$h[ 'sip'] = boptfilereadint( $in, array( 1, 1, 1, 0, 0, 0, 0, 0));
$h[ 'sport'] = boptfilereadint( $in, array( $f[ 2], $f[ 3], 0, 0, 0, 0, 0));
$h[ 'dip'] = boptfilereadint( $in, array( 1, 1, 1, 0, 0, 0, 0, 0));
$h[ 'dport'] = boptfilereadint( $in, array( $f[ 4], $f[ 5], 0, 0, 0, 0, 0, 0));
$h[ 'psize'] = boptfilereadint( $in, array( $f[ 6], $f[ 7], 0, 0, 0, 0, 0, 0));
return $h;
}

/** flows: specific binary format for storing binary information about packet flows
* main idea: to use boptfile* optimizers but without writing flags with information, instead, flags are aggregated into structure below
*  BYTE 0: (1) protocol  (2) sport, (2) dport, (3) bytes
*  BYTE 1: (1) startimeus invert (if 1, 1000000 - value) (3) length of startimeus (1) durationus invert (3) length of durationus   000 means no value = BYTE 2 flags not set == value not written into file
*  BYTE 2: (2) packets, (2) startimeus (optional) (2) duration(s) (2) duration(us) (optional)  -- optionals depend on lengths in BYTE1
*  ** sip, dip, and startime(s) are written in 4 bytes and do not require flags (not compressed)
*/
function bflowsinit( $timeoutms, $filename) { // create new file, write timeout(ms) as first 2 bytes (65s max)s, return file handle
$out = fopen( $filename, 'w');
$timeout = ( int)$timeoutms;	// should not be biggeer than 65565s
bfilewritebyte( $out, btail( $timeout >> 8, 8));
bfilewritebyte( $out, btail( $timeout, 8));
return $out;
}
function bflowsopen( $filename) { 	// returns [ handler, timeout (ms)]
$in = fopen( $filename, 'r');
$timeout = bmask( bfilereadbyte( $in) << 8, 16, 8) + bfilereadbyte( $in);
return array( $in, $timeout);
}
function bflowsclose( $handle) { fclose( $handle); }
function bflowswrite( $out, $h, $debug = false) { // needs { sip, sport, dip, dport, bytes, packets, startime, lastime, protocol}
extract( $h); if ( ! isset( $protocol)) $protocol = 'tcp';
if ( $debug) echo "\n";
$flags = array( 0, 0, 0);	// flags
$flags[ 0] = $protocol == 'udp' ? 0x00 : bmask( 0xff, 24, 1);
$startime = round( $startime, 6);	// not more than 6 digits
$startimes = ( int)$startime;	// startimes
$startimeus = round( 1000000 * ( $startime - ( int)$startime)); if ( $startimeus > 999999) $startimeus = 999999;
while ( strlen( "$startimeus") < 6) $startimeus = "0$startimeus";
while ( strlen( "$startimeus") && substr( "$startimeus", strlen( $startimeus) - 1, 1) == '0') $startimeus = substr( $startimeus, 0, strlen( $startimeus) - 1);
$duration = round( $lastime - $startime, 6);
$durations = ( int)$duration; 	// durations
$durationus = round( 1000000 * ( $duration - ( int)$duration)); if ( $durationus > 999999) $durationus = 999999;
while ( strlen( "$durationus") < 6) $durationus = "0$durationus";
while ( strlen( "$durationus") && substr( "$durationus", strlen( $durationus) - 1, 1) == '0') $durationus = substr( $durationus, 0, strlen( $durationus) - 1);
if ( $debug) echo "bflowswrite() : setup : startimes[$startimes] startimeus[$startimeus]   durations[$durations] durationus[$durationus]\n";
// first, do the flag run
$f = boptfilewriteint( null, $sport, true, true, null, 3); // sport  (max 3 bytes = 2 flag bits)
$v = bwarray2byte( $f); $flags[ 0] = $flags[ 0] | ( $v >> 1);
$f = boptfilewriteint( null, $dport, true, true, null, 3); // dport
$v = bwarray2byte( $f); $flags[ 0] = $flags[ 0] | ( $v >> 3);
$f = boptfilewriteint( null, $bytes, true, true); // bytes -- this one can actually be 4 bytes = 3 flag bits
$v = bwarray2byte( $f); $flags[ 0] = $flags[ 0] | ( $v >> 5);
$f = boptfilewriteint( null, $packets, true, true, null, 3); // packets
$v = bwarray2byte( $f); $flags[ 2] = $flags[ 2] | $v;
if ( $debug) echo "bflowswrite() : startimeus : ";
$startimeus2 = null; if ( strlen( $startimeus)) {	// store us of startime (check which one is shorter)
$v = null; $v1 = ( int)$startimeus; $v2 = ( int)( 999999 - $v1);
if ( $debug) echo " v1[$v1] v2[$v2]";
if ( strlen( "$v1") <= strlen( "$v2")) $v = $v1;	// v1 is shorter, do not invert
else { $flags[ 1] = $flags[ 1] | bmask( 0xff, 24, 1); $v = $v2; }
$flags[ 1] = $flags[ 1] | bmask( strlen( $startimeus) << 4, 25, 3); // read length of value
if ( $debug) echo " v.before.write[$v]";
$f = boptfilewriteint( null, $v, true, true, null, 3); $flags[ 2] = $flags[ 2] | ( bwarray2byte( $f) >> 2);
$startimeus2 = $v;
if ( $debug) echo "  f[" . bbitstring( bwarray2byte( $f), 8) . "]   flags1[" . bbitstring( $flags[ 1], 8) . "] flags2[" . bbitstring( $flags[ 2], 8) . "]\n";
}
$f = boptfilewriteint( null, $durations, true, true, null, 3); // durations
$v = bwarray2byte( $f); $flags[ 2] = $flags[ 2] | ( $v >> 4);
$durationus2 = null; if ( strlen( $durationus)) {	// store duration
$v = null; $v1 = ( int)$durationus; $v2 = ( int)( 999999 - $v1);
if ( strlen( "$v1") <= strlen( "$v2")) $v = $v1;	// v1 is shorter, do not invert
else { $flags[ 1] = $flags[ 1] | ( bmask( 0xff, 24, 1) >> 4); $v = $v2; }
$flags[ 1] = $flags[ 1] | btail( strlen( $durationus), 3);
$f = boptfilewriteint( null, $v, true, true, null, 3); $flags[ 2] = $flags[ 2] | ( bwarray2byte( $f) >> 6);
$durationus2 = $v;
if ( $debug) echo "bflowswrite() : durationus : v1[$v1] v2[$v2] v[$v]   flags1[" . bbitstring( $flags[ 1], 8) . "] flags2[" . bbitstring( $flags[ 2], 8) . "]\n";
}
// now, write the actual data
bfilewritebyte( $out, $flags[ 0]);
bfilewritebyte( $out, $flags[ 1]);
bfilewritebyte( $out, $flags[ 2]);
if ( $debug) echo "bflowswrite() : flags : b1[" . bbitstring( $flags[ 0], 8) . "] b2[" . bbitstring( $flags[ 1], 8) . "] b3[" . bbitstring( $flags[ 2], 8) . "]\n";
boptfilewriteint( $out, $sip, false, false, 4);
boptfilewriteint( $out, $sport, false, false, null, 3);
boptfilewriteint( $out, $dip, false, false, 4);
boptfilewriteint( $out, $dport, false, false, null, 3);
boptfilewriteint( $out, $bytes, false);	// do not limit, allow 4 bytes of data
boptfilewriteint( $out, $packets, false, false, null, 3);
boptfilewriteint( $out, $startimes, false, false, 4);
if ( strlen( $startimeus)) boptfilewriteint( $out, $startimeus2, false, false, null, 3); // only if this is a none-zero string
boptfilewriteint( $out, $durations, false, false, null, 3);
if ( strlen( $durationus)) boptfilewriteint( $out, $durationus2, false, false, null, 3);
}
function bflowsread( $in, $debug = false) { // returns { sip,sport,dip,dport,bytes,packets,startime,lastime,protocol,duration}
if ( $debug) echo "\n\n";
if ( ! $in || feof( $in)) return null; // no data
$b1 = bfilereadbyte( $in); $f1 = bwbyte2array( $b1, true); // first byte of flags
$b2 = bfilereadbyte( $in); $f2 = bwbyte2array( $b2, true);	// second byte of flags
$b3 = bfilereadbyte( $in); $f3 = bwbyte2array( $b3, true);	// third byte of flags
if ( $debug) echo "bflowsread() : setup :   B1 " . bbitstring( $b1, 8) . "   B2 " . bbitstring( $b2, 8) . "   B3 " . bbitstring( $b3, 8) . "\n";
$h = tth( 'sip=?,sport=?,dip=?,dport=?,bytes=?,packets=?,startime=?,lastime=?,protocol=?,duration=?');	// empty at first
$h[ 'protocol'] = btail( $b1 >> 7, 1) ? 'tcp': 'udp';
$h[ 'sip'] = boptfilereadint( $in, 4);
$h[ 'sport'] = boptfilereadint( $in, btail( $b1 >> 5, 2));
$h[ 'dip'] = boptfilereadint( $in, 4);
$h[ 'dport'] = boptfilereadint( $in, btail( $b1 >> 3, 2));
$h[ 'bytes'] = boptfilereadint( $in, bwbyte2array( $b1 << 5));
$h[ 'packets'] = boptfilereadint( $in, btail( $b3 >> 6, 2));
// startime -- complex parsing logic
if ( $debug) echo "bflowsread() : startime : ";
$v = boptfilereadint( $in, 4); $v2 = btail( $b2 >> 4, 4); $v3 = '';
if ( $debug) echo " v2[$v2]";
if ( $v2) { // parse stuff after decimal point
$v3 = boptfilereadint( $in, btail( $b3 >> 4, 2));
if ( $debug) echo " v3[$v3]";
if ( btail( $v2 >> 3, 1)) $v3 = 999999 - $v3; // invert
if ( $debug) echo " v3[$v3]";
$v2 = btail( $v2, 3);
if ( $debug) echo " v2[$v2]";
while ( strlen( "$v3") < $v2) $v3 = "0$v3";
if ( $debug) echo " v3[$v3]";
}
if ( $debug) echo "   b2[" . bbitstring( $b2, 8) . "] b3[" . bbitstring( $b3, 8) . "]\n";
$h[ 'startime'] = ( double)( $v . ( $v3 ? ".$v3" : ''));
// duration us -- complex logic
if ( $debug) echo "bflowsread() : duration : ";
$v = boptfilereadint( $in, btail( $b3 >> 2, 2)); $v2 = btail( $b2, 4); $v3 = '';
if ( $debug) echo " v[$v] v2[$v2] v3[$v3]";
if ( $v2) { // parse stuff after decimal point
$v3 = boptfilereadint( $in, btail( $b3, 2));
if ( $debug) echo " v3[$v3]";
if ( btail( $v2 >> 3, 1)) $v3 = 999999 - $v3; // invert
if ( $debug) echo " v3[$v3]";
$v2 = btail( $v2, 3); while ( strlen( "$v3") < $v2) $v3 = "0$v3";
if ( $debug) echo " v3[$v3]";
}
if ( $debug) echo " v3[$v3]\n";
$h[ 'duration'] = ( double)( $v . ( $v3 ? ".$v3" : ''));
$h[ 'lastime'] = $h[ 'startime'] + $h[ 'duration'];
if ( $debug) echo "bflowsread() : finals : duration[" . $h[ 'duration'] . "] lastime[" . $h[ 'lastime'] . "]\n";
return $h;
}

?><?php
// these functions can be used for CURL
//   uses: (1) download web page, (2) download file, (3) upload file, etc.

// curl reader
function curlold( $url) {
$hs = array(
'Accept: text/html, text/plain, image/gif, image/x-bitmap, image/jpeg, image/pjpeg',
'Connection: Keep-Alive',
'Content-type: application/x-www-form-urlencoded;charset=UTF-8'
);
//$ua = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)';

$c = curl_init( $url);
curl_setopt( $c, CURLOPT_HTTPHEADER, $hs);
curl_setopt( $c, CURLOPT_HEADER, 0);
curl_setopt( $c, CURLOPT_USERAGENT, $ua);
curl_setopt( $c, CURLOPT_TIMEOUT, 5);
curl_setopt( $c, CURLOPT_RETURNTRANSFER, true);
$body = curl_exec( $c);
$limit = 5;
while ( ! $body && $limit--) {
usleep( 100000);
$body = @curl_exec( $c);
}
if ( $body === false) $body = '';
return trim( $body);
}
function curlsmart( $url) {
global $BDIR;
list( $status, $body) = mfetchWget( $url);
//die( $body);
//system( 'wget -UFirefox -O ' . $BDIR . '/temp.html "' . $url . '" > ' . $BDIR . '/temp.txt 2>&1 3>&1');
//`/bin/bash /Users/platypus/test.sh`;
//die( '');
//$body = '';
//$in = fopen( "$BDIR/temp.html", 'r'); while ( $in && ! feof( $in)) $body .= fgets( $in); fclose( $in);
return trim( $body);
}
function curlplain( $url) {
$in = @popen( 'curl "' . $url . '"');
$body = '';
while ( $in && ! feof( $in)) $body .= fgets( $in);
@pclose( $in);
}
function wgetplain( $url, $file = 'temp', $log = 'log') {
system( "wget -UFirefox " . '"' . $url . '"' . " -O $file -o $log");
$body = '';
$in = @fopen( $file, 'r');
while ( $in && ! feof( $in)) $body .= fgets( $in);
@fclose( $in);
return $body;
}
// syntax cleanup (cleans out scripts, styles, etc., everything unimportant for content)
function curlcleanup( $body, $bu, &$info) {
$bads = array(
'<script' => '<scriipt',
'</script' => '</scriipt',
'onload' => 'onloadd',
'onerror' => 'onerrror',
'document.' => 'documennt.',
'window.' => 'winddow.',
'.location' => '.loccation',
'<style' => '<sstyle',
'</style' => '</sstyle',
'<link' => '<llink',
'<object' => '<obbject',
'</object' => '</obbject',
'<embed' => '<embbed',
'</embed' => '</embbed',
'.js' => '.jjs',
'setTimeout(' => 'sedTimeout(',
'@import' => 'impport',
'url(' => 'yurl(',
'codebase' => 'ccodebase',
'http://counter.rambler.ru/' => ''
);
foreach ( $bads as $bad => $good) {
$body = str_replace( $bad, $good, $body);
$body = str_replace( strtoupper( $bad), $good, $body);
}
//$body = aggnCurlRidScript( $body, $info);
//$body = aggnCurlChangeUrl( $body, $bu, $info);
$info[ 'body'] = $body;
}


?><?php
// mfetch functions, runs lots of commands by over-UDP commands
// returns array( status, body|error, span), body='' on error, span is mfetch running time
function mfetchWget( $url, $proctag, $timeout = 5, $minsize = 200) {
global $BDIR;
if ( strlen( $url) > 700) return array( false, 'URL too long');
`rm $BDIR/temp.html`;
$c = 'wget -UFirefox -O ' . $BDIR . '/temp.html "' . $url . '" > ' . $BDIR . '/temp.txt 2>&1 3>&1';
//echo "mfetchWget()  c[$c]\n";
list( $status, $msg, $span) = mfetch( $c, "$BDIR/temp.html", $timeout);
//echo "mfetchWget()  status[$status] msg[$msg] span[$span]\n";
if ( ! $span) $span = -1;	// error time
$size = filesize( "$BDIR/temp.html");
if ( $size < $minsize) return array( false, 'mfetch feedback is too small, giving up');
// parse temp.html
$body = ''; $in = fopen( "$BDIR/temp.html", 'r'); while ( $in && ! feof( $in)) $body .= fgets( $in); fclose( $in);
return array( true, $body, $span);
}
// returns array( status, msg, [time]), where time is the remote mfetch running time
function mfetch( $command, $proctag = '', $wait = 0, $appdir = null, $pidfile = null, $timeout = 5, $MFETCHPORT = null) {
global $BIP, $BDIR, $MFETCHDIR;
// get mauthd env
if ( ! $MFETCHPORT) require_once( "$MFETCHDIR/mfetchport.php");
if ( ! $MFETCHPORT) return array( false, 'failed to read the port of mfetch deamon');
//echo "mfetch()  MFETCHPORT[$MFETCHPORT]\n";
$json = array();
$json[ 'command'] = $command;
$json[ 'proctag'] = $proctag;
$json[ 'wait'] = $wait;
if ( $appdir) $json[ 'appdir'] = $appdir;
if ( $pidfile) $json[ 'pidfile'] = $pidfile;
$buf = sprintf( "%1000s", h2json( $json, true));
//echo "mfetch()  command buf[$buf]\n";
if ( strlen( $buf) > 1000) return array( false, 'command is too long for mfetch');
$info = ntcptxopen( $BIP, $MFETCHPORT);
//echo "mfetch()  ntcptxopen.info[" . htt( $info) . "]\n";
if ( $info[ 'error']) return array( false, 'failed during comm(tx) to mfetch');
$sock = $info[ 'sock'];
//echo "mauth sock[$sock]\n";
$status = ntcptxstring( $sock, $buf, $timeout);
if ( ! $status) { @socket_shutdown( $sock); @sock_close( $sock); return array( false, 'failed during comm(rx) with mfetch'); }
$text = ntcprxstring( $sock, 150, $timeout + 1);
//echo "TEXT[" . base64_decode( $text) . "]\n";
if ( ! $text) { @socket_shutdown( $sock); @socket_close( $sock); return array( false, 'failed reading mfetch feedback'); }
$info = json2h( $text, true); if ( $info[ 'status']) return array( true, '', isset( $info[ 'time']) ? $info[ 'time']: null);
return array( false, 'failed to complete mfetch transaction', isset( $info[ 'time']) ? $info[ 'time'] : null);
}

?><?php
// library for various networking functions using php

// Wake on LAN
function nwakeonlan( $addr, $mac, $port = '7') { // port 7 seems to be default
flush();
$addr_byte = explode(':', $mac);
$hw_addr = '';
for ($a=0; $a <6; $a++) $hw_addr .= chr(hexdec($addr_byte[$a]));
$msg = chr(255).chr(255).chr(255).chr(255).chr(255).chr(255);
for ($a = 1; $a <= 16; $a++) $msg .= $hw_addr;
// send it to the broadcast address using UDP
// SQL_BROADCAST option isn't help!!
$s = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);
if ( $s == false) {
//echo "Error creating socket!\n";
//echo "Error code is '".socket_last_error($s)."' - " . socket_strerror(socket_last_error($s));
return FALSE;
}
else {
// setting a broadcast option to socket:
$opt_ret = 0;
$opt_ret = @socket_set_option( $s, 1, 6, TRUE);
if($opt_ret <0) {
//echo "setsockopt() failed, error: " . strerror($opt_ret) . "\n";
return FALSE;
}
if( socket_sendto($s, $msg, strlen( $msg), 0, $addr, $port)) {
//echo "Magic Packet sent successfully!";
socket_close($s);
return TRUE;
}
else {
echo "Magic packet failed!";
return FALSE;
}

}

}

class NTCPClient {
public $id;
public $sock;
public $lastime;
public $inbuffer = '';
public $outbuffer = '';
public $buffersize;
// hidden functions -- not part of the interface
public function __construct() { }
public function init( $rip = null, $rport = null, $id = null, $sock = null, $buffersize = 2048) {
$this->id = $id ? $id : uniqid();
if ( $sock) $this->sock = $sock;
else { 	// create new socket
$sock = socket_create( AF_INET, SOCK_STREAM, SOL_TCP) or die( "ERROR (NTCPClient): could not create a new socket.\n");
@socket_set_nonblock( $sock); $status = false;
$limit = 5; while ( $limit--) {
$status = @socket_connect( $sock, $rip, $rport);
if ( $status || socket_last_error() == SOCKET_EINPROGRESS) break;
usleep( 10000);
}
if ( ! $status && socket_last_error() != SOCKET_EINPROGRESS) die( "ERROR (NTCPServer): could not connect to the new socket.\n");
$this->sock = $sock;
}
$this->lastime = tsystem();
$this->buffersize = $buffersize;
}
public function recv() {
$buffer = '';
$status = @socket_recv( $this->sock, $buffer, $this->buffersize, 0);
//echo "buffer($buffer)\n";
if ( $status <= 0) return null;
$this->inbuffer .= substr( $buffer, 0, $status);
return $this->parse();
}
public function parse() {
$B =& $this->inbuffer;
//echo "B:$B\n";
if ( strpos( $B, 'FFFFF') !== 0) return;
$count = '';
for ( $pos = 5; $pos < 25 && ( $pos + 5 < strlen( $B)); $pos++) {
if ( substr( $B, $pos, 5) == 'FFFFF') { $count = substr( $B, 5, $pos - 5); break; }
}
if ( ! strlen( $count)) return;	// nothing to parse yet
if ( strlen( $B) < 5 * 2 + strlen( $count) + $count) return null;	// the data has not been collected yet
$h = json2h( substr( $B, 5 * 2 + strlen( $count), $count), true, null, true);
if ( strlen( $B) == 5 * 2 + strlen( $count) + $count) $B = '';
$B = substr( $B, 5 * 2 + strlen( $count) + $count);
return $h;
}
public function send( $h = null, $persist = false) { 	// will send bz64json( msg)
$B =& $this->outbuffer;
//echo "send: $B\n";
if ( $h !== null && is_string( $h)) $h = tth( $h);
if ( $h !== null) { $B = h2json( $h, true, null, null, true); $B = 'FFFFF' . strlen( $B) . 'FFFFF' . $B; }
$status = @socket_write( $this->sock, $B, strlen( $B) > $this->buffersize ? $buffersize : strlen( $B));
$B = substr( $B, $status);
if ( $B && $persist) return $this->send( null, true);
return $status;
}
public function isempty() { return $this->outbuffer ? false : true; }
public function close() { @socket_close( $this->sock); }
}
class NTCPServer {
public $port;
public $sock;
public $socks = array();
public $clients = array();
public $buffersize = 2048;
public $nonblock = true;
public $usleep = 10;
public $timeout;
public $clientclass;
public function __construct() {}
public function start( $port, $nonblock = false, $usleep = 0, $timeout = 300, $clientclass = 'NTCPClient') {
$this->port = $port;
$this->nonblock = $nonblock;
$this->clientclass = $clientclass;
$this->usleep = $usleep;
$this->timeout = $timeout;
$this->sock = socket_create( AF_INET, SOCK_STREAM, SOL_TCP)  or die( "ERROR (NTCPServer): failed to creater new socket.\n");
socket_set_option( $this->sock, SOL_SOCKET, SO_REUSEADDR, 1) or die( "ERROR (NTCPServer): socket_setopt() filed!\n");
if ( $nonblock) socket_set_nonblock( $this->sock);
$status = false; $limit = 5;
while ( $limit--) {
$status = @socket_bind( $this->sock, '0.0.0.0', $port);
if ( $status) break;
usleep( 10000);
}
if ( ! $status) die( "ERROR (NTCPServer): cound not bind the socket.\n");
socket_listen( $this->sock, 20) or die( "ERROR (NTCPServer): could not start listening to the socket.\n");
$this->socks = array( $this->sock);
while ( 1) { if ( $this->timetoquit()) break; foreach ( $this->socks as $sock) {
if ( $sock == $this->sock) { // main socket, check for new connections
$client = @socket_accept( $sock);
if ( $client) {
//echo "new client $client\n";
if ( $this->nonblock) @socket_set_nonblock( $client);
lpush( $this->socks, $client);
$client = new $this->clientclass();
$client->init( null, null, uniqid(), $client, $this->buffersize);
lpush( $this->clients, $client);
$this->newclient( $client);
}

}
else { // existing socket
$client = null;
foreach ( $this->clients as $client2) if ( $client2->sock = $sock) $client = $client2;
if ( tsystem() - $client->lastime > $this->timeout) {
$this->clientout( $client);
@socket_close( $client->sock);
$this->removeclient( $client);
continue;
}
if ( $client) $this->eachloop( $client);
if ( $client && strlen( $client->outbuffer)) { if ( $client->send()) $client->lastime = tsystem(); }
if ( $client) { $h = $client->recv(); if ( $h) { $this->receive( $h, $client); $client->lastime = tsystem(); }}
}
//echo "loop sock: $sock\n";
}; if ( $this->usleep) usleep( $this->usleep); }
socket_close( $this->sock);
}
public function clientout( $client) {
$L = array(); $L2 = array( $this->sock);
foreach ( $this->clients as $client2) if ( $client2->sock != $client->sock) { lpush( $L, $client2); lpush( $L2, $client2->sock); }
$this->clients = $L;
$this->socks = $L2;
}
// interface, should extend some of the functions, some may be left alone
public function timetoquit() { return false; }
public function newclient( $client) { }
public function removeclient( $client) { }
public function eachloop( $client) { }
public function send( $h, $client) { $client->send( $h); }
public function receive( $h, $client) { }

}

?><?php
// remote, either through web interface or CLI, returns json returned by the call
function rweb( $json) { // base64( json( type,wait,command,proctag,login,password,domainURL))
$h = json2h( $json, true);
foreach ( $h as $k => $v) $h[ $k] = trim( $v);
extract( $h);
//echo "rweb()  json extract OK\n";
// pre-check
if ( ! strlen( $login) || ! strlen( $password)) return array( 'status' => false, 'msg' => 'no mauth info');
if ( ! strlen( $command)) return array( 'status' => false, 'msg' => 'empty command');
//echo "rweb()  precheck PASS\n";
// run remote command
$url = $h[ 'url'];
unset( $h[ 'url']);
$json = h2json( $h, true);
$url .= "/actions.php?action=get&json=$json";	// hope it is not too long
//echo "URL: [$url]\n";
list( $status, $body) = @mfetchWget( $url, $proctag, 5, 2);
//echo "rweb()  feedback [$body]\n";
if ( $status) $json = @jsonparse( $body);
else $json = array( 'status' => false, 'msg' => 'unknown error occurred in process');
//echo "rweb()  returning...\n";
return $json;
}
function rcli( $json) {	// same, only CLI version
$h = json2h( $json, true);
foreach ( $h as $k => $v) $h[ $k] = trim( $v);
extract( $h);
// pre-check
if ( ! strlen( $login) || ! strlen( $password)) { $json = array( 'status' => false, 'msg' => 'no mauth info'); die( jsonsend( $json)); }
if ( ! strlen( $command)) { $json = array( 'status' => false, 'msg' => 'empty command'); die( jsonsend( $json)); }
// run remote command
$url = $h[ 'url'];
unset( $h[ 'url']);
$json = h2json( $h, true);
$url .= "/actions.php?action=get&json=$json";	// hope it is not too long
$json = @jsonparse( @wgetplain( $url, 5, 20));
if ( ! $json) $json = array( 'status' => false, 'msg' => 'unknown error occurred in process');
return $json;
}



?><?php

function fpathparse( $path, $ashash = true) { 	// returns [ (absolute) filepath (no slash), filename, fileroot (without path), filetype (extension)]
$L = ttl( $path, '/'); $L = ttl( lpop( $L), '.');
$type = llast( $L); if ( count( $L) > 1) lpop( $L);
$root = ltt( $L, '.');
$L = ttl( $path, '/', '', false);
if ( count( $L) === 1) return $ashash ? lth( array( getcwd(), $path, $root, $type), ttl( 'filepath,filename,fileroot,filetype')) : array( getcwd(), $path, $root, $type);	// plain filename in current directory
if ( ! strlen( $L[ 0])) { $filename = lpop( $L); return $ashash ? lth( array( ltt( $L, '/'), $filename, $root, $type), ttl( 'filepath,filename,fileroot,filetype')) : array( ltt( $L, '/'), $filename, $root, $type); }	// absolute path
// relative path
$cwd = getcwd(); $filename = lpop( $L); $path = ltt( $L, '/');
chdir( $path);	// should follow relative path as well
$path = getcwd(); chdir( $cwd);	// read cwd and go back
return $ashash ? lth( array( $path, $filename, $root, $type), ttl( 'filepath,filename,fileroot,filetype')) : array( $path, $filename, $root, $type);
}

function fbackup( $file, $move = false) { 	// will save a backup copy of this file as file.tsystem()s.random(10)
$suffix = sprintf( "%d.%d", ( int)tsystem(), mr( 10));
if ( $move) procpipe( "mv $file $file.$suffix");
else procpipe( "cp $file $file.$suffix");
}
function fbackups( $file) { 	// will find all backups for this file and return { suffix(times.random): filename}, will retain the path
$L = ttl( $file, '/', '', false); $file = lpop( $L); $path = ltt( $L, '/'); // if no path will be empty
$FL = flget( $path, $file); $h = array();
foreach ( $FL as $file2) {
if ( $file2 === $file || strlen( $file2) <= strlen( $file)) continue;
$suffix = str_replace( $file . '.', '', $file2);
$h[ "$suffix"] = $path ? "$path/$file2" : $file2;
}
return $h;
}

function ftempname( $ext = '', $prefix = '', $dir = '') { 	// dir can be '', file in form: [ prefix.] times . random( 10) . ext
$limit = 10;
while ( $limit--) {
$temp = ( $dir ? $dir . '/' : '') . ( $prefix ? $prefix . '.' : '') . ( int)tsystem() . '.' . mr( 10) . ( $ext ? '.' . $ext : '');
if ( ! is_file( $temp)) return $temp;
}
die( " ERROR! ftempname() failed to create a temp name\n");
}

// file reading mode with filesize involved
function finopen( $file) { 	// opens( read), reads file size, returns { in: handle, total(bytes),current(bytes),progress(%)}
$h = array();
$h[ 'total'] = filesize( $file);
$h[ 'current'] = 0;	// did not read any
$h[ 'count'] = 0; // count of lines
$h[ 'progress'] = '0%';
$h[ 'in'] = fopen( $file, 'r');
return $h;
}
function finread( &$h, $json = true, $base64 = true, $bzip2 = true) {	// returns array( line | hash | array(), 'x%' | null)
extract( $h); if ( ! $in || feof( $in)) return array( null, null, null); // empty array and null progress
$line = fgets( $in); if ( ! trim( $line)) return array( null, null, null); 	// empty line
$h[ 'count']++;
$h[ 'current'] += mb_strlen( $line);
$h[ 'progress'] = round( 100 * ( $h[ 'current'] / $h[ 'total'])) . '%';
if ( $json) return array( json2h( trim( $line), $base64, null, $bzip2), $h[ 'progress'], $h[ 'count']);
if ( $base64) $line = base64_decode( trim( $line));
if ( $bzip2) $line = bzdecompress( $line);
return array( $line, $h[ 'progress'], $h[ 'count']);
}
function finclose( &$h) { extract( $h); fclose( $in); }
function findone( &$h) { extract( $h); return ( ! $in) | feof( $in); }
// file writing mode with filesize involved
function foutopen( $file, $flag = 'w') { // returns { bytes, progress (easy to read kb,Mb format)}
$h = array();
$h[ 'bytes'] = 0; // count of written bytes
$h[ 'count'] = 0; // count of lines
$h[ 'progress'] = '0b';	// b, kb, Mb, Gb
$h[ 'out'] = fopen( $file, $flag);
return $h;
}
function foutwrite( &$h, $stuff, $json = true, $base64 = true, $bzip2 = true) {	// returns output filesize (b, kb, Mb, etc..)
if ( is_string( $stuff)) $stuff = tth( $stuff);
if ( $json) $stuff = h2json( $stuff, $base64, null, null, $bzip2);
else { // not an object, should be TEXT!, but can still base64 and bzip2 it
if ( $bzip2) $stuff = bzcompress( $stuff);
if ( $base64) $stuff = base64_encode( $stuff);
}
if ( mb_strlen( $stuff)) $h[ 'bytes'] += mb_strlen( $stuff);
$tail = ''; $progress = $h[ 'bytes'];
if ( $progress > 1000) { $progress = round( 0.001 * $progress); $tail = 'kb'; }
if ( $progress > 1000) { $progress = round( 0.001 * $progress); $tail = 'Mb'; }
if ( $progress > 1000) { $progress = round( 0.001 * $progress); $tail = 'Gb'; }
$h[ 'progress'] = $progress . $tail;
if ( mb_strlen( $stuff)) fwrite( $h[ 'out'], "$stuff\n");
return $h[ 'progress'];
}
function foutclose( &$h) { extract( $h); fclose( $out); }
// bjam reader, read only, write using bjam* in binary.php -- normally first value is time (inter-record space)
// each parser type is viewed in the order of values, where position in the order is used to select rules and make decisions
function fbjamopen( $file, $firstValueIsNotTime = false) {
$h = array();
if ( ! $firstValueIsNotTime) $h[ 'time'] = 0;
$h[ 'in'] = fopen( $file, 'r');
return $h;
}
function fbjamnext( $in, $logic, $filter = array()) {	// returns: hash | null   logic: hash | hash string,   filter: hash | hash string
if ( is_string( $filter)) $filter = tth( $filter);	// string hash
if ( is_string( $logic)) $logic = tth( $logic);
while ( $in[ 'in'] && ! feof( $in[ 'in'])) {
$L = bjamread( $in[ 'in']); if ( ! $L) return null;
if ( isset( $in[ 'time'])) $in[ 'time'] += 0.000001 * $L[ 0];	// move time if 'time' key exists
$h = array(); $good = true;
for ( $i = 0; $i < count( $logic) && $i < count( $L); $i++) {
$def = $logic[ $i];
if ( count( ttl( $def, ':')) === 1) { $h[ $def] = $L[ $i]; continue; }
// this is supposed to be a { id: string} map now
$k = lshift( ttl( $def, ':')); $v = lpop( ttl( $def, ':'));
$map = tth( $v);
if ( ! isset( $map[ $L[ $i]])) { $good = false; break; } // this record is outside of parsing logic
$h[ $k] = $map[ $L[ $i]];
}
if ( ! $good) continue;	// go to the next
foreach ( $filter as $k => $v) if ( ! isset( $h[ $k]) || $h[ $k] != $v) $good = false;
if ( ! $good) continue;
return $h;	// this data sample is fit, return it
}
return null;
}
function fbjamclose( &$h) { fclose( $h[ 'in']); }

?><?php
class DLLE { // one DLL entity, extend to define your own payload, do not change DLL part, but you can still access prev/next vars
// functionality, specific to DLL
public $prev = null;
public $next = null;
}
class DLL { 	// (E)ntity (L)ist, the DLL itself
// basic DLL structure and getters
public $count = 0;
public $head = null;
public $tail = null;
public function count() { return $this->count; }
public function head() { return $this->head; }
public function tail() { return $this->tail; }
// DLL functionality
public function push( $e) { // add new entry to the end of the DLL
if ( ! $this->head) { $this->head = $e; $this->tail = $e; $e->prev = null; $e->next = null; $this->count = 1; return; }	// first one
$a = $this->tail;
$a->next = $e; $e->prev = $a; $e->next = null; $this->tail = $e;
$this->count++;
}
public function pop() { 	// pop entry at DLL tail and returns it
if ( ! $this->tail) die( " ERROR! DLL.pop() Empty DLL!");	// nothing in DLL so far
$a = $this->tail; if ( ! $a->prev) { $this->head = null; $this->tail = null; $this->count = 0; $a->next = null; $a->prev = null; return $a; } // the last one
$b = $a->prev;
$b->next = null; $a->prev = null; $a->next = null; $this->tail = $b;
$this->count--; if ( $this->count < 0) die( " ERROR! DLL.pop() count < 0 (" . $this->count . ")\n");
return $a;
}
public function unshift( $e) { // adds new entry to the head of DLL
if ( ! $this->head) { $this->head = $e; $this->tail = $e; $e->prev = null; $e->next = null; $this->count = 1; return; } // first in DLL
$a = $this->head;
$a->prev = $e; $e->prev = null; $e->next = $a; $this->head = $e;
$this->count++;
}
public function shift() { // shifts head entry and returns it
if ( ! $this->head) die( " ERROR! DLL.shift() Empty DLL!"); 	// empty DLL
$a = $this->head; if ( ! $a->next) { $this->head = null; $this->tail = null; $this->count = 0; $a->prev = null; $a->next = null; return $a; } // last one
$b = $this->next;
$b->prev = null; $a->next = null; $a->prev = null; $this->head = $b;
$this->count--; if ( $this->count < 0) die( " ERROR! DLL.shift() count < 0 (" . $this->count . ")\n");
}
public function deset( $e) { // extracts this E from DLL (and close up the hole), E itself can continue its separate live
$a = $e->prev; $b = $e->next;
if ( ! $a && ! $b) { $this->head = null; $this->tail = null; $this->count = 0; return; }
if ( $a && $b) { $a->next = $b; $b->prev = $a; }	 // middle
if ( ! $a && $b) { $b->prev = null; $this->head = $b; }
if ( $a && ! $b) { $a->next = null; $this->tail = $a; }
$e->prev = null; $e->next = null;
$this->count--; if ( $this->count < 0) die( " ERROR! DLL.deset() count < 0 (" . $this->count . ")\n");
}
public function debug() { 	// debug/check the structure of this DLL
$e = $this->head; $count = 0;
while ( $e) { $count++; $e = $e->next; }
if ( $count != $this->count) die( " ERROR! DLL.debug() Bad data, count[" . $this->count . "] but actually found [$count]\n");
}

}

?><?php
// hashes objects (refs), each object should have id() function which should return object's id as array of bytes
// hashing is flexible in use of hash functions and length of key
// keys also are horizontal structures (collision control) of variable size
class HashTable {
public $h = array();	// hash table itself
public $count = 0;
public $hsize = 1;	// how many entries to allow for each key (collision avoidance)
public $length = 32;
public $type = 'CRC24';	// ending of crypt*** hashing function from crypt.php
public function __construct( $type, $length, $hsize) { $this->type = $type; $this->length = $length; $this->hsize = $hsize; }
public function count( $total = false) { return $total ? $this->count : count( $this->h); }
public function key( $id) { $k = 'crypt' . $this->type; return btail( $k( $id), $this->length); } // calculates hash key
public function get( $id, $key = null) { // returns [ object | NULL, cost of horizontal search]
if ( $key === null) $key = $this->key( $id);
if ( ! isset( $this->h[ $key])) return array( NULL, 0);
$L =& $this->h[ $key];
for ( $i = 0; $i < count( $L); $i++) if ( $L[ $i]->id() == $id) return array( $L[ $i], $i + 1);
return array( NULL, count( $L));
}
public function set( $e) {	// returns TRUE on success, FALSE otherwise
$k = $this->key( $e->id());
if ( ! isset( $this->h[ $k])) $this->h[ $k] = array();
if ( count( $this->h[ $k]) >= $this->hsize) return false; 	// collision cannot be resolved, quit on this entry
$this->count++; lpush( $this->h[ $k], $e);
return true;
}
public function remove( $e) { // returns hcost of lookup
$k = $this->key( $e->id());
if ( ! isset( $this->h[ $k])) die( " ERROR! HashTable:remove() key[$key] does not exist in HashTable\n");
$L = $this->h[ $k]; $L2 = array();
foreach ( $L as $e2) if ( $e->id() != $e2->id()) lpush( $L2, $e2);
$this->count -= count( $L) - count( $L2);
if ( ! count( $L2)) unset( $this->h[ $k]); else $this->h[ $k] = $L2;
return count( $L);
}

}

?><?php

// this lib is for queuing support
// NOTE: all queues (1) use time as key, (2) store time in multiple levels to simplify search
// NOTE2: all queus have the same interface:   put( $time, [$k], $v) and next() [ time, [ $k], $v]
// TYPE A: { time: value}
// TYPE B: { time: [ key, value]}
// features: (1) multiple { key: value} at the same time,  (2) can delete, update, and get reference to entries
class QTKV {  // QueueTimeKeyValue
public $s; // setup for time grain at each stage
public $topc = false;
public $c; // conditions per grain stage
public $count = 0;
public $q = array();
public function __construct( $setup) { // [ time1[, time2]] ex: [ 0.1, 0.01] -- setup can be array, or comma-string
if ( is_string( $setup)) $this->s = ttl( $setup);
else $this->s = $setup;
$this->c = array(); foreach ( $this->s as $grain) lpush( $this->c, array());
}
public function put( $time, $k, $v, $replaceifsmaller = true, $replaceifbigger = true) { // time can clash but keys in each time should be unique
$q =& $this->q;
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( ! $level) $this->topc = true;
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
htouch( $q, "$time");
htouch( $q[ "$time"], "$k", $v, $replaceifsmaller, $replaceifbigger);
$this->count++;
}
public function next() { // returns [ time, key, value], shifts the value from the queue
$q =& $this->q; if ( ! count( $q)) return array( null, null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null, null);
$k2 = hfirstk( $q); if ( ! count( $q[ "$k2"])) { unset( $q[ "$k2"]); unset( $this->c[ $level][ "$k2"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k2"])) { ksort( $q[ "$k2"], SORT_NUMERIC); unset( $this->c[ $level][ "$k2"]); }
$q =& $q[ "$k2"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->next(); }	// empty slot, remove and run again
list( $k, $v) = hshift( $q[ "$time"]);	if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->next();
$this->count--;
return array( $time, $k, $v);
}
public function peek() { // returns [ time, key, value], but does not shift the value
$q =& $this->q; if ( ! count( $q)) return array( null, null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null, null);
$k2 = hfirstk( $q); if ( ! count( $q[ "$k2"])) { unset( $q[ "$k2"]); unset( $this->c[ $level][ "$k2"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k2"])) { ksort( $q[ "$k2"], SORT_NUMERIC); unset( $this->c[ $level][ "$k2"]); }
$q =& $q[ "$k2"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->next(); }	// empty slot, remove and run again
list( $k, $v) = hfirst( $q[ "$time"]);	if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->next();
$this->count--;
return array( $time, $k, $v);
}
public function delete( $time, $k) {	// returns deleted value
$q =& $this->q;
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
$v = $q[ "$time"][ "$k"]; unset( $q[ "$time"][ "$k"]);
if ( ! count( $q[ "$time"])) unset( $q[ "$time"]);
$this->count--;
return $v;
}
public function update( $time, $k, $v) { // returns old value
$q =& $this->q;
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
$v = $q[ "$time"][ "$k"]; unset( $q[ "$time"][ "$k"]);
if ( ! count( $q[ "$time"])) unset( $q[ "$time"]);
return $v;
}
public function &ref( $time, $k) { // returns reference to current value
$q =& $this->q;
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
return $q[ "$time"][ "$k"];
}
public function count() { return $this->count; }
}
// features: simple put/next interface only, will allow multiple entries on the same time
class QTV {  // QueueTimeValue -- multiple entries for the same time are allowed
public $s; // setup for time grain at each stage
public $topc = false;
public $c; // conditions per grain stage
public $count = 0;
public $q = array();
public function __construct( $setup) { // [ time1[, time2]] ex: [ 0.1, 0.01] -- setup can be array, or comma-string
if ( is_string( $setup)) $this->s = ttl( $setup);
else $this->s = $setup;
$this->c = array(); foreach ( $this->s as $grain) lpush( $this->c, array());
}
public function put( $time, $v) { // time can clash but keys in each time should be unique
$q =& $this->q;
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( ! $level) $this->topc = true;
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
htouch( $q, "$time"); lpush( $q[ "$time"], $v);
$this->count++;
}
public function next() { // returns [ time, value], shifts the value from the queue
$q =& $this->q; if ( ! count( $q)) return array( null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null);
$k = hfirstk( $q); if ( ! count( $q[ "$k"])) { unset( $q[ "$k"]); unset( $this->c[ $level][ "$k"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k"])) { ksort( $q[ "$k"], SORT_NUMERIC); unset( $this->c[ $level][ "$k"]); }
$q =& $q[ "$k"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->next(); }	// empty slot, remove and run again
list( $k, $v) = hshift( $q[ "$time"]);	if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->next();
$this->count--;
return array( $time, $v);
}
public function peek() { // returns [ time, value], but does not shift the value
$q =& $this->q; if ( ! count( $q)) return array( null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null);
$k = hfirstk( $q); if ( ! count( $q[ "$k"])) { unset( $q[ "$k"]); unset( $this->c[ $level][ "$k"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k"])) { ksort( $q[ "$k"], SORT_NUMERIC); unset( $this->c[ $level][ "$k"]); }
$q =& $q[ "$k"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->next(); }	// empty slot, remove and run again
list( $k, $v) = hfirst( $q[ "$time"]);	if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->next();
$this->count--;
return array( $time, $v);
}
public function count() { return $this->count; }
}
// features: (1) gives ids to entries, implements id map and time, (2) connects between map and id, (3) flexible record structure per entry
// justification: good for packet, flow records, and other arrival processes
class QTVM {  // QueueTimeValue(plus)Map
public $s; // setup for time grain at each stage
public $topc = false;
public $c; // conditions per grain stage
public $count = 0;
public $id = 1;
public $q = array();
public $m = array();
public function __construct( $setup) { // [ time1[, time2]] ex: [ 0.1, 0.01] -- setup can be array, or comma-string
if ( is_string( $setup)) $this->s = ttl( $setup);
else $this->s = $setup;
$this->c = array(); foreach ( $this->s as $grain) lpush( $this->c, array());
}
public function put( $time, $v, $h = array()) { // returns id for this entry, will overwrite $h[ 'ref'] and $h[ 'ref2']
$q =& $this->q; $m =& $this->m;
if ( is_string( $h)) $h = tth( $h);
for ( $level = 0; $level < count( $this->s); $level++) {
$grain = $this->s[ $level];
$k2 = $grain * floor( $time / $grain);
$c = htouch( $q, "$k2");
if ( ! $level) $this->topc = true;
if ( $c) $this->c[ $level][ "$k2"] = true; // this key at this level is updated
$q =& $q[ "$k2"];
}
htouch( $q, "$time");
$id = $this->id++;
$q[ "$time"][ "$id"] = $v;
$m[ "$id"] = $h; $m[ "$id"][ 'ref'] =& $q[ "$time"][ "$id"]; $m[ "$id"][ 'ref2'] = $time; // reference
$this->count++;
return $id;
}
public function next() { // returns [ time, value, id, h]
$q =& $this->q; $m =& $this->m;
if ( ! count( $q)) return array( null, null, null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null, null, null);
$k = hfirstk( $q); if ( ! count( $q[ "$k"])) { unset( $q[ "$k"]); unset( $this->c[ $level][ "$k"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k"])) { ksort( $q[ "$k"], SORT_NUMERIC); unset( $this->c[ $level][ "$k"]); }
$q =& $q[ "$k"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->next(); }	// empty slot, remove and run again
list( $id, $v) = hshift( $q[ "$time"]); if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->next();
$h  = $m[ "$id"]; unset( $m[ "$id"]); unset( $h[ 'ref']); unset( $h[ 'ref2']); $this->count--;
return array( $time, $v, $id, $h);
}
public function peek() { // returns [ time, value, id, h]
$q =& $this->q; $m =& $this->m;
if ( ! count( $q)) return array( null, null, null, null);
if ( $this->topc) { ksort( $q, SORT_NUMERIC); $this->topc = false; } // ksort top level
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null, null, null);
$k = hfirstk( $q); if ( ! count( $q[ "$k"])) { unset( $q[ "$k"]); unset( $this->c[ $level][ "$k"]); return $this->peek(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level][ "$k"])) { ksort( $q[ "$k"], SORT_NUMERIC); unset( $this->c[ $level][ "$k"]); }
$q =& $q[ "$k"];
}
// the last level, time then keys
$time = hfirstk( $q); if ( ! count( $q[ "$time"])) { unset( $q[ "$time"]); return $this->peek(); }	// empty slot, remove and run again
list( $id, $v) = hfirst( $q[ "$time"]); if ( ! count( $q[ "$time"])) unset( $q[ "$time"]); // shift key and value under this time
if ( $v === null) return $this->peek();
$h  = $m[ "$id"]; unset( $h[ 'ref']); unset( $h[ 'ref2']);
return array( $time, $v, $id, $h);
}
public function extract( $id) { // returns [ time, value, hash] for that id
$q =& $this->q; $m =& $this->m;
$h = $m[ "$id"]; $v = $h[ 'ref']; $time = $h[ 'ref2']; unset( $m[ "$id"]); unset( $h[ 'ref']); unset( $h[ 'ref2']);
for ( $level = 0; $level < count( $this->s); $level++) { // all levels but last
if ( ! count( $q)) return array( null, null, null);
$k = hfirstk( $q); if ( ! count( $q[ "$k"])) { unset( $q[ "$k"]); unset( $this->c[ $level + 1][ "$k"]); return $this->next(); }	// empty slot, remove and run again
if ( isset( $this->c[ $level + 1][ "$k"])) { ksort( $q[ "$k"], SORT_NUMERIC); unset( $this->c[ $level + 1][ "$k"]); }
$q =& $q[ "$k"];
}
unset( $q[ "$time"][ "$id"]); if ( ! count( $q[ "$time"])) unset( $q[ "$time"]);
$this->count--;
return array( $time, $v, $h);
}
public function delete( $id) {	// returns [ time, v, h]
$q =& $this->q; $m =& $this->m;
$v = $m[ "$id"][ 'ref']; $time = $m[ "$id"][ 'ref2']; // value
$h = $m[ "$id"]; unset( $h[ 'ref']); unset( $h[ 'ref2']);  unset( $m[ "$id"]);
$this->count--;
return array( $time, $v, $h);
}
public function update( $id, $k, $v) { $m =& $this->m; $m[ "$k"] = $v; }  // not payload value, but info key: value
public function &ref( $id) {  return $this->m[ "$id"][ 'ref']; }
public function &idref( $id) { return $this->m[ "$id"]; }
public function map2hash( $mapk = null, $infok = null) { // if $mapk != null, will hash by key, not by id,   if infok!=null, will only use that info key as value
$h = array(); foreach ( $this->m as $id => $h2) {
$k = $mapk ? $h2[ $mapk] : $id;
$v = $infok ? $h2[ $infok] : $h2;
$h[ "$k"] = $v;
}
return $h;
}
public function map2list( $infok = null) { // if infok!=null, will only use that info key as value
$L = array(); foreach ( $this->m as $id => $h2) lpush( $L, $infok ? $h2[ $infok] : $h2);
return $L;
}
public function count() { return $this->count; }
}


?><?php

// Genetic Algorithm optimization
class GA {
public $e = null;
public $e2 = null;
public $allstop = false;
public $verbosity = 0;
public $genecount;
public $chrocount;
public $genes; // each gene should consist of multiple chromosomes
public $digits = 3;
//
// EXTEND these functions
//
public function fitness( $g) { return 0; }
public function isvalid( $g) { return false; }
public function makechromosome( &$g, $pos) { return null; } 	// used by mutation function, should be extended in children classess!s
public function generationreport( $generation, $evals) { }	// extend if you need a report on each generation

// TO DO TOUCH these functions
// optimize == maximize,   if you need minimize, return 1 / fitness() in extended function
public function optimize( $genecount, $chrocount, $crossover = 0.5, $mutation = 0.5, $creation = 0.2, $untouchables = 3, $generations = 1000, $digits = 6, $verbosity = 1) { // returns [ bests, evals]   bests: best score succession, evals: last evals
$this->verbosity = $verbosity;
if ( $verbosity > 0) $this->e = echoeinit();
$this->digits = $digits;
$this->genecount = $genecount;
$this->chrocount = $chrocount;
$evals = array(); $before = tsystem();
$this->makegenes( $genecount, $chrocount);
for ( $i = 0; $i < $generations; $i++) {
if ( $this->e) $this->e2 = echoeinit();
// first, find untouchbles and put them into top array
$top = array();
if ( count( $evals)) arsort( $evals, SORT_NUMERIC);
if ( count( $evals)) for ( $ii = 0; $ii < $untouchables; $ii++) { list( $pos, $fitness) = hshift( $evals); $top[ $pos] = $fitness; }
$top2 = array(); foreach ( $top as $k => $v) $top2[ $k] = round( $v, $this->digits);
if ( $this->e) echoe( $this->e, "GA gen " . ( $i + 1) . " of $generations  top(" . htt( $top2) . ")");
// run this generation, keep untouchables in top
$evals = $this->generation( $evals, $crossover, $mutation, $creation, $top);
if ( $this->allstop) return array( null, null); // aborted
if ( $this->e2) echoe( $this->e2, "  evals:" . ltt( hv( mstats( hv( $evals), $digits)), '/'));
if ( $this->verbosity == 2) echo " OK\n";
$this->generationreport( $i, $evals);
}
// all done, return evals
return array( $this->genes, $evals);
}
public function generation( $evals, $crossover = 0.5, $mutation = 0.5, $creation = 0.2, $top = null) { // returns new list of fitness values
if ( ! $top) $top = array();
if ( ! count( $evals)) { for ( $i = 0; $i < count( $this->genes); $i++) if ( ! isset( $top[ $i])) $evals[ $i] = null; }
$this->check( $evals);
// ids: list of gene ids, subject to crossover and mutation
$ids = array(); for ( $i = 0; $i < count( $this->genes); $i++) if ( ! isset( $top[ $i])) lpush( $ids, $i);
// crossovers
$howmany = round( $crossover * count( $ids));
while ( $howmany > 0) {
$id1 = lr( $ids); $id2 = lr( $ids); if ( $id1 == $id2) continue;	// random ids, same id not allowed
list( $c1, $c2, $diff) = $this->crossover( $this->genes[ $id1], $this->genes[ $id2]);
if ( $this->e2) echoe( $this->e2, "   crossover($howmany): $id1 <> $id2 (" . ( $diff >= 0 ? '+' : '') . round( $diff, $this->digits) . ")");
if ( isset( $top[ $id1])) $id1 = mmax( hk( $this->genes)) + 1;
if ( isset( $top[ $id2])) $id2 = mmax( hk( $this->genes)) + 1;
$this->genes[ $id1] = $c1; $evals[ $id1] = null;
$this->genes[ $id2] = $c2; $evals[ $id2] = null;
$howmany--;
}
// mutations
$howmany = round( $mutation * count( $ids));
while ( $howmany > 0) {
$id = lr( $ids); if ( isset( $top[ $id])) continue;	// should not mutate one of the top
list( $c, $diff) = $this->mutation( $this->genes[ $id]);
if ( $this->e2) echoe( $this->e2, "   mutation($howmany): $id (" . ( $diff >= 0 ? '+' : '') . round( $diff, $this->digits) . ")");
$this->genes[ $id] = $c;
$evals[ $id] = null;
$howmany--;
}
// fill in unknown evals
if ( $this->e2) echoe( $this->e2, "   check");
// new genes
foreach ( $top as $id => $fitness) $evals[ $id] = $fitness;
arsort( $evals, SORT_NUMERIC);
$howmany = round( $creation * count( $evals));
for ( $i = 0; $i < $howmany; $i++) { list( $id, $fitness) = hpop( $evals); }
while ( count( $evals) < $this->genecount) { // repopulate with new genes
$id = mmax( hk( $this->genes)) + 1;
$this->genes[ $id] = $this->makegene( $this->chrocount);
$evals[ $id] = $this->fitness( $this->genes[ $id]);	// beware that fitness can abort the process
if ( $this->allstop) return $evals; // aborted
if ( $this->e2) echoe( $this->e2, "   creation(" . count( $evals) . '<' . $this->genecount . '): ' . round( $evals[ $id], $this->digits));
}
// remap evals to cleanup and straighten up
arsort( $evals, SORT_NUMERIC);
$ks = hk( $evals); $vs = hv( $evals); $genes = $this->genes; $evals = array();  $this->genes = array();
for ( $i = 0; $i < count( $ks); $i++) { $evals[ $i] = $vs[ $i]; $this->genes[ $i] = $genes[ $ks[ $i]]; }
return $evals;
}
public function makegene( $chrocount) {
$limit = 1000; $g = null;
while ( $limit--) {
$g = array();
for ( $i = 0; $i < $chrocount; $i++) $this->makechromosome( $g, $i);
$good = true; foreach ( $g as $chrom) if ( $chrom === null) die( " optimization.php/GA Error: NULL chromosome in gene, will not continute.\n");
if ( $this->isvalid( $g)) break;
}
return $g;	// successful gene
}
public function makegenes( $genecount, $chrocount) {
$this->genes = array();
for ( $i = 0; $i < $genecount; $i++) {
lpush( $this->genes, $this->makegene( $chrocount));
if ( $this->e2) echoe( $this->e2, "initial population: " . count( $this->genes) . ' < ' . $genecount);
}

}
public function crossover( $p1, $p2) { // returns array( $c1, $c2, $diff), c: child, diff: different between best fitness before and after
$point = mt_rand( 1, count( $p1) - 2);
$one = $p1; $two = $p2;
if ( count( $p1) != count( $p2)) die( " GA ERROR! crossover()  genes are of different size! " . count( $p1) . "  " . count( $p2) . "\n");
$three = array(); for ( $i = 0; $i < count( $p1); $i++) lpush( $three, $i <= $point ? $p1[ $i] : $p2[ $i]);
if ( ! $this->isvalid( $three)) $three = null;	// bad child
$four = array(); for ( $i = 0; $i < count( $p1); $i++) lpush( $four, $i <= $point ? $p2[ $i] : $p1[ $i]);
if ( ! $this->isvalid( $four)) $four = null;	// bad child
$evals = array(); foreach ( ttl( 'one,two,three,four') as $k) $evals[ $k] = $$k ? $this->fitness( $$k) : null;
$before = mmax( array( $evals[ 'one'], $evals[ 'two'])); $after = mmax( hv( $evals));
arsort( $evals, SORT_NUMERIC);
list( $k1, $v1) = hshift( $evals);	// best of four
list( $k2, $v2) = hshift( $evals);	// second best of four
return array( $$k1, $$k2, $after - $before);
}
public function mutation( $p) { // returns array( $c, $diff), c: child, diff: fitnext after - fitness before
$before = $this->fitness( $p);
$pos = mt_rand( 0, count( $p) - 1);
$c = $p; $this->makechromosome( $c, $pos);	// create a new chromosome for this gene
if ( ! $this->isvalid( $c)) $c = $p;	// mutation failed
$after = $this->fitness( $c);
return array( $c, $after - $before);
}
public function check( &$evals) { foreach ( $evals as $id => $fitness) {
if ( $fitness === null) $evals[ $id] = $this->fitness( $this->genes[ $id]);
if ( $this->allstop) return; // aborted
if ( $this->e2) echoe( $this->e2, "   fitness:$id(" . round( $evals[ $id], $this->digits) . ")");
}}
public function abort() { $this->allstop = true; }
}

?><?php
/** Copyright (c) 2012, Adam Alexander
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of PHP WebSockets nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
class WebSocketUser {
public $socket;
public $id;
public $headers = array();
public $handshake = false;
public $handlingPartialPacket = false;
public $partialBuffer = "";
public $sendingContinuous = false;
public $partialMessage = "";
public $hasSentClose = false;
// streaming support
public $in = null;
public $pos;
public $blocksize;
public $step;
public $lastpos;
public $lastime = 0;
function __construct($id,$socket) { $this->id = $id; $this->socket = $socket; }
}
// simple server, all sockets are blocking
abstract class WebSocketServer {
protected $userClass = 'WebSocketUser'; // redefine this if you want a custom user class.  The custom user class should inherit from WebSocketUser.
protected $maxBufferSize;
protected $master;
protected $sockets                              = array();
protected $users                                = array();
protected $interactive                          = true;
protected $headerOriginRequired                 = false;
protected $headerSecWebSocketProtocolRequired   = false;
protected $headerSecWebSocketExtensionsRequired = false;

function __construct($addr, $port, $bufferLength = 2048) {
$this->maxBufferSize = $bufferLength;
$this->master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)  or die("Failed: socket_create()");
socket_set_option($this->master, SOL_SOCKET, SO_REUSEADDR, 1) or die("Failed: socket_option()");
socket_bind($this->master, $addr, $port)                      or die("Failed: socket_bind()");
socket_listen($this->master,20)                               or die("Failed: socket_listen()");
$this->sockets[] = $this->master;
$this->stdout("Server started\nListening on: $addr:$port\nMaster socket: ".$this->master);
while( true) {
if ( empty($this->sockets)) {
$this->sockets[] = $master;
}
$read = $this->sockets;
$write = $except = null;
@socket_select($read,$write,$except,null);
foreach ($read as $socket) {
if ($socket == $this->master) {
$client = socket_accept($socket);
if ($client < 0) {
$this->stderr("Failed: socket_accept()");
continue;
} else {
$this->connect($client);
}
} else {
$numBytes = @socket_recv($socket,$buffer,$this->maxBufferSize,0); // todo: if($numBytes === false) { error handling } elseif ($numBytes === 0) { remote client disconected }
if ($numBytes == 0) {
$this->disconnect($socket);
} else {
$user = $this->getUserBySocket($socket);
if (!$user->handshake) {
$this->doHandshake($user,$buffer);
} else {
if ($message = $this->deframe($buffer, $user)) {
$this->process($user, mb_convert_encoding($message, 'UTF-8'));
if($user->hasSentClose) {
$this->disconnect($user->socket);
}
} else {
do {
$numByte = @socket_recv($socket,$buffer,$this->maxBufferSize,MSG_PEEK);
if ($numByte > 0) {
$numByte = @socket_recv($socket,$buffer,$this->maxBufferSize,0);
if ($message = $this->deframe($buffer,$user)) {
$this->process($user,$message);
if($user->hasSentClose) {
$this->disconnect($user->socket);
}
}
}
} while($numByte > 0);
}
}
}
}
}
}

}

abstract protected function process($user,$message); // Calked immediately when the data is recieved.
abstract protected function connected($user);        // Called after the handshake response is sent to the client.
abstract protected function closed($user);           // Called after the connection is closed.

protected function connecting($user) {
// Override to handle a connecting user, after the instance of the User is created, but before
// the handshake has completed.
}

protected function send($user,$message,$type='text') {
//$this->stdout("> $message");
$message = $this->frame($message,$user, $type);
socket_write($user->socket,$message,strlen($message));
}

protected function connect($socket) {
$user = new $this->userClass(uniqid(),$socket);
array_push($this->users,$user);
array_push($this->sockets,$socket);
$this->connecting($user);
}

protected function disconnect($socket,$triggerClosed=true) {
$foundUser = null;
$foundSocket = null;
foreach ($this->users as $key => $user) {
if ($user->socket == $socket) {
$foundUser = $key;
$disconnectedUser = $user;
break;
}
}
if ($foundUser !== null) {
unset($this->users[$foundUser]);
$this->users = array_values($this->users);
}
foreach ($this->sockets as $key => $sock) {
if ($sock == $socket) {
$foundSocket = $key;
break;
}
}
if ($foundSocket !== null) {
unset($this->sockets[$foundSocket]);
$this->sockets = array_values($this->sockets);
}
if ($triggerClosed) {
$this->closed($disconnectedUser);
}
}

protected function doHandshake($user, $buffer) {
$magicGUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
$headers = array();
$lines = explode("\n",$buffer);
foreach ($lines as $line) {
if (strpos($line,":") !== false) {
$header = explode(":",$line,2);
$headers[strtolower(trim($header[0]))] = trim($header[1]);
} else if (stripos($line,"get ") !== false) {
preg_match("/GET (.*) HTTP/i", $buffer, $reqResource);
$headers['get'] = trim($reqResource[1]);
}
}
if (isset($headers['get'])) {
$user->requestedResource = $headers['get'];
} else {
// todo: fail the connection
$handshakeResponse = "HTTP/1.1 405 Method Not Allowed\r\n\r\n";
}
if (!isset($headers['host']) || !$this->checkHost($headers['host'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['upgrade']) || strtolower($headers['upgrade']) != 'websocket') {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['connection']) || strpos(strtolower($headers['connection']), 'upgrade') === FALSE) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['sec-websocket-key'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
} else {

}
if (!isset($headers['sec-websocket-version']) || strtolower($headers['sec-websocket-version']) != 13) {
$handshakeResponse = "HTTP/1.1 426 Upgrade Required\r\nSec-WebSocketVersion: 13";
}
if (($this->headerOriginRequired && !isset($headers['origin']) ) || ($this->headerOriginRequired && !$this->checkOrigin($headers['origin']))) {
$handshakeResponse = "HTTP/1.1 403 Forbidden";
}
if (($this->headerSecWebSocketProtocolRequired && !isset($headers['sec-websocket-protocol'])) || ($this->headerSecWebSocketProtocolRequired && !$this->checkWebsocProtocol($header['sec-websocket-protocol']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (($this->headerSecWebSocketExtensionsRequired && !isset($headers['sec-websocket-extensions'])) || ($this->headerSecWebSocketExtensionsRequired && !$this->checkWebsocExtensions($header['sec-websocket-extensions']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}

// Done verifying the _required_ headers and optionally required headers.

if (isset($handshakeResponse)) {
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->disconnect($user->socket);
return false;
}

$user->headers = $headers;
$user->handshake = $buffer;

$webSocketKeyHash = sha1($headers['sec-websocket-key'] . $magicGUID);

$rawToken = "";
for ($i = 0; $i < 20; $i++) {
$rawToken .= chr(hexdec(substr($webSocketKeyHash,$i*2, 2)));
}
$handshakeToken = base64_encode($rawToken) . "\r\n";

$subProtocol = (isset($headers['sec-websocket-protocol'])) ? $this->processProtocol($headers['sec-websocket-protocol']) : "";
$extensions = (isset($headers['sec-websocket-extensions'])) ? $this->processExtensions($headers['sec-websocket-extensions']) : "";

$handshakeResponse = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: $handshakeToken$subProtocol$extensions\r\n";
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->connected($user);
}

protected function checkHost($hostName) {
return true; // Override and return false if the host is not one that you would expect.
// Ex: You only want to accept hosts from the my-domain.com domain,
// but you receive a host from malicious-site.com instead.
}

protected function checkOrigin($origin) {
return true; // Override and return false if the origin is not one that you would expect.
}

protected function checkWebsocProtocol($protocol) {
return true; // Override and return false if a protocol is not found that you would expect.
}

protected function checkWebsocExtensions($extensions) {
return true; // Override and return false if an extension is not found that you would expect.
}

protected function processProtocol($protocol) {
return ""; // return either "Sec-WebSocket-Protocol: SelectedProtocolFromClientList\r\n" or return an empty string.
// The carriage return/newline combo must appear at the end of a non-empty string, and must not
// appear at the beginning of the string nor in an otherwise empty string, or it will be considered part of
// the response body, which will trigger an error in the client as it will not be formatted correctly.
}

protected function processExtensions($extensions) {
return ""; // return either "Sec-WebSocket-Extensions: SelectedExtensions\r\n" or return an empty string.
}

protected function getUserBySocket($socket) {
foreach ($this->users as $user) {
if ($user->socket == $socket) {
return $user;
}
}
return null;
}

protected function stdout($message) {
if ($this->interactive) {
echo "$message\n";
}
}

protected function stderr($message) {
if ($this->interactive) {
echo "$message\n";
}
}

protected function frame($message, $user, $messageType='text', $messageContinues=false) {
switch ($messageType) {
case 'continuous':
$b1 = 0;
break;
case 'text':
$b1 = ($user->sendingContinuous) ? 0 : 1;
break;
case 'binary':
$b1 = ($user->sendingContinuous) ? 0 : 2;
break;
case 'close':
$b1 = 8;
break;
case 'ping':
$b1 = 9;
break;
case 'pong':
$b1 = 10;
break;
}
if ($messageContinues) {
$user->sendingContinuous = true;
} else {
$b1 += 128;
$user->sendingContinuous = false;
}

$length = strlen($message);
$lengthField = "";
if ($length < 126) {
$b2 = $length;
} elseif ($length <= 65536) {
$b2 = 126;
$hexLength = dechex($length);
//$this->stdout("Hex Length: $hexLength");
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 2) {
$lengthField = chr(0) . $lengthField;
}
} else {
$b2 = 127;
$hexLength = dechex($length);
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 8) {
$lengthField = chr(0) . $lengthField;
}
}

return chr($b1) . chr($b2) . $lengthField . $message;
}

protected function deframe($message, $user) {
//echo $this->strtohex($message);
$headers = $this->extractHeaders($message);
$pongReply = false;
$willClose = false;
switch($headers['opcode']) {
case 0:
case 1:
case 2:
break;
case 8:
// todo: close the connection
$user->hasSentClose = true;
return "";
case 9:
$pongReply = true;
case 10:
break;
default:
//$this->disconnect($user); // todo: fail connection
$willClose = true;
break;
}

if ($user->handlingPartialPacket) {
$message = $user->partialBuffer . $message;
$user->handlingPartialPacket = false;
return $this->deframe($message, $user);
}

if ($this->checkRSVBits($headers,$user)) {
return false;
}

if ($willClose) {
// todo: fail the connection
return false;
}

$payload = $user->partialMessage . $this->extractPayload($message,$headers);

if ($pongReply) {
$reply = $this->frame($payload,$user,'pong');
socket_write($user->socket,$reply,strlen($reply));
return false;
}
if (extension_loaded('mbstring')) {
if ($headers['length'] > mb_strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
} else {
if ($headers['length'] > strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
}

$payload = $this->applyMask($headers,$payload);

if ($headers['fin']) {
$user->partialMessage = "";
return $payload;
}
$user->partialMessage = $payload;
return false;
}

protected function extractHeaders($message) {
$header = array('fin'     => $message[0] & chr(128),
'rsv1'    => $message[0] & chr(64),
'rsv2'    => $message[0] & chr(32),
'rsv3'    => $message[0] & chr(16),
'opcode'  => ord($message[0]) & 15,
'hasmask' => $message[1] & chr(128),
'length'  => 0,
'mask'    => "");
$header['length'] = (ord($message[1]) >= 128) ? ord($message[1]) - 128 : ord($message[1]);

if ($header['length'] == 126) {
if ($header['hasmask']) {
$header['mask'] = $message[4] . $message[5] . $message[6] . $message[7];
}
$header['length'] = ord($message[2]) * 256
+ ord($message[3]);
} elseif ($header['length'] == 127) {
if ($header['hasmask']) {
$header['mask'] = $message[10] . $message[11] . $message[12] . $message[13];
}
$header['length'] = ord($message[2]) * 65536 * 65536 * 65536 * 256
+ ord($message[3]) * 65536 * 65536 * 65536
+ ord($message[4]) * 65536 * 65536 * 256
+ ord($message[5]) * 65536 * 65536
+ ord($message[6]) * 65536 * 256
+ ord($message[7]) * 65536
+ ord($message[8]) * 256
+ ord($message[9]);
} elseif ($header['hasmask']) {
$header['mask'] = $message[2] . $message[3] . $message[4] . $message[5];
}
//echo $this->strtohex($message);
//$this->printHeaders($header);
return $header;
}

protected function extractPayload($message,$headers) {
$offset = 2;
if ($headers['hasmask']) {
$offset += 4;
}
if ($headers['length'] > 65535) {
$offset += 8;
} elseif ($headers['length'] > 125) {
$offset += 2;
}
return substr($message,$offset);
}

protected function applyMask($headers,$payload) {
$effectiveMask = "";
if ($headers['hasmask']) {
$mask = $headers['mask'];
} else {
return $payload;
}

while (strlen($effectiveMask) < strlen($payload)) {
$effectiveMask .= $mask;
}
while (strlen($effectiveMask) > strlen($payload)) {
$effectiveMask = substr($effectiveMask,0,-1);
}
return $effectiveMask ^ $payload;
}
protected function checkRSVBits($headers,$user) { // override this method if you are using an extension where the RSV bits are used.
if (ord($headers['rsv1']) + ord($headers['rsv2']) + ord($headers['rsv3']) > 0) {
//$this->disconnect($user); // todo: fail connection
return true;
}
return false;
}

protected function strtohex($str) {
$strout = "";
for ($i = 0; $i < strlen($str); $i++) {
$strout .= (ord($str[$i])<16) ? "0" . dechex(ord($str[$i])) : dechex(ord($str[$i]));
$strout .= " ";
if ($i%32 == 7) {
$strout .= ": ";
}
if ($i%32 == 15) {
$strout .= ": ";
}
if ($i%32 == 23) {
$strout .= ": ";
}
if ($i%32 == 31) {
$strout .= "\n";
}
}
return $strout . "\n";
}

protected function printHeaders($headers) {
echo "Array\n(\n";
foreach ($headers as $key => $value) {
if ($key == 'length' || $key == 'opcode') {
echo "\t[$key] => $value\n\n";
} else {
echo "\t[$key] => ".$this->strtohex($value)."\n";

}

}
echo ")\n";
}
}
// streaming server, all sockets are non-blocking
abstract class WebSocketServerStreaming {
protected $userClass = 'WebSocketUser'; // redefine this if you want a custom user class.  The custom user class should inherit from WebSocketUser.
protected $maxBufferSize;
protected $master;
protected $sockets                              = array();
protected $users                                = array();
protected $interactive                          = true;
protected $headerOriginRequired                 = false;
protected $headerSecWebSocketProtocolRequired   = false;
protected $headerSecWebSocketExtensionsRequired = false;
function __construct($addr, $port, $bufferLength = 2048) {
$this->maxBufferSize = $bufferLength;
$this->master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)  or die("Failed: socket_create()");
socket_set_option($this->master, SOL_SOCKET, SO_REUSEADDR, 1) or die("Failed: socket_option()");
socket_set_nonblock( $this->master);
socket_bind($this->master, $addr, $port)                      or die("Failed: socket_bind()");
socket_listen($this->master,20)                               or die("Failed: socket_listen()");
$this->sockets[] = $this->master;
$this->stdout("Server started\nListening on: $addr:$port\nMaster socket: ".$this->master);
while( true) {
if ( empty( $this->sockets)) $this->sockets[] = $master;
$read = $this->sockets;
$write = $except = null;
//@socket_select( $read, $write, $except, 0);
foreach ( $read as $socket) {
//echo "B1 sock($socket)\n";
// call round robin for existing users
if ( $socket != $this->master) {
//echo "B2 sock($socket)\n";
$user = $this->getUserBySocket( $socket);
if ( $user->handshake && $user->in) { if ( ! $this->tx( $user)) { $this->disconnect( $user->socket); continue; } }
}
//echo "B3\n";
// check for new sockets
if ( $socket == $this->master) {
//echo "B4\n";
$client = @socket_accept( $socket);
if ( $client <= 0) continue;
socket_set_nonblock( $client);
$this->connect( $client);
}
else {
//echo "B5\n";
$numBytes = @socket_recv( $socket, $buffer, $this->maxBufferSize,0); // todo: if($numBytes === false) { error handling } elseif ($numBytes === 0) { remote client disconected }
if ( $numBytes <= 0) continue;
$user = $this->getUserBySocket( $socket);
if ( ! $user->handshake) { $this->doHandshake($user,$buffer); continue; }
if ( $message = $this->deframe( $buffer, $user)) {
//echo "B6\n";
$this->rx( $user, mb_convert_encoding( $message, 'UTF-8'));
//echo "B6b\n";
if ( $user->hasSentClose) $this->disconnect( $user->socket);
//echo "B6c\n";
continue;
}
//echo "Bpre7\n";
do {
//echo "socket.rx\n";
//echo "B7\n";
$numByte = @socket_recv($socket,$buffer,$this->maxBufferSize,MSG_PEEK);
if ( $numByte > 0) {
//echo "B8a\n";
$numByte = @socket_recv( $socket, $buffer, $this->maxBufferSize, 0);
if ( $message = $this->deframe( $buffer, $user)) {
//echo "B8b\n";
$this->rx( $user, $message);
if ( $user->hasSentClose) $this->disconnect($user->socket);
}

}

} while( $numByte > 0);

}

}

}

}
abstract protected function rx( $user, $message); // Calked immediately when the data is recieved.
abstract protected function tx( $user); // Calked immediately when the data is recieved.
abstract protected function connected($user);        // Called after the handshake response is sent to the client.
abstract protected function closed($user);           // Called after the connection is closed.

protected function connecting($user) {
// Override to handle a connecting user, after the instance of the User is created, but before
// the handshake has completed.
}

protected function send( $user, $message, $type = 'text') {
//$this->stdout("> $message");
$message = $this->frame( $message, $user, $type);
while ( strlen( $message)) {
$bytes = @socket_write( $user->socket, $message, strlen( $message));
$message = substr( $message, $bytes);
}

}

protected function connect($socket) {
$user = new $this->userClass(uniqid(),$socket);
array_push($this->users,$user);
array_push($this->sockets,$socket);
$this->connecting($user);
}

protected function disconnect($socket,$triggerClosed=true) {
$foundUser = null;
$foundSocket = null;
$disconnectedUser = false;
foreach ($this->users as $key => $user) {
if ($user->socket == $socket) {
$foundUser = $key;
$disconnectedUser = $user;
break;
}
}
if ($foundUser !== null) {
unset($this->users[$foundUser]);
$this->users = array_values($this->users);
}
foreach ($this->sockets as $key => $sock) {
if ($sock == $socket) {
$foundSocket = $key;
break;
}
}
if ($foundSocket !== null) {
unset($this->sockets[$foundSocket]);
$this->sockets = array_values($this->sockets);
}
if ($triggerClosed && $disconnectedUser) $this->closed($disconnectedUser);
}

protected function doHandshake($user, $buffer) {
$magicGUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
$headers = array();
$lines = explode("\n",$buffer);
foreach ($lines as $line) {
if (strpos($line,":") !== false) {
$header = explode(":",$line,2);
$headers[strtolower(trim($header[0]))] = trim($header[1]);
} else if (stripos($line,"get ") !== false) {
preg_match("/GET (.*) HTTP/i", $buffer, $reqResource);
$headers['get'] = trim($reqResource[1]);
}
}
if (isset($headers['get'])) {
$user->requestedResource = $headers['get'];
} else {
// todo: fail the connection
$handshakeResponse = "HTTP/1.1 405 Method Not Allowed\r\n\r\n";
}
if (!isset($headers['host']) || !$this->checkHost($headers['host'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['upgrade']) || strtolower($headers['upgrade']) != 'websocket') {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['connection']) || strpos(strtolower($headers['connection']), 'upgrade') === FALSE) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['sec-websocket-key'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
} else {

}
if (!isset($headers['sec-websocket-version']) || strtolower($headers['sec-websocket-version']) != 13) {
$handshakeResponse = "HTTP/1.1 426 Upgrade Required\r\nSec-WebSocketVersion: 13";
}
if (($this->headerOriginRequired && !isset($headers['origin']) ) || ($this->headerOriginRequired && !$this->checkOrigin($headers['origin']))) {
$handshakeResponse = "HTTP/1.1 403 Forbidden";
}
if (($this->headerSecWebSocketProtocolRequired && !isset($headers['sec-websocket-protocol'])) || ($this->headerSecWebSocketProtocolRequired && !$this->checkWebsocProtocol($header['sec-websocket-protocol']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (($this->headerSecWebSocketExtensionsRequired && !isset($headers['sec-websocket-extensions'])) || ($this->headerSecWebSocketExtensionsRequired && !$this->checkWebsocExtensions($header['sec-websocket-extensions']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}

// Done verifying the _required_ headers and optionally required headers.

if (isset($handshakeResponse)) {
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->disconnect($user->socket);
return false;
}

$user->headers = $headers;
$user->handshake = $buffer;

$webSocketKeyHash = sha1($headers['sec-websocket-key'] . $magicGUID);

$rawToken = "";
for ($i = 0; $i < 20; $i++) {
$rawToken .= chr(hexdec(substr($webSocketKeyHash,$i*2, 2)));
}
$handshakeToken = base64_encode($rawToken) . "\r\n";

$subProtocol = (isset($headers['sec-websocket-protocol'])) ? $this->processProtocol($headers['sec-websocket-protocol']) : "";
$extensions = (isset($headers['sec-websocket-extensions'])) ? $this->processExtensions($headers['sec-websocket-extensions']) : "";

$handshakeResponse = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: $handshakeToken$subProtocol$extensions\r\n";
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->connected($user);
}

protected function checkHost($hostName) {
return true; // Override and return false if the host is not one that you would expect.
// Ex: You only want to accept hosts from the my-domain.com domain,
// but you receive a host from malicious-site.com instead.
}

protected function checkOrigin($origin) {
return true; // Override and return false if the origin is not one that you would expect.
}

protected function checkWebsocProtocol($protocol) {
return true; // Override and return false if a protocol is not found that you would expect.
}

protected function checkWebsocExtensions($extensions) {
return true; // Override and return false if an extension is not found that you would expect.
}

protected function processProtocol($protocol) {
return ""; // return either "Sec-WebSocket-Protocol: SelectedProtocolFromClientList\r\n" or return an empty string.
// The carriage return/newline combo must appear at the end of a non-empty string, and must not
// appear at the beginning of the string nor in an otherwise empty string, or it will be considered part of
// the response body, which will trigger an error in the client as it will not be formatted correctly.
}

protected function processExtensions($extensions) {
return ""; // return either "Sec-WebSocket-Extensions: SelectedExtensions\r\n" or return an empty string.
}

protected function getUserBySocket($socket) {
foreach ($this->users as $user) {
if ($user->socket == $socket) {
return $user;
}
}
return null;
}

protected function stdout($message) {
if ($this->interactive) {
echo "$message\n";
}
}

protected function stderr($message) {
if ($this->interactive) {
echo "$message\n";
}
}

protected function frame($message, $user, $messageType='text', $messageContinues=false) {
switch ($messageType) {
case 'continuous':
$b1 = 0;
break;
case 'text':
$b1 = ($user->sendingContinuous) ? 0 : 1;
break;
case 'binary':
$b1 = ($user->sendingContinuous) ? 0 : 2;
break;
case 'close':
$b1 = 8;
break;
case 'ping':
$b1 = 9;
break;
case 'pong':
$b1 = 10;
break;
}
if ($messageContinues) {
$user->sendingContinuous = true;
} else {
$b1 += 128;
$user->sendingContinuous = false;
}

$length = strlen($message);
$lengthField = "";
if ($length < 126) {
$b2 = $length;
} elseif ($length <= 65536) {
$b2 = 126;
$hexLength = dechex($length);
//$this->stdout("Hex Length: $hexLength");
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 2) {
$lengthField = chr(0) . $lengthField;
}
} else {
$b2 = 127;
$hexLength = dechex($length);
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 8) {
$lengthField = chr(0) . $lengthField;
}
}

return chr($b1) . chr($b2) . $lengthField . $message;
}

protected function deframe($message, $user) {
//echo $this->strtohex($message);
$headers = $this->extractHeaders($message);
$pongReply = false;
$willClose = false;
switch($headers['opcode']) {
case 0:
case 1:
case 2:
break;
case 8:
// todo: close the connection
$user->hasSentClose = true;
return "";
case 9:
$pongReply = true;
case 10:
break;
default:
//$this->disconnect($user); // todo: fail connection
$willClose = true;
break;
}

if ($user->handlingPartialPacket) {
$message = $user->partialBuffer . $message;
$user->handlingPartialPacket = false;
return $this->deframe($message, $user);
}

if ($this->checkRSVBits($headers,$user)) {
return false;
}

if ($willClose) {
// todo: fail the connection
return false;
}

$payload = $user->partialMessage . $this->extractPayload($message,$headers);

if ($pongReply) {
$reply = $this->frame($payload,$user,'pong');
socket_write($user->socket,$reply,strlen($reply));
return false;
}
if (extension_loaded('mbstring')) {
if ($headers['length'] > mb_strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
} else {
if ($headers['length'] > strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
}

$payload = $this->applyMask($headers,$payload);

if ($headers['fin']) {
$user->partialMessage = "";
return $payload;
}
$user->partialMessage = $payload;
return false;
}

protected function extractHeaders($message) {
$header = array('fin'     => $message[0] & chr(128),
'rsv1'    => $message[0] & chr(64),
'rsv2'    => $message[0] & chr(32),
'rsv3'    => $message[0] & chr(16),
'opcode'  => ord($message[0]) & 15,
'hasmask' => $message[1] & chr(128),
'length'  => 0,
'mask'    => "");
$header['length'] = (ord($message[1]) >= 128) ? ord($message[1]) - 128 : ord($message[1]);

if ($header['length'] == 126) {
if ($header['hasmask']) {
$header['mask'] = $message[4] . $message[5] . $message[6] . $message[7];
}
$header['length'] = ord($message[2]) * 256
+ ord($message[3]);
} elseif ($header['length'] == 127) {
if ($header['hasmask']) {
$header['mask'] = $message[10] . $message[11] . $message[12] . $message[13];
}
$header['length'] = ord($message[2]) * 65536 * 65536 * 65536 * 256
+ ord($message[3]) * 65536 * 65536 * 65536
+ ord($message[4]) * 65536 * 65536 * 256
+ ord($message[5]) * 65536 * 65536
+ ord($message[6]) * 65536 * 256
+ ord($message[7]) * 65536
+ ord($message[8]) * 256
+ ord($message[9]);
} elseif ($header['hasmask']) {
$header['mask'] = $message[2] . $message[3] . $message[4] . $message[5];
}
//echo $this->strtohex($message);
//$this->printHeaders($header);
return $header;
}

protected function extractPayload($message,$headers) {
$offset = 2;
if ($headers['hasmask']) {
$offset += 4;
}
if ($headers['length'] > 65535) {
$offset += 8;
} elseif ($headers['length'] > 125) {
$offset += 2;
}
return substr($message,$offset);
}

protected function applyMask($headers,$payload) {
$effectiveMask = "";
if ($headers['hasmask']) {
$mask = $headers['mask'];
} else {
return $payload;
}

while (strlen($effectiveMask) < strlen($payload)) {
$effectiveMask .= $mask;
}
while (strlen($effectiveMask) > strlen($payload)) {
$effectiveMask = substr($effectiveMask,0,-1);
}
return $effectiveMask ^ $payload;
}
protected function checkRSVBits($headers,$user) { // override this method if you are using an extension where the RSV bits are used.
if (ord($headers['rsv1']) + ord($headers['rsv2']) + ord($headers['rsv3']) > 0) {
//$this->disconnect($user); // todo: fail connection
return true;
}
return false;
}

protected function strtohex($str) {
$strout = "";
for ($i = 0; $i < strlen($str); $i++) {
$strout .= (ord($str[$i])<16) ? "0" . dechex(ord($str[$i])) : dechex(ord($str[$i]));
$strout .= " ";
if ($i%32 == 7) {
$strout .= ": ";
}
if ($i%32 == 15) {
$strout .= ": ";
}
if ($i%32 == 23) {
$strout .= ": ";
}
if ($i%32 == 31) {
$strout .= "\n";
}
}
return $strout . "\n";
}

protected function printHeaders($headers) {
echo "Array\n(\n";
foreach ($headers as $key => $value) {
if ($key == 'length' || $key == 'opcode') {
echo "\t[$key] => $value\n\n";
} else {
echo "\t[$key] => ".$this->strtohex($value)."\n";

}

}
echo ")\n";
}
}
// streaming server, all sockets are non-blocking
abstract class WebSocketServerStreamingWithFork {
protected $userClass = 'WebSocketUser'; // redefine this if you want a custom user class.  The custom user class should inherit from WebSocketUser.
protected $maxBufferSize;
protected $timeout = 300;
protected $master;
protected $sockets                              = array();
protected $users                                = array();
protected $interactive                          = true;
protected $headerOriginRequired                 = false;
protected $headerSecWebSocketProtocolRequired   = false;
protected $headerSecWebSocketExtensionsRequired = false;
function __construct( $addr, $port, $bufferLength = 2048, $timeout = 300) {
$this->maxBufferSize = $bufferLength;
$this->timeout = $timeout;
$this->master = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)  or die("Failed: socket_create()");
socket_set_option($this->master, SOL_SOCKET, SO_REUSEADDR, 1) or die("Failed: socket_option()");
socket_set_nonblock( $this->master);
socket_bind($this->master, $addr, $port)                      or die("Failed: socket_bind()");
socket_listen($this->master,20)                               or die("Failed: socket_listen()");
$this->sockets[] = $this->master;
echo "Server started\nListening on: $addr:$port\nMaster socket: " . $this->master . "\n";
$client = null;
while( true) {
usleep( 10000);
echo ' .';
$client = @socket_accept( $this->master);
if ( $client <= 0) continue;
echo " fork!";
// new client, fork!
$pid = pcntl_fork();
if ( $pid == -1) continue; 	// fork failed
if ( $pid == 0) break;	// client sockets served outside the while
}
// serve the client
$socket = $client;
socket_set_nonblock( $socket);
$user = new $this->userClass( uniqid(), $socket);
$this->connecting( $user); // notify class extension that a new client has entered
// do the handshake
$limit = 10; $status = -1; $msg = '';
while (  $limit--) {
$status = @socket_recv( $socket, $msg, $this->maxBufferSize, 0); // todo: if($numBytes === false) { error handling } elseif ($numBytes === 0) { remote client disconected }
if ( $status > 0) break;
usleep( 10000);
}
if ( ! $statuw) die( " Failed to get handshake from the other side!\n");
$this->doHandshake( $user, $msg); // sends reply to the handshake
$user->lastime = tsystem();	// for timeout
while( tsystem() - $user->lastime < $this->timeout) {	// 5min timeout on inactivity
if ( $this->tx( $user)) $user->lastime = tsystem();
$status = @socket_recv( $socket, $msg, $this->maxBufferSize, 0);
if ( $status <= 0) continue;
$msg = $this->deframe( $msg, $user);
$this->rx( $user, mb_convert_encoding( $msg, 'UTF-8'));
$user->lastime = tsystem();
}
// disconnect client socket
@socket_close( $socket);
$this->closed( $user); unset( $user);
die( " Done\n");
}
abstract protected function rx( $user, $message); // Calked immediately when the data is recieved.
abstract protected function tx( $user); // Calked immediately when the data is recieved.
abstract protected function connected( $user);        // Called after the handshake response is sent to the client.
abstract protected function closed($user);           // Called after the connection is closed.
protected function connecting( $user) {
// Override to handle a connecting user, after the instance of the User is created, but before
// the handshake has completed.
}
protected function send( $user, $message, $type = 'text') {
//$this->stdout("> $message");
$message = $this->frame( $message, $user, $type);
while ( strlen( $message)) {
$bytes = @socket_write( $user->socket, $message, strlen( $message));
$message = substr( $message, $bytes);
}

}
protected function disconnect( $socket,$triggerClosed=true) {
$foundUser = null;
$foundSocket = null;
$disconnectedUser = false;
foreach ($this->users as $key => $user) {
if ($user->socket == $socket) {
$foundUser = $key;
$disconnectedUser = $user;
break;
}
}
if ($foundUser !== null) {
unset($this->users[$foundUser]);
$this->users = array_values($this->users);
}
foreach ($this->sockets as $key => $sock) {
if ($sock == $socket) {
$foundSocket = $key;
break;
}
}
if ($foundSocket !== null) {
unset($this->sockets[$foundSocket]);
$this->sockets = array_values($this->sockets);
}
if ($triggerClosed && $disconnectedUser) $this->closed($disconnectedUser);
}
protected function doHandshake($user, $buffer) {
$magicGUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
$headers = array();
$lines = explode("\n",$buffer);
foreach ($lines as $line) {
if (strpos($line,":") !== false) {
$header = explode(":",$line,2);
$headers[strtolower(trim($header[0]))] = trim($header[1]);
} else if (stripos($line,"get ") !== false) {
preg_match("/GET (.*) HTTP/i", $buffer, $reqResource);
$headers['get'] = trim($reqResource[1]);
}
}
if (isset($headers['get'])) {
$user->requestedResource = $headers['get'];
} else {
// todo: fail the connection
$handshakeResponse = "HTTP/1.1 405 Method Not Allowed\r\n\r\n";
}
if (!isset($headers['host']) || !$this->checkHost($headers['host'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['upgrade']) || strtolower($headers['upgrade']) != 'websocket') {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['connection']) || strpos(strtolower($headers['connection']), 'upgrade') === FALSE) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (!isset($headers['sec-websocket-key'])) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
} else {

}
if (!isset($headers['sec-websocket-version']) || strtolower($headers['sec-websocket-version']) != 13) {
$handshakeResponse = "HTTP/1.1 426 Upgrade Required\r\nSec-WebSocketVersion: 13";
}
if (($this->headerOriginRequired && !isset($headers['origin']) ) || ($this->headerOriginRequired && !$this->checkOrigin($headers['origin']))) {
$handshakeResponse = "HTTP/1.1 403 Forbidden";
}
if (($this->headerSecWebSocketProtocolRequired && !isset($headers['sec-websocket-protocol'])) || ($this->headerSecWebSocketProtocolRequired && !$this->checkWebsocProtocol($header['sec-websocket-protocol']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}
if (($this->headerSecWebSocketExtensionsRequired && !isset($headers['sec-websocket-extensions'])) || ($this->headerSecWebSocketExtensionsRequired && !$this->checkWebsocExtensions($header['sec-websocket-extensions']))) {
$handshakeResponse = "HTTP/1.1 400 Bad Request";
}

// Done verifying the _required_ headers and optionally required headers.

if (isset($handshakeResponse)) {
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->disconnect($user->socket);
return false;
}

$user->headers = $headers;
$user->handshake = $buffer;

$webSocketKeyHash = sha1($headers['sec-websocket-key'] . $magicGUID);

$rawToken = "";
for ($i = 0; $i < 20; $i++) {
$rawToken .= chr(hexdec(substr($webSocketKeyHash,$i*2, 2)));
}
$handshakeToken = base64_encode($rawToken) . "\r\n";

$subProtocol = (isset($headers['sec-websocket-protocol'])) ? $this->processProtocol($headers['sec-websocket-protocol']) : "";
$extensions = (isset($headers['sec-websocket-extensions'])) ? $this->processExtensions($headers['sec-websocket-extensions']) : "";

$handshakeResponse = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: $handshakeToken$subProtocol$extensions\r\n";
socket_write($user->socket,$handshakeResponse,strlen($handshakeResponse));
$this->connected($user);
}
protected function checkHost($hostName) {
return true; // Override and return false if the host is not one that you would expect.
// Ex: You only want to accept hosts from the my-domain.com domain,
// but you receive a host from malicious-site.com instead.
}
protected function checkOrigin($origin) {
return true; // Override and return false if the origin is not one that you would expect.
}
protected function checkWebsocProtocol($protocol) {
return true; // Override and return false if a protocol is not found that you would expect.
}
protected function checkWebsocExtensions($extensions) {
return true; // Override and return false if an extension is not found that you would expect.
}
protected function processProtocol($protocol) {
return ""; // return either "Sec-WebSocket-Protocol: SelectedProtocolFromClientList\r\n" or return an empty string.
// The carriage return/newline combo must appear at the end of a non-empty string, and must not
// appear at the beginning of the string nor in an otherwise empty string, or it will be considered part of
// the response body, which will trigger an error in the client as it will not be formatted correctly.
}
protected function processExtensions($extensions) {
return ""; // return either "Sec-WebSocket-Extensions: SelectedExtensions\r\n" or return an empty string.
}
protected function getUserBySocket($socket) {
foreach ($this->users as $user) {
if ($user->socket == $socket) {
return $user;
}
}
return null;
}
protected function stdout($message) {
if ($this->interactive) {
echo "$message\n";
}
}
protected function stderr($message) {
if ($this->interactive) {
echo "$message\n";
}
}
protected function frame($message, $user, $messageType='text', $messageContinues=false) {
switch ($messageType) {
case 'continuous':
$b1 = 0;
break;
case 'text':
$b1 = ($user->sendingContinuous) ? 0 : 1;
break;
case 'binary':
$b1 = ($user->sendingContinuous) ? 0 : 2;
break;
case 'close':
$b1 = 8;
break;
case 'ping':
$b1 = 9;
break;
case 'pong':
$b1 = 10;
break;
}
if ($messageContinues) {
$user->sendingContinuous = true;
} else {
$b1 += 128;
$user->sendingContinuous = false;
}

$length = strlen($message);
$lengthField = "";
if ($length < 126) {
$b2 = $length;
} elseif ($length <= 65536) {
$b2 = 126;
$hexLength = dechex($length);
//$this->stdout("Hex Length: $hexLength");
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 2) {
$lengthField = chr(0) . $lengthField;
}
} else {
$b2 = 127;
$hexLength = dechex($length);
if (strlen($hexLength)%2 == 1) {
$hexLength = '0' . $hexLength;
}
$n = strlen($hexLength) - 2;

for ($i = $n; $i >= 0; $i=$i-2) {
$lengthField = chr(hexdec(substr($hexLength, $i, 2))) . $lengthField;
}
while (strlen($lengthField) < 8) {
$lengthField = chr(0) . $lengthField;
}
}

return chr($b1) . chr($b2) . $lengthField . $message;
}
protected function deframe($message, $user) {
//echo $this->strtohex($message);
$headers = $this->extractHeaders($message);
$pongReply = false;
$willClose = false;
switch($headers['opcode']) {
case 0:
case 1:
case 2:
break;
case 8:
// todo: close the connection
$user->hasSentClose = true;
return "";
case 9:
$pongReply = true;
case 10:
break;
default:
//$this->disconnect($user); // todo: fail connection
$willClose = true;
break;
}

if ($user->handlingPartialPacket) {
$message = $user->partialBuffer . $message;
$user->handlingPartialPacket = false;
return $this->deframe($message, $user);
}

if ($this->checkRSVBits($headers,$user)) {
return false;
}

if ($willClose) {
// todo: fail the connection
return false;
}

$payload = $user->partialMessage . $this->extractPayload($message,$headers);

if ($pongReply) {
$reply = $this->frame($payload,$user,'pong');
socket_write($user->socket,$reply,strlen($reply));
return false;
}
if (extension_loaded('mbstring')) {
if ($headers['length'] > mb_strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
} else {
if ($headers['length'] > strlen($payload)) {
$user->handlingPartialPacket = true;
$user->partialBuffer = $message;
return false;
}
}

$payload = $this->applyMask($headers,$payload);

if ($headers['fin']) {
$user->partialMessage = "";
return $payload;
}
$user->partialMessage = $payload;
return false;
}
protected function extractHeaders($message) {
$header = array('fin'     => $message[0] & chr(128),
'rsv1'    => $message[0] & chr(64),
'rsv2'    => $message[0] & chr(32),
'rsv3'    => $message[0] & chr(16),
'opcode'  => ord($message[0]) & 15,
'hasmask' => $message[1] & chr(128),
'length'  => 0,
'mask'    => "");
$header['length'] = (ord($message[1]) >= 128) ? ord($message[1]) - 128 : ord($message[1]);

if ($header['length'] == 126) {
if ($header['hasmask']) {
$header['mask'] = $message[4] . $message[5] . $message[6] . $message[7];
}
$header['length'] = ord($message[2]) * 256
+ ord($message[3]);
} elseif ($header['length'] == 127) {
if ($header['hasmask']) {
$header['mask'] = $message[10] . $message[11] . $message[12] . $message[13];
}
$header['length'] = ord($message[2]) * 65536 * 65536 * 65536 * 256
+ ord($message[3]) * 65536 * 65536 * 65536
+ ord($message[4]) * 65536 * 65536 * 256
+ ord($message[5]) * 65536 * 65536
+ ord($message[6]) * 65536 * 256
+ ord($message[7]) * 65536
+ ord($message[8]) * 256
+ ord($message[9]);
} elseif ($header['hasmask']) {
$header['mask'] = $message[2] . $message[3] . $message[4] . $message[5];
}
//echo $this->strtohex($message);
//$this->printHeaders($header);
return $header;
}
protected function extractPayload($message,$headers) {
$offset = 2;
if ($headers['hasmask']) {
$offset += 4;
}
if ($headers['length'] > 65535) {
$offset += 8;
} elseif ($headers['length'] > 125) {
$offset += 2;
}
return substr($message,$offset);
}
protected function applyMask($headers,$payload) {
$effectiveMask = "";
if ($headers['hasmask']) {
$mask = $headers['mask'];
} else {
return $payload;
}

while (strlen($effectiveMask) < strlen($payload)) {
$effectiveMask .= $mask;
}
while (strlen($effectiveMask) > strlen($payload)) {
$effectiveMask = substr($effectiveMask,0,-1);
}
return $effectiveMask ^ $payload;
}
protected function checkRSVBits($headers,$user) { // override this method if you are using an extension where the RSV bits are used.
if (ord($headers['rsv1']) + ord($headers['rsv2']) + ord($headers['rsv3']) > 0) {
//$this->disconnect($user); // todo: fail connection
return true;
}
return false;
}
protected function strtohex($str) {
$strout = "";
for ($i = 0; $i < strlen($str); $i++) {
$strout .= (ord($str[$i])<16) ? "0" . dechex(ord($str[$i])) : dechex(ord($str[$i]));
$strout .= " ";
if ($i%32 == 7) {
$strout .= ": ";
}
if ($i%32 == 15) {
$strout .= ": ";
}
if ($i%32 == 23) {
$strout .= ": ";
}
if ($i%32 == 31) {
$strout .= "\n";
}
}
return $strout . "\n";
}
protected function printHeaders($headers) {
echo "Array\n(\n";
foreach ($headers as $key => $value) {
if ($key == 'length' || $key == 'opcode') {
echo "\t[$key] => $value\n\n";
} else {
echo "\t[$key] => ".$this->strtohex($value)."\n";

}

}
echo ")\n";
}

}


function makenv() {	// in web mode, htdocs should be in /web
	global $_SERVER, $prefix, $_SESSION;
	$cdir = getcwd(); @chdir( $prefix); $prefix = getcwd(); chdir( $cdir);
	//$s = explode( '/', $prefix); array_pop( $s); $prefix = implode( '/', $s); // remove / at the end of prefix
	$out = array();
	$addr = '';
	if ( isset( $_SERVER[ 'SERVER_NAME'])) $addr = $_SERVER[ 'SERVER_NAME'];
	if ( isset( $_SERVER[ 'DOCUMENT_ROOT'])) $root = $_SERVER[ 'DOCUMENT_ROOT'];
	if ( ! $addr && is_file( '/sbin/ifconfig')) { 	// probably command line, try to get own IP address from ipconfig
		$in = popen( '/sbin/ifconfig', 'r');
		$L = array(); while ( $in && ! feof( $in)) {
			$line = trim( fgets( $in)); if ( ! $line) continue;
			if ( strpos( $line, 'inet addr') !== 0) continue;
			$L2 = explode( 'inet addr:', $line);
			$L3 = array_pop( $L2);
			$L4 = explode( ' ', $L3);
			$L5 = trim( array_shift( $L4));
			array_push( $L, $L5);
		}
		pclose( $in); $addr = implode( ',', $L);
	}
	if ( ! $root) $root = '/web';
	// find $root depending on web space versus CLI environment
	$split = explode( "$root/", $cdir); $aname = '';
	if ( count( $split) == 2) $aname = @array_shift( explode( '/', $split[ 1]));
	else $aname = '';
	//else { $aname = ''; $root = $prefix ? $prefix : $cdir; } // CLI
	// application session
	$session = array();
	if ( $aname && isset( $_SESSION) && isset( $_SESSION[ $aname])) { // check session, detect ssid changes
		$session = $_SESSION[ $aname];
		$ssid = session_id();
		if ( ! isset( $session[ 'ssid'])) $session[ 'ssid'] = $ssid;
		if ( $session[ 'ssid'] != $ssid) { $session[ 'oldssid'] = $session[ 'ssid']; $session[ 'ssid'] = $ssid; }
	}
	// return result
	$L2 = explode( ',', $addr);
	$out = array(
		'SYSTYPE' => ( isset( $_SERVER) && isset( $_SERVER[ 'SYSTEMDRIVE'])) ? 'cygwin' : 'linux',
		'CDIR' => $cdir,
		'BIP' => $addr ? array_shift( $L2) : '',
		'BIPS' => $addr ? explode( ',', $addr) : array(),
		'SBDIR' => $root,	// server base dir, htdocs for web, ajaxkit root for CLI
		'ABDIR' => $prefix,	// ajaxkit base directory
		'BDIR' => "$root" . ( $aname ? '/' . $aname : ''), // base app dir
		'BURL' => ( $addr ? 'http://' . $addr . ( $aname ? "/$aname" : '') : ''),
		'ABURL' => '', 	// add later
		'ANAME' => $aname ? $aname: 'root',
		'SNAME' => ( isset( $_SERVER) && isset( $_SERVER[ 'SCRIPT_NAME'])) ? $_SERVER[ 'SCRIPT_NAME'] : '?', 
		'DBNAME' => $aname,
		// application session
		'ASESSION' => $session,
		// client (browser) specific
		'RIP' => isset( $_SERVER[ 'REMOTE_ADDR']) ? $_SERVER[ 'REMOTE_ADDR'] : '',
		'RPORT' => isset( $_SERVER[ 'REMOTE_PORT']) ? $_SERVER[ 'REMOTE_PORT'] : '',
		'RAGENT' => isset( $_SERVER[ 'HTTP_USER_AGENT']) ? $_SERVER[ 'HTTP_USER_AGENT'] : ''
	);
	$out[ 'ABURL'] = ( $addr ? "http://$addr" . str_replace( "$root", '', $out[ 'ABDIR']) : '');
	return $out;
}
function jqload( $justdumpjs = false, $mode = 'full') {
	global $BURL, $ABURL, $ABDIR, $JQ, $JQMODE;
	$files = array(); 
	foreach ( $JQ[ 'libs'] as $file) lpush( $files, "jquery.$file" . ( strpos( $JQMODE, 'source') !== false ? '.min.js' : '.js'));
	if ( $mode == 'full' || $mode == 'short') foreach ( $JQ[ 'basics'] as $file) lpush( $files, $file . ( strpos( $JQMODE, 'source') !== false ? '.min.js' : '.js'));
	if ( $mode == 'full') foreach ( $JQ[ 'advanced'] as $file) lpush( $files, $file . ( strpos( $JQMODE, 'source') !== false ? '.min.js' : '.js'));
	if ( $JQMODE == 'debug') {	// separate script tag per file
		foreach ( $files as $file) echo $justdumpjs ? implode( '', file( "$ABDIR/jq/$file")) . "\n" : '<script src="' . $ABURL . "/jq/$file" . '?' . mr( 5) . '"></script>' . "\n";
	}
	if ( $JQMODE == 'source') {	// script type per file with source instead of url pointer
		foreach ( $files as $file) echo ( $justdumpjs ? '' :  "<script>\n") . implode( '', file( "$ABDIR/jq/$file")) . "\n" . ( $justdumpjs ? '' : "</script>\n");
	}
	if ( $JQMODE == 'sourceone') {	// all source inside one tag (no tag if $justdumpjs is true
		if ( ! $justdumpjs) echo "<script>\n\n";
		foreach ( $files as $file) echo implode( '', file( "$ABDIR/jq/$file")) . "\n\n";
		echo "if ( callback) eval( callback)();\n";
		if ( ! $justdumpjs) echo "</script>\n";
	}
	// to fix canvas in IE
	if ( ! $justdumpjs) echo '<!--[if IE]><script type="text/javascript" src="' . $ABURL . '/jq/jquery.excanvas.js"></script><![endif]-->' . "\n";
}
function jqparse( $path, $all = false) {	// minimizes JS and echoes the rest
	$in = fopen( $path, 'r');
	$put = false;
	if ( $all) $put = $all;
	while ( ! feof( $in)) {
		$line = trim( fgets( $in));
		if ( ! $put && strpos( $line, '(function($') !== false) { $put = true; continue; }
		if ( ! $all && strpos( $line, 'jQuery)') !== false) break;	// end of file
		if ( ! strlen( $line) || strpos( $line, '//') === 0) continue;
		if ( strpos( $line, '/*') === 0) {	// multiline comment */
			$limit = 100000;
			while ( $limit--) { 
				// /*
				if ( strpos( $line,  '*/') !== FALSE) break;
				$line = trim( fgets( $in));
			}
			continue;
		}
		if ( $put) echo $line . "\n";
	}
	fclose( $in);
}
function flog( $msg, $echo = true, $timestamp = false, $uselock = false, $path = '') {	// writes the message to file log, no end of line
	global $BDIR, $FLOG;
	if ( is_array( $msg)) $msg = htt( $msg);
	if ( ! $FLOG) $FLOG = $path;
	if ( ! $FLOG) $FLOG = "$BDIR/log.txt"; 
	$out = fopen( $FLOG, 'a');
	if ( $timestamp) fwrite( $out, "time=" . tsystemstamp() . ',');
	fwrite( $out, "$msg\n");
	fclose( $out);
	if ( $echo) echo "$msg\n";
}
function checksession( $usedb = false) { // db calls dbsession()
	global $ASESSION, $DB;
	if ( ! isset( $ASESSION[ 'oldssid'])) return;	// nothing wrong
	$oldssid = $ASESSION[ 'oldssid'];
	$ssid = $ASESSION[ 'ssid'];
	if ( $usedb) dbsession( 'reset', "newssid=$ssid", $oldssid);
	unset( $ASESSION[ 'oldssid']);
}
// will save in BURL/log.base64( uid)    as base64( bzip2( json))  -- no clear from extension, but should remember the format
// $msg can be either string ( will tth())  or hash
// will add     (1) time   (2) uid   (3) took (current time - REQTIME)   (4) reply=JO (if not empty/NULL)
function mylog( $msg, $ouid = null, $noreply = false, $ofile = null) {
	global $uid, $BDIR, $JO, $REQTIME, $_SERVER, $ASLOCKSTATS;
	if ( $ouid === null) $ouid = $uid; 
	if ( $ouid === null) $ouid = 'nobody';
	$h = array();
	$h[ 'time'] = tsystemstamp();
	$h[ 'uid'] = $ouid;
	$h[ 'took'] = tsystem() - $REQTIME;
	$h[ 'script'] = lpop( ttl( $_SERVER[ 'SCRIPT_FILENAME'], '/'));
	$h = hm( $h, is_string( $msg) ? tth( $msg) : $msg);	// merge, but keep time and uid in proper order
	if ( $JO && ! $noreply) $h[ 'reply'] = $JO;
	if ( $ASLOCKSTATS) $h[ 'aslockstats'] = $ASLOCKSTATS;
	$file = sprintf( "%s/log.%s", $BDIR, base64_encode( $ouid)); if ( $ofile) $file = $ofile;
	$out = fopen( $file, 'a'); fwrite( $out, h2json( $h, true, null, null, true) . "\n"); fclose( $out);
}


?>