Meteor.methods({
	socialOperation( op, argument ) {
		check( op, String);
		check( argument, Object );
		try {
			if (op === 'remove'){
				return Social.remove( argument );
			}
			if (op === 'update'){
				return Social.update({_id: argument._id},{$set: argument.body} );
			}
			return Social.insert( argument );
		} catch( exception ) {
			return exception;
		}
	}
});
