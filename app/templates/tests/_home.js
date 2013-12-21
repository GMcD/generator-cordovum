define(['home'], function(Home) {

	return describe('Backbone Home :: ', function() {

		beforeEach(function () {
			$('body').html('<div id="stage">Eeek!</div>');
		});

		describe('View :: ', function() {
			it('is Welcome Home!', function(){
				var view = new Home.View({ el: $('div#stage')});
				var content = $('div#stage').text();
				expect(content).toContain('Welcome Home!');
			});
		});		
	});
});
