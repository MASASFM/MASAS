
var ReactRedux = require("react-redux")
var Footer = require('../../components/Footer/Footer.jsx')


// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		SC_songInfo: state.playerReducer.SC_songInfo,
		progressBarWidth: state.footerReducer.progressBar,
		isOpened: state.footerReducer.isOpened,
	}
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
	return {
		playRandomSong:(songId) => dispatch({ type: 'PLAY_NEW_SONG', song: songId}),
		updateProgressBar:(progress) => dispatch({ type: 'SET_PLAYER_PROGRESS_BAR', progress: progress}),
		toogleIsOpened: () => dispatch({ type: 'TOOGLE_IS_OPENED' })
	}
}

Footer = ReactRedux.connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer)
module.exports = Footer
