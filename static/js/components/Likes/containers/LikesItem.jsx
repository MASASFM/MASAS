import {
	toogleMiniProfile
} from "../../../reducers/actions/Likes.js"

import {
	playSong,
	pausePlayer,
	playNewSongFromPlaylist,
	loadPlaylist
} from "../../../reducers/actions/Player.js"

var LikesItem = {}

// Which part of the Redux global state does our component want to receive as props?
LikesItem.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		isFetchingSong: state.playerReducer.isFetchingSong,
		userData: state.appReducer.userData,
	}
}

// Which action creators does it want to receive by props?
LikesItem.mapDispatchToProps = function(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch(playSong(songToPlay)),
		pause: () => dispatch(pausePlayer()),
		loadPlaylist: (playlist) => dispatch(loadPlaylist(playlist)),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		toogleMiniProfile: (MASAS_songPk) => dispatch(toogleMiniProfile(MASAS_songPk)),
	}
}

module.exports = LikesItem
