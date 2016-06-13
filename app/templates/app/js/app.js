/* App */
define(['config','jquery','underscore','backbone','marionette','home/home', 'menu/menu', /*** Yeoman Define Placeholder ***/ ], 
  function(config, $, _, Backbone, Marionette, Home, Menu/*** Yeoman Module Placeholder ***/ ){

    /* Main App */
    App = new Marionette.Application({
      initialize: function(){
      },
    });

    /**
     *  Set Up Marionette Menu and Main Stages 
     *    * The Menu Stage is fixed, top left corner, z-index up
     *    * The Main Stage is where the action takes place.
     */
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
        App.mainRegion.show(home);
    });
    /*** Yeoman Placeholder ***/

    return App;
});
