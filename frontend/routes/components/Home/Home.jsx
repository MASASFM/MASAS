var React = require("react")
var ReactDOM = require("react-dom")

var {goToURL} = require("../../../MASAS_functions.jsx")

var Button = require("../../containers/UI/Button.jsx")
var Link = require("../../containers/UI/Link.jsx")

var HomeCountdown = require("./HomeCountdown.jsx")


var Home = React.createClass({

	goToPage1: function() {
		console.log('GOTO PAGE 2')
		document.getElementById('homepage-login').className = 'page1--wrapper'
		document.getElementById('homepage-description--choose').className='page2--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background'
	},

	goToPage2: function() {
		console.log('GOTO PAGE 1')
		document.getElementById('homepage-login').className = 'page2--wrapper'
		document.getElementById('homepage-description--choose').className='page1--wrapper'
		document.getElementsByClassName('body--background')[0].className = 'body--background blurred'
	},

	render: function() {
		return (
			<div className="home--wrapper">
				<div className="multiPage--wrapper">
					<div className="page1--wrapper" id="homepage-login">
						<div className="logo" onClick={this.goToPage2}>
							<HomeCountdown />
						</div>
						<div className="login-container" style={{display: (this.props.user ? 'none' : 'flex')}}>
							<Button onClick={goToURL.bind(null, 'login')} caps={true}>log-in</Button>
							<br />
							<Link to="/sign-up" className="signup-text">Sign up</Link>
						</div>
					</div>
					<div className="page2--wrapper" id="homepage-description--choose">
						<h1 onClick={this.goToPage1}>it's all about you...</h1>
						<div className="links--wrapper">
							<img src="/static/img/homepage/picto_artist.png" alt="I'm an artist" />
							<img src="/static/img/homepage/picto_musicLover.png" alt="I'm a music lover" />
						</div>
					</div>
					<div className="page2--wrapper" id="homepage-description--artist">
						<h1 onClick={this.goToPage1}>FOO</h1>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Home