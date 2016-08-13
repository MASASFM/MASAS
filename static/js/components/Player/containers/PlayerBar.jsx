var { playNewSong, updateLikeButton } = require("../ajaxCalls.jsx")
var { getCookie, pausePlayer, playPreviousSong, toggleSongLike, playRandomSong } = require("../../../MASAS_functions.jsx")
// var MASAS_functions = require("../../../MASAS_functions.jsx")

var Player = {}

// Which part of the Redux global state does our component want to receive as props?
Player.mapStateToProps = function(state) {
	return {
		MASASuser: state.appReducer.MASASuser,
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
		isPlaylistPlaying: state.playerReducer.isPlaylistPlaying
	}
}

var resumePlaying = function(playerAtTime) {
	$("#jquery_jplayer_1").jPlayer("play", playerAtTime)
}


// Which action creators does it want to receive by props?
Player.mapDispatchToProps = function(dispatch) {
	return {
		dispatch,
		play: () => dispatch({ type: 'PLAY' }),
		pause: (pausingAtTime) => pausePlayer(), // dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
		resumePlaying: (playerAtTime) => resumePlaying(playerAtTime),
		playNewSong: (newProps, addToHistory) => playNewSong(newProps, addToHistory),
		toggleSongLike: (userToken, songId) => toggleSongLike(userToken, songId),
		playRandomSong: (MASASuser, timeInterval = 0) => playRandomSong(MASASuser, timeInterval),
		playPreviousSong: (discoverHistory) => playPreviousSong(discoverHistory),
		playNewSongFromPlaylist: (playlistPosition) => dispatch({ type: "PLAY_NEW_SONG_FROM_PLAYLIST", playlistPosition }),
	}
}

module.exports = Player
