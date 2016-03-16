let startup = () => {
	_setEnvironmentVariables();
	_setBrowserPolicies();
	_generateAccounts();
	_setAdminUser();
	RssFeed.publish('blog', function(query) {
		var self = this;
		self.setValue('title', self.cdata("Alex's Blog"));
		self.setValue('description', self.cdata('It is what it is'));
		self.setValue('link', 'http://ralexanderson.com/blog');
		self.setValue('lastBuildDate', new Date());
		self.setValue('pubDate', new Date());
		self.setValue('ttl', 1);
		Posts.find({published:true}).forEach(function(doc) {
			self.addItem({
				title: doc.title,
				description: parseMarkdown(doc.content),
				link: 'http://ralexanderson.com/blog/' + doc.slug,
				pubDate: new Date(),
				guid: doc.slug
			});
		});
	});
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

var _setAdminUser = () => {
	var adminUser = Meteor.users.findOne({emails:[{address:'alexanderson1993@gmail.com', verified: true}]});
	if (!Roles.userIsInRole(adminUser._id,'admin')){
		Roles.addUsersToRoles([adminUser._id],'admin');
	}
};
Modules.server.startup = startup;
