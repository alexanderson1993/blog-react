Login = React.createClass({
  validations() {
    let component = this;

    return {
      rules: {
        emailAddress: {
          required: true,
          email: true
        },
        password: {
          required: true
        }
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address legit?'
        },
        password: {
          required: 'Need a password here.'
        }
      },
      submitHandler() {
        let { getValue } = ReactHelpers;

        let form     = component.refs.loginForm.refs.form,
        email    = getValue( form, '[name="emailAddress"]' ),
        password = getValue( form, '[name="password"]' );

        Meteor.loginWithPassword( email, password, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Logged in!', 'success' );
          }
        });
      }
    };
  },
  handleFacebook(e){
    var redirect = Meteor.absoluteUrl() + 'oauth?redirect=' + Session.get('previous_url');
    var clientId = '809381422412544';
    var url = 'https://www.facebook.com/dialog/oauth?client_id=' + clientId + '&response_type=token&redirect_uri=' + redirect;
    e.preventDefault();
    window.location = url;
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    let passwordLabelLink = {
      href: '/recover-password',
      label: 'Forget Password?'
    };

    return <GridRow className="login">
    <GridColumn className="col-xs-12 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
    <PageHeader size="h4" label="Log In" />
    <button className="btn btn-facebook btn-block" onClick={this.handleFacebook}>Log In With Facebook</button>
    <div className="at-sep"><strong>OR</strong></div>
    <Form ref="loginForm" id="login" className="login" validations={ this.validations() } onSubmit={ this.handleSubmit }>
    <FormGroup>
    <EmailInput ref="emailAddress" showLabel={ true } />
    </FormGroup>
    <FormGroup>
    <PasswordInput ref="password" showLabel={ true } labelLink={ passwordLabelLink } />
    </FormGroup>
    <FormGroup>
    <SuccessButton type="submit" label="Login" />
    </FormGroup>
    </Form>
    </GridColumn>
    </GridRow>;
  }
});
