Dict = React.createClass({
	mixins: [ ReactMeteorData ],
	getMeteorData() {
		return {
			brandLink: !!Meteor.user() ? '/posts' : '/',
			user: Meteor.user()
		};
	},
	render() {
		return <div></div>;
	}
});
