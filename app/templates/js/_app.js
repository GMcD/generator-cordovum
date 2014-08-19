/* App */
define(['jquery','underscore','modernizr','fastclick','router','touchy'], function(){
    /* Loads the require modules and away */
    require(['jquery','underscore','modernizr','fastclick','router','touchy'], 
	function($, _, Modernizr, FastClick, Router /* $.touchy */){

      /*
       * Device Waiting
       */
      app = {
          initialize: function() {
              this.bindEvents();
          },
          options : {
            platform : 'chrome'
          },
          bindEvents: function() {
              document.addEventListener('deviceready', this.onDeviceReady, false);

              app.options = Utils.getOptions(app.options);
              
              if (app.options.ios){
                  console.log("Loading Cordova for iOS!");
                  require(['cordova'], function(){
                        console.log("Loaded iOS Cordova...");
                  });
            } else if (app.options.android){
                  console.log("Loading Cordova for Android!");
                  require(['cordova'], function(){
                        console.log("Loaded Android Cordova...");
                  });
            } else {
                  console.log("Firing Device Ready on : " + navigator.userAgent);
                  this.onDeviceReady();
            }
          },
        /* 
         * App and Cordova Loaded - Start App Home Page
         */
          onDeviceReady: function() {
              app.router = new Router.Router();
          },
      };

        /* 
         * Document Loaded - Start App 
         */
        $(document).ready(function(){

            FastClick.attach(document.body);

            $(document).on('touchmove', false);

            $('html,body').on('touchmove', function(e){
                var id = selector(e.target);
                console.log("Touched : " + id );
                e.preventDefault();
            });

            app.initialize();
        });
    });
});
