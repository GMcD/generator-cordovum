generator-cordovum
==================

A Yeoman Generator for [Cordova](http://cordova.apache.org).

## Getting Started

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. 

```
$ npm install -g yo
```

### Yeoman Cordovum Generator

To locally update generator-cordovum from git, run:

```
$ pushd /usr/local/lib/node_modules/generator-cordovum; sudo git pull; popd
```

Later, once in the npm registery, install generator-cordovum by running:

```
$ npm install -g generator-cordovum
```

Setup an __empty__ folder (and repository) for your app, change into the folder, and initiate the generator.

```
$ mkdir app; cd app; git init .; yo cordovum; git add .; git commit -m "My New App from Yeoman"
```

Start <code>grunt watch</code> at the project root to auto generate assets and prepare XCode or Eclipse projects.

Run <code>nodemon ./server.js</code> at the project root for Chrome sessions - browse to http://localhost:8080/app/app.html. 

Run <code>grunt cordovacli:build</code> to generate the APK and IPA builds.

# Sub Generators

Cordovum comes with two sub-generators
  * Silo - This will generate a Model, Collection, View, Style and integrate with the App build system.
  > Note - This does not auto-generate a route within the Router, at this time.
  * Jazz - This will generate a Jasmine test file for the endpoint model and view.

# Add Plugins

To Install the cordovum-preferences plugin, <code>cd appname;</code> and run 

```
cordova plugin add org.apache.cordova.network-information
cordova plugin add https://github.com/GMcD/cordovum-preferences.git
...
```

The plugin incorporates a Settings bundle for iOS and a preferences xml file for Android.

# Project Configuration

The iOS project file will need Target Properties set for 
  * supported orientations (ALL), 
  * View Controller-based status bar appearance (NO), and 
  * status bar initially hidden (YES).

### Getting To Know Cordovum

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
