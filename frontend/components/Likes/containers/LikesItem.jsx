var { pausePlayer } = require("../../../MASAS_functions.jsx")

var LikesItem = {}

// Which part of the Redux global state does our component want to receive as props?
LikesItem.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
		isFetchingSong: state.playerReducer.isFetchingSong
	}
}

// Which action creators does it want to receive by props?
LikesItem.mapDispatchToProps = function(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch({type:'PLAY_NEW_SONG', song: songToPlay}),
		pause: () => pausePlayer(dispatch),
	}
}

module.exports = LikesItem