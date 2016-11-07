import "whatwg-fetch"

export const SET_SONG_IS_FETCHING_TRUE = "SET_SONG_IS_FETCHING_TRUE"
export const UPDATE_MASAS_SONG_INFO = "UPDATE_MASAS_SONG_INFO"
export const UPDATE_SC_SONG_INFO = "UPDATE_SC_SONG_INFO"
export const UPDATE_ARTIST_INFO = "UPDATE_ARTIST_INFO"
export const ADD_SONG_TO_HISTORY = "ADD_SONG_TO_HISTORY"
export const SET_SONG_IS_FETCHING_FALSE = "SET_SONG_IS_FETCHING_FALSE"
export const LIKE_SONG = "LIKE_SONG"
export const UNLIKE_SONG = "UNLIKE_SONG"
export const STOP = "STOP"

function likeSong(value = true) {
	if(value)
		return {
			type: LIKE_SONG
		}
	else
		return {
			type: UNLIKE_SONG
		}
}

// update player like button based on like status of currently playing song by user
export function updateLikeButton(MASAS_songInfo) {
	return (dispatch, getState) => {
		const state = getState()
		const {
			MASASuser,
			userPk
		} = state.appReducer

		var headers = new Headers()
		headers.append("Authorization", "Bearer " + MASASuser)

		fetch( '/api/users/' + userPk + '/', { headers })
		.then( r => r.json() )
		.then( user => {
			var isSongLiked = user.likes.filter( (like) => {
				return like.song.url === MASAS_songInfo.url
			})

			// update player state
			if (isSongLiked.length === 0)
				dispatch(likeSong(true))
			else
				dispatch(likeSong(false))
		}).catch( e => { } )

	}
}

export function setIsSongFetching(value = true) {
	if(value)
		return {
			type: SET_SONG_IS_FETCHING_TRUE
		}
	else
		return {
			type: SET_SONG_IS_FETCHING_FALSE
		}
}

export function stopPlayer() {
	return {
		type: STOP,
	}
}


function updateJPlayerState(SC_songInfo, playAfterUpdateState = true) {
	var streamURL = SC_songInfo.stream_url + "?client_id=e5d965905a85b11e108d064bc04430a3" 

	// If jPlayer hasn't being instanciated yet, instanciate it with song URL to play
	if($("#jquery_jplayer_1").data("jPlayer") === undefined) {
		$("#jquery_jplayer_1").jPlayer({
			ready: function(	) {
				$(this).jPlayer("setMedia", {
					mp3: streamURL,
					m4a: streamURL,
					oga: streamURL
				}).jPlayer('play')
			},

			// space bar triggers play pause
			keyBindings: {
				play: {
					key: 32,
					fn: function(f) {
						if(f.status.paused) {
							f.play()
						} else {
							f.pause()
						}
					}
				}
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
	// if jPlayer has already been instanciated, update the URL to play
	} else {
		$("#jquery_jplayer_1").jPlayer( "clearMedia" )
		$("#jquery_jplayer_1").jPlayer("setMedia", { 
			mp3: streamURL,
			m4a: streamURL,
			oga: streamURL
		})
	}

	// play jPlayer
	if(playAfterUpdateState)
		$("#jquery_jplayer_1").jPlayer('play')
}

function resetPlayer() {
	return dispatch => {
		// end loading state
		dispatch(setIsSongFetching(false))

		// stop player
		dispatch(stopPlayer())
	}
}

function updateMASAS_songInfo(songInfo) {
	return {
		type: UPDATE_MASAS_SONG_INFO,
		songInfo,
	}
}

function updateSC_songInfo(songInfo) {
	return {
		type: UPDATE_SC_SONG_INFO,
		songInfo,
	}
}

function updateArtistInfo(artistInfo) {
	return {
		type: UPDATE_ARTIST_INFO,
		artistInfo,
	}
}

export function addSongToHistory(MASAS_songInfo, SC_songInfo, artistInfo) {
	return {
		type: ADD_SONG_TO_HISTORY,
		MASAS_songInfo,
		SC_songInfo,
		artistInfo
	}
}

// called when state.playerReducer.songPlaying changes
// we get song to play from state
// grab its stream link from SC
// initiate jPlayer with new song
export function playNewSong() {
	return (dispatch, getState) => {
		const state = getState()
		const { 
			songPlaying,
			isPlaylistPlaying,
		} = state.playerReducer

		dispatch(setIsSongFetching(true))

		fetch(songPlaying)
		.then( r => r.json() )
		.then( MASAS_songInfo => {
			SC.get('/tracks/' + MASAS_songInfo.SC_ID)
			.then( SC_songInfo => {
				updateJPlayerState(SC_songInfo)

				fetch(MASAS_songInfo.trackArtist)
				.then( r => r.json() )
				.then( artistInfo => {
					// update currently playing song state
					dispatch(updateMASAS_songInfo(MASAS_songInfo))
					dispatch(updateSC_songInfo(SC_songInfo))
					dispatch(updateArtistInfo(artistInfo))

					// add song to discover history if not playing from playlist
					if(!isPlaylistPlaying)
						dispatch(addSongToHistory(MASAS_songInfo, SC_songInfo, artistInfo))

					// update song liked button based on server response (vs optimistic UI)
					updateLikeButton(MASAS_songInfo)

					// end loading state
					dispatch(setIsSongFetching(false))
				})
				.catch( e => { } )
			})
			.catch( e => resetPlayer() )

		}).catch( e => resetPlayer() )
	}
}
