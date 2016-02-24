Meteor.publish('resume',function(){
	return Resume.find();
});
