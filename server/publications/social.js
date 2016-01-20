Meteor.publish('social',function(){
	return Social.find();
});
