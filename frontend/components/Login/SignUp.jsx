var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/SignUp.jsx")

var { Body, Textbox, Password, Button, Checkbox } = require("../UI/UI.jsx")

var SignUpForm = React.createClass({
	componentWillMount: function() {
		this.props.updateTitle()
	},

	render: function() {
		return (
			<Body>
			<div className="sign-up-form--wrapper1">
				<div className="header">
					<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
					<h1 className="sign-up--title">For a better collaboration <br />between artists and music lovers</h1>
				</div>
				<div className="sign-up-form--wrapper2">
					<div className="fb-login">
						<Button caps={true} white={false}>Sign-in via facebook</Button>
					</div>
					<div className="vertical-divider">
					</div>
					<div className="sign-up--form">
						<Textbox id="signup-username-input" labelError="Username invalid" error={false}>Please enter your username</Textbox><br />
						<Textbox id="signup-email-input" labelError="Username invalid" error={false}>Please enter your email</Textbox><br />
						<Password id="signup-password-input" labelError="Password invalid" error={false}>Please enter your password</Password><br />
						<Password id="signup-confPassword-input" labelError="Passwords do not match" error={false}>Please confirm your password</Password>
					</div>
				</div>
				<div className="checkboxes">
					<Checkbox id="login-terms-checkbox">I agree to the terms of <span style={{color:'red'}}>uses</span> and privacy policy</Checkbox>
					<Checkbox id="login-newsletter-checkbox">Would you like to receive news from MASAS products and services?</Checkbox>
				</div>
				<div className="sign-up--button">
					<Button caps={false} white={true}>Log In</Button>
				</div>
			</div>
			</Body>
		)
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpForm)