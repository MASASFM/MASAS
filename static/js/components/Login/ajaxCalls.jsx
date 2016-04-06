var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')
var { updateAuthCookie, logInWithToken } = require("../../MASAS_functions.jsx")

var ajaxCalls = {}

ajaxCalls.convertToken = (token) => {
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

			logInWithToken(dispatch, data.access_token)
			browserHistory.push('/')
			ajaxCalls.getUserPk(dispatch, data.access_token)	
			updateAuthCookie(data.access_token)
		},
		error: (err) => { 
			console.log(err) 
			dispatch({type:'LOGOUT'})
		}
	})
}

ajaxCalls.getUserPk = (userToken) => {
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

module.exports = ajaxCalls