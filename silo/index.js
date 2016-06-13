'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var CordovumGenerator = module.exports = function CordovumGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(CordovumGenerator, yeoman.generators.Base);

CordovumGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [ { name: 'siloName', message: 'What would you like to call your Silo? ', default: 'silo'},
                  { name: 'apiUrl', message: 'What is the Rest api endpoint? ', default: 'silos/'}
                ];

  this.prompt(prompts, function (props) {
    this.siloName = this._.slugify(props.siloName).toLowerCase();
    this.apiUrl = props.apiUrl;

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.silo = function silo() {

  this.copy('_silo.js', 'app/modules/' + this.siloName + '/' + this.siloName + '.js');
  this.copy('_silo.tpl', 'app/modules/' + this.siloName + '/' + this.siloName + 'Template.html');
  this.copy('_silo.scss', 'app/modules/' + this.siloName + '/_' + this.siloName + '.scss');

};

CordovumGenerator.prototype.addSassImport = function addSassImport() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/scss/app.scss',
      file   = this.readFileAsString(path),
      insert = '@import "_' + this.siloName + '";\n' + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

CordovumGenerator.prototype.addRequireJS = function addRequireJS() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/require.app.js',
      file   = this.readFileAsString(path),
      insert = "    " + this.siloName + "             : 'app/modules/" + this.siloName + "',\n" + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

CordovumGenerator.prototype.addDefine = function addDefine() {
  var hook   = '/*** Yeoman Define Placeholder ***/',
      path   = 'app/js/app.js',
      file   = this.readFileAsString(path),
      insert = "'" + this.siloName + "/" + this.siloName + "', " + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

CordovumGenerator.prototype.addModule = function addModule() {
  var hook   = '/*** Yeoman Module Placeholder ***/',
      path   = 'app/js/app.js',
      file   = this.readFileAsString(path),
      insert = ", " + _.capitalize(this.siloName) + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

CordovumGenerator.prototype.addListener = function addListener() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/js/app.js',
      file   = this.readFileAsString(path),
      insert =  "    /* " +
                "     * Listen for " + _.capitalize(this.siloName) + " Layout Show " +
                "     */ " +
                "    App.listenTo(App.vent, '" + this.siloName + ":show', function(){" +
                "        var " + this.siloName + "    = new " + _.capitalize(this.siloName) + ".View();" +
                "        App.mainRegion.show(" + this.siloName + ");" +
                "    });\n" + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};


