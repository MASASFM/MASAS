import {
	pausePlayer,
	playSong,
	loadPlaylist,
	playNewSongFromPlaylist
} from "../../../reducers/actions/Player.js"

import {
	toogleIsModalOpened,
	changeModalContent
} from "../../../reducers/actions/App.js"

var TrackItem = {}

// Which part of the Redux global state does our component want to receive as props?
TrackItem.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		userData: state.appReducer.userData,
		publicProfileInfo: state.profileReducer.publicProfileInfo,
		miniProfile: state.appReducer.miniProfile,
	}
}


// Which action creators does it want to receive by props?
TrackItem.mapDispatchToProps = function(dispatch) {
	return {
		playNewSong: songToPlay => dispatch(playSong(songToPlay)),
		pause: () => dispatch(pausePlayer()),
		loadPlaylist: playlist => dispatch(loadPlaylist(playlist)),
		playNewSongFromPlaylist: playlistPosition => dispatch(playNewSongFromPlaylist(playlistPosition)),
		toogleModal: () => dispatch(toogleIsModalOpened()),
		updateModalContent: modalContent => dispatch(changeModalContent(modalContent)),
	}
}

module.exports = TrackItem
