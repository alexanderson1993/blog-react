Meteor.methods({
	dictOperation( op, argument ) {
		check( op, String);
		check( argument, Object );
		try {
			if (op === 'remove'){
				return Dict.remove( argument );
			}
			if (op === 'update'){
				return Dict.update({_id: argument._id},{$set: argument.body} );
			}
			return Dict.insert( argument );
		} catch( exception ) {
			return exception;
		}
	}
});
