/* App */
define(['config','jquery','underscore','backbone','fastclick','imgcache','utils','app','localstorage'], 
  function(config, $, _, Backbone, FastClick, ImageCache, Utils, App){

    /*
     * Device Waiting
     */
    var dev = {
        initialize: function() {
            this.bindEvents();
        },
        bindEvents: function() {
            document.addEventListener('deviceready', this.onDeviceReady, false);
            /* Allow graceful fail on Desktop */
            require(['cordova'], function(){
                  console.log("Loaded Cordova...");
            }, function(){
                  console.log("Firing Device Ready...");
                  dev.onDeviceReady();
            });

        },
      /* 
       * Device and Cordova Loaded - Start App, and utilities...
       */
        onDeviceReady: function() {
            /* Start Up the Image Cache */
            /* ImageCache.options.debug = true;
            ImageCache.options.headers = { 'Connection': 'close' }; */
            ImageCache.options.skipURIencoding = true; /* For S3 secret */
            ImageCache.init(function(){
                console.log('ImgCache init: success!');
            }, function(){
                console.log('ImgCache init: error! Check the log for errors');
            });
            Utils.platformCss();
            Utils.checkOrientation();
            App.start();
        },
    };

    /* 
     * Document Loaded - Start App 
     */
    $(document).ready(function(){
        /* Fast Click */
        FastClick.attach(document.body);
        
        /* Wait for Device */
        dev.initialize();
    });
});
