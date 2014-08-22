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

  var prompts = [ { name: 'siloName', message: 'What would you like to call your Silo? ', default: 'Silo'}
                ];

  this.prompt(prompts, function (props) {
    this.siloName = _.slugify(props.siloName);

    cb();
  }.bind(this));
};

CordovumGenerator.prototype.module = function silo() {

  this.copy('_silo.js', 'app/js/' + this.siloName + '.js');
  this.copy('_silo.tpl', 'app/tpl/' + this.siloName + 'Template.html');
  this.copy('_silo.scss', 'app/scss/_' + this.siloName + '.scss');

};
