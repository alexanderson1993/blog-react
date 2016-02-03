File = React.createClass({
	imageType() {
		if (this.props.file.isImage()){
			return <img className="img-responsive" src={ this.imageSource() } alt={ this.imageSource() } />;
		}
		return <i className="fa fa-file-o"></i>
	},
	imageSource() {
		return this.props.file.directUrl('https://s3-us-west-2.amazonaws.com/ralex93/blog/','images');
	},
	render() {
		return <div className="file col-sm-3">
		<div className="preview">
		<a href={ this.imageSource() } target="_blank"></a>
		{ this.imageType() }
		</div>
		<input type="text" readOnly className="form-control" value={ this.imageSource() } />
		</div>;
	}
});
