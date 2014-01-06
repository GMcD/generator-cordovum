generator-cordovum
==================

A Yeoman Generator for [Cordova](http://cordova.apache.org).

## Getting Started

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. 

```
$ npm install -g yo
```

### Yeoman Cordovum Generator

To install generator-cordovum from npm, run:

```
$ npm install -g generator-cordovum
```

Setup an empty repository for your app, change into the folder, and initiate the generator.

```
$ mkdir app; cd app; git init .; yo cordovum; git add .; git commit -m "My New App from Yeoman"
```

Start <code>grunt watch</code> at the project root to generate assets for XCode or Eclipse sessions.
Run <code>nodemon ./server.js</code> at the project root for Chrome sessions. Run <code>grunt cordovacli:build</code> to generate the APK and IPA builds.

### Getting To Know Cordovum

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
