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
let year = moment().year().toString();
let PortfolioSchema = new SimpleSchema({
	"name":{
		type: String,
		defaultValue: "Untitled Item"
	},
	"description":{
		type: String,
		optional:true
	},
	"year":{
		type: String,
		defaultValue: year
	},
	images: {
		type: Array,
		minCount: 1,
		optional:true
	},
	"images.$": {
		type: String
	}
});

Portfolio.attachSchema( PortfolioSchema );
