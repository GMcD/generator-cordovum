<div class="<%= _.slugify(siloName) %>-page">
	<div class="<%= _.slugify(siloName) %>-collection">
    < % _.each( collection, function( <%= _.slugify(siloName) %>, id ) { % >
    	<div id="<%= _.slugify(siloName) %>-id">< %= JSON.stringify(<%= _.slugify(siloName) %>) % ></div>
    < % }); % >
	</div>
</div>
