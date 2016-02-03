Social = new Mongo.Collection( 'social' );

Social.allow({
	insert: () => false,
	update: () => true,
	remove: () => false
});

Social.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

let SocialSchema = new SimpleSchema({
	"name":{
		type:String
	},
	"icon":{
		type:String
	},
	"link":{
		type:String
	}
});

Social.attachSchema( SocialSchema );

