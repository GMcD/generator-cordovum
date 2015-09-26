/**
 * Application wide constants, such as remote API host, timeouts etc
 */
define([], function(){

    app = { baseUrl   : 'http://your-api.com/',
            credentials : { email     : 'you@your-api.com',
            				password  : 'pass'
            			},
            timeout   : 3000
          };

    return app;
    
});
