define([ 'jquery', 'underscore', 'backbone', 'text!tpl/<%= _.slugify(siloName) %>Template.html'], 
    function( $, _, Backbone, <%= _.slugify(siloName) %>Template ) {

    /*
     * Simple <%= _.camelize(siloName) %> Model
     */
    var <%= _.camelize(siloName) %> = Backbone.Model.extend({
        url : function(){
            var url = baseUrl + 'api/<%= _.slugify(siloName) %>s/' + this.id + '/';
            return url;
        },
        parse : function(resp){
            return resp;
        }
    });

    /*
     * Simple <%= _.camelize(siloName) %>s Collection
     */
    var <%= _.camelize(siloName) %>s = Backbone.Collection.extend( {
        url : function(){
            var url = baseUrl + 'api/<%= _.slugify(siloName) %>s/';
            return url;
        },
        model: <%= _.camelize(siloName) %>
    } );

    /*
     * Simple <%= _.camelize(siloName) %>View
     */
    var <%= _.camelize(siloName) %>View = Backbone.View.extend({
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
         * Renders <%= _.camelize(siloName) %> View
         */
        render: function(){
            var <%= _.slugify(siloName) %>s = this.collection.toJSON();
            var html = this.template({ collection : <%= _.slugify(siloName) %>s });
            this.$el.html(html);

            return this;
        }
    });

    return { View : <%= _.camelize(siloName) %>View, Collection : <%= _.camelize(siloName) %>s, Model : <%= _.camelize(siloName) %> };

});
