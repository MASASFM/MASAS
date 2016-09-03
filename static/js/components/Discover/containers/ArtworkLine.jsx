var { pausePlayer, playNewSong, toggleSongLike, playRandomSong } = require("../../../MASAS_functions.jsx")

var ArtworkLine = {}

// Which part of the Redux global state does our component want to receive as props?
ArtworkLine.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		discoverNumber: state.discoverReducer.discoverNumber,
		history: state.discoverReducer.history,
		songPlaying: state.playerReducer.songPlaying,
		isPlayerPaused: state.playerReducer.isPaused,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userToken: state.appReducer.MASASuser,
		isFooterOpened: state.footerReducer.isOpened,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
	}
}

// Which action creators does it want to receive by props?
ArtworkLine.mapDispatchToProps = function(dispatch) {
	return {
		// updateTitle: (title, pageType) => dispatch({type:'UPDATE_PAGE_TITLE', title: title, pageType: pageType}),
		// handleTimePickerChange: (discoverNumber) => dispatch({ type: 'CHANGE_DISCOVER_NUMBER', discoverNumber}),
		toggleSongLike: (userToken, songId) => toggleSongLike(userToken, songId),
		play: (songToPlay) => playNewSong(songToPlay, false),
		playAndSaveHistory: (songToPlay) => playNewSong(songToPlay),
		playRandomSong: (MASASuser, timeInterval) => playRandomSong(MASASuser, timeInterval),
		pause: () => pausePlayer(dispatch),
		toggleIsFooterOpened: () => dispatch({ type: "TOOGLE_IS_FOOTER_OPENED" }) 
	}
}

module.exports = ArtworkLine
