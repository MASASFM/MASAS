
var { playRandomSong } = require("../../../MASAS_functions.jsx")

var Footer = {}

// Which part of the Redux global state does our component want to receive as props?
Footer.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		SC_songInfo: state.playerReducer.SC_songInfo,
		progressBarWidth: state.footerReducer.progressBar,
		isPlayerBarOpened: state.footerReducer.isOpened,
		isBuffering: state.playerReducer.isBuffering,
		songPlaying: state.playerReducer.songPlaying,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		playerAtTime: state.playerReducer.playerAtTime,
		isPlayerPaused: state.playerReducer.isPaused,
		isModalOpened: state.appReducer.isModalOpened,
		playlist: state.playerReducer.playlist,
		playlistPosition: state.playerReducer.playlistPosition,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying
	}
}

// Which action creators does it want to receive by props?
Footer.mapDispatchToProps = function(dispatch) {
	return {
		// playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId}),
		// playRandomSong: (songId) => playNewSong(songId, true),
		playRandomSong: (MASASuser, timeInterval = 0) => playRandomSong(MASASuser, timeInterval),
		updateProgressBar:(progress) => dispatch({ type: 'SET_PLAYER_PROGRESS_BAR', progress: progress}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_FOOTER_OPENED' }),
		toogleModal: () => dispatch({ type: 'TOOGLE_IS_MODAL_OPENED' }),
		updateModalContent: (modalContent) => dispatch({ type: 'CHANGE_MODAL_CONTENT', modalContent }),
		playNewSongFromPlaylist: (playlistPosition) => dispatch({ type: "PLAY_NEW_SONG_FROM_PLAYLIST", playlistPosition }),
	}
}

module.exports = Footer
