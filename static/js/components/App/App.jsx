var React = require("react")

var ReactRedux = require("react-redux")
var { mapStateToProps, mapDispatchToProps } = require("./containers/App.jsx")

var AppDumb = require("./AppDumb.jsx")
var SplashScreen = require("./SplashScreen.jsx")

var SC = require('soundcloud')
var Cookie = require('js-cookie')



var App = React.createClass({
	propTypes: {
		finishProcessingAuthCookie: React.PropTypes.func,

		// redux
		children: React.PropTypes.element,
		processingAuthCookie: React.PropTypes.bool,
		modalContent: React.PropTypes.element,
		MASASuser: React.PropTypes.string,

		toogleModal: React.PropTypes.func,
		logInWithToken: React.PropTypes.func,
		forceRender: React.PropTypes.func,
		showAppFetchingBar: React.PropTypes.func,
		hideAppFetchingBar: React.PropTypes.func,
		updateUnsplashArtist: React.PropTypes.func,
		updateModalContent: React.PropTypes.func,
		closeModal: React.PropTypes.func,
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
		this.props.updateUnsplashArtist()
		// var unsplashClientID = "8ad2087b753cfaaa3c601d73395a8205b727571b7491dc80b68ff4bde538ee6b"

		// $.ajax({
		// 	type: "GET",
		// 	url: "https://api.unsplash.com/users/masas/likes/",
		// 	data: {
		// 		client_id: unsplashClientID,
		// 		per_page: 30
		// 	},
		// 	success: (r) => {
		// 		const likeNumber = Math.floor(Math.random() * r.length) - 1

		// 		if(likeNumber > -1 && likeNumber < r.length) {
		// 			const like = r[likeNumber]
		// 			this.props.updateUnsplashArtist(like.user.name, like.user.username, like.urls.regular)
		// 		}
		// 	},
		// 	error: () => {
		// 	}
		// })
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

		this.showSplashScreen()
	},

	showSplashScreen: function() {
		if(this.props.MASASuser === "") {
			this.props.toogleModal()
			this.props.updateModalContent(<SplashScreen />, 3)
		} else {
			this.props.closeModal()
		}
	},

	getUserTokenFromCookie: function() {
		return Cookie.get('MASAS_authToken')
	},

	componentDidUpdate: function(prevProps) {
		if(this.props.MASASuser !== prevProps.MASASuser) {
			this.props.closeModal()
		}
	},

	render: function() {
		var hideLoadingModalZIndex = 100
		var loadingModalAnim = "none"
		if(!this.props.processingAuthCookie) {
			hideLoadingModalZIndex = -100
			loadingModalAnim = "fadeout-loading-modal 1s linear"
		}

		return <AppDumb 
				hideLoadingModalZIndex={ hideLoadingModalZIndex }
				loadingModalAnim={ loadingModalAnim }>{ this.props.children }</AppDumb>
	}
})

module.exports = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
