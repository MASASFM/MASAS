var React = require("react")
var ReactDOM = require("react-dom")
var Radium = require("radium")
var StyleRoot = Radium.StyleRoot

var Header = require("../containers/Header/Header.jsx")
var Body = require("../containers/UI/Body.jsx")
var Footer = require("../containers/Footer/Footer.jsx")
var Home = require("../containers/Home/Home.jsx")
import NavSidebar from "../containers/NavSidebar/NavSidebar.jsx"
// import Header from "../containers/Header/Header.jsx"
// import Body from "../containers/UI/Body.jsx"
// import Footer from "../containers/Footer/Footer.jsx"
// import Home from "../containers/Home/Home.jsx"
// import NavSidebar from "../containers/NavSidebar/NavSidebar.jsx"

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

	getUserTokenFromCookie: function() {
		return Cookie.get('MASAS_authToken')
	},	

	render: function() {
		// don't render app until the auth cookie has been processed
		if(!this.props.processingAuthCookie)
			return (
				<NavSidebar>
					<div style = { styles.container }>
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
		else{
			return <div>LOADING</div>
		}
	}
})

var styles = {
	container: {
		minHeight: '100vh',
		maxHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	}
}


module.exports = App