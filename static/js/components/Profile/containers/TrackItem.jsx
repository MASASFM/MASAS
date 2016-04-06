var { pausePlayer } = require("../../../MASAS_functions.jsx")


var TrackItem = {}

// Which part of the Redux global state does our component want to receive as props?
TrackItem.mapStateToProps = function(state) {
	return {
		songPlaying: state.playerReducer.songPlaying,
		isPaused: state.playerReducer.isPaused,
	}
}

// moved to MASAS_functions.jsx
// var pause = function(dispatch) {
// 	console.log('pausing')
// 	// pause player
// 	$("#jquery_jplayer_1").jPlayer('pause')
	
// 	// get time to start playing at this time when unpausing and update app state
// 	var pausingAtTime = Math.round($("#jquery_jplayer_1").data("jPlayer").status.currentTime)
// 	dispatch({ type: 'PAUSE', pausingAtTime: pausingAtTime })
// }

// Which action creators does it want to receive by props?
TrackItem.mapDispatchToProps = function(dispatch) {
	return {
		playNewSong: (songToPlay) => dispatch({type:'PLAY_NEW_SONG', song: songToPlay}),
		pause: () => pausePlayer(dispatch),
	}
}

module.exports = TrackItem
