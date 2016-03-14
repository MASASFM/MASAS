
var ReactRedux = require("react-redux")
var LoginForm = require('../../components/Login/LoginForm.jsx')

var Cookie = require('js-cookie')

var {browserHistory} = require('react-router')

var { updateAuthCookie } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {

	}
}

var updateCookie = (userToken) => {
	Cookie.set('MASAS_authToken', userToken)
}

var getUserPk = (dispatch, userToken) => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			console.log(data)
			var pk = data.userPk

			dispatch({type: 'UPDATE_USER_PK', pk: pk})
		},
		error: (err) => {
			console.log(err)
		},
	})
}

var loginFB = (dispatch) => {
	if (typeof(FB) === "undefined")
		return 0

	console.log('hey')
	FB.login( (response) => {
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			console.log(FB.getAccessToken())

			$.ajax({
				type: "POST",
				url: "/auth/convert-token/",
				data: {
					grant_type: "convert_token",
					client_id: "biHRTlM74WJ2l8NddjR6pa8uNYpWC4vFzTjyjOUO",
					client_secret: "aNXFRxyW20wBDLmTlf4ntmFKYSQ7qvig3PSRLlSxBYfxpmFPnh9JJz876eLMIeZJaoYyM2F6Q7q36QveAWacmiOT14y1z0EwpqO7lQVhXBx037FNGr6mDwYNq1fGfNVl",
					backend: "facebook",
					token: FB.getAccessToken(),
				},
				success: (data) => { 
					console.log(data)
					dispatch({type:'LOGIN', token: data.access_token})
					browserHistory.push('/')
					getUserPk(dispatch, data.access_token)

					updateAuthCookie(data.access_token)
				},
				error: (err) => { 
					console.log(err) 
					dispatch({type:'LOGOUT'})
				}
				// dataType: dataType
			});

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

var login = (dispatch) => {
	var username = document.getElementById('login-username-input').value
	var password = document.getElementById('login-password-input').value

	$.ajax({
		type: "POST",
		url: 'auth/token/',	
		data: {
			grant_type: "password",
			username: username,
			password: password,
			client_id: "biHRTlM74WJ2l8NddjR6pa8uNYpWC4vFzTjyjOUO",
			client_secret: "aNXFRxyW20wBDLmTlf4ntmFKYSQ7qvig3PSRLlSxBYfxpmFPnh9JJz876eLMIeZJaoYyM2F6Q7q36QveAWacmiOT14y1z0EwpqO7lQVhXBx037FNGr6mDwYNq1fGfNVl",
			},
			 // -u"<client_id>:<client_secret>" 
		success: (data) => {
			console.log(data)
			dispatch({type:'LOGIN', token: data.access_token})
			browserHistory.push('/')
			getUserPk(dispatch, data.access_token)

			updateAuthCookie(data.access_token)
		},
		error: (err) => {
			console.log(err)
			dispatch({type:'LOGOUT'})
		},
	})
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		logInFB: loginFB.bind(null,dispatch),
		login: login.bind(null,dispatch),
	}
}

var LoginForm = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)
module.exports = LoginForm;
