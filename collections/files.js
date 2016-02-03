FS.File.prototype.directUrl = function(baseUrl, storeName) {
	var self = this;
    // Make sure the file object is mounted in a cfs and make sure we have loaded
    // the file record. Note that this requires the cfs to be published.
    if (self.isMounted() && self.getFileRecord()) {
    	var store = self.copies[storeName];
    	return baseUrl + store.key;
    }
    return null;
}

if (Meteor.isServer){
	var imageStore = new FS.Store.S3("images", {
	  accessKeyId: Meteor.settings.AWSAccessKeyId, //required if environment variables are not set
	  secretAccessKey: Meteor.settings.AWSSecretAccessKey, //required if environment variables are not set
	  bucket: "ralex93", //required
	  ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
	  folder: "blog", //optional, which folder (key prefix) in the bucket to use 
	  maxTries: 1 //optional, default 5
	});
} else {
	var imageStore = new FS.Store.S3("images", {});
}
Files = new FS.Collection("images", {
	stores: [imageStore]
});

Files.allow({
	'insert': function () {
    	// add custom authentication code here
    	return true;
    },
    'update': function(){
    	return true;
    },
    'remove':function(){
    	return true;
    },
    download: function(userId, fileObj) {
    	return true
    }
});
