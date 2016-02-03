const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    GAnalytics.pageview('/');
    ReactLayout.render( App, { yield: <Front /> } );
  }
});

publicRoutes.route('/blog', {
  name: 'index',
  action() {
    GAnalytics.pageview('/blog');
    ReactLayout.render( App, { yield: <PostsIndex /> } );
  }
});

publicRoutes.route( '/blog/:slug', {
  name: 'singlePost',
  action( params ) {
    GAnalytics.pageview('/blog/' + params.slug);
    ReactLayout.render( App, { yield: <SinglePost slug={ params.slug } /> } );
  }
});

publicRoutes.route( '/blog/tags/:tag', {
  name: 'tagIndex',
  action( params ) {
    GAnalytics.pageview('/blog/tags/' + params.tag);
    ReactLayout.render( App, { yield: <PostsIndex tag={ params.tag } /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});

publicRoutes.route('/oauth', {
  name: 'oauth',
  action() {
    if (this.getQueryParam('redirect') && this.getQueryParam('redirect') !== 'undefined'){
      var redirectUrl = this.getQueryParam('redirect');
    }
    var str = window.location.hash;
    str = str.split('&');
    var accessToken = str[0];
    var expiresIn = str[1];
    accessToken = accessToken.split('=');
    expiresIn = expiresIn.split('=');
    var result = {
      access_token : accessToken[1],
      expires_in : expiresIn[1]
    };
    Meteor.call('fblogin', result, function(error, result) {
      Meteor.loginWithToken(result.token, function(err) {
        if (err) {
          Meteor._debug("Error logging in with token: " + err);
        }
        if (redirectUrl){
          FlowRouter.go(redirectUrl);
        } else {
          FlowRouter.go('/');
        }
      });
    });
  }
});
