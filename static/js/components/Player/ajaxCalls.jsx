var { browserHistory } = require('react-router')

const { dispatch } = require('../../reducers/reducers.js')

var ajaxCalls = {}

ajaxCalls.playNewSong = function(newProps, addToHistory) {
	var songId = newProps.songPlaying
	console.log('new props =>', songId)
	console.log('new props real =>', newProps)
	
	// set loading state
	dispatch({type: 'SET_SONG_IS_FETCHING_TRUE'})

	$.ajax({
		type: "GET",
		url: newProps.songPlaying, //'http://localhost:8000/api/song/'+songId+'/',	
		headers: {
			// "Authorization": header,
		},
		success: (data) => {
			console.log("RESP 1 = >", data)
			SC.get('/tracks/' + data.SC_ID).then((response) => {
				console.log("RESP 12 = >", response)
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
				ajaxCalls.updateLikeButton(data, response, newProps)

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

ajaxCalls.updateLikeButton = function(MASAS_songInfo, SC_songInfo, props) {
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

module.exports = ajaxCalls