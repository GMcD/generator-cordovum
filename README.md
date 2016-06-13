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

> Later, once in the npm registry, install generator-cordovum by running:
> 
> ```
> $ npm install -g generator-cordovum
> ```

Setup an __empty__ folder (and repository) for your app, change into the folder, and initiate the generator.

```
$ mkdir app
$ cd app
$ git init .
$ yo cordovum;
$ git add .
$ git commit -m "My New App from Yeoman"
$ cordova run browser
```

Cordova will open a session at <code>http://localhost:8000/app/app.html</code> for browsing.
Browse to <code>http://localhost:8000/app/jasmine.html</code> to run integrated tests.

Start `grunt watch` at the project root to auto generate assets and prepare XCode, Android Studio and Browser projects.

> Auto Generating here means taking the app folder, running sass, require compile, etc, and generating the normal cordova www folder.

Run `grunt cordovacli:build` to generate the APK and IPA builds.

# Sub Generators

Cordovum comes with two sub-generators, Silo and Jazz. These are nicknames for Modules and Tests respectively.

## Silo
  The Silo generator generates 

     * Model

     * Collection

     * View

     * Sass Style

     * Route

     * RequireJS

     * Define

     * Module

     * and integrates with the App build system.

> Note - This does not auto-generate a Menu Item at this time. The expectation is that every top level module
> would have a menu item, but not all modules are top lovel modules. A flag on invocation may be the approach here.

## Jazz
  The Jazz generator generates a Jasmine test file, Spec,  for the module endpoint.

# Add Plugins

To Install the cordovum-preferences plugin, `cd appname;` and run

```
$ cd app/cordovum
$ cordova plugin add org.apache.cordova.device
$ cordova plugin add org.apache.cordova.file-transfer
$ cordova plugin add org.apache.cordova.network-information
$ cordova plugin add cordova-plugin-browsersync
$ cordova run browser -- --reload-live
$ cordova plugin add https://github.com/GMcD/cordovum-preferences.git
...
```
> The cordova-plugin-browsersync plugin consumes too many file handles on MacOSX.

The plugin incorporates a Settings bundle for iOS and a preferences xml file for Android.

# Project Configuration

The iOS project file will need Target Properties set for
  * supported orientations (ALL),
  * View Controller-based status bar appearance (NO), and
  * status bar initially hidden (YES).

# Hockey Deploy

To integrate with HockeyApp
  * Edit config.xml, add
	* 	android-versionCode="1"
	* 	ios-CFBundleVersion="0.0.1"
		** below <widget ... version="0.0.1" />
  * Add Podfile to platforms/ios
    ** pod "HockeySDK", "~> 3.8"
  * run `pod install`
		** add BUILD_ALL_ARCHS
		** add $(OBJROOT)/UninstalledProducts/include to BuildSettings->Header Search Paths
			in Workspace Project Target
  * git add cordovum/platforms/ios
  * update build_hockey.sh with the workspace

### Getting To Know Cordovum

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
