import {
	SET_SONG_IS_FETCHING_TRUE,
	UPDATE_MASAS_SONG_INFO,
	UPDATE_SC_SONG_INFO,
	UPDATE_ARTIST_INFO,
	SET_SONG_IS_FETCHING_FALSE,
	LIKE_SONG,
	UNLIKE_SONG,
	STOP,
	PLAY,
	PLAY_NEW_SONG,
	PLAY_NEW_SONG_FROM_PLAYLIST,
	SET_IS_BUFFERING_FALSE,
	SET_IS_BUFFERING_TRUE,
	TOOGLE_SONG_LIKE,
	PAUSE,
} from "./actions/Player.js"

let exportVar = {}

exportVar.defaultState = {
	songPlaying: null,					// (string) currently playing song (song api url)		
	isPaused: false,					// (bool) is player paused
	playerAtTime: 0,					// (float) time current song playing is at
	MASAS_songInfo: null,					// song info from MASAS db
	SC_songInfo: null,					// song info from soundcloud API
	artistInfo: null,						// (object) artist info  associated with song
	isSongPlayingLiked: false,				// (bool) is currently playing song liked
	isFetchingSong: false,					// (bool) is song currently fetching
	isBuffering: false,					// (bool) is song buffering
	isPlaylistPlaying: false, 					// (bool)
	playlist: [], 						// (array) array of songs to play
	playlistPosition: 0, 					// (int) in [0, playlist.length-1], position in playlist (used to play previous and next songs)
}

const { defaultState } = exportVar

exportVar.playerReducer = function(state = defaultState, action) {
	
	switch(action.type) {
		case UPDATE_ARTIST_INFO:
			return {
				...state,
				artistInfo: action.artistInfo
			}
		case SET_IS_BUFFERING_TRUE:
			return {
				...state,
				isBuffering: true
			}
		case SET_IS_BUFFERING_FALSE:
			return {
				...state,
				isBuffering: false
			}
		case PLAY:
			return {
				...state,
				isPaused: false
			}
		case PAUSE:
			return {
				...state,
				isPaused: true,
				playerAtTime: action.pausingAtTime,
			}
		case STOP:
			return {
				defaultState
			}
		case PLAY_NEW_SONG:
			return {
				...state,
				isPaused: false,
				playerAtTime: 0,
				songPlaying: action.song,
				isPlaylistPlaying: false,
			}
		case PLAY_NEW_SONG_FROM_PLAYLIST:
			if(action.playlistPosition < state.playlist.length)
				return {
					...state,
					isPaused: false,
					playerAtTime: 0,
					songPlaying: state.playlist[action.playlistPosition],
					isPlaylistPlaying: true,
					playlistPosition: action.playlistPosition,
				}
			else
				return defaultState
		case 'LOAD_PLAYLIST':
			return {
				...state,
				playlist: action.playlist
			}
		case UPDATE_MASAS_SONG_INFO:
			return {
				...state,
				MASAS_songInfo: action.songInfo
			}
		case UPDATE_SC_SONG_INFO:
			return {
				...state,
				SC_songInfo: action.songInfo
			}
		case TOOGLE_SONG_LIKE:
			return {
				...state,
				isSongPlayingLiked: !state.isSongPlayingLiked
			}
		case LIKE_SONG:
			return {
				...state,
				isSongPlayingLiked: true
			}
		case UNLIKE_SONG:
			return {
				...state,
				isSongPlayingLiked: false
			}
		case SET_SONG_IS_FETCHING_TRUE:
			return {
				...state,
				isFetchingSong: true
			}
		case SET_SONG_IS_FETCHING_FALSE:
			return {
				...state,
				isFetchingSong: false
			}
		default:
			return state
	}
}


module.exports = exportVar
