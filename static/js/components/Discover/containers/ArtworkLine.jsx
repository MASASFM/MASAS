var { toggleSongLike } = require("../../../MASAS_functions.jsx")

import {
	playSong,
	pausePlayer,
	playRandomSong,
} from "../../../reducers/actions/Player.js"

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
		songPlayingArtistInfo: state.playerReducer.artistInfo,
	}
}

// Which action creators does it want to receive by props?
ArtworkLine.mapDispatchToProps = function(dispatch) {
	return {
		toggleSongLike: (userToken, songId) => toggleSongLike(userToken, songId),
		playAndSaveHistory: (songToPlay) => dispatch(playSong(songToPlay)),
		playRandomSong: (MASASuser, timeInterval) => dispatch(playRandomSong(MASASuser, timeInterval)),
		pause: () => dispatch(pausePlayer()),
		toggleIsFooterOpened: () => dispatch({ type: "TOOGLE_IS_FOOTER_OPENED" }) 
	}
}

module.exports = ArtworkLine
