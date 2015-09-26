define([ 'config', 'jquery', 'underscore', 'backbone', 'marionette', 'utils', 'text!menu/menuTemplate.html'], 
    function( config, $, _, Backbone, Marionette, Utils, menuTemplate ) {

    /*
     * Simple Menu View - Catches Menu Click and passes as App Event
     */
    var MenuView = Marionette.ItemView.extend({
        id          : 'menu-template',
        class       : 'menu-home',
        initialize  : function(){
            this.listenTo(App.vent, 'menu:close', this.onMenuClose);
        },
        template : function(model) {
            console.log('Templating MenuView...');
            return _.template(menuTemplate)(model);
        },
        triggers : {
            'click #nav-anim'       : 'menu:toggle',
            'click #menu-item'      : 'menu:close',
            'click #home-item'      : 'home:show',
        },
        onMenuToggle : function(){
            console.log('Toggling offScreen...');
            $('#menu-items').toggleClass('offScreen');
        },
        onMenuClose : function(){
            $('#menu-items').addClass('offScreen');
        },
        onHomeShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#home-item').addClass('active-item');
            App.vent.trigger('home:show');
        },

    });

    return { View : MenuView };

});
