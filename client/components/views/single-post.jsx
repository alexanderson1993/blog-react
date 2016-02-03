SinglePost = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let sub = Meteor.subscribe( 'singlePost', this.props.slug );

    return {
      post: Posts.findOne( { slug: this.props.slug } ),
      ready: sub.ready()
    };
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
    if ( !this.data ) { return <div style={fullStyle} />; }
    return <GridRow>
    <div style={fullStyle}></div>
    <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
    <Post singlePost={ true } post={ this.data.ready && this.data && this.data.post } />
    </GridColumn>
    </GridRow>;
  }
});
