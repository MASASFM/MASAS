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
	console.log('HEYEHEY')
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
				convertToken(FB.access_token())
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

// var login = (dispatch) => {
// 	var username = document.getElementById('login-username-input').value
// 	var password = document.getElementById('login-password-input').value

// 	$.ajax({
// 		type: "POST",
// 		url: 'auth/token/',	
// 		data: {
// 			grant_type: "password",
// 			username: username,
// 			password: password,
// 			client_id: "biHRTlM74WJ2l8NddjR6pa8uNYpWC4vFzTjyjOUO",
// 			client_secret: "aNXFRxyW20wBDLmTlf4ntmFKYSQ7qvig3PSRLlSxBYfxpmFPnh9JJz876eLMIeZJaoYyM2F6Q7q36QveAWacmiOT14y1z0EwpqO7lQVhXBx037FNGr6mDwYNq1fGfNVl",
// 			},
// 			 // -u"<client_id>:<client_secret>" 
// 		success: (data) => {
// 			console.log(data)
// 			dispatch({type:'LOGIN', token: data.access_token})
// 			browserHistory.push('/')
// 			getUserPk(data.access_token)

// 			updateAuthCookie(data.access_token)
// 		},
// 		error: (err) => {
// 			console.log(err)
// 			dispatch({type:'LOGOUT'})
// 		},
// 	})
// }

// Which action creators does it want to receive by props?
LoginForm.mapDispatchToProps = function(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		logInFB: loginFB,
		// login: login.bind(null,dispatch),
	}
}

module.exports = LoginForm
