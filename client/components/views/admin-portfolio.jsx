PortfolioAdmin = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe('portfolio');
		return {
			portfolio: Portfolio.find().fetch(),
			selectedPortfolio: Portfolio.findOne({_id:Session.get('portfolioAdmin_selectedPortfolio')})
		};
	},
	_renderPortfolioList() {
		return _.map(this.data.portfolio,(item)=>{
			return <PortfolioAdminList name={item.name} id={item._id} key={item._id} />;
		});
	},
	_renderPortfolioItem() {
		if (this.data.selectedPortfolio){
			return <Form ref="editPortfolioForm" onSubmit={ this.handleSubmit }>
			<FormGroup>
			<FormControl
			showLabel={ true }
			style="input"
			type="text"
			name="title"
			label="Title"
			defaultValue={this.data.selectedPortfolio && this.data.selectedPortfolio.name}
			/>
			</FormGroup>
			<FormGroup>
			<FormControl
			showLabel={ true }
			style="input"
			type="text"
			name="title"
			label="Year"
			defaultValue={this.data.selectedPortfolio && this.data.selectedPortfolio.year}
			/>
			</FormGroup>
			<FormGroup>
			<FormControl
			showLabel={ false }
			style="textarea"
			name="title"
			label="Description"
			defaultValue={this.data.selectedPortfolio && this.data.selectedPortfolio.description}
			/>
			</FormGroup>

			/*Display images */
			<FormGroup>
			<SuccessButton type="submit" label="Save Post" />
			</FormGroup>
			</Form>
		}
	},
	createPortfolioItem() {
		Meteor.call('portfolioOperation','insert',{});
	},
	handleSubmit() {

	},
	render() {
		return <GridRow>
		<PageHeader size="h4" label="Portfolio Admin" />
		<GridColumn className="col-sm-4">
		{this._renderPortfolioList()}
		<SuccessButton type="button" onClick={this.createPortfolioItem} label="Create New Item" />
		</GridColumn>
		<GridColumn className="col-sm-8">
		{this._renderPortfolioItem()}
		</GridColumn>
		</GridRow>
	}
});

PortfolioAdminList = React.createClass({
	render() {
		return <p onClick={this._handleClick}>{this.props.name}</p>;
	},
	_handleClick() {
		Session.set('portfolioAdmin_selectedPortfolio', this.props.id);
	}
});
