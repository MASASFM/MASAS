
var { playNewSong } = require("../../../MASAS_functions.jsx")

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
		playerAtTime: state.playerReducer.playerAtTime,
		isPlayerPaused: state.playerReducer.isPaused,
		isModalOpened: state.appReducer.isModalOpened,
	}
}

// Which action creators does it want to receive by props?
Footer.mapDispatchToProps = function(dispatch) {
	return {
		// playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId}),
		playRandomSong: (songId) => playNewSong(dispatch, songId, true),
		updateProgressBar:(progress) => dispatch({ type: 'SET_PLAYER_PROGRESS_BAR', progress: progress}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_FOOTER_OPENED' })
	}
}

module.exports = Footer
