var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')
var { updateAuthCookie, logInWithToken } = require("../../MASAS_functions.jsx")

var ajaxCalls = {}

ajaxCalls.acceptTerms = (userToken, userData, userPk) => {
	var header = "Bearer " + userToken

	$.ajax({
		type: 'POST',
		url: '/api/usersteps/',
		headers: {
			"Authorization": header,
		},
		data: {
			user: userData.url,
			step: 1,
		},
		success: (r) => {
			dispatch({ type: 'UPDATE_USER_PK', pk: userPk })
			dispatch({ type: 'LOGIN', token: userToken, userData , pk: userPk })
			dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' })
			dispatch({ type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "" })
			dispatch({ type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "Welcome !" })
		},
		error: (e) => {
			dispatch({ type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "" })
			dispatch({ type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "Welcome !" })
		}
	})
}

// (obj) userDict => userDict.userToken and userDict.userPk 
ajaxCalls.updateProfilePicture = (userDict) => {
	const userToken = userDict.userToken
	const userPk = userDict.userPk

	var header = "Bearer " + userToken
	console.log("BEARER =>", header)

	if(FB)
		$.ajax({
			type: 'PATCH',
			url: '/api/users/' + userPk + "/",
			headers: {
				"Authorization": header,
			},
			data: {
				avatar_url: "https://graph.facebook.com/v2.5/" + FB.getUserID() + "/picture",
			},
			success: (resp) => {
				console.log(resp)
			},
			error: (err) => {
				console.warn(err)
			}
		})
}


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
			ajaxCalls.getUserPk(data.access_token, ajaxCalls.updateProfilePicture)	
			updateAuthCookie(data.access_token)
		},
		error: (err) => { 
			console.log(err) 
			dispatch({type:'LOGOUT'})
		}
	})
}

ajaxCalls.getUserPk = (userToken, callbackFunc = null) => {
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

			if(callbackFunc)
				callbackFunc({ userToken, userPk: data.userPk})
		},
		error: (err) => {
			console.log(err)
		},
	})
}

module.exports = ajaxCalls