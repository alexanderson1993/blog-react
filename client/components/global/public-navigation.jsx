PublicNavigation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      items: {
        left: [
        { uid: 'about', href: '/', label: 'About' },
        { uid: 'blog', href: '/blog', label :'Blog'}
        ],
        right: [
        { uid: 'login', href: '/login', label: 'Login' },
        ]
      }
    };
  },
  render() {
    return <div className="public-navigation">
    <NavBarNav position={ `navbar-left` } items={ this.data.items.left } />
    <NavBarNav position={ `navbar-right` } items={ this.data.items.right } />
    </div>;
  }
});
