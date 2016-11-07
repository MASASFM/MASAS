import "whatwg-fetch"

import {
	addSongToHistory,
	popSongFromHistory,
} from "./Discover.js"

import {
	updateNotificationBar,
} from "./Header.js"

export const SET_SONG_IS_FETCHING_TRUE = "SET_SONG_IS_FETCHING_TRUE"
export const UPDATE_MASAS_SONG_INFO = "UPDATE_MASAS_SONG_INFO"
export const UPDATE_SC_SONG_INFO = "UPDATE_SC_SONG_INFO"
export const UPDATE_ARTIST_INFO = "UPDATE_ARTIST_INFO"
export const SET_SONG_IS_FETCHING_FALSE = "SET_SONG_IS_FETCHING_FALSE"
export const LIKE_SONG = "LIKE_SONG"
export const UNLIKE_SONG = "UNLIKE_SONG"
export const STOP = "STOP"
export const PLAY = "PLAY"
export const PLAY_NEW_SONG = "PLAY_NEW_SONG"
export const PLAY_NEW_SONG_FROM_PLAYLIST = "PLAY_NEW_SONG_FROM_PLAYLIST"

///// TO DELETE
const getCookie = (name) => {
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


// see playerReducer
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

// Updates state when fetch song to play info starts / ends
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

// stops jPlayer
export function stopPlayer() {
	return {
		type: STOP,
	}
}

// plays jPlayer
export function playPlayer() {
	return {
		type: PLAY,
	}
}

// pause player
export function pausePlayer () {
	return dispatch => {
		// pause player
		$("#jquery_jplayer_1").jPlayer("pause")
		
		// get time to start playing at this time when unpausing and update app state
		var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
		dispatch({ type: "PAUSE", pausingAtTime: pausingAtTime })
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

// resets player state
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


// plays song based on given URL
export function playSong(songURL) {
	return {
		type: PLAY_NEW_SONG,
		song: songURL,
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
		// dispatch(playSong(songPlaying))

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

// play previous song in history
export function playPreviousSongInHistory() {
	return (dispatch, getState) => {
		const state = getState()
		const { discoverHistory } = state.discoverReducer

		// POP SONG FROM HISTORY
		dispatch(popSongFromHistory())

		// PLAY LATEST SONG IN HISTORY
		const songURL = discoverHistory.all[discoverHistory.all.length-1].MASAS_songInfo.url
		dispatch(playSong(songURL))
	}
}

export function playRandomSong(timeInterval = 0) {
	return (dispatch, getState) => {
		const state = getState()
		const { MASASuser } = state.appReducer

		var URL = "/api/play/"
		if(timeInterval)
			URL = URL + "?time_interval_id=" + timeInterval


		var headers = {}
		var method = "GET"

		// make post request if unauth
		if(MASASuser !== "") {
			const header = "Bearer " + MASASuser
			const csrftoken = getCookie("csrftoken")
			method = "POST"

			headers = {
				"Authorization": header,
				"X-CSRFToken": csrftoken
			}
		}

		fetch(URL, { 
			headers,
			method
		}).then( r => r.json() )
		.then( data => dispatch(playSong(data.url)) )
		.catch( e => {
			if(e.status === 401)
				dispatch(updateNotificationBar("Login to play music !"))
		})
	}
}

export function playNewSongFromPlaylist(playlistPosition) {
	return {
		type: PLAY_NEW_SONG_FROM_PLAYLIST, 
		playlistPosition
	}
}