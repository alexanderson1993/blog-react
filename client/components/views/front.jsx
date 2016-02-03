Front = React.createClass({
	mixins: [ ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe('dict');
		Meteor.subscribe('social');
		return {
			dict: Dict.find({}).fetch(),
			social: Social.find().fetch()
		};
	},
	dict(key) {
		let value = this.data.dict.find(function(e){
			if (e.key === key){
				return true;
			}
		});
		if (value){
			return value.content;
		}
	},
	renderSocial() {
		return this.data.social.map( ( social ) => {
			return <SocialClass key={social._id} link={social.link} icon={social.icon} name={social.name} />
		});
	},
	render() {
		let pictureStyle = {
			background: "url(" + this.dict('frontPict') + ")"
		};
		return <div className="front">
		<div className="picture" style={pictureStyle}>
		</div>
		<div className="sideText">
		<h1>{ this.dict('name') }</h1>
		<h4>{ this.dict('location') }</h4>
		<div dangerouslySetInnerHTML={{__html: this.dict('text')}}></div>
		<div className="socialBlock">
		{ this.renderSocial() }
		</div>
		</div>
		</div>;
	}
});
