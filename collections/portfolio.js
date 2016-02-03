Portfolio = new Mongo.Collection( 'portfolio' );

Portfolio.allow({
	insert: () => {if (Meteor.userId()){return false; } else {return true; }},
	update: () => false,
	remove: () => false
});

Portfolio.deny({
	insert: () => {if (Meteor.userId()){return true; } else {return false; }},
	update: () => true,
	remove: () => true
});

let PortfolioSchema = new SimpleSchema({
	"name":{
		type: String
	},
	"description":{
		type: String,
	},
	"year":{
		type: Number
	},
	images: {
		type: Array,
		minCount: 1
	},
	"images.$": {
		type: String
	}
});

Portfolio.attachSchema( PortfolioSchema );
