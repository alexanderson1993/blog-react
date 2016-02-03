const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/posts', {
  name: 'posts',
  action() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <PostsList /> } );
    } else {
      FlowRouter.route('/login');
    }
  }
});

authenticatedRoutes.route( '/posts/:_id/edit', {
  name: 'editor',
  action( params ) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <Editor post={ params._id } /> } );
    } else {
      FlowRouter.route('/login');
    }
  }
});

authenticatedRoutes.route( '/upload', {
  name: 'upload',
  action( params ) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <Upload /> } );
    } else {
      FlowRouter.route('/login');
    }
  }
});
