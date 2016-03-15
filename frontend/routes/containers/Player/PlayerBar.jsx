var ReactRedux = require("react-redux")
var Player = require('../../components/Player/PlayerBar.jsx')
var {getCookie, pausePlayer } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		playerAtTime: state.playerReducer.playerAtTime,
		SC_songInfo: state.playerReducer.SC_songInfo,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userPk: state.appReducer.MASASuserPk,
		MASASuser: state.appReducer.MASASuser,
	}
}

// var pause = function(dispatch) {
// 	console.log('pausing')
// 	// pause player
// 	$("#jquery_jplayer_1").jPlayer('pause')
	
// 	// get time to start playing at this time when unpausing and update app state
// 	var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
// 	dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
// }

var resumePlaying = function(playerAtTime) {
	$("#jquery_jplayer_1").jPlayer("play", playerAtTime)
}

var updateLikeButton = function(dispatch, MASAS_songInfo, SC_songInfo, props) {
	var header = "Bearer " + props.MASASuser
	$.ajax({
		type: "GET",
		url: 'api/users/'+ props.userPk+'/',	
		headers: {
			"Authorization": header,
		},
		success: (user) => {

			var isSongLiked = user.likes.filter( (like) => {
				return like.song.url === MASAS_songInfo.url
			})

			// update player state
			if (isSongLiked.length === 0)
				dispatch({type: 'UNLIKE_SONG'})
			else
				dispatch({type: 'LIKE_SONG'})
		},
		error: (err) => {
			console.log(err)
		},
	})
}

var playNewSong = function(dispatch, newProps) {
	var songId = newProps.songPlaying
	console.log(newProps.songPlaying)
	$.ajax({
		type: "GET",
		url: newProps.songPlaying, //'http://localhost:8000/api/song/'+songId+'/',	
		headers: {
			// "Authorization": header,
		},
		success: (data) => {
			// check if song is liked
			

			console.log(data)
			SC.get('/tracks/' + data.SC_ID).then((response) => {
				console.log(response)
				var streamURL = response.stream_url + "?client_id=e5d965905a85b11e108d064bc04430a3" 
				// console.log(streamURL)

				// reinit player with new media url
				$("#jquery_jplayer_1").jPlayer( "destroy" )
				$("#jquery_jplayer_1").jPlayer({
					ready: function(	) {
						$(this).jPlayer("setMedia", {
							m4a: streamURL,
							oga: streamURL
						}).jPlayer('play')
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

				// play song and update state
				$("#jquery_jplayer_1").jPlayer('play')
				dispatch({ type: "UPDATE_MASAS_SONG_INFO", songInfo: data })
				dispatch({ type: "UPDATE_SC_SONG_INFO", songInfo: response })

				// check if song liked
				updateLikeButton(dispatch, data, response, newProps)
			}).catch((err) => {
				console.log(err)
			})
			
		},
		error: (err) => {
			console.log(err)
		},
	})
}

// songId = url to django rest for this song
var toggleSongLike = function(dispatch, userToken, songId) {
	// CHECK IF SONG IS LIKED FROM REST API
		// fetch user info
		// compare liked songs with songId

	// optimistic UI
	dispatch({type: 'TOGGLE_SONG_LIKE'})

	// server check and UI update if necessary
	var header = "Bearer " + userToken
	var csrftoken = getCookie('csrftoken')
		
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

	// if song is liked, delete like from DB and update player UI state

	// else (song is not liked yet), update DB and player UI state
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		play: () => dispatch({ type: 'PLAY'}),
		pause: (pausingAtTime) => pausePlayer(dispatch), // dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
		resumePlaying: (playerAtTime) => resumePlaying(playerAtTime),
		playNewSong: (newProps) => playNewSong(dispatch, newProps),
		toggleSongLike: (userToken, songId) => toggleSongLike(dispatch, userToken, songId),
		playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId})
	}
}

var Player = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
module.exports = Player
