Meteor.publish('dict',function(){
	return Dict.find();
});
