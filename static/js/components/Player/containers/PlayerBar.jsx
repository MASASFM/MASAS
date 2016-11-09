import {
	playPlayer,
	pausePlayer,
	playPreviousSongInHistory,
	playRandomSong,
	playNewSongFromPlaylist,
	playNewSong,
	resumePlayer,
	setIsPlayerBuffering,
	toggleSongLike,
	updateLikeButton,
} from "../../../reducers/actions/Player.js"

// var { toggleSongLike } = require("../../../MASAS_functions.jsx")

var Player = {}

Player.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
		userData: state.appReducer.userData,
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		playerAtTime: state.playerReducer.playerAtTime,
		SC_songInfo: state.playerReducer.SC_songInfo,
		MASAS_songInfo: state.playerReducer.MASAS_songInfo,
		isSongPlayingLiked: state.playerReducer.isSongPlayingLiked,
		userPk: state.appReducer.MASASuserPk,
		isFetchingSong: state.playerReducer.isFetchingSong,
		discoverHistory: state.discoverReducer.history,
		playlist: state.playerReducer.playlist,
		playlistPosition: state.playerReducer.playlistPosition,
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying,
		isModalOpened: state.appReducer.isModalOpened,
		modalType: state.appReducer.modalType,
		songPlayingArtistInfo: state.playerReducer.artistInfo,
	}
}

Player.mapDispatchToProps = function(dispatch) {
	return {
		dispatch,
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
		resumePlaying: () => dispatch(resumePlayer()),	// same as this.props.play (see actions/Player.js) Not sure keeping both for historical reasons for now
		playNewSong: () => dispatch(playNewSong()),
		toggleSongLike: (userToken, songId) => dispatch(toggleSongLike(songId)),
		playRandomSong: (timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
		playPreviousSong: () => dispatch(playPreviousSongInHistory()),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
		setIsPlayerBuffering: value => dispatch(setIsPlayerBuffering(value)),
	}
}

module.exports = Player
