define([ 'jquery', 'underscore', 'backbone', 'marionette', 'text!home/homeTemplate.html'], 
    function( $, _, Backbone, Marionette, homeTemplate ) {

    /*
     * Simple Home View
     */
    var HomeView = Marionette.ItemView.extend({
        id          : 'home-view',
        class       : 'home-view',
        template : function(model) {
            console.log('Templating Home View...');
            return _.template(homeTemplate)(model);
        },
        onShow: function(){
            console.log('onShow Home View...');
        }
    });

    return { View : HomeView };

});
