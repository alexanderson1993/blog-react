Social = new Mongo.Collection( 'social' );

Social.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Social.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

let SocialSchema = new SimpleSchema({
	"icon":{
		type:String
	},
	"link":{
		type:String
	}
});

Social.attachSchema( SocialSchema );

