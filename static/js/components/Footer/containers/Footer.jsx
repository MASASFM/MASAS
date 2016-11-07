import {
	playNewSongFromPlaylist,
	playRandomSong
} from "../../../reducers/actions/Player.js"

import {
	setPlayerProgressBar,
	toogleIsFooterOpened,
} from "../../../reducers/actions/Footer.js"
	
import {
	changeModalContent,
	toogleIsModalOpened,
} from "../../../reducers/actions/App.js"

var Footer = {}

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

Footer.mapDispatchToProps = function(dispatch) {
	return {
		playRandomSong: timeInterval => dispatch(playRandomSong(timeInterval)),
		updateProgressBar: progress => dispatch(setPlayerProgressBar(progress)),
		toogleIsOpened: () => dispatch(toogleIsFooterOpened()),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
		playNewSongFromPlaylist: playlistPosition => dispatch(playNewSongFromPlaylist(playlistPosition)),
	}
}

module.exports = Footer
