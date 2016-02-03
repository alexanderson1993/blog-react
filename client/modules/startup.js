let startup = () => {
	Bert.defaults = {
		hideDelay: 3500,
		style: 'growl-top-right',
		type: 'default'
	};
	Session.set('geoPattern',GeoPattern.generate(Meteor.uuid()).toDataUrl());
};

Modules.client.startup = startup;
