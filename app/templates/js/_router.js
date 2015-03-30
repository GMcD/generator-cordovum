define(
        ['config', 'jquery', 'underscore', 'backbone', 'home'],
    function($, _, Backbone, Home){

    var Router = Backbone.Router.extend({
        routes: {
            '' : 'home',
        },

        /*
         * Initialize Router
         */
        initialize: function() {
            console.log('Router Initialization...');

            /*
             * Now start routing requests
             */
            Backbone.history.start({pushState: false});
        },

        /*
         * Home View
         */
        home: function() {
            console.log('Home!');     
            var view = new Home.View();
        },

    });

    return { Router : Router };

});