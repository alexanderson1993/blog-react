const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/posts', {
  name: 'posts',
  action() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <PostsList /> } );
    } else {
      FlowRouter.go('/login');
    }
  }
});

authenticatedRoutes.route( '/posts/:_id/edit', {
  name: 'editor',
  action( params ) {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <Editor post={ params._id } /> } );
    } else {
      FlowRouter.go('/login');
    }
  }
});

authenticatedRoutes.route( '/upload', {
  name: 'upload',
  action() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <Upload /> } );
    } else {
      FlowRouter.go('/login');
    }
  }
});

authenticatedRoutes.route( '/portfolioAdmin', {
  name: 'portfolioAdmin',
  action() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')){
      ReactLayout.render( App, { yield: <PortfolioAdmin /> } );
    } else {
      FlowRouter.go('/login');
    }
  }
});

authenticatedRoutes.route( '/resumeAdmin', {
  name: 'resumeAdmin',
  action() {
    Meteor.subscribe('roles',{
      onReady: function () { 
        if (Roles.userIsInRole(Meteor.userId(), 'admin')){
          ReactLayout.render( App, { yield: <ResumeAdmin /> } );
        } else {
          FlowRouter.go('/login');
        }
      },
      onError: function () { 
        console.log("onError", arguments); 
      }
    })
  }
});
