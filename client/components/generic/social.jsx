SocialClass = React.createClass({
	render() {
		return <div className="hint--top social" data-hint={this.props.name}>
		<a className="socialCirc" href={this.props.link} target="_blank">
		<i className={'fa ' + this.props.icon}></i>
		</a>
		</div>;
	}
});
