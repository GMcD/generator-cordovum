define([ 'jquery', 'underscore', 'backbone', 'text!tpl/<%= _.slugify(siloName) %>Template.html'], 
    function( $, _, Backbone, <%= _.slugify(siloName) %>Template ) {

    /*
     * Simple <%= _.capitalize(siloName) %> Model
     */
    var <%= _.capitalize(siloName) %> = Backbone.Model.extend({
        url : function(){
            var url = app.baseUrl + '<%= apiUrl %>/' + this.id + '/';
            return url;
        },
        parse : function(resp){
            return resp;
        }
    });

    /*
     * Simple <%= _.capitalize(siloName) %>s Collection
     */
    var <%= _.capitalize(siloName) %>s = Backbone.Collection.extend( {
        url : function(){
            var url = app.baseUrl + '<%= apiUrl %>/';
            return url;
        },
        model: <%= _.capitalize(siloName) %>
    } );

    /*
     * Simple <%= _.capitalize(siloName) %>View
     */
    var <%= _.capitalize(siloName) %>View = Backbone.View.extend({
        el : $('div#stage'),
        /*
         * Initialise and wait for sync to render
         */
        initialize: function(options){
            this.template = _.template( <%= _.slugify(siloName) %>Template );
            this.collection.on( 'sync', this.render, this );
            // or -> this.render();
        },
        /*
         * Renders <%= _.capitalize(siloName) %> View
         */
        render: function(){
            var <%= _.slugify(siloName) %>s = this.collection.toJSON();
            var html = this.template({ collection : <%= _.slugify(siloName) %>s });
            this.$el.html(html);

            return this;
        }
    });

    return { View : <%= _.capitalize(siloName) %>View, Collection : <%= _.capitalize(siloName) %>s, Model : <%= _.capitalize(siloName) %> };

});
