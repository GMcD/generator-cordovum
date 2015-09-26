/* App */
define(['config','jquery','underscore','backbone','marionette','home/home', 'menu/menu' ], 
  function(config, $, _, Backbone, Marionette, Home, Menu ){

    /* Main App */
    App = new Marionette.Application({
      initialize: function(){
      },
    });

    /* Set Up Marionette Menu and Main Stages */
    App.addRegions({
        menuRegion  : '#menu-stage',
        mainRegion  : '#main-stage'
    });

    /* Add Start Handler */
    App.on("start", function(){
        console.log("App has started!");
        App.vent.trigger('menu:show');
    });

    /* 
     * Listen for Menu Layout Show 
     */
    App.listenTo(App.vent, 'menu:show', function(){
        var menu    = new Menu.View();
        App.menuRegion.show(menu);
    });

    /* 
     * Listen for Home Layout Show 
     */
    App.listenTo(App.vent, 'home:show', function(){
        var home    = new Home.View();
        App.menuRegion.show(home);
    });

    return App;
});
