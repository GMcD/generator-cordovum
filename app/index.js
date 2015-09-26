'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CordovumGenerator = module.exports = function CordovumGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ 
          skipInstall: options['skip-install'],
          callback: function() {
                this.emit('dependenciesInstalled');
          }.bind(this)
    });
  });

  // Now you can bind to the dependencies installed event
  this.on('dependenciesInstalled', function() {
      this.log("Installing Cordova Lib..");
      var cp = process.cwd();
      var cl = path.join(cp, 'node_modules/cordova-lib')
      process.chdir(cl);
      this.spawnCommand('npm', ['install'])
          .on('close', function() {
              this.emit('cordovaLibInstalled');
          }.bind(this));
  });

  // Now you can bind to the dependencies installed event
  this.on('cordovaLibInstalled', function() {
      this.spawnCommand('grunt', ['setup'])
          .on('close', function() {
              this.emit('platformsSetup');
          }.bind(this));
  });

  this.on('platformsSetup', function() {
      this.spawnCommand('grunt', ['default']);
      this.spawnCommand('grunt', ['cordova', 'cordovacli:build']);
      // XXX add grunt task to clean cordova index.js and to create icons
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovumGenerator, yeoman.generators.Base);

CordovumGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  // Remind the user to have a clean git repo
  console.log("Remember to run like this: ");
  console.log("\t$ mkdir app; cd app; git init .; yo cordovum; git add .; git commit -m `My New App from Yeoman`");

  var prompts = [ { name: 'appName', message: 'What would you like to call your App? ', default: 'Wills'},
                  { name: 'appUrl', message: 'Application Url Identifier : ', default: 'com.lifelongwills'},
                  { name: 'appDescription', message: 'Short application description : ', default: 'Life Long Wills'},
                  { name: 'appAuthor', message: 'App Author email', default: 'gary.macdonald@projectscapa.com'}
                ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appUrl = props.appUrl;
    this.appBundle = props.appUrl + '.' + props.appName.toLowerCase();
    this.appDescription = props.appDescription;
    this.appAuthor = props.appAuthor;

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.module = function module() {

  this.copy('.gitignore',   '.gitignore');
  this.copy('.jshintrc',    '.jshintrc');
  this.copy('bower.json',   'bower.json');
  this.copy('gruntfile.js', 'gruntfile.js');
  this.copy('icons.js',     'icons.js');
  this.copy('server.js',    'server.js');
  this.copy('package.json', 'package.json');
  
};

CordovumGenerator.prototype.app = function app() {
  /* Main Application Template */
  this.directory('app', 'app');
  /* Empty Folder for compiled SASS */
  this.mkdir('app/css');

  /* Use this as workspace, and Import android project, export Gradle files */
  this.mkdir('eclipse');
}
