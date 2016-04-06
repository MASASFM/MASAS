var { pausePlayer, playNewSong, toggleSongLike } = require("../../../MASAS_functions.jsx")

var ArtworkLine = {}

// Which part of the Redux global state does our component want to receive as props?
ArtworkLine.mapStateToProps = function(state) {
	return {
		discoverNumber: state.discoverReducer.discoverNumber,
		history: state.discoverReducer.history,
		songPlaying: state.playerReducer.songPlaying,
		isPlayerPaused: state.playerReducer.isPaused,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userToken: state.appReducer.MASASuser,
	}
}

// Which action creators does it want to receive by props?
ArtworkLine.mapDispatchToProps = function(dispatch) {
	return {
		// updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		// handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
		toggleSongLike: (userToken, songId) => toggleSongLike(dispatch, userToken, songId),
		play: (songToPlay) => playNewSong(dispatch, songToPlay, false),
		pause: () => pausePlayer(dispatch),
	}
}

module.exports = ArtworkLine
