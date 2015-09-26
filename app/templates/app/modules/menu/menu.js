define([ 'config', 'jquery', 'underscore', 'backbone', 'marionette', 'utils',
    'text!menu/menuTemplate.html', 'text!menu/menuLayout.html'], 
    function( config, $, _, Backbone, Marionette, Utils, menuTemplate, menuLayout ) {

    /*
     * Staff Model to determine menu options
     */
    var Staff = Backbone.Model.extend({
        url : function(){
            var url = config.genie.url + 'rewards/api/is_staff/';
            return url;
        },
        parse: function(resp){
            return resp;
        },
        is_staff: function(){
            return this.get('staff');
        }
    });

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
        templateHelpers: function () {
            var user  = JSON.parse(localStorage.getItem('profile'));
            // if (_.isArray(user)){ user = user[0]; }
            // if (!user){
            //     user = { display_name : 'Gary MacDonald', profile : { avatar : config.avatar, hometown : 'London' } };
            // }
            if (!user.profile.avatar) { user.profile.avatar = config.avatar; }
            if (!user.profile.hometown) { user.profile.hometown = 'London'; }
            return { 
                    display_name  : user.display_name,
                    profile       : user.profile
                };
        },
        triggers : {
            'click #nav-anim'       : 'menu:toggle',
            'click #close-menu'     : 'menu:close',
            'click #profile-item'   : 'profile:show',
            'click #rewards-item'   : 'rewards:show',
            'click #member-item'    : 'member:show',
            'click #vouchers-item'  : 'vouchers:show',
            'click #manage-item'    : 'manage:show',
            'click #map-item'       : 'map:show',
            'click #logout-item'    : 'logout',
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
        onProfileShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#profile-item').addClass('active-item');
            App.vent.trigger('profile:show');
        },
        onRewardsShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#rewards-item').addClass('active-item');
            App.vent.trigger('rewards:show');
        },
        onVouchersShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#vouchers-item').addClass('active-item');
            App.vent.trigger('vouchers:show');
        },
        onMemberShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#member-item').addClass('active-item');
            App.vent.trigger('member:show');
        },
        onManageShow : function(){
            $('.menu-item').removeClass('active-item');
            $('#manage-item').addClass('active-item');
            App.vent.trigger('manage:show');
        },
        onMapShow : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#map-item').addClass('active-item');
            App.vent.trigger('map:show');
        },
        onLogout : function(){
            this.onMenuClose();
            $('.menu-item').removeClass('active-item');
            $('#logout-item').addClass('active-item');
            App.logOut();
        },

        onAttach: function () {
            var staff = new Staff();
            staff.fetch().done(function(user){
                if (user.staff){
                    $('#manage-item').show();
                }
            });
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

            // var staff = new Staff();
            // staff.fetch().done(function(user){
            //     if (user.staff){
            //         $('#manage-item').show();
            //     }
            // });
        },

    });

    return { Layout : MenuLayout, View : MenuView };

});
