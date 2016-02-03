FilesRender = React.createClass({
	mixins: [ ReactMeteorData ],
	getMeteorData(){
		Meteor.subscribe('files');
		return {
			files:Files.find( {}, { sort: { "added": -1 } } ).fetch()
		};
	},
	outputFiles() {
		if (this.data.files.length === 0){
			return <p className="alert alert-warning">No files uploaded yet!</p>;
		}
		return this.data.files.map(function(e){
			return <File key={e._id} file={e} />;
		});
	},
	render() {
		return <div className="files row">
		{ this.outputFiles() }
		</div>;
	}
});
