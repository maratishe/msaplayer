This is a test code for multisource content aggregation using websockets, and webworkers.

The specific application for this code is multistream video aggregation and playback. It requires the latest Media Source API which (at present) is available only in one of recent Chrome releases (rar of the portable version is attached) and gives access to the raw buffer/bytestream hidden behind the HTML5 VIDEO tag.

The core idea is multisource aggregation of content, where the content is video stream in this specific case, but the application is generic and can accommodate any purpose.

To make multisource aggregation possible, WebWorkers? are spawned per source and each uses a WebSocket? to get content using the 'push' paradigm (data is pushed by server through the socket). WebSocket? server is provided with the code and is a modified (to a very high degree) code from the phpws (I think) project.

The code should run automatically, and test 'pull', 'push' and 'push.worker' paradigms for multisource content aggregation. The webpage should show a Chrome commercial from text.webm file provided with the project.

The code was developed as part of academic research. 
