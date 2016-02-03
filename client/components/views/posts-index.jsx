PostsIndex = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let query = {};

    if ( this.props.tag ) {
      Meteor.subscribe( 'tagsIndex', this.props.tag );
      query = { tags: { $in: [ this.props.tag ] } };
    } else {
      Meteor.subscribe( 'postsIndex' );
    }

    return {
      posts: Posts.find( query, { sort: { updated: -1 } } ).fetch()
    };
  },
  renderHeader() {
    if ( this.props.tag ) {
      return <Jumbotron className="tags-header">
      <h2>Blog <small>It is what it is...</small></h2>
      <h4><small>Posts tagged with: { this.props.tag }</small></h4>
      </Jumbotron>;
    } else {
      return <Jumbotron className="blog-header">
      <h2>Blog <small>It is what it is...</small></h2>
      </Jumbotron>;
    }
  },
  renderPosts() {
    if ( this.data.posts.length > 0 ) {
      return this.data.posts.map( ( post ) => {
        return <Post key={ post._id } post={ post } />;
      });
    } else {
      return <WarningAlert>No posts found.</WarningAlert>;
    }
  },
  render() {
    var fullStyle = {
      backgroundImage: Session.get('geoPattern'),
      left: '0px',
      right: '0px',
      top: '0px',
      bottom: '0px',
      position: 'fixed',
      paddingTop: '80px'
    };
    return <div className="posts">
    <GridRow>
    <div style={fullStyle}></div>
    <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
    { this.renderHeader() }
    { this.renderPosts() }
    </GridColumn>
    </GridRow>
    </div>;
  }
});
