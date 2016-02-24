Resume = new Mongo.Collection( 'resume' );

Resume.allow({
	insert: function(){return Roles.userIsInRole(Meteor.userId(), 'admin')},
	update: function(){return Roles.userIsInRole(Meteor.userId(), 'admin')},
	remove: function(){return Roles.userIsInRole(Meteor.userId(), 'admin')}
});

Resume.deny({
	insert: function(){return !Roles.userIsInRole(Meteor.userId(), 'admin')},
	update: function(){return !Roles.userIsInRole(Meteor.userId(), 'admin')},
	remove: function(){return !Roles.userIsInRole(Meteor.userId(), 'admin')}
});

Schemas.Resume = new SimpleSchema({
	fullName:{
		type:String,
	},
	email:{
		type:String,
		optional:true,
		autoform:{
			type:'email'
		}
	},
	avatar:{
		type:String,
		optional:true,
	},
	title:{
		type:String,
		optional:true,
	},
	location:{
		type:String,
		optional:true,
	},
	homepage:{
		type:String,
		optional:true,
	},
	twitter:{
		type:String,
		optional:true,
	},
	tech:{
		type:String,
		optional:true,
	},
	about:{
		type:String,
		optional:true,
		autoform:{
			rows:5
		}
	},
	experience:{
		type:Array,
		optional:true,
		minCount:0,
		maxCount:5
	},
	"experience.$":{
		type:Object
	},
	"experience.$.title":{
		type:String,
		optional:true
	},
	"experience.$.since":{
		type:String,
		optional:true,
	},
	"experience.$.till":{
		type:String,
		optional:true,
	},
	"experience.$.tech":{
		type:String,
		optional:true
	},
	"experience.$.about":{
		type:String,
		optional:true,
	},
	education:{
		type:Array,
		optional:true,
		minCount:0,
		maxCount:5
	},
	"education.$":{
		type:Object
	},
	"education.$.title":{
		type:String,
		optional:true
	},
	"education.$.since":{
		type:String,
		optional:true
	},
	"education.$.till":{
		type:String,
		optional:true
	},
	"education.$.tech":{
		type:String,
		optional:true
	},
	"education.$.about":{
		type:String,
		optional:true
	},
	projects:{
		type:Array,
		optional:true,
		minCount:0,
		maxCount:5
	},
	"projects.$":{
		type:Object
	},
	"projects.$.title":{
		type:String,
		optional:true
	},
	"projects.$.url":{
		type:String,
		optional:true
	},
	"projects.$.desc":{
		type:String,
		optional:true
	},
	"writingHabits":{
		type:String,
		optional:true
	},
	writing:{
		type:Array,
		optional:true,
		minCount:0,
		maxCount:5
	},
	"writing.$":{
		type:Object
	},
	"writing.$.title":{
		type:String,
		optional:true
	},
	"writing.$.url":{
		type:String,
		optional:true
	},
	markdown:{
		type:String,
		optional:true
	}
});

Resume.attachSchema(Schemas.Resume);