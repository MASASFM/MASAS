// Thomass-MacBook-Pro-2:frontend thomasbinetruy$ watchify index.jsx -t babelify -o "../node_modules/exorcist/bin/exorcist.js  bundle.js.map > bundle.js" -d

var React = require("react")
var ReactDOM = require("react-dom")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/App.jsx")

var Radium = require("radium")
var StyleRoot = Radium.StyleRoot

var Header = require("../Header/Header.jsx")
// var Body = require("../containers/UI/Body.jsx")
var { Modal, Body } = require("../UI/UI.jsx")
var Footer = require("../Footer/Footer.jsx")
var Home = require("../Home/Home.jsx")
var NavSidebar = require("../NavSidebar/NavSidebar.jsx")

var SC = require('soundcloud')
var Cookie = require('js-cookie')



var App = React.createClass({
	propTypes: {
	},

	componentWillMount: function() {
		// BIND EVENTS TO AJAX REQUESTS
		// http://api.jquery.com/Ajax_Events/

		$(document).bind("ajaxStart", () => {
			this.props.showAppFetchingBar()
		}).bind("ajaxStop", () => {
			this.props.hideAppFetchingBar()
		})


		// INIT SOUNDCLOUD JS SDK
		SC.initialize({
			client_id: document.MASAS.SC.client_id,
			redirect_uri: document.MASAS.SC.redirect_uri ,
			display: 'popup'
		})

		// SIGN IN USER IF VALID MASAS AND FB TOKENs STORED IN COOKIES
		var userToken = this.getUserTokenFromCookie()

		if(userToken)
			this.props.logInWithToken(userToken, this.props.finishProcessingAuthCookie)
		else
			this.props.forceRender()	// auth cookie is done processing
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
					<div style = { styles.container } id="mobile-safari-bug-fix--wrapper" >
						<div className={"body--background"+ ( this.props.isModalOpened ? " saturated" : "" )} id="body--background">
						</div>
						<Header />
							<div className={ "modal-blur--wrapper" + ( this.props.isModalOpened ? " blurred" : "" )}>
								{this.props.children ? 
										this.props.children
									:
										 <Home />
								}
							</div>
						<Footer />
									
					</div>
					<div id="jquery_jplayer_1"></div>
					<Modal 
						isOpened={ this.props.isModalOpened }
						closeModalFunc={ this.props.toogleModal }>
						{ this.props.modalContent }
					</Modal>
				</NavSidebar>
			)
		else
			return (
				<NavSidebar>
					<div style = { styles.container } id="mobile-safari-bug-fix--wrapper">
						<Header />
							<div style={{ display: 'flex', flex: 1 }}>
								<h1>LOADING...</h1>
							</div>
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


module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
// module.exports = App