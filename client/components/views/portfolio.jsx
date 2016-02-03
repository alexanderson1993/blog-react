PortfolioPage = React.createClass({
	mixins: [ ReactMeteorData],
	getMeteorData() {

	},
	renderPortfolio() {
		if (this.data.portfolio.length > 0) {
			return this.data.portfolio.map( (portfolio) => {
				return <PortfolioItem key={ portfolio._id } portfolio={ portfolio } />;
			});
		} else {
			return <InfoAlert>No Portfolio Items Yet</InfoAlert>
		}
	},
	render() {
		return <div className="portfolio">
		<GridRow>
		<GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
		<Jumbotron className="portfolio-header">
		<h2>Portfolio<small>See all my stuff</small></h2>
		</Jumbotron>
		{ this.renderPortfolio() }
		</GridColumn>
		</GridRow>
		</div>
	}
});
