function downloadJSON() {
	utils.downloadFromData(JSON.stringify(way.get('inputData'), null, ' '), 'application/json', 'cv.json');
}

function downloadRaw () {
	utils.downloadFromData(renderer(way.get('inputData'), reducers), 'text/plain', 'cv.md');
}

ResumeAdmin = React.createClass({
	mixins:[ReactMeteorData],
	getMeteorData() {
		var self = this;
		if (!this.state || !this.state.updated){
			Meteor.subscribe('resume',{
				onReady:function(){
					self.setState({updated:true});
					self.forceUpdate();
				}
			});
		}
		return {
			resume: Resume.findOne(),

		};
	},
	render() {
		if (this.state && this.state.updated){
			return( 
				<div className="container">
				<GridRow>
				<GridColumn className="col-xs-6 col-sm-4">
				<QuickFormWrapper collection="Resume" id="insertTemplateForm" doc={ this.data.resume } type="method" meteormethod="resumeUpdate" />
				</GridColumn>
				<GridColumn className="col-xs-6 col-sm-8">
				<div className="container">
				<button className="btn btn-default" id="btnMd">Markdown</button>
				<button className="btn btn-default" id="btnLive">Live Preview</button>
				<button className="btn btn-success" id="btnExport">Export JSON</button>
				<button className="btn btn-success" id="btnDownload">Download Raw Markdown</button>
				</div>
				<pre id="previewer">
				{ this.data.resume.markdown }
				</pre>
				<div id="live-preview" className="hidden">
				</div>
				</GridColumn>
				</GridRow> 
				</div>
				);
		} else {
			return(
				<div></div>
				);
		}
	}
});