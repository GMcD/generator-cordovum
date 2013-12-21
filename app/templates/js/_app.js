/* App */
define(['jquery','underscore','text','modernizr','fastclick','home'], function(){
    /* Loads the require modules and away */
    require(['jquery','underscore','text','modernizr','fastclick','home'], 
	function($, _, text, Modernizr, FastClick, Home){

      /* Get Url Parameters - Expect Platform at least */
      function getUrlParameters(){
            /* Default to Chrome */
            var options = { platform : 'chrome' };
            var prmstr = window.location.search.substr(1);
            var prmarr = prmstr.split ("&");
            /* Collect any variation from URL */
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                options[tmparr[0]] = tmparr[1];
            }
            options[options.platform] = true;
            return options;
      }
      function selector(d) { var s = d.localName; if (d.id.length) { s += '#' + d.id; } if (d.className.length) { s += '.' + d.className; } return s; }

      /*
       * Device Waiting
       */
      var app = {
          initialize: function() {
              this.bindEvents();
          },
          bindEvents: function() {
              document.addEventListener('deviceready', this.onDeviceReady, false);
              this.options = getUrlParameters();
              if (this.options.ios){
                  console.log("Loading Cordova for iOS!");
                  require(['cordova'], function(){
                        console.log("Loaded iOS Cordova...");
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
              var view = new Home.HomeView();
          },
      };

        /* 
         * Document Loaded - Start App 
         */
        $(document).ready(function(){

            FastClick.attach(document.body);

            $('body').on('touchmove', function(e){
                var id = selector(e.target);
                console.log("Touched : " + id );
                e.preventDefault();
            });

            app.initialize();
        });
    });
});
