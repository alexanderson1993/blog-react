Meteor.methods({
	fblogin: function(response) {
		check(response, Object);
		var identity = Meteor.call('$getIdentity', response.access_token);
    // synchronous call to get the user info from Facebook

    var serviceData = {
    	accessToken: response.access_token,
    	expiresAt: (+new Date) + (1000 * response.expires_in)
    };
    // include all fields from facebook
    // http://developers.facebook.com/docs/reference/login/public-profile-and-friend-list/
    var whitelisted = ['id', 'email', 'name', 'first_name',
    'last_name', 'link', 'username', 'gender', 'locale', 'age_range'];

    var fields = _.pick(identity, whitelisted);
    _.extend(serviceData, fields);
    var stuff = {
    	serviceName : 'facebook',
    	serviceData: serviceData,
    	options: {profile: {name: identity.name, email: identity.email}}
    };
    var userData = Accounts.updateOrCreateUserFromExternalService(stuff.serviceName, stuff.serviceData, stuff.options);
    var x = DDP._CurrentInvocation.get();

    var token = Accounts._generateStampedLoginToken();
    Accounts._insertLoginToken(userData.userId, token);
    Accounts._setLoginToken(userData.userId, x.connection, Accounts._hashLoginToken(token.token));
    x.setUserId(userData.userId);
    Meteor.users.update({_id:userData.userId},{$set:{emails:[{address:identity.email, verified:true}]}});
    return {
    	id: userData.userId,
    	token: token.token,
    	tokenExpires: Accounts._tokenExpiration(token.when)
    };

},
$getIdentity: function(accessToken) {
	check(accessToken, String);
	try {
		var data = HTTP.get("https://graph.facebook.com/me?fields=id,name,email,gender", {
			params: {access_token: accessToken}}).data;
		return data;
	} catch (err) {
		throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
			{response: err.response});
	}
},
});

