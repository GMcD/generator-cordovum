define([ 'config', 'jquery', 'underscore', 'backbone', 'marionette', 'utils',
    'text!menu/menuTemplate.html', 'text!menu/menuLayout.html'], 
    function( config, $, _, Backbone, Marionette, Utils, menuTemplate, menuLayout ) {

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
            'click #close-menu'     : 'menu:close',
            'click #home-item'      : 'home:show',
        },
        onMenuToggle : function(){
            console.log('Toggling offScreen...');
            $('#menu-items').toggleClass('offScreen');
            $('#close-menu').toggle();
        },
        onMenuClose : function(){
            $('#menu-items').addClass('offScreen');
            $('#close-menu').hide();
        },
        onHomeShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#profile-item').addClass('active-item');
            App.vent.trigger('home:show');
        },

    });

    var MenuLayout = Marionette.LayoutView.extend({
        template : function(model) {
            console.log('Templating Menu Layout...');
            return _.template(menuLayout)(model);
        },

        regions: {
            menu    : '#menu-stage',
            home    : '#home-stage',
        },

        onBeforeShow: function () {
            var that    = this;
            var menu    = new MenuView();
            that.getRegion('menu').show(menu);

        },

    });

    return { Layout : MenuLayout, View : MenuView };

});
