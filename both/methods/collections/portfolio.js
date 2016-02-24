Meteor.methods({
	portfolioOperation( op, argument ) {
		check( op, String);
		check( argument, Object );
		try {
			if (op === 'remove'){
				return Portfolio.remove( argument );
			}
			if (op === 'update'){
				return Portfolio.update({_id: argument._id},{$set: argument.body} );
			}
			return Portfolio.insert( argument );
		} catch( exception ) {
			throw exception;
		}
	}
});
