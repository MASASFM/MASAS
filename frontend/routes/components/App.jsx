var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")
var StyleRoot = Radium.StyleRoot

var Header = require("../containers/Header/Header.jsx")
var Body = require("../containers/UI/Body.jsx")
var Footer = require("../containers/Footer/Footer.jsx")
var Home = require("../containers/Home/Home.jsx")
var NavSidebar = require("../containers/NavSidebar/NavSidebar.jsx")

var SC = require('soundcloud')
var Cookie = require('js-cookie')



var App = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		SC.initialize({
			client_id: document.MASAS.SC.client_id,
			redirect_uri: document.MASAS.SC.redirect_uri 
		})

		var userToken = this.getUserTokenFromCookie()

		if(userToken)
			this.props.logInWithToken(userToken, this.props.finishProcessingAuthCookie)
		else
			this.props.forceRender()
	},

	componentDidMount: function() {
		document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
		document.getElementById('content').style.height = window.innerHeight + 'px'
		document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'

		window.addEventListener("resize", () => {
			document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px'
			document.getElementById('content').style.height = window.innerHeight + 'px'
			document.getElementById('mobile-safari-bug-fix--wrapper').style.height = window.innerHeight + 'px'
		})
	},

	getUserTokenFromCookie: function() {
		return Cookie.get('MASAS_authToken')
	},	

	render: function() {

		// don't render app until the auth cookie has been processed
		if(!this.props.processingAuthCookie)
			return (
				<NavSidebar>
					<div style = { styles.container } id="mobile-safari-bug-fix--wrapper">
						<Header />
							{this.props.children ? 
									this.props.children
								:
									 <Home />
							}
						<Footer />
									
					</div>
					<div id="jquery_jplayer_1"></div>
				</NavSidebar>
			)
		else
			return (
				<NavSidebar>
					<div style = { styles.container } id="mobile-safari-bug-fix--wrapper">
						<Header />
							<h1>LOADING...</h1>
						<Footer />
									
					</div>
					<div id="jquery_jplayer_1"></div>
				</NavSidebar>
			)
		
	}
})

var styles = {
	container: {
		// minHeight: '100vh',
		// maxHeight: '100vh',
		height: window.innerHeight + 'px',
		// height: '100%',
		display: 'flex',
		flexDirection: 'column',
	}
}


module.exports = App