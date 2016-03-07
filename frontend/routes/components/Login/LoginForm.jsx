var React = require("react")
var ReactDOM = require("react-dom")

var Body = require("../../containers/UI/Body.jsx")
var Textbox = require("../../containers/UI/Textbox.jsx")
var Textbox = require("../UI/Textbox.jsx")
var Password = require("../UI/Password.jsx")
var Button = require("../UI/Button.jsx")
var { Link } = require("../../containers/UI/UI.jsx")

var LoginForm = React.createClass({
	componentWillMount: function() {
		this.props.updateTitle('Login', '0')
	},

	

	render: function() {
		return (
			<Body>
			<div className="login-form--wrapper1">
				<div className="header">
					<img src="/static/img/MASAS_logo-M.svg" alt="logo" className="logo" />
					<h1 className="login-title">Welcome back!</h1>
				</div>
				<div className="login-form--wrapper2">
					<div className="fb-login">
						<Button caps={true} white={false} onClick={this.props.logInFB}>Log-in via facebook</Button>
					</div>
					<div className="divider">
						<hr className="horizontal-divider" />
						<div className="vertical-divider">
						</div>
					</div>
					<div className="login-form">
						<Textbox id="login-username-input" labelError="Username does not exist" error={false}>Please enter your username</Textbox><br/>
						<Password id="login-password-input" labelError="Password invalid" error={false}>Please enter your password</Password>
						<Link to="/"><span className="forgot-password">Forgot your password?</span></Link>
					</div>
				</div>
				<div className="login-button">
					<Button caps={false} white={true} onClick={this.props.login} small={true}>Log In</Button>
				</div>
			</div>
			</Body>
		)
	}
});

module.exports = LoginForm