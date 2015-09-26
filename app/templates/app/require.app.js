/**
 * Require Configuration - currently duplicates with Gruntfile, so mods here need to be mirrored there
 */
require.config({
  baseUrl: '../',
  paths: {
/* Standard Bower Components */
    jquery          : 'bower_components/jquery/jquery',
    underscore      : 'bower_components/underscore/underscore',
    backbone        : 'bower_components/backbone/backbone',
    localstorage    : 'bower_components/backbone.localstorage/backbone.localStorage',
    marionette      : 'bower_components/backbone.marionette/lib/backbone.marionette',
    modal           : 'bower_components/bootstrap-sass/js/modal',
    text            : 'bower_components/requirejs-text/text',
    modernizr       : 'bower_components/modernizr/modernizr',
    moment          : 'bower_components/momentjs/moment',
    fastclick       : 'bower_components/fastclick/lib/fastclick',
    jcore           : 'bower_components/jquery-ui/ui/jquery.ui.core',
    jmouse          : 'bower_components/jquery-ui/ui/jquery.ui.mouse',
    jwidget         : 'bower_components/jquery-ui/ui/jquery.ui.widget',
    jdraggable      : 'bower_components/jquery-ui/ui/jquery.ui.draggable',
    jdroppable      : 'bower_components/jquery-ui/ui/jquery.ui.droppable',
    imgcache        : 'bower_components/imgcache.js/js/imgcache',
    hammerjs        : 'bower_components/hammerjs/hammer',
/* App Locals */
    markercluster   : 'app/js/libs/leaflet.markercluster-src',
    jtouch          : 'app/js/libs/jquery.ui.touch-punch',
    jsv             : 'app/js/libs/jsv',
    jsonform        : 'app/js/libs/jsonform',
    jscroll         : 'app/js/libs/jquery.jscrollpane',
    touchy          : 'app/js/libs/jquery.touchy',
    tinysort        : 'app/js/libs/jquery.tinysort',
/* App Basics */
    utils           : 'app/js/libs/utils',
    config          : 'app/js/libs/config',
    app             : 'app/js/app',
    device          : 'app/js/device',
/* Modules */
    menu            : 'app/modules/menu',
    home            : 'app/modules/home',
/*** Yeoman Placeholder ***/
  },
/**
 * Dependencies for libs not ready for require.js
 */
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    localstorage: {
      deps: ['underscore', 'jquery', 'backbone'],
      exports: 'Backbone.LocalStorage'
    },
    marionette: {
      deps: ['underscore', 'jquery', 'backbone'],
      exports: 'Marionette'
    },
    modernizr: {
      exports: 'Modernizr'
    },
    jsv: {
      exports: 'JSV'
    },
    jsonform: {
      deps: ['underscore', 'jquery', 'jsv'],
      exports: 'JSONForm'
    },
    modal: {
        deps: [ 'jquery' ],
        exports: 'jQuery.fn.modal'
    },
    jcore: {
        deps: [ 'jquery' ],
        exports: 'jQuery.ui'
    },
    jwidget: {
        deps: [ 'jquery', 'jcore' ],
        exports: 'jQuery.ui.widget'
    },
    jmouse: {
        deps: [ 'jquery', 'jcore', 'jwidget' ],
        exports: 'jQuery.ui.mouse'
    },
    jdraggable: {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse' ],
        exports: 'jQuery.ui.draggable'
    },
    jdroppable: {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse' ],
        exports: 'jQuery.ui.droppable'
    },
    jtouch : {
        deps: [ 'jquery', 'jcore', 'jwidget', 'jmouse', 'jdraggable', 'jdroppable' ],
        exports: 'jQuery.support.touch'
    },
    jscroll: {
      deps: ['jquery'],
      exports: 'jquery.jscrollpane'
    },
    touchy: {
      deps: ['jquery'],
      exports: 'jquery.touchy'
    },
    tinysort: {
      deps: ['jquery'],
      exports: 'jQuery.fn.tinysort'
    },
  }
});

/**
 * Load Device, to wait for Cordova Ready event, before bootstraping Marionette App
 */
require(['device']);
