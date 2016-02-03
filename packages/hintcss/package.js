Package.describe({
	summary: 'Wraps the Hint.css tooltip library',
	version: '1.0.0',
	name: 'hintcss'
});

Package.onUse(function(api) {
	api.addFiles('hint.css', 'client');
});
