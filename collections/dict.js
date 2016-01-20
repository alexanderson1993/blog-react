Dict = new Mongo.Collection( 'dict' );

Dict.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Dict.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

let DictSchema = new SimpleSchema({
	"key":{
		type: String
	},
	"content":{
		type: String,
		//autoform:{
		//	rows:5
		//}
	}
});

Dict.attachSchema( DictSchema );

