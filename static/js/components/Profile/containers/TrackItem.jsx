var { pausePlayer } = require("../../../MASAS_functions.jsx")


var TrackItem = {}

// Which part of the Redux global state does our component want to receive as props?
TrackItem.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		userData: state.appReducer.userData,

	}
}


// Which action creators does it want to receive by props?
TrackItem.mapDispatchToProps = function(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch({type:'PLAY_NEW_SONG', song: songToPlay}),
		pause: () => pausePlayer(dispatch),
		loadPlaylist: (playlist) => dispatch({ type: "LOAD_PLAYLIST", playlist }),
		playNewSongFromPlaylist: (playlistPosition) => dispatch({ type: "PLAY_NEW_SONG_FROM_PLAYLIST", playlistPosition }),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
	}
}

module.exports = TrackItem
