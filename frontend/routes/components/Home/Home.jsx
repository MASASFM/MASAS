var React = require("react")
var ReactDOM = require("react-dom")

var {goToURL} = require("../../../MASAS_functions.jsx")

var Button = require("../../containers/UI/Button.jsx")
var Link = require("../../containers/UI/Link.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")

// <img src="/static/img/logo.svg" alt="MASAS" />

var Home = (props) => {
	return (
		<div className="home--wrapper">
			<div className="logo">
				<HomeCountdown />
			</div>
			<div className="login-container" style={{display: (props.user ? 'none' : 'flex')}}>
				<Button onClick={goToURL.bind(null, 'login')}>LOG-IN</Button>
				<br />
				<Link to="/sign-up" className="signup-text">Sign up</Link>
			</div>
		</div>
	)
}

module.exports = Home