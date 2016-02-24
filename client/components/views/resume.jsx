ResumePage = React.createClass({
	getHTML( markdown ) {
		if ( markdown ) {
			return { __html: parseMarkdown( markdown ) };
		}
	},
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
	render(){
		if (this.state && this.state.updated){
			var fullStyle = {
				backgroundImage: Session.get('geoPattern'),
				left: '0px',
				right: '0px',
				top: '0px',
				bottom: '0px',
				position: 'fixed',
				paddingTop: '80px'
			};
			return(
				<GridRow>
				<div style={fullStyle}></div>
				<GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
				<div className="resume" dangerouslySetInnerHTML={ this.getHTML( this.data.resume.markdown ) } />
				</GridColumn>
				</GridRow>
				);
		} else {
			return (<div></div>);
		}
	}
});