var Cookie = require('js-cookie')
var { browserHistory } = require('react-router')

var { updateAuthCookie, logInWithToken } = require("../../../MASAS_functions.jsx")
var { convertToken, getUserPk } = require("../ajaxCalls.jsx")

var LoginForm = {}

// Which part of the Redux global state does our component want to receive as props?
LoginForm.mapStateToProps = function(state) {
	return {

	}
}

var loginFB = () => {
	// if FB SDK not loaded
	if (typeof(FB) === "undefined")
		return 0

	// CHECK IF FB ACCESS TOKEN ALREADY EXISTS
	const FB_token  = FB.getAccessToken()
	if(FB_token) {
		convertToken(FB_token)
	}
	else
		FB.login( (response) => {
			if (response.status === 'connected') {
				// Logged into your app and Facebook.
				console.log(FB.getAccessToken())
				convertToken(FB.getAccessToken())
			} else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
				console.log('Login failed')
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
				console.log('Login failed')
			}
		})
}

// Which action creators does it want to receive by props?
LoginForm.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		logInFB: loginFB,
		// login: login.bind(null,dispatch),
	}
}

module.exports = LoginForm
