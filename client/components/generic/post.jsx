Post = React.createClass({
  getPostTitle() {
    let post = this.props.post;
    
    if ( this.props.singlePost ) {
      return <h3>{ post.title }</h3>;
    } else {
      return <h3><a href={ `/blog/${ post.slug }`}>{ post.title }</a></h3>;
    }
  },
  getHTML( markdown ) {
    if ( markdown ) {
      return { __html: parseMarkdown( markdown ) };
    }
  },
  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="tag" href={ `/blog/tags/${ tag }` }>#{ tag }</a>;
        })}
      </div>;
    }
  },
  render() {
    let { formatLastUpdate } = ReactHelpers,
        post                 = this.props.post;
        var html;
    if (this.props.singlePost){
      html = post.content;
    } else {
      html = post.exerpt;
    }
    return <div className="post">
      { this.getPostTitle() }
      <p><strong>Last Updated:</strong> { formatLastUpdate( post.updated ) } by { post.author }</p>
      { this.renderTags( post.tags ) }
      <div className="post-body" dangerouslySetInnerHTML={ this.getHTML( html ) } />
    </div>;
  }
});
