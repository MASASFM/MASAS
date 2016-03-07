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

SC.initialize({
  client_id: 'e5d965905a85b11e108d064bc04430a3',
  redirect_uri: 'http://localhost:8000/sc-callback'
});

var App = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		var userToken = this.getUserTokenFromCookie()

		if(userToken)
			this.props.logInWithToken(userToken)
	},

	getUserTokenFromCookie: function() {
		console.log(Cookie.get('MASAS_authToken'))
		
		return Cookie.get('MASAS_authToken')
	},	

	render: function() {
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
		);
	}
});

var styles = {
	container: {
		minHeight: '100vh',
		maxHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
	}
}


module.exports = Radium(App)