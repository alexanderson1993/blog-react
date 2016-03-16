PortfolioAdmin = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		Meteor.subscribe('portfolio');
		return {
			portfolio: Portfolio.find().fetch(),
			selectedPortfolio: Session.get('portfolioAdmin_selectedPortfolio')
		};
	},
	_renderPortfolioList() {
		return _.map(this.data.portfolio,(item)=>{
			return <PortfolioAdminList name={item.name} id={item._id} key={item._id} />;
		});
	},
	_renderPortfolioItem() {
		let selectedPortfolio = Portfolio.findOne({_id:this.data.selectedPortfolio});
		if (selectedPortfolio){
			return <Form ref="editPortfolioForm" validations={ this.validations() } onSubmit={ this.handleSubmit }>
			<FormGroup>
			<FormControl
			showLabel={ true }
			style="input"
			type="text"
			name="name"
			label="Title"
			defaultValue={selectedPortfolio.name}
			/>
			</FormGroup>
			<FormGroup>
			<FormControl
			showLabel={ true }
			style="input"
			type="text"
			name="year"
			label="Year"
			defaultValue={selectedPortfolio.year}
			/>
			</FormGroup>
			<FormGroup>
			<FormControl
			showLabel={ false }
			style="textarea"
			name="description"
			label="Description"
			defaultValue={selectedPortfolio.description}
			/>
			</FormGroup>
			{ this._renderImageUrls()}
			<FormGroup>
			<PrimaryButton type="button" label="Add Image" onClick={ this.addImage } />
			</FormGroup>
			<FormGroup>
			<SuccessButton type="submit" label="Save Post" />
			</FormGroup>
			</Form>
		}
	},
	addImage() {
		let selectedPortfolio = Portfolio.findOne({_id:this.data.selectedPortfolio});
		if (selectedPortfolio.pictures.length < 1){
			selectedPortfolio.pictures.length = [];
		}
		selectedPortfolio.pictures.push('');
		Meteor.call('portfolioOperation','update',{_id:component.data.selectedPortfolio,body:selectedPortfolio});
	},
	_renderImageUrls() {
		let selectedPortfolio = Portfolio.findOne({_id:this.data.selectedPortfolio});
		return selectedPortfolio.pictures.map(function(e){
			return (<FormGroup>
				<FormControl
				showLabel={ false }
				style="textarea"
				name="description"
				label="Description"

				/>
				</FormGroup>)
		});
	},
	createPortfolioItem() {
		Meteor.call('portfolioOperation','insert',{});
	},
	validations() {
		let component = this;
		return {
			rules: {
				title: {
					required: true
				}
			},
			messages: {
				title: {
					required: "Hang on there, a title is required!"
				}
			},
			submitHandler(){
				let { getValue, isChecked } = ReactHelpers;
				let form = component.refs.editPortfolioForm.refs.form,
				body = {
					name: getValue(form, '[name="name"]'),
					year: getValue(form, '[name="year"]'),
					description: getValue(form, '[name="description"]')
				};
				Meteor.call('portfolioOperation','update',{_id:component.data.selectedPortfolio,body:body});
			}
		};
	},
	handleSubmit( event ) {
		event.preventDefault();
	},
	render() {
		return <div className="container">
		<GridRow>
		<PageHeader size="h4" label="Portfolio Admin" />
		<GridColumn className="col-sm-4">
		{this._renderPortfolioList()}
		<SuccessButton type="button" onClick={this.createPortfolioItem} label="Create New Item" />
		</GridColumn>
		<GridColumn className="col-sm-8">
		{this._renderPortfolioItem()}
		</GridColumn>
		</GridRow>
		</div>
	}
});

PortfolioAdminList = React.createClass({
	render() {
		return <p onClick={this._handleClick}>{this.props.name}</p>;
	},
	_handleClick() {
		let component = this;
		Session.set('portfolioAdmin_selectedPortfolio', null);
		Meteor.setTimeout(function(){
			Session.set('portfolioAdmin_selectedPortfolio', component.props.id);
		},10);
	}
});
