define([ 'config', 'jquery', 'underscore', 'backbone', 'marionette', 
        'text!manage/manageMenu.html',
        'text!manage/manageLayout.html',
        'text!manage/manages.html',
        'text!manage/manage.html'
        ], 
    function( config, $, _, Backbone, Marionette, manageMenu, manageLayout, managesTemplate, manageTemplate ) {

    /*
     * Manage Model
     */
    var Manage = Backbone.Model.extend({
        parse: function(resp){
            return resp;
        }
    });

    /*
     * Manage Collection
     */
    var Manages = Backbone.Collection.extend({
        url : function(){
            var url = config.appUrl + 'rewards/rewardcodes/';
            return url;
        },
        model: Manage,
        parse: function(resp){
            return resp;
        }
    });

    /*
     * A Manage Detail View 
     */ 
    var ManageDetail = Marionette.ItemView.extend({
        template : function(model) {
            console.log('Templating Manage Model Detail...');
            return _.template(manageTemplate)(model);
        },
        className:     'manage-detail',
    });

    /*
     * A Manages Collection View 
     */ 
    var ManagesView = Marionette.CollectionView.extend({
        childView: ManageDetail,
        template : function(model) {
            console.log('Templating Manages Collection...');
            return _.template(managesTemplate)(model);
        },
        className:     'manage-item',
    });

    /* 
     * The Manage Menu Bar
     */
    var ManageMenu = Marionette.ItemView.extend({
        template : function(model) {
            console.log('Templating Manage Menu...');
            return _.template(manageMenu)(model);
        },
        id       : 'manage-menu',
        triggers : {
            'click span#manage-back'    : 'manage:back',
        },
        onManageBack : function(ev){
            App.vent.trigger('menu:show');
        }
    });

    /*
     * Simple Manage Layout
     */
    var ManageLayout = Marionette.LayoutView.extend({
        id : 'manage-layout',
        template : function(model) {
            console.log('Templating Manage Layout...');
            return _.template(manageLayout)(model);
        },

        regions: {
            menu    : '#manage-menu-stage',
            manage  : '#manage-main-stage',
            pageOne : '#manage-page-one',
            pageTwo : '#manage-page-two'
        },

        onBeforeShow: function () {
            var that        = this;

            var manage      = new Manage();
            var manages     = new Manages();
            this.master     = new ManagesView({ model : manage, collection : manages });
            manages.fetch()
                .done(function(items){
                    console.log(JSON.stringify(items));
                })
                .fail(function(xhr, status, msg){
                    var cause = Utils.failure(xhr, status, msg);
                    console.log('Error retrieving manage : ' + cause);
                });
            that.getRegion('pageOne').show(this.master);

            var manageMenu  = new ManageMenu();
            manageMenu.on('manage:back', function(args){
                console.log('Manage Back');
            });
            that.getRegion('menu').show(manageMenu);
        },
    });

    return { Layout : ManageLayout };

});