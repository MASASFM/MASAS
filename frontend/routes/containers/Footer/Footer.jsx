
var ReactRedux = require("react-redux")
var Footer = require('../../components/Footer/Footer.jsx')
var { playNewSong } = require("../../../MASAS_functions.jsx")


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		SC_songInfo: state.playerReducer.SC_songInfo,
		progressBarWidth: state.footerReducer.progressBar,
		isPlayerBarOpened: state.footerReducer.isOpened,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		// playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId}),
		playRandomSong: (songId) => playNewSong(dispatch, songId, true),
		updateProgressBar:(progress) => dispatch({ type: 'SET_PLAYER_PROGRESS_BAR', progress: progress}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_FOOTER_OPENED' })
	}
}

Footer = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)
module.exports = Footer
