PortfolioItem = React.createClass({
	render() {
		let image = this.props.portfolio.image[0] || '/noImage.png';
		let description = this.props.portfolio.description;
		return <div className="portfolioItem">
		<div className="portfolioImage" style={{backgroundImage: 'url(' + image + ')'}}></div>
		<div className="infoBox">
		<div className="title">{this.props.portfolio.title}</div>
		<div className="title">{description}</div>
		</div>
		<div className="year">{this.props.portfolio.year}</div>
		</div>
	}
});
