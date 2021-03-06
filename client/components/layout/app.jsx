App = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      isAdmin: Roles.userIsInRole(Meteor.userId(),'admin'),
      isPublic( route ) {
        return [
        'index',
        'singlePost',
        'tagIndex',
        'login',
        'resume',
        'recoverPassword',
        'resetPassword',
        'notFound'
        ].indexOf( route ) > -1;
      },
      canView() {
        return this.isPublic( FlowRouter.getRouteName() ) || !!Meteor.user();
      }
    };
  },
  getView() {
    return this.data.canView() ? this.props.yield : <Login />;
  },
  render() {
    return <div className="app-root">
    <AppHeader hasUser={ this.data.hasUser } isAdmin={ this.data.isAdmin } />
    { this.data.loggingIn ? <Loading /> : this.getView() }
    </div>;
  }
});
