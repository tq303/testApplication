# Test Application

### Prerequisites
Requires nodejs and npm, may require sudo dependent on your setup.
``` bash
	npm install -g grunt
	npm install -g bower
	npm install -g forever
	npm install -g cordova
	npm install -g yuidocjs
```

### Build & Run application
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

# Documentation
To build documentation for the application run the following command, documentation resides in the `documentation` folder.
``` bash
	npm run build-docs
```
# Cordova

### Create application
First create application definition.
```bash
	cordova create testApp com.test.application TestApplication
```

### Add Platforms
This is dependent on what platform you are running and which SDK's you have installed, or are required to build, run the relevant command from below
``` bash
	cordova platform add ios
    cordova platform add amazon-fireos
    cordova platform add android
    cordova platform add blackberry10
    cordova platform add firefoxos
```

### Build Cordova applications
``` bash
	cordova build
```