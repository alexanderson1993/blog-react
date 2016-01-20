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
			return <div className="social">
			<a key={Random.id()} className="socialCirc" href={social.link} target="_blank">
			<i className={'fa ' + social.icon}></i>
			</a>
			</div>
		});
	},
	render() {
		return <div className="front">
		<div className="picture">
		<img src={ this.dict('frontPict') } />
		</div>
		<div className="sideText">
		<h1>{ this.dict('name') }</h1>
		<h4>{ this.dict('location') }</h4>
		<div dangerouslySetInnerHTML={{__html: this.dict('text')}}></div>
		{ this.renderSocial() }
		</div>
		</div>;
	}
});
