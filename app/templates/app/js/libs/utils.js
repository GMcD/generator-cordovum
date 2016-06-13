define(['jquery','imgcache'], function($, ImageCache){
    
	var utils = {
	    /*
	     * Utility to add parameters from query string to defaults passed in
	     */
	    getOptions : function(defaults){
	        var prmstr = window.location.search.substr(1);
	        var prmarr = prmstr.split ("&");

	        /* Collect any variation from URL */
	        for ( var i = 0; i < prmarr.length; i++) {
	            var tmparr = prmarr[i].split("=");
	            defaults[tmparr[0]] = decodeURIComponent(tmparr[1]);
	        }
            defaults[defaults.platform] = true;
	        return defaults;
	    },
	    /*
	     * Take HTMLElement and return jQuery style selector for it
	     */
	    selector : function(d) { 
	    	var s = d.localName; 
	    	if (d.id.length) { s += '#' + d.id; } 
	    	if (d.className.length) { s += '.' + d.className; } 
	    	return s; 
	    },
        /*
         * Parse Backbone Model Response failures
         *  This should handle : 
         *      Django Debug 500, 404 etc...    - a HTML page
         *      Django Release 500, 404 etc     - a H1 Element  <H1>500 Server Error</H1>
         *      Django Rest Framework details   - JSON { details : '...' }
         *      DRF non_field_errors            - 
         */
        failure : function(xhr, status, msg){
            var text = xhr.responseText && xhr.responseText.length ? xhr.responseText : xhr.statusText;
            var isJson = false;
            var drfText = '';
            try {
                drfText = JSON.parse(text);
                isJson = true;
            }
            catch (e){
            }
            if (isJson){
                if (drfText.detail){
                    console.log('DRF error : ' + drfText.detail);
                    return drfText.detail;
                }
                if (drfText.non_field_errors){
                    var details = drfText.non_field_errors.join();
                    console.log('DRF error : ' + details);
                    return details;
                }
                console.log('JSON error : ' + text);
                return text;
            } else {
                var msge = msg && msg.message;
                var stat = status && status.toUpperCase();
                var message = '';
                if (stat && stat.length > 0) { message += stat + ':'; }
                if (text && text.length > 0) { message += '\n\t' + text; }
                if (msge && msge.length > 0) { message += '\n\t' + msge; }
                console.log(message);
                return message;
            }
        },
	    /*
	     * Get Unix Date Time stamp, for give time, or now
	     */
	    unix : function(when){
	    	if (arguments.length === 0) {
	    		when = new Date();
	    	}
	    	return Math.round(when / 1000);
	    },
	    /*
	     * Simple check if is valid email - not much stricter than a@b.c
	     */
	    isEmail : function(address){
	    	var email_check = /^[^@]+@[^@]+\.[^@]+$/i;
            return email_check.test(address);
	    },
	    /*
	     * Pad a with b zeros - add to 100000000000000000 and trim accordingly
	     */
	    pad : function(a,b){
	        return(1e15+a+"").slice(-b);
	    },
	    /*
	     * Basename of file
	     */
	    basename : function (path, suffix) {
	        var b = path.replace(/^.*[\/\\]/g, '');
	        if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
	            b = b.substr(0, b.length - suffix.length);
	        }
	        return b;
	    },
	    /*
	     * Foldername of file
	     */
	    foldername : function(path, suffix) {
	        var end = path.indexOf(utils.basename(path, suffix));
	        return path.substr(0, end);
	    },
	    /*
	     * Apply Device Specific CSS - Could be done within Cordova build system?
	     */
	    platformCss : function(){
            if (typeof device === "undefined"){
                $('body').addClass('desktop');
                console.log('Javascript Class Styling for Desktop..');
                return;
            }
            var model = device.model;
            var ios = model.indexOf('iPad') > -1 || model.indexOf('iPhone') > -1 || model.indexOf('iPod') > -1;
            if (ios){
                $('body').addClass('ios');
                console.log('Javascript Class Styling for iOS..');
                var ipad = model.indexOf('iPad') > -1;
                if (ipad){
                	$('body').addClass('ipad');
	                console.log('Javascript Class Styling for iPad..');
                }
            } else {
                $('body').addClass('android');
                console.log('Javascript Class Styling for Android..');
            }
	    },
	    /*
	     * Handle Orientation Changes - Body will have a CSS class for Current Orientation
	     */
	    checkOrientation : function(){
	    	function doOnOrientationChange() {
    			switch(window.orientation) {  
			      case -90:
			      case 90:
			        $('body').removeClass('portrait').addClass('landscape');
			        console.log("Landscape...");
			        break; 
			      default:
			        $('body').removeClass('landscape').addClass('portrait');
			        console.log("Portait...");
			        break; 
			    }
			}
			window.addEventListener('orientationchange', doOnOrientationChange);
			doOnOrientationChange();
	    },

		/*
		 * Load Image to and from Cache on a Promise
		 */
		cacheAndLoadImage : function(image_src) {
	    	var deferred = $.Deferred();
	    	var sprite = new Image();
	    	sprite.onload = function() {
	        	deferred.resolve();
	    	};
	        ImageCache.isCached(image_src, function(src, cached){
	            if (cached){
	                console.log('Cached : ' + src);
	                sprite.src = src;
	            } else {
	                console.log('Caching : ' + image_src);
	                sprite.src = image_src;
	                ImageCache.cacheFile(image_src);
	            }
	        });
	    	return deferred.promise();
		},

	};

	/*
	 * Function Prototypes
	 */
	if (typeof String.prototype.startsWith !== 'function') {
	  	String.prototype.startsWith = function (str){
	    	return this.slice(0, str.length) === str;
	  	};
	}
	if (typeof String.prototype.endsWith !== 'function') {
  		String.prototype.endsWith = function (str){
    		return this.slice(-str.length) === str;
  		};
	}
	if (typeof String.prototype.capitalizeFirstLetter !== 'function') {
		String.prototype.capitalizeFirstLetter = function() {
    		return this.charAt(0).toUpperCase() + this.slice(1);
		};
	}
	
	return utils;
});
      

