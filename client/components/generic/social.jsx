Social = React.createClass({
	render() {
		return (
		<a className="socialCirc" href={this.props.link} target="_blank">
		<i className={this.props.icon}></i>
		</a>
		);
	}
});
