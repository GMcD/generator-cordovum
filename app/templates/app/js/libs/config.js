/**
 * Application wide constants, such as remote API host, timeouts etc
 */
define([], function(){

    var config = { 	baseUrl     : 'http://your-api.com/',
            		credentials : { email     : 'you@your-api.com',
            			  			password  : 'pass'
            		},
            		timeout   : 3000
          };

    return config;
    
});
