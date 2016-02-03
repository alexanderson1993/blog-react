Uploader = React.createClass({
	render() {
		return (<div className="upload-area">
		<form id="upload">
		<p className="alert alert-success text-center">
		<span id="alert-area">Click or Drag a File Here to Upload</span>
		<input type="file" onChange={ this.upload } />
		</p>
		</form>
		<FilesRender />
		</div>);
	},
	upload(event, template) {
		Modules.client.uploadToAmazonS3( { event: event, template: template } );
	},
});
