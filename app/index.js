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
                // Emit a new event - dependencies installed
                this.emit('dependenciesInstalled');
            }.bind(this)
    });
  });

  // Now you can bind to the dependencies installed event
  this.on('dependenciesInstalled', function() {
      this.spawnCommand('grunt', ['setup']);
      this.spawnCommand('grunt', ['default']);
      this.spawnCommand('grunt', ['cordova']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CordovumGenerator, yeoman.generators.Base);

CordovumGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [ { name: 'appName', message: 'What would you like to call your App? ', default: 'TAG'},
                  { name: 'appBundle', message: 'Application Bundle Identifier : ', default: 'com.projectscapa.tag'},
                  { name: 'appDescription', message: 'Short application description : ', default: 'Travel Advisory Group'},
                  { name: 'appAuthor', message: 'App Author email', default: 'GMcD <gary.macdonald@projectscapa.com>'}
                ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.appBundle = props.appBundle;
    this.appDescription = props.appDescription;
    this.appAuthor = props.appAuthor;

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.module = function app() {

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_gruntfile.js', 'gruntfile.js');

};

CordovumGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
};

CordovumGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.copy('_server.js', 'server.js')

  this.mkdir('app/css');
  this.mkdir('app/fonts');
  this.mkdir('app/img');

  this.mkdir('app/js');
  this.copy('js/_app.js', 'app/js/app.js')
  this.copy('js/_router.js', 'app/js/router.js')
  this.copy('js/_home.js', 'app/js/home.js')

  this.mkdir('app/js/libs');
  this.copy('js/libs/_jquery.jscrollpane.js', 'app/js/libs/jquery.jscrollpane.js')
  this.copy('js/libs/_jquery.touchy.js', 'app/js/libs/jquery.touchy.js')
  this.copy('js/libs/_jquery.ui.touch-punch.js', 'app/js/libs/jquery.ui.touch-punch.js')
  this.copy('js/libs/_jsonform.js', 'app/js/libs/jsonform.js')
  this.copy('js/libs/_jsv.js', 'app/js/libs/jsv.js')
  
  this.mkdir('app/scss');
  this.copy('scss/__home.scss', 'app/scss/_home.scss')
  this.copy('scss/_app.scss', 'app/scss/app.scss')
  
  this.mkdir('app/tpl');
  this.copy('tpl/_homeTemplate.html', 'app/tpl/homeTemplate.html')
  
  this.mkdir('app/tests');
  this.copy('tests/_home.js', 'app/tests/home.js')
  
  this.copy('_app.html', 'app/app.html');
  this.copy('_jasmine.html', 'app/jasmine.html');
  this.copy('_require.app.js', 'app/require.app.js');
  this.copy('_require.jasmine.js', 'app/require.jasmine.js');

};
