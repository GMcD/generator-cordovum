define([<%= _.slugify(siloName) %>], function(<%= _.capitalize(siloName) %>) {

	app = { baseUrl : 'http://www.your-api.com/'};

	return describe('<%= _.capitalize(siloName) %> :: ', function() {
		var done, result;

		beforeEach(function () {
			$('body').html('<div id="stage">Eeek!</div>');
		});

		describe('Fetch :: ', function() {
			it('fetch First <%= _.capitalize(siloName) %>', function(){
				var model = new <%= _.capitalize(siloName) %>.Model({ id : 1 });
				var url = model.url();
				expect(url).toEqual(app.baseUrl + '<%= apiUrl %>/1/');
				model.fetch()
						.done(function(profile){
							result = true;
						})
						.fail(function(){
							result = false;
						})
						.always(function(){
							done = true;
						});
			});

			waitsFor(function(){
				return done === true;
			}, "the flag to be toggled...", 1000);

			runs(function(){
				expect(result).toBeTruthy();	
			});
		});

		describe('View :: ', function() {
			var model = new <%= _.capitalize(siloName) %>.Model({ id : 1 });
			var view = new <%= _.capitalize(siloName) %>.View({ el: $('div#stage'), model : model });

			it('it fetches model...', function(){
				spyOn(view, 'render');
				model.fetch()
						.done(function(){
							result = true;
						})
						.fail(function(){
							result = false;
						})
						.always(function(){
							done = true;
			    			expect(view.render).toHaveBeenCalled();
						});
			});
			waitsFor(function(){
				return done === true;
			}, "the flag to be toggled...", 1000);

			runs(function(){
				expect(result).toBeTruthy();	
			});

		});		
	});
});
