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

  var prompts = [ { name: 'siloName', message: 'What Silo would you like to test ? ', default: 'Silo'},
                  { name: 'apiUrl', message: 'What is the Rest api endpoint? ', default: 'silos/'}
                ];

  this.prompt(prompts, function (props) {
    this.siloName = this._.slugify(props.siloName);
    this.apiUrl = props.apiUrl;

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.silo = function silo() {

  this.copy('_jazz.js', 'app/tests/' + this.siloName + '.js');

};

CordovumGenerator.prototype.addJasmineSpec = function addJasmineSpec() {
  var hook   = '/*** Yeoman Placeholder ***/',
      path   = 'app/require.jasmine.js',
      file   = this.readFileAsString(path),
      insert = "    specs.push('tests/" + this.siloName + "');\n" + hook;

  if (file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert));
  }
};

