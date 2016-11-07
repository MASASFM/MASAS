import {
	playPlayer,
	pausePlayer,
	playPreviousSongInHistory,
	playRandomSong,
	playNewSongFromPlaylist,
	playNewSong
} from "../../../reducers/actions/Player.js"

var { toggleSongLike } = require("../../../MASAS_functions.jsx")

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

var resumePlaying = function(playerAtTime) {
	$("#jquery_jplayer_1").jPlayer("play", playerAtTime)
}

Player.mapDispatchToProps = function(dispatch) {
	return {
		dispatch,
		play: () => dispatch(playPlayer()),
		pause: () => dispatch(pausePlayer()),
		resumePlaying: (playerAtTime) => resumePlaying(playerAtTime),
		playNewSong: () => dispatch(playNewSong()),
		toggleSongLike: (userToken, songId) => toggleSongLike(userToken, songId),
		playRandomSong: (MASASuser, timeInterval = 0) => dispatch(playRandomSong(timeInterval)),
		playPreviousSong: () => dispatch(playPreviousSongInHistory()),
		playNewSongFromPlaylist: (playlistPosition) => dispatch(playNewSongFromPlaylist(playlistPosition)),
	}
}

module.exports = Player
