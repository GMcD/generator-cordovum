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

  var prompts = [ { name: 'siloName', message: 'What would you like to call your Silo? ', default: 'Silo'},
                  { name: 'apiUrl', message: 'What is the Rest api endpoint? ', default: 'silos/'}
                ];

  this.prompt(prompts, function (props) {
    this.siloName = this._.slugify(props.siloName);
    this.apiUrl = props.apiUrl;

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.silo = function silo() {

  this.copy('_silo.js', 'app/js/' + this.siloName + '.js');
  this.copy('_silo.tpl', 'app/tpl/' + this.siloName + 'Template.html');
  this.copy('_silo.scss', 'app/scss/_' + this.siloName + '.scss');

};

CordovumGenerator.prototype.addSassImport = function addSassImport() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/scss/app.scss',
      file   = this.readFileAsString(path),
      insert = '@insert "_' + this.siloName + '";\n' + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

CordovumGenerator.prototype.addRequireJS = function addRequireJS() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/require.app.js',
      file   = this.readFileAsString(path),
      insert = "    " + this.siloName + "             : 'app/js/" + this.siloName + "',\n" + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};
