var React = require("react")
const { dispatch } = require("./reducers/reducers.js")

import {
	pausePlayer,
	playPreviousSongInHistory,
	playNewSong,
	playRandomSong,
	toggleSongLike,
} from "./reducers/actions/Player.js"

import {
	closeAndEmptyMainModal,
} from "./reducers/actions/App.js"

import {
	updateNotificationBar,
} from "./reducers/actions/Header.js"

var { browserHistory } = require("react-router")
var Cookie = require("js-cookie")

var MASAS_functions = {}

/////
/////
/////
////		Useful functions
////
/////
/////

MASAS_functions.getUserPkFromURL = url => {
	var str = url
	str = str.slice(0, str.length-1)
	str = str.substring(str.lastIndexOf("/")+1,str.length)

	return str
}

MASAS_functions.isObjectEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object
MASAS_functions.isObjectNotEmpty = obj => Object.keys(obj).length !== 0 && obj.constructor === Object

MASAS_functions.background = {
	blur: () => {
		$('#body--background').addClass('blurred')
	},
	unblur: () => {
		$('#body--background').removeClass('blurred')
	}
}

MASAS_functions.discoverHashtagNames = () => {
	return [
		"#EarlyMorning",
		"#LateMorning",
		"#EarlyAfternoon",
		"#LateAfternoon",
		"#EarlyEvening",
		"#LateEvening"
	]
}

MASAS_functions.timeIntervalURLToString = (timeIntervalURL) => {
	var switchVar = timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
	const hastagNames = MASAS_functions.discoverHashtagNames()

	switch(switchVar) {
		case "1":
			return hastagNames[0]
		case "2":
			return hastagNames[1]
		case "3":
			return hastagNames[2]
		case "4":
			return hastagNames[3]
		case "5":
			return hastagNames[4]
		case "6":
			return hastagNames[5]
		default:
			return ""
	}
}

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
MASAS_functions.makePromiseCancelable = (promise) => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then((val) =>
			hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
		)

		promise.catch((error) =>
			hasCanceled_ ? reject({isCanceled: true}) : reject(error)
		)
	})

	return {
		promise: wrappedPromise,
		cancel() {
			hasCanceled_ = true
		},
	}
}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set("MASAS_authToken", userToken)
}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

// using jQuery
MASAS_functions.getCookie = (name) => {
	var cookieValue = null
	if (document.cookie && document.cookie != "") {
		var cookies = document.cookie.split(";")
		for (var i = 0; i < cookies.length; i++) {
			var cookie = $.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + "=")) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
				break
			}
		}
	}
	return cookieValue
}

// (BOOL) checks if a sequence is a subsequence of a string
MASAS_functions.isSubsequence = (sequence, string) => {
	if (string.toLowerCase().includes(sequence.toLowerCase()))
		return true
	else
		return false
}

// returns 1-6 for timeInterval based on songId
MASAS_functions.getTimeIntervalFromURL = (timeIntervalURL) => {
	return parseInt(timeIntervalURL.substr(timeIntervalURL.length - 2, 1))
}

/////
/////
/////
////		PROFILE
////
/////
/////

/*
	takes dispatch (from mapDispatchToProps(dispatch) in containers) and user token
	result: returns nothing. but updates appReducer"s auth token and user pk
*/
MASAS_functions.logInWithToken = (removeVariable, userToken) => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: "/api/check-user/",	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			if(data.userPk !== "None") {
				if(data.auth === "None") {
					// remove cookie
					const delete_cookie = function( name ) {
						document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
					}

					delete_cookie("MASAS_authToken")
				} else {
					var pk = data.userPk

					MASAS_functions.updateUserInfo(pk, userToken)
				}
			}

			// render app
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})
		},
		error: (err) => {
			// render app
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: err.responseText})
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})

		},
	})
}

MASAS_functions.logout = () => {
	Cookie.remove("MASAS_authToken")

	dispatch({type: "LOGOUT"})

	FB.logout(function(response) {
		MASAS_functions.updateNotificationBar("Logged out !")
	})

}

MASAS_functions.updateUserEmail = ({ userPk, userToken, userData }) => {
	const header = "Bearer " + userToken

	if(typeof(FB) !== "undefined") {
		FB.api("/me", { locale: "en_US", fields: "name, email" },
			function({ email }) {

				// update email if user email not defined yet
				if(email && !userData.email)
					$.ajax({
						type: "PATCH",
						url: "/api/users/" + userPk + "/",
						headers: {
							"Authorization": header,
							"Content-Type:": "application/json"
						},
						data: JSON.stringify({
							email,
						}),
						success: (resp) => {
						},
						error: (err) => {
						}
					})
			}
		)
	}
}

// (obj) userDict => userDict.userToken, userDict.userPk, and userDict.userData
MASAS_functions.updateProfilePicture = ({ userPk, userToken, userData }) => {

	if(typeof(FB) !== "undefined") {
		const avatar_url = "https://graph.facebook.com/v2.5/" + FB.getUserID() + "/picture"

		// update avatar url if user has none
		if(avatar_url && !userData.avatar_url)
			$.ajax({
				type: "PATCH",
				url: "/api/users/" + userPk + "/",
				headers: {
					"Authorization": "Bearer " + userToken,
					"Content-Type:": "application/json"
				},
				data: JSON.stringify({
					avatar_url,
				}),
				success: (resp) => {
				},
				error: (err) => {
				}
			})
	}
}

MASAS_functions.updateUserInfo = (userPk, userToken) => {
	$.ajax({
		type: "GET",
		url: "/api/users/" + userPk + "/",
		success: (userData) => {
			// check that terms and conditions were accepted (commented for now, might not need it)
			const hasAcceptedTerms = 1 // userData.usersteps.filter( (userStep) => userStep.step === 1).length
			const canLogIn = userData.usersteps.filter( (userStep) => userStep.step === 2).length

			if(hasAcceptedTerms) {
					MASAS_functions.updateProfilePicture({ userToken, userPk, userData })

					// log in user
					dispatch({ type: "UPDATE_USER_PK", pk: userPk })
					dispatch({ type: "LOGIN", token: userToken, userData , pk: userPk })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })

					// if(window.location.pathname !== "/")
					// 	browserHistory.push('/')
			} else {
				// show terms and conditions form
				var TermsAndCond = require("./components/Login/TermsAndCond.jsx")
				dispatch({ type: "CHANGE_MODAL_CONTENT", modalContent: <TermsAndCond userPk={ parseInt(userPk) } userToken={ userToken } userData={ userData } /> })
				dispatch({ type: "TOOGLE_IS_MODAL_OPENED" })
			}
		},
		error: (e) => {
		}
	})
}

const { updateProfileInfo } = require("./components/Profile/ajaxCalls.jsx")
MASAS_functions.updateProfileInfo = updateProfileInfo

/////
/////
/////
////		PLAYER (legacy functions that might still be used)
////
/////
/////

// pause player
MASAS_functions.pausePlayer = () => {
	dispatch(pausePlayer())
}

MASAS_functions.playPreviousSong = () => {
	dispatch(playPreviousSongInHistory())
}

// update player state with new song (playNewSong in Player/ajaxCalls will take care of playing it on state change)
// addToHistory: (BOOL) should song be added to history
MASAS_functions.playNewSong = () => {
	dispatch(playNewSong())
}

// gets song based on timeInteral and play song
MASAS_functions.playRandomSong = (MASASuser, timeInterval = 0) => {
	dispatch(playRandomSong(timeInterval))
},

// songId = url to django rest for this song
// Refactor with like and dislike functions called from toogleSongLike
MASAS_functions.toggleSongLike = (userToken, songId) => {
	dispatch(toggleSongLike(songId))
}

/////
/////
/////
////		Other UI
////
/////
/////

MASAS_functions.closeModal = () => {
	dispatch(closeAndEmptyMainModal())
}

MASAS_functions.updateNotificationBar = (notificationText) => {
	dispatch(updateNotificationBar(notificationText))

}

module.exports = MASAS_functions
