var React = require("react")

const { dispatch } = require("./reducers/reducers.js")

var { browserHistory } = require("react-router")
var Cookie = require("js-cookie")

var MASAS_functions = {}

MASAS_functions.logout = () => {
	// console.log("logout ===>", dispatch)
	Cookie.remove("MASAS_authToken")

	dispatch({type: "LOGOUT"})

	FB.logout(function(response) {
		console.log("logged out from FB")
		// dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Logged out !"})
		MASAS_functions.updateNotificationBar("Logged out !")
	})

}

MASAS_functions.updateNotificationBar = (notificationText) => {
	// console.log("logout ===>", dispatch)
	const currentText = document.getElementById("notification-text")
	if(currentText != notificationText) {
		dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
		dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: notificationText})
	}

}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set("MASAS_authToken", userToken)
}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

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
					console.log(data)
					var pk = data.userPk

					MASAS_functions.updateUserInfo(pk, userToken)
				}
			}

			// render app
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})
		},
		error: (err) => {
			console.log(err)
			// render app
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
			dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: err.responseText})
			dispatch({type:"DONE_PROCESSING_AUTH_COOKIE"})

		},
	})
}

MASAS_functions.updateUserEmail = ({ userPk, userToken, userData }) => {
	const header = "Bearer " + userToken

	if(typeof(FB) !== "undefined") {
		FB.api("/me", { locale: "en_US", fields: "name, email" },
			function({ email }) {
				console.log(email)

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
							console.log(resp)
						},
						error: (err) => {
							console.warn(err)
						}
					})
			}
		)
	}
}

// (obj) userDict => userDict.userToken, userDict.userPk, and userDict.userData
MASAS_functions.updateProfilePicture = ({ userPk, userToken, userData }) => {
	console.log("============")
	const header = "Bearer " + userToken
	console.log("BEARER =>", header)

	if(typeof(FB) !== "undefined") {
		const avatar_url = "https://graph.facebook.com/v2.5/" + FB.getUserID() + "/picturee"

		// update avatar url if user has none
		if(avatar_url && !userData.avatar_url)
			$.ajax({
				type: "PATCH",
				url: "/api/users/" + userPk + "/",
				headers: {
					"Authorization": header,
					"Content-Type:": "application/json"
				},
				data: JSON.stringify({
					avatar_url,
				}),
				success: (resp) => {
					console.log(resp)
				},
				error: (err) => {
					console.warn(err)
				}
			})
	}
}

MASAS_functions.updateUserInfo = (userPk, userToken) => {
	$.ajax({
		type: "GET",
		url: "/api/users/" + userPk + "/",
		success: (userData) => {
			// check that terms and conditions were accepted
			const hasAcceptedTerms = userData.usersteps.filter( (userStep) => userStep.step === 1).length
			const canLogIn = userData.usersteps.filter( (userStep) => userStep.step === 2).length

			if(hasAcceptedTerms) {
				if(canLogIn) {
					// update profile picture
					// MASAS_functions.updateUserEmail({ userToken, userPk, userData })
					MASAS_functions.updateProfilePicture({ userToken, userPk, userData })

					// log in user
					dispatch({ type: "UPDATE_USER_PK", pk: userPk })
					dispatch({ type: "LOGIN", token: userToken, userData , pk: userPk })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "" })
					dispatch({ type: "UPDATE_NOTIFICATION_TEXT", notificationText: "Welcome !" })
				} else {
					// show invitation pending component
					var InvitationPending = require("./components/Login/InvitationPending.jsx")
					dispatch({ type: "CHANGE_MODAL_CONTENT", modalContent: <InvitationPending /> })
					dispatch({ type: "TOOGLE_IS_MODAL_OPENED" })
				}
			} else {
				// show terms and conditions form
				var TermsAndCond = require("./components/Login/TermsAndCond.jsx")
				dispatch({ type: "CHANGE_MODAL_CONTENT", modalContent: <TermsAndCond userPk={ parseInt(userPk) } userToken={ userToken } userData={ userData } /> })
				dispatch({ type: "TOOGLE_IS_MODAL_OPENED" })
			}
		},
		error: (e) => {
			console.warn(err)
		}
	})
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

// pause player
MASAS_functions.pausePlayer = () => {
	console.log("pausing")
	// pause player
	$("#jquery_jplayer_1").jPlayer("pause")
	
	// get time to start playing at this time when unpausing and update app state
	var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
	dispatch({ type: "PAUSE", pausingAtTime: pausingAtTime })
}

MASAS_functions.playPreviousSong = (discoverHistory) => {
	// POP SONG FROM HISTORY
	dispatch({ type: "POP_SONG_FROM_HISTORY" })

	// PLAY LATEST SONG IN HISTORY
	console.log("SONG_URL =>", discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url)
	dispatch({ type: "PLAY_NEW_SONG", song: discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url })
}

// update player state with new song (playNewSong in Player/ajaxCalls will take care of playing it on state change)
// addToHistory: (BOOL) should song be added to history
MASAS_functions.playNewSong = (MASAS_songId, addToHistory = true) => {
	console.log("PLAY NEW SONG")
	// PLAY NEW SONG
	dispatch({ type: "PLAY_NEW_SONG", song: MASAS_songId})

	// STORE NEW SONG IN HISTORY if addToHistory = true
	// fetch MASAS song info
	// console.log("HEY HEY =>", addToHistory)
	// console.log("MASAS_songId =>", MASAS_songId)
	if(addToHistory)
		$.ajax({
			type: "GET",
			url: MASAS_songId,
			success: (MASAS_songInfo) => {
				// fetch SC song info
				SC.get("/tracks/" + MASAS_songInfo.SC_ID).then((SC_songInfo) => {
					dispatch({
						type: "ADD_SONG_TO_HISTORY",
						MASAS_songInfo,
						SC_songInfo
					})
				}).catch( (err) => {
					console.warn(err)
				})
			},
			error: (err) => {
				console.warn(err)
			},
		})

	// SET ADD TO HISTORY TO TRUE SO ITS DEFAULT FOR NEXT ADDED SONG
	// dispatch({ type: "SET_ADD_SONG_HISTORY_TRUE" })
}

// gets song based on timeInteral and play song
MASAS_functions.playRandomSong = (MASASuser, timeInterval = 0) => {
	console.log(MASASuser)
	var URL = "/api/play/"
	if(timeInterval)
		URL = URL + "?time_interval_id=" + timeInterval

	var header = "Bearer " + MASASuser
	var csrftoken = MASAS_functions.getCookie("csrftoken")
	$.ajax({
		type: "POST",
		url: URL,
		headers: {
			"Authorization": header,
			"X-CSRFToken": csrftoken
		},
		data: {
			
		},
		success: (data) => {
			console.log("/api/test !!! => ", data)
			MASAS_functions.playNewSong(data.url)
		},
		error: (err) => {
			console.log(err)
			if(err.status === 401)
				MASAS_functions.updateNotificationBar("Login to play music !")
		},
	})
},

// songId = url to django rest for this song
// Refactor with like and dislike functions called from toogleSongLike
MASAS_functions.toggleSongLike = (userToken, songId) => {
	// NO ACTION IF NO SONG IS PROVIDED
	if(!songId)
		return 

	// CHECK IF SONG IS LIKED FROM REST API
		// fetch user info
		// compare liked songs with songId

	// optimistic UI
	dispatch({type: "TOGGLE_SONG_LIKE"})

	// server check and UI update if necessary
	var header = "Bearer " + userToken
	var csrftoken = MASAS_functions.getCookie("csrftoken")
		
	// CHECK USER AUTHENTICATION AND RETRIEVE USER.PK
	$.ajax({
		type: "GET",
		url: "api/check-user/",	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			console.log(data)
			// GET USER LIKES FROM USER.PK
			$.ajax({
				type: "GET",
				url: "api/users/" + data.userPk + "/",	
				headers: {
					"Authorization": header,
				},
				success: (user) => {
					const { updateProfileInfo } = require("./components/Profile/ajaxCalls.jsx")

					var likes = user.likes
					console.log("like ===>", likes)

					var isSongLiked = user.likes.filter( (like) => {
						console.log(like.song.url, songId)
						return like.song.url === songId
					})
					console.log(isSongLiked)

					// song not liked yet
					if(isSongLiked.length === 0) {
						$.ajax({
							type: "POST",
							// url: "/api/likes/",	
							url: "/api/statuses/",	
							headers: {
								"Authorization": header,
								"X-CSRFToken": csrftoken,
							},
							data: {
								user: user.url,
								song: songId,
								status: 1
							},
							success: (data) => {
								// update UI
								dispatch({type: "LIKE_SONG"})
								dispatch({type: "REFETCH_LIKES"})
								dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
								dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: "song liked"})

								// update user profile data
								updateProfileInfo()
							},
							error: (err) => {
								console.log(err)
							},
						})
					} else {

						// find if song liked
						let songLiked = user.likes.filter( (like) => { return like.song.url === songId } )
						if(songLiked.length === 1) {
							songLiked = isSongLiked[0]
							$.ajax({
								type: "DELETE",
								url: songLiked.url,	
								headers: {
									"Authorization": header,
									"X-CSRFToken": csrftoken,
								},
								success: (data) => {
									console.log(data)
									// update UI
									dispatch({type: "UNLIKE_SONG"})
									dispatch({type: "REFETCH_LIKES"})
									dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: ""})
									dispatch({type: "UPDATE_NOTIFICATION_TEXT", notificationText: "song unliked"})

									// update user profile data
									updateProfileInfo()
								},
								error: (err) => {
									console.log(err)
								},
							})
						}
						
					}
				},
				error: (err) => {
					console.log(err)
				},
			})

		},
		error: (err) => {
			console.log(err)
		},
	})
}

// returns 1-6 for timeInterval based on songId
MASAS_functions.getTimeIntervalFromURL = (timeIntervalURL) => {
	console.log(timeIntervalURL)
	return parseInt(timeIntervalURL.substr(timeIntervalURL.length - 2, 1))
}

module.exports = MASAS_functions
