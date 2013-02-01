This is a test code for multisource content aggregation using websockets, and webworkers.

The specific application for this code is multistream video aggregation and playback. It requires the latest Media Source API which (at present) is available only in one of recent Chrome releases (rar of the portable version is attached) and gives access to the raw buffer/bytestream hidden behind the HTML5 VIDEO tag.

The core idea is multisource aggregation of content, where the content is video stream in this specific case, but the application is generic and can accommodate any purpose.

To make multisource aggregation possible, WebWorkers? are spawned per source and each uses a WebSocket? to get content using the 'push' paradigm (data is pushed by server through the socket). WebSocket? server is provided with the code and is a modified (to a very high degree) code from the phpws (I think) project.

The code should run automatically, and test 'pull', 'push' and 'push.worker' paradigms for multisource content aggregation. The webpage should show a Chrome commercial from text.webm file provided with the project.

The code was developed as part of academic research. 


======
Dependencies
======

(1) Apache with PHP >= 5
      php should have: sockets, mbstring
(2) system should have a running atd service on it
      actions.php uses it to (re)start websocket.server.php for each test run
(3) libs.php is my own libraries shrunk into one file, PHP code heavily depends on it
      however, it is already there, so nothing you have to do, just to not remove it
(4) libs.js is jQuery + my own libraries on top of it, JS code heavily depends on it
      same as for (3)
(5) Chrome 25 Dev.
      For some reason Media Source API is only available in this edition
      Portable version is provided with the code (RAR file), just un-RAR and run
      Beware! Even later editions of Chrome (Canary, Dev, etc.) do not have the API
      But no worry!, it should come up officially sooner or later






===== 
Configuration:
=====

(1) edit config.js to represent your system (server side)
(2) the application uses port 5000 for WebSocket server, edit 
      source to reflect your situation
       - actions.php uses the fixed 5000 port to start
       - workers use the fixed number as well
       - ... might be other places, search for 5000 to find and edit
(3) the test.webm file is good only until LASTPOS=2015000 (JS in index.html)
 	- MediaSource API is still very unstable and will accept only 'good' webm files
 	  (most encoders will give you bad ones)
 	- test.webm is one of a few publically available files (Chrome ad) which are 
 	  long anough (34s) to be a good testing material
(4) the code is built as a benchmark/research test for several models
      the head part of JS code in index.html is the random setup for various parameters
        - THRU is setup related to delay, the lower the throughput the more delay
           for each block sent by the server (push and pull)
        - the rest is logical setup: chunksize, number of streams/workers, etc.
        

