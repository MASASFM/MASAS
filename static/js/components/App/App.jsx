// Thomass-MacBook-Pro-2:frontend thomasbinetruy$ watchify index.jsx -t babelify -o "../node_modules/exorcist/bin/exorcist.js  bundle.js.map > bundle.js" -d

var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/App.jsx")

var Header = require("../Header/Header.jsx")

var { Modal } = require("../UI/UI.jsx")
var Footer = require("../Footer/Footer.jsx")
var Home = require("../Home/Home.jsx")
var NavSidebar = require("../NavSidebar/NavSidebar.jsx")

var SC = require('soundcloud')
var Cookie = require('js-cookie')



var App = React.createClass({
	propTypes: {
		finishProcessingAuthCookie: React.PropTypes.func,

		// redux
		children: React.PropTypes.element,
		navSiderbarOpen: React.PropTypes.bool,
		processingAuthCookie: React.PropTypes.bool,
		isModalOpened: React.PropTypes.bool,
		modalContent: React.PropTypes.element,
		modalType: React.PropTypes.number,
		MASASuser: React.PropTypes.string,

		toogleModal: React.PropTypes.func,
		onSetNavbar: React.PropTypes.func,
		logInWithToken: React.PropTypes.func,
		forceRender: React.PropTypes.func,
		showAppFetchingBar: React.PropTypes.func,
		hideAppFetchingBar: React.PropTypes.func,
		updateUnsplashArtist: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
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


		// INIT BACKGROUND WITH UNSPLASH MASAS LIKES
		var unsplashClientID = "8ad2087b753cfaaa3c601d73395a8205b727571b7491dc80b68ff4bde538ee6b"

		$.ajax({
			type: "GET",
			url: "https://api.unsplash.com/users/masas/likes/",
			data: {
				client_id: unsplashClientID,
				per_page: 30
			},
			success: (r) => {
				const likeNumber = Math.floor(Math.random() * r.length) - 1

				if(likeNumber > -1 && likeNumber < r.length) {
					const like = r[likeNumber]
					this.props.updateUnsplashArtist(like.user.name, like.user.username, like.urls.regular)
				}
			},
			error: () => {
			}
		})
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


		// play pause play hack for mobile 
		$("#jquery_jplayer_1").jPlayer({
			ready: function(	) {
				var streamURL = "http://www.xamuel.com/blank-mp3-files/point1sec.mp3"
				$(this).jPlayer("setMedia", {
					mp3: streamURL,
					oga: ""
				})

				var click = document.ontouchstart === undefined ? 'click' : 'touchstart'
				var kickoff = function () {
					$("#jquery_jplayer_1").jPlayer("play")
					document.documentElement.removeEventListener(click, kickoff, true)
				}
				document.documentElement.addEventListener(click, kickoff, true)
			},

			keyBindings: {
				play: {
					key: 32,
					fn: function(f) {
						if(f.status.paused) {
							f.play()
						} else {
							f.pause()
						}
					}
				}
			},
			swfPath: "http://jplayer.org/latest/dist/jplayer",
			supplied: "mp3, oga",
			wmode: "window",
			useStateClassSkin: true,
			autoBlur: false,
			smoothPlayBar: true,
			keyEnabled: true,
			remainingDuration: true,
			toggleDuration: true
		})

		this.showSplashScreen()
	},

	showSplashScreen: function() {
		if(this.props.MASASuser === "") {
			this.props.toogleModal()
			this.props.updateModalContent(<div>HEYY</div>, 3)
		}
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
							<div className="bg-image" id="app-bg-image"></div>
						</div>
						<Header />
							<div className={ "modal-blur--wrapper" + ( this.props.isModalOpened && this.props.modalType !== 2 ? " blurred" : "" )}>
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
						closeModalFunc={ this.props.toogleModal }
						type={ this.props.modalType }>
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
		height: window.innerHeight + 'px',
		display: 'flex',
		flexDirection: 'column',
	}
}


module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
// module.exports = App
