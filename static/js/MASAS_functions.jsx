const { dispatch } = require('./reducers/reducers.js')

var { browserHistory } = require('react-router')
var Cookie = require('js-cookie')

var MASAS_functions = {}

MASAS_functions.logout = () => {
	// console.log("logout ===>", dispatch)
	Cookie.remove('MASAS_authToken')

	dispatch({type: 'LOGOUT'})

	FB.logout(function(response) {
		console.log('logged out from FB')
		// dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "Logged out !"})
		MASAS_functions.updateNotificationBar("Logged out !")
	})

}

MASAS_functions.updateNotificationBar = (notificationText) => {
	// console.log("logout ===>", dispatch)
	const currentText = document.getElementById("notification-text")
	if(currentText != notificationText) {
		dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
		dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: notificationText})
	}

}

MASAS_functions.updateAuthCookie = (userToken) => {
	Cookie.set('MASAS_authToken', userToken)
}

MASAS_functions.goToURL = (path) => {
	browserHistory.push(path)
}

/*
	takes dispatch (from mapDispatchToProps(dispatch) in containers) and user token
	result: returns nothing. but updates appReducer's auth token and user pk
*/
MASAS_functions.logInWithToken = (removeVariable, userToken) => {
	var header = "Bearer " + userToken
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			if(data.userPk !== "None") {
				console.log(data)
				var pk = data.userPk

				// let picURL = "http://graph.facebook.com/me/picture?access_token=" + FB_token
				// FB.api(picURL, function(r) {
				// 	console.log(r)
					dispatch({type: 'UPDATE_USER_PK', pk: pk})
					dispatch({type: 'LOGIN', token: userToken, userData: data})
					dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
					dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "Welcome !"})
				// })
				
			}

			// render app
			dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'})
		},
		error: (err) => {
			console.log(err)
			// render app
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
			dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: err.responseText})
			dispatch({type:'DONE_PROCESSING_AUTH_COOKIE'})

		},
	})
}

// using jQuery
MASAS_functions.getCookie = function(name) {
	var cookieValue = null
	if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';')
		for (var i = 0; i < cookies.length; i++) {
			var cookie = jQuery.trim(cookies[i])
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) == (name + '=')) {
			    cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
			    break
			}
		}
	}
	return cookieValue
}

// pause player
MASAS_functions.pausePlayer = function() {
	console.log('pausing')
	// pause player
	$("#jquery_jplayer_1").jPlayer('pause')
	
	// get time to start playing at this time when unpausing and update app state
	var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
	dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
}

MASAS_functions.playPreviousSong = function(discoverHistory) {
	// POP SONG FROM HISTORY
	dispatch({ type: 'POP_SONG_FROM_HISTORY' })

	// PLAY LATEST SONG IN HISTORY
	console.log("SONG_URL =>", discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url)
	dispatch({ type: 'PLAY_NEW_SONG', song: discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url })
}

// update player state with new song (playNewSong in Player/ajaxCalls will take care of playing it on state change)
// addToHistory: (BOOL) should song be added to history
MASAS_functions.playNewSong = function(MASAS_songId, addToHistory = true) {
	console.log('PLAY NEW SONG')
	// PLAY NEW SONG
	dispatch({ type: 'PLAY_NEW_SONG', song: MASAS_songId})

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
				SC.get('/tracks/' + MASAS_songInfo.SC_ID).then((SC_songInfo) => {
					dispatch({
						type: 'ADD_SONG_TO_HISTORY',
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
	// dispatch({ type: 'SET_ADD_SONG_HISTORY_TRUE' })
}

// gets song based on timeInteral and play song
MASAS_functions.playRandomSong = function(MASASuser, timeInterval = 0) {
	console.log(MASASuser)
	var URL = "/api/play/"
	if(timeInterval)
		URL = URL + "?time_interval_id=" + timeInterval

	var header = "Bearer " + MASASuser
	var csrftoken = MASAS_functions.getCookie('csrftoken')
	$.ajax({
		type: 'POST',
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
		},
	})
},

// songId = url to django rest for this song
// Refactor with like and dislike functions called from toogleSongLike
MASAS_functions.toggleSongLike = function(userToken, songId) {
	// NO ACTION IF NO SONG IS PROVIDED
	if(!songId)
		return 

	// CHECK IF SONG IS LIKED FROM REST API
		// fetch user info
		// compare liked songs with songId

	// optimistic UI
	dispatch({type: 'TOGGLE_SONG_LIKE'})

	// server check and UI update if necessary
	var header = "Bearer " + userToken
	var csrftoken = MASAS_functions.getCookie('csrftoken')
		
	// CHECK USER AUTHENTICATION AND RETRIEVE USER.PK
	$.ajax({
		type: "GET",
		url: 'api/check-user/',	
		headers: {
			"Authorization": header,
		},
		success: (data) => {
			console.log(data)
			// GET USER LIKES FROM USER.PK
			$.ajax({
				type: "GET",
				url: 'api/users/' + data.userPk + "/",	
				headers: {
					"Authorization": header,
				},
				success: (user) => {
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
								dispatch({type: 'LIKE_SONG'})
								dispatch({type: 'REFETCH_LIKES'})
								dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
								dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "song liked"})
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
								dispatch({type: 'UNLIKE_SONG'})
								dispatch({type: 'REFETCH_LIKES'})
								dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: ""})
								dispatch({type: 'UPDATE_NOTIFICATION_TEXT', notificationText: "song unliked"})
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
MASAS_functions.getTimeIntervalFromURL = function(timeIntervalURL) {
	return timeIntervalURL.substr(timeIntervalURL.length - 2, 1)
}

module.exports = MASAS_functions