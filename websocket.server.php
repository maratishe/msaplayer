<?php
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
		
		while(true) {
			if (empty($this->sockets)) {
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
class MyWebSocketServer extends WebSocketServerStreaming {
	var $delay;
	//protected $maxBufferSize = 1048576; //1MB... overkill for an echo server, but potentially plausible for other applications.
	protected function rx( $user, $message) {
		$L = explode( ' ', $message);
		$pos = array_shift( $L); $blocksize = array_shift( $L);
		$step = array_shift( $L); $thru = array_shift( $L); $until = array_shift( $L);
		echo "received($message)  pos=$pos,blocksize=$blocksize,step=$step,thru=$thru,until=$until\n";
		// calculate per-block request delay
		$maxthru = round( 1920000 / 34);	// max thru per channel
		$rthru = round( $thru, 2) * $maxthru;
		$athru = 100000000;
		$diff = $athru - $rthru; // if ( $diff < 0) $diff = 0;
		$thru = $athru - $diff;	// the actual throughput
		$time = round( 1000000 * ( $size / $thru));
		$this->delay = $time;
		
		$user->in = fopen( 'test.webm', 'r');
		//if ( ! $user->in || feof( $user->in)) return $user->disconnect( $user->socket);
		$user->pos = $pos; 
		$user->blocksize = $blocksize;
		$user->step = $step;
		$user->lastpos = $until;
	}
	protected function tx( $user) {
		if ( ! $user->in || feof( $user->in)) return false; // no file to read from
		if ( $user->pos >= $user->lastpos) { fclose( $user->in);  return false; }
		rewind( $user->in);
		echo ' ' . $user->pos;
		fseek( $user->in, $user->pos);
		$msg = fread( $user->in, $user->blocksize);
		$this->send( $user, $msg, 'binary');
		$user->pos += $user->step * $user->blocksize;
		usleep( $this->delay);
		return true;
	}
	protected function connected( $user) { }
	protected function closed( $user) {}
}	
$echo = new MyWebSocketServer( '0.0.0.0', 5000);

?>