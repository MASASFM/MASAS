var ReactRedux = require("react-redux")
var Player = require('../../components/Player/PlayerBar.jsx')
var { getCookie, pausePlayer, playPreviousSong, toggleSongLike } = require("../../../MASAS_functions.jsx")
var MASAS_functions = require("../../../MASAS_functions.jsx")


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
		isFetchingSong: state.playerReducer.isFetchingSong,
		discoverHistory: state.discoverReducer.history,
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
	
	// set loading state
	dispatch({type: 'SET_SONG_IS_FETCHING_TRUE'})

	$.ajax({
		type: "GET",
		url: newProps.songPlaying, //'http://localhost:8000/api/song/'+songId+'/',	
		headers: {
			// "Authorization": header,
		},
		success: (data) => {
			SC.get('/tracks/' + data.SC_ID).then((response) => {
				console.log(response)
				var streamURL = response.stream_url + "?client_id=e5d965905a85b11e108d064bc04430a3" 
				// console.log(streamURL)

				// reinit player with new media url
				$("#jquery_jplayer_1").jPlayer( "destroy" )
				$("#jquery_jplayer_1").jPlayer({
					ready: function(	) {
						console.log("INIT JPLAYER= >", streamURL)
						$(this).jPlayer("setMedia", {
							mp3: streamURL,
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
				dispatch({ type: 'ADD_SONG_TO_HISTORY', MASAS_songInfo: data, SC_songInfo: response })

				// update song liked button based on server response (vs optimistic UI)
				updateLikeButton(dispatch, data, response, newProps)

				// end loading state
				dispatch({type: 'SET_SONG_IS_FETCHING_FALSE'})
			}).catch((err) => {
				console.log(err)

				// end loading state
				dispatch({type: 'SET_SONG_IS_FETCHING_FALSE'})

				// stop player
				dispatch({type: 'STOP'})
			})
		},
		error: (err) => {
			console.log(err)

			// end loading state
			dispatch('SET_SONG_IS_FETCHING_FALSE')
			// stop player
			dispatch({type: 'STOP'})
		},
	})
}



// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		dispatch,
		play: () => dispatch({ type: 'PLAY' }),
		pause: (pausingAtTime) => pausePlayer(dispatch), // dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
		resumePlaying: (playerAtTime) => resumePlaying(playerAtTime),
		playNewSong: (newProps, addToHistory) => playNewSong(dispatch, newProps, addToHistory),
		toggleSongLike: (userToken, songId) => toggleSongLike(dispatch, userToken, songId),
		playRandomSong: (songId) => MASAS_functions.playNewSong(dispatch, songId, true),
		playPreviousSong: (discoverHistory) => playPreviousSong(dispatch, discoverHistory)
	}
}

var Player = ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
module.exports = Player
