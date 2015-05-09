# Test Application

## Prerequisites
Requires nodejs and npm, may require sudo dependent on you setup.
``` bash
	npm install -g grunt
	npm install -g bower
	npm install -g forever
```

## Build & Run application
``` bash
	npm install
	grunt build
	forever stop ./server.js
	forever start ./server.js
```