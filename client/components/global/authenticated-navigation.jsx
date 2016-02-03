AuthenticatedNavigation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let userEmail = Meteor.user().emails[0].address;
    let isAdmin = Roles.userIsInRole(Meteor.userId(),'admin');
    let left = [
    { uid: 'about', href: '/', label: 'About' },
    { uid: 'blog', href: '/blog', label :'Blog'},
    ];
    if (isAdmin) {
      left.push({
        uid: 'admin',
        href: '#',
        label: 'Admin',
        dropdown: true,
        dropdownItems: [
        { uid: 'posts', href: '/posts', label: 'Posts' },
        { uid: 'upload', href: '/upload', label: 'Upload' },
        { uid: 'portfolioAdmin', href: '/portfolioAdmin', label: 'Portfolio' }
        ]
      });
    }
    return {
      items: {
        left: left,
        right: [
        {
          uid: 'currentUser',
          href: '#',
          label: userEmail,
          dropdown: true,
          dropdownItems: [
          { uid: 'logout', href: '#', label: 'Logout', action: () => {
            return Meteor.logout( () => {
              FlowRouter.go( 'index' );
            });
          }}
          ]
        }
        ]
      }
    };
  },
  render() {
    return <div className="authenticated-navigation">
    <NavBarNav position={ `navbar-left` } items={ this.data.items.left } />
    <NavBarNav position={ `navbar-right` } items={ this.data.items.right } />
    </div>;
  }
});
