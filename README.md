# Test Application

## Prerequisites
Requires nodejs and npm, may require sudo dependent on you setup.
``` bash
	npm install -g grunt
	npm install -g bower
	npm install -g forever
	npm install -g cordova
```

## Build & Run application
``` bash
	npm install
	grunt build
	forever stop ./server.js
	forever start ./server.js
```

The application is listening on port 9015
```
	http://localhost:9015
```

## Cordova
## Prerequisites

Dependent on what platform you are running and which SDK's you have installed, or is requires to build, add the relevant command from below
``` bash
	cordova platform add ios
    cordova platform add amazon-fireos
    cordova platform add android
    cordova platform add blackberry10
    cordova platform add firefoxos
```

### Create application
```bash
	cordova create testApp com.test.application TestApplication &&
	cordova build
```